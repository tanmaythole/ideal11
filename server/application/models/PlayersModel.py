from django.db import models

from application.models import Sports


class Players(models.Model):
    roles = [
        ('wk', 'WK'),
        ('bat', 'BAT'),
        ('ar', 'AR'),
        ('bowl', 'BOWL')
    ]
    name = models.CharField(max_length=256)
    short_name = models.CharField(max_length=256)
    sport = models.ForeignKey(to=Sports, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=roles)
    image = models.ImageField(upload_to='images/players')
    nationality = models.CharField(max_length=256)

    class Meta:
        verbose_name = "Player"
        verbose_name_plural = "Players"
    
    def __str__(self):
        return f"{self.short_name}"