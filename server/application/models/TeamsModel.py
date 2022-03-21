from django.db import models

from application.models import Series

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

