from django.urls import path

from .views import *

urlpatterns = [
    path('sports/', SportsAPI.as_view(), name="Sports"),
    path('series/', SeriesAPI.as_view(), name="Series"),
    path('teams/', TeamsAPI.as_view(), name="Teams"),
    path('matches/', MatchesAPI.as_view(), name="Matches"),
    path('players/', PlayersAPI.as_view(), name="Players"),
    path('transactions/', TransactionsAPI.as_view(), name="Transactions"),

    path('portfolio/matches/', PortfolioMatchesAPI.as_view(), name="Portfolio Matches"),
]