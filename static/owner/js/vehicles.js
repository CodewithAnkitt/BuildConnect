/* =========================================================
   BUILD CONNECT - VEHICLE OWNER
   MY VEHICLES PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const sidebar = document.getElementById("sidebar");
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");

    const vehicleSearch = document.getElementById("vehicleSearch");
    const vehicleCards = document.querySelectorAll(".vehicle-card");
    const noResults = document.getElementById("noResults");

    const addVehicleBtn = document.getElementById("addVehicleBtn");

    const notificationBtn =
        document.getElementById("notificationBtn");

    const toast = document.getElementById("toast");
    const toastMessage =
        document.getElementById("toastMessage");


    /* =====================================================
       TOAST FUNCTION
    ====================================================== */

    function showToast(message) {

        if (!toast || !toastMessage) {
            return;
        }

        toastMessage.textContent = message;

        toast.classList.add("show");

        setTimeout(function () {

            toast.classList.remove("show");

        }, 2500);
    }


    /* =====================================================
       MOBILE SIDEBAR
    ====================================================== */

    if (mobileMenuBtn && sidebar) {

        mobileMenuBtn.addEventListener("click", function () {

            sidebar.classList.toggle("open");

        });

    }


    /* =====================================================
       CLOSE SIDEBAR WHEN CLICKING OUTSIDE
    ====================================================== */

    document.addEventListener("click", function (event) {

        if (!sidebar || !mobileMenuBtn) {
            return;
        }

        const clickedInsideSidebar =
            sidebar.contains(event.target);

        const clickedMenuButton =
            mobileMenuBtn.contains(event.target);

        if (
            !clickedInsideSidebar &&
            !clickedMenuButton &&
            sidebar.classList.contains("open")
        ) {

            sidebar.classList.remove("open");

        }

    });


    /* =====================================================
       VEHICLE SEARCH
    ====================================================== */

    if (vehicleSearch) {

        vehicleSearch.addEventListener("input", function () {

            const searchValue =
                vehicleSearch.value
                    .trim()
                    .toLowerCase();

            let visibleVehicles = 0;


            vehicleCards.forEach(function (card) {

                const vehicleText =
                    card.textContent.toLowerCase();

                const vehicleData =
                    card.getAttribute("data-vehicle") || "";

                const searchableText =
                    vehicleText + " " + vehicleData;


                if (
                    searchableText.includes(searchValue)
                ) {

                    card.style.display = "grid";

                    visibleVehicles++;

                } else {

                    card.style.display = "none";

                }

            });


            /* Show no result message */

            if (noResults) {

                if (
                    visibleVehicles === 0 &&
                    searchValue !== ""
                ) {

                    noResults.style.display = "block";

                } else {

                    noResults.style.display = "none";

                }

            }

        });

    }


    /* =====================================================
       ADD NEW VEHICLE
    ====================================================== */

    if (addVehicleBtn) {

        addVehicleBtn.addEventListener("click", function () {

            showToast(
                "Add Vehicle feature will be available soon."
            );

        });

    }


    /* =====================================================
       EDIT VEHICLE
    ====================================================== */

    const editButtons =
        document.querySelectorAll(".edit-btn");


    editButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const vehicleName =
                button.getAttribute("data-vehicle-name");

            showToast(
                "Edit " + vehicleName + " feature will be available soon."
            );

        });

    });


    /* =====================================================
       DELETE VEHICLE
    ====================================================== */

    const deleteButtons =
        document.querySelectorAll(".delete-btn");


    deleteButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const vehicleName =
                button.getAttribute("data-vehicle-name");


            const confirmed =
                confirm(
                    "Are you sure you want to delete " +
                    vehicleName +
                    "?"
                );


            if (confirmed) {

                showToast(
                    vehicleName +
                    " will be deleted after database connection."
                );

            }

        });

    });


    /* =====================================================
       VIEW VEHICLE DETAILS
    ====================================================== */

    const detailsButtons =
        document.querySelectorAll(".details-btn");


    detailsButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const vehicleName =
                button.getAttribute("data-vehicle-name");


            showToast(
                "Vehicle details for " +
                vehicleName +
                " will be available soon."
            );

        });

    });


    /* =====================================================
       NOTIFICATION BUTTON
    ====================================================== */

    if (notificationBtn) {

        notificationBtn.addEventListener("click", function () {

            showToast(
                "You have 3 new rental requests."
            );

        });

    }


    /* =====================================================
       KEYBOARD SHORTCUT
       CTRL + K = SEARCH
    ====================================================== */

    document.addEventListener("keydown", function (event) {

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            if (vehicleSearch) {

                vehicleSearch.focus();

            }

        }

    });


    /* =====================================================
       SIDEBAR ACTIVE STATE
    ====================================================== */

    const navItems =
        document.querySelectorAll(".sidebar-nav .nav-item");


    navItems.forEach(function (item) {

        item.addEventListener("click", function () {

            navItems.forEach(function (nav) {

                nav.classList.remove("active");

            });

            item.classList.add("active");

        });

    });


    /* =====================================================
       SIMPLE VEHICLE CARD ANIMATION
    ====================================================== */

    vehicleCards.forEach(function (card, index) {

        card.style.opacity = "0";
        card.style.transform = "translateY(10px)";

        setTimeout(function () {

            card.style.transition =
                "opacity 0.4s ease, transform 0.4s ease";

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }, 100 + (index * 100));

    });


    /* =====================================================
       NOTIFICATION DOT
    ====================================================== */

    const notificationDot =
        document.querySelector(".notification-dot");


    if (notificationBtn && notificationDot) {

        notificationBtn.addEventListener("click", function () {

            notificationDot.style.display = "none";

        });

    }

});