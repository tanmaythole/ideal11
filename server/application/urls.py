from django.urls import path
from .views import *

urlpatterns = [
    path('get_teams/', get_teams, name="get_teams"),
]