from django.urls import path
from whatsapp_agent import views

urlpatterns = [
    path("",                              views.dashboard,          name="dashboard"),
    path("leads/",                        views.leads_list,         name="leads_list"),
    path("leads/upload/",                 views.upload_leads,       name="upload_leads"),
    path("leads/<int:lead_id>/delete/",   views.delete_lead,        name="delete_lead"),
    path("leads/<int:lead_id>/reset/",    views.reset_lead,         name="reset_lead"),
    path("campaign/run/",                 views.run_campaign_view,  name="run_campaign"),
    path("campaign/history/",             views.campaign_history,   name="campaign_history"),
    path("campaign/<int:run_id>/",        views.campaign_detail,    name="campaign_detail"),
    path("settings/",                     views.settings_view,      name="settings"),
    path("api/stats/",                    views.api_stats,          name="api_stats"),
]
