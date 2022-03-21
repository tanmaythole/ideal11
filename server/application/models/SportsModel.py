from django.db import models

# Create your models here.
class Sports(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        verbose_name = 'Sport'
        verbose_name_plural = 'Sports'
    
    def __str__(self):
        return self.name
