# ──────────────────────────────────────────────────
#   views.py — All Django views
# ──────────────────────────────────────────────────

import json
import threading

from django.shortcuts import render, redirect, get_object_or_404
from django.contrib   import messages
from django.http      import JsonResponse
from django.views.decorators.http import require_POST

from whatsapp_agent.models   import Lead, CampaignRun
from whatsapp_agent.services.campaign_runner import (
    import_leads_from_json, run_campaign
)


# ── Dashboard ─────────────────────────────────────
def dashboard(request):
    stats = {
        "total":   Lead.objects.count(),
        "pending": Lead.objects.filter(status="pending").count(),
        "success": Lead.objects.filter(status="success").count(),
        "failed":  Lead.objects.filter(status="failed").count(),
    }
    recent_runs  = CampaignRun.objects.all()[:5]
    recent_leads = Lead.objects.all()[:10]

    return render(request, "whatsapp_agent/dashboard.html", {
        "stats":        stats,
        "recent_runs":  recent_runs,
        "recent_leads": recent_leads,
    })


# ── Upload / Import Leads ─────────────────────────
def upload_leads(request):
    if request.method == "POST":
        json_text = request.POST.get("json_text", "").strip()
        json_file = request.FILES.get("json_file")

        raw_data = None

        # Parse from textarea
        if json_text:
            try:
                raw_data = json.loads(json_text)
            except json.JSONDecodeError as e:
                messages.error(request, f"Invalid JSON: {e}")
                return redirect("upload_leads")

        # Parse from uploaded file
        elif json_file:
            try:
                raw_data = json.loads(json_file.read().decode("utf-8"))
            except json.JSONDecodeError as e:
                messages.error(request, f"Invalid JSON file: {e}")
                return redirect("upload_leads")

        else:
            messages.error(request, "Please paste JSON or upload a file.")
            return redirect("upload_leads")

        if not isinstance(raw_data, list):
            messages.error(request, "JSON must be an array [ ... ] of lead objects.")
            return redirect("upload_leads")

        result = import_leads_from_json(raw_data)
        messages.success(
            request,
            f"✅ Import complete — "
            f"{result['created']} added, "
            f"{result['skipped']} duplicates skipped, "
            f"{result['errors']} errors."
        )
        return redirect("leads_list")

    return render(request, "whatsapp_agent/upload_leads.html")


# ── Leads List ────────────────────────────────────
def leads_list(request):
    status_filter = request.GET.get("status", "all")
    search        = request.GET.get("q", "").strip()

    leads = Lead.objects.all()

    if status_filter != "all":
        leads = leads.filter(status=status_filter)

    if search:
        leads = leads.filter(name__icontains=search) | leads.filter(phone__icontains=search)

    return render(request, "whatsapp_agent/leads_list.html", {
        "leads":         leads,
        "status_filter": status_filter,
        "search":        search,
        "total_count":   leads.count(),
    })


# ── Delete Lead ───────────────────────────────────
@require_POST
def delete_lead(request, lead_id):
    lead = get_object_or_404(Lead, id=lead_id)
    lead.delete()
    messages.success(request, f"Lead '{lead.name}' deleted.")
    return redirect("leads_list")


# ── Reset Lead to Pending ─────────────────────────
@require_POST
def reset_lead(request, lead_id):
    lead = get_object_or_404(Lead, id=lead_id)
    lead.status = "pending"
    lead.message_id = ""
    lead.error = ""
    lead.save()
    messages.success(request, f"Lead '{lead.name}' reset to pending.")
    return redirect("leads_list")


# ── Run Campaign ──────────────────────────────────
def run_campaign_view(request):
    if request.method == "POST":
        daily_limit = int(request.POST.get("daily_limit", 500))
        delay       = int(request.POST.get("delay", 3))

        # Run in background thread so page responds immediately
        def run_in_background():
            run_campaign(daily_limit=daily_limit, delay=delay)

        thread = threading.Thread(target=run_in_background, daemon=True)
        thread.start()

        messages.success(
            request,
            f"🚀 Campaign started! Sending up to {daily_limit} messages. "
            f"Check Campaign History for results."
        )
        return redirect("campaign_history")

    pending_count = Lead.objects.filter(status="pending").count()
    return render(request, "whatsapp_agent/run_campaign.html", {
        "pending_count": pending_count,
    })


# ── Campaign History ──────────────────────────────
def campaign_history(request):
    runs = CampaignRun.objects.all()
    return render(request, "whatsapp_agent/campaign_history.html", {
        "runs": runs,
    })


# ── Campaign Detail ───────────────────────────────
def campaign_detail(request, run_id):
    run = get_object_or_404(CampaignRun, id=run_id)
    return render(request, "whatsapp_agent/campaign_detail.html", {"run": run})


# ── Settings Page ─────────────────────────────────
def settings_view(request):
    from django.conf import settings as django_settings
    config = {
        "META_ACCESS_TOKEN":   "✅ Set" if django_settings.META_ACCESS_TOKEN else "❌ Missing",
        "PHONE_NUMBER_ID":     "✅ Set" if django_settings.PHONE_NUMBER_ID else "❌ Missing",
        "ANTHROPIC_API_KEY":   "✅ Set" if django_settings.ANTHROPIC_API_KEY else "❌ Missing",
        "TEMPLATE_NAME":       django_settings.TEMPLATE_NAME or "❌ Missing",
        "TEMPLATE_LANGUAGE":   django_settings.TEMPLATE_LANGUAGE,
        "CLAUDE_MODEL":        django_settings.CLAUDE_MODEL,
    }
    return render(request, "whatsapp_agent/settings.html", {"config": config})


# ── API: Live Stats (for dashboard auto-refresh) ──
def api_stats(request):
    return JsonResponse({
        "total":   Lead.objects.count(),
        "pending": Lead.objects.filter(status="pending").count(),
        "success": Lead.objects.filter(status="success").count(),
        "failed":  Lead.objects.filter(status="failed").count(),
        "running": CampaignRun.objects.filter(status="running").exists(),
    })
