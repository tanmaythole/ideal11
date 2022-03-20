from rest_framework.views import APIView
from rest_framework.response import Response

from application.models import Matches
from api.serializers import MatchSerializer

class MatchesAPI(APIView):
    
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