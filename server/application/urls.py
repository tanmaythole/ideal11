from django.urls import path
from .views import *

urlpatterns = [
    path('get_teams/', get_teams, name="get_teams"),
    path('get_roles/', get_roles, name="get_roles"),

]