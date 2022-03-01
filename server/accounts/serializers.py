from rest_framework import serializers
from accounts.models import User, Wallet

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields = ["email", "first_name", "last_name", "username", "mobile", "password"]

    def create(self, validated_data):
        user = super().create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

class WalletSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Wallet
        fields = '__all__'