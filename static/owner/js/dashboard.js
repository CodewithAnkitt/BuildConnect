/* =========================================================
   BUILDCONNECT — VEHICLE OWNER DASHBOARD JS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE SIDEBAR
    ===================================================== */

    const sidebar = document.querySelector(".owner-sidebar");
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");

    if (mobileMenuBtn && sidebar) {

        mobileMenuBtn.addEventListener("click", function () {

            sidebar.classList.toggle("mobile-open");

            const icon = mobileMenuBtn.querySelector("i");

            if (sidebar.classList.contains("mobile-open")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });

    }


    /* =====================================================
       CLOSE SIDEBAR WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", function (event) {

        if (!sidebar || !mobileMenuBtn) {
            return;
        }

        if (
            window.innerWidth <= 760 &&
            sidebar.classList.contains("mobile-open") &&
            !sidebar.contains(event.target) &&
            !mobileMenuBtn.contains(event.target)
        ) {

            sidebar.classList.remove("mobile-open");

            const icon = mobileMenuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    /* =====================================================
       SEARCH
    ===================================================== */

    const searchInput = document.getElementById("globalSearch");

    if (searchInput) {

        searchInput.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {

                const searchValue = searchInput.value.trim();

                if (searchValue !== "") {

                    showToast(
                        `Searching for "${searchValue}"...`
                    );

                }

            }

        });

    }


    /* =====================================================
       CTRL + K SEARCH SHORTCUT
    ===================================================== */

    document.addEventListener("keydown", function (event) {

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            if (searchInput) {

                searchInput.focus();

                searchInput.select();

            }

        }

    });


    /* =====================================================
       NOTIFICATION
    ===================================================== */

    const notificationBtn =
        document.getElementById("notificationBtn");

    if (notificationBtn) {

        notificationBtn.addEventListener("click", function () {

            showToast(
                "You have 5 pending rental requests."
            );

        });

    }


    /* =====================================================
       ACCEPT REQUEST
    ===================================================== */

    const acceptButtons =
        document.querySelectorAll(".accept-btn");

    acceptButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const row = button.closest("tr");

            if (!row) {
                return;
            }

            const status =
                row.querySelector(".status");

            if (status) {

                status.className =
                    "status accepted-status";

                status.innerHTML =
                    "<i></i> Accepted";

            }

            const actionArea =
                row.querySelector(".action-buttons");

            if (actionArea) {

                actionArea.innerHTML = `
                    <button class="view-btn">
                        View
                    </button>
                `;

                const viewButton =
                    actionArea.querySelector(".view-btn");

                viewButton.addEventListener(
                    "click",
                    function () {

                        showToast(
                            "Rental request accepted."
                        );

                    }
                );

            }

            showToast(
                "Rental request accepted successfully."
            );

        });

    });


    /* =====================================================
       REJECT REQUEST
    ===================================================== */

    const rejectButtons =
        document.querySelectorAll(".reject-btn");

    rejectButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const row = button.closest("tr");

            if (!row) {
                return;
            }

            const status =
                row.querySelector(".status");

            if (status) {

                status.className =
                    "status rejected-status";

                status.innerHTML =
                    "<i></i> Rejected";

                status.style.background =
                    "#fff0ef";

                status.style.color =
                    "#d9584d";

            }

            const actionArea =
                row.querySelector(".action-buttons");

            if (actionArea) {

                actionArea.innerHTML =
                    `<button class="view-btn">
                        View
                    </button>`;
            }

            showToast(
                "Rental request rejected."
            );

        });

    });


    /* =====================================================
       VEHICLE THREE-DOT MENU
    ===================================================== */

    const vehicleMenus =
        document.querySelectorAll(".vehicle-menu");

    vehicleMenus.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.stopPropagation();

            const vehicleItem =
                button.closest(".vehicle-item");

            if (!vehicleItem) {
                return;
            }

            const vehicleName =
                vehicleItem.querySelector(
                    ".vehicle-details strong"
                );

            if (vehicleName) {

                showToast(
                    `${vehicleName.textContent.trim()} options selected.`
                );

            }

        });

    });


    /* =====================================================
       EARNINGS PERIOD
    ===================================================== */

    const earningsPeriod =
        document.getElementById("earningsPeriod");

    if (earningsPeriod) {

        earningsPeriod.addEventListener("change", function () {

            showToast(
                `Showing ${earningsPeriod.value.toLowerCase()} earnings.`
            );

        });

    }


    /* =====================================================
       QUICK ACTION ANIMATION
    ===================================================== */

    const quickActions =
        document.querySelectorAll(".quick-action");

    quickActions.forEach(function (action) {

        action.addEventListener("mouseenter", function () {

            const icon =
                action.querySelector(".quick-icon");

            if (icon) {

                icon.style.transform =
                    "scale(1.08)";

                icon.style.transition =
                    "transform 0.2s ease";

            }

        });

        action.addEventListener("mouseleave", function () {

            const icon =
                action.querySelector(".quick-icon");

            if (icon) {

                icon.style.transform =
                    "scale(1)";

            }

        });

    });


    /* =====================================================
       KPI NUMBER ANIMATION
    ===================================================== */

    const statNumbers =
        document.querySelectorAll(".stat-content strong");

    statNumbers.forEach(function (element) {

        element.style.opacity = "0";
        element.style.transform = "translateY(8px)";

        setTimeout(function () {

            element.style.transition =
                "opacity 0.5s ease, transform 0.5s ease";

            element.style.opacity = "1";
            element.style.transform = "translateY(0)";

        }, 150);

    });


    /* =====================================================
       TOAST FUNCTION
    ===================================================== */

    function showToast(message) {

        const toast =
            document.getElementById("ownerToast");

        const toastMessage =
            document.getElementById("toastMessage");

        if (!toast || !toastMessage) {
            return;
        }

        toastMessage.textContent = message;

        toast.classList.add("show");

        clearTimeout(window.ownerToastTimer);

        window.ownerToastTimer =
            setTimeout(function () {

                toast.classList.remove("show");

            }, 2800);

    }


    /* =====================================================
       ACTIVE SIDEBAR
       Frontend-only visual behavior.
       Django URLs still control actual navigation.
    ===================================================== */

    const sidebarLinks =
        document.querySelectorAll(".sidebar-link");

    sidebarLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (
                link.classList.contains("logout-link")
            ) {
                return;
            }

            sidebarLinks.forEach(function (item) {

                item.classList.remove("active");

            });

            link.classList.add("active");

        });

    });


    /* =====================================================
       SMOOTH BAR ANIMATION
    ===================================================== */

    const bars =
        document.querySelectorAll(".bar");

    bars.forEach(function (bar, index) {

        bar.style.animationDelay =
            `${index * 0.05}s`;

    });


});