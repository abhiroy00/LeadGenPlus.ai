from django.urls import path
from qualifier.views import ProductAPIView

urlpatterns = [
    path("products/", ProductAPIView.as_view()),

]