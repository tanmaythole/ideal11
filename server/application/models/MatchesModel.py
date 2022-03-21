from django.db import models
from application.models import Series, Teams

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
