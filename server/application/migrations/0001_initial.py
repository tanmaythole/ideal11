# Generated by Django 4.0.2 on 2022-03-16 18:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Series',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('noOfMatches', models.IntegerField()),
                ('start_date', models.DateTimeField()),
                ('end_date', models.DateTimeField()),
            ],
            options={
                'verbose_name': 'Series',
                'verbose_name_plural': 'Series',
            },
        ),
        migrations.CreateModel(
            name='Sports',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
            options={
                'verbose_name': 'Sport',
                'verbose_name_plural': 'Sports',
            },
        ),
        migrations.CreateModel(
            name='Teams',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('short_name', models.CharField(max_length=4)),
                ('logo', models.ImageField(upload_to='images/teams')),
                ('series', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='application.series')),
            ],
            options={
                'verbose_name': 'Team',
                'verbose_name_plural': 'Teams',
            },
        ),
        migrations.AddField(
            model_name='series',
            name='sportsCategory',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='application.sports'),
        ),
    ]
