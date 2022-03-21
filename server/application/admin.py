from django.contrib import admin
from .models import *

# Register your models here.
@admin.register(Sports)
class SportsAdmin(admin.ModelAdmin):
    search_fields = ('name',)
    list_display = ('name',)

@admin.register(Series)
class SeriesAdmin(admin.ModelAdmin):
    search_fields = ('name', 'sportsCategory__name')
    list_display = ('name', 'sportsCategory', 'noOfMatches')

@admin.register(Teams)
class TeamsAdmin(admin.ModelAdmin):
    def Sport_Category(self):
        return self.series.sportsCategory

    def image_tag(self, obj):
        from django.utils.html import mark_safe
        return mark_safe('<img src="/media/%s" height="50px" width="50px" />' % (obj.logo))
    
    search_fields = [
        'series__name', 
        'name', 
        'short_name',
        'series__sportsCategory__name'
    ]
    list_display = ('__str__', 'series', Sport_Category, 'image_tag')

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
        js = ("/static/js/selectTeams.js", )
    
@admin.register(CricketPlayers)
class CricketPlayersAdmin(admin.ModelAdmin):
    search_fields = [
        'name',
        'short_name',
        'role',
        'nationality'
    ]
    list_display = [
        '__str__',
        'role',
        'nationality'
    ]

    class Media:
        js = ("/static/js/selectRoles.js", )