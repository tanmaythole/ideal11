from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from api.serializers import SportSerializer
from application.models import Sports


class SportsAPI(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        try:
            sports = Sports.objects.all()
            serializer = SportSerializer(sports, many=True)

            return Response(
                {
                    "status":"ok",
                    "data":serializer.data
                }
            )
        except Exception as e:
            print(e)