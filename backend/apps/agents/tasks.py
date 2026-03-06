from celery import shared_task


@shared_task
def run_scout_agent():
    print("Scout agent running")


@shared_task
def run_qualifier_agent():
    print("Qualifier agent running")