document.addEventListener("DOMContentLoaded", function () {

    /* ========================= ELEMENTS ========================= */

    const vehicleGrid =
        document.getElementById("vehicleGrid");

    const vehicleCards =
        Array.from(
            document.querySelectorAll(".vehicle-card")
        );

    const vehicleCount =
        document.getElementById("vehicleCount");

    const searchInput =
        document.getElementById("vehicleSearch");

    const categoryCards =
        document.querySelectorAll(".category-card");

    const sortSelect =
        document.getElementById("sortVehicles");

    const gridView =
        document.getElementById("gridView");

    const listView =
        document.getElementById("listView");

    const noResults =
        document.getElementById("noResults");

    const toast =
        document.getElementById("toast");

    const menuButton =
        document.getElementById("menuButton");

    const sidebarOverlay =
        document.getElementById("sidebarOverlay");

    const rentalModal =
        document.getElementById("rentalModal");

    const rentalModalOverlay =
        document.getElementById("rentalModalOverlay");

    const rentalClose =
        document.getElementById("rentalClose");

    const rentalForm =
        document.getElementById("rentalForm");

    const modalVehicleId =
        document.getElementById("modalVehicleId");

    const modalVehicleName =
        document.getElementById("modalVehicleName");

    const modalVehiclePrice =
        document.getElementById("modalVehiclePrice");

    const startDate =
        document.getElementById("startDate");

    const endDate =
        document.getElementById("endDate");

    const rentalDays =
        document.getElementById("rentalDays");

    const rentalTotal =
        document.getElementById("rentalTotal");

    const confirmRentalButton =
        document.getElementById("confirmRentalButton");


    let currentCategory = "all";
    let currentSearch = "";
    let currentPrice = 0;
    let toastTimer = null;


    /* ========================= TOAST ========================= */

    function showToast(message) {

        if (!toast) {
            return;
        }

        const text =
            toast.querySelector("span");

        if (text) {
            text.textContent = message;
        }

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(function () {

            toast.classList.remove("show");

        }, 2500);
    }


    /* ========================= SIDEBAR ========================= */

    if (menuButton) {

        menuButton.addEventListener(
            "click",
            function () {

                document.body.classList.toggle(
                    "sidebar-open"
                );

            }
        );

    }

    if (sidebarOverlay) {

        sidebarOverlay.addEventListener(
            "click",
            function () {

                document.body.classList.remove(
                    "sidebar-open"
                );

            }
        );

    }


    /* ========================= SEARCH ========================= */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                currentSearch =
                    searchInput.value
                        .trim()
                        .toLowerCase();

                filterVehicles();

            }
        );

    }


    /* ========================= CATEGORY ========================= */

    categoryCards.forEach(function (category) {

        category.addEventListener(
            "click",
            function () {

                categoryCards.forEach(
                    function (item) {
                        item.classList.remove(
                            "active"
                        );
                    }
                );

                category.classList.add("active");

                currentCategory =
                    category.dataset.category ||
                    "all";

                filterVehicles();

            }
        );

    });


    /* ========================= FILTER ========================= */

    function filterVehicles() {

        let visibleCount = 0;

        vehicleCards.forEach(function (card) {

            const category =
                (
                    card.dataset.category || ""
                ).toLowerCase();

            const name =
                (
                    card.dataset.name || ""
                ).toLowerCase();

            const content =
                card.textContent.toLowerCase();

            const categoryMatch =
                currentCategory === "all" ||
                category === currentCategory;

            const searchMatch =
                currentSearch === "" ||
                name.includes(currentSearch) ||
                content.includes(currentSearch);

            const shouldShow =
                categoryMatch &&
                searchMatch;

            card.hidden = !shouldShow;

            if (shouldShow) {
                visibleCount++;
            }

        });

        if (vehicleCount) {
            vehicleCount.textContent =
                visibleCount;
        }

        if (noResults) {

            noResults.style.display =
                visibleCount === 0
                    ? "block"
                    : "none";

        }

        sortVehicles();

    }


    /* ========================= SORT ========================= */

    function sortVehicles() {

        if (!vehicleGrid) {
            return;
        }

        const sortValue =
            sortSelect
                ? sortSelect.value
                : "newest";

        const visibleCards =
            vehicleCards.filter(
                function (card) {
                    return !card.hidden;
                }
            );

        if (sortValue === "price-low") {

            visibleCards.sort(
                function (a, b) {

                    return (
                        Number(
                            a.dataset.price || 0
                        ) -
                        Number(
                            b.dataset.price || 0
                        )
                    );

                }
            );

        } else if (sortValue === "price-high") {

            visibleCards.sort(
                function (a, b) {

                    return (
                        Number(
                            b.dataset.price || 0
                        ) -
                        Number(
                            a.dataset.price || 0
                        )
                    );

                }
            );

        } else {

            visibleCards.sort(
                function (a, b) {

                    return (
                        vehicleCards.indexOf(a) -
                        vehicleCards.indexOf(b)
                    );

                }
            );

        }

        visibleCards.forEach(
            function (card) {
                vehicleGrid.appendChild(card);
            }
        );

    }


    if (sortSelect) {

        sortSelect.addEventListener(
            "change",
            sortVehicles
        );

    }


    /* ========================= GRID / LIST ========================= */

    if (gridView) {

        gridView.addEventListener(
            "click",
            function () {

                gridView.classList.add("active");

                if (listView) {
                    listView.classList.remove(
                        "active"
                    );
                }

                vehicleGrid.classList.remove(
                    "list-layout"
                );

            }
        );

    }


    if (listView) {

        listView.addEventListener(
            "click",
            function () {

                listView.classList.add("active");

                if (gridView) {
                    gridView.classList.remove(
                        "active"
                    );
                }

                vehicleGrid.classList.add(
                    "list-layout"
                );

            }
        );

    }


    /* ========================= FAVOURITES ========================= */

    document
        .querySelectorAll(".favorite")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();
                    event.stopPropagation();

                    const active =
                        button.classList.toggle(
                            "active"
                        );

                    const icon =
                        button.querySelector("i");

                    if (icon) {

                        icon.classList.toggle(
                            "bi-heart",
                            !active
                        );

                        icon.classList.toggle(
                            "bi-heart-fill",
                            active
                        );

                    }

                    showToast(
                        active
                            ? "Vehicle added to favourites."
                            : "Vehicle removed from favourites."
                    );

                }
            );

        });


    /* ========================= OPEN RENTAL MODAL ========================= */

    document
        .querySelectorAll(".details-button")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const vehicleId =
                        button.dataset.vehicleId;

                    const vehicleName =
                        button.dataset.vehicleName;

                    const vehiclePrice =
                        Number(
                            button.dataset.vehiclePrice
                        );

                    if (!vehicleId) {
                        return;
                    }

                    modalVehicleId.value =
                        vehicleId;

                    modalVehicleName.textContent =
                        vehicleName;

                    modalVehiclePrice.textContent =
                        vehiclePrice.toLocaleString(
                            "en-IN"
                        );

                    currentPrice =
                        vehiclePrice;

                    rentalDays.textContent = "0";

                    rentalTotal.textContent = "0";

                    startDate.value = "";
                    endDate.value = "";

                    rentalModal.classList.add(
                        "show"
                    );

                    document.body.classList.add(
                        "modal-open"
                    );

                }
            );

        });


    /* ========================= CLOSE MODAL ========================= */

    function closeRentalModal() {

        rentalModal.classList.remove(
            "show"
        );

        document.body.classList.remove(
            "modal-open"
        );

    }

    if (rentalClose) {

        rentalClose.addEventListener(
            "click",
            closeRentalModal
        );

    }

    if (rentalModalOverlay) {

        rentalModalOverlay.addEventListener(
            "click",
            closeRentalModal
        );

    }

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                rentalModal.classList.contains("show")
            ) {

                closeRentalModal();

            }

        }
    );


    /* ========================= RENTAL CALCULATION ========================= */

    function calculateRental() {

        if (
            !startDate.value ||
            !endDate.value
        ) {

            rentalDays.textContent = "0";
            rentalTotal.textContent = "0";

            return;

        }

        const start =
            new Date(
                startDate.value + "T00:00:00"
            );

        const end =
            new Date(
                endDate.value + "T00:00:00"
            );

        const difference =
            end.getTime() -
            start.getTime();

        const days =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            ) + 1;

        if (days <= 0) {

            rentalDays.textContent = "0";
            rentalTotal.textContent = "0";

            return;
        }

        const total =
            currentPrice * days;

        rentalDays.textContent =
            days;

        rentalTotal.textContent =
            total.toLocaleString(
                "en-IN"
            );

    }


    if (startDate) {

        startDate.addEventListener(
            "change",
            function () {

                if (
                    endDate.value &&
                    endDate.value < startDate.value
                ) {

                    endDate.value =
                        startDate.value;

                }

                endDate.min =
                    startDate.value;

                calculateRental();

            }
        );

    }


    if (endDate) {

        endDate.addEventListener(
            "change",
            calculateRental
        );

    }


    /* ========================= CREATE RENTAL ========================= */

    if (rentalForm) {

        rentalForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();

                if (
                    !startDate.value ||
                    !endDate.value
                ) {

                    showToast(
                        "Please select both rental dates."
                    );

                    return;
                }

                if (
                    endDate.value <
                    startDate.value
                ) {

                    showToast(
                        "End date must be after start date."
                    );

                    return;
                }

                const formData =
                    new FormData(
                        rentalForm
                    );

                const originalText =
                    confirmRentalButton.innerHTML;

                confirmRentalButton.disabled =
                    true;

                confirmRentalButton.innerHTML = `
                    <i class="bi bi-hourglass-split"></i>
                    Sending Request...
                `;

                try {

                    const response =
                        await fetch(
                            rentalForm.dataset.url,
                            {
                                method: "POST",
                                body: formData,
                                headers: {
                                    "X-Requested-With":
                                        "XMLHttpRequest"
                                }
                            }
                        );

                    const data =
                        await response.json();

                    if (data.success) {

                        showToast(
                            "Rental request submitted successfully."
                        );

                        setTimeout(
                            function () {

                                window.location.href =
                                    "/customer/rentals/";

                            },
                            900
                        );

                    } else {

                        showToast(
                            data.message ||
                            "Unable to create rental."
                        );

                        confirmRentalButton.disabled =
                            false;

                        confirmRentalButton.innerHTML =
                            originalText;

                    }

                } catch (error) {

                    console.error(
                        "Rental Error:",
                        error
                    );

                    showToast(
                        "Something went wrong. Please try again."
                    );

                    confirmRentalButton.disabled =
                        false;

                    confirmRentalButton.innerHTML =
                        originalText;

                }

            }
        );

    }


    /* ========================= LOGOUT ========================= */

    const logoutLink =
        document.getElementById("logoutLink");

    if (logoutLink) {

        logoutLink.addEventListener(
            "click",
            function (event) {

                if (
                    !window.confirm(
                        "Are you sure you want to logout?"
                    )
                ) {

                    event.preventDefault();

                }

            }
        );

    }


    /* ========================= INITIAL LOAD ========================= */

    filterVehicles();

});