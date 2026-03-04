WEIGHTS_TOTAL = 100


def score_reviews(lead):
    reviews = lead.get("reviews") or lead.get("num_reviews") or 0
    if reviews > 500: return 20
    if reviews > 200: return 16
    if reviews > 100: return 12
    if reviews > 50: return 8
    return 4


def score_rating(lead):
    rating = lead.get("rating") or 0
    if rating >= 4.5: return 20
    if rating >= 4.0: return 15
    if rating >= 3.5: return 10
    return 5


def score_website(lead):
    return 15 if lead.get("website") or lead.get("website_url") else 5


def score_whatsapp(lead):
    if lead.get("whatsapp") is True:
        return 15
    if lead.get("whatsapp") is False:
        return 5
    return 8


def score_employees(lead):
    emp = str(lead.get("employees", "0"))
    if "200" in emp: return 15
    if "50" in emp: return 12
    if "20" in emp: return 10
    if "10" in emp: return 8
    return 5


def score_geography(lead):
    location = (
        lead.get("location")
        or lead.get("address")
        or lead.get("city")
        or ""
    )
    if "UAE" in location:
        return 15
    return 5


def compute_scores(lead):
    scores = {
        "reviews": score_reviews(lead),
        "rating": score_rating(lead),
        "website": score_website(lead),
        "whatsapp": score_whatsapp(lead),
        "employees": score_employees(lead),
        "geography": score_geography(lead),
    }

    composite = sum(scores.values())

    if composite > WEIGHTS_TOTAL:
        composite = WEIGHTS_TOTAL

    return scores, composite