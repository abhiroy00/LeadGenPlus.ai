# agents/runner/base_agent.py
from agents.models import AgentLog
from datetime import datetime

class BaseAgent:
    def __init__(self, run):
        self.run = run
        self.total_tokens = 0
        self.total_cost = 0.0

    def log(self, message, step="", level="INFO", metadata=None):
        AgentLog.objects.create(
            run=self.run,
            level=level,
            message=message,
            step=step,
            metadata=metadata,
        )

    def track_usage(self, llm_result: dict):
        self.total_tokens += llm_result["input_tokens"] + llm_result["output_tokens"]
        self.total_cost += llm_result["cost_usd"]

    def finalize(self, result: dict, status="done"):
        from agents.models import AgentRun
        from django.utils import timezone
        self.run.result = result
        self.run.status = status
        self.run.tokens_used = self.total_tokens
        self.run.cost_usd = self.total_cost
        self.run.completed_at = timezone.now()
        self.run.save()
```

---

## Step 4: Qualifier Agent (`runner/qualifier_agent.py`)

This is the core. The workflow:
```
Lead Data → [Step 1] Rule-based Pre-filter (no LLM, free)
          → [Step 2] LLM Scoring (cheap model: gpt-4o-mini)
          → [Step 3] Weight Aggregation → Final Score
          → [Step 4] Confidence Check → Escalate to GPT-4o if needed
          → Result: {score, tier, reasons, next_action}