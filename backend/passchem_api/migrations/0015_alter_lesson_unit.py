# Generated by Django 4.2.7 on 2024-11-14 21:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('passchem_api', '0014_alter_topic_unit'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lesson',
            name='unit',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='lessons', to='passchem_api.unit'),
        ),
    ]
