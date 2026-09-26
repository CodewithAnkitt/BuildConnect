/* =========================================================
   BUILD CONNECT
   VEHICLE OWNER - MY RENTALS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const sidebar = document.getElementById("sidebar");
    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");

    const rentalSearch =
        document.getElementById("rentalSearch");

    const rentalCards =
        document.querySelectorAll(".rental-card");

    const noResults =
        document.getElementById("noResults");

    const notificationBtn =
        document.getElementById("notificationBtn");

    const notificationDot =
        document.querySelector(".notification-dot");

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");

    const addRentalBtn =
        document.getElementById("addRentalBtn");


    /* =====================================================
       TOAST
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

        mobileMenuBtn.addEventListener(
            "click",
            function () {

                sidebar.classList.toggle("open");

            }
        );

    }


    /* =====================================================
       CLOSE SIDEBAR OUTSIDE
    ====================================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (!sidebar || !mobileMenuBtn) {
                return;
            }

            const clickedSidebar =
                sidebar.contains(event.target);

            const clickedMenu =
                mobileMenuBtn.contains(event.target);

            if (
                !clickedSidebar &&
                !clickedMenu &&
                sidebar.classList.contains("open")
            ) {

                sidebar.classList.remove("open");

            }

        }
    );


    /* =====================================================
       SEARCH + FILTER FUNCTION
    ====================================================== */

    let currentFilter = "all";


    function updateRentalList() {

        const searchValue =
            rentalSearch
                ? rentalSearch.value
                    .trim()
                    .toLowerCase()
                : "";

        let visibleCount = 0;


        rentalCards.forEach(function (card) {

            const status =
                card.getAttribute("data-status") || "";

            const searchData =
                (
                    card.getAttribute("data-search") ||
                    ""
                ).toLowerCase();

            const cardText =
                card.textContent.toLowerCase();

            const searchableText =
                searchData + " " + cardText;


            const matchesStatus =
                currentFilter === "all" ||
                status === currentFilter;

            const matchesSearch =
                searchableText.includes(searchValue);


            if (
                matchesStatus &&
                matchesSearch
            ) {

                card.style.display = "grid";

                visibleCount++;

            } else {

                card.style.display = "none";

            }

        });


        if (noResults) {

            if (visibleCount === 0) {

                noResults.style.display = "block";

            } else {

                noResults.style.display = "none";

            }

        }

    }


    /* =====================================================
       SEARCH
    ====================================================== */

    if (rentalSearch) {

        rentalSearch.addEventListener(
            "input",
            updateRentalList
        );

    }


    /* =====================================================
       STATUS FILTERS
    ====================================================== */

    const statusFilters =
        document.querySelectorAll(".status-filter");


    statusFilters.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                statusFilters.forEach(
                    function (item) {

                        item.classList.remove("active");

                    }
                );


                button.classList.add("active");


                currentFilter =
                    button.getAttribute("data-filter") ||
                    "all";


                updateRentalList();

            }
        );

    });


    /* =====================================================
       DATE FILTER
    ====================================================== */

    const dateFilterBtn =
        document.getElementById("dateFilterBtn");


    if (dateFilterBtn) {

        dateFilterBtn.addEventListener(
            "click",
            function () {

                showToast(
                    "Date range filter will be connected later."
                );

            }
        );

    }


    /* =====================================================
       LOCATION FILTER
    ====================================================== */

    const locationFilterBtn =
        document.getElementById(
            "locationFilterBtn"
        );


    if (locationFilterBtn) {

        locationFilterBtn.addEventListener(
            "click",
            function () {

                showToast(
                    "Location filter will be connected later."
                );

            }
        );

    }


    /* =====================================================
       MORE FILTERS
    ====================================================== */

    const moreFiltersBtn =
        document.getElementById(
            "moreFiltersBtn"
        );


    if (moreFiltersBtn) {

        moreFiltersBtn.addEventListener(
            "click",
            function () {

                showToast(
                    "Advanced rental filters will be available soon."
                );

            }
        );

    }


    /* =====================================================
       ADD RENTAL
    ====================================================== */

    if (addRentalBtn) {

        addRentalBtn.addEventListener(
            "click",
            function () {

                showToast(
                    "Manual rental creation will be connected later."
                );

            }
        );

    }


    /* =====================================================
       VIEW DETAILS
    ====================================================== */

    const viewDetailsButtons =
        document.querySelectorAll(
            ".view-details-btn"
        );


    viewDetailsButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const card =
                        button.closest(".rental-card");

                    if (!card) {
                        return;
                    }


                    const vehicle =
                        card.querySelector(
                            ".vehicle-heading h3"
                        );

                    const customer =
                        card.querySelector(
                            ".customer-top h4"
                        );


                    const vehicleName =
                        vehicle
                            ? vehicle.textContent.trim()
                            : "Vehicle";


                    const customerName =
                        customer
                            ? customer.textContent.trim()
                            : "Customer";


                    showToast(
                        "Viewing " +
                        vehicleName +
                        " rental for " +
                        customerName +
                        "."
                    );

                }
            );

        }
    );


    /* =====================================================
       MANAGE RENTAL
    ====================================================== */

    const manageButtons =
        document.querySelectorAll(
            ".manage-btn"
        );


    manageButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const card =
                        button.closest(".rental-card");

                    if (!card) {
                        return;
                    }


                    const vehicle =
                        card.querySelector(
                            ".vehicle-heading h3"
                        );


                    const vehicleName =
                        vehicle
                            ? vehicle.textContent.trim()
                            : "Vehicle";


                    showToast(
                        "Manage options for " +
                        vehicleName +
                        " will be available later."
                    );

                }
            );

        }
    );


    /* =====================================================
       CREATE INVOICE
    ====================================================== */

    const invoiceButtons =
        document.querySelectorAll(
            ".invoice-btn"
        );


    invoiceButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    showToast(
                        "Invoice generation will be connected later."
                    );

                }
            );

        }
    );


    /* =====================================================
       MORE OPTIONS
    ====================================================== */

    const moreButtons =
        document.querySelectorAll(
            ".more-btn"
        );


    moreButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    showToast(
                        "More rental options will be available later."
                    );

                }
            );

        }
    );


    /* =====================================================
       NOTIFICATIONS
    ====================================================== */

    if (notificationBtn) {

        notificationBtn.addEventListener(
            "click",
            function () {

                showToast(
                    "You have 3 new rental notifications."
                );


                if (notificationDot) {

                    notificationDot.style.display =
                        "none";

                }

            }
        );

    }


    /* =====================================================
       CTRL + K SEARCH
    ====================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();


                if (rentalSearch) {

                    rentalSearch.focus();

                }

            }

        }
    );


    /* =====================================================
       SIDEBAR ACTIVE STATE
    ====================================================== */

    const navItems =
        document.querySelectorAll(
            ".sidebar-nav .nav-item"
        );


    navItems.forEach(function (item) {

        item.addEventListener(
            "click",
            function () {

                navItems.forEach(
                    function (nav) {

                        nav.classList.remove("active");

                    }
                );


                item.classList.add("active");

            }
        );

    });


    /* =====================================================
       CARD LOAD ANIMATION
    ====================================================== */

    rentalCards.forEach(
        function (card, index) {

            card.style.opacity = "0";

            card.style.transform =
                "translateY(12px)";


            setTimeout(
                function () {

                    card.style.transition =
                        "opacity 0.45s ease, " +
                        "transform 0.45s ease";

                    card.style.opacity = "1";

                    card.style.transform =
                        "translateY(0)";

                },
                100 + (index * 120)
            );

        }
    );


    /* =====================================================
       STAT CARD ANIMATION
    ====================================================== */

    const statCards =
        document.querySelectorAll(".stat-card");


    statCards.forEach(
        function (card, index) {

            card.style.opacity = "0";

            card.style.transform =
                "translateY(8px)";


            setTimeout(
                function () {

                    card.style.transition =
                        "opacity 0.35s ease, " +
                        "transform 0.35s ease";

                    card.style.opacity = "1";

                    card.style.transform =
                        "translateY(0)";

                },
                80 + (index * 80)
            );

        }
    );


    /* =====================================================
       INITIAL LIST
    ====================================================== */

    updateRentalList();

});