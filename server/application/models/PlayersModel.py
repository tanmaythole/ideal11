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
    
class CricketPlayersForMatch(models.Model):
    match = models.ForeignKey(to='application.matches', on_delete=models.CASCADE)
    player = models.ForeignKey(to=TeamPlayers, on_delete=models.CASCADE)
    is_playing = models.BooleanField(default=False)
    runs = models.IntegerField(default=0)
    fours = models.IntegerField(default=0)
    sixes = models.IntegerField(default=0)
    strike_rate = models.FloatField(default=0.0)
    balls_faced = models.IntegerField(default=0)
    is_duck = models.BooleanField(default=False)
    is_out = models.BooleanField(default=False)
    overs_bowled = models.FloatField(default=0.0)
    wickets = models.IntegerField(default=0)
    maiden_over = models.IntegerField(default=0)
    economy = models.FloatField(default=0.0)
    catch = models.IntegerField(default=0)
    total_points = models.FloatField(default=0.0)

    def __str__(self):
        return f"{self.player}"
    
    class Meta:
        verbose_name = "Cricket Player For Match (points)"
        verbose_name_plural = "Cricket Players For Match (Points)"