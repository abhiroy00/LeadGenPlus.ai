"""
Django settings for LeadGenPlus backend project.
Updated with: JWT, DRF, CORS, Celery, Channels, PostgreSQL
"""

from celery.schedules import crontab
from pathlib import Path
from datetime import timedelta
from decouple import config
import os
from dotenv import load_dotenv
from urllib.parse import urlparse, parse_qsl


load_dotenv()
tmpPostgres = urlparse(os.getenv("DATABASE_URL"))


# ── Base ──────────────────────────────────────────────────────
BASE_DIR = Path(__file__).resolve().parent.parent

# ── Security ──────────────────────────────────────────────────
# Load from .env file — never hardcode in production!
SECRET_KEY = config(
    'DJANGO_SECRET_KEY',
    default='django-insecure-i8mv_=n!rs^a83+x5sm7(15atwqs7w#!o3ry60vz#cun902l2h'
)

DEBUG = config('DEBUG', default=True, cast=bool)

ALLOWED_HOSTS = config(
    'ALLOWED_HOSTS',
    default='localhost,127.0.0.1'
).split(',')


# ── Apps ──────────────────────────────────────────────────────
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # ── Third party ───────────────────────────────────────────
    'rest_framework',                            # DRF
    'rest_framework_simplejwt',                  # JWT auth
    'rest_framework_simplejwt.token_blacklist',  # Logout/blacklist
    'corsheaders',                               # CORS for React
    'channels',                                  # WebSocket
    'django_celery_beat',                        # Scheduled tasks
    'drf_spectacular',
    'drf_spectacular_sidecar',

    # ── Your apps ─────────────────────────────────────────────
    # NOTE: 'app.users' → fixed to 'apps.users' below
    'apps.users.apps.UsersConfig',
    'apps.accounts.apps.AccountsConfig',
    'apps.campaigns.apps.CampaignsConfig',
    'apps.leads.apps.LeadsConfig',
    'apps.inbox.apps.InboxConfig',
    'apps.analytics.apps.AnalyticsConfig',
    'apps.agents.apps.AgentsConfig',
]


# ── Middleware ────────────────────────────────────────────────
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Must be FIRST
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# WSGI for regular HTTP
WSGI_APPLICATION = 'backend.wsgi.application'

# ASGI for WebSocket (Django Channels)
ASGI_APPLICATION = 'backend.asgi.application'


# ── Database ──────────────────────────────────────────────────
# Development:  SQLite (no setup needed — use as-is)
# Production:   set DB_ENGINE=postgresql in .env

# DB_ENGINE = config('DB_ENGINE', default='sqlite')

# if DB_ENGINE == 'postgresql':
#     DATABASES = {
#         'default': {
#             'ENGINE':   'django.db.backends.postgresql',
#             'NAME':     config('DB_NAME',     default='leadgenplus'),
#             'USER':     config('DB_USER',     default='postgres'),
#             'PASSWORD': config('DB_PASSWORD', default='postgres'),
#             'HOST':     config('DB_HOST',     default='localhost'),
#             'PORT':     config('DB_PORT',     default='5432'),
#             'OPTIONS': {
#                 'connect_timeout': 10,
#             }
#         }
#     }
# else:
#     # Keep your existing SQLite for local dev
#     DATABASES = {
#         'default': {
#             'ENGINE': 'django.db.backends.sqlite3',
#             'NAME':   BASE_DIR / 'db.sqlite3',
#         }
#     }


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': tmpPostgres.path.replace('/', ''),
        'USER': tmpPostgres.username,
        'PASSWORD': tmpPostgres.password,
        'HOST': tmpPostgres.hostname,
        'PORT': 5432,
        'OPTIONS': dict(parse_qsl(tmpPostgres.query)),
    }
}


# ── Password Validation ───────────────────────────────────────
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'OPTIONS': {'min_length': 8},
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# ── Internationalisation ──────────────────────────────────────
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Kolkata'   # IST — important for lead scheduling!
USE_I18N = True
USE_TZ = True


# ── Static & Media ────────────────────────────────────────────
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# ════════════════════════════════════════════════════════════
# JWT  —  djangorestframework-simplejwt
# pip install djangorestframework-simplejwt
# ════════════════════════════════════════════════════════════
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME':    timedelta(hours=1),
    'REFRESH_TOKEN_LIFETIME':   timedelta(days=7),

    # Issue a NEW refresh token every time one is used
    'ROTATE_REFRESH_TOKENS':    True,

    # Old refresh tokens are blacklisted after rotation
    'BLACKLIST_AFTER_ROTATION': True,

    'UPDATE_LAST_LOGIN': True,
    'ALGORITHM':         'HS256',
    'SIGNING_KEY':       SECRET_KEY,

    # Frontend sends:  Authorization: Bearer <token>
    'AUTH_HEADER_TYPES': ('Bearer',),

    # Our custom serializer embeds plan + quota + features in JWT
}


