# Generated by Django 5.1.1 on 2024-09-29 07:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_dayreport'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dayreport',
            name='date',
            field=models.DateField(),
        ),
    ]
