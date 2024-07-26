from django.contrib import admin

# Register your models here.
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

# from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
from .forms import CustomUserChangeForm, CustomUserCreationForm
from .models import User


class UserAdmin(BaseUserAdmin):
    ordering = ["email"]
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    list_display = ["email", "username", "is_staff", "is_active", "is_superuser"]
    list_display_links = ["email"]
    list_filter = ["is_staff", "is_active", "is_superuser"]
    search_fields = ["email", "username"]
    # Define the fieldsets
    fieldsets = (
        (_("Login Credentials"), {"fields": ("email", "password")}),
        (_("Personal info"), {"fields": ("username",)}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "user_permissions",
                    "groups",
                )
            },
        ),
        ("Important dates", {"fields": ("last_login",)}),
    )

    # Define the add_fieldsets
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "username", "password1", "password2"),
            },
        ),
    )


admin.site.register(User, UserAdmin)