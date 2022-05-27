from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser

# Create your models here.
class UserManager(BaseUserManager):
    
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    email = models.EmailField(unique=True)
    mobile = models.CharField(max_length=14)
    code = models.CharField(max_length=256, null=True, blank=True)
    forgot_password_token = models.CharField(max_length=256, null=True, blank=True)
    is_verified = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
    
    def __str__(self):
        return self.username


class Wallet(models.Model):
    user = models.OneToOneField(to=User, on_delete=models.CASCADE, unique=True)
    deposited = models.FloatField(default=0.0)
    bonus = models.FloatField(default=0.0)
    winnings = models.FloatField(default=0.0)
    total = models.FloatField(default=0.0)

    class Meta:
        verbose_name = "Wallet"
        verbose_name_plural = "Wallets"

    def save(self, *args, **kwargs):
        self.total = self.deposited + self.winnings + self.bonus
        return super(Wallet, self).save(*args, **kwargs)
    
    def add_amount(self, amtToBeAdd, *args, **kwargs):
        self.deposited += amtToBeAdd
        return super(Wallet, self).save(*args, **kwargs)

    def __str__(self):
        return self.user.username
    
