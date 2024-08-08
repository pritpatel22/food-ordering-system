# urls.py
from django.urls import path
from .views import RestaurantList, FoodList, FoodDetailView, ReviewCreateView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("restaurants/", RestaurantList.as_view(), name="restaurant-list"),
    path("foods/", FoodList.as_view(), name="food-list"),
    path("food/<int:pk>/", FoodDetailView.as_view(), name="food"),
    path("food/<int:pk>/add_review/", ReviewCreateView.as_view(), name="add_review"),
    # path("reviews/", ReviewListCreateView.as_view(), name="review-list-create"),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
