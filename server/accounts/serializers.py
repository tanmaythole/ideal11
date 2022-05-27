from rest_framework import serializers
from accounts.models import User, Wallet

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields = ["email", "first_name", "last_name", "username", "mobile", "password"]
        extra_kwargs = {
            "password":{
                "write_only":True,
                "required":True
            }
        }

    def create(self, validated_data):
        user = super().create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

class WalletSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Wallet
        fields = '__all__'
    
    def update(self, instance, validated_data):
        instance.add_amount(validated_data['deposited'])
        return instance