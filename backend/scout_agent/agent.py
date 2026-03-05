import re
import time
import requests
from bs4 import BeautifulSoup
import google.generativeai as genai
from django.conf import settings
from .models import Lead, LeadSearch

genai.configure(api_key=settings.GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")

HEADERS = {"User-Agent": "Mozilla/5.0 Chrome/120.0.0.0 Safari/537.36"}
APIFY_URL = "https://api.apify.com/v2/acts/compass~crawler-google-places/run-sync-get-dataset-items"


def scrape_google_maps(business_type, location, max_leads):
    response = requests.post(
        APIFY_URL,
        params={"token": settings.APIFY_API_TOKEN},
        json={
            "searchStringsArray": [business_type],
            "locationQuery": location,
            "maxCrawledPlacesPerSearch": max_leads,
            "language": "en",
            "maxImages": 0,
        },
        timeout=300,
    )
    response.raise_for_status()
    return response.json()


def fetch_website_text(url):
    text = ""
    for target in [url, url.rstrip("/") + "/contact"]:
        try:
            resp = requests.get(target, headers=HEADERS, timeout=10)
            if resp.status_code == 200:
                soup = BeautifulSoup(resp.text, "html.parser")
                mailtos = [
                    a["href"].replace("mailto:", "")
                    for a in soup.find_all("a", href=True)
                    if "mailto:" in a["href"]
                ]
                text += soup.get_text(" ", strip=True) + " ".join(mailtos)
        except Exception:
            continue
    return text[:8000]


def extract_email(website_url):
    content = fetch_website_text(website_url)
    if not content.strip():
        return None
    try:
        prompt = f"Website: {website_url}\nContent: {content}\n\nReturn ONLY one valid email address. If none, return NONE."
        raw = model.generate_content(prompt).text.strip()
        match = re.search(r"[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}", raw)
        return match.group(0) if match else None
    except Exception:
        return None


def run_pipeline(business_type, location, max_leads):
    # Create search record
    search = LeadSearch.objects.create(
        business_type=business_type,
        location=location,
        max_leads=max_leads,
        status="running"
    )

    try:
        businesses = scrape_google_maps(business_type, location, max_leads)
        businesses = [b for b in businesses if b.get("website")]

        found = 0
        for business in businesses:
            email = extract_email(business["website"])
            if email and "@" in email:
                Lead.objects.create(
                    search=search,
                    company_name=business.get("title", ""),
                    category=business.get("categoryName", ""),
                    website=business.get("website", ""),
                    phone_number=business.get("phoneUnformatted", ""),
                    email_address=email,
                    address=business.get("address", ""),
                )
                found += 1
            time.sleep(1)

        search.status = "completed"
        search.save()

        return {"search_id": search.id, "emails_found": found, "status": "completed"}

    except Exception as e:
        search.status = "failed"
        search.save()
        raise e