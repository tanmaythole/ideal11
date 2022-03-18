from rest_framework.views import APIView
from rest_framework.response import Response
from api.serializers import SeriesSerializer

from application.models import Series

class SeriesAPI(APIView):
    def get(self, request):
        try:
            series = Series.objects.all()
            serializer = SeriesSerializer(series, many=True)
            
            return Response(
                {
                    "status":"ok",
                    "data":serializer.data
                }, 200
            )
        except Exception as e:
            print(e)