"""
leads/views.py
All REST API views for the Lead Generation system.
"""
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny  

from .models import LeadJob, Lead
from .serializers import (
    LeadJobSerializer,
    LeadSerializer,
    GenerateLeadsInputSerializer,
)
from .services.apify_service import scrape_google_places
from .services.email_extractor import get_email_from_website
from .services.sheets_service import append_lead_to_sheet, ensure_header_row


# ── POST /api/generate-leads/ ─────────────────────────────────────────────────
class GenerateLeadsView(APIView):
    
    """
    Main endpoint — mirrors the full n8n workflow:
      1. Accept form input (business_type, location, lead_number, email_style)
      2. Call Apify to scrape Google Maps
      3. Filter places that have a website
      4. Scrape each website + extract email via Gemini
      5. If valid email → save to PostgreSQL + append to Google Sheets
      6. Return all leads found
    """
    permission_classes = [AllowAny]
    def post(self, request):
        # ── 1. Validate input ─────────────────────────────────────────────────
        serializer = GenerateLeadsInputSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {'error': 'Invalid input', 'details': serializer.errors},
                status=status.HTTP_400_BAD_REQUEST,
            )

        data = serializer.validated_data
        business_type = data['business_type']
        location = data['location']
        lead_number = data['lead_number']
        email_style = data['email_style']

        # ── 2. Create a LeadJob record ────────────────────────────────────────
        job = LeadJob.objects.create(
            business_type=business_type,
            location=location,
            lead_number=lead_number,
            email_style=email_style,
            status='processing',
        )

        try:
            # ── 3. Scrape Google Maps via Apify ───────────────────────────────
            places = scrape_google_places(business_type, location, lead_number)

            # ── 4. Filter places that have a website (like n8n Filter node) ──
            places_with_website = [p for p in places if p.get('website')]
            print(
                f"[View] {len(places)} place(s) found, "
                f"{len(places_with_website)} have websites."
            )

            # Ensure Google Sheet has a header row (safe to call repeatedly)
            ensure_header_row()

            saved_leads = []
            skipped = 0

            for place in places_with_website:
                website = place.get('website', '')
                company_name = place.get('title', '')
                print(f"\n[View] Processing: {company_name} ({website})")

                # ── 5. Extract email from website via Gemini ──────────────────
                email = get_email_from_website(website)

                # ── 6. If operator: only save leads with a valid email ─────────
                if not email or '@' not in email:
                    print(f"  → Skipped (no valid email).")
                    skipped += 1
                    continue

                # ── 7. Save to PostgreSQL ─────────────────────────────────────
                lead = Lead.objects.create(
                    job=job,
                    company_name=company_name,
                    category=place.get('categoryName', ''),
                    website=website,
                    phone_number=place.get('phoneUnformatted', ''),
                    email_address=email,
                    address=place.get('address', ''),
                )
                saved_leads.append(lead)

                # ── 8. Append to Google Sheets ────────────────────────────────
                append_lead_to_sheet({
                    'company_name': lead.company_name,
                    'category': lead.category,
                    'website': lead.website,
                    'phone_number': lead.phone_number,
                    'email_address': lead.email_address,
                    'address': lead.address,
                    'cold_mail_status': '',
                    'send_time': '',
                })

            job.status = 'completed'
            job.save()

            return Response(
                {
                    'job_id': job.id,
                    'status': 'completed',
                    'total_scraped': len(places),
                    'with_website': len(places_with_website),
                    'with_email': len(saved_leads),
                    'skipped_no_email': skipped,
                    'leads': LeadSerializer(saved_leads, many=True).data,
                },
                status=status.HTTP_201_CREATED,
            )

        except Exception as e:
            job.status = 'failed'
            job.save()
            return Response(
                {'error': str(e), 'job_id': job.id},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


# ── GET /api/jobs/ ─────────────────────────────────────────────────────────────
class JobListView(APIView):
    """Returns all past lead generation jobs."""
    permission_classes = [AllowAny]
    def get(self, request):
        jobs = LeadJob.objects.all()
        serializer = LeadJobSerializer(jobs, many=True)
        return Response(serializer.data)


# ── GET /api/jobs/<job_id>/ ───────────────────────────────────────────────────
class JobDetailView(APIView):
    """Returns a single job with all its leads."""
    permission_classes = [AllowAny]
    def get(self, request, job_id):
        try:
            job = LeadJob.objects.get(id=job_id)
        except LeadJob.DoesNotExist:
            return Response({'error': 'Job not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = LeadJobSerializer(job)
        return Response(serializer.data)


# ── GET /api/leads/ ───────────────────────────────────────────────────────────
class LeadListView(APIView):
    """Returns all leads across all jobs. Supports ?job_id= filter."""
    permission_classes = [AllowAny]
    def get(self, request):
        leads = Lead.objects.all()

        job_id = request.query_params.get('job_id')
        if job_id:
            leads = leads.filter(job_id=job_id)

        email_only = request.query_params.get('email_only', 'false').lower() == 'true'
        if email_only:
            leads = leads.exclude(email_address='')

        serializer = LeadSerializer(leads, many=True)
        return Response({'count': leads.count(), 'leads': serializer.data})
