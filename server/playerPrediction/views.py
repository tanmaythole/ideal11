import json
from django.http import HttpResponse
import pandas as pd
import numpy as np
from .scripts.player_performance import player_performance

#Ignoring XGBoost warnings
def warn(*args, **kwargs):
    pass
import warnings
warnings.warn = warn

#Ignoring SciKit-Learn warnings
import warnings
from sklearn.exceptions import DataConversionWarning
warnings.filterwarnings("ignore", category=DeprecationWarning)

overall_batsman_details = pd.read_excel('dataset/player_details/overall_batsman_details.xlsx',header=0,index_col=0)
match_batsman_details = pd.read_excel('dataset/player_details/match_batsman_details.xlsx',header=0)
overall_bowler_details = pd.read_excel('dataset/player_details/overall_bowler_details.xlsx',header=0,index_col=0)
match_bowler_details = pd.read_excel('dataset/player_details/match_bowler_details.xlsx',header=0)

#Filiing Missing Values
    #match_batsman_details
match_batsman_details.loc[:, 'date'].ffill(inplace=True)
    #match_bowler_details
match_bowler_details.loc[:, 'date'].ffill(inplace=True)
#Input Function
def get_data(check_list_1=None, check_list_2=None):
    if check_list_1 != None:
        if check_list_2 != None:
            print_list = sorted(set(check_list_1) & set(check_list_2))
            return print_list
        else:
            return check_list_1
    else:
        if check_list_2 != None:
            return check_list_2
        else:
            pass
    # while True:
    #     flag = 0
    #     res = input(f'\nEnter the desired {input_value}: ')
    #     if check_list_1 != None:
    #         if res in check_list_1:
    #             flag += 1
    #     if check_list_2 != None:
    #         if res in check_list_2:
    #             flag += 2
    #     if flag>0:
    #     	return res,flag
    #     else:
    #         print('Invalid input.')
    #         continue


def get_Teams(request):
    teams = match_batsman_details['team'].unique()
    return HttpResponse(json.dumps({"teams": list(teams)}), content_type="application/json")

def get_players(request):
    team = request.GET.get('team')
    players = get_data(sorted(match_batsman_details[match_batsman_details['team'] == team]['name'].unique().tolist()), sorted(match_bowler_details[match_bowler_details['team'] == team]['name'].unique().tolist()))
    return HttpResponse(json.dumps({"players": list(players)}), content_type="application/json")

def get_oppositions(request):
    player = request.GET.get('player')
    oppositions = get_data(sorted(match_batsman_details[match_batsman_details['name']==player]['opposition'].unique().tolist()), sorted(match_bowler_details[match_bowler_details['name'] == player]['opposition'].unique().tolist()))
    return HttpResponse(json.dumps({"oppositions": list(oppositions)}), content_type="application/json")

def get_venues(request):
    player = request.GET.get('player')
    opposition = request.GET.get('opposition')

    venue_batsman_name = match_batsman_details[match_batsman_details['name'] == player]['venue']
    venue_batsman_opposition = match_batsman_details[match_batsman_details['opposition'] == opposition]['venue']
    venue_bowler_name = match_bowler_details[match_bowler_details['name'] == player]['venue']
    venue_bowler_opposition = match_bowler_details[match_bowler_details['opposition'] == opposition]['venue']

    venues = get_data(sorted(venue_batsman_name[venue_batsman_name.isin(venue_batsman_opposition)].unique().tolist()), sorted(venue_bowler_name[venue_bowler_name.isin(venue_bowler_opposition)].unique().tolist()))

    return HttpResponse(json.dumps({"venues": list(venues)}), content_type="application/json")


def prediction(request):

#     #Input's
#     print('Available Services:\n1. Specific Player Performance\n')
#     team,dump = input_values('team', match_batsman_details['team'].unique().tolist())
#     print(dump,team)
#     player_name, param_player = input_values('player_name', sorted(match_batsman_details[match_batsman_details['team'] == team]['name'].unique().tolist()), sorted(match_bowler_details[match_bowler_details['team'] == team]['name'].unique().tolist()))

#     opposition, param_opp = input_values('opposition', sorted(match_batsman_details[match_batsman_details['name']==player_name]['opposition'].unique().tolist()), sorted(match_bowler_details[match_bowler_details['name'] == player_name]['opposition'].unique().tolist()))

#     venue_batsman_name = match_batsman_details[match_batsman_details['name'] == player_name]['venue']
#     venue_batsman_opposition = match_batsman_details[match_batsman_details['opposition'] == opposition]['venue']
#     venue_bowler_name = match_bowler_details[match_bowler_details['name'] == player_name]['venue']
#     venue_bowler_opposition = match_bowler_details[match_bowler_details['opposition'] == opposition]['venue']
#     venue, param_ven = input_values('venue', sorted(venue_batsman_name[venue_batsman_name.isin(venue_batsman_opposition)].unique().tolist()), sorted(venue_bowler_name[venue_bowler_name.isin(venue_bowler_opposition)].unique().tolist()))
    player = request.GET.get('player')
    opposition = request.GET.get('opposition')
    venue = request.GET.get('venue')
    param = 3
    res = player_performance(param, player, opposition, venue)
    # print('\n')
    # if 'bat_prediction' in res:
    #     print(f'Number of predicted runs:{res["bat_prediction"]}')
    # if "bowl_prediction" in res:
    #     print(f'Number of predicted wickets:{res["bowl_prediction"]}')
    # exit()
    print(res)
    return HttpResponse(json.dumps(res), content_type="application/json")