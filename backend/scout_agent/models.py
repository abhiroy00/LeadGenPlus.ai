from django.db import models

class LeadSearch(models.Model):
    business_type = models.CharField(max_length=255)
    location      = models.CharField(max_length=255)
    max_leads     = models.IntegerField(default=10)
    created_at    = models.DateTimeField(auto_now_add=True)
    status        = models.CharField(max_length=50, default='pending')

    def __str__(self):
        return f"{self.business_type} in {self.location}"


class Lead(models.Model):
    search        = models.ForeignKey(LeadSearch, on_delete=models.CASCADE, related_name='leads')
    company_name  = models.CharField(max_length=255)
    category      = models.CharField(max_length=255, blank=True)
    website       = models.URLField(blank=True)
    phone_number  = models.CharField(max_length=50, blank=True)
    email_address = models.EmailField(blank=True)
    address       = models.TextField(blank=True)
    created_at    = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.company_name} — {self.email_address}"