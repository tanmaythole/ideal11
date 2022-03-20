from django.contrib import admin
from .models import *

# Register your models here.
@admin.register(Sports)
class SportsAdmin(admin.ModelAdmin):
    search_fields = ('name',)
    list_display = ('name',)

@admin.register(Series)
class SeriesAdmin(admin.ModelAdmin):
    search_fields = ('name', 'sportCategory__name')
    list_display = ('name', 'sportsCategory', 'noOfMatches')

@admin.register(Teams)
class TeamsAdmin(admin.ModelAdmin):
    def Sport_Category(self):
        return self.series.sportsCategory
    
    search_fields = [
        'series__name', 
        'name', 
        'short_name',
        'series__sportsCategory__name'
    ]
    list_display = ('__str__', 'series', Sport_Category, 'logo')

@admin.register(Matches)
class MatchesAdmin(admin.ModelAdmin):
    search_fields = [
        'series__name', 
        'home_team__name', 
        'away_team__name', 
        'home_team__short_name', 
        'away_team__short_name',
        'match_status'
    ]
    list_display = ('__str__', 'series', 'match_status', 'datetime')

    class Media:
        js = ("/static/js/selectajax.js", )