# ════════════════════════════════════════════════════════════
# Django REST Framework
# pip install djangorestframework
# ════════════════════════════════════════════════════════════
REST_FRAMEWORK = {
    # JWT auth for all endpoints
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],

    # All endpoints require login unless overridden with
    # @permission_classes([AllowAny])
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],

    # Drf (swagger)
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',

    # JSON only responses
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],

    # Accept JSON + file uploads (CSV import)
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
        'rest_framework.parsers.MultiPartParser',
        'rest_framework.parsers.FormParser',
    ],

    # Consistent error format — reads in frontend as error.code
    'EXCEPTION_HANDLER':
        'apps.users.exceptions.custom_exception_handler',

    # Pagination for leads table, campaigns list etc.
    'DEFAULT_PAGINATION_CLASS':
        'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 25,

    # Rate limiting — prevent abuse on login endpoint
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '20/hour',    # Login attempts (unauthenticated)
        'user': '1000/hour',  # Normal authenticated usage
    },
}


# ════════════════════════════════════════════════════════════
# CORS  —  django-cors-headers
# pip install django-cors-headers
# ════════════════════════════════════════════════════════════
CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',   # Vite dev server
    'http://localhost:3000',   # Alternative dev port
    config('FRONTEND_URL', default='https://leadgenplus.ai'),
]

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',       # JWT Bearer token
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]


# ════════════════════════════════════════════════════════════
# Redis  —  used by BOTH Celery and Django Channels
# sudo apt install redis-server   (or use Docker)
# ════════════════════════════════════════════════════════════
REDIS_URL = config('REDIS_URL', default='redis://localhost:6379/0')


# ════════════════════════════════════════════════════════════
# Celery  —  runs AI agents as background tasks
# pip install celery django-celery-beat redis
# Start worker:  celery -A backend worker --loglevel=info
# Start beat:    celery -A backend beat --loglevel=info
# ════════════════════════════════════════════════════════════
CELERY_BROKER_URL = REDIS_URL
CELERY_RESULT_BACKEND = REDIS_URL
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE = 'Asia/Kolkata'
CELERY_TASK_ACKS_LATE = True
CELERY_WORKER_PREFETCH_MULTIPLIER = 1

# Route heavy tasks to separate queues
# Start agents queue:   celery -A backend worker -Q agents
# Start messages queue: celery -A backend worker -Q messages
CELERY_TASK_ROUTES = {
    'apps.agents.tasks.run_scout_agent':         {'queue': 'agents'},
    'apps.agents.tasks.run_qualifier_agent':     {'queue': 'agents'},
    'apps.agents.tasks.run_copywriter_agent':    {'queue': 'agents'},
    'apps.agents.tasks.run_conversation_agent':  {'queue': 'agents'},
    'apps.campaigns.tasks.send_whatsapp_message': {'queue': 'messages'},
    'apps.users.tasks.check_trial_expiry':       {'queue': 'default'},
    'apps.users.tasks.reset_monthly_usage':      {'queue': 'default'},
}

# Scheduled tasks (Celery Beat)

CELERY_BEAT_SCHEDULE = {
    # Check which trials expire in 2 days — send reminder email
    'check-trial-expiry': {
        'task':     'apps.users.tasks.check_trial_expiry',
        'schedule': crontab(hour=9, minute=0),  # 9am IST daily
    },
    # Reset leads/messages usage counters on 1st of every month
    'reset-monthly-usage': {
        'task':     'apps.users.tasks.reset_monthly_usage',
        'schedule': crontab(day_of_month=1, hour=0, minute=5),
    },
    # Generate nightly analytics report for all campaigns
    'generate-daily-report': {
        'task':     'apps.analytics.tasks.generate_daily_report',
        'schedule': crontab(hour=0, minute=30),  # 12:30am IST
    },
    # Pick A/B test winners every Monday morning
    'evaluate-ab-tests': {
        'task':     'apps.analytics.tasks.run_ab_test_evaluation',
        'schedule': crontab(day_of_week=1, hour=8, minute=0),
    },
}


# ════════════════════════════════════════════════════════════
# Django Channels  —  WebSocket for Inbox + Agent Live Logs
# pip install channels channels-redis daphne
# Start server:  daphne -p 8001 backend.asgi:application
# ════════════════════════════════════════════════════════════
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            'hosts': [REDIS_URL],
        },
    },
}


