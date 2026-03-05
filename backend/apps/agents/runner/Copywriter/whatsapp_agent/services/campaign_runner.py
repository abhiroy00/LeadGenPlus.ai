# ──────────────────────────────────────────────────
#   services/campaign_runner.py
#   Core agent loop — runs the campaign
# ──────────────────────────────────────────────────

import time
import json
import re
from datetime import datetime

from django.utils import timezone
from django.conf import settings

from whatsapp_agent.models import Lead, CampaignRun
from whatsapp_agent.services.whatsapp_api import (
    send_template_message, parse_response
)
from whatsapp_agent.services.message_generator import generate_message


def clean_phone(phone: str) -> str:
    """Remove +, spaces, dashes from phone number."""
    return re.sub(r"[\s\-\+\(\)]", "", str(phone)).strip()


def import_leads_from_json(json_data: list) -> dict:
    """
    Import leads from a JSON list into the database.

    Expected JSON format:
    [
      {
        "name":     "Rahul Sharma",
        "phone":    "919876543210",
        "business": "Restaurant",
        "interest": "food delivery app",
        "city":     "Mumbai"
      }
    ]

    Returns:
        dict with counts: created, skipped, errors
    """
    created = skipped = errors = 0

    for item in json_data:
        try:
            phone = clean_phone(item.get("phone", ""))
            name  = str(item.get("name", "")).strip()

            if not phone or not name:
                errors += 1
                continue

            lead, was_created = Lead.objects.get_or_create(
                phone=phone,
                defaults={
                    "name":     name,
                    "business": str(item.get("business", "")).strip(),
                    "interest": str(item.get("interest", "")).strip(),
                    "city":     str(item.get("city", "")).strip(),
                    "email":    str(item.get("email", "")).strip(),
                    "status":   "pending",
                },
            )

            if was_created:
                created += 1
            else:
                skipped += 1

        except Exception:
            errors += 1

    return {"created": created, "skipped": skipped, "errors": errors}


def run_campaign(daily_limit: int = None, delay: int = None) -> CampaignRun:
    """
    Run the WhatsApp sending campaign.

    Picks all pending leads up to daily_limit,
    generates personalized messages, sends via Meta API,
    and updates each Lead's status in the database.

    Returns:
        CampaignRun instance with results
    """
    limit = daily_limit or settings.DEFAULT_DAILY_LIMIT
    sleep = delay or settings.DEFAULT_DELAY_BETWEEN_MESSAGES

    # Create a campaign run record
    run = CampaignRun.objects.create(status="running")
    log_lines = []

    def log(msg: str):
        log_lines.append(f"[{datetime.now().strftime('%H:%M:%S')}] {msg}")

    log(f"Campaign started — limit: {limit}, delay: {sleep}s")

    # Get pending leads
    leads = Lead.objects.filter(status="pending")[:limit]
    total = leads.count()
    run.total = total
    run.save()

    log(f"Found {total} pending leads")

    success_count = 0
    failed_count  = 0

    for i, lead in enumerate(leads):
        log(f"[{i+1}/{total}] Processing {lead.name} ({lead.phone})")

        try:
            # Step 1 — Generate personalized message
            message = generate_message(lead)
            log(f"  Message: {message[:60]}...")

            # Step 2 — Send via Meta API
            response  = send_template_message(lead.phone, lead.name, lead.business)
            ok, msg_id, error = parse_response(response)

            if ok:
                lead.status       = "success"
                lead.message_sent = message
                lead.message_id   = msg_id
                lead.sent_at      = timezone.now()
                lead.error        = ""
                success_count    += 1
                log(f"  ✅ Sent — ID: {msg_id}")
            else:
                lead.status = "failed"
                lead.error  = error
                failed_count += 1
                log(f"  ❌ Failed: {error}")

            lead.save()

        except Exception as e:
            lead.status = "failed"
            lead.error  = str(e)
            lead.save()
            failed_count += 1
            log(f"  💥 Exception: {e}")

        # Delay between messages
        if i + 1 < total:
            time.sleep(sleep)

    # Finalize the run
    run.status     = "completed"
    run.successful = success_count
    run.failed     = failed_count
    run.finished_at = timezone.now()
    run.log        = "\n".join(log_lines)
    run.save()

    log(f"Campaign complete — ✅ {success_count} sent, ❌ {failed_count} failed")

    return run
