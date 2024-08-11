from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from .manager import CustomUserManager
from django.contrib.auth.models import UserManager as DefaultManager

# Create your models here.


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(_("Username"), max_length=100)
    mobile = models.CharField(_("Mobile Number"), max_length=15, blank=True, null=True)
    address = models.TextField(_("Address"), blank=True, null=True)
    email = models.EmailField(_("Email"), unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]
    objects = DefaultManager()

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
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    address = models.TextField()

    def __str__(self):
        return self.name


class Food(models.Model):
    id = models.IntegerField(primary_key=True)
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


class Review(models.Model):
    food = models.ForeignKey(Food, related_name="reviews", on_delete=models.CASCADE)
    restaurant = models.ForeignKey(
        Restaurant, related_name="reviews", on_delete=models.CASCADE
    )
    rating = (
        models.PositiveIntegerField()
    )  # Assuming ratings are integers between 1 and 5
    comment = models.TextField(blank=True, null=True)
    # Add more fields if needed

    def __str__(self):
        return f"Review for {self.food.name} at {self.restaurant.name} - Rating: {self.rating}"


class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cart {self.id} for {self.user.username}"


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name="items", on_delete=models.CASCADE)
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} x {self.food.name} in Cart {self.cart.id}"
