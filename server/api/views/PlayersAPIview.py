from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from api.serializers import PlayerForMatchSerializer
from application.models import CricketPlayersForMatch
from application.models.TransactionsModel import Transactions

class PlayersAPI(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        try:
            match = request.GET.get('match')

            players = CricketPlayersForMatch.objects.filter(match=match)
            serializer = PlayerForMatchSerializer(players, many=True)

            return Response(
                {
                    "status":"ok",
                    "match": serializer.data[0]['match'],
                    "data": serializer.data
                }, 200
            )
        except Exception as e:
            print(e)