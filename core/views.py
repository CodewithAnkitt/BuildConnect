from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import redirect, render

from .forms import SignupForm
from .models import DriverProfile, User


def home(request):
    return render(request, "home.html")


def login_view(request):

    if request.method == "POST":

        phone_number = request.POST.get("phone_number", "").strip()
        password = request.POST.get("password", "")
        selected_role = request.POST.get("role", "").strip()

        try:
            user = User.objects.get(phone_number=phone_number)
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
                    return redirect("vehicle_owner_dashboard")

        messages.error(
            request,
            "Invalid phone number, password, or role."
        )

    return render(request, "login.html")


def signup_view(request):

    if request.method == "POST":

        form = SignupForm(request.POST)

        if form.is_valid():

            phone_number = form.cleaned_data["phone_number"]

            User.objects.create_user(
                username=phone_number,
                password=form.cleaned_data["password"],
                first_name=form.cleaned_data["first_name"],
                last_name=form.cleaned_data["last_name"],
                email=form.cleaned_data["email"],
                phone_number=phone_number,
                whatsapp_number=form.cleaned_data["whatsapp_number"],
                role=form.cleaned_data["role"],
            )

            messages.success(
                request,
                "Your BuildConnect account has been created successfully. "
                "Please login."
            )

            return redirect("login")

    else:
        form = SignupForm()

    return render(
        request,
        "login.html",
        {
            "signup_form": form
        }
    )


def logout_view(request):

    logout(request)

    return redirect("home")

# Customer page 

def customer_dashboard(request):
    return render(request, "customer/dashboard.html")


def materials(request):
    return render(request, "customer/materials.html")

def orders(request):
    return render(request, "customer/orders.html")

def vehicles(request):
    return render(request, "customer/vehicles.html")