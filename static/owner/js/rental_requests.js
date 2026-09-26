/* =========================================================
   BUILD CONNECT
   VEHICLE OWNER - RENTAL REQUESTS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const sidebar = document.getElementById("sidebar");
    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");

    const requestSearch =
        document.getElementById("requestSearch");

    const requestCards =
        document.querySelectorAll(".request-card");

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
       CLOSE SIDEBAR WHEN CLICKING OUTSIDE
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
       SEARCH
    ====================================================== */

    function filterRequests() {

        if (!requestSearch) {
            return;
        }

        const searchValue =
            requestSearch.value
                .trim()
                .toLowerCase();

        let visibleCount = 0;


        requestCards.forEach(function (card) {

            const searchData =
                (
                    card.getAttribute("data-search") ||
                    ""
                ).toLowerCase();

            const cardText =
                card.textContent.toLowerCase();

            const searchableText =
                searchData + " " + cardText;


            if (
                searchableText.includes(searchValue)
            ) {

                card.style.display = "grid";

                visibleCount++;

            } else {

                card.style.display = "none";

            }

        });


        if (noResults) {

            if (
                visibleCount === 0 &&
                searchValue !== ""
            ) {

                noResults.style.display = "block";

            } else {

                noResults.style.display = "none";

            }

        }

    }


    if (requestSearch) {

        requestSearch.addEventListener(
            "input",
            filterRequests
        );

    }


    /* =====================================================
       STATUS FILTERS
    ====================================================== */

    const statusFilters =
        document.querySelectorAll(".status-filter");


    statusFilters.forEach(function (filterButton) {

        filterButton.addEventListener(
            "click",
            function () {

                statusFilters.forEach(function (button) {

                    button.classList.remove("active");

                });

                filterButton.classList.add("active");


                const selectedStatus =
                    filterButton.getAttribute("data-filter");


                let visibleCount = 0;


                requestCards.forEach(function (card) {

                    const cardStatus =
                        card.getAttribute("data-status");


                    const searchValue =
                        requestSearch
                            ? requestSearch.value
                                .trim()
                                .toLowerCase()
                            : "";


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
                        selectedStatus === "all" ||
                        cardStatus === selectedStatus;

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
        );

    });


    /* =====================================================
       ACCEPT REQUEST
    ====================================================== */

    const acceptButtons =
        document.querySelectorAll(".accept-btn");


    acceptButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const card =
                    button.closest(".request-card");

                if (!card) {
                    return;
                }


                const vehicle =
                    card.querySelector(".vehicle-heading h3");


                const vehicleName =
                    vehicle
                        ? vehicle.textContent.trim()
                        : "Vehicle";


                const confirmed =
                    confirm(
                        "Accept rental request for " +
                        vehicleName +
                        "?"
                    );


                if (!confirmed) {
                    return;
                }


                /* Frontend simulation */

                card.setAttribute(
                    "data-status",
                    "accepted"
                );


                const statusElement =
                    card.querySelector(".request-status");


                if (statusElement) {

                    statusElement.className =
                        "request-status accepted-status";

                    statusElement.innerHTML =
                        '<i class="fa-solid fa-circle-check"></i> Accepted';

                }


                /* Remove accept/reject buttons */

                const actionButtons =
                    card.querySelector(".action-buttons");


                if (actionButtons) {

                    actionButtons.remove();

                }


                /* Add accepted information */

                const requestAction =
                    card.querySelector(".request-action");


                if (requestAction) {

                    const acceptedInfo =
                        document.createElement("div");

                    acceptedInfo.className =
                        "accepted-info";

                    acceptedInfo.innerHTML =
                        `
                        <i class="fa-regular fa-calendar-check"></i>
                        Accepted just now
                        `;

                    const viewButton =
                        requestAction.querySelector(
                            ".view-details-btn"
                        );

                    if (viewButton) {

                        requestAction.insertBefore(
                            acceptedInfo,
                            viewButton
                        );

                    } else {

                        requestAction.appendChild(
                            acceptedInfo
                        );

                    }

                }


                showToast(
                    "Rental request accepted successfully."
                );

            }
        );

    });


    /* =====================================================
       REJECT REQUEST
    ====================================================== */

    const rejectButtons =
        document.querySelectorAll(".reject-btn");


    rejectButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const card =
                    button.closest(".request-card");

                if (!card) {
                    return;
                }


                const vehicle =
                    card.querySelector(".vehicle-heading h3");


                const vehicleName =
                    vehicle
                        ? vehicle.textContent.trim()
                        : "Vehicle";


                const confirmed =
                    confirm(
                        "Reject rental request for " +
                        vehicleName +
                        "?"
                    );


                if (!confirmed) {
                    return;
                }


                /* Frontend simulation */

                card.setAttribute(
                    "data-status",
                    "rejected"
                );


                const statusElement =
                    card.querySelector(".request-status");


                if (statusElement) {

                    statusElement.className =
                        "request-status rejected-status";

                    statusElement.innerHTML =
                        '<i class="fa-solid fa-circle-xmark"></i> Rejected';

                }


                /* Remove buttons */

                const actionButtons =
                    card.querySelector(".action-buttons");


                if (actionButtons) {

                    actionButtons.remove();

                }


                /* Add rejected information */

                const requestAction =
                    card.querySelector(".request-action");


                if (requestAction) {

                    const rejectedInfo =
                        document.createElement("div");

                    rejectedInfo.className =
                        "rejected-info";

                    rejectedInfo.innerHTML =
                        `
                        <i class="fa-regular fa-calendar-xmark"></i>
                        Rejected just now
                        `;


                    const viewButton =
                        requestAction.querySelector(
                            ".view-details-btn"
                        );


                    if (viewButton) {

                        requestAction.insertBefore(
                            rejectedInfo,
                            viewButton
                        );

                    } else {

                        requestAction.appendChild(
                            rejectedInfo
                        );

                    }

                }


                showToast(
                    "Rental request rejected."
                );

            }
        );

    });


    /* =====================================================
       VIEW DETAILS
    ====================================================== */

    const viewDetailsButtons =
        document.querySelectorAll(".view-details-btn");


    viewDetailsButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const card =
                    button.closest(".request-card");

                if (!card) {
                    return;
                }


                const vehicle =
                    card.querySelector(".vehicle-heading h3");

                const customer =
                    card.querySelector(".customer-top h4");


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
                    " request from " +
                    customerName +
                    "."
                );

            }
        );

    });


    /* =====================================================
       MORE OPTIONS
    ====================================================== */

    const moreButtons =
        document.querySelectorAll(".more-btn");


    moreButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                showToast(
                    "More request options will be available soon."
                );

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
                    "Advanced filters will be available soon."
                );

            }
        );

    }


    /* =====================================================
       NOTIFICATION
    ====================================================== */

    if (notificationBtn) {

        notificationBtn.addEventListener(
            "click",
            function () {

                showToast(
                    "You have 3 pending rental requests."
                );


                if (notificationDot) {

                    notificationDot.style.display =
                        "none";

                }

            }
        );

    }



    /* =====================================================
       KEYBOARD SHORTCUT
       CTRL + K
    ====================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();

                if (requestSearch) {

                    requestSearch.focus();

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

                        nav.classList.remove(
                            "active"
                        );

                    }
                );


                item.classList.add("active");

            }
        );

    });


    /* =====================================================
       REQUEST CARD LOAD ANIMATION
    ====================================================== */

    requestCards.forEach(
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

});