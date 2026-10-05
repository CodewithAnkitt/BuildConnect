from django.contrib import messages
from decimal import Decimal, InvalidOperation

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect, render

from .models import (
    User,
    Order,
    VehicleRental,
    MaterialListing,
)


# ============================================================
# HOME
# ============================================================

def home(request):
    return render(request, "home.html")


# ============================================================
# LOGIN
# ============================================================

def login_view(request):

    if request.method == "POST":

        phone_number = request.POST.get("phone_number", "").strip()
        password = request.POST.get("password", "")
        selected_role = request.POST.get("role", "").strip()

        role_mapping = {
            "Customer": User.Role.CUSTOMER,
            "Seller": User.Role.SELLER,
            "Driver": User.Role.DRIVER,
            "Vehicle Owner": User.Role.VEHICLE_OWNER,
            "CUSTOMER": User.Role.CUSTOMER,
            "SELLER": User.Role.SELLER,
            "DRIVER": User.Role.DRIVER,
            "VEHICLE_OWNER": User.Role.VEHICLE_OWNER,
        }

        selected_role = role_mapping.get(
            selected_role,
            selected_role
        )

        try:
            user = User.objects.get(
                phone_number=phone_number
            )
        except User.DoesNotExist:
            user = None

        if user is not None:

            authenticated_user = authenticate(
                request,
                username=user.username,
                password=password
            )

            if authenticated_user is not None:

                if authenticated_user.role != selected_role:
                    messages.error(
                        request,
                        "The selected role does not match your account."
                    )
                    return redirect("login")

                login(request, authenticated_user)

                if authenticated_user.role == User.Role.CUSTOMER:
                    return redirect("customer_dashboard")

                elif authenticated_user.role == User.Role.SELLER:
                    return redirect("seller_dashboard")

                elif authenticated_user.role == User.Role.DRIVER:
                    return redirect("driver_dashboard")

                elif authenticated_user.role == User.Role.VEHICLE_OWNER:
                    return redirect("owner_dashboard")

        messages.error(
            request,
            "Invalid phone number, password, or role."
        )

    return render(request, "login.html")


# ============================================================
# SIGN UP
# ============================================================

def signup_view(request):

    if request.method == "POST":

        first_name = request.POST.get("first_name", "").strip()
        last_name = request.POST.get("last_name", "").strip()
        phone_number = request.POST.get("phone_number", "").strip()
        whatsapp_number = request.POST.get("whatsapp_number", "").strip()
        email = request.POST.get("email", "").strip()
        password = request.POST.get("password", "")
        role = request.POST.get("role", "").strip()

        if not all([
            first_name,
            last_name,
            phone_number,
            whatsapp_number,
            email,
            password,
            role
        ]):
            return JsonResponse({
                "success": False,
                "message": "Please fill all required fields."
            })

        if User.objects.filter(
            phone_number=phone_number
        ).exists():
            return JsonResponse({
                "success": False,
                "message": "An account with this phone number already exists."
            })

        role_mapping = {
            "Customer": User.Role.CUSTOMER,
            "Seller": User.Role.SELLER,
            "Driver": User.Role.DRIVER,
            "Vehicle Owner": User.Role.VEHICLE_OWNER,
        }

        selected_role = role_mapping.get(role)

        if not selected_role:
            return JsonResponse({
                "success": False,
                "message": "Invalid role selected."
            })

        User.objects.create_user(
            username=phone_number,
            password=password,
            first_name=first_name,
            last_name=last_name,
            email=email,
            phone_number=phone_number,
            whatsapp_number=whatsapp_number,
            role=selected_role,
        )

        return JsonResponse({
            "success": True,
            "message": "Your BuildConnect account has been created successfully."
        })

    return JsonResponse({
        "success": False,
        "message": "Invalid request."
    })


# ============================================================
# LOGOUT
# ============================================================

def logout_view(request):
    logout(request)
    return redirect("home")


# ============================================================
# CUSTOMER
# ============================================================

@login_required
def customer_dashboard(request):

    if request.user.role != User.Role.CUSTOMER:
        return redirect("home")

    total_orders = Order.objects.filter(
        customer=request.user
    ).count()

    active_orders = Order.objects.filter(
        customer=request.user,
        status__in=[
            Order.Status.PENDING,
            Order.Status.CONFIRMED
        ]
    ).count()

    vehicle_rentals = VehicleRental.objects.filter(
        customer=request.user
    ).count()

    pending_requests = VehicleRental.objects.filter(
        customer=request.user,
        status=VehicleRental.Status.PENDING
    ).count()

    recent_orders = Order.objects.filter(
        customer=request.user
    ).order_by("-created_at")[:5]

    available_materials = MaterialListing.objects.filter(
        is_available=True
    ).select_related(
        "material",
        "seller"
    ).order_by("-created_at")[:5]

    return render(
        request,
        "customer/dashboard.html",
        {
            "user": request.user,
            "total_orders": total_orders,
            "active_orders": active_orders,
            "vehicle_rentals": vehicle_rentals,
            "pending_requests": pending_requests,
            "recent_orders": recent_orders,
            "available_materials": available_materials,
        }
    )


