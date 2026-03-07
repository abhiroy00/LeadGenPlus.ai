# backend/scout/tasks.py
from celery import shared_task
from celery.utils.log import get_task_logger

logger = get_task_logger(__name__)


@shared_task(
    bind=True,
    max_retries=3,
    soft_time_limit=600,
    time_limit=900,
    name='scout.tasks.generate_leads_task'
)
def generate_leads_task(self, job_id: int):
    """
    Background task — runs the full lead generation pipeline.
    Called by GenerateLeadsView instead of running synchronously.

    Flow:
      1. Load job from DB
      2. Scrape Google Maps via Apify
      3. Filter places with website
      4. Extract email from each website via Gemini
      5. Save valid leads to PostgreSQL
      6. Append to Google Sheets
      7. Mark job as completed
    """
    # Import here to avoid circular imports
    from .models import LeadJob, Lead
    from .services.apify_service import scrape_google_places
    from .services.email_extractor import get_email_from_website
    from .services.sheets_service import (
        append_lead_to_sheet,
        ensure_header_row,
    )

    logger.info(f"[Task] Starting job_id={job_id}")

    # ── 1. Load job ───────────────────────────────────────────────────────────
    try:
        job = LeadJob.objects.get(id=job_id)
    except LeadJob.DoesNotExist:
        logger.error(f"[Task] Job {job_id} not found")
        return {'error': f'Job {job_id} not found'}

    job.status = 'processing'
    job.save()

    try:
        # ── 2. Scrape Google Maps ─────────────────────────────────────────────
        logger.info(f"[Task] Scraping: {job.business_type} in {job.location}")
        places = scrape_google_places(
            job.business_type,
            job.location,
            job.lead_number,
        )
        logger.info(f"[Task] Found {len(places)} places")

        # ── 3. Filter places with website ─────────────────────────────────────
        places_with_website = [p for p in places if p.get('website')]
        logger.info(f"[Task] {len(places_with_website)} have websites")

        # ── 4. Ensure Google Sheet header exists ──────────────────────────────
        ensure_header_row()

        saved_leads = []
        skipped = 0

        # ── 5. Process each place ─────────────────────────────────────────────
        for place in places_with_website:
            website     = place.get('website', '')
            company     = place.get('title', '')

            logger.info(f"[Task] Processing: {company} ({website})")

            # Extract email via Gemini
            email = get_email_from_website(website)

            # Skip if no valid email found
            if not email or '@' not in email:
                logger.info(f"[Task] Skipped — no email: {company}")
                skipped += 1
                continue

            # ── 6. Save to PostgreSQL ─────────────────────────────────────────
            lead = Lead.objects.create(
                job=job,
                company_name=company,
                category=place.get('categoryName', ''),
                website=website,
                phone_number=place.get('phoneUnformatted', ''),
                email_address=email,
                address=place.get('address', ''),
            )
            saved_leads.append(lead.id)

            # ── 7. Append to Google Sheets ────────────────────────────────────
            append_lead_to_sheet({
                'company_name':    lead.company_name,
                'category':        lead.category,
                'website':         lead.website,
                'phone_number':    lead.phone_number,
                'email_address':   lead.email_address,
                'address':         lead.address,
                'cold_mail_status': '',
                'send_time':       '',
            })

            logger.info(f"[Task] Saved: {company} — {email}")

        # ── 8. Mark job complete ──────────────────────────────────────────────
        job.status = 'completed'
        job.save()

        result = {
            'job_id':           job_id,
            'status':           'completed',
            'total_scraped':    len(places),
            'with_website':     len(places_with_website),
            'with_email':       len(saved_leads),
            'skipped_no_email': skipped,
        }
        logger.info(f"[Task] Done: {result}")
        return result

    except Exception as exc:
        logger.error(f"[Task] Failed job {job_id}: {exc}")
        job.status = 'failed'
        job.save()

        # Retry up to 3 times with 60 second delay
        raise self.retry(exc=exc, countdown=60)