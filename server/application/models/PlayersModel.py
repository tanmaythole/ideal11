from django.db import models


class Players(models.Model):
    roles = [
        ('wk', 'WK'),
        ('bat', 'BAT'),
        ('ar', 'AR'),
        ('bowl', 'BOWL')
    ]
    name = models.CharField(max_length=256)
    short_name = models.CharField(max_length=256, unique=True)
    sport = models.ForeignKey(to='application.sports', on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=roles)
    image = models.ImageField(upload_to='images/players')
    nationality = models.CharField(max_length=256)

    class Meta:
        verbose_name = "Player"
        verbose_name_plural = "Players"
    
    def __str__(self):
        return f"{self.short_name}"


class TeamPlayers(models.Model):
    
    team = models.ForeignKey(to='application.teams', on_delete=models.CASCADE)
    player = models.ForeignKey(to=Players, on_delete=models.CASCADE)
    total_points = models.FloatField(default=0.0)


    class Meta:
        verbose_name = "Player of Team"
        verbose_name_plural = "Players of Teams"
    
    def __str__(self):
        return self.player.short_name