from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from .models import OrderItem, Orders, Restaurant, Food, Review, Cart, CartItem
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import make_password
import bcrypt

# from rest_framework import
User = get_user_model()


class CreateUserSerializer:
    class Meta:
        model = User


class UserSerializer(serializers.ModelSerializer):
    mobile = serializers.CharField(source="user_info.mobile", read_only=True)
    address = serializers.CharField(source="user_info.address", read_only=True)

    class Meta:
        model = get_user_model()
        fields = ["id", "username", "password", "email", "mobile", "address"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        
        password = validated_data.pop("password")
        user = get_user_model().objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=password,  # Pass plain text password here
        )
        return user


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "password", "email"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = make_password(validated_data["password"])
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=password,
        )

        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")
        print(email, " ", password)

        if email and password:
            user = authenticate(email=email, password=password)
            if not user:
                raise serializers.ValidationError("Invalid credentials")
            data["user"] = user
        else:
            raise serializers.ValidationError("Must include 'email' and 'password'")

        return data


class FoodSerializer(serializers.ModelSerializer):
    restaurant_name = serializers.CharField(source="restaurant.name", read_only=True)

    class Meta:
        model = Food
        fields = "__all__"
        extra_fields = ("restaurant_name",)


class RestaurantSerializer(serializers.ModelSerializer):
    foods = FoodSerializer(many=True, read_only=True)

    class Meta:
        model = Restaurant
        fields = "__all__"


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "password", "email")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data["username"],
            validated_data["email"],
            validated_data["password"],
        )
        return user


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["food", "restaurant", "rating", "comment"]


class CartItemSerializer(serializers.ModelSerializer):
    food = FoodSerializer()
    restaurant = RestaurantSerializer(read_only=True)

    class Meta:
        model = CartItem
        fields = [
            "id",
            "food",
            "quantity",
            "price",
            "restaurant",
            "get_total_item_price",
        ]

    def get_restaurant(self, obj):
        return RestaurantSerializer(obj.food.restaurant).data


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_amt = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ["id", "user", "items", "created_at", "total_amt"]

    def get_total_amt(self, obj):
        total = sum(i.get_total_item_price() for i in obj.items.all())
        return total


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ["food", "quantity", "price"]


class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Orders
        fields = ["id", "user", "total", "order_items", "order_date", "status"]
