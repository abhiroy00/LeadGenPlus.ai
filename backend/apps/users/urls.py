# backend/users/urls.py

from django.urls import path
from rest_framework_simplejwt.views \
    import TokenRefreshView
from . import views

urlpatterns = [
    path('register/', views.register,         name='register'),
    path('login/',    views.LoginView.as_view(), name='login'),
    path('refresh/',  TokenRefreshView.as_view(), name='refresh'),
    path('logout/',   views.logout,            name='logout'),
    path('me/',       views.me,                name='me'),
    path('profile/',  views.update_profile,    name='profile'),
]