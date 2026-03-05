from kombu import Exchange, Queue

default_exchange = Exchange("default", type="direct")

CELERY_TASK_QUEUES = (
    Queue("default", default_exchange, routing_key="default"),
    Queue("leads", default_exchange, routing_key="leads"),
    Queue("campaigns", default_exchange, routing_key="campaigns"),
    Queue("messaging", default_exchange, routing_key="messaging"),
    Queue("agents", default_exchange, routing_key="agents"),
)

CELERY_TASK_ROUTES = {
    "apps.leads.tasks.*": {"queue": "leads", "routing_key": "leads"},
    "apps.campaigns.tasks.*": {"queue": "campaigns", "routing_key": "campaigns"},
    "apps.inbox.tasks.*": {"queue": "messaging", "routing_key": "messaging"},
    "apps.agents.tasks.*": {"queue": "agents", "routing_key": "agents"},
}