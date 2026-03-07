# from django.urls import path
# from qualifier.views import ProductAPIView

# urlpatterns = [
#     path("products/", ProductAPIView.as_view()),

# ]

from django.urls import path
from .views import RunQualificationView

urlpatterns = [
    path("run/", RunQualificationView.as_view())
]