@login_required
def materials(request):

    if request.user.role != User.Role.CUSTOMER:
        return redirect("home")

    return render(
        request,
        "customer/materials.html",
        {"user": request.user}
    )


@login_required
def orders(request):

    if request.user.role != User.Role.CUSTOMER:
        return redirect("home")

    return render(
        request,
        "customer/orders.html",
        {"user": request.user}
    )


@login_required
def vehicles(request):

    if request.user.role != User.Role.CUSTOMER:
        return redirect("home")

    return render(
        request,
        "customer/vehicles.html",
        {"user": request.user}
    )


@login_required
def rentals(request):

    if request.user.role != User.Role.CUSTOMER:
        return redirect("home")

    return render(
        request,
        "customer/rentals.html",
        {"user": request.user}
    )


@login_required
def profile(request):

    if request.user.role != User.Role.CUSTOMER:
        return redirect("home")

    return render(
        request,
        "customer/profile.html",
        {"user": request.user}
    )


# ============================================================
# DRIVER
# ============================================================

@login_required
def driver_dashboard(request):

    if request.user.role != User.Role.DRIVER:
        return redirect("home")

    return render(
        request,
        "driver/dashboard.html",
        {"user": request.user}
    )


@login_required
def driver_jobs(request):

    if request.user.role != User.Role.DRIVER:
        return redirect("home")

    return render(
        request,
        "driver/jobs.html",
        {"user": request.user}
    )


@login_required
def driver_my_jobs(request):

    if request.user.role != User.Role.DRIVER:
        return redirect("home")

    return render(
        request,
        "driver/my_jobs.html",
        {"user": request.user}
    )


@login_required
def driver_profile(request):

    if request.user.role != User.Role.DRIVER:
        return redirect("home")

    return render(
        request,
        "driver/profile.html",
        {"user": request.user}
    )


@login_required
def driver_earnings(request):

    if request.user.role != User.Role.DRIVER:
        return redirect("home")

    return render(
        request,
        "driver/earnings.html",
        {"user": request.user}
    )


@login_required
def driver_settings(request):

    if request.user.role != User.Role.DRIVER:
        return redirect("home")

    return render(
        request,
        "driver/settings.html",
        {"user": request.user}
    )


# ============================================================
# VEHICLE OWNER
# ============================================================

@login_required
def owner_dashboard(request):

    if request.user.role != User.Role.VEHICLE_OWNER:
        return redirect("home")

    return render(
        request,
        "owner/dashboard.html",
        {"user": request.user}
    )


@login_required
def owner_vehicles(request):

    if request.user.role != User.Role.VEHICLE_OWNER:
        return redirect("home")

    return render(
        request,
        "owner/vehicles.html",
        {"user": request.user}
    )


@login_required
def owner_rental_requests(request):

    if request.user.role != User.Role.VEHICLE_OWNER:
        return redirect("home")

    return render(
        request,
        "owner/rental_requests.html",
        {"user": request.user}
    )


@login_required
def owner_rentals(request):

    if request.user.role != User.Role.VEHICLE_OWNER:
        return redirect("home")

    return render(
        request,
        "owner/rentals.html",
        {"user": request.user}
    )


@login_required
def owner_earnings(request):

    if request.user.role != User.Role.VEHICLE_OWNER:
        return redirect("home")

    return render(
        request,
        "owner/earnings.html",
        {"user": request.user}
    )


@login_required
def owner_profile(request):

    if request.user.role != User.Role.VEHICLE_OWNER:
        return redirect("home")

    return render(
        request,
        "owner/profile.html",
        {"user": request.user}
    )


# ============================================================
# SELLER
# ============================================================

@login_required
def seller_dashboard(request):

    if request.user.role != User.Role.SELLER:
        return redirect("home")

    return render(
        request,
        "seller/dashboard.html",
        {"user": request.user}
    )


