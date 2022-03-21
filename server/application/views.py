import json
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from .models import *

# Create your views here.

@login_required
def get_teams(request):
    series = request.GET.get('series')
    team1 = request.GET.get('team1')
    if series and team1:
        data = list(Teams.objects.filter(series=series).exclude(id=team1).values())
    elif series:
        data = list(Teams.objects.filter(series=series).values())
    return HttpResponse(json.dumps(data), content_type="application/json")

@login_required
def get_roles(request):
    sport = Sports.objects.get(id=request.GET.get('sport'))
    roles = []
    if sport.name=='cricket':
        roles = [
            ['wk', 'WK'],
            ['bat', 'BAT'],
            ['ar', 'AR'],
            ['bowl', 'BOWL']
        ]
    elif sport.name=='football':
        roles = []
    
    return HttpResponse(json.dumps(roles), content_type="application/json")