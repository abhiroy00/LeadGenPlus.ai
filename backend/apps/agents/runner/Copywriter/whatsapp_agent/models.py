from django.db import models


class Lead(models.Model):
    """Single lead / contact to message."""

    STATUS_CHOICES = [
        ("pending",   "Pending"),
        ("success",   "Success"),
        ("failed",    "Failed"),
        ("skipped",   "Skipped"),
    ]

    name         = models.CharField(max_length=200)
    phone        = models.CharField(max_length=20, unique=True)
    business     = models.CharField(max_length=200, blank=True)
    interest     = models.CharField(max_length=300, blank=True)
    city         = models.CharField(max_length=100, blank=True)
    email        = models.EmailField(blank=True)

    status       = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    message_sent = models.TextField(blank=True)
    message_id   = models.CharField(max_length=200, blank=True)
    error        = models.TextField(blank=True)

    created_at   = models.DateTimeField(auto_now_add=True)
    sent_at      = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} ({self.phone}) — {self.status}"


class CampaignRun(models.Model):
    """Records each time the agent is run."""

    STATUS_CHOICES = [
        ("running",   "Running"),
        ("completed", "Completed"),
        ("failed",    "Failed"),
    ]

    started_at   = models.DateTimeField(auto_now_add=True)
    finished_at  = models.DateTimeField(null=True, blank=True)
    status       = models.CharField(max_length=20, choices=STATUS_CHOICES, default="running")
    total        = models.IntegerField(default=0)
    successful   = models.IntegerField(default=0)
    failed       = models.IntegerField(default=0)
    log          = models.TextField(blank=True)

    class Meta:
        ordering = ["-started_at"]

    def __str__(self):
        return f"Run {self.id} — {self.status} ({self.started_at.strftime('%Y-%m-%d %H:%M')})"
