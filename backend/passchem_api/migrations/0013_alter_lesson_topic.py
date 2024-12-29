# Generated by Django 4.2.7 on 2024-11-08 23:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('passchem_api', '0012_alter_lesson_topic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lesson',
            name='topic',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='lessons', to='passchem_api.topic'),
        ),
    ]