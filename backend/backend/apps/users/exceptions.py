# backend/users/exceptions.py

from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status


def custom_exception_handler(exc, context):
    """
    Consistent error format across all API responses.
    Frontend reads error.code to show right UI.
    """
    response = exception_handler(exc, context)

    if response is not None:
        code = 'error'
        detail = response.data

        # Simplify common error formats
        if isinstance(detail, dict):
            code = detail.get('code', 'error')
        elif isinstance(detail, list):
            detail = {'messages': detail}

        response.data = {
            'success': False,
            'code':    code,
            'detail':  detail,
            'status':  response.status_code,
        }

    return response