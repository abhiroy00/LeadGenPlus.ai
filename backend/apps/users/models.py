
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta


class Plan(models.Model):
    PLAN_CHOICES = [
        ('trial',      'Free Trial'),
        ('pro',        'Pro'),
        ('enterprise', 'Enterprise'),
    ]
    name     = models.CharField(
                   max_length=20,
                   choices=PLAN_CHOICES,
                   unique=True
               )
    price          = models.IntegerField(default=0)
    duration_days  = models.IntegerField(default=7)

    # ── RBAC Feature Flags ────────────────────────────────
    can_flow_builder    = models.BooleanField(default=True)
    can_ai_agents       = models.BooleanField(default=False)
    can_api_access      = models.BooleanField(default=False)
    can_export          = models.BooleanField(default=False)
    can_team_members    = models.BooleanField(default=False)
    can_custom_agents   = models.BooleanField(default=False)
    can_ads_agent       = models.BooleanField(default=False)

    # ── ABAC Quota Limits ─────────────────────────────────
    leads_limit     = models.IntegerField(default=500)
    campaigns_limit = models.IntegerField(default=1)
    messages_limit  = models.IntegerField(default=1000)
    agents_limit    = models.IntegerField(default=2)
    team_limit      = models.IntegerField(default=1)

    class Meta:
        db_table = 'plans'

    def __str__(self):
        return f"{self.name} (Rs.{self.price})"


class UserProfile(models.Model):
    ROLE_CHOICES = [
        ('trial',      'Trial'),
        ('pro',        'Pro'),
        ('enterprise', 'Enterprise'),
        ('admin',      'Admin'),
    ]
    user         = models.OneToOneField(
                       User,
                       on_delete=models.CASCADE,
                       related_name='profile'
                   )
    plan         = models.ForeignKey(
                       Plan,
                       on_delete=models.PROTECT,
                       null=True, blank=True
                   )
    role         = models.CharField(
                       max_length=20,
                       choices=ROLE_CHOICES,
                       default='trial'
                   )
    company_name     = models.CharField(
                           max_length=200, blank=True)
    phone            = models.CharField(
                           max_length=20, blank=True)
    avatar           = models.URLField(blank=True)
    trial_started_at = models.DateTimeField(
                           auto_now_add=True)
    plan_expires_at  = models.DateTimeField(
                           null=True, blank=True)
    is_active        = models.BooleanField(default=True)
    razorpay_customer_id = models.CharField(
                               max_length=100, blank=True)

    class Meta:
        db_table = 'user_profiles'

    def __str__(self):
        return f"{self.user.email} ({self.role})"

    @property
    def is_trial_expired(self):
        if self.role != 'trial':
            return False
        if not self.plan_expires_at:
            return False
        return timezone.now() > self.plan_expires_at

    @property
    def days_left(self):
        if not self.plan_expires_at:
            return 0
        delta = self.plan_expires_at - timezone.now()
        return max(0, delta.days)

    @property
    def is_expired(self):
        if not self.plan_expires_at:
            return False
        return timezone.now() > self.plan_expires_at


class UsageTracker(models.Model):
    user            = models.OneToOneField(
                          User,
                          on_delete=models.CASCADE,
                          related_name='usage'
                      )
    leads_used      = models.IntegerField(default=0)
    campaigns_used  = models.IntegerField(default=0)
    messages_sent   = models.IntegerField(default=0)
    agents_active   = models.IntegerField(default=0)
    last_reset_at   = models.DateTimeField(
                          auto_now_add=True)

    class Meta:
        db_table = 'usage_trackers'

    def can_use(self, resource):
        """Check if under quota for a resource"""
        plan  = self.user.profile.plan
        used  = getattr(self, f"{resource}_used",  0)
        limit = getattr(plan,  f"{resource}_limit", 0)
        return used < limit

    def increment(self, resource, amount=1):
        """Safely add to a usage counter"""
        field = f"{resource}_used"
        if resource == 'messages':
            field = 'messages_sent'
        current = getattr(self, field, 0)
        setattr(self, field, current + amount)
        self.save(update_fields=[field])

    def reset_monthly(self):
        self.leads_used    = 0
        self.messages_sent = 0
        self.last_reset_at = timezone.now()
        self.save()