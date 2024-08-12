# urls.py
from django.urls import path
from .views import (
    AddToCartView,
    CartView,
    RemoveCartItemView,
    RestaurantList,
    FoodList,
    FoodDetailView,
    ReviewCreateView,
    SearchView,
    TopFoodsView,
    RegisterView,
    LoginView,
    ProfileView,
    UpdateCartItemView,
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("restaurants/", RestaurantList.as_view(), name="restaurant-list"),
    path("foods/", FoodList.as_view(), name="food-list"),
    path("food/<int:pk>/", FoodDetailView.as_view(), name="food"),
    path("food/<int:pk>/add_review/", ReviewCreateView.as_view(), name="add_review"),
    path("food/top-foods/", TopFoodsView.as_view(), name="add_review"),
    path("food/search/", SearchView.as_view(), name="search"),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/register/", RegisterView.as_view(), name="register"),
    path("api/login/", LoginView.as_view(), name="login"),
    path("api/profile/<str:email>/", ProfileView.as_view(), name="profile"),
    path("api/cart/<str:email>/", CartView.as_view(), name="cart"),
    path("api/cart/add/", AddToCartView.as_view(), name="add_to_cart"),
    path(
        "api/cart/<str:email>/<int:food_id>/",
        UpdateCartItemView.as_view(),
        name="update-cart-item",
    ),
    path(
        "api/cart/remove/<str:email>/<int:food_id>/",
        RemoveCartItemView.as_view(),
        name="remove-cart-item",
    ),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
