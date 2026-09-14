/* =========================================================
   BUILD CONNECT
   CUSTOMER DASHBOARD JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const body = document.body;

    const sidebarToggle =
        document.getElementById("sidebarToggle");

    const sidebarOverlay =
        document.getElementById("sidebarOverlay");

    const sidebar =
        document.getElementById("sidebar");

    const notificationBtn =
        document.getElementById("notificationBtn");

    const profileDropdownBtn =
        document.getElementById("profileDropdownBtn");

    const logoutBtn =
        document.getElementById("logoutBtn");

    const toast =
        document.getElementById("bcToast");

    const toastTitle =
        document.getElementById("toastTitle");

    const toastMessage =
        document.getElementById("toastMessage");

    const toastClose =
        document.getElementById("toastClose");


    /* =====================================================
       MOBILE CHECK
    ====================================================== */

    function isMobile() {
        return window.innerWidth <= 850;
    }


    /* =====================================================
       SIDEBAR
    ====================================================== */

    function toggleSidebar() {

        if (isMobile()) {

            body.classList.toggle("sidebar-open");

        } else {

            body.classList.toggle("sidebar-collapsed");

        }
    }


    function closeSidebar() {

        body.classList.remove("sidebar-open");

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


    /* =====================================================
       ESCAPE KEY
    ====================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeSidebar();

            }

        }
    );


    /* =====================================================
       WINDOW RESIZE
    ====================================================== */

    window.addEventListener(
        "resize",
        function () {

            if (!isMobile()) {

                body.classList.remove("sidebar-open");

            }

        }
    );


    /* =====================================================
       TOAST
    ====================================================== */

    let toastTimer;


    function showToast(title, message) {

        if (!toast) {
            return;
        }


        clearTimeout(toastTimer);


        if (toastTitle) {

            toastTitle.textContent = title;

        }


        if (toastMessage) {

            toastMessage.textContent = message;

        }


        toast.classList.add("show");


        toastTimer = setTimeout(
            function () {

                toast.classList.remove("show");

            },
            3500
        );

    }


    if (toastClose) {

        toastClose.addEventListener(
            "click",
            function () {

                toast.classList.remove("show");

            }
        );

    }


    /* =====================================================
       NAVIGATION HELPER
    ====================================================== */

    function goToPage(url) {

        if (!url) {
            return;
        }

        window.location.href = url;

    }


    /* =====================================================
       SIDEBAR LINKS
    ====================================================== */

    const sidebarLinks =
        document.querySelectorAll(".sidebar-link");


    sidebarLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                /* -----------------------------------------
                   LOGOUT
                   ----------------------------------------- */

                if (link.id === "logoutBtn") {

                    return;

                }


                /* -----------------------------------------
                   GET ACTION + URL
                   ----------------------------------------- */

                const action =
                    link.dataset.action;

                const href =
                    link.getAttribute("href");


                /* -----------------------------------------
                   MATERIALS
                   ----------------------------------------- */

                if (action === "materials") {

                    event.preventDefault();

                    if (isMobile()) {
                        closeSidebar();
                    }

                    /*
                       If Django URL exists in href,
                       use that URL directly.
                    */

                    if (
                        href &&
                        href !== "#" &&
                        href !== "javascript:void(0)"
                    ) {

                        goToPage(href);

                    } else {

                        goToPage(
                            "/customer/materials/"
                        );

                    }

                    return;

                }


                /* -----------------------------------------
                   NORMAL REAL LINKS
                   ----------------------------------------- */

                if (
                    href &&
                    href !== "#" &&
                    href !== "javascript:void(0)"
                ) {

                    /*
                       Let the browser/Django handle
                       the navigation normally.
                    */

                    if (isMobile()) {
                        closeSidebar();
                    }

                    return;

                }


                /* -----------------------------------------
                   DASHBOARD
                   ----------------------------------------- */

                if (action === "dashboard") {

                    event.preventDefault();

                    sidebarLinks.forEach(function (item) {

                        item.classList.remove("active");

                    });

                    link.classList.add("active");

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                    if (isMobile()) {
                        closeSidebar();
                    }

                    return;

                }


                /* -----------------------------------------
                   PLACEHOLDER SIDEBAR ITEMS
                   ----------------------------------------- */

                if (action) {

                    event.preventDefault();

                    sidebarLinks.forEach(function (item) {

                        item.classList.remove("active");

                    });

                    link.classList.add("active");

                    handleAction(action);

                    if (isMobile()) {
                        closeSidebar();
                    }

                }

            }
        );

    });


    /* =====================================================
       ALL DATA-ACTION ELEMENTS
       
       IMPORTANT:
       We SKIP anchor elements that already have
       a real href. This prevents JavaScript from
       blocking Django navigation.
    ====================================================== */

    const actionElements =
        document.querySelectorAll("[data-action]");


    actionElements.forEach(function (element) {

        /*
           Sidebar links are already handled above.
        */

        if (
            element.classList.contains("sidebar-link")
        ) {
            return;
        }


        element.addEventListener(
            "click",
            function (event) {

                const action =
                    element.dataset.action;


                const href =
                    element.getAttribute("href");


                /* -----------------------------------------
                   REAL MATERIALS LINK
                   ----------------------------------------- */

                if (
                    action === "materials" &&
                    href &&
                    href !== "#" &&
                    href !== "javascript:void(0)"
                ) {

                    /*
                       IMPORTANT:
                       Do NOT prevent default.
                       Let Django URL open normally.
                    */

                    return;

                }


                /* -----------------------------------------
                   MATERIALS FALLBACK
                   ----------------------------------------- */

                if (action === "materials") {

                    event.preventDefault();

                    goToPage(
                        "/customer/materials/"
                    );

                    return;

                }


                /* -----------------------------------------
                   OTHER ACTIONS
                   ----------------------------------------- */

                event.preventDefault();

                handleAction(action);

            }
        );

    });


    /* =====================================================
       ACTION HANDLER
    ====================================================== */

    function handleAction(action) {

        switch (action) {


            /* =============================================
               DASHBOARD
            ============================================== */

            case "dashboard":

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

                break;


            /* =============================================
               MATERIALS
            ============================================== */

            case "materials":

                /*
                   NEVER SHOW "COMING SOON" FOR MATERIALS.

                   This is a real Django page.
                */

                goToPage(
                    "/customer/materials/"
                );

                break;


            /* =============================================
               ORDERS
            ============================================== */

           case "orders":
             window.location.href = "/customer/orders/";

    break;


            /* =============================================
               VEHICLES
            ============================================== */
             
            case "vehicles":
                window.location.href = "/customer/vehicles/";
                break;

            /* =============================================
               RENTALS
            ============================================== */

            case "rentals":

               case "vehicles":
                window.location.href = "/customer/rentals/";
                break;


            /* =============================================
               PROFILE
            ============================================== */

            case "profile":

                case "vehicles":
                window.location.href = "/customer/profile/";
                break;


            // /* =============================================
            //    SETTINGS
            // ============================================== */

            // case "settings":

            //     showToast(
            //         "Settings",
            //         "Dashboard settings will be available here."
            //     );

            //     break;


            /* =============================================
               UNKNOWN ACTION
            ============================================== */

            default:

                showToast(
                    "BuildConnect",
                    "This feature is coming soon."
                );

                break;

        }

    }


    /* =====================================================
       MATERIAL CARDS
    ====================================================== */

    const materialCards =
        document.querySelectorAll(".material-card");


    materialCards.forEach(function (card) {

        /* ---------------------------------------------
           CLICK
        --------------------------------------------- */

        card.addEventListener(
            "click",
            function (event) {

                /*
                   If the card contains a real link/button,
                   don't interfere with it.
                */

                const clickedElement =
                    event.target.closest(
                        "a, button"
                    );

                if (clickedElement) {
                    return;
                }


                const material =
                    card.dataset.material;


                if (material) {

                    showToast(
                        material,
                        "Material listings will be shown here."
                    );

                }

            }
        );


        /* ---------------------------------------------
           HOVER
        --------------------------------------------- */

        card.addEventListener(
            "mouseenter",
            function () {

                card.style.transform =
                    "translateY(-6px)";

            }
        );


        card.addEventListener(
            "mouseleave",
            function () {

                card.style.transform =
                    "";

            }
        );

    });


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
       PROFILE BUTTON
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


                if (!confirmed) {

                    return;

                }


                /*
                   Current Django login URL.

                   Later we can replace this with
                   Django's proper logout URL.
                */

                window.location.href =
                    "/login/";

            }
        );

    }


    /* =====================================================
       CURRENT DATE
    ====================================================== */

    const currentDate =
        document.getElementById("currentDate");


    if (currentDate) {

        const today =
            new Date();


        const options = {

            weekday: "short",

            day: "numeric",

            month: "short",

            year: "numeric"

        };


        currentDate.textContent =
            today.toLocaleDateString(
                "en-IN",
                options
            );

    }


    /* =====================================================
       INITIAL SIDEBAR STATE
    ====================================================== */

    /*
       Desktop:
       Sidebar starts open.

       Mobile:
       Sidebar starts closed.
    */

    if (isMobile()) {

        body.classList.remove(
            "sidebar-collapsed"
        );

        body.classList.remove(
            "sidebar-open"
        );

    }


    /* =====================================================
       DEBUG MESSAGE
    ====================================================== */

    console.log(
        "BuildConnect Customer Dashboard loaded successfully."
    );

    console.log(
        "Materials URL: /customer/materials/"
    );

});