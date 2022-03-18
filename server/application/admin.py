from django.contrib import admin
from .models import *

# Register your models here.
@admin.register(Sports)
class SportsAdmin(admin.ModelAdmin):
    search_fields = ('name',)
    list_display = ('name',)

@admin.register(Series)
class SeriesAdmin(admin.ModelAdmin):
    search_fields = ('name', 'sportCategory')
    list_display = ('name', 'sportsCategory', 'noOfMatches')

@admin.register(Teams)
class TeamsAdmin(admin.ModelAdmin):
    def Sport_Category(self):
        return self.series.sportsCategory
    
    search_fields = ('series', 'series.sportsCategory', 'name', 'short_name')
    list_display = ('__str__', 'series', Sport_Category, 'logo')