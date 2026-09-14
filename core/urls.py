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

]