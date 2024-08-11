# Generated by Django 5.0.3 on 2024-08-11 03:30

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("foodapp", "0009_alter_user_options_user_address_user_mobile_number_and_more"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="user",
            options={"verbose_name": "User", "verbose_name_plural": "Users"},
        ),
        migrations.RemoveField(
            model_name="user",
            name="address",
        ),
        migrations.RemoveField(
            model_name="user",
            name="mobile_number",
        ),
        migrations.AlterField(
            model_name="user",
            name="email",
            field=models.EmailField(max_length=254, unique=True, verbose_name="Email"),
        ),
        migrations.AlterField(
            model_name="user",
            name="is_active",
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name="user",
            name="username",
            field=models.CharField(max_length=100, verbose_name="Username"),
        ),
    ]
