from .phone_validation import validate_phone
from .industry_llm_service import industry_score_llm


def business_size_score(reviews):

    if reviews > 200:
        return 100
    elif reviews > 100:
        return 70
    elif reviews > 50:
        return 50
    return 20


def location_score(business_location, campaign_location):

    if campaign_location.lower() in business_location.lower():
        return 100
    return 20


def online_presence_score(website, rating):

    score = 0

    if website:
        score += 50

    if rating and rating > 4:
        score += 50

    return score


def calculate_final_score(size, location, industry, phone, online):

    return (
        size * 0.25
        + location * 0.20
        + industry * 0.25
        + phone * 0.15
        + online * 0.15
    )


def qualify_lead(lead, campaign_industry, campaign_location):

    size = business_size_score(lead.review_count)

    location = location_score(
        lead.address,
        campaign_location
    )

    industry = industry_score_llm(
        lead.category,
        campaign_industry
    )

    phone = validate_phone(lead.phone_number)

    online = online_presence_score(
        lead.website,
        getattr(lead, "rating", 0)
    )

    final = calculate_final_score(
        size,
        location,
        industry,
        phone,
        online
    )

    qualified = final >= 60

    return {
        "size": size,
        "location": location,
        "industry": industry,
        "phone": phone,
        "online": online,
        "final": final,
        "qualified": qualified
    }