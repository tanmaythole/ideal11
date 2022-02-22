from django.contrib import admin
from .models import *
# Register your models here.

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    search_fields = ('email', 'first_name', 'username')
    list_display = ('username', 'first_name', 'email', 'is_active', 'is_staff', 'is_verified')
    fieldsets = (
        (None, {'fields':('first_name', 'last_name', 'username', 'email', 'mobile')}),
        ('permissions', {'fields':('is_staff','is_active', 'is_verified','groups')}),
        ('Activity', {'fields':('date_joined', 'last_login')})
    )

@admin.register(Wallet)
class WalletAdmin(admin.ModelAdmin):
    search_fields = ('user__username',)         # double underscore is for to target particular column in table like user.username
    list_display = ('user', 'deposited', 'winnings', 'bonus', 'total')