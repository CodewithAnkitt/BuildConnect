/* =========================================================
   BUILDCONNECT - MY RENTALS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const rentalCards = Array.from(
        document.querySelectorAll(".rental-card")
    );

    const filterButtons = document.querySelectorAll(".filter-tab");

    const rentalSearch = document.querySelector(
        ".rental-search input"
    );

    const sortSelect = document.querySelector(
        ".sort-select"
    );

    const menuBtn = document.querySelector(
        ".menu-btn"
    );

    const sidebar = document.querySelector(
        ".sidebar"
    );


    /* =====================================================
       MOBILE SIDEBAR
       ===================================================== */

    if (menuBtn && sidebar) {

        menuBtn.addEventListener("click", () => {
            sidebar.classList.toggle("open");
        });

    }


    /* =====================================================
       FILTER RENTALS
       ===================================================== */

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const text = button.textContent
                .trim()
                .toLowerCase();

            let filter = "all";

            if (text.includes("active")) {
                filter = "active";
            }

            if (text.includes("upcoming")) {
                filter = "upcoming";
            }

            if (text.includes("completed")) {
                filter = "completed";
            }

            rentalCards.forEach(card => {

                const status = card
                    .querySelector(".vehicle-status");

                if (!status) return;

                const cardStatus = status
                    .classList.contains("active")
                    ? "active"
                    : status.classList.contains("upcoming")
                    ? "upcoming"
                    : "completed";

                if (
                    filter === "all" ||
                    filter === cardStatus
                ) {
                    card.style.display = "grid";
                } else {
                    card.style.display = "none";
                }

            });

        });

    });


    /* =====================================================
       SEARCH RENTALS
       ===================================================== */

    if (rentalSearch) {

        rentalSearch.addEventListener("input", () => {

            const searchValue =
                rentalSearch.value
                    .toLowerCase()
                    .trim();

            rentalCards.forEach(card => {

                const cardText =
                    card.textContent.toLowerCase();

                if (
                    cardText.includes(searchValue)
                ) {
                    card.style.display = "grid";
                } else {
                    card.style.display = "none";
                }

            });

        });

    }


    /* =====================================================
       SORT RENTALS
       ===================================================== */

    if (sortSelect) {

        sortSelect.addEventListener("change", () => {

            const list =
                document.querySelector(".rentals-list");

            if (!list) return;

            const cards =
                Array.from(
                    list.querySelectorAll(".rental-card")
                );

            const value =
                sortSelect.value;

            if (value === "Highest Amount") {

                cards.sort((a, b) => {

                    const amountA =
                        getAmount(a);

                    const amountB =
                        getAmount(b);

                    return amountB - amountA;

                });

            }

            else if (value === "Lowest Amount") {

                cards.sort((a, b) => {

                    const amountA =
                        getAmount(a);

                    const amountB =
                        getAmount(b);

                    return amountA - amountB;

                });

            }

            else if (value === "Oldest First") {

                cards.reverse();

            }

            else {

                // Newest First
                cards.sort((a, b) => {

                    const amountA =
                        getAmount(a);

                    const amountB =
                        getAmount(b);

                    return amountB - amountA;

                });

            }


            cards.forEach(card => {
                list.appendChild(card);
            });

        });

    }


    /* =====================================================
       GET RENTAL AMOUNT
       ===================================================== */

    function getAmount(card) {

        const price =
            card.querySelector(
                ".rental-price > strong"
            );

        if (!price) return 0;

        const number =
            price.textContent
                .replace(/[^\d]/g, "");

        return parseInt(number) || 0;

    }


    /* =====================================================
       VIEW DETAILS
       ===================================================== */

    document
        .querySelectorAll(".view-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                const card =
                    button.closest(".rental-card");

                if (!card) return;

                const vehicle =
                    card.querySelector(
                        ".vehicle-details h3"
                    );

                const vehicleName =
                    vehicle
                        ? vehicle.textContent.trim()
                        : "Vehicle";

                alert(
                    `Rental details for ${vehicleName} will be available here.`
                );

            });

        });


    /* =====================================================
       EXTEND RENTAL
       ===================================================== */

    document
        .querySelectorAll(".secondary-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                const card =
                    button.closest(".rental-card");

                if (!card) return;

                const vehicle =
                    card.querySelector(
                        ".vehicle-details h3"
                    );

                const vehicleName =
                    vehicle
                        ? vehicle.textContent.trim()
                        : "this vehicle";

                const buttonText =
                    button.textContent
                        .toLowerCase();

                if (
                    buttonText.includes("extend")
                ) {

                    const confirmExtend =
                        confirm(
                            `Would you like to extend the rental for ${vehicleName}?`
                        );

                    if (confirmExtend) {

                        alert(
                            "Rental extension request has been initiated."
                        );

                    }

                }

                else if (
                    buttonText.includes("cancel")
                ) {

                    const confirmCancel =
                        confirm(
                            `Are you sure you want to cancel the rental for ${vehicleName}?`
                        );

                    if (confirmCancel) {

                        alert(
                            "Your rental cancellation request has been submitted."
                        );

                    }

                }

                else if (
                    buttonText.includes("book again")
                ) {

                    const confirmBooking =
                        confirm(
                            `Would you like to rent ${vehicleName} again?`
                        );

                    if (confirmBooking) {

                        window.location.href =
                            "/customer/vehicles/";

                    }

                }

            });

        });


    /* =====================================================
       NOTIFICATION
       ===================================================== */

    const notificationBtn =
        document.querySelector(
            ".notification-btn"
        );

    if (notificationBtn) {

        notificationBtn.addEventListener(
            "click",
            () => {

                alert(
                    "You have 3 new notifications."
                );

            }
        );

    }


    /* =====================================================
       PROFILE
       ===================================================== */

    const profile =
        document.querySelector(
            ".profile-mini"
        );

    if (profile) {

        profile.style.cursor = "pointer";

        profile.addEventListener(
            "click",
            () => {

                alert(
                    "Customer profile section will be available here."
                );

            }
        );

    }

});