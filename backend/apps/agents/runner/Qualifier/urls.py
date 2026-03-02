# agents/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("qualifier/run/",              views.run_qualifier,  name="run_qualifier"),
    path("qualifier/run/<uuid:run_id>/", views.run_status,    name="run_status"),
    path("qualifier/run/<uuid:run_id>/logs/", views.run_logs_sse, name="run_logs_sse"),
]