@login_required
def seller_materials(request):
    if request.user.role != User.Role.SELLER:
        return redirect("home")

    # =========================
    # UPDATE MATERIAL
    # =========================
    if request.method == "POST":

        listing_id = request.POST.get("listing_id", "").strip()

        listing = get_object_or_404(
            MaterialListing,
            id=listing_id,
            seller=request.user
        )

        price_raw = request.POST.get("price_per_unit", "").strip()
        quantity_raw = request.POST.get("quantity_available", "").strip()
        location = request.POST.get("location", "").strip()
        description = request.POST.get("description", "").strip()

        # Active checkbox
        is_available = request.POST.get("is_available") == "on"

        # Validate price
        try:
            price = Decimal(price_raw)

            if price <= 0:
                return JsonResponse({
                    "success": False,
                    "message": "Price must be greater than 0."
                })

        except (InvalidOperation, ValueError):
            return JsonResponse({
                "success": False,
                "message": "Please enter a valid price."
            })

        # Validate quantity
        try:
            quantity = Decimal(quantity_raw)

            if quantity < 0:
                return JsonResponse({
                    "success": False,
                    "message": "Stock quantity cannot be negative."
                })

        except (InvalidOperation, ValueError):
            return JsonResponse({
                "success": False,
                "message": "Please enter a valid stock quantity."
            })

        # Location is required
        if not location:
            return JsonResponse({
                "success": False,
                "message": "Location is required."
            })

        # =========================
        # SAVE CHANGES
        # =========================
        listing.price_per_unit = price
        listing.quantity_available = quantity
        listing.location = location
        listing.description = description
        listing.is_available = is_available

        listing.save()

        return JsonResponse({
            "success": True,
            "message": f"{listing.material.name} updated successfully."
        })

    # =========================
    # SELLER MATERIALS
    # =========================

    material_listings = MaterialListing.objects.filter(
        seller=request.user
    ).select_related("material").order_by("-updated_at")

    total_materials = material_listings.count()

    active_listings = material_listings.filter(
        is_available=True
    ).count()

    low_stock = material_listings.filter(
        quantity_available__lt=40
    ).count()

    total_stock = sum(
        (
            listing.quantity_available
            for listing in material_listings
        ),
        Decimal("0")
    )

    # =========================
    # STOCK OVERVIEW
    # =========================

    stock_data = []

    stock_colors = {
        "Coal": "#70462B",
        "Sand": "#D39A52",
        "Crushed Stone": "#81766C",
        "Fly Ash": "#A99B8C",
        "Soil": "#5E4935",
    }

    dot_classes = {
        "Coal": "coal-dot",
        "Sand": "sand-dot",
        "Crushed Stone": "stone-dot",
        "Fly Ash": "flyash-dot",
        "Soil": "soil-dot",
    }

    gradient_parts = []
    current_percentage = Decimal("0")

    for listing in material_listings:

        if total_stock > 0:
            percentage = (
                listing.quantity_available / total_stock
            ) * Decimal("100")
        else:
            percentage = Decimal("0")

        stock_data.append({
            "listing": listing,
            "percentage": percentage,
            "dot_class": dot_classes.get(
                listing.material.name,
                "soil-dot"
            ),
        })

        if total_stock > 0:
            next_percentage = current_percentage + percentage

            gradient_parts.append(
                f"{stock_colors.get(listing.material.name, '#81766C')} "
                f"{current_percentage:.2f}% "
                f"{next_percentage:.2f}%"
            )

            current_percentage = next_percentage

    if gradient_parts:
        stock_gradient = ", ".join(gradient_parts)
    else:
        stock_gradient = "#E8DED2 0% 100%"

    return render(
        request,
        "seller/materials.html",
        {
            "user": request.user,
            "material_listings": material_listings,
            "total_materials": total_materials,
            "active_listings": active_listings,
            "low_stock": low_stock,
            "total_stock": total_stock,
            "stock_data": stock_data,
            "stock_gradient": stock_gradient,
        }
    )
@login_required
def seller_add_materials(request):

    if request.user.role != User.Role.SELLER:
        return redirect("home")

    return render(
        request,
        "seller/add_materials.html",
        {"user": request.user}
    )


@login_required
def seller_order(request):

    if request.user.role != User.Role.SELLER:
        return redirect("home")

    return render(
        request,
        "seller/order.html",
        {"user": request.user}
    )


@login_required
def seller_earning(request):

    if request.user.role != User.Role.SELLER:
        return redirect("home")

    return render(
        request,
        "seller/earning.html",
        {"user": request.user}
    )


@login_required
def seller_profile(request):

    if request.user.role != User.Role.SELLER:
        return redirect("home")

    return render(
        request,
        "seller/profile.html",
        {"user": request.user}
    )