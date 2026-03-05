from rest_framework import serializers
from .models import Lead, LeadSearch

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = "__all__"

class LeadSearchSerializer(serializers.ModelSerializer):
    leads = LeadSerializer(many=True, read_only=True)

    class Meta:
        model = LeadSearch
        fields = "__all__"