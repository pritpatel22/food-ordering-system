from xml.dom import NotFoundErr
from django.shortcuts import get_list_or_404
from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import render
from django.views import View
from rest_framework import generics, viewsets, status
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Cart, CartItem, Restaurant, Food, Review, User
from .serializers import (
    RegisterSerializer,
    RestaurantSerializer,
    FoodSerializer,
    ReviewSerializer,
    CartItemSerializer,
    CartSerializer,
    UserSerializer,
    LoginSerializer,
)
from rest_framework.response import Response
from rest_framework.decorators import api_view, action
from rest_framework.permissions import AllowAny
from django.db.models import Count, Avg
from django.db.models import Q
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate, login


# Create your views here.


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"status": "User created"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response(
                {"error": "Email and password required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(email=email)
            if user.check_password(password):
                refresh = RefreshToken.for_user(user)
                return Response(
                    {
                        "refresh": str(refresh),
                        "access": str(refresh.access_token),
                    },
                    status=status.HTTP_200_OK,
                )
        except UserModel.DoesNotExist:
            pass

        return Response(
            {"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
        )


class ProfileView(APIView):
    def get(self, request, email, format=None):
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"error": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = UserSerializer(user)
        return Response(serializer.data)


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


class TopFoodsView(View):
    def get(self, request, *args, **kwargs):
        # Annotate each food with its average rating
        top_foods = Food.objects.annotate(
            average_rating=Avg("reviews__rating")
        ).order_by("-average_rating")[:4]

        # Prepare the data to be returned as JSON
        data = []
        for food in top_foods:
            # Calculate rating count for the current food item
            rating_count = (
                Review.objects.filter(food=food)
                .values("rating")
                .annotate(count=Count("rating"))
                .order_by("rating")
            )
            # Prepare a dictionary for the rating summary
            rating_summary = {
                rating["rating"]: rating["count"] for rating in rating_count
            }

            data.append(
                {
                    "id": food.id,
                    "name": food.name,
                    "description": food.description,
                    "price": food.price,
                    "image": food.image.url if food.image else None,
                    "average_rating": food.average_rating,
                    "restaurant": food.restaurant.name,
                    "rating_summary": rating_summary,  # Include rating summary
                }
            )

        return JsonResponse(data, safe=False)


class SearchView(View):
    def get(self, request, *args, **kwargs):
        query = request.GET.get("q", "").strip()
        print(query)
        foods = Food.objects.filter(
            Q(name__icontains=query) | Q(category__icontains=query)
        ).annotate(average_rating=Avg("reviews__rating"))
        print(foods)

        restaurants = (
            Restaurant.objects.filter(
                Q(name__icontains=query) | Q(address__icontains=query)
            )
            .annotate(food_count=Count("foods"))
            .prefetch_related("foods")
        )
        foods_data = []
        for food in foods:
            food_data = {
                "id": food.id,
                "name": food.name,
                "price": food.price,
                "category": food.category,
                "image": f"{settings.MEDIA_URL}{food.image}",
                "average_rating": food.average_rating,
                "restaurant_name": food.restaurant.name,
                "restaurant_address": food.restaurant.address,
            }
            foods_data.append(food_data)

        restaurants_data = []
        for restaurant in restaurants:
            food_items = list(
                restaurant.foods.values("id", "name", "price", "category", "image")
            )
            restaurant_data = {
                "id": restaurant.id,
                "name": restaurant.name,
                "address": restaurant.address,
                "food_count": restaurant.food_count,
                "food_items": food_items,
            }
            restaurants_data.append(restaurant_data)
        print(foods_data)
        response_data = {
            "search_type": (
                "food" if foods_data else "restaurant" if restaurants_data else "none"
            ),
            "foods": foods_data,
            "restaurants": restaurants_data,
        }
        return JsonResponse(response_data)


class Cart(viewsets.ViewSet):
    def get_cart(self, request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    @action(detail=False, methods=["post"])
    def add_item(self, request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        food_id = request.data.get("food_id")
        quantity = request.data.get("quantity", 1)

        cart_item, created = CartItem.objects.get_or_create(
            cart=cart, food_id=food_id, defaults={"quantity": quantity}
        )

        if not created:
            cart_item.quantity += quantity
            cart_item.save()

        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=["post"])
    def remove_item(self, request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        food_id = request.data.get("food_id")

        CartItem.objects.filter(cart=cart, food_id=food_id).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=["post"])
    def update_item(self, request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        food_id = request.data.get("food_id")
        quantity = request.data.get("quantity")

        cart_item = CartItem.objects.get(cart=cart, food_id=food_id)
        cart_item.quantity = quantity
        cart_item.save()

        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data)
