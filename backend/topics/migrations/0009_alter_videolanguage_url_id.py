# Generated by Django 4.2.7 on 2024-03-08 18:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('topics', '0008_remove_videolanguage_url_videolanguage_url_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='videolanguage',
            name='url_id',
            field=models.CharField(max_length=255),
        ),
    ]
