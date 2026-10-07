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
    path(
    "signup/",
    views.signup_view,
    name="signup"
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
    "customer/order/create/",
    views.create_order,
    name="create_order"
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

    #seller browser

    path(
    "seller/dashboard/",
    views.seller_dashboard,
    name="seller_dashboard"
),

 path(
    "seller/materials/",
    views.seller_materials,
    name="seller_materials"
),
path(
    "seller/add_materials/",
    views.seller_add_materials,
    name="seller_add_materials"
),

path(
    "seller/order/",
    views.seller_order,
    name="seller_order"
),
path(
    "seller/earning/",
    views.seller_earning,
    name="seller_earning"
),

path(
    "seller/profile/",
    views.seller_profile,
    name="seller_profile"
),

]