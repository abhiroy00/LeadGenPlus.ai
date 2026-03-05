# backend/users/views.py

from rest_framework.decorators import (
    api_view, permission_classes)
from rest_framework.permissions import (
    AllowAny, IsAuthenticated)
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views \
    import TokenObtainPairView
from rest_framework_simplejwt.exceptions \
    import TokenError
from django.contrib.auth.models import User
from .serializers import (
    RegisterSerializer,
    CustomTokenObtainSerializer,
)
from apps.users.serializers import LoginSerializer


class LoginView(TokenObtainPairView):
    """
    POST /api/auth/login/
    { email, password }
    Returns access + refresh + user data
    """
    serializer_class = CustomTokenObtainSerializer

    def post(self, request, *args, **kwargs):
        # DRF SimpleJWT uses 'username' field
        # We swap email → username here
        data = request.data.copy()
        data['username'] = data.get('email', '')
        request._full_data = data
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            # Add user info alongside tokens
            user = User.objects.get(
                email=request.data.get('email', ''))
            response.data['user'] = {
                'id':       user.id,
                'email':    user.email,
                'name':     user.get_full_name(),
                'role':     user.profile.role,
                'plan':     user.profile.plan.name,
                'days_left': user.profile.days_left,
                'company':  user.profile.company_name,
            }
        return response


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    """
    POST /api/auth/register/
    Creates account + starts 7-day trial
    Returns tokens immediately (auto login)
    """
    serializer = RegisterSerializer(data=request.data)
    if not serializer.is_valid():
        return Response({
            'success': False,
            'errors':  serializer.errors,
        }, status=status.HTTP_400_BAD_REQUEST)

    user = serializer.save()

    # Build JWT with plan data
    token = CustomTokenObtainSerializer.get_token(user)

    return Response({
        'success': True,
        'message': 'Account created! 7-day free trial started.',
        'access':  str(token.access_token),
        'refresh': str(token),
        'user': {
            'id':       user.id,
            'email':    user.email,
            'name':     user.get_full_name(),
            'role':     'trial',
            'plan':     'trial',
            'days_left': 7,
            'company':  user.profile.company_name,
        }
    }, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    """
    GET /api/auth/me/
    Returns full profile + usage data
    Called on app load to refresh state
    """
    user    = request.user
    profile = user.profile
    usage   = user.usage
    plan    = profile.plan

    return Response({
        'success': True,
        'user': {
            'id':       user.id,
            'email':    user.email,
            'name':     user.get_full_name(),
            'company':  profile.company_name,
            'avatar':   profile.avatar,
            'phone':    profile.phone,
        },
        'plan': {
            'name':       plan.name if plan else 'trial',
            'role':       profile.role,
            'expires_at': str(profile.plan_expires_at),
            'days_left':  profile.days_left,
            'is_expired': profile.is_expired,
            'trial_expired': profile.is_trial_expired,
        },
        'quota': {
            'leads': {
                'used':    usage.leads_used,
                'limit':   plan.leads_limit,
                'percent': round(
                    usage.leads_used
                    / max(plan.leads_limit, 1) * 100
                ),
            },
            'campaigns': {
                'used':    usage.campaigns_used,
                'limit':   plan.campaigns_limit,
                'percent': round(
                    usage.campaigns_used
                    / max(plan.campaigns_limit, 1) * 100
                ),
            },
            'messages': {
                'used':    usage.messages_sent,
                'limit':   plan.messages_limit,
                'percent': round(
                    usage.messages_sent
                    / max(plan.messages_limit, 1) * 100
                ),
            },
        },
        'features': {
            'flow_builder':  plan.can_flow_builder,
            'ai_agents':     plan.can_ai_agents,
            'api_access':    plan.can_api_access,
            'export':        plan.can_export,
            'team_members':  plan.can_team_members,
            'custom_agents': plan.can_custom_agents,
            'ads_agent':     plan.can_ads_agent,
        } if plan else {},
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    """
    POST /api/auth/logout/
    Blacklists refresh token
    """
    try:
        token = RefreshToken(request.data['refresh'])
        token.blacklist()
        return Response({
            'success': True,
            'message': 'Logged out successfully.'
        })
    except (KeyError, TokenError):
        return Response({
            'success': False,
            'detail':  'Invalid or missing refresh token.'
        }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    """
    POST /api/auth/profile/
    Update name, company, phone, avatar
    """
    user    = request.user
    profile = user.profile
    data    = request.data

    if 'first_name' in data:
        user.first_name = data['first_name']
    if 'last_name' in data:
        user.last_name  = data['last_name']
    user.save(update_fields=['first_name', 'last_name'])

    if 'company_name' in data:
        profile.company_name = data['company_name']
    if 'phone' in data:
        profile.phone = data['phone']
    if 'avatar' in data:
        profile.avatar = data['avatar']
    profile.save()

    return Response({'success': True,
                     'message': 'Profile updated.'})


class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer