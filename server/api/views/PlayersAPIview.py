from rest_framework.views import APIView
from rest_framework.response import Response

from api.serializers import PlayerForMatchSerializer
from application.models import CricketPlayersForMatch

class PlayersAPI(APIView):

    def get(self, request):
        try:
            match = request.GET.get('match')

            players = CricketPlayersForMatch.objects.filter(match=match)
            serializer = PlayerForMatchSerializer(players, many=True)

            return Response(
                {
                    "status":"ok",
                    "data":serializer.data
                }, 200
            )
        except Exception as e:
            print(e)