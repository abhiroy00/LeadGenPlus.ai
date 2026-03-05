from .precheck import hard_precheck
from .scoring import compute_scores
from .llm_reasoning import generate_reasoning


class QualifierAgent:

    def __init__(self, threshold=50):
        self.threshold = threshold

    def evaluate(self, lead):

        fail_reasons = hard_precheck(lead)

        if fail_reasons:
            return {
                "lead": lead,
                "qualified": False,
                "fail_reasons": fail_reasons,
                "scores": {},
                "composite": 0,
                "reasoning": "Failed hard pre-check"
            }

        scores, composite = compute_scores(lead)

        reasoning = generate_reasoning(lead, scores, composite)

        return {
            "lead": lead,
            "qualified": composite >= self.threshold,
            "fail_reasons": [],
            "scores": scores,
            "composite": composite,
            "reasoning": reasoning
        }