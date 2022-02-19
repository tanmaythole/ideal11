from django.urls import path
from accounts.views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('register/', UserRegisterAPI.as_view()),
    path('login/', UserLoginAPI.as_view()),

    path('verify-email/<str:token>/', VerifyEmail.as_view()),
    path('resendemail/', ResendEmailAPI.as_view()),
    path('forgot-password/', ForgotPasswordAPI.as_view()),
    path('reset-password/', ResetPasswordAPI.as_view()),
    path('change-password/', ChangePasswordAPI.as_view()),


    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]