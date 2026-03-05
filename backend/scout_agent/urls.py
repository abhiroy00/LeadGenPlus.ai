from django.urls import path
from .views import RunLeadGenView, LeadListView, SearchHistoryView

urlpatterns = [
    path("run/",     RunLeadGenView.as_view(),   name="lead-gen-run"),
    path("leads/",   LeadListView.as_view(),      name="lead-list"),
    path("history/", SearchHistoryView.as_view(), name="search-history"),
]