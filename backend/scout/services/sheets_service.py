"""
sheets_service.py
Appends a lead row to Google Sheets using a service-account credentials.json.
"""
import os
from django.conf import settings

from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError


SCOPES = ['https://www.googleapis.com/auth/spreadsheets']


def _get_sheets_service():
    """Builds and returns an authenticated Google Sheets service object."""
    creds_file = settings.GOOGLE_CREDENTIALS_FILE

    if not os.path.exists(creds_file):
        raise FileNotFoundError(
            f"Google credentials file not found: '{creds_file}'. "
            "Place your service-account credentials.json in the project root."
        )

    credentials = service_account.Credentials.from_service_account_file(
        creds_file, scopes=SCOPES
    )
    service = build('sheets', 'v4', credentials=credentials)
    return service


def append_lead_to_sheet(lead_data: dict) -> bool:
    """
    Appends a single lead row to the configured Google Sheet (Sheet1).

    Args:
        lead_data: dict with keys:
            company_name, category, website, phone_number,
            email_address, address, cold_mail_status, send_time

    Returns:
        True on success, False on failure.
    """
    spreadsheet_id = settings.GOOGLE_SHEETS_ID
    if not spreadsheet_id:
        print("[Sheets] GOOGLE_SHEETS_ID not set — skipping.")
        return False

    try:
        service = _get_sheets_service()
        sheet = service.spreadsheets()

        row = [
            lead_data.get('company_name', ''),
            lead_data.get('category', ''),
            lead_data.get('website', ''),
            lead_data.get('phone_number', ''),
            lead_data.get('email_address', ''),
            lead_data.get('address', ''),
            lead_data.get('cold_mail_status', ''),
            lead_data.get('send_time', ''),
        ]

        body = {'values': [row]}
        result = sheet.values().append(
            spreadsheetId=spreadsheet_id,
            range='Sheet1!A:H',
            valueInputOption='RAW',
            insertDataOption='INSERT_ROWS',
            body=body,
        ).execute()

        print(f"[Sheets] Appended row for: {lead_data.get('company_name')}")
        return True

    except FileNotFoundError as e:
        print(f"[Sheets] Credentials error: {e}")
        return False
    except HttpError as e:
        print(f"[Sheets] API error: {e}")
        return False
    except Exception as e:
        print(f"[Sheets] Unexpected error: {e}")
        return False


def ensure_header_row():
    """
    Checks if Sheet1!A1 is empty and writes column headers if so.
    Call this once when the server starts or before first run.
    """
    spreadsheet_id = settings.GOOGLE_SHEETS_ID
    if not spreadsheet_id:
        return

    try:
        service = _get_sheets_service()
        sheet = service.spreadsheets()

        result = sheet.values().get(
            spreadsheetId=spreadsheet_id,
            range='Sheet1!A1:H1',
        ).execute()

        existing = result.get('values', [])
        if not existing or not existing[0]:
            headers = [[
                'Company Name', 'Category', 'Website',
                'Phone Number', 'Email Address',
                'Address', 'Cold Mail Status', 'SEND Time',
            ]]
            sheet.values().update(
                spreadsheetId=spreadsheet_id,
                range='Sheet1!A1',
                valueInputOption='RAW',
                body={'values': headers},
            ).execute()
            print("[Sheets] Header row written.")

    except Exception as e:
        print(f"[Sheets] Could not ensure header row: {e}")
