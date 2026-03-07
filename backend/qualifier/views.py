from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product
from qualifier.serializer import  ProductSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from scout.models import Lead
from .models import QualifiedLead
from .services.scoring_service import qualify_lead
from .serializers import QualifiedLeadSerializer


class RunQualificationView(APIView):

    def post(self, request):

        campaign_industry = request.data.get("industry")
        campaign_location = request.data.get("location")

        leads = Lead.objects.all()

        results = []

        for lead in leads:

            scores = qualify_lead(
                lead,
                campaign_industry,
                campaign_location
            )

            q = QualifiedLead.objects.create(
                lead=lead,
                business_size_score=scores["size"],
                location_score=scores["location"],
                industry_score=scores["industry"],
                phone_score=scores["phone"],
                online_presence_score=scores["online"],
                final_score=scores["final"],
                qualified=scores["qualified"],
            )

            results.append(q)

        serializer = QualifiedLeadSerializer(results, many=True)

        return Response(serializer.data)
class ProductAPIView(APIView):

    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProductSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)