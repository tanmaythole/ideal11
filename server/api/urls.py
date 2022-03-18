from django.urls import path
from .views import *

urlpatterns = [
    path('sports/', SportsAPI.as_view(), name="Sports"),
    path('series/', SeriesAPI.as_view(), name="Series"),
    path('teams/', TeamsAPI.as_view(), name="Teams"),
]