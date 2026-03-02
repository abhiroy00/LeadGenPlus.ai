# agents/runner/llm_client.py
"""
Cost-minimized LLM client.
Strategy:
  - Use GPT-4o-mini for scoring/classification (cheap, fast)
  - Use GPT-4o only if confidence is low (< 0.6) on retry
  - Cache repeated lead patterns via simple hash
"""
import hashlib, json, os
from openai import OpenAI
from django.core.cache import cache

# Pricing per 1K tokens (approximate)
PRICING = {
    "gpt-4o-mini": {"input": 0.00015, "output": 0.0006},
    "gpt-4o":       {"input": 0.005,   "output": 0.015},
}

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

def call_llm(messages: list, model="gpt-4o-mini", temperature=0.2, use_cache=True) -> dict:
    """
    Returns: {content, model, input_tokens, output_tokens, cost_usd}
    """
    cache_key = None
    if use_cache:
        raw = json.dumps({"model": model, "messages": messages}, sort_keys=True)
        cache_key = "llm:" + hashlib.md5(raw.encode()).hexdigest()
        cached = cache.get(cache_key)
        if cached:
            return cached

    response = client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=temperature,
        response_format={"type": "json_object"},  # enforce JSON output
    )
    usage = response.usage
    price = PRICING.get(model, PRICING["gpt-4o-mini"])
    cost = (usage.prompt_tokens / 1000 * price["input"]) + \
           (usage.completion_tokens / 1000 * price["output"])

    result = {
        "content": response.choices[0].message.content,
        "model": model,
        "input_tokens": usage.prompt_tokens,
        "output_tokens": usage.completion_tokens,
        "cost_usd": round(cost, 6),
    }
    if use_cache and cache_key:
        cache.set(cache_key, result, timeout=3600)  # cache 1 hour
    return result