# Generated by Django 4.2.7 on 2024-05-23 22:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('passchem_api', '0004_videolanguage_language_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='lesson',
            name='unit',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='passchem_api.unit'),
        ),
    ]
