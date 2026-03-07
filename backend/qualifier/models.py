from django.db import models
from scout.models import Lead


class QualifiedLead(models.Model):

    lead = models.OneToOneField(
        Lead,
        on_delete=models.CASCADE,
        related_name="qualification"
    )

    business_size_score = models.FloatField(default=0)
    location_score = models.FloatField(default=0)
    industry_score = models.FloatField(default=0)
    phone_score = models.FloatField(default=0)
    online_presence_score = models.FloatField(default=0)

    final_score = models.FloatField(default=0)

    qualified = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "qualified_leads"