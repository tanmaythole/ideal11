from django.db import models

class Series(models.Model):
    types_of_series = [
        ("t20", "T20"),
        ("odi", "ODI"),
        ("test", "Test"),
        ("t10", "T10")
    ]

    name = models.CharField(max_length=100)
    sportsCategory = models.ForeignKey(to='application.sports', on_delete=models.CASCADE)
    typeOfSeries = models.CharField(choices=types_of_series, max_length=4)
    noOfMatches = models.IntegerField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

    class Meta:
        verbose_name = 'Series'
        verbose_name_plural = 'Series'
    
    def __str__(self) -> str:
        return self.name