document.addEventListener("DOMContentLoaded", function () {
    function getCookie(name) {

    let cookieValue = null;

    if (document.cookie && document.cookie !== "") {

        const cookies = document.cookie.split(";");

        for (let i = 0; i < cookies.length; i++) {

            const cookie = cookies[i].trim();

            if (
                cookie.substring(
                    0,
                    name.length + 1
                ) === name + "="
            ) {

                cookieValue = decodeURIComponent(
                    cookie.substring(
                        name.length + 1
                    )
                );

                break;
            }
        }
    }

    return cookieValue;
}

    /* =====================================================
       MOBILE SIDEBAR
    ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    if (menuBtn && sidebar) {

        menuBtn.addEventListener("click", function () {

            sidebar.classList.toggle("open");

            if (sidebarOverlay) {
                sidebarOverlay.classList.toggle("show");
            }

        });

    }

    if (sidebarOverlay) {

        sidebarOverlay.addEventListener("click", function () {

            sidebar.classList.remove("open");

            sidebarOverlay.classList.remove("show");

        });

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    const searchInput = document.getElementById("orderSearch");

    /* =====================================================
       MATERIAL FILTER
    ===================================================== */

    const materialFilter =
        document.getElementById("materialFilter");

    /* =====================================================
       SORT
    ===================================================== */

    const sortFilter =
        document.getElementById("sortFilter");

    /* =====================================================
       STATUS TABS
    ===================================================== */

    const statusTabs =
        document.querySelectorAll(".status-tab");

    /* =====================================================
       ORDER CARDS
    ===================================================== */

    const ordersList =
        document.getElementById("ordersList");

    const noResults =
        document.getElementById("noResults");


    function filterOrders() {

        if (!ordersList) {
            return;
        }

        const cards =
            Array.from(
                ordersList.querySelectorAll(".order-card")
            );

        const searchValue =
            searchInput
                ? searchInput.value.toLowerCase().trim()
                : "";

        const selectedMaterial =
            materialFilter
                ? materialFilter.value.toLowerCase()
                : "all";

        let selectedStatus = "all";

        const activeTab =
            document.querySelector(".status-tab.active");

        if (activeTab) {
            selectedStatus =
                activeTab.dataset.status;
        }


        let visibleCount = 0;


        cards.forEach(function (card) {

            const cardStatus =
                card.dataset.status;

            const cardSearch =
                (card.dataset.search || "").toLowerCase();

            const materialItems =
                card.querySelectorAll(".order-item");


            let matchesSearch =
                cardSearch.includes(searchValue);

            let matchesStatus =
                selectedStatus === "all" ||
                cardStatus === selectedStatus;


            let matchesMaterial = true;

            if (selectedMaterial !== "all") {

                matchesMaterial = false;

                materialItems.forEach(function (item) {

                    const material =
                        (item.dataset.material || "")
                            .toLowerCase();

                    if (
                        material === selectedMaterial
                    ) {
                        matchesMaterial = true;
                    }

                });

            }


            if (
                matchesSearch &&
                matchesStatus &&
                matchesMaterial
            ) {

                card.style.display = "";

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
       STATUS TAB CLICK
    ===================================================== */

    statusTabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

            statusTabs.forEach(function (item) {

                item.classList.remove("active");

            });

            tab.classList.add("active");

            filterOrders();

        });

    });


    /* =====================================================
       SEARCH INPUT
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterOrders
        );

    }


    /* =====================================================
       MATERIAL FILTER
    ===================================================== */

    if (materialFilter) {

        materialFilter.addEventListener(
            "change",
            filterOrders
        );

    }


    /* =====================================================
       SORT ORDERS
    ===================================================== */

    if (sortFilter && ordersList) {

        sortFilter.addEventListener(
            "change",
            function () {

                const cards =
                    Array.from(
                        ordersList.querySelectorAll(
                            ".order-card"
                        )
                    );


                cards.sort(function (a, b) {

                    const sortType =
                        sortFilter.value;


                    if (sortType === "newest") {

                        return (
                            new Date(b.dataset.date) -
                            new Date(a.dataset.date)
                        );

                    }


                    if (sortType === "oldest") {

                        return (
                            new Date(a.dataset.date) -
                            new Date(b.dataset.date)
                        );

                    }


                    if (sortType === "high") {

                        return (
                            Number(b.dataset.total) -
                            Number(a.dataset.total)
                        );

                    }


                    if (sortType === "low") {

                        return (
                            Number(a.dataset.total) -
                            Number(b.dataset.total)
                        );

                    }


                    return 0;

                });


                cards.forEach(function (card) {

                    ordersList.appendChild(card);

                });


                filterOrders();

            }
        );

    }


    /* =====================================================
       CLEAR FILTERS
    ===================================================== */

    const clearFilters =
        document.getElementById("clearFilters");

    if (clearFilters) {

        clearFilters.addEventListener(
            "click",
            function () {

                if (searchInput) {
                    searchInput.value = "";
                }

                if (materialFilter) {
                    materialFilter.value = "all";
                }

                if (sortFilter) {
                    sortFilter.value = "newest";
                }


                statusTabs.forEach(function (tab) {

                    tab.classList.remove("active");

                });


                const allTab =
                    document.querySelector(
                        '.status-tab[data-status="all"]'
                    );

                if (allTab) {
                    allTab.classList.add("active");
                }


                filterOrders();

            }
        );

    }


    /* =====================================================
       VIEW DETAILS MODAL
    ===================================================== */

    const detailsModal =
        document.getElementById("detailsModal");

    const modalClose =
        document.getElementById("modalClose");

    const modalOrderId =
        document.getElementById("modalOrderId");

    const modalContent =
        document.getElementById("modalContent");


    const viewButtons =
        document.querySelectorAll(
            ".view-details-btn"
        );


    viewButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const orderId =
                    button.dataset.orderId;

                const card =
                    button.closest(".order-card");

                if (!card) {
                    return;
                }


                if (modalOrderId) {
                    modalOrderId.textContent =
                        String(orderId).padStart(4, "0");
                }


                if (modalContent) {

                    const status =
                        card.querySelector(
                            ".order-status"
                        )?.innerText.trim() || "-";

                    const total =
                        card.querySelector(
                            ".order-total strong"
                        )?.innerText.trim() || "-";

                    const address =
                        card.querySelector(
                            ".delivery-box p"
                        )?.innerText.trim() || "-";

                    const date =
                        card.querySelector(
                            ".order-date"
                        )?.innerText.trim() || "-";


                    const materials =
                        Array.from(
                            card.querySelectorAll(
                                ".order-item"
                            )
                        ).map(function (item) {

                            const name =
                                item.querySelector(
                                    ".material-details h3"
                                )?.innerText.trim() || "-";

                            const quantity =
                                item.querySelector(
                                    ".item-info div:first-child strong"
                                )?.innerText.trim() || "-";

                            const price =
                                item.querySelector(
                                    ".item-info div:nth-child(2) strong"
                                )?.innerText.trim() || "-";

                            return `
                                <div class="modal-detail-row">
                                    <span>Material</span>
                                    <strong>${name}</strong>
                                </div>

                                <div class="modal-detail-row">
                                    <span>Quantity</span>
                                    <strong>${quantity}</strong>
                                </div>

                                <div class="modal-detail-row">
                                    <span>Price / Unit</span>
                                    <strong>${price}</strong>
                                </div>
                            `;

                        }).join("");


                    modalContent.innerHTML = `

                        <div class="modal-detail-row">
                            <span>Status</span>
                            <strong>${status}</strong>
                        </div>

                        ${materials}

                        <div class="modal-detail-row">
                            <span>Order Date</span>
                            <strong>${date}</strong>
                        </div>

                        <div class="modal-detail-row">
                            <span>Delivery Address</span>
                            <strong>${address}</strong>
                        </div>

                        <div class="modal-detail-row">
                            <span>Total Amount</span>
                            <strong>${total}</strong>
                        </div>

                    `;

                }


                if (detailsModal) {

                    detailsModal.classList.add("show");

                    document.body.style.overflow =
                        "hidden";

                }

            }
        );

    });


    /* =====================================================
       CLOSE MODAL
    ===================================================== */

    function closeModal() {

        if (detailsModal) {

            detailsModal.classList.remove("show");

            document.body.style.overflow = "";

        }

    }


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeModal
        );

    }


    if (detailsModal) {

        detailsModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === detailsModal
                ) {

                    closeModal();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeModal();

            }

        }
    );


   /* =====================================================
   CANCEL ORDER
===================================================== */

