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
        "customer-dashboard/",
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

]