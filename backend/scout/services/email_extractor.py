"""
email_extractor.py
Scrapes a website and uses Google Gemini to find the best contact email.
"""
import re
import requests
from bs4 import BeautifulSoup
import google.generativeai as genai
from django.conf import settings


# ── Basic email regex for pre-filtering ──────────────────────────────────────
EMAIL_REGEX = re.compile(r'[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}')

# Unwanted image/file extensions that look like emails but aren't
SKIP_DOMAINS = {
    'png', 'jpg', 'jpeg', 'gif', 'svg', 'webp',
    'woff', 'ttf', 'css', 'js', 'example', 'domain',
    'yourdomain', 'email', 'mail', 'test', 'sentry',
}


def _is_valid_email(email: str) -> bool:
    parts = email.split('@')
    if len(parts) != 2:
        return False
    domain_parts = parts[1].split('.')
    tld = domain_parts[-1].lower()
    local = parts[0].lower()
    if tld in SKIP_DOMAINS or local in SKIP_DOMAINS:
        return False
    return True


def _scrape_website_text(url: str, timeout: int = 15) -> str:
    """
    Fetches a URL and returns cleaned visible text (max ~3000 chars).
    Falls back to empty string on any error.
    """
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/120.0.0.0 Safari/537.36"
        )
    }
    try:
        response = requests.get(url, headers=headers, timeout=timeout)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'lxml')

        # Remove script / style noise
        for tag in soup(['script', 'style', 'noscript', 'meta']):
            tag.decompose()

        text = soup.get_text(separator=' ', strip=True)

        # Also grab mailto: links directly — very reliable
        mailto_emails = []
        for a in soup.find_all('a', href=True):
            href = a['href']
            if href.startswith('mailto:'):
                email = href.replace('mailto:', '').split('?')[0].strip()
                if EMAIL_REGEX.match(email) and _is_valid_email(email):
                    mailto_emails.append(email)

        if mailto_emails:
            # Return the first mailto email immediately — most reliable signal
            return f"MAILTO_EMAIL: {mailto_emails[0]}\n\n" + text[:2000]

        return text[:3000]

    except Exception as e:
        print(f"  [Scraper] Could not fetch {url}: {e}")
        return ''


def _extract_email_with_gemini(website_text: str, website_url: str) -> str:
    """
    Asks Gemini to find the best contact email in the scraped website text.
    Returns the email string or '' if none found.
    """
    api_key = settings.GEMINI_API_KEY
    if not api_key:
        raise ValueError("GEMINI_API_KEY is not set in .env")

    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-1.5-flash')

    prompt = f"""
You are an expert email extractor. Below is text scraped from the website: {website_url}

Your job:
1. Find the BEST single contact email address for this business.
2. Prefer contact@, info@, hello@, support@ or similar business contact emails.
3. Avoid personal names if a general contact email exists.
4. Avoid emails that contain words like "example", "test", "yourdomain".
5. Return ONLY the raw email address with no explanation, no punctuation, no quotes.
6. If no valid email is found, return exactly: NONE

Website text:
{website_text[:2500]}
"""

    try:
        response = model.generate_content(prompt)
        result = response.text.strip()

        if result == 'NONE' or not result:
            return ''

        # Validate it looks like an email
        if EMAIL_REGEX.match(result) and _is_valid_email(result):
            return result

        # Try to pull an email out of Gemini's response in case it added text
        matches = EMAIL_REGEX.findall(result)
        valid = [m for m in matches if _is_valid_email(m)]
        return valid[0] if valid else ''

    except Exception as e:
        print(f"  [Gemini] Error: {e}")
        return ''


def get_email_from_website(website_url: str) -> str:
    """
    Main entry point.
    Scrapes the website and returns the best email address found, or ''.
    """
    print(f"  [EmailExtractor] Processing: {website_url}")
    text = _scrape_website_text(website_url)

    if not text:
        return ''

    # Fast path: if we found a mailto directly, use Gemini to confirm/clean it
    # but also try scraping /contact page for better results
    email = _extract_email_with_gemini(text, website_url)

    # If nothing found on homepage, try the /contact page
    if not email:
        contact_url = website_url.rstrip('/') + '/contact'
        contact_text = _scrape_website_text(contact_url)
        if contact_text:
            email = _extract_email_with_gemini(contact_text, contact_url)

    if email:
        print(f"  [EmailExtractor] Found: {email}")
    else:
        print(f"  [EmailExtractor] No email found.")

    return email