const cancelButtons =
    document.querySelectorAll(".cancel-order-btn");


cancelButtons.forEach(function (button) {

    button.addEventListener("click", async function () {

        const orderId = button.dataset.orderId;

        if (!orderId) {
            return;
        }


        const confirmed = window.confirm(
            "Are you sure you want to cancel this order?"
        );


        if (!confirmed) {
            return;
        }


        /* Disable button while processing */

        const originalText = button.innerHTML;

        button.disabled = true;

        button.innerHTML = `
            <i class="bi bi-hourglass-split"></i>
            Cancelling...
        `;


        /* Get CSRF token */

        const csrfToken = getCookie("csrftoken");


        try {

            const response = await fetch(
                `/customer/order/${orderId}/cancel/`,
                {
                    method: "POST",

                    headers: {
                        "X-CSRFToken": csrfToken,

                        "X-Requested-With": "XMLHttpRequest"
                    }
                }
            );


            const data = await response.json();


            if (data.success) {

                alert(
                    "Order cancelled successfully. Stock has been restored."
                );

                /*
                 * Reload page so:
                 * - order status updates
                 * - pending count decreases
                 * - cancelled count increases
                 * - order card updates
                 */

                window.location.reload();

            } else {

                alert(
                    data.message ||
                    "Unable to cancel the order."
                );

                button.disabled = false;

                button.innerHTML = originalText;

            }


        } catch (error) {

            console.error(
                "Cancel Order Error:",
                error
            );


            alert(
                "Something went wrong while cancelling the order."
            );


            button.disabled = false;

            button.innerHTML = originalText;

        }

    });

});


    /* =====================================================
       INITIAL FILTER
    ===================================================== */

    filterOrders();

});