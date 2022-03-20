import json
from django.http import HttpResponse, JsonResponse
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