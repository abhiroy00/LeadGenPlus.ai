from django.contrib import admin
from whatsapp_agent.models import Lead, CampaignRun


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display  = ["name", "phone", "business", "status", "sent_at", "created_at"]
    list_filter   = ["status", "city"]
    search_fields = ["name", "phone", "business"]
    readonly_fields = ["message_id", "sent_at", "created_at"]


@admin.register(CampaignRun)
class CampaignRunAdmin(admin.ModelAdmin):
    list_display  = ["id", "status", "total", "successful", "failed", "started_at"]
    readonly_fields = ["started_at", "finished_at", "log"]
