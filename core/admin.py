from django.contrib import admin
from .models import (
    User,
    DriverProfile,
    Material,
    MaterialListing,
    Order,
    OrderItem,
    Vehicle,
    VehicleRental,
    DriverJob,
    DriverApplication,
)


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        "username",
        "first_name",
        "last_name",
        "phone_number",
        "role",
    )
    list_filter = ("role",)
    search_fields = (
        "username",
        "first_name",
        "last_name",
        "phone_number",
    )


@admin.register(DriverProfile)
class DriverProfileAdmin(admin.ModelAdmin):
    list_display = (
        "driver",
        "licence_number",
        "verification_status",
        "uploaded_at",
        "verified_at",
    )
    list_filter = ("verification_status",)
    search_fields = (
        "driver__username",
        "driver__phone_number",
        "licence_number",
    )

    readonly_fields = (
        "uploaded_at",
    )


@admin.register(Material)
class MaterialAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "unit",
        "is_active",
        "created_at",
    )
    list_filter = ("unit", "is_active")
    search_fields = ("name",)


@admin.register(MaterialListing)
class MaterialListingAdmin(admin.ModelAdmin):
    list_display = (
        "material",
        "seller",
        "quantity_available",
        "unit_price",
        "location",
        "is_available",
        "created_at",
    )
    list_filter = ("is_available", "material")
    search_fields = (
        "material__name",
        "seller__username",
        "location",
    )


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "customer",
        "status",
        "total_amount",
        "created_at",
    )
    list_filter = ("status",)
    search_fields = (
        "customer__username",
        "customer__phone_number",
    )


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = (
        "order",
        "listing",
        "quantity",
        "unit_price",
        "subtotal",
    )


@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = (
        "registration_number",
        "vehicle_type",
        "owner",
        "model_name",
        "rental_price_per_day",
        "location",
        "is_available",
    )
    list_filter = ("vehicle_type", "is_available")
    search_fields = (
        "registration_number",
        "model_name",
        "owner__username",
    )


@admin.register(VehicleRental)
class VehicleRentalAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "customer",
        "vehicle",
        "start_date",
        "end_date",
        "total_amount",
        "status",
    )
    list_filter = ("status",)
    search_fields = (
        "customer__username",
        "vehicle__registration_number",
    )


@admin.register(DriverJob)
class DriverJobAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "posted_by",
        "location",
        "salary",
        "status",
        "created_at",
    )
    list_filter = ("status",)
    search_fields = (
        "title",
        "location",
        "posted_by__username",
    )


@admin.register(DriverApplication)
class DriverApplicationAdmin(admin.ModelAdmin):
    list_display = (
        "job",
        "driver",
        "status",
        "applied_at",
    )
    list_filter = ("status",)
    search_fields = (
        "job__title",
        "driver__username",
        "driver__phone_number",
    )