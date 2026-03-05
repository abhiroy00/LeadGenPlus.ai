from django.contrib import admin
from .models import LeadJob, Lead


@admin.register(LeadJob)
class LeadJobAdmin(admin.ModelAdmin):
    list_display = ('id', 'business_type', 'location', 'lead_number', 'status', 'created_at')
    list_filter = ('status', 'email_style')
    search_fields = ('business_type', 'location')
    ordering = ('-created_at',)


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ('id', 'company_name', 'email_address', 'phone_number', 'website', 'created_at')
    list_filter = ('job',)
    search_fields = ('company_name', 'email_address', 'website')
    ordering = ('-created_at',)
