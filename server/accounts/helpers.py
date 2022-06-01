from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail

from ideal11.settings import FRONTEND_URL
from .models import User
import uuid
from django.conf import settings

@receiver(post_save, sender=User)
def send_email_otp(sender, instance, created, **kwargs):
    if created:
        send_mail_link(instance)


def create_verification_code(user, type):
    if not user.is_verified:
        if (user.code=="" or user.code==None) and type=="EmailVerification":
            code = uuid.uuid4()
            user.code = code
            user.save()
        else:
            code = str(user.code)
        return code
    
    elif user.is_verified and type=="ForgotPassword":
        try:
            code = uuid.uuid4()
            user.forgot_password_token = code
            user.save()
            return code
        except Exception as e:
            return e
    
    else:
        return False


def send_mail_link(instance):
    try:
        token = create_verification_code(instance, "EmailVerification")
        if not token:
            return False
        subject = "MyIdeal11 : Activate Your New Account!"
        message = f"Hii {instance.first_name}, Welcome to MyIdeal11! Confirm your email by click the link below <br /><a href='{FRONTEND_URL}/verify/{token}'>Click Here</a>"
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [instance.email]
        send_mail(subject, message, email_from, recipient_list)
        return True
    except Exception as e:
        return e


def send_forgotPassword_mail(user):
    try:
        token = create_verification_code(user, "ForgotPassword")
        subject = "MyIdeal11 : Reset Your Password!"
        message = f"Hii {user.first_name}, Welcome to MyIdeal11! Confirm your email by click the link below <br /><a href='{FRONTEND_URL}/reset-password/?token={token}'>Click Here</a>"
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [user.email]
        send_mail(subject, message, email_from, recipient_list)
        return True
    except Exception as e:
        return False