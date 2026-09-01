from django.contrib.auth.models import AbstractUser
from django.db import models


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