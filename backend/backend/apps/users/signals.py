# backend/users/signals.py

from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.utils import timezone
from datetime import timedelta
from .models import UserProfile, UsageTracker, Plan


@receiver(post_save, sender=User)
def create_profile_and_usage(sender, instance,
                              created, **kwargs):
    if not created:
        return

    try:
        trial_plan = Plan.objects.get(name='trial')
    except Plan.DoesNotExist:
        trial_plan = None

    UserProfile.objects.create(
        user            = instance,
        plan            = trial_plan,
        role            = 'trial',
        plan_expires_at = (timezone.now()
                           + timedelta(days=7)),
    )
    UsageTracker.objects.create(user=instance)