# ════════════════════════════════════════════════════════════
# Email  —  trial reminders + notifications
# Dev:  prints to console (no setup needed)
# Prod: set EMAIL_BACKEND=smtp in .env
# ════════════════════════════════════════════════════════════
EMAIL_BACKEND = config(
    'EMAIL_BACKEND',
    default='django.core.mail.backends.console.EmailBackend'
)
EMAIL_HOST = config('EMAIL_HOST',          default='smtp.gmail.com')
EMAIL_PORT = config('EMAIL_PORT',          default=587, cast=int)
EMAIL_USE_TLS = config('EMAIL_USE_TLS',       default=True, cast=bool)
EMAIL_HOST_USER = config('EMAIL_HOST_USER',     default='')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD', default='')
DEFAULT_FROM_EMAIL = config(
    'DEFAULT_FROM_EMAIL',
    default='LeadGenPlus.ai <noreply@leadgenplus.ai>'
)


# ════════════════════════════════════════════════════════════
# OpenAI  —  GPT-4o for all 8 AI agents
# pip install openai
# ════════════════════════════════════════════════════════════
OPENAI_API_KEY = config('OPENAI_API_KEY',    default='')
OPENAI_MODEL = config('OPENAI_MODEL',      default='gpt-4o')
OPENAI_MAX_TOKENS = config('OPENAI_MAX_TOKENS', default=1000, cast=int)


# ════════════════════════════════════════════════════════════
# WhatsApp Business API
# ════════════════════════════════════════════════════════════
WHATSAPP_PROVIDER = config('WHATSAPP_PROVIDER',     default='360dialog')
WHATSAPP_API_KEY = config('WHATSAPP_API_KEY',      default='')
WHATSAPP_PHONE_ID = config('WHATSAPP_PHONE_ID',     default='')
WHATSAPP_VERIFY_TOKEN = config(
    'WHATSAPP_VERIFY_TOKEN', default='leadgenplus_verify')


# ════════════════════════════════════════════════════════════
# Razorpay  —  plan upgrade payments
# pip install razorpay
# ════════════════════════════════════════════════════════════
RAZORPAY_KEY_ID = config('RAZORPAY_KEY_ID',     default='')
RAZORPAY_KEY_SECRET = config('RAZORPAY_KEY_SECRET', default='')


# ════════════════════════════════════════════════════════════
# Sentry  —  error tracking (free up to 5K errors/month)
# pip install sentry-sdk[django]
# ════════════════════════════════════════════════════════════
SENTRY_DSN = config('SENTRY_DSN', default='')

if SENTRY_DSN:
    import sentry_sdk
    sentry_sdk.init(
        dsn=SENTRY_DSN,
        environment='production' if not DEBUG else 'development',
        traces_sample_rate=0.1,
        send_default_pii=False,
    )


# ════════════════════════════════════════════════════════════
# Logging  —  helps debug agents + webhook issues
# ════════════════════════════════════════════════════════════
os.makedirs(BASE_DIR / 'logs', exist_ok=True)

LOGGING = {
    'version':                  1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '[{levelname}] {asctime} {module}: {message}',
            'style':  '{',
        },
        'simple': {
            'format': '[{levelname}] {message}',
            'style':  '{',
        },
    },
    'handlers': {
        'console': {
            'class':     'logging.StreamHandler',
            'formatter': 'verbose',
        },
        'file': {
            'class':     'logging.FileHandler',
            'filename':  BASE_DIR / 'logs' / 'leadgenplus.log',
            'formatter': 'verbose',
        },
    },
    'loggers': {
        'django':             {'handlers': ['console'],          'level': 'WARNING'},
        'apps.agents':        {'handlers': ['console', 'file'],  'level': 'DEBUG'},
        'apps.campaigns':     {'handlers': ['console', 'file'],  'level': 'DEBUG'},
        'apps.webhooks':      {'handlers': ['console', 'file'],  'level': 'DEBUG'},
        'apps.users':         {'handlers': ['console'],          'level': 'INFO'},
    },
}

SPECTACULAR_SETTINGS = {
    'TITLE': 'LeadGenPlus API',
    'DESCRIPTION': 'LeadGenPlus Backend API Documentation',
    'VERSION': '1.0.0',

    'SERVE_INCLUDE_SCHEMA': False,

    'SWAGGER_UI_SETTINGS': {
        'persistAuthorization': True,
    },

    # JWT Auth Support
    'SECURITY': [
        {'BearerAuth': []},
    ],

    'COMPONENTS': {
        'securitySchemes': {
            'BearerAuth': {
                'type': 'http',
                'scheme': 'bearer',
                'bearerFormat': 'JWT'
            }
        }
    }
}