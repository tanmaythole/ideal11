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
    filter_horizontal = ('select_players', )

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
    
@admin.register(Players)
class PlayersAdmin(admin.ModelAdmin):
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
    
@admin.register(TeamPlayers)
class TeamPlayersdmin(admin.ModelAdmin):
    search_fields = [
        'team__name',
        'team__short_name',
        'team__series__name',
        'player__name',
        'player__short_name',
        'player__role',
        'player__sport__name',
        'player__nationality'
    ]

    list_display = [
        '__str__',
        'team',
        'total_points'
    ]

@admin.register(CricketPlayersForMatch)
class CricketPlayersForMatchAdmin(admin.ModelAdmin):
    search_fields = [
        'match__home_team__name',
        'match__home_team__short_name',
        'match__away_team__name',
        'match__away_team__short_name',
        'match__series__name',
        'player__player__name',
        'player__player__short_name',
        'player__player__role',
        'player__player__sport__name',
        'player__player__nationality'
    ]
    list_display = [
        '__str__',
        'match',
        'is_playing',
        'total_points'
    ]

    fieldsets = (
        (None, {'fields': ('match', 'player')}),
        ('Buy/Sell Prices', {'fields': ('buy_price', 'sell_price')}),
        ('Stats & Scores', {'fields': ('is_playing', 'runs', 'fours', 'sixes', 'strike_rate', 'balls_faced', 'is_duck', 'is_out', 'overs_bowled', 'wickets', 'maiden_over', 'economy', 'catch')}),
        ('Points', {'fields': ('total_points',)})
    )