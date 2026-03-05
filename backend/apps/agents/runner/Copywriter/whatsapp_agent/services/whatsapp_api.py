# ──────────────────────────────────────────────────
#   services/whatsapp_api.py
#   All Meta Official WhatsApp API send functions
# ──────────────────────────────────────────────────

import requests
from django.conf import settings


def _get_url():
    return (
        f"https://graph.facebook.com/{settings.META_API_VERSION}"
        f"/{settings.PHONE_NUMBER_ID}/messages"
    )


def _get_headers():
    return {
        "Authorization": f"Bearer {settings.META_ACCESS_TOKEN}",
        "Content-Type":  "application/json",
    }


def send_template_message(phone: str, name: str, business: str) -> dict:
    """
    Send Meta-approved template message.
    Required for FIRST contact with any user.

    {{1}} = name, {{2}} = business in your template.
    """
    payload = {
        "messaging_product": "whatsapp",
        "to":   phone,
        "type": "template",
        "template": {
            "name":     settings.TEMPLATE_NAME,
            "language": {"code": settings.TEMPLATE_LANGUAGE},
            "components": [
                {
                    "type": "body",
                    "parameters": [
                        {"type": "text", "text": name.split()[0]},
                        {"type": "text", "text": business},
                    ],
                }
            ],
        },
    }
    resp = requests.post(_get_url(), headers=_get_headers(), json=payload, timeout=15)
    return resp.json()


def send_text_message(phone: str, message: str) -> dict:
    """
    Send free-form text (only within 24hr reply window).
    """
    payload = {
        "messaging_product": "whatsapp",
        "to":   phone,
        "type": "text",
        "text": {"body": message},
    }
    resp = requests.post(_get_url(), headers=_get_headers(), json=payload, timeout=15)
    return resp.json()


def send_button_message(phone: str, body: str, buttons: list) -> dict:
    """Send interactive message with up to 3 quick-reply buttons."""
    button_list = [
        {"type": "reply", "reply": {"id": f"btn_{i}", "title": label[:20]}}
        for i, label in enumerate(buttons[:3])
    ]
    payload = {
        "messaging_product": "whatsapp",
        "to":   phone,
        "type": "interactive",
        "interactive": {
            "type":   "button",
            "body":   {"text": body},
            "action": {"buttons": button_list},
        },
    }
    resp = requests.post(_get_url(), headers=_get_headers(), json=payload, timeout=15)
    return resp.json()


def parse_response(response: dict) -> tuple:
    """
    Parse Meta API response.
    Returns: (success: bool, message_id: str, error: str)
    """
    if "messages" in response:
        msg_id = response["messages"][0].get("id", "")
        return True, msg_id, ""
    error     = response.get("error", {})
    error_msg = error.get("message", str(response))
    return False, "", error_msg
