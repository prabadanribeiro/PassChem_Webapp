# Generated by Django 4.2.7 on 2024-11-09 02:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('passchem_api', '0013_alter_lesson_topic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='topic',
            name='unit',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='topics', to='passchem_api.unit'),
        ),
    ]
