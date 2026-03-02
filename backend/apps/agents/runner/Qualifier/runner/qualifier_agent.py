# agents/runner/qualifier_agent.py
import json
from .base_agent import BaseAgent
from .llm_client import call_llm

# BANT-style weights (must sum to 1.0)
WEIGHTS = {
    "budget_fit":   0.25,
    "authority":    0.20,
    "need_pain":    0.25,
    "timeline":     0.15,
    "company_fit":  0.15,
}

TIER_THRESHOLDS = {
    "hot":  0.75,
    "warm": 0.50,
    "cold": 0.0,
}

DISQUALIFY_RULES = [
    ("industry_blacklist", lambda lead: lead.get("industry") in ["gambling", "tobacco", "adult"]),
    ("no_email",           lambda lead: not lead.get("email")),
    ("invalid_country",    lambda lead: lead.get("country") not in ALLOWED_COUNTRIES if ALLOWED_COUNTRIES else False),
]
ALLOWED_COUNTRIES = None  # Set to list like ["US","IN","GB"] to restrict


SYSTEM_PROMPT = """You are a B2B sales qualification expert. 
Analyze the lead and return a JSON object with EXACTLY these keys:
{
  "budget_fit":   <0.0-1.0>,
  "authority":    <0.0-1.0>,
  "need_pain":    <0.0-1.0>,
  "timeline":     <0.0-1.0>,
  "company_fit":  <0.0-1.0>,
  "confidence":   <0.0-1.0>,
  "reasoning":    {
    "budget_fit":   "<brief reason>",
    "authority":    "<brief reason>",
    "need_pain":    "<brief reason>",
    "timeline":     "<brief reason>",
    "company_fit":  "<brief reason>"
  }
}
Be concise. Score 0.0 if no data. confidence = how sure you are given available data."""


class QualifierAgent(BaseAgent):

    def run(self):
        lead = self.run.lead_data
        self.log("Qualifier agent started", step="init", metadata={"lead_id": lead.get("id")})

        # ── Step 1: Rule-based pre-filter (FREE, no LLM) ──────────────────
        disqualified, reason = self._rule_based_filter(lead)
        if disqualified:
            self.log(f"Disqualified by rule: {reason}", step="rule_filter", level="WARN")
            self.finalize({
                "qualified": False,
                "tier": "disqualified",
                "score": 0.0,
                "reason": reason,
                "next_action": "archive",
            }, status="done")
            return

        self.log("Passed rule-based filter", step="rule_filter")

        # ── Step 2: Build compact prompt (minimize tokens) ─────────────────
        lead_summary = self._build_lead_summary(lead)
        messages = [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user",   "content": f"Lead data:\n{lead_summary}"},
        ]

        # ── Step 3: LLM scoring (cheap model first) ────────────────────────
        self.log("Calling LLM for scoring (gpt-4o-mini)", step="llm_score")
        llm_result = call_llm(messages, model="gpt-4o-mini")
        self.track_usage(llm_result)

        scores = json.loads(llm_result["content"])
        confidence = scores.get("confidence", 1.0)

        # ── Step 4: Low-confidence escalation to better model ─────────────
        if confidence < 0.55:
            self.log(f"Low confidence ({confidence:.2f}), escalating to gpt-4o", 
                     step="escalate", level="WARN")
            llm_result = call_llm(messages, model="gpt-4o", use_cache=False)
            self.track_usage(llm_result)
            scores = json.loads(llm_result["content"])

        # ── Step 5: Weighted score aggregation ────────────────────────────
        final_score = sum(
            scores.get(dim, 0.0) * weight
            for dim, weight in WEIGHTS.items()
        )
        final_score = round(min(max(final_score, 0.0), 1.0), 4)

        tier = self._get_tier(final_score)
        next_action = self._get_next_action(tier, scores)

        self.log(
            f"Score: {final_score:.3f} | Tier: {tier} | Confidence: {confidence:.2f}",
            step="result",
            metadata={"scores": scores, "final_score": final_score}
        )

        result = {
            "qualified": tier in ("hot", "warm"),
            "tier": tier,
            "score": final_score,
            "confidence": confidence,
            "dimension_scores": {dim: scores.get(dim, 0.0) for dim in WEIGHTS},
            "reasoning": scores.get("reasoning", {}),
            "next_action": next_action,
            "model_used": llm_result["model"],
            "cost_usd": self.total_cost,
        }

        self.finalize(result, status="done")
        self.log(f"Qualifier done. Cost: ${self.total_cost:.6f}", step="complete")

    # ── Helpers ──────────────────────────────────────────────────────────

    def _rule_based_filter(self, lead):
        """Zero-cost pre-filtering."""
        for rule_name, rule_fn in DISQUALIFY_RULES:
            try:
                if rule_fn(lead):
                    return True, rule_name
            except Exception:
                pass
        return False, None

    def _build_lead_summary(self, lead: dict) -> str:
        """Extract only relevant fields → shorter prompt → lower cost."""
        fields = [
            ("Name",        lead.get("name") or lead.get("full_name")),
            ("Title",       lead.get("title") or lead.get("job_title")),
            ("Company",     lead.get("company")),
            ("Industry",    lead.get("industry")),
            ("Employees",   lead.get("company_size") or lead.get("employees")),
            ("Revenue",     lead.get("annual_revenue") or lead.get("revenue")),
            ("Country",     lead.get("country")),
            ("Budget",      lead.get("budget") or lead.get("budget_range")),
            ("Pain Points", lead.get("pain_points") or lead.get("challenges")),
            ("Timeline",    lead.get("timeline") or lead.get("purchase_timeline")),
            ("Source",      lead.get("source") or lead.get("lead_source")),
            ("Notes",       lead.get("notes")),
        ]
        return "\n".join(f"{k}: {v}" for k, v in fields if v)

    def _get_tier(self, score: float) -> str:
        if score >= TIER_THRESHOLDS["hot"]:
            return "hot"
        elif score >= TIER_THRESHOLDS["warm"]:
            return "warm"
        return "cold"

    def _get_next_action(self, tier: str, scores: dict) -> str:
        if tier == "hot":
            return "schedule_demo"
        elif tier == "warm":
            # Prioritize weakest dimension for nurturing
            weakest = min(WEIGHTS.keys(), key=lambda d: scores.get(d, 0.0))
            return f"nurture_sequence:{weakest}"
        return "drip_campaign"