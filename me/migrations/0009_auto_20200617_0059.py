# Generated by Django 3.0.7 on 2020-06-16 19:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('me', '0008_about_extra_img'),
    ]

    operations = [
        migrations.RenameField(
            model_name='about',
            old_name='extra',
            new_name='extra_text',
        ),
    ]
