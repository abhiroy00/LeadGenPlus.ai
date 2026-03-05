"""
apify_service.py
Calls the Apify Google Places Crawler and returns a list of place dicts.
"""
import requests
from django.conf import settings


APIFY_URL = (
    "https://api.apify.com/v2/acts/compass~crawler-google-places"
    "/run-sync-get-dataset-items"
)


def scrape_google_places(business_type: str, location: str, max_results: int) -> list[dict]:
    """
    Hits the Apify Google Places actor and returns raw place records.

    Args:
        business_type: e.g. "Plumber"
        location:      e.g. "Rome, Italy"
        max_results:   max number of places to return

    Returns:
        List of place dicts (same structure as n8n HTTP Request output).
    """
    token = settings.APIFY_API_TOKEN
    if not token:
        raise ValueError("APIFY_API_TOKEN is not set in .env")

    payload = {
        "includeWebResults": False,
        "language": "en",
        "locationQuery": location,
        "maxCrawledPlacesPerSearch": max_results,
        "maxImages": 0,
        "maximumLeadsEnrichmentRecords": 0,
        "scrapeContacts": False,
        "scrapeDirectories": False,
        "scrapeImageAuthors": False,
        "scrapePlaceDetailPage": False,
        "scrapeReviewsPersonalData": True,
        "scrapeTableReservationProvider": False,
        "searchStringsArray": [business_type],
        "skipClosedPlaces": False,
    }

    print(f"[Apify] Scraping '{business_type}' in '{location}' (max {max_results})...")

    response = requests.post(
        APIFY_URL,
        params={"token": token},
        json=payload,
        timeout=300,  # Apify can take a while in sync mode
    )

    if response.status_code != 200:
        raise RuntimeError(
            f"Apify returned status {response.status_code}: {response.text[:500]}"
        )

    data = response.json()
    print(f"[Apify] Got {len(data)} place(s).")
    return data
