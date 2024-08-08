from xml.dom import NotFoundErr
from distributed import Status
from django.shortcuts import render
from rest_framework import generics
from .models import Restaurant, Food, Review, User
from .serializers import RestaurantSerializer, FoodSerializer, ReviewSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, action
from rest_framework.permissions import AllowAny
from django.db.models import Count


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
        # Get the specific food item using the primary key (pk)
        food_item = self.get_object()
        food_serializer = self.get_serializer(food_item)

        rating_count = (
            Review.objects.filter(food=food_item)
            .values("rating")
            .annotate(count=Count("rating"))
            .order_by("rating")
        )
        rating_summary = {rating["rating"]: rating["count"] for rating in rating_count}
        reviews = Review.objects.filter(food=food_item).values("comment")
        # Fetch the associated reviews for this food item

        # Combine food details and reviews
        response_data = food_serializer.data
        response_data["rating_summary"] = rating_summary
        response_data["comments"] = list(reviews)

        return Response(response_data)


class ReviewCreateView(generics.CreateAPIView):
    serializer_class = ReviewSerializer

    def post(self, request, *args, **kwargs):
        food_id = kwargs.get("pk")
        try:
            food = Food.objects.get(id=food_id)
        except Food.DoesNotExist:
            raise NotFoundErr("Food item not found.")

        data = request.data.copy()
        restaurant_id = food.restaurant.id
        data["food"] = food.id
        # data["rating"] = int(data["rating"])
        data["restaurant"] = restaurant_id
        print(data)
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        else:
            for field, errors in serializer.errors.items():
                print(f"Field: {field}, Errors: {errors}")
        print("Serializer errors:", serializer.errors)
        return Response(serializer.errors, status=400)
