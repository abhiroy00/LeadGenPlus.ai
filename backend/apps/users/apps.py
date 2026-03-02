# apps/users/apps.py

from django.apps import AppConfig

class UsersConfig(AppConfig):
    name = 'apps.users'          # ← Must match INSTALLED_APPS exactly
    default_auto_field = 'django.db.models.BigAutoField'

    def ready(self):
        import apps.users.signals  # ← Also fix this import path