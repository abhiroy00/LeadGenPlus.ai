from django.contrib import admin
from .models import QualifiedLead


@admin.register(QualifiedLead)
class QualifiedLeadAdmin(admin.ModelAdmin):

    list_display = (
        "lead",
        "final_score",
        "qualified",
        "created_at"
    )