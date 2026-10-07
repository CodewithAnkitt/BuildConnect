from django.core.management.base import BaseCommand

from core.models import User, Vehicle


class Command(BaseCommand):

    help = "Create demo BuildConnect vehicles"

    def handle(self, *args, **options):

        owner = (
            User.objects
            .filter(
                role=User.Role.VEHICLE_OWNER
            )
            .first()
        )

        if not owner:

            owner = User.objects.create_user(
                username="vehicleowner_demo",
                password="BuildConnect@123",
                first_name="BuildConnect",
                last_name="Vehicle Owner",
                email="vehicleowner@buildconnect.com",
                phone_number="9000000001",
                whatsapp_number="9000000001",
                role=User.Role.VEHICLE_OWNER,
            )

            self.stdout.write(
                self.style.SUCCESS(
                    "Demo vehicle owner created."
                )
            )

        vehicles = [

            {
                "type": "EXCAVATOR",
                "registration": "JH01EX1001",
                "model": "CAT 320D",
                "capacity": "20 Ton",
                "fuel": "DIESEL",
                "price": 2500,
                "location": "Ranchi, Jharkhand",
            },

            {
                "type": "LOADER",
                "registration": "JH01LO1002",
                "model": "JCB 432ZX",
                "capacity": "10 Ton",
                "fuel": "DIESEL",
                "price": 2000,
                "location": "Dhanbad, Jharkhand",
            },

            {
                "type": "DUMPER",
                "registration": "JH01DU1003",
                "model": "Tata Prima",
                "capacity": "25 Ton",
                "fuel": "DIESEL",
                "price": 2200,
                "location": "Ranchi, Jharkhand",
            },

            {
                "type": "CRANE",
                "registration": "JH01CR1004",
                "model": "Sany SCS250",
                "capacity": "25 Ton",
                "fuel": "DIESEL",
                "price": 8000,
                "location": "Jamshedpur, Jharkhand",
            },

            {
                "type": "ROLLER",
                "registration": "JH01RO1005",
                "model": "Dynapac CA250",
                "capacity": "10 Ton",
                "fuel": "DIESEL",
                "price": 2000,
                "location": "Bokaro, Jharkhand",
            },

            {
                "type": "TIPPER",
                "registration": "JH01TI1006",
                "model": "Eicher Pro 2059",
                "capacity": "10 Ton",
                "fuel": "DIESEL",
                "price": 1600,
                "location": "Dhanbad, Jharkhand",
            },

            {
                "type": "BACKHOE",
                "registration": "JH01BA1007",
                "model": "JCB 3DX",
                "capacity": "8 Ton",
                "fuel": "DIESEL",
                "price": 2300,
                "location": "Ranchi, Jharkhand",
            },

            {
                "type": "TRACTOR",
                "registration": "JH01TR1008",
                "model": "Sonalika DI 750",
                "capacity": "5 Ton",
                "fuel": "DIESEL",
                "price": 1400,
                "location": "Hazaribagh, Jharkhand",
            },

            {
                "type": "JCB",
                "registration": "JH01JC1009",
                "model": "JCB 4DX",
                "capacity": "9 Ton",
                "fuel": "DIESEL",
                "price": 2400,
                "location": "Ramgarh, Jharkhand",
            },

            {
                "type": "DUMPER",
                "registration": "JH01DU1010",
                "model": "Ashok Leyland 2820",
                "capacity": "20 Ton",
                "fuel": "DIESEL",
                "price": 2100,
                "location": "Bokaro, Jharkhand",
            },

            {
                "type": "TIPPER",
                "registration": "JH01TI1011",
                "model": "BharatBenz 2823",
                "capacity": "16 Ton",
                "fuel": "DIESEL",
                "price": 1900,
                "location": "Bokaro, Jharkhand",
            },

            {
                "type": "OTHER",
                "registration": "JH01OT1012",
                "model": "Motor Grader 120K",
                "capacity": "15 Ton",
                "fuel": "DIESEL",
                "price": 3500,
                "location": "Dhanbad, Jharkhand",
            },
        ]

        for data in vehicles:

            Vehicle.objects.update_or_create(

                registration_number=data["registration"],

                defaults={
                    "owner": owner,
                    "vehicle_type": data["type"],
                    "model_name": data["model"],
                    "capacity": data["capacity"],
                    "fuel_type": data["fuel"],
                    "rental_price_per_day": data["price"],
                    "location": data["location"],
                    "description": (
                        "Reliable BuildConnect equipment "
                        "available for rental."
                    ),
                    "is_available": True,
                }
            )

        self.stdout.write(
            self.style.SUCCESS(
                f"{len(vehicles)} demo vehicles are ready."
            )
        )