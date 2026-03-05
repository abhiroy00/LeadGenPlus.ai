import os
from dotenv import load_dotenv

load_dotenv()

INSTALLED_APPS = [
    ...
    "core",
]

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")