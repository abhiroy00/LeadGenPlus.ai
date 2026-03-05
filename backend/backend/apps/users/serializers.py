# backend/users/serializers.py

from rest_framework import serializers
from rest_framework_simplejwt.serializers \
    import TokenObtainPairSerializer
from django.contrib.auth.models import User
from .models import UserProfile, Plan


class CustomTokenObtainSerializer(
        TokenObtainPairSerializer):
    """
    Embeds plan + quota + features in JWT payload.
    Frontend decodes this — no extra /me API call needed.
    """

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        try:
            profile = user.profile
            usage   = user.usage
            plan    = profile.plan
        except Exception:
            return token

        # User info
        token['user_id']  = user.id
        token['email']    = user.email
        token['name']     = user.get_full_name() \
                            or user.email.split('@')[0]
        token['company']  = profile.company_name
        token['avatar']   = profile.avatar

        # RBAC
        token['role']     = profile.role
        token['plan']     = plan.name if plan else 'trial'

        # Trial status
        token['trial_expired'] = profile.is_trial_expired
        token['days_left']     = profile.days_left
        token['expires_at']    = str(profile.plan_expires_at)

        # ABAC quota
        if plan and usage:
            token['quota'] = {
                'leads':     {
                    'used':  usage.leads_used,
                    'limit': plan.leads_limit,
                },
                'campaigns': {
                    'used':  usage.campaigns_used,
                    'limit': plan.campaigns_limit,
                },
                'messages':  {
                    'used':  usage.messages_sent,
                    'limit': plan.messages_limit,
                },
                'agents':    {
                    'limit': plan.agents_limit,
                },
            }

        # Feature flags
        if plan:
            token['features'] = {
                'flow_builder':  plan.can_flow_builder,
                'ai_agents':     plan.can_ai_agents,
                'api_access':    plan.can_api_access,
                'export':        plan.can_export,
                'team_members':  plan.can_team_members,
                'custom_agents': plan.can_custom_agents,
                'ads_agent':     plan.can_ads_agent,
            }

        return token


class RegisterSerializer(serializers.Serializer):
    first_name       = serializers.CharField(max_length=50)
    last_name        = serializers.CharField(max_length=50)
    email            = serializers.EmailField()
    company_name     = serializers.CharField(
                           max_length=200,
                           required=False, default='')
    password         = serializers.CharField(
                           min_length=8,
                           write_only=True)
    confirm_password = serializers.CharField(
                           write_only=True)

    def validate_email(self, value):
        if User.objects.filter(
                email=value.lower()).exists():
            raise serializers.ValidationError(
                'This email is already registered.')
        return value.lower()

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({
                'confirm_password': 'Passwords do not match.'
            })
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        company = validated_data.pop('company_name', '')

        user = User.objects.create_user(
            username   = validated_data['email'],
            email      = validated_data['email'],
            password   = validated_data['password'],
            first_name = validated_data['first_name'],
            last_name  = validated_data['last_name'],
        )
        # Signal auto-creates profile + usage
        # Just update company name
        user.profile.company_name = company
        user.profile.save(update_fields=['company_name'])
        return user
    

class LoginSerializer(TokenObtainPairSerializer):
    """Override to accept email instead of username"""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Rename username field to email in the form
        self.fields['email']    = serializers.EmailField()
        self.fields['username'] = serializers.CharField(
                                      required=False,
                                      default='')

    def validate(self, attrs):
        # Move email value into username before validation
        attrs['username'] = attrs.get('email', '')
        return super().validate(attrs)