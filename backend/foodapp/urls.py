# urls.py
from django.urls import path
from .views import RestaurantList, FoodList
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("restaurants/", RestaurantList.as_view(), name="restaurant-list"),
    path("foods/", FoodList.as_view(), name="food-list"),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
