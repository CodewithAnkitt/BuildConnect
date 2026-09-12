from django import forms
from django.core.exceptions import ValidationError

from .models import User


class SignupForm(forms.Form):

    first_name = forms.CharField(
        max_length=150,
        required=True
    )

    last_name = forms.CharField(
        max_length=150,
        required=True
    )

    email = forms.EmailField(
        required=True
    )

    phone_number = forms.CharField(
        max_length=10,
        min_length=10,
        required=True
    )

    whatsapp_number = forms.CharField(
        max_length=10,
        min_length=10,
        required=True
    )

    password = forms.CharField(
        min_length=8,
        widget=forms.PasswordInput
    )

    confirm_password = forms.CharField(
        widget=forms.PasswordInput
    )

    role = forms.ChoiceField(
        choices=[
            (User.Role.CUSTOMER, "Customer"),
            (User.Role.SELLER, "Seller"),
            (User.Role.DRIVER, "Driver"),
            (User.Role.VEHICLE_OWNER, "Vehicle Owner"),
        ]
    )

    def clean_phone_number(self):
        phone = self.cleaned_data["phone_number"]

        if not phone.isdigit():
            raise ValidationError(
                "Phone number must contain only digits."
            )

        if User.objects.filter(phone_number=phone).exists():
            raise ValidationError(
                "An account with this phone number already exists."
            )

        return phone

    def clean_whatsapp_number(self):
        whatsapp = self.cleaned_data["whatsapp_number"]

        if not whatsapp.isdigit():
            raise ValidationError(
                "WhatsApp number must contain only digits."
            )

        return whatsapp

    def clean(self):
        cleaned_data = super().clean()

        password = cleaned_data.get("password")
        confirm_password = cleaned_data.get("confirm_password")

        if password and confirm_password:
            if password != confirm_password:
                raise ValidationError(
                    "Passwords do not match."
                )

        return cleaned_data