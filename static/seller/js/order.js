/* =========================================================
   BUILD CONNECT
   SELLER - ORDERS
   Frontend Only
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const sidebar =
        document.getElementById("sidebar");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const globalSearch =
        document.getElementById("globalSearch");

    const orderSearch =
        document.getElementById("orderSearch");

    const statusFilter =
        document.getElementById("statusFilter");

    const sortFilter =
        document.getElementById("sortFilter");

    const dateFilter =
        document.getElementById("dateFilter");

    const tableBody =
        document.getElementById("ordersTableBody");

    const resultCount =
        document.getElementById("resultCount");

    const notificationBtn =
        document.getElementById("notificationBtn");

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");


    /* =====================================================
       MOBILE SIDEBAR
    ====================================================== */

    mobileMenu.addEventListener("click", () => {

        sidebar.classList.toggle("open");

    });


    /* =====================================================
       TOAST
    ====================================================== */

    function showToast(message) {

        toastMessage.textContent =
            message;

        toast.classList.add("show");

        setTimeout(() => {

            toast.classList.remove("show");

        }, 2500);

    }


    /* =====================================================
       GLOBAL SEARCH
    ====================================================== */

    document.addEventListener("keydown", (event) => {

        if (
            (event.ctrlKey ||
                event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            globalSearch.focus();

        }

    });


    /* =====================================================
       NOTIFICATION
    ====================================================== */

    notificationBtn.addEventListener(
        "click",
        () => {

            showToast(
                "You have 1 new order notification."
            );

        }
    );


    /* =====================================================
       FILTER ORDERS
    ====================================================== */

    function filterOrders() {

        const searchValue =
            orderSearch.value
                .toLowerCase()
                .trim();

        const statusValue =
            statusFilter.value;

        const rows =
            Array.from(
                tableBody.querySelectorAll("tr")
            );


        let visibleRows = [];


        rows.forEach(row => {

            const rowText =
                row.innerText.toLowerCase();

            const rowStatus =
                row.dataset.status;


            const matchesSearch =
                searchValue === "" ||
                rowText.includes(searchValue);


            const matchesStatus =
                statusValue === "all" ||
                rowStatus === statusValue;


            if (
                matchesSearch &&
                matchesStatus
            ) {

                row.style.display = "";

                visibleRows.push(row);

            } else {

                row.style.display = "none";

            }

        });


        updateResultCount(
            visibleRows.length
        );

    }


    /* =====================================================
       RESULT COUNT
    ====================================================== */

    function updateResultCount(count) {

        if (count === 0) {

            resultCount.textContent =
                "No orders found.";

            return;

        }

        resultCount.textContent =
            `Showing 1 - ${count} of 24 orders`;

    }


    /* =====================================================
       SEARCH EVENTS
    ====================================================== */

    orderSearch.addEventListener(
        "input",
        filterOrders
    );


    statusFilter.addEventListener(
        "change",
        filterOrders
    );


    /* =====================================================
       SORT
    ====================================================== */

    sortFilter.addEventListener(
        "change",
        () => {

            const rows =
                Array.from(
                    tableBody.querySelectorAll("tr")
                );


            const sortValue =
                sortFilter.value;


            if (
                sortValue === "amount-high" ||
                sortValue === "amount-low"
            ) {

                rows.sort((a, b) => {

                    const amountA =
                        Number(
                            a.dataset.amount
                        );

                    const amountB =
                        Number(
                            b.dataset.amount
                        );


                    if (
                        sortValue === "amount-high"
                    ) {

                        return amountB - amountA;

                    }

                    return amountA - amountB;

                });

            }


            rows.forEach(row => {

                tableBody.appendChild(row);

            });


            showToast(
                "Orders sorted successfully."
            );

        }
    );


    /* =====================================================
       DATE FILTER
    ====================================================== */

    dateFilter.addEventListener(
        "change",
        () => {

            if (
                dateFilter.value !==
                "Date Range"
            ) {

                showToast(
                    `${dateFilter.value} selected.`
                );

            }

        }
    );


    /* =====================================================
       VIEW DETAILS
    ====================================================== */

    document.addEventListener(
        "click",
        (event) => {

            const button =
                event.target.closest(
                    ".view-btn"
                );


            if (!button) {
                return;
            }


            const orderId =
                button.dataset.order;


            showToast(
                `Opening details for ${orderId}.`
            );

        }
    );


    /* =====================================================
       MORE OPTIONS
    ====================================================== */

    document.addEventListener(
        "click",
        (event) => {

            const button =
                event.target.closest(
                    ".more-btn"
                );


            if (!button) {
                return;
            }


            showToast(
                "More order options will be available here."
            );

        }
    );


    /* =====================================================
       PAGINATION
    ====================================================== */

    const pageButtons =
        document.querySelectorAll(
            ".page-btn"
        );


    pageButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                if (
                    button.classList.contains(
                        "disabled"
                    )
                ) {

                    return;

                }


                if (
                    button.id ===
                    "previousPage"
                ) {

                    showToast(
                        "Previous page selected."
                    );

                    return;

                }


                if (
                    button.id ===
                    "nextPage"
                ) {

                    showToast(
                        "Next page selected."
                    );

                    return;

                }


                pageButtons.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                showToast(
                    `Page ${button.textContent.trim()} selected.`
                );

            }
        );

    });


    /* =====================================================
       COMING SOON LINKS
    ====================================================== */

    document.querySelectorAll(
        ".coming-soon"
    ).forEach(item => {

        item.addEventListener(
            "click",
            event => {

                event.preventDefault();

                showToast(
                    "This section will be connected next."
                );

            }
        );

    });


    /* =====================================================
       ANIMATION
    ====================================================== */

    const cards =
        document.querySelectorAll(
            ".summary-card, .orders-card"
        );


    cards.forEach(
        (card, index) => {

            card.style.opacity = "0";

            card.style.transform =
                "translateY(12px)";


            setTimeout(() => {

                card.style.transition =
                    "opacity .45s ease, transform .45s ease";

                card.style.opacity = "1";

                card.style.transform =
                    "translateY(0)";

            }, 80 + index * 80);

        }
    );


    /* =====================================================
       INITIAL FILTER
    ====================================================== */

    filterOrders();

});