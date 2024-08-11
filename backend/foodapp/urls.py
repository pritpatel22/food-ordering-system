# urls.py
from django.urls import path
from .views import (
    RestaurantList,
    FoodList,
    FoodDetailView,
    ReviewCreateView,
    SearchView,
    TopFoodsView,
    Cart,
    RegisterView,
    LoginView,
    ProfileView,
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
    # path("cart/", Cart.as_view(), name="cart"),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/register/", RegisterView.as_view(), name="register"),
    path("api/login/", LoginView.as_view(), name="login"),
    path("api/profile/<str:email>/", ProfileView.as_view(), name="profile"),
    # path("reviews/", ReviewListCreateView.as_view(), name="review-list-create"),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
