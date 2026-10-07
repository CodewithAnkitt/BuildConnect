from datetime import date

from django.contrib import messages
from decimal import Decimal, InvalidOperation
from django.db import transaction
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.utils import timezone

from django.templatetags.static import static

from .models import (
    User,
    Order,
    OrderItem,
    Vehicle,
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

                remember_me = (
                    request.POST.get("remember_me") == "on"
                )

                login(
                    request,
                    authenticated_user
                )

                if remember_me:

                    request.session.set_expiry(
                        60 * 60 * 24 * 30
                    )

                else:

                    request.session.set_expiry(0)

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

        first_name = request.POST.get(
            "first_name",
            ""
        ).strip()

        last_name = request.POST.get(
            "last_name",
            ""
        ).strip()

        phone_number = request.POST.get(
            "phone_number",
            ""
        ).strip()

        whatsapp_number = request.POST.get(
            "whatsapp_number",
            ""
        ).strip()

        email = request.POST.get(
            "email",
            ""
        ).strip()

        password = request.POST.get(
            "password",
            ""
        )

        role = request.POST.get(
            "role",
            ""
        ).strip()

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
                "message": (
                    "An account with this phone number "
                    "already exists."
                )
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
            "message": (
                "Your BuildConnect account has been "
                "created successfully."
            )
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

    listings = MaterialListing.objects.filter(
        is_available=True,
        quantity_available__gt=0
    ).select_related(
        "material",
        "seller"
    ).order_by("-created_at")

    image_map = {
        "coal": "/static/images/coal.png",
        "sand": "/static/images/sand.png",
        "crushed stone": "/static/images/crushed-stone.png",
        "fly ash": "/static/images/fly-ash.png",
        "soil": "/static/images/soil.png",
    }

    materials_data = []

    for listing in listings:

        material_name = listing.material.name.strip()

        supplier_name = (
            listing.seller.get_full_name().strip()
            or listing.seller.username
        )

        materials_data.append({
            "listing": listing,
            "name": material_name,
            "slug": material_name.lower().replace(" ", "-"),
            "image": image_map.get(
                material_name.lower(),
                "/static/images/logo.png"
            ),
            "supplier": supplier_name,
            "description": listing.description or (
                f"Quality {material_name.lower()} "
                "from trusted suppliers."
            ),
            "unit": listing.material.get_unit_display(),
            "quantity": listing.quantity_available,
            "price": listing.price_per_unit,
            "location": listing.location,
        })

    locations = sorted(
        set(
            listing.location
            for listing in listings
            if listing.location
        )
    )

    return render(
        request,
        "customer/materials.html",
        {
            "user": request.user,
            "materials_data": materials_data,
            "locations": locations,
        }
    )


@login_required
def orders(request):

    if request.user.role != User.Role.CUSTOMER:
        return redirect("home")

    customer_orders = (
        Order.objects
        .filter(customer=request.user)
        .prefetch_related(
            "items__listing__material",
            "items__listing__seller"
        )
        .order_by("-created_at")
    )

    total_orders = customer_orders.count()

    pending_orders = customer_orders.filter(
        status=Order.Status.PENDING
    ).count()

    confirmed_orders = customer_orders.filter(
        status=Order.Status.CONFIRMED
    ).count()

    delivered_orders = customer_orders.filter(
        status=Order.Status.DELIVERED
    ).count()

    cancelled_orders = customer_orders.filter(
        status=Order.Status.CANCELLED
    ).count()

    return render(
        request,
        "customer/orders.html",
        {
            "user": request.user,
            "orders": customer_orders,
            "total_orders": total_orders,
            "pending_orders": pending_orders,
            "confirmed_orders": confirmed_orders,
            "delivered_orders": delivered_orders,
            "cancelled_orders": cancelled_orders,
        }
    )


@login_required
def create_order(request):

    if request.user.role != User.Role.CUSTOMER:

        return JsonResponse({
            "success": False,
            "message": "Only customers can place orders."
        }, status=403)

    if request.method != "POST":

        return JsonResponse({
            "success": False,
            "message": "Invalid request method."
        }, status=400)

    listing_id = request.POST.get(
        "listing_id",
        ""
    ).strip()

    quantity_value = request.POST.get(
        "quantity",
        ""
    ).strip()

    delivery_address = request.POST.get(
        "delivery_address",
        ""
    ).strip()

    if not listing_id:

        return JsonResponse({
            "success": False,
            "message": "Material listing was not found."
        }, status=400)

    if not quantity_value:

        return JsonResponse({
            "success": False,
            "message": "Please provide a quantity."
        }, status=400)

    if not delivery_address:

        return JsonResponse({
            "success": False,
            "message": "Please provide a delivery address."
        }, status=400)

    # ---------------------------------------------------------
    # Convert quantity to Decimal
    # ---------------------------------------------------------

    try:

        quantity = Decimal(quantity_value)

    except InvalidOperation:

        return JsonResponse({
            "success": False,
            "message": "Please enter a valid quantity."
        }, status=400)

    if quantity <= 0:

        return JsonResponse({
            "success": False,
            "message": "Quantity must be greater than zero."
        }, status=400)

    # ---------------------------------------------------------
    # Database transaction
    # ---------------------------------------------------------

    with transaction.atomic():

        try:

            listing = (
                MaterialListing.objects
                .select_for_update()
                .select_related(
                    "material",
                    "seller"
                )
                .get(
                    id=listing_id,
                    is_available=True
                )
            )

        except MaterialListing.DoesNotExist:

            return JsonResponse({
                "success": False,
                "message": "This material is no longer available."
            }, status=404)

        # -----------------------------------------------------
        # Check available stock
        # -----------------------------------------------------

        if quantity > listing.quantity_available:

            return JsonResponse({
                "success": False,
                "message": (
                    f"Only {listing.quantity_available} "
                    f"{listing.material.get_unit_display()} "
                    "is available."
                )
            }, status=400)

        # -----------------------------------------------------
        # Calculate order amount
        # -----------------------------------------------------

        unit_price = listing.price_per_unit

        subtotal = unit_price * quantity

        # -----------------------------------------------------
        # Create Order
        # -----------------------------------------------------

        order = Order.objects.create(
            customer=request.user,
            status=Order.Status.PENDING,
            total_amount=subtotal,
            delivery_address=delivery_address
        )

        # -----------------------------------------------------
        # Create Order Item
        # -----------------------------------------------------

        OrderItem.objects.create(
            order=order,
            listing=listing,
            quantity=quantity,
            unit_price=unit_price,
            subtotal=subtotal
        )

        # -----------------------------------------------------
        # Reduce seller stock
        # -----------------------------------------------------

        listing.quantity_available -= quantity

        if listing.quantity_available <= 0:

            listing.quantity_available = Decimal("0")

            listing.is_available = False

        listing.save(
            update_fields=[
                "quantity_available",
                "is_available",
                "updated_at"
            ]
        )

    # ---------------------------------------------------------
    # Success response
    # ---------------------------------------------------------

    return JsonResponse({
        "success": True,
        "message": "Your order has been placed successfully.",
        "order_id": order.id,
        "total_amount": str(order.total_amount)
    })


@login_required
def cancel_order(request, order_id):

    if request.user.role != User.Role.CUSTOMER:

        return JsonResponse({
            "success": False,
            "message": "You are not allowed to cancel this order."
        }, status=403)

    if request.method != "POST":

        return JsonResponse({
            "success": False,
            "message": "Invalid request method."
        }, status=405)

    try:

        with transaction.atomic():

            # -------------------------------------------------
            # Lock the order while cancelling it
            # -------------------------------------------------

            order = (
                Order.objects
                .select_for_update()
                .prefetch_related("items__listing")
                .get(
                    id=order_id,
                    customer=request.user
                )
            )

            # -------------------------------------------------
            # Only pending orders can be cancelled
            # -------------------------------------------------

            if order.status != Order.Status.PENDING:

                return JsonResponse({
                    "success": False,
                    "message": "Only pending orders can be cancelled."
                })

            # -------------------------------------------------
            # Restore stock for every item
            # -------------------------------------------------

            for item in order.items.all():

                listing = (
                    MaterialListing.objects
                    .select_for_update()
                    .get(id=item.listing_id)
                )

                listing.quantity_available += item.quantity

                # Material is available again if stock exists
                listing.is_available = (
                    listing.quantity_available > 0
                )

                listing.save(
                    update_fields=[
                        "quantity_available",
                        "is_available",
                        "updated_at"
                    ]
                )

            # -------------------------------------------------
            # Finally cancel the order
            # -------------------------------------------------

            order.status = Order.Status.CANCELLED

            order.save(
                update_fields=[
                    "status",
                    "updated_at"
                ]
            )

        return JsonResponse({
            "success": True,
            "message": (
                f"Order #{order.id} has been "
                "cancelled successfully."
            ),
            "order_id": order.id
        })

    except Order.DoesNotExist:

        return JsonResponse({
            "success": False,
            "message": "Order not found."
        }, status=404)

    except Exception:

        return JsonResponse({
            "success": False,
            "message": (
                "Something went wrong while "
                "cancelling the order."
            )
        }, status=500)


@login_required
def vehicles(request):

    if request.user.role != User.Role.CUSTOMER:
        return redirect("home")

    vehicles_queryset = (
        Vehicle.objects
        .filter(is_available=True)
        .select_related("owner")
        .order_by("-created_at")
    )

    image_map = {
        "EXCAVATOR": "customer/vehicle_images/excavator.png",
        "LOADER": "customer/vehicle_images/loader.png",
        "DUMPER": "customer/vehicle_images/dumper.png",
        "CRANE": "customer/vehicle_images/crane.png",
        "BACKHOE": "customer/vehicle_images/backhoe.png",
        "ROLLER": "customer/vehicle_images/roller.png",
        "TRACTOR": "customer/vehicle_images/tractor.png",
        "TIPPER": "customer/vehicle_images/tipper.png",
        "JCB": "customer/vehicle_images/loader.png",
        "TRUCK": "customer/vehicle_images/tipper.png",
        "OTHER": "customer/vehicle_images/other.png",
    }

    vehicle_cards = []

    for vehicle in vehicles_queryset:

        if vehicle.vehicle_image:
            image_url = vehicle.vehicle_image.url
        else:
            image_url = static(
                image_map.get(
                    vehicle.vehicle_type,
                    "customer/images/other.png"
                )
            )

        vehicle_cards.append({
            "vehicle": vehicle,
            "image_url": image_url,
        })

    return render(
        request,
        "customer/vehicles.html",
        {
            "user": request.user,
            "vehicle_cards": vehicle_cards,
            "vehicle_count": len(vehicle_cards),
            "today": timezone.localdate(),
        }
    )
@login_required
def create_vehicle_rental(request):

    if request.user.role != User.Role.CUSTOMER:
        return JsonResponse({
            "success": False,
            "message": "You are not allowed to rent vehicles."
        }, status=403)

    if request.method != "POST":
        return JsonResponse({
            "success": False,
            "message": "Invalid request method."
        }, status=405)

    vehicle_id = request.POST.get("vehicle_id")
    start_date_text = request.POST.get("start_date")
    end_date_text = request.POST.get("end_date")

    if not vehicle_id or not start_date_text or not end_date_text:
        return JsonResponse({
            "success": False,
            "message": "Please select the vehicle and rental dates."
        })

    try:
        start_date = date.fromisoformat(start_date_text)
        end_date = date.fromisoformat(end_date_text)
    except ValueError:
        return JsonResponse({
            "success": False,
            "message": "Please enter valid rental dates."
        })

    today = timezone.localdate()

    if start_date < today:
        return JsonResponse({
            "success": False,
            "message": "Rental cannot start in the past."
        })

    if end_date < start_date:
        return JsonResponse({
            "success": False,
            "message": "End date must be after or equal to start date."
        })

    try:

        with transaction.atomic():

            vehicle = (
                Vehicle.objects
                .select_for_update()
                .get(
                    id=vehicle_id,
                    is_available=True
                )
            )

            overlapping_rental = (
                VehicleRental.objects
                .filter(
                    vehicle=vehicle,
                    status__in=[
                        VehicleRental.Status.PENDING,
                        VehicleRental.Status.CONFIRMED,
                    ],
                    start_date__lte=end_date,
                    end_date__gte=start_date,
                )
                .exists()
            )

            if overlapping_rental:
                return JsonResponse({
                    "success": False,
                    "message": (
                        "This vehicle is already booked "
                        "for the selected dates."
                    )
                })

            rental_days = (
                end_date - start_date
            ).days + 1

            total_amount = (
                vehicle.rental_price_per_day *
                Decimal(rental_days)
            )

            rental = VehicleRental.objects.create(
                customer=request.user,
                vehicle=vehicle,
                start_date=start_date,
                end_date=end_date,
                total_amount=total_amount,
                status=VehicleRental.Status.PENDING,
            )

        return JsonResponse({
            "success": True,
            "message": "Vehicle rental request submitted successfully.",
            "rental_id": rental.id,
            "total_amount": str(total_amount),
            "rental_days": rental_days,
        })

    except Vehicle.DoesNotExist:

        return JsonResponse({
            "success": False,
            "message": "Vehicle is no longer available."
        }, status=404)

    except Exception:

        return JsonResponse({
            "success": False,
            "message": (
                "Something went wrong while creating "
                "the rental request."
            )
        }, status=500)


@login_required
def rentals(request):

    if request.user.role != User.Role.CUSTOMER:
        return redirect("home")

    customer_rentals = (
        VehicleRental.objects
        .filter(customer=request.user)
        .select_related(
            "vehicle",
            "vehicle__owner"
        )
        .order_by("-created_at")
    )

    total_rentals = customer_rentals.count()

    pending_rentals = customer_rentals.filter(
        status=VehicleRental.Status.PENDING
    ).count()

    confirmed_rentals = customer_rentals.filter(
        status=VehicleRental.Status.CONFIRMED
    ).count()

    completed_rentals = customer_rentals.filter(
        status=VehicleRental.Status.COMPLETED
    ).count()

    return render(
        request,
        "customer/rentals.html",
        {
            "user": request.user,
            "rentals": customer_rentals,
            "total_rentals": total_rentals,
            "pending_rentals": pending_rentals,
            "confirmed_rentals": confirmed_rentals,
            "completed_rentals": completed_rentals,
        }
    )

@login_required
def profile(request):

    if request.user.role != User.Role.CUSTOMER:
        return redirect("home")

    return render(
        request,
        "customer/profile.html",
        {
            "user": request.user
        }
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
        {
            "user": request.user
        }
    )


@login_required
def driver_jobs(request):

    if request.user.role != User.Role.DRIVER:
        return redirect("home")

    return render(
        request,
        "driver/jobs.html",
        {
            "user": request.user
        }
    )


@login_required
def driver_my_jobs(request):

    if request.user.role != User.Role.DRIVER:
        return redirect("home")

    return render(
        request,
        "driver/my_jobs.html",
        {
            "user": request.user
        }
    )


@login_required
def driver_profile(request):

    if request.user.role != User.Role.DRIVER:
        return redirect("home")

    return render(
        request,
        "driver/profile.html",
        {
            "user": request.user
        }
    )


@login_required
def driver_earnings(request):

    if request.user.role != User.Role.DRIVER:
        return redirect("home")

    return render(
        request,
        "driver/earnings.html",
        {
            "user": request.user
        }
    )


@login_required
def driver_settings(request):

    if request.user.role != User.Role.DRIVER:
        return redirect("home")

    return render(
        request,
        "driver/settings.html",
        {
            "user": request.user
        }
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
        {
            "user": request.user
        }
    )


@login_required
def owner_vehicles(request):

    if request.user.role != User.Role.VEHICLE_OWNER:
        return redirect("home")

    return render(
        request,
        "owner/vehicles.html",
        {
            "user": request.user
        }
    )


@login_required
def owner_rental_requests(request):

    if request.user.role != User.Role.VEHICLE_OWNER:
        return redirect("home")

    return render(
        request,
        "owner/rental_requests.html",
        {
            "user": request.user
        }
    )


@login_required
def owner_rentals(request):

    if request.user.role != User.Role.VEHICLE_OWNER:
        return redirect("home")

    return render(
        request,
        "owner/rentals.html",
        {
            "user": request.user
        }
    )


@login_required
def owner_earnings(request):

    if request.user.role != User.Role.VEHICLE_OWNER:
        return redirect("home")

    return render(
        request,
        "owner/earnings.html",
        {
            "user": request.user
        }
    )


@login_required
def owner_profile(request):

    if request.user.role != User.Role.VEHICLE_OWNER:
        return redirect("home")

    return render(
        request,
        "owner/profile.html",
        {
            "user": request.user
        }
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
        {
            "user": request.user
        }
    )


@login_required
def seller_materials(request):

    if request.user.role != User.Role.SELLER:
        return redirect("home")

    # ========================================================
    # UPDATE MATERIAL
    # ========================================================

    if request.method == "POST":

        listing_id = request.POST.get(
            "listing_id",
            ""
        ).strip()

        listing = get_object_or_404(
            MaterialListing,
            id=listing_id,
            seller=request.user
        )

        price_raw = request.POST.get(
            "price_per_unit",
            ""
        ).strip()

        quantity_raw = request.POST.get(
            "quantity_available",
            ""
        ).strip()

        location = request.POST.get(
            "location",
            ""
        ).strip()

        description = request.POST.get(
            "description",
            ""
        ).strip()

        # Active checkbox
        is_available = (
            request.POST.get("is_available") == "on"
        )

        # ====================================================
        # Validate price
        # ====================================================

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

        # ====================================================
        # Validate quantity
        # ====================================================

        try:

            quantity = Decimal(quantity_raw)

            if quantity < 0:

                return JsonResponse({
                    "success": False,
                    "message": (
                        "Stock quantity cannot be negative."
                    )
                })

        except (InvalidOperation, ValueError):

            return JsonResponse({
                "success": False,
                "message": (
                    "Please enter a valid stock quantity."
                )
            })

        # ====================================================
        # Location is required
        # ====================================================

        if not location:

            return JsonResponse({
                "success": False,
                "message": "Location is required."
            })

        # ====================================================
        # SAVE CHANGES
        # ====================================================

        listing.price_per_unit = price

        listing.quantity_available = quantity

        listing.location = location

        listing.description = description

        listing.is_available = is_available

        listing.save()

        return JsonResponse({
            "success": True,
            "message": (
                f"{listing.material.name} "
                "updated successfully."
            )
        })

    # ========================================================
    # SELLER MATERIALS
    # ========================================================

    material_listings = (
        MaterialListing.objects
        .filter(
            seller=request.user
        )
        .select_related(
            "material"
        )
        .order_by(
            "-updated_at"
        )
    )

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

    # ========================================================
    # STOCK OVERVIEW
    # ========================================================

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
                listing.quantity_available
                / total_stock
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

            next_percentage = (
                current_percentage
                + percentage
            )

            gradient_parts.append(
                f"{stock_colors.get(listing.material.name, '#81766C')} "
                f"{current_percentage:.2f}% "
                f"{next_percentage:.2f}%"
            )

            current_percentage = next_percentage

    if gradient_parts:

        stock_gradient = ", ".join(
            gradient_parts
        )

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
        {
            "user": request.user
        }
    )


@login_required
def seller_order(request):

    if request.user.role != User.Role.SELLER:
        return redirect("home")

    return render(
        request,
        "seller/order.html",
        {
            "user": request.user
        }
    )


@login_required
def seller_earning(request):

    if request.user.role != User.Role.SELLER:
        return redirect("home")

    return render(
        request,
        "seller/earning.html",
        {
            "user": request.user
        }
    )


@login_required
def seller_profile(request):

    if request.user.role != User.Role.SELLER:
        return redirect("home")

    return render(
        request,
        "seller/profile.html",
        {
            "user": request.user
        }
    )