# Generated by Django 4.0.2 on 2022-05-27 03:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('application', '0013_transactions'),
    ]

    operations = [
        migrations.AddField(
            model_name='cricketplayersformatch',
            name='run_out',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='cricketplayersformatch',
            name='runs_given',
            field=models.IntegerField(default=0.0),
        ),
        migrations.AddField(
            model_name='cricketplayersformatch',
            name='stumping',
            field=models.IntegerField(default=0),
        ),
    ]
