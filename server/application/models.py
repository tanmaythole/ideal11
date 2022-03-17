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