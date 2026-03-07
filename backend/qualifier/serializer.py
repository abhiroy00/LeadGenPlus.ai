from rest_framework import serializers
from .models import QualifiedLead


class QualifiedLeadSerializer(serializers.ModelSerializer):

    class Meta:
        model = QualifiedLead
        fields = "__all__"