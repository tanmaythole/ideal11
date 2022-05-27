import re
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from api.serializers import AddTransactionSerializer, TransactionSerializer
from application.models.TransactionsModel import Transactions


class TransactionsAPI(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        try:
            match = request.GET.get('match')
            transactions = Transactions.objects.filter(user=request.user, match=match)
            
            serializer = TransactionSerializer(transactions, many=True)
            
            return Response(
                {
                    "status":"ok",
                    "data": serializer.data,
                    "match": serializer.data[0]['match']
                }
            )
        except Exception as e:
            return Response({"error": str(e)}, 400)

    def post(self, request):
        try:
            data = request.data
            data['user'] = request.user.id
            print(data)
            serializer = AddTransactionSerializer(data=data)

            if not serializer.is_valid():
                return Response({"error": serializer.errors}, 401)
                
            serializer.save()
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, 400)