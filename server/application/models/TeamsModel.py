from django.db import models, transaction
from application.models.PlayersModel import TeamPlayers

class Teams(models.Model):
    series = models.ForeignKey(to='application.series', on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    short_name = models.CharField(max_length=4)
    logo = models.ImageField(upload_to='images/teams')
    select_players = models.ManyToManyField("application.players")

    class Meta:
        verbose_name = 'Team'
        verbose_name_plural = 'Teams'
    
    def __str__(self) -> str:
        return self.name + "(" + self.short_name + ")"

    def save(self, *args, **kwargs):
        super(Teams, self).save(*args, **kwargs)      
        transaction.on_commit(self.createTeamPlayers)
    
    def createTeamPlayers(self):
        for player in self.select_players.all():
            TeamPlayers(team=self, player=player).save()