# Generated by Django 5.0.3 on 2024-07-30 11:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('foodapp', '0004_food_availability_food_category_food_ingredients_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='food',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]