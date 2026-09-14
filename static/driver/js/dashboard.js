/* =========================================================
   BUILD CONNECT - DRIVER DASHBOARD JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       NOTIFICATION
    ===================================================== */

    const notificationButton =
        document.querySelector(".notification-button");

    if (notificationButton) {

        notificationButton.addEventListener("click", function () {

            showDriverToast(
                "You have 3 new notifications.",
                "info"
            );

        });

    }


    /* =====================================================
       DRIVER ONLINE / OFFLINE STATUS
    ===================================================== */

    const statusCard =
        document.querySelector(".status-card");

    const statusValue =
        document.querySelector(".status-value strong");

    const onlineStatus =
        document.querySelector(".driver-online-status");

    const onlineDot =
        document.querySelector(".online-dot");

    if (statusCard && statusValue) {

        statusCard.style.cursor = "pointer";

        statusCard.addEventListener("click", function () {

            if (statusValue.textContent.trim() === "Available") {

                statusValue.textContent = "Offline";

                statusValue.style.color = "#d84b4b";

                if (onlineStatus) {
                    onlineStatus.innerHTML =
                        '<span class="online-dot"></span> Offline';

                    onlineStatus.style.background = "#fbeaea";
                    onlineStatus.style.color = "#c94141";
                }

                if (onlineDot) {
                    onlineDot.style.background = "#d84b4b";
                }

                showDriverToast(
                    "You are now offline. New jobs will not be shown.",
                    "warning"
                );

            } else {

                statusValue.textContent = "Available";

                statusValue.style.color = "#159a55";

                if (onlineStatus) {
                    onlineStatus.innerHTML =
                        '<span class="online-dot"></span> Online';

                    onlineStatus.style.background = "#e6f8ee";
                    onlineStatus.style.color = "#149b55";
                }

                showDriverToast(
                    "You are now available for new jobs.",
                    "success"
                );

            }

        });

    }


    /* =====================================================
       VIEW ROUTE
    ===================================================== */

    const routeButton =
        document.querySelector(".route-button");

    if (routeButton) {

        routeButton.addEventListener("click", function () {

            showDriverToast(
                "Route details will be available when map integration is connected.",
                "info"
            );

        });

    }


    /* =====================================================
       UPDATE JOB STATUS
    ===================================================== */

    const statusButton =
        document.querySelector(".status-button");

    if (statusButton) {

        statusButton.addEventListener("click", function () {

            const existingMenu =
                document.querySelector(".job-status-menu");

            if (existingMenu) {
                existingMenu.remove();
                return;
            }


            const menu =
                document.createElement("div");

            menu.className = "job-status-menu";

            menu.innerHTML = `
                <button data-status="In Progress">
                    <i class="fa-solid fa-road"></i>
                    In Progress
                </button>

                <button data-status="Picked Up">
                    <i class="fa-solid fa-box"></i>
                    Picked Up
                </button>

                <button data-status="Out for Delivery">
                    <i class="fa-solid fa-truck-fast"></i>
                    Out for Delivery
                </button>

                <button data-status="Delivered">
                    <i class="fa-solid fa-circle-check"></i>
                    Delivered
                </button>
            `;


            document.body.appendChild(menu);


            const rect =
                statusButton.getBoundingClientRect();

            menu.style.position = "fixed";

            menu.style.top =
                `${rect.bottom + 7}px`;

            menu.style.left =
                `${rect.left}px`;


            menu.querySelectorAll("button")
                .forEach(function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            const newStatus =
                                this.dataset.status;

                            const jobStatus =
                                document.querySelector(
                                    ".job-status"
                                );

                            if (jobStatus) {

                                jobStatus.textContent =
                                    newStatus;

                                if (newStatus === "Delivered") {

                                    jobStatus.style.background =
                                        "#dff7e9";

                                    jobStatus.style.color =
                                        "#149654";

                                } else {

                                    jobStatus.style.background =
                                        "#bdf1d1";

                                    jobStatus.style.color =
                                        "#119550";

                                }

                            }

                            menu.remove();

                            showDriverToast(
                                `Job status updated to "${newStatus}".`,
                                "success"
                            );

                        }
                    );

                });

        });

    }


    /* =====================================================
       CLOSE STATUS MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", function (event) {

        const menu =
            document.querySelector(".job-status-menu");

        const button =
            document.querySelector(".status-button");

        if (
            menu &&
            button &&
            !menu.contains(event.target) &&
            !button.contains(event.target)
        ) {

            menu.remove();

        }

    });


    /* =====================================================
       QUICK ACTION - UPDATE AVAILABILITY
    ===================================================== */

    const availabilityAction =
        document.querySelector(
            ".availability-action"
        );

    if (availabilityAction) {

        availabilityAction.addEventListener(
            "click",
            function () {

                if (statusCard) {

                    statusCard.click();

                }

            }
        );

    }


    /* =====================================================
       EARNINGS PERIOD
    ===================================================== */

    const periodSelect =
        document.querySelector(".period-select");

    const earningsAmount =
        document.querySelector(".earnings-total strong");

    if (periodSelect && earningsAmount) {

        periodSelect.addEventListener(
            "change",
            function () {

                const selected =
                    this.value;

                if (selected === "This Week") {

                    earningsAmount.textContent =
                        "₹12,500";

                }

                else if (selected === "This Month") {

                    earningsAmount.textContent =
                        "₹48,700";

                }

                else if (selected === "This Year") {

                    earningsAmount.textContent =
                        "₹5,62,400";

                }

                showDriverToast(
                    `${selected} earnings loaded.`,
                    "info"
                );

            }
        );

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    const searchInput =
        document.querySelector(
            ".driver-search input"
        );

    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    const searchValue =
                        this.value.trim();

                    if (searchValue === "") {

                        showDriverToast(
                            "Please enter a job, location, or material.",
                            "warning"
                        );

                        return;

                    }

                    showDriverToast(
                        `Searching for "${searchValue}"...`,
                        "info"
                    );

                }

            }
        );

    }


    /* =====================================================
       PROFILE CLICK
    ===================================================== */

    const topProfile =
        document.querySelector(".top-profile");

    if (topProfile) {

        topProfile.style.cursor = "pointer";

        topProfile.addEventListener(
            "click",
            function () {

                window.location.href =
                    "/driver/profile/";

            }
        );

    }


    /* =====================================================
       MOBILE SIDEBAR
    ===================================================== */

    createMobileMenu();


    /* =====================================================
       ADD STATUS MENU CSS
    ===================================================== */

    addStatusMenuStyles();

});



