from django.db import models

# Create your models here.
class Sports(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        verbose_name = 'Sport'
        verbose_name_plural = 'Sports'
    
    def __str__(self):
        return self.name

class Series(models.Model):
    types_of_series = [
        ("t20", "T20"),
        ("odi", "ODI"),
        ("test", "Test"),
        ("t10", "T10")
    ]

    name = models.CharField(max_length=100)
    sportsCategory = models.ForeignKey(to=Sports, on_delete=models.CASCADE)
    typeOfSeries = models.CharField(choices=types_of_series, max_length=4)
    noOfMatches = models.IntegerField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

    class Meta:
        verbose_name = 'Series'
        verbose_name_plural = 'Series'
    
    def __str__(self) -> str:
        return self.name

class Teams(models.Model):
    series = models.ForeignKey(to=Series, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    short_name = models.CharField(max_length=4)
    logo = models.ImageField(upload_to='images/teams')

    class Meta:
        verbose_name = 'Team'
        verbose_name_plural = 'Teams'
    
    def __str__(self) -> str:
        return self.name + "(" + self.short_name + ")"
    
class Matches(models.Model):
    match_status = [
        ("upcoming", "Upcoming"),
        ("live", "Live"),
        ("review", "In Review"),
        ("completed", "Completed"),
        ("refund", "Refunded"),
        ("abandoned", "Abandoned")
    ]

    series = models.ForeignKey(to=Series, on_delete=models.CASCADE, null=False, blank=False)
    home_team = models.ForeignKey(to=Teams, on_delete=models.CASCADE, related_name="home_team", null=False, blank=False)
    away_team = models.ForeignKey(to=Teams, on_delete=models.CASCADE, related_name="away_team", null=False, blank=False)
    datetime = models.DateTimeField(null=False, blank=False)
    match_status = models.CharField(max_length=20, choices=match_status, default="upcoming", null=False, blank=False)
    is_lineups_out = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Match"
        verbose_name_plural = "Matches"
    
    def __str__(self):
        return f"{self.home_team.short_name} vs {self.away_team.short_name}"

class Players(models.Model):
    roles = [
        ('wk', 'WK'),
        ('bat', 'BAT'),
        ('ar', 'AR'),
        ('bowl', 'BOWL')
    ]
    team = models.ForeignKey(to=Teams, on_delete=models.CASCADE)
    name = models.CharField(max_length=256)
    short_name = models.CharField(max_length=256)
    role = models.CharField(max_length=10, choices=roles)
    image = models.ImageField(upload_to='images/players')
    total_points = models.FloatField(default=0.0)

    class Meta:
        verbose_name = "Player"
        verbose_name_plural = "Players"
    
    def __str__(self):
        return f"{self.short_name}"