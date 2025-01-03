# Generated by Django 4.2.7 on 2024-10-31 16:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('passchem_api', '0010_topic_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lesson',
            name='topic',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='topics', to='passchem_api.topic'),
        ),
        migrations.AlterField(
            model_name='lesson',
            name='unit',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='passchem_api.unit'),
        ),
    ]
