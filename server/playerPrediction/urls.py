
from django.urls import path
from .views import *

urlpatterns = [
    path('teams/', get_Teams),
    path('players/', get_players),
    path('oppositions/', get_oppositions),
    path('venues/', get_venues),
    path('', prediction),
]