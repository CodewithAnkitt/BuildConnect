from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models


# ============================================================
# USER
# ============================================================

class User(AbstractUser):

    class Role(models.TextChoices):
        CUSTOMER = "CUSTOMER", "Customer"
        SELLER = "SELLER", "Seller"
        DRIVER = "DRIVER", "Driver"
        VEHICLE_OWNER = "VEHICLE_OWNER", "Vehicle Owner"

    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.CUSTOMER
    )

    phone_number = models.CharField(
        max_length=10,
        unique=True
    )

    whatsapp_number = models.CharField(
        max_length=10
    )

    def __str__(self):
        return f"{self.username} - {self.get_role_display()}"

class DriverProfile(models.Model):

    class VerificationStatus(models.TextChoices):
        PENDING = "PENDING", "Pending"
        VERIFIED = "VERIFIED", "Verified"
        REJECTED = "REJECTED", "Rejected"

    driver = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="driver_profile"
    )

    licence_number = models.CharField(
        max_length=50,
        unique=True
    )

    licence_document = models.FileField(
        upload_to="driver_licences/"
    )

    verification_status = models.CharField(
        max_length=20,
        choices=VerificationStatus.choices,
        default=VerificationStatus.PENDING
    )

    rejection_reason = models.TextField(blank=True)

    uploaded_at = models.DateTimeField(auto_now_add=True)

    verified_at = models.DateTimeField(
        blank=True,
        null=True
    )

    def __str__(self):
        return f"{self.driver.username} - {self.verification_status}"
# ============================================================
# MATERIAL
# ============================================================

class Material(models.Model):

    class Unit(models.TextChoices):
        TON = "TON", "Ton"
        CUBIC_METER = "CUBIC_METER", "Cubic Meter"
        PIECE = "PIECE", "Piece"

    name = models.CharField(
        max_length=100,
        unique=True
    )

    description = models.TextField(
        blank=True
    )

    unit = models.CharField(
        max_length=20,
        choices=Unit.choices,
        default=Unit.TON
    )

    is_active = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.name


# ============================================================
# MATERIAL LISTING
# ============================================================

class MaterialListing(models.Model):

    seller = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="material_listings"
    )

    material = models.ForeignKey(
        Material,
        on_delete=models.PROTECT,
        related_name="listings"
    )

    quantity_available = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    unit_price = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    location = models.CharField(
        max_length=255
    )

    description = models.TextField(
        blank=True
    )

    is_available = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return f"{self.material.name} - {self.seller}"


# ============================================================
# ORDER
# ============================================================

class Order(models.Model):

    class Status(models.TextChoices):
        PENDING = "PENDING", "Pending"
        CONFIRMED = "CONFIRMED", "Confirmed"
        DELIVERED = "DELIVERED", "Delivered"
        CANCELLED = "CANCELLED", "Cancelled"

    customer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="orders"
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING
    )

    total_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    shipping_address = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return f"Order #{self.id}"


# ============================================================
# ORDER ITEM
# ============================================================

class OrderItem(models.Model):

    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="items"
    )

    listing = models.ForeignKey(
        MaterialListing,
        on_delete=models.PROTECT,
        related_name="order_items"
    )

    quantity = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    unit_price = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    subtotal = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    def __str__(self):
        return f"Order #{self.order.id} - {self.listing.material.name}"


# ============================================================
# VEHICLE
# ============================================================

class Vehicle(models.Model):

    class VehicleType(models.TextChoices):
        TRUCK = "TRUCK", "Truck"
        JCB = "JCB", "JCB"

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="vehicles"
    )

    vehicle_type = models.CharField(
        max_length=20,
        choices=VehicleType.choices
    )

    registration_number = models.CharField(
        max_length=20,
        unique=True
    )

    model_name = models.CharField(
        max_length=100
    )

    rental_price_per_day = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    location = models.CharField(
        max_length=255
    )

    description = models.TextField(
        blank=True
    )

    is_available = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.vehicle_type} - {self.registration_number}"


# ============================================================
# VEHICLE RENTAL
# ============================================================

class VehicleRental(models.Model):

    class Status(models.TextChoices):
        PENDING = "PENDING", "Pending"
        CONFIRMED = "CONFIRMED", "Confirmed"
        COMPLETED = "COMPLETED", "Completed"
        CANCELLED = "CANCELLED", "Cancelled"

    customer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="vehicle_rentals"
    )

    vehicle = models.ForeignKey(
        Vehicle,
        on_delete=models.PROTECT,
        related_name="rentals"
    )

    start_date = models.DateField()

    end_date = models.DateField()

    total_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"Rental #{self.id} - {self.vehicle.registration_number}"


# ============================================================
# DRIVER JOB
# ============================================================

class DriverJob(models.Model):

    class Status(models.TextChoices):
        OPEN = "OPEN", "Open"
        CLOSED = "CLOSED", "Closed"

    posted_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="driver_jobs"
    )

    title = models.CharField(
        max_length=150
    )

    description = models.TextField()

    location = models.CharField(
        max_length=255
    )

    salary = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    start_date = models.DateField(
        blank=True,
        null=True
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.OPEN
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.title


# ============================================================
# DRIVER APPLICATION
# ============================================================

class DriverApplication(models.Model):

    class Status(models.TextChoices):
        APPLIED = "APPLIED", "Applied"
        SHORTLISTED = "SHORTLISTED", "Shortlisted"
        REJECTED = "REJECTED", "Rejected"
        HIRED = "HIRED", "Hired"

    job = models.ForeignKey(
        DriverJob,
        on_delete=models.CASCADE,
        related_name="applications"
    )

    driver = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="driver_applications"
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.APPLIED
    )

    applied_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["job", "driver"],
                name="unique_driver_job_application"
            )
        ]

    def __str__(self):
        return f"{self.driver} - {self.job.title}"