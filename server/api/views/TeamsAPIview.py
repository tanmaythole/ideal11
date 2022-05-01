from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from api.serializers import TeamSerializer
from application.models import Teams


class TeamsAPI(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        try:
            teams = Teams.objects.all()
            serializer = TeamSerializer(teams, many=True)

            return Response(
                {
                    "status":"ok",
                    "data": serializer.data
                }
            )
        except Exception as e:
            print(e)