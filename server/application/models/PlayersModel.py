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
    buy_price = models.IntegerField(default=0)
    sell_price = models.IntegerField(default=0)
    no_of_shares_for_buy = models.IntegerField(default=0)
    shares_available_for_buy = models.IntegerField(default=0)
    no_of_shares_for_sell = models.IntegerField(default=0)
    shares_available_for_sell = models.IntegerField(default=0)
    is_playing = models.BooleanField(default=False)
    runs = models.IntegerField(default=0)
    fours = models.IntegerField(default=0)
    sixes = models.IntegerField(default=0)
    strike_rate = models.FloatField(default=0.0)
    balls_faced = models.IntegerField(default=0)
    is_duck = models.BooleanField(default=False)
    is_out = models.BooleanField(default=False)
    overs_bowled = models.FloatField(default=0.0)
    runs_given = models.IntegerField(default=0.0)
    wickets = models.IntegerField(default=0)
    maiden_over = models.IntegerField(default=0)
    economy = models.FloatField(default=0.0)
    catch = models.IntegerField(default=0)
    stumping = models.IntegerField(default=0)
    run_out = models.IntegerField(default=0)
    total_points = models.FloatField(default=0.0)

    def __str__(self):
        return f"{self.player}"
    
    class Meta:
        verbose_name = "Cricket Player For Match (points)"
        verbose_name_plural = "Cricket Players For Match (Points)"

    def cnt_balls_from_overs(self, overs):
        overs = str(overs).split(".")
        balls = int(overs[0])*6 + int(overs[1])
        return balls

    def save(self):        
        if self.balls_faced==0:
            self.strike_rate=0
        else:
            self.strike_rate = self.runs/self.balls_faced

        if self.overs_bowled==0.0:
            self.economy = 0
        else:
            self.economy = self.runs_given/self.cnt_balls_from_overs(self.overs_bowled)
        
        total_points = 0
        if self.is_playing:
            total_points += 4
        
        total_points += self.runs*1 + self.fours*1 + self.sixes*2 + self.wickets*25 + self.maiden_over*12 + self.catch*8 + self.run_out*12 + self.stumping*12

        if self.strike_rate>170:
            total_points += 6
        elif self.strike_rate>150:
            total_points += 4
        elif self.strike_rate>130:
            total_points += 2
        elif self.strike_rate < 50:
            total_points -= 6
        elif self.strike_rate < 60:
            total_points -= 4
        elif self.strike_rate < 70:
            total_points -= 2

        if self.is_duck:
            total_points -= 2
        

        if self.economy<5:
            total_points += 6
        elif self.economy<6:
            total_points += 4
        elif self.economy<7:
            total_points += 2
        elif self.economy>12:
            total_points -= 6
        elif self.economy>11:
            total_points -= 4
        elif self.economy>10:
            total_points -= 2
        
        self.total_points = total_points
        return super(CricketPlayersForMatch, self).save()