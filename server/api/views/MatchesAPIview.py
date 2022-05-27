from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from application.models import Matches
from api.serializers import MatchSerializer
from application.models import Transactions

class MatchesAPI(APIView):
    permission_classes = (IsAuthenticated, )
    
    def get(self, request):
        try:
            type = request.GET.get('type')
            sport = request.GET.get('sport')
            
            matches = Matches.objects.filter(match_status=type)
            if sport:
                matches = matches.filter(series__sportsCategory__name=sport)
                
            serializer = MatchSerializer(matches, many=True)

            return Response(
                {
                    "status":"ok",
                    "data":serializer.data
                }, 200
            )

        except Exception as e:
            print(e)


class PortfolioMatchesAPI(APIView):
    permission_classes = (IsAuthenticated, )
    
    def get(self, request):
        try:
            type = request.GET.get('type')
            sport = request.GET.get('sport')

            transactions = Transactions.objects.filter(user=request.user, match__match_status=type, match__series__sportsCategory__name=sport)
            
            matches = []
            
            for i in transactions:
                match =  Matches.objects.get(id=i.match.id)
                if match not in matches:
                    matches.append(match)
                
            serializer = MatchSerializer(matches, many=True)

            return Response(
                {
                    "status":"ok",
                    "data":serializer.data
                }, 200
            )

        except Exception as e:
            print(e)