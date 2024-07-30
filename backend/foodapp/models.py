from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from .manager import CustomUserManager

# Create your models here.


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(_("Username"), max_length=100)
    email = models.EmailField(_("Email"), unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]
    objects = CustomUserManager()

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    def __str__(self):
        return self.email

    @property
    def get_full_name(self):
        return self.username


# models.py
from django.db import models


class Restaurant(models.Model):
    name = models.CharField(max_length=255)
    address = models.TextField()

    def __str__(self):
        return self.name


class Food(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    restaurant = models.ForeignKey(
        Restaurant, on_delete=models.CASCADE, related_name="foods"
    )
    image = models.ImageField(upload_to="food_images/", blank=True, null=True)
    category = models.CharField(max_length=100, null=True)
    availability = models.BooleanField(default=True)
    ingredients = models.TextField(blank=True, null=True)
    restaurant_info = models.TextField(blank=True, null=True)
    nutrition_info = models.JSONField(blank=True, null=True)

    def __str__(self):
        return self.name
