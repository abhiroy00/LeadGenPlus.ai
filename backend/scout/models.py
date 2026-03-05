from django.db import models


class LeadJob(models.Model):
    """Tracks each form submission / generation run."""
    business_type = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    lead_number = models.IntegerField()
    email_style = models.CharField(
        max_length=50,
        choices=[('Friendly', 'Friendly'), ('Professional', 'Professional'), ('Simple', 'Simple')],
        default='Professional',
    )
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=50,
        choices=[
            ('pending', 'Pending'),
            ('processing', 'Processing'),
            ('completed', 'Completed'),
            ('failed', 'Failed'),
        ],
        default='pending',
    )

    class Meta:
        db_table = 'scout_lead_jobs'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.business_type} in {self.location} ({self.created_at.date()})"


class Lead(models.Model):
    """A single scraped business lead with email."""
    job = models.ForeignKey(LeadJob, on_delete=models.CASCADE, related_name='leads')
    company_name = models.CharField(max_length=300, blank=True, default='')
    category = models.CharField(max_length=200, blank=True, default='')
    website = models.URLField(max_length=500, blank=True, default='')
    phone_number = models.CharField(max_length=50, blank=True, default='')
    email_address = models.EmailField(max_length=255, blank=True, default='')
    address = models.TextField(blank=True, default='')
    cold_mail_status = models.CharField(max_length=100, blank=True, default='')
    send_time = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'scout_leads'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.company_name} — {self.email_address}"
