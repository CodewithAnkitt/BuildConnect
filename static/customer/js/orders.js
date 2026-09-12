/* =========================================================
   BUILD CONNECT
   MY ORDERS JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const body =
        document.body;

    const sidebar =
        document.getElementById("sidebar");

    const sidebarToggle =
        document.getElementById("sidebarToggle");

    const sidebarOverlay =
        document.getElementById("sidebarOverlay");

    const notificationBtn =
        document.getElementById("notificationBtn");

    const profileDropdownBtn =
        document.getElementById("profileDropdownBtn");

    const logoutBtn =
        document.getElementById("logoutBtn");


    const orderCards =
        document.querySelectorAll(".order-card");

    const orderTabs =
        document.querySelectorAll(".order-tab");

    const orderSearch =
        document.getElementById("orderSearch");

    const materialFilter =
        document.getElementById("materialFilter");

    const timeFilter =
        document.getElementById("timeFilter");

    const sortFilter =
        document.getElementById("sortFilter");

    const emptyOrders =
        document.getElementById("emptyOrders");

    const clearFilters =
        document.getElementById("clearFilters");

    const orderCount =
        document.getElementById("orderCount");


    /* =====================================================
       SIDEBAR
    ====================================================== */

    function isMobile() {

        return window.innerWidth <= 850;

    }


    function toggleSidebar() {

        if (isMobile()) {

            body.classList.toggle(
                "sidebar-open"
            );

        } else {

            body.classList.toggle(
                "sidebar-collapsed"
            );

        }

    }


    function closeSidebar() {

        body.classList.remove(
            "sidebar-open"
        );

    }


    if (sidebarToggle) {

        sidebarToggle.addEventListener(
            "click",
            toggleSidebar
        );

    }


    if (sidebarOverlay) {

        sidebarOverlay.addEventListener(
            "click",
            closeSidebar
        );

    }


    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeSidebar();

                closeModal();

            }

        }
    );



    /* =====================================================
       SIDEBAR NAVIGATION
    ====================================================== */

    const sidebarLinks =
        document.querySelectorAll(
            ".sidebar-link"
        );


    sidebarLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const action =
                        link.dataset.action;

                    const href =
                        link.getAttribute("href");


                    /*
                       Real Django links should
                       navigate normally.
                    */

                    if (
                        href &&
                        href !== "#" &&
                        !action
                    ) {

                        if (isMobile()) {
                            closeSidebar();
                        }

                        return;

                    }


                    if (action) {

                        event.preventDefault();

                        showToast(
                            getActionTitle(action),
                            getActionMessage(action)
                        );

                        if (isMobile()) {
                            closeSidebar();
                        }

                    }

                }
            );

        }
    );


    function getActionTitle(action) {

        const titles = {

            vehicles: "Rent Vehicles",

            rentals: "My Rentals",

            profile: "Profile",

            settings: "Settings"

        };

        return titles[action] ||
            "BuildConnect";

    }


    function getActionMessage(action) {

        const messages = {

            vehicles:
                "Vehicle rental services will be available here.",

            rentals:
                "Your vehicle rental requests will appear here.",

            profile:
                "Your customer profile will be available here.",

            settings:
                "Dashboard settings will be available here."

        };

        return messages[action] ||
            "This feature is coming soon.";

    }



    /* =====================================================
       TOAST
    ====================================================== */

    const toast =
        document.getElementById("bcToast");

    const toastTitle =
        document.getElementById("toastTitle");

    const toastMessage =
        document.getElementById("toastMessage");

    const toastClose =
        document.getElementById("toastClose");

    let toastTimer;


    function showToast(title, message) {

        if (!toast) {
            return;
        }


        clearTimeout(toastTimer);


        toastTitle.textContent =
            title;

        toastMessage.textContent =
            message;


        toast.classList.add(
            "show"
        );


        toastTimer =
            setTimeout(
                function () {

                    toast.classList.remove(
                        "show"
                    );

                },
                3500
            );

    }


    if (toastClose) {

        toastClose.addEventListener(
            "click",
            function () {

                toast.classList.remove(
                    "show"
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
                    "Notifications",
                    "You don't have any new notifications."
                );

            }
        );

    }



    /* =====================================================
       PROFILE
    ====================================================== */

    if (profileDropdownBtn) {

        profileDropdownBtn.addEventListener(
            "click",
            function () {

                showToast(
                    "Customer Account",
                    "Profile and account options will be available here."
                );

            }
        );

    }



    /* =====================================================
       LOGOUT
    ====================================================== */

    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const confirmed =
                    window.confirm(
                        "Are you sure you want to logout?"
                    );


                if (confirmed) {

                    window.location.href =
                        "/login/";

                }

            }
        );

    }



    /* =====================================================
       ACTIVE TAB
    ====================================================== */

    let currentStatus =
        "all";


    orderTabs.forEach(
        function (tab) {

            tab.addEventListener(
                "click",
                function () {

                    orderTabs.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    tab.classList.add(
                        "active"
                    );


                    currentStatus =
                        tab.dataset.status;


                    filterOrders();

                }
            );

        }
    );



    /* =====================================================
       SEARCH
    ====================================================== */

    if (orderSearch) {

        orderSearch.addEventListener(
            "input",
            filterOrders
        );

    }



    /* =====================================================
       MATERIAL FILTER
    ====================================================== */

    if (materialFilter) {

        materialFilter.addEventListener(
            "change",
            filterOrders
        );

    }



    /* =====================================================
       TIME FILTER
    ====================================================== */

    if (timeFilter) {

        timeFilter.addEventListener(
            "change",
            filterOrders
        );

    }



    /* =====================================================
       SORT
    ====================================================== */

    if (sortFilter) {

        sortFilter.addEventListener(
            "change",
            sortOrders
        );

    }



    /* =====================================================
       FILTER ORDERS
    ====================================================== */

    function filterOrders() {

        const searchText =
            orderSearch
                ? orderSearch.value
                    .toLowerCase()
                    .trim()
                : "";


        const selectedMaterial =
            materialFilter
                ? materialFilter.value
                : "all";


        let visibleCount = 0;


        orderCards.forEach(
            function (card) {

                const status =
                    card.dataset.status;

                const material =
                    card.dataset.material;

                const text =
                    card.textContent.toLowerCase();


                let show =
                    true;


                /* STATUS */

                if (
                    currentStatus !== "all" &&
                    status !== currentStatus
                ) {

                    show = false;

                }


                /* MATERIAL */

                if (
                    selectedMaterial !== "all" &&
                    material !== selectedMaterial
                ) {

                    show = false;

                }


                /* SEARCH */

                if (
                    searchText &&
                    !text.includes(searchText)
                ) {

                    show = false;

                }


                if (show) {

                    card.style.display =
                        "grid";

                    visibleCount++;

                } else {

                    card.style.display =
                        "none";

                }

            }
        );


        updateEmptyState(
            visibleCount
        );


        updateCount(
            visibleCount
        );

    }



    /* =====================================================
       SORT ORDERS
    ====================================================== */

    function sortOrders() {

        const list =
            document.getElementById(
                "ordersList"
            );


        const cards =
            Array.from(
                list.querySelectorAll(
                    ".order-card"
                )
            );


        const sortValue =
            sortFilter.value;


        cards.sort(
            function (a, b) {

                if (
                    sortValue === "newest"
                ) {

                    return new Date(
                        b.dataset.date
                    ) -
                    new Date(
                        a.dataset.date
                    );

                }


                if (
                    sortValue === "oldest"
                ) {

                    return new Date(
                        a.dataset.date
                    ) -
                    new Date(
                        b.dataset.date
                    );

                }


                if (
                    sortValue === "amount-high"
                ) {

                    return Number(
                        b.dataset.amount
                    ) -
                    Number(
                        a.dataset.amount
                    );

                }


                if (
                    sortValue === "amount-low"
                ) {

                    return Number(
                        a.dataset.amount
                    ) -
                    Number(
                        b.dataset.amount
                    );

                }


                return 0;

            }
        );


        cards.forEach(
            function (card) {

                list.appendChild(
                    card
                );

            }
        );


        filterOrders();

    }



    /* =====================================================
       EMPTY STATE
    ====================================================== */

    function updateEmptyState(
        visibleCount
    ) {

        if (!emptyOrders) {
            return;
        }


        if (visibleCount === 0) {

            emptyOrders.classList.add(
                "show"
            );

        } else {

            emptyOrders.classList.remove(
                "show"
            );

        }

    }



    /* =====================================================
       COUNT
    ====================================================== */

    function updateCount(
        count
    ) {

        if (!orderCount) {
            return;
        }


        if (count === 0) {

            orderCount.textContent =
                "Showing 0 orders";

        } else {

            orderCount.textContent =
                `Showing 1–${count} of ${count} orders`;

        }

    }



    /* =====================================================
       CLEAR FILTERS
    ====================================================== */

    if (clearFilters) {

        clearFilters.addEventListener(
            "click",
            function () {

                currentStatus =
                    "all";


                orderTabs.forEach(
                    function (tab) {

                        tab.classList.remove(
                            "active"
                        );

                    }
                );


                document
                    .querySelector(
                        '.order-tab[data-status="all"]'
                    )
                    .classList.add(
                        "active"
                    );


                if (orderSearch) {
                    orderSearch.value = "";
                }


                if (materialFilter) {
                    materialFilter.value =
                        "all";
                }


                if (timeFilter) {
                    timeFilter.value =
                        "all";
                }


                filterOrders();

            }
        );

    }



    /* =====================================================
       ORDER DETAILS MODAL
    ====================================================== */

    const orderModal =
        document.getElementById(
            "orderModal"
        );

    const modalClose =
        document.getElementById(
            "modalClose"
        );

    const modalCloseBottom =
        document.getElementById(
            "modalCloseBottom"
        );


    const modalOrderTitle =
        document.getElementById(
            "modalOrderTitle"
        );

    const modalOrderMaterial =
        document.getElementById(
            "modalOrderMaterial"
        );

    const modalSupplier =
        document.getElementById(
            "modalSupplier"
        );

    const modalLocation =
        document.getElementById(
            "modalLocation"
        );

    const modalQuantity =
        document.getElementById(
            "modalQuantity"
        );

    const modalAmount =
        document.getElementById(
            "modalAmount"
        );

    const modalDate =
        document.getElementById(
            "modalDate"
        );

    const modalStatusBadge =
        document.getElementById(
            "modalStatusBadge"
        );



    /* =====================================================
       ORDER DATA
    ====================================================== */

    const ordersData = {

        BC25091201: {

            material: "Coal",

            supplier:
                "Eastern Coal Suppliers",

            location:
                "Dhanbad, Jharkhand",

            quantity:
                "50 Ton",

            amount:
                "₹ 62,500",

            date:
                "12 Sep 2025",

            status:
                "Pending"

        },


        BC25091108: {

            material: "Sand",

            supplier:
                "Shree Balaji Traders",

            location:
                "Ranchi, Jharkhand",

            quantity:
                "100 Ton",

            amount:
                "₹ 85,000",

            date:
                "11 Sep 2025",

            status:
                "Confirmed"

        },


        BC25090816: {

            material:
                "Crushed Stone",

            supplier:
                "Jharkhand Minerals",

            location:
                "Bokaro, Jharkhand",

            quantity:
                "75 Ton",

            amount:
                "₹ 52,500",

            date:
                "08 Sep 2025",

            status:
                "In Transit"

        },


        BC25090511: {

            material:
                "Fly Ash",

            supplier:
                "ABC Cement Supplies",

            location:
                "Patna, Bihar",

            quantity:
                "60 Ton",

            amount:
                "₹ 36,000",

            date:
                "05 Sep 2025",

            status:
                "Delivered"

        },


        BC25090104: {

            material:
                "Soil",

            supplier:
                "Local Suppliers",

            location:
                "Ranchi, Jharkhand",

            quantity:
                "120 Ton",

            amount:
                "₹ 48,000",

            date:
                "01 Sep 2025",

            status:
                "Delivered"

        }

    };



    /* =====================================================
       OPEN MODAL
    ====================================================== */

    const viewButtons =
        document.querySelectorAll(
            ".view-button"
        );


    viewButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const orderId =
                        button.dataset.order;

                    openOrderModal(
                        orderId
                    );

                }
            );

        }
    );


    function openOrderModal(
        orderId
    ) {

        const order =
            ordersData[orderId];


        if (!order) {
            return;
        }


        modalOrderTitle.textContent =
            `Order #${orderId}`;


        modalOrderMaterial.textContent =
            order.material;


        modalSupplier.textContent =
            order.supplier;


        modalLocation.textContent =
            order.location;


        modalQuantity.textContent =
            order.quantity;


        modalAmount.textContent =
            order.amount;


        modalDate.textContent =
            order.date;


        modalStatusBadge.textContent =
            order.status;


        modalStatusBadge.className =
            "status-modal " +
            getStatusClass(
                order.status
            );


        orderModal.classList.add(
            "show"
        );


        body.style.overflow =
            "hidden";

    }


    function getStatusClass(
        status
    ) {

        if (
            status === "Confirmed"
        ) {

            return "confirmed";

        }

        if (
            status === "In Transit"
        ) {

            return "transit";

        }

        if (
            status === "Delivered"
        ) {

            return "delivered";

        }

        return "pending";

    }



    /* =====================================================
       CLOSE MODAL
    ====================================================== */

    function closeModal() {

        if (!orderModal) {
            return;
        }


        orderModal.classList.remove(
            "show"
        );


        body.style.overflow =
            "";

    }


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeModal
        );

    }


    if (modalCloseBottom) {

        modalCloseBottom.addEventListener(
            "click",
            closeModal
        );

    }


    if (orderModal) {

        orderModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    orderModal
                ) {

                    closeModal();

                }

            }
        );

    }



    /* =====================================================
       CANCEL ORDER
    ====================================================== */

    const cancelButtons =
        document.querySelectorAll(
            ".cancel-button"
        );


    cancelButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const confirmed =
                        window.confirm(
                            "Are you sure you want to cancel this order?"
                        );


                    if (confirmed) {

                        showToast(
                            "Order Cancellation",
                            "Your cancellation request has been submitted."
                        );

                    }

                }
            );

        }
    );



    /* =====================================================
       REORDER
    ====================================================== */

    const reorderButtons =
        document.querySelectorAll(
            ".reorder-button"
        );


    reorderButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    showToast(
                        "Reorder",
                        "The material has been added to your order request."
                    );

                }
            );

        }
    );



    /* =====================================================
       INITIAL
    ====================================================== */

    filterOrders();


    console.log(
        "BuildConnect My Orders loaded successfully."
    );

});