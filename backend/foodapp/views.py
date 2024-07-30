from distributed import Status
from django.shortcuts import render
from rest_framework import generics
from .models import Restaurant, Food
from .serializers import RestaurantSerializer, FoodSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view


# Create your views here.
class RestaurantList(generics.ListCreateAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer


class FoodList(generics.ListCreateAPIView):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer


class FoodDetailView(generics.RetrieveAPIView):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer

    def get(self, request, *args, **kwargs):
        try:
            return super().get(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {"error": str(e)}, status=Status.HTTP_500_INTERNAL_SERVER_ERROR
            )
