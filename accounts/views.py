from rest_framework.views import APIView
from rest_framework.response import Response
from accounts.serializers import UserSerializer
from django.contrib.auth.models import auth
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, Wallet
from .helpers import send_forgotPassword_mail, send_mail_link
from rest_framework.permissions import IsAuthenticated

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
            return Response({'status': 'ok', 'message':"OTP send successfully" }, 200)

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
                
                if user:
                    user.is_verified=True
                    user.code=''
                    user.save()
                    Wallet(user=user).save()
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
            
            return Response({
                    "message": "Invalid Credentials"
                }, 404)

        except Exception as e:
            return Response({
                'errors': 'something went wrong'
            }, 400)

class ResendEmailAPI(APIView):
    def post(self, request):
        data = request.data
        is_mail_sent = send_mail_link(User.objects.filter(email=data['email'])[0])
        if(is_mail_sent):
            return Response({"status":"ok", "message":"Email Sent Successfully"}, 200)
        return Response({"status":"Failed", "message":"Something Went Wrong"}, 401)
    


class ForgotPasswordAPI(APIView):
    def post(self, request):
        data = request.data
        is_mail_sent = send_forgotPassword_mail(User.objects.filter(email=data['email'])[0])
        if (is_mail_sent):
            return Response({
                    "status":"ok",
                    "message":"Email Sent Successfully"
                }, 200)
        
        return Response({
                "status":"Failed", 
                "message":"Invalid Credentials"
            }, 401)


class ResetPasswordAPI(APIView):
    def post(self, request):
        token = request.data['token']
        newPass = request.data['newPassword']
        user = User.objects.filter(forgot_password_token=str(token))
        if user.exists():
            user = user[0]
            user.set_password(newPass)
            user.save()
            return Response({
                    "status":"ok",
                    "message": "Password Updated Successfully!"
                }, 200)
        
        return Response({
                "status": "failed",
                "message": "Something Went Wrong!"
            }, 401)


class ChangePasswordAPI(APIView):
    def get_object(self):
        user = self.request.user
        return user
        
    permission_classes = (IsAuthenticated,)

    def put(self, request):
        user = self.get_object()
        data = request.data

        if data['newPassword']!=data['conNewPassword']:
            return Response({"status":"failed", "newPassword":"Password didn't Match!"}, 400)
        
        if not user.check_password(data['old_password']):
            return Response({"status":"failed", "old_password": ["Wrong password."]}, 400)
        
        try:
            user.set_password(data['newPassword'])
            user.save()

            return Response({
                "status": "ok",
                "message": "Password Changed Successfully!"
            }, 204)
        except:
            return Response({
                'status': 'failed',
                'message': "Something Went Wrong!"
            }, 400)

            