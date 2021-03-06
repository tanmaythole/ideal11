# Generated by Django 4.0.2 on 2022-04-10 12:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('application', '0008_alter_players_short_name_teamplayers'),
    ]

    operations = [
        migrations.CreateModel(
            name='CreatePlayersForMatch',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_playing', models.BooleanField(default=False)),
                ('runs', models.IntegerField(default=0)),
                ('fours', models.IntegerField(default=0)),
                ('sixes', models.IntegerField(default=0)),
                ('strike_rate', models.FloatField(default=0.0)),
                ('balls_faced', models.IntegerField(default=0)),
                ('is_duck', models.BooleanField(default=False)),
                ('is_out', models.BooleanField(default=False)),
                ('overs_bowled', models.FloatField(default=0.0)),
                ('wickets', models.IntegerField(default=0)),
                ('maiden_over', models.IntegerField(default=0)),
                ('economy', models.FloatField(default=0.0)),
                ('catch', models.IntegerField(default=0)),
                ('total_points', models.FloatField(default=0.0)),
                ('match', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='application.matches')),
                ('player', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='application.teamplayers')),
            ],
            options={
                'verbose_name': 'Cricket Player For Match (points)',
                'verbose_name_plural': 'Cricket Players For Match (Points)',
            },
        ),
    ]
