# urls.py
from django.urls import path
from .views import RestaurantList, FoodList, FoodDetailView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("restaurants/", RestaurantList.as_view(), name="restaurant-list"),
    path("foods/", FoodList.as_view(), name="food-list"),
    path("food/<int:pk>/", FoodDetailView.as_view(), name="food"),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