/* =========================================================
   DRIVER TOAST
   ========================================================= */

function showDriverToast(message, type = "info") {

    const oldToast =
        document.querySelector(".driver-toast");

    if (oldToast) {
        oldToast.remove();
    }


    const toast =
        document.createElement("div");

    toast.className =
        `driver-toast driver-toast-${type}`;


    let icon =
        "fa-circle-info";

    if (type === "success") {
        icon = "fa-circle-check";
    }

    if (type === "warning") {
        icon = "fa-triangle-exclamation";
    }


    toast.innerHTML = `
        <i class="fa-solid ${icon}"></i>
        <span>${message}</span>
        <button aria-label="Close">
            <i class="fa-solid fa-xmark"></i>
        </button>
    `;


    document.body.appendChild(toast);


    setTimeout(function () {

        toast.classList.add("show");

    }, 20);


    const closeButton =
        toast.querySelector("button");

    closeButton.addEventListener(
        "click",
        function () {

            toast.classList.remove("show");

            setTimeout(function () {
                toast.remove();
            }, 250);

        }
    );


    setTimeout(function () {

        if (toast.parentNode) {

            toast.classList.remove("show");

            setTimeout(function () {

                if (toast.parentNode) {
                    toast.remove();
                }

            }, 250);

        }

    }, 3500);

}



/* =========================================================
   MOBILE MENU
   ========================================================= */

