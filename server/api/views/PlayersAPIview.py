from rest_framework.views import APIView
from rest_framework.response import Response

from api.serializers import PlayerSerializer
from application.models import CricketPlayers

class PlayersAPI(APIView):

    def get(self, request):
        try:
            players = CricketPlayers.objects.all()
            serializer = PlayerSerializer(players, many=True)

            return Response(
                {
                    "status":"ok",
                    "data":serializer.data
                }, 200
            )
        except Exception as e:
            print(e)