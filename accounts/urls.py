from django.urls import path
from accounts.views import *

urlpatterns = [
    path('register/', UserRegisterAPI.as_view()),
    path('login/', UserLoginAPI.as_view()),
]