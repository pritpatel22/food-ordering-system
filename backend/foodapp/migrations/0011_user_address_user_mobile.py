# Generated by Django 5.0.3 on 2024-08-11 03:36

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("foodapp", "0010_alter_user_options_remove_user_address_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="address",
            field=models.TextField(blank=True, null=True, verbose_name="Address"),
        ),
        migrations.AddField(
            model_name="user",
            name="mobile",
            field=models.CharField(
                blank=True, max_length=15, null=True, verbose_name="Mobile Number"
            ),
        ),
    ]
