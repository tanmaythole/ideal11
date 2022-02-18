from rest_framework.views import APIView
from rest_framework.response import Response
from accounts.serializers import UserSerializer
from django.contrib.auth.models import auth
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User

# Create your views here.
class UserRegisterAPI(APIView):
    def post(self, request):
        try:
            serializer = UserSerializer(data=request.data)

            if not serializer.is_valid():
                return Response({
                    'status': 403,
                    'errors': serializer.errors
                })
            serializer.save()
            return Response({
                'status': 'ok',
                'message':"OTP send successfully",
            })

        except Exception as e:
            print(e)
            return Response({
                'errors': 'something went wrong'
            })

class VerifyEmail(APIView):
    def get(self, request, token):
        if token:
            try:
                user = User.objects.filter(code=token)[0]
                print(user)
                if user:
                    user.is_verified=True
                    user.code=''
                    user.save()
                    return Response({"message":"success"}, 200)
            except:
                return Response({"message":"error"}, 404)


class UserLoginAPI(APIView):
    def post(self, request):
        try:
            data = request.data

            user = auth.authenticate(email=data['email'], password=data['password'])
            if user is not None:
                token = RefreshToken.for_user(user)
                return Response(
                    {
                        "refresh":str(token),
                        "access": str(token.access_token)
                    }, 
                    200
                )
            
            return Response(
                {
                    "message": "Invalid Credentials"
                },
                404
            )
        except Exception as e:
            return Response({
                'errors': 'something went wrong'
            }, 400)
