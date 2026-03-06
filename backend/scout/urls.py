from django.urls import path
from scout.views import (
    GenerateLeadsView,
    JobListView,
    JobDetailView,
    LeadListView,
)

urlpatterns = [
    # Main workflow endpoint
    path('generate-leads/', GenerateLeadsView.as_view(), name='generate-leads'),

    # Job management
    path('jobs/', JobListView.as_view(), name='job-list'),
    path('jobs/<int:job_id>/', JobDetailView.as_view(), name='job-detail'),

    # Lead queries
    path('leads/', LeadListView.as_view(), name='lead-list'),
]
