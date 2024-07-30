from django.shortcuts import render
from rest_framework import generics
from .models import Restaurant, Food
from .serializers import RestaurantSerializer, FoodSerializer


# Create your views here.
class RestaurantList(generics.ListCreateAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer


class FoodList(generics.ListCreateAPIView):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer
