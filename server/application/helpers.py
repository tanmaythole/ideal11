from django.db.models.signals import post_save
from django.dispatch import receiver

from application.models import Matches, TeamPlayers, CricketPlayersForMatch

@receiver(post_save, sender=Matches)
def addPlayersForMatch(sender, instance, created, **kwargs):
    if created:
        home_team_players = TeamPlayers.objects.filter(team=instance.home_team)
        away_team_players = TeamPlayers.objects.filter(team=instance.away_team)
        for i in home_team_players:
            CricketPlayersForMatch(match=instance, player=i).save()
        for i in away_team_players:
            CricketPlayersForMatch(match=instance, player=i).save()