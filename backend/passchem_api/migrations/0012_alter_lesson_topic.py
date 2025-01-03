# Generated by Django 4.2.7 on 2024-10-31 16:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('passchem_api', '0011_alter_lesson_topic_alter_lesson_unit'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lesson',
            name='topic',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='topics', to='passchem_api.topic'),
        ),
    ]
