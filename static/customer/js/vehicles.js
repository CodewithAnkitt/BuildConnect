document.addEventListener("DOMContentLoaded", function () {


    const categoryButtons =
        document.querySelectorAll(".category-card");


    const vehicleCards =
        Array.from(
            document.querySelectorAll(".vehicle-card")
        );


    const searchInput =
        document.getElementById("vehicleSearch");


    const vehicleCount =
        document.getElementById("vehicleCount");


    const noResults =
        document.getElementById("noResults");


    const sortSelect =
        document.getElementById("sortVehicles");


    const grid =
        document.getElementById("vehicleGrid");


    const menuButton =
        document.getElementById("menuButton");


    const sidebarOverlay =
        document.querySelector(".sidebar-overlay");


    let selectedCategory = "all";


    /* =====================================================
       CATEGORY FILTER
    ===================================================== */

    categoryButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            categoryButtons.forEach(function (item) {

                item.classList.remove("active");

            });


            button.classList.add("active");


            selectedCategory =
                button.dataset.category;


            filterVehicles();

        });

    });


    /* =====================================================
       SEARCH
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterVehicles
        );

    }


    function filterVehicles() {

        const search =
            searchInput
                ? searchInput.value
                    .trim()
                    .toLowerCase()
                : "";


        let visibleCount = 0;


        vehicleCards.forEach(function (card) {

            const category =
                card.dataset.category;


            const name =
                card.dataset.name
                    .toLowerCase();


            const text =
                card.innerText
                    .toLowerCase();


            const categoryMatch =
                selectedCategory === "all" ||
                category === selectedCategory;


            const searchMatch =
                !search ||
                name.includes(search) ||
                text.includes(search);


            if (
                categoryMatch &&
                searchMatch
            ) {

                card.style.display = "";

                visibleCount++;

            } else {

                card.style.display = "none";

            }

        });


        vehicleCount.textContent =
            visibleCount;


        if (visibleCount === 0) {

            noResults.classList.add("show");

        } else {

            noResults.classList.remove("show");

        }

    }


    /* =====================================================
       SORT
    ===================================================== */

    if (sortSelect) {

        sortSelect.addEventListener(
            "change",
            function () {

                const value =
                    sortSelect.value;


                const cards =
                    Array.from(
                        grid.querySelectorAll(
                            ".vehicle-card"
                        )
                    );


                cards.sort(function (a, b) {

                    const priceA =
                        Number(a.dataset.price);


                    const priceB =
                        Number(b.dataset.price);


                    if (value === "price-low") {

                        return priceA - priceB;

                    }


                    if (value === "price-high") {

                        return priceB - priceA;

                    }


                    return 0;

                });


                cards.forEach(function (card) {

                    grid.appendChild(card);

                });


                filterVehicles();

            });

    }


    /* =====================================================
       FAVORITES
    ===================================================== */

    document
        .querySelectorAll(".favorite")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();


                    const icon =
                        button.querySelector("i");


                    button.classList.toggle(
                        "active"
                    );


                    if (
                        button.classList.contains(
                            "active"
                        )
                    ) {

                        icon.className =
                            "bi bi-heart-fill";

                        showToast(
                            "Vehicle added to favourites."
                        );

                    } else {

                        icon.className =
                            "bi bi-heart";

                        showToast(
                            "Vehicle removed from favourites."
                        );

                    }

                }
            );

        });


    /* =====================================================
       VIEW DETAILS
    ===================================================== */

    document
        .querySelectorAll(".details-button")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const card =
                        button.closest(
                            ".vehicle-card"
                        );


                    const name =
                        card.dataset.name;


                    showToast(
                        name +
                        " details will be available soon."
                    );

                }
            );

        });


    /* =====================================================
       COMING SOON LINKS
    ===================================================== */

    document
        .querySelectorAll("[data-coming-soon]")
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    showToast(
                        "This section is coming soon."
                    );

                }
            );

        });


    /* =====================================================
       MOBILE SIDEBAR
    ===================================================== */

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


    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                document.body.classList.remove(
                    "sidebar-open"
                );

            }

        }
    );


    /* =====================================================
       TOAST
    ===================================================== */

    const toast =
        document.getElementById("toast");


    let toastTimer;


    function showToast(message) {

        if (!toast) return;


        const text =
            toast.querySelector("span");


        text.textContent =
            message;


        toast.classList.add("show");


        clearTimeout(toastTimer);


        toastTimer =
            setTimeout(
                function () {

                    toast.classList.remove(
                        "show"
                    );

                },
                2500
            );

    }


});