# Generated by Django 3.0.7 on 2020-07-22 18:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('me', '0011_auto_20200618_1930'),
    ]

    operations = [
        migrations.CreateModel(
            name='ClientMails',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField(auto_now=True)),
                ('clientName', models.CharField(max_length=255)),
                ('clientEmail', models.EmailField(max_length=254)),
                ('message', models.CharField(max_length=3000)),
            ],
        ),
    ]
