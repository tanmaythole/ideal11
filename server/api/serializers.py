from rest_framework import serializers
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