function createMobileMenu() {

    const sidebar =
        document.querySelector(".driver-sidebar");

    const topbar =
        document.querySelector(".driver-topbar");

    if (!sidebar || !topbar) {
        return;
    }


    const menuButton =
        document.createElement("button");

    menuButton.className =
        "driver-mobile-menu";

    menuButton.innerHTML =
        '<i class="fa-solid fa-bars"></i>';

    menuButton.setAttribute(
        "aria-label",
        "Open navigation"
    );


    topbar.insertBefore(
        menuButton,
        topbar.firstChild
    );


    menuButton.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            sidebar.classList.toggle("open");

        }
    );


    document.addEventListener(
        "click",
        function (event) {

            if (
                window.innerWidth <= 760 &&
                sidebar.classList.contains("open") &&
                !sidebar.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {

                sidebar.classList.remove("open");

            }

        }
    );

}



/* =========================================================
   DYNAMIC CSS FOR TOAST + STATUS MENU
   ========================================================= */

function addStatusMenuStyles() {

    if (
        document.querySelector(
            "#driver-dashboard-dynamic-style"
        )
    ) {
        return;
    }


    const style =
        document.createElement("style");

    style.id =
        "driver-dashboard-dynamic-style";


    style.textContent = `

        /* STATUS MENU */

        .job-status-menu {
            width: 190px;

            background: #ffffff;

            border: 1px solid #e1e7ed;

            border-radius: 9px;

            padding: 6px;

            box-shadow:
                0 10px 30px rgba(20, 35, 50, 0.15);

            z-index: 9999;
        }

        .job-status-menu button {
            width: 100%;

            border: none;

            background: transparent;

            padding: 10px 11px;

            border-radius: 6px;

            text-align: left;

            cursor: pointer;

            font-size: 12px;

            color: #253645;

            display: flex;

            align-items: center;

            gap: 9px;
        }

        .job-status-menu button:hover {
            background: #f1f6fa;
        }

        .job-status-menu button i {
            width: 17px;

            color: #267fe1;

            text-align: center;
        }


        /* TOAST */

        .driver-toast {
            position: fixed;

            right: 24px;

            bottom: 24px;

            max-width: 380px;

            min-width: 280px;

            padding: 13px 14px;

            background: #ffffff;

            border: 1px solid #e0e6ec;

            border-radius: 9px;

            box-shadow:
                0 10px 35px rgba(20, 35, 50, 0.16);

            display: flex;

            align-items: center;

            gap: 10px;

            z-index: 10000;

            opacity: 0;

            transform: translateY(15px);

            transition:
                opacity 0.25s ease,
                transform 0.25s ease;

            font-size: 12px;

            color: #273746;
        }

        .driver-toast.show {
            opacity: 1;

            transform: translateY(0);
        }

        .driver-toast > i {
            font-size: 18px;
        }

        .driver-toast-success > i {
            color: #18a25a;
        }

        .driver-toast-info > i {
            color: #398be5;
        }

        .driver-toast-warning > i {
            color: #e69b14;
        }

        .driver-toast span {
            flex: 1;

            line-height: 1.4;
        }

        .driver-toast button {
            border: none;

            background: transparent;

            cursor: pointer;

            color: #7d8995;

            font-size: 13px;

            padding: 3px;
        }

        .driver-toast button:hover {
            color: #263746;
        }


        /* MOBILE MENU BUTTON */

        .driver-mobile-menu {
            display: none;

            width: 38px;

            height: 38px;

            border: 1px solid #e0e6ec;

            background: #ffffff;

            border-radius: 8px;

            color: #263747;

            cursor: pointer;

            font-size: 17px;

            align-items: center;

            justify-content: center;
        }


        @media (max-width: 760px) {

            .driver-mobile-menu {
                display: flex;
            }

        }


        @media (max-width: 600px) {

            .driver-toast {
                left: 12px;

                right: 12px;

                bottom: 15px;

                min-width: 0;

                max-width: none;
            }

        }

    `;


    document.head.appendChild(style);

}