import phonenumbers


def validate_phone(phone):

    try:
        parsed = phonenumbers.parse(phone, None)

        if phonenumbers.is_valid_number(parsed):
            return 100
        return 30

    except:
        return 0