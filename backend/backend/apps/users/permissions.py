# backend/users/permissions.py

from rest_framework.permissions import BasePermission
from rest_framework.exceptions import PermissionDenied


class IsActivePlan(BasePermission):
    """Layer 1+2 — Is plan active and not expired?"""

    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        try:
            profile = request.user.profile
            if profile.is_expired:
                raise PermissionDenied({
                    'code':    'PLAN_EXPIRED',
                    'detail':  'Your plan has expired.',
                    'action':  'upgrade',
                })
        except UserProfile.DoesNotExist:
            return False
        return True


class IsPro(BasePermission):
    """RBAC — Pro or Enterprise only"""

    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        role = request.user.profile.role
        if role not in ['pro', 'enterprise', 'admin']:
            raise PermissionDenied({
                'code':       'UPGRADE_REQUIRED',
                'detail':     'Pro plan required.',
                'upgrade_to': 'pro',
            })
        return True


class IsEnterprise(BasePermission):
    """RBAC — Enterprise only"""

    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        role = request.user.profile.role
        if role not in ['enterprise', 'admin']:
            raise PermissionDenied({
                'code':       'UPGRADE_REQUIRED',
                'detail':     'Enterprise plan required.',
                'upgrade_to': 'enterprise',
            })
        return True


class LeadsQuota(BasePermission):
    """ABAC — Within leads limit?"""

    def has_permission(self, request, view):
        if request.method not in ['POST']:
            return True
        if not request.user.is_authenticated:
            return False
        usage = request.user.usage
        plan  = request.user.profile.plan
        if usage.leads_used >= plan.leads_limit:
            raise PermissionDenied({
                'code':   'QUOTA_EXCEEDED',
                'detail': f'Leads limit reached '
                          f'({plan.leads_limit}).',
                'used':   usage.leads_used,
                'limit':  plan.leads_limit,
            })
        return True


class CampaignsQuota(BasePermission):
    """ABAC — Within campaigns limit?"""

    def has_permission(self, request, view):
        if request.method != 'POST':
            return True
        if not request.user.is_authenticated:
            return False
        usage = request.user.usage
        plan  = request.user.profile.plan
        if usage.campaigns_used >= plan.campaigns_limit:
            raise PermissionDenied({
                'code':   'QUOTA_EXCEEDED',
                'detail': f'Campaigns limit reached '
                          f'({plan.campaigns_limit}).',
                'used':   usage.campaigns_used,
                'limit':  plan.campaigns_limit,
            })
        return True


class MessagesQuota(BasePermission):
    """ABAC — Within messages limit?"""

    def has_permission(self, request, view):
        if request.method != 'POST':
            return True
        if not request.user.is_authenticated:
            return False
        usage = request.user.usage
        plan  = request.user.profile.plan
        if usage.messages_sent >= plan.messages_limit:
            raise PermissionDenied({
                'code':   'QUOTA_EXCEEDED',
                'detail': 'Monthly message limit reached.',
                'used':   usage.messages_sent,
                'limit':  plan.messages_limit,
            })
        return True