# LeadGenAI — Production Folder Structure
# Stack: React + Tailwind CSS (Frontend) · Django + DRF (Backend)

```
leadgenai/
│
├── .github/
│   ├── workflows/
│   │   ├── frontend-ci.yml              # ESLint, Vitest, build check on PR
│   │   ├── backend-ci.yml               # flake8, pytest, mypy on PR
│   │   ├── deploy-staging.yml
│   │   └── deploy-prod.yml
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── CODEOWNERS
│
# ─────────────────────────────────────────
# FRONTEND — React + Tailwind CSS (Vite)
# ─────────────────────────────────────────
├── frontend/
│   ├── public/
│   │   ├── favicon.ico
│   │   └── og-image.png
│   │
│   ├── src/
│   │   │
│   │   ├── assets/                      # Static assets
│   │   │   ├── fonts/
│   │   │   ├── icons/
│   │   │   └── images/
│   │   │
│   │   ├── components/
│   │   │   │
│   │   │   ├── ui/                      # Base design system primitives
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Badge.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Dialog.tsx
│   │   │   │   ├── Dropdown.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Select.tsx
│   │   │   │   ├── Table.tsx
│   │   │   │   ├── Tabs.tsx
│   │   │   │   ├── Toast.tsx
│   │   │   │   ├── Tooltip.tsx
│   │   │   │   ├── Skeleton.tsx
│   │   │   │   ├── Spinner.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── layout/                  # App shell components
│   │   │   │   ├── AppShell.tsx         # Root layout wrapper
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── TopNav.tsx
│   │   │   │   ├── PageHeader.tsx
│   │   │   │   └── MobileNavDrawer.tsx
│   │   │   │
│   │   │   ├── dashboard/               # Screen 1
│   │   │   │   ├── StatCard.tsx
│   │   │   │   ├── ActivityFeed.tsx
│   │   │   │   ├── CampaignQuickList.tsx
│   │   │   │   └── WelcomeBanner.tsx
│   │   │   │
│   │   │   ├── leads/                   # Screen 2 — Leads CRM
│   │   │   │   ├── LeadsTable.tsx
│   │   │   │   ├── LeadRow.tsx
│   │   │   │   ├── LeadScorePill.tsx
│   │   │   │   ├── LeadFilterBar.tsx
│   │   │   │   ├── LeadDetailPanel.tsx
│   │   │   │   └── LeadImportModal.tsx
│   │   │   │
│   │   │   ├── campaigns/               # Screen 3 — Campaign Builder
│   │   │   │   ├── CampaignCard.tsx
│   │   │   │   ├── CampaignStatusBadge.tsx
│   │   │   │   ├── CampaignMetricsBar.tsx
│   │   │   │   ├── FlowCanvas.tsx       # React Flow wrapper
│   │   │   │   └── nodes/
│   │   │   │       ├── TriggerNode.tsx
│   │   │   │       ├── MessageNode.tsx
│   │   │   │       ├── DelayNode.tsx
│   │   │   │       ├── ConditionNode.tsx
│   │   │   │       └── GoalNode.tsx
│   │   │   │
│   │   │   ├── inbox/                   # Screen 4 — WhatsApp Inbox
│   │   │   │   ├── ConversationList.tsx
│   │   │   │   ├── ConversationItem.tsx
│   │   │   │   ├── ChatWindow.tsx
│   │   │   │   ├── MessageBubble.tsx    # AI vs human variant prop
│   │   │   │   ├── QuickReplyBar.tsx
│   │   │   │   └── LeadInfoSidebar.tsx
│   │   │   │
│   │   │   ├── analytics/               # Screen 5 — Analytics
│   │   │   │   ├── MetricCard.tsx
│   │   │   │   ├── BarChart.tsx
│   │   │   │   ├── DonutChart.tsx
│   │   │   │   ├── FunnelChart.tsx
│   │   │   │   └── DateRangePicker.tsx
│   │   │   │
│   │   │   └── agents/                  # Screen 6 — AI Agent Monitor
│   │   │       ├── AgentGrid.tsx
│   │   │       ├── AgentCard.tsx
│   │   │       ├── AgentStatusDot.tsx
│   │   │       └── LiveLogPanel.tsx     # SSE stream display
│   │   │
│   │   ├── pages/                       # Route-level page components
│   │   │   ├── auth/
│   │   │   │   ├── LoginPage.tsx
│   │   │   │   └── OnboardingPage.tsx
│   │   │   ├── DashboardPage.tsx        # Screen 1
│   │   │   ├── LeadsPage.tsx            # Screen 2
│   │   │   ├── CampaignsPage.tsx        # Screen 3 list
│   │   │   ├── CampaignBuilderPage.tsx  # Screen 3 builder/flow
│   │   │   ├── InboxPage.tsx            # Screen 4
│   │   │   ├── AnalyticsPage.tsx        # Screen 5
│   │   │   └── AgentsPage.tsx           # Screen 6
│   │   │
│   │   ├── hooks/                       # Custom React hooks
│   │   │   ├── useLeads.ts
│   │   │   ├── useCampaigns.ts
│   │   │   ├── useInbox.ts              # WebSocket hook
│   │   │   ├── useAgentLogs.ts          # SSE hook
│   │   │   ├── useAnalytics.ts
│   │   │   ├── useAuth.ts
│   │   │   ├── useToast.ts
│   │   │   └── useDebounce.ts
│   │   │
│   │   ├── store/                       # Zustand global state
│   │   │   ├── authStore.ts
│   │   │   ├── uiStore.ts               # Sidebar state, active tab
│   │   │   ├── inboxStore.ts            # Optimistic chat messages
│   │   │   └── agentStore.ts            # Live agent status cache
│   │   │
│   │   ├── services/                    # API call layer (axios)
│   │   │   ├── api.ts                   # Axios instance + interceptors
│   │   │   ├── leads.service.ts
│   │   │   ├── campaigns.service.ts
│   │   │   ├── inbox.service.ts
│   │   │   ├── analytics.service.ts
│   │   │   ├── agents.service.ts
│   │   │   └── auth.service.ts
│   │   │
│   │   ├── types/                       # TypeScript type definitions
│   │   │   ├── lead.types.ts
│   │   │   ├── campaign.types.ts
│   │   │   ├── message.types.ts
│   │   │   ├── agent.types.ts
│   │   │   ├── analytics.types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── utils/                       # Pure utility functions
│   │   │   ├── cn.ts                    # Tailwind class merger (clsx + twMerge)
│   │   │   ├── formatters.ts            # Date, number, currency
│   │   │   ├── validators.ts
│   │   │   └── constants.ts
│   │   │
│   │   ├── router/
│   │   │   ├── index.tsx                # React Router v6 root
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── routes.ts                # Route path constants
│   │   │
│   │   ├── styles/
│   │   │   ├── globals.css              # Tailwind @base, @components, @utilities
│   │   │   └── animations.css           # Custom keyframes
│   │   │
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── .env.example
│   ├── .eslintrc.cjs
│   ├── .prettierrc
│   ├── index.html
│   ├── tailwind.config.ts
│   ├── postcss.config.js
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── package.json
│
# ─────────────────────────────────────────
# BACKEND — Django + Django REST Framework
# ─────────────────────────────────────────
├── backend/
│   │
│   ├── config/                          # Django project root (settings split)
│   │   ├── __init__.py
│   │   ├── settings/
│   │   │   ├── __init__.py
│   │   │   ├── base.py                  # Shared settings
│   │   │   ├── development.py
│   │   │   ├── staging.py
│   │   │   └── production.py
│   │   ├── urls.py                      # Root URL dispatcher
│   │   ├── wsgi.py
│   │   └── asgi.py                      # For Channels (WebSocket/SSE)
│   │
│   ├── apps/                            # All Django apps live here
│   │   │
│   │   ├── accounts/                    # Auth & user management
│   │   │   ├── migrations/
│   │   │   ├── __init__.py
│   │   │   ├── admin.py
│   │   │   ├── models.py                # CustomUser, Organization, Membership
│   │   │   ├── serializers.py
│   │   │   ├── views.py                 # Register, login, token refresh
│   │   │   ├── urls.py
│   │   │   ├── permissions.py
│   │   │   └── tests/
│   │   │       ├── test_models.py
│   │   │       └── test_views.py
│   │   │
│   │   ├── leads/                       # Lead scraping, scoring, CRM
│   │   │   ├── migrations/
│   │   │   ├── __init__.py
│   │   │   ├── admin.py
│   │   │   ├── models.py                # Lead, LeadNote, LeadActivity
│   │   │   ├── serializers.py
│   │   │   ├── views.py                 # LeadViewSet (DRF ModelViewSet)
│   │   │   ├── urls.py
│   │   │   ├── filters.py               # django-filter: score, status, source
│   │   │   ├── tasks.py                 # Celery: scrape, score, enrich
│   │   │   └── tests/
│   │   │       ├── test_models.py
│   │   │       ├── test_serializers.py
│   │   │       └── test_views.py
│   │   │
│   │   ├── campaigns/                   # Campaign builder & flow
│   │   │   ├── migrations/
│   │   │   ├── __init__.py
│   │   │   ├── admin.py
│   │   │   ├── models.py                # Campaign, FlowNode, FlowEdge, CampaignLead
│   │   │   ├── serializers.py
│   │   │   ├── views.py
│   │   │   ├── urls.py
│   │   │   ├── tasks.py                 # Celery: launch, pause, resume campaign
│   │   │   └── tests/
│   │   │
│   │   ├── inbox/                       # WhatsApp conversation management
│   │   │   ├── migrations/
│   │   │   ├── __init__.py
│   │   │   ├── admin.py
│   │   │   ├── models.py                # Conversation, Message, QuickReply
│   │   │   ├── serializers.py
│   │   │   ├── views.py                 # Conversations, messages, send reply
│   │   │   ├── urls.py
│   │   │   ├── consumers.py             # Django Channels WebSocket consumer
│   │   │   ├── routing.py               # WS URL routing
│   │   │   └── tests/
│   │   │
│   │   ├── analytics/                   # Campaign & funnel analytics
│   │   │   ├── migrations/
│   │   │   ├── __init__.py
│   │   │   ├── models.py                # Event, CampaignSnapshot
│   │   │   ├── serializers.py
│   │   │   ├── views.py                 # Dashboard stats, funnel, bar chart data
│   │   │   ├── urls.py
│   │   │   ├── aggregators.py           # Query helpers for funnel/chart data
│   │   │   ├── tasks.py                 # Celery: nightly rollups
│   │   │   └── tests/
│   │   │
│   │   ├── agents/                      # AI Agent orchestration
│   │   │   ├── migrations/
│   │   │   ├── __init__.py
│   │   │   ├── admin.py
│   │   │   ├── models.py                # Agent, AgentRun, AgentLog
│   │   │   ├── serializers.py
│   │   │   ├── views.py                 # Agent status, logs endpoint (SSE)
│   │   │   ├── urls.py
│   │   │   ├── consumers.py             # Channels consumer for live logs
│   │   │   ├── routing.py
│   │   │   ├── runner/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── base_agent.py
│   │   │   │   ├── llm_client.py        # OpenAI / Anthropic wrapper
│   │   │   │   ├── scout_agent.py
│   │   │   │   ├── qualifier_agent.py
│   │   │   │   ├── copywriter_agent.py
│   │   │   │   ├── scheduler_agent.py
│   │   │   │   ├── conversation_agent.py
│   │   │   │   ├── analytics_agent.py
│   │   │   │   ├── compliance_agent.py
│   │   │   │   └── orchestrator_agent.py
│   │   │   └── tests/
│   │   │
│   │   └── webhooks/                    # Inbound webhook handlers
│   │       ├── __init__.py
│   │       ├── views.py                 # WhatsApp, Stripe webhook views
│   │       ├── urls.py
│   │       ├── validators.py            # Signature verification
│   │       └── tests/
│   │
│   ├── core/                            # Shared Django utilities (not an app)
│   │   ├── __init__.py
│   │   ├── models.py                    # TimeStampedModel, SoftDeleteModel
│   │   ├── permissions.py               # IsOrganizationMember, etc.
│   │   ├── pagination.py                # Custom DRF pagination
│   │   ├── exceptions.py                # Custom DRF exception handler
│   │   ├── renderers.py
│   │   └── utils.py
│   │
│   ├── integrations/                    # Third-party service wrappers
│   │   ├── __init__.py
│   │   ├── whatsapp/
│   │   │   ├── __init__.py
│   │   │   ├── client.py                # WhatsApp Business API client
│   │   │   ├── sender.py
│   │   │   └── parser.py                # Parse inbound webhook payloads
│   │   ├── openai_client.py
│   │   ├── scraper.py                   # Google Maps / LinkedIn scraper
│   │   └── stripe_client.py
│   │
│   ├── celery_app/                      # Celery configuration
│   │   ├── __init__.py
│   │   ├── celery.py                    # Celery app instance
│   │   ├── beat_schedule.py             # Periodic task schedule
│   │   └── routing.py                   # Queue routing (scraper, mailer, etc.)
│   │
│   ├── tests/                           # Top-level integration tests
│   │   ├── conftest.py                  # pytest fixtures, factory_boy factories
│   │   └── test_integration.py
│   │
│   ├── manage.py
│   ├── requirements/
│   │   ├── base.txt
│   │   ├── development.txt
│   │   └── production.txt
│   ├── .env.example
│   ├── pytest.ini
│   ├── setup.cfg                        # flake8, isort config
│   ├── mypy.ini
│   └── Dockerfile
│
# ─────────────────────────────────────────
# INFRA & ROOT
# ─────────────────────────────────────────
├── infra/
│   ├── nginx/
│   │   └── nginx.conf                   # Reverse proxy: /api → Django, / → React
│   ├── terraform/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── modules/
│   │       ├── vpc/
│   │       ├── ec2_ecs/
│   │       ├── rds/                     # PostgreSQL
│   │       ├── elasticache/             # Redis (Channels + Celery broker)
│   │       └── s3/                      # Media uploads
│   └── k8s/                             # Optional Kubernetes manifests
│       ├── frontend-deployment.yaml
│       ├── backend-deployment.yaml
│       └── celery-worker-deployment.yaml
│
├── docker-compose.yml                   # Local dev: frontend, backend, db, redis
├── docker-compose.prod.yml
├── .env.example
└── README.md
```

---

## Key Architecture Decisions

### Frontend (React + Vite + Tailwind)

**Routing**: React Router v6 with a `ProtectedRoute` wrapper. All authenticated screens render inside `AppShell.tsx` which mounts the Sidebar and TopNav once — clean separation from auth pages.

**State**: Zustand for global state (auth token, sidebar open, inbox messages). React Query (`@tanstack/react-query`) for server state — caching, background refetch, and optimistic updates on message send.

**API Layer**: Axios instance in `services/api.ts` attaches the JWT token via interceptor and handles 401 refresh. Each domain (leads, campaigns, inbox) gets its own service file — pages/hooks never call `axios` directly.

**Real-time**: `useInbox.ts` manages a native WebSocket to Django Channels for live chat. `useAgentLogs.ts` consumes an SSE endpoint for the live log panel on Screen 6.

**Tailwind**: `tailwind.config.ts` extends the default theme with LeadGenAI design tokens (brand colors, font family). `cn.ts` wraps `clsx` + `tailwind-merge` for conditional class composition.

---

### Backend (Django + DRF + Channels + Celery)

**Apps**: One Django app per domain (`leads`, `campaigns`, `inbox`, `analytics`, `agents`, `webhooks`). The `core/` directory holds shared base models and DRF utilities — it is not registered as an app.

**Settings Split**: `config/settings/base.py` → `development.py` / `production.py`. `DJANGO_SETTINGS_MODULE` env var selects the right one. No monolithic `settings.py`.

**REST API**: Django REST Framework `ModelViewSet` for standard CRUD. `django-filter` for `LeadFilterBar` query params (score range, status, source, date). Custom `pagination.py` for cursor-based pagination on the leads table.

**WebSockets / SSE**: Django Channels with Redis channel layer. `inbox/consumers.py` handles real-time chat. `agents/consumers.py` broadcasts live agent log lines to the frontend's `LiveLogPanel`.

**Task Queue**: Celery with Redis broker. Tasks live in `tasks.py` inside each app (scraping, AI scoring, message sending, analytics rollups). `beat_schedule.py` defines periodic jobs (nightly reports, daily scrape runs).

**AI Agents**: `apps/agents/runner/` contains `base_agent.py` and one file per agent. Agents are invoked as Celery tasks and write log entries to the `AgentLog` model, which the Channels consumer then broadcasts.

**Authentication**: `djangorestframework-simplejwt` — access + refresh tokens. The `accounts` app handles registration, login, and token endpoints consumed by the React `auth.service.ts`.

---

### Data Flow Example (Lead → WhatsApp Message)

```
Scout Agent (Celery task)
  → scrapes Google Maps
  → creates Lead records (PostgreSQL)

Qualifier Agent (Celery task)
  → scores each Lead via GPT-4o
  → updates Lead.score field

Copywriter Agent (Celery task)
  → generates personalized WA message text

Scheduler Agent (Celery task)
  → enqueues message in Celery Beat at optimal send time

WhatsApp sender (integrations/whatsapp/sender.py)
  → calls WhatsApp Business API

Inbound reply (webhooks/views.py)
  → parses payload, creates Message record
  → broadcasts to inbox/consumers.py via Channels
  → React InboxPage WebSocket receives → updates ChatWindow
```