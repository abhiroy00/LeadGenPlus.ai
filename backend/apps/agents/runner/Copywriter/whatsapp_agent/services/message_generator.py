# ──────────────────────────────────────────────────
#   services/message_generator.py
#   Claude AI — personalized message generation
# ──────────────────────────────────────────────────

import anthropic
from django.conf import settings


SYSTEM_PROMPT = """You are a professional WhatsApp outreach assistant.
Write short, warm, personalized messages for business owners.

Rules:
- Maximum 3 lines total
- Address by first name only
- Mention their specific business type
- Reference what they need
- End with ONE soft call to action
- Friendly tone, NOT salesy
- Max 1 emoji, preferably none"""


def generate_message(lead) -> str:
    """
    Generate personalized WhatsApp message from a Lead instance.

    Args:
        lead: Lead model instance

    Returns:
        Personalized message string
    """
    client   = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)
    name     = lead.name.split()[0]
    business = lead.business or "business"
    interest = lead.interest or "our services"
    location = f" in {lead.city}" if lead.city else ""

    prompt = f"""Write a WhatsApp outreach message for:
- Name: {name}
- Business: {business}{location}
- They need: {interest}

3 lines max. Warm, genuine, personal."""

    try:
        response = client.messages.create(
            model=settings.CLAUDE_MODEL,
            max_tokens=250,
            system=SYSTEM_PROMPT,
            messages=[{"role": "user", "content": prompt}],
        )
        return response.content[0].text.strip()

    except Exception:
        # Fallback if Claude is unavailable
        return (
            f"Hi {name}! We help {business} owners with {interest}. "
            f"Would love to show you how — interested?"
        )
