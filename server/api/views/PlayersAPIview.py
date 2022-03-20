from rest_framework.views import APIView
from rest_framework.response import Response

from application.models import Players
from api.serializers import PlayerSerializer

class PlayersAPI(APIView):

    def get(self, request):
        try:
            players = Players.objects.all()
            serializer = PlayerSerializer(players, many=True)

            return Response(
                {
                    "status":"ok",
                    "data":serializer.data
                }, 200
            )
        except Exception as e:
            print(e)