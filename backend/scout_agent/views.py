from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .agent import run_pipeline
from .models import Lead, LeadSearch
from .serializers import LeadSerializer, LeadSearchSerializer


class RunLeadGenView(APIView):
    def post(self, request):
        business_type = request.data.get("business_type")
        location      = request.data.get("location")
        max_leads     = int(request.data.get("max_leads", 10))

        if not business_type or not location:
            return Response({"error": "business_type and location required"}, status=400)

        try:
            result = run_pipeline(business_type, location, max_leads)
            return Response(result, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=500)


class LeadListView(APIView):
    def get(self, request):
        search_id = request.query_params.get("search_id")
        leads = Lead.objects.filter(search_id=search_id) if search_id else Lead.objects.all()
        return Response(LeadSerializer(leads.order_by("-created_at"), many=True).data)


class SearchHistoryView(APIView):
    def get(self, request):
        searches = LeadSearch.objects.all().order_by("-created_at")
        return Response(LeadSearchSerializer(searches, many=True).data)