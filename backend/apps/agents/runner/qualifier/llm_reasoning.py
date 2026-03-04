from openai import OpenAI
from django.conf import settings

client = OpenAI(api_key=settings.OPENAI_API_KEY)


def generate_reasoning(lead, scores, composite):
    prompt = f"""
Lead: {lead}
Scores: {scores}
Composite Score: {composite}/100

Explain briefly why this lead is qualified or not.
Limit to 2 sentences.
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a B2B lead qualification expert."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.2,
        max_tokens=120
    )

    return response.choices[0].message.content.strip()