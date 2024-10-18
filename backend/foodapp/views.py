import json
import math
from xml.dom import NotFoundErr
from django.shortcuts import get_list_or_404, get_object_or_404
from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import render
from django.views import View
import requests
from rest_framework import generics, viewsets, status
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .models import (
    Cart,
    CartItem,
    History,
    OrderItem,
    Restaurant,
    Food,
    Review,
    User,
    Orders,
    UserInfo,
)
from .serializers import (
    OrderSerializer,
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
from django.db.models import Count, Avg, OuterRef, Subquery
from django.forms.models import model_to_dict
from django.db.models import Q
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
import matplotlib.pyplot as plt
from io import BytesIO
from django.http import HttpResponse
from geopy.distance import geodesic
import bcrypt


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            info = UserInfo.objects.create(
                user=user,
                mobile=request.data.get("mobile"),
                address=request.data.get("address"),
            )
            info.save()

            return Response(
                {"status": "User created", "data": serializer.data},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        print(email, " ", password)

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
        info = UserInfo.objects.get(user=user)
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

        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        else:
            for field, errors in serializer.errors.items():
                print(f"Field: {field}, Errors: {errors}")

        return Response(serializer.errors, status=400)


class TopFoodsView(View):
    def get(self, request, *args, **kwargs):

        top_foods = Food.objects.annotate(
            average_rating=Avg("reviews__rating")
        ).order_by("-average_rating")

        data = []
        for food in top_foods:
            # Calculate rating count for the current food item
            rating_count = (
                Review.objects.filter(food=food)
                .values("rating")
                .annotate(count=Count("rating"))
                .order_by("rating")
            )

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
                    "rating_summary": rating_summary,
                }
            )

        return JsonResponse(data, safe=False)


class SearchView(View):
    def get(self, request, *args, **kwargs):
        query = request.GET.get("q", "").strip()

        if not query:
            return JsonResponse({"search_type": "none", "foods": [], "restaurants": []})

        foods = Food.objects.filter(
            Q(name__icontains=query) | Q(category__icontains=query)
        ).annotate(average_rating=Avg("reviews__rating"))
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

        response_data = {
            "search_type": (
                "food" if foods_data else "restaurant" if restaurants_data else "none"
            ),
            "foods": foods_data,
            "restaurants": restaurants_data,
        }
        return JsonResponse(response_data)


