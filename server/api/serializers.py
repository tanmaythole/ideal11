from rest_framework import serializers
from accounts.models import Wallet
from accounts.serializers import UserSerializer
from application.models import *

class SportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sports
        fields = '__all__'
    
class SeriesSerializer(serializers.ModelSerializer):
    sportsCategory = SportSerializer()
    class Meta:
        model = Series
        fields = '__all__'
    
class TeamSerializer(serializers.ModelSerializer):
    series = SeriesSerializer()
    class Meta:
        model = Teams
        fields = ('__all__')
    
class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matches
        fields = '__all__'
        depth = 1

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Players
        fields = '__all__'

class TeamPlayerSerializer(serializers.ModelSerializer):
    player = PlayerSerializer()
    team = TeamSerializer()
    class Meta:
        model = TeamPlayers
        # fields = ('player', 'total_points')
        fields = '__all__'
        

class PlayerForMatchSerializer(serializers.ModelSerializer):
    match = MatchSerializer()
    player = TeamPlayerSerializer()
    class Meta:
        model = CricketPlayersForMatch
        fields = '__all__'


class TransactionSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    match = MatchSerializer()
    player = PlayerForMatchSerializer()

    class Meta:
        model = Transactions
        fields = '__all__'
    
class AddTransactionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transactions
        fields = '__all__'

    def validate(self, attrs):
        data = super().validate(attrs)
        print(attrs['player'].id)
        player = CricketPlayersForMatch.objects.filter(id=attrs['player'].id).first()
        print(player.shares_available_for_buy)
        if attrs['trade_type']=='buy':
            if attrs['no_of_shares']>player.shares_available_for_buy:
                raise serializers.ValidationError("Requested amount of shares not available")
        elif attrs['trade_type']=='sell':
            if attrs['no_of_shares']>player.shares_available_for_sell:
                raise serializers.ValidationError("Requested amount of shares not available")

        wallet = Wallet.objects.get(user=attrs['user'])
        wallet_amt = wallet.deposited + wallet.winnings
        if attrs['price']>wallet_amt:
            raise serializers.ValidationError("Amount is not sufficient in wallet")
        return data