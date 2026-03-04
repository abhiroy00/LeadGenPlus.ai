def hard_precheck(lead: dict):
    fail_reasons = []

    if not lead.get("name") and not lead.get("company"):
        fail_reasons.append("Missing business name")

    if not any([
        lead.get("phone"),
        lead.get("telephone"),
        lead.get("tel")
    ]):
        fail_reasons.append("Missing phone number")

    if not any([
        lead.get("location"),
        lead.get("address"),
        lead.get("city")
    ]):
        fail_reasons.append("Missing location")

    return fail_reasons