class AddToCartView(APIView):
    def post(self, request):
        email = request.data.get("email")
        food_id = request.data.get("food_id")
        quantity = int(request.data.get("quantity", 1))
        price = request.data.get("price")
        restaurant_id = request.data.get("restaurant_id")

        user = get_object_or_404(User, email=email)
        food = get_object_or_404(Food, id=food_id)
        restaurant = get_object_or_404(Restaurant, name=restaurant_id)

        cart, created = Cart.objects.get_or_create(user=user)
        cart_item, created = CartItem.objects.get_or_create(
            cart=cart, food=food, restaurant=restaurant
        )

        if not created:
            cart_item.quantity += quantity
        else:
            cart_item.quantity = quantity
            cart_item.price = price

        cart_item.save()

        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class AddFood(APIView):
    def post(self, request):
        totalfood = len(Food.objects.all())
        totalrest = len(Restaurant.objects.all())
        id = totalfood + 1

        # Initialize the data dictionary
        data = {
            "id": id,
            "name": request.data.get("food"),
            "price": request.data.get("price"),
            "description": request.data.get("description"),
            "category": request.data.get("category"),
            "restaurant_info": request.data.get("info"),
            "restaurant": None,
        }

        # Handle restaurant data
        restaurant = Restaurant.objects.filter(name=request.data.get("restaurant"))
        if restaurant.exists():
            data["restaurant"] = restaurant.first().id
        else:
            return Response(
                {"error": "Restaurant not found"}, status=status.HTTP_404_NOT_FOUND
            )

        # Handle the image upload
        image = request.FILES.get("image")
        if image:
            data["image"] = image

        # Serialize the data
        serializer = FoodSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AddRestaurant(APIView):
    def post(self, request):
        data = {}
        data["name"] = request.data.get("restaurant")
        data["address"] = request.data.get("address")
        totalrest = len(Restaurant.objects.all())
        data["id"] = totalrest + 1
        restaurant = Restaurant.objects.filter(name=data["name"])
        if restaurant:
            return Response(
                {"error": "Restaurant already exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        else:
            serializer = RestaurantSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CartView(APIView):
    def get(self, request, email):
        user = get_object_or_404(User, email=email)
        cart, _ = Cart.objects.get_or_create(user=user)

        serializer = CartSerializer(cart)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UpdateCartItemView(APIView):

    def put(self, request, email, food_id):
        user = get_object_or_404(User, email=email)
        cart = get_object_or_404(Cart, user=user)
        cart_item = get_object_or_404(CartItem, cart=cart, food_id=food_id)

        new_quantity = request.data.get("quantity")
        if new_quantity is not None:
            cart_item.quantity = new_quantity
            cart_item.save()

        # Recalculate the total price
        total_price = cart_item.get_total_item_price()

        # Prepare the response with updated quantity and total price
        response_data = {
            "id": cart_item.id,
            "food": {
                "id": cart_item.food.id,
                "name": cart_item.food.name,
                "image": cart_item.food.image.url if cart_item.food.image else None,
            },
            "quantity": cart_item.quantity,
            "price": str(cart_item.price),
            "restaurant": {
                "id": cart_item.restaurant.id,
                "name": cart_item.restaurant.name,
            },
            "total_item_price": str(total_price),
        }

        return Response(response_data, status=status.HTTP_200_OK)


class RemoveCartItemView(APIView):
    def delete(self, request, email, food_id):
        user = get_object_or_404(User, email=email)
        cart = get_object_or_404(Cart, user=user)
        cart_item = get_object_or_404(CartItem, cart=cart, food_id=food_id)

        cart_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class DashbaordView(APIView):
    def get(self, request):
        users = User.objects.all()
        restaurants = Restaurant.objects.all()
        foods = Food.objects.all()
        # i want highest average rated food and its restaurant
        top_foods = Food.objects.annotate(
            average_rating=Avg("reviews__rating")
        ).order_by("-average_rating")[:1]
        revies = Review.objects.all()
        for i in top_foods:
            topfood = i.name
            toprest = i.restaurant.name
        data = {
            "users": len(users),
            "restaurants": len(restaurants),
            "foods": len(foods),
            "topfood": topfood,
            "toprest": toprest,
            "review": len(revies),
        }

        return Response(data, status=status.HTTP_200_OK)


# c51de9694a1e45758658aa4f4bc5d6dd i am making plot on rating
class ReviewAnalytics(APIView):
    def get(self, request):
        # making bar plot for average rating for all food items with lable of food item and its restaurant name
        food = Food.objects.annotate(average_rating=Avg("reviews__rating")).order_by(
            "-average_rating"
        )
        labels = []
        data = []
        # i will create labels dict with key as food name and value restaurant name
        for i in food:
            average_rating = i.average_rating if i.average_rating is not None else 0
            labels.append(f"{i.name} ({i.restaurant.name})")
            data.append(average_rating)

        plt.bar(labels, data)
        plt.xlabel("Food Item")
        plt.ylabel("Average Rating")
        plt.title("Average Rating of Food Items")
        plt.xticks(rotation=40)
        plt.tight_layout()
        plt.legend()
        buffer = BytesIO()
        plt.savefig(buffer, format="png")
        buffer.seek(0)
        return HttpResponse(buffer.getvalue(), content_type="image/png")


class MakeOrder(APIView):
    def post(self, request):
        email = request.data.get("email")
        user = User.objects.get(email=email)
        if user:
            cart = Cart.objects.filter(user=user).first()
            order = Orders.objects.create(user=user, cart=cart)
            total = 0
            for item in cart.items.all():
                order_item = OrderItem.objects.create(
                    order=order,
                    food=item.food,
                    quantity=item.quantity,
                    price=item.food.price * item.quantity,
                )
                total += order_item.price
            order.total_price = total
            order.save()
            cart.items.all().delete()
            order_serializer = OrderSerializer(order)
            return Response(order_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(
                {"error": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )


def get_coordinates(place_name):
    api_key = "6ed4c727cf0741efbf42881f8e7df7a0"
    url = f"https://api.opencagedata.com/geocode/v1/json"
    params = {"q": place_name, "key": api_key, "limit": 1}
    response = requests.get(url, params=params)
    data = response.json()

    if data["status"]["code"] == 200 and data["results"]:
        latitude = data["results"][0]["geometry"]["lat"]
        longitude = data["results"][0]["geometry"]["lng"]
        return latitude, longitude
    else:
        return None, None


def haversine(coords1, coords2, speeed=50):
    distance_km = geodesic(coords1, coords2).kilometers

    duration_hours = distance_km / speeed
    duration_minutes = duration_hours * 60

    return distance_km, duration_minutes


class Getdistance(APIView):

    def post(self, request):
        data = json.loads(request.body)
        user_address = data.get("user")
        restaurant_address = data.get("restaurant")
        lat1, lon1 = get_coordinates(user_address)

        distances = []
        for rest_add in restaurant_address:
            if rest_add:
                lat2, lon2 = get_coordinates(rest_add)
                distance, duration = haversine((lat1, lon1), (lat2, lon2))
                distances.append(
                    {
                        "restaurant_address": rest_add,
                        "distance": distance,
                        "duration": duration,
                    }
                )

        return JsonResponse({"distance_km": distances})

        # return JsonResponse({"error": "Could not calculate distance"}, status=400)


class FilterView(APIView):
    def post(self, request):
        data = json.loads(request.body)
        query = Food.objects.all()
        review = Review.food

        if data.get("sortBy"):
            query = query.order_by("-price")

        if data.get("ratings"):
            query = Food.objects.annotate(
                average_rating=Avg("reviews__rating")
            ).order_by("-average_rating")
        if data.get("category"):
            query = query.filter(category=data.get("category"))
        if data.get("priceRange1"):
            query = query.filter(price__gt=100, price__lte=300)
        if data.get("priceRange2"):
            query = query.filter(price__lte=100)
        if data.get("mostPurchased"):
            food_counts = (
                CartItem.objects.values("food")
                .annotate(total_count=Count("food"))
                .order_by("-total_count")
            )

            food_ids = [item["food"] for item in food_counts]
            query = query.filter(id__in=food_ids)

        serializer = FoodSerializer(query, many=True)
        return Response(serializer.data)


class DeleteCart(generics.RetrieveDestroyAPIView):
    def delete(self, request, email):
        try:
            cart = Cart.objects.get(user__email=email)
            cart_items = cart.items.all()
            for item in cart_items:
                History.objects.create(
                    user=cart.user,
                    item=item.food,
                    quantity=item.quantity,
                    price=item.price,
                    restaurant=item.restaurant,
                )

            cart.delete()
            return Response({"message": "Cart deleted"}, status=200)
        except Cart.DoesNotExist:
            return Response({"message": "Cart does not exist"}, status=404)


class OrderHistoryView(generics.ListAPIView):
    def get(self, request, email):
        try:
            user = User.objects.get(email=email)
            history_items = History.objects.filter(user=user).order_by("-order_date")

            history_data = [
                {
                    "item_name": item.item.name,
                    "restaurant_name": item.restaurant.name,
                    "order_date": item.order_date,
                    "price": item.price,
                    "quantity": item.quantity,
                }
                for item in history_items
            ]

            return Response(history_data, status=200)
        except User.DoesNotExist:
            return Response({"message": "User not found"}, status=404)


class GetRestaurantsView(APIView):
    def get(self, request):
        restaurants = Restaurant.objects.all()
        serializer = []
        for restaurant in restaurants:
            serializer.append(restaurant.name)

        return Response(serializer, status=200)


class UserUpdateView(APIView):
    def put(self, request, id):
        try:
            user = User.objects.get(id=id)
            user.username = request.data["username"]
            user.email = request.data["email"]
            info = UserInfo.objects.get(user=user)
            info.mobile = request.data["mobile"]
            info.address = request.data["address"]
            user.save()
            info.save()
            user = UserSerializer(user)
            return Response(user.data, status=200)
        except User.DoesNotExist:
            return Response({"message": "User not found"}, status=404)
