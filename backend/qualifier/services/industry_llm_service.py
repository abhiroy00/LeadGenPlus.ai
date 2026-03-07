import os
from openai import OpenAI

# Initialize client
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


def industry_score_llm(business_category: str, target_industry: str) -> int:
    """
    Uses GPT to determine how well a business category matches the target industry.

    Returns a score between 0 and 100.
    """

    prompt = f"""
You are a lead qualification assistant.

Task:
Rate how well the business category matches the target industry.

Business Category: {business_category}
Target Industry: {target_industry}

Return ONLY a number between 0 and 100.

Rules:
100 = Perfect match
70-90 = Strong match
40-60 = Partial match
10-30 = Weak match
0 = No relation

Return only the number.
"""

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "user", "content": prompt}
            ],
            temperature=0
        )

        result = response.choices[0].message.content.strip()

        score = int(result)

        return max(0, min(score, 100))

    except Exception as e:
        print(f"[Industry LLM Error] {e}")

        # Safe fallback
        return 50