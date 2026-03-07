from celery.schedules import crontab

CELERY_BEAT_SCHEDULE = {

    "cleanup-expired-tokens": {
        "task": "rest_framework_simplejwt.token_blacklist.tasks.flushexpiredtokens",
        "schedule": crontab(hour=3, minute=0),
        "options": {"queue": "default"},
    },

    "process-scheduled-campaigns": {
        "task": "apps.campaigns.tasks.process_scheduled_campaigns",
        "schedule": crontab(minute="*"),
        "options": {"queue": "campaigns"},
    },

    "aggregate-analytics": {
        "task": "apps.analytics.tasks.aggregate_metrics",
        "schedule": crontab(minute="*/5"),
        "options": {"queue": "default"},
    },
}