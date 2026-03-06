from rest_framework import serializers
from .models import LeadJob, Lead


class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = [
            'id', 'company_name', 'category', 'website',
            'phone_number', 'email_address', 'address',
            'cold_mail_status', 'send_time', 'created_at',
        ]


class LeadJobSerializer(serializers.ModelSerializer):
    leads = LeadSerializer(many=True, read_only=True)
    total_leads = serializers.SerializerMethodField()
    leads_with_email = serializers.SerializerMethodField()

    class Meta:
        model = LeadJob
        fields = [
            'id', 'business_type', 'location', 'lead_number',
            'email_style', 'status', 'created_at',
            'total_leads', 'leads_with_email', 'leads',
        ]

    def get_total_leads(self, obj):
        return obj.leads.count()

    def get_leads_with_email(self, obj):
        return obj.leads.exclude(email_address='').count()


class GenerateLeadsInputSerializer(serializers.Serializer):
    business_type = serializers.CharField(max_length=200)
    location = serializers.CharField(max_length=200)
    lead_number = serializers.IntegerField(min_value=1, max_value=50)
    email_style = serializers.ChoiceField(
        choices=['Friendly', 'Professional', 'Simple'],
        default='Professional',
    )
