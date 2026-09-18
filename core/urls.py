from django.urls import path

from . import views


urlpatterns = [

    path(
        "",
        views.home,
        name="home"
    ),

    path(
        "login/",
        views.login_view,
        name="login"
    ),

    #customer 

    path(
        "customer/dashboard/",
        views.customer_dashboard,
        name="customer_dashboard"
    ),

    path(
        "customer/materials/",
        views.materials,
        name="materials"
    ),

    path(
    "customer/orders/",
    views.orders,
    name="orders"
),

path(
    "customer/vehicles/",
    views.vehicles,
    name="vehicles"
),
path(
        "logout/",
        views.logout_view,
        name="logout"
    ),

path(
    "customer/rentals/",
    views.rentals,
    name="rentals"
),

path(
    "customer/profile/",
    views.profile,
    name="profile"
),

# Driver

path(
    "driver/dashboard/",
    views.driver_dashboard,
    name="driver_dashboard"
),

path(
    "driver/jobs/",
    views.driver_jobs,
    name="driver_jobs"
),

path(
    "driver/my-jobs/",
    views.driver_my_jobs,
    name="driver_my_jobs"
),

path(
    "driver/profile/",
    views.driver_profile,
    name="driver_profile"
),

path(
    "driver/earnings/",
    views.driver_earnings,
    name="driver_earnings"
),

path(
    "driver/settings/",
    views.driver_settings,
    name="driver_settings"
),

#vechile_owner

path(
        "owner/dashboard/",
        views.owner_dashboard,
        name="owner_dashboard"
    ),

    path(
        "owner/vehicles/",
        views.owner_vehicles,
        name="owner_vehicles"
    ),

    path(
        "owner/rental-requests/",
        views.owner_rental_requests,
        name="owner_rental_requests"
    ),

    path(
        "owner/rentals/",
        views.owner_rentals,
        name="owner_rentals"
    ),

    path(
        "owner/earnings/",
        views.owner_earnings,
        name="owner_earnings"
    ),

    path(
        "owner/profile/",
        views.owner_profile,
        name="owner_profile"
    ),

    path(
        "owner/settings/",
        views.owner_settings,
        name="owner_settings"
    ),

]