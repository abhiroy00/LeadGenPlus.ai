# agents/views.py
from django.http import JsonResponse, StreamingHttpResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from .models import Agent, AgentRun, AgentLog
from .runner.qualifier_agent import QualifierAgent
import json, threading, time

@csrf_exempt
@require_http_methods(["POST"])
def run_qualifier(request):
    """Trigger qualifier agent run."""
    data = json.loads(request.body)
    lead_data = data.get("lead", {})

    # Get or create a qualifier agent record
    agent, _ = Agent.objects.get_or_create(
        agent_type="qualifier",
        defaults={"name": "Qualifier Agent", "status": "idle"}
    )

    run = AgentRun.objects.create(agent=agent, lead_data=lead_data, status="running")
    agent.status = "running"
    agent.save()

    # Run in background thread (use Celery in production)
    def execute():
        try:
            qa = QualifierAgent(run)
            qa.run()
            agent.status = "idle"
        except Exception as e:
            run.status = "failed"
            run.save()
            agent.status = "failed"
            AgentLog.objects.create(run=run, level="ERROR", message=str(e), step="crash")
        finally:
            agent.save()

    threading.Thread(target=execute, daemon=True).start()

    return JsonResponse({"run_id": str(run.id), "status": "started"})


@require_http_methods(["GET"])
def run_status(request, run_id):
    """Poll run status and result."""
    try:
        run = AgentRun.objects.get(id=run_id)
    except AgentRun.DoesNotExist:
        return JsonResponse({"error": "Not found"}, status=404)

    return JsonResponse({
        "run_id": str(run.id),
        "status": run.status,
        "result": run.result,
        "tokens_used": run.tokens_used,
        "cost_usd": run.cost_usd,
        "started_at": run.started_at.isoformat(),
        "completed_at": run.completed_at.isoformat() if run.completed_at else None,
    })


@require_http_methods(["GET"])
def run_logs_sse(request, run_id):
    """SSE endpoint for live log streaming."""
    def event_stream():
        last_id = 0
        for _ in range(60):  # 60s max stream
            logs = AgentLog.objects.filter(run_id=run_id, id__gt=last_id).order_by('id')
            for log in logs:
                data = json.dumps({
                    "id": log.id,
                    "level": log.level,
                    "step": log.step,
                    "message": log.message,
                    "timestamp": log.timestamp.isoformat(),
                })
                yield f"data: {data}\n\n"
                last_id = log.id
            # Check if done
            try:
                run = AgentRun.objects.get(id=run_id)
                if run.status in ("done", "failed"):
                    yield "event: done\ndata: {}\n\n"
                    break
            except AgentRun.DoesNotExist:
                break
            time.sleep(1)

    return StreamingHttpResponse(event_stream(), content_type="text/event-stream")