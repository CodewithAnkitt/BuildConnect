/* =========================================================
   BUILD CONNECT
   SELLER - EARNINGS
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

    const notificationBtn =
        document.getElementById("notificationBtn");

    const yearFilter =
        document.getElementById("yearFilter");

    const periodFilter =
        document.getElementById("periodFilter");

    const viewOrdersBtn =
        document.getElementById("viewOrdersBtn");

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");


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
       MOBILE SIDEBAR
    ====================================================== */

    mobileMenu.addEventListener("click", () => {

        sidebar.classList.toggle("open");

    });


    /* =====================================================
       CTRL + K
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
       GLOBAL SEARCH
    ====================================================== */

    globalSearch.addEventListener(
        "input",
        () => {

            if (
                globalSearch.value.trim() !== ""
            ) {

                showToast(
                    `Searching for "${globalSearch.value.trim()}"`
                );

            }

        }
    );


    /* =====================================================
       NOTIFICATION
    ====================================================== */

    notificationBtn.addEventListener(
        "click",
        () => {

            showToast(
                "You have 1 new earnings notification."
            );

        }
    );


    /* =====================================================
       YEAR FILTER
    ====================================================== */

    yearFilter.addEventListener(
        "change",
        () => {

            showToast(
                `Showing earnings for ${yearFilter.value}.`
            );

        }
    );


    /* =====================================================
       PERIOD FILTER
    ====================================================== */

    periodFilter.addEventListener(
        "change",
        () => {

            showToast(
                `${periodFilter.value} earnings view selected.`
            );

        }
    );


    /* =====================================================
       VIEW ALL ORDERS
    ====================================================== */

    viewOrdersBtn.addEventListener(
        "click",
        () => {

            showToast(
                "Opening all seller orders."
            );

            /*
             * When the Orders page is connected:
             *
             * window.location.href =
             * "/seller/orders/";
             */

        }
    );


    /* =====================================================
       TABLE VIEW BUTTONS
    ====================================================== */

    document.querySelectorAll(
        ".table-view-btn"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const row =
                    button.closest("tr");

                const orderId =
                    row.children[1].textContent.trim();

                showToast(
                    `Viewing earnings for ${orderId}.`
                );

            }
        );

    });


    /* =====================================================
       BAR CHART TOOLTIP
    ====================================================== */

    document.querySelectorAll(
        ".bar"
    ).forEach(bar => {

        bar.addEventListener(
            "mouseenter",
            () => {

                bar.style.filter =
                    "brightness(1.12)";

            }
        );


        bar.addEventListener(
            "mouseleave",
            () => {

                bar.style.filter =
                    "brightness(1)";

            }
        );

    });


    /* =====================================================
       COMING SOON NAVIGATION
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
       CARD ANIMATION
    ====================================================== */

    const animatedCards =
        document.querySelectorAll(
            ".summary-card, .analytics-card, .card, .side-card"
        );


    animatedCards.forEach(
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

            }, 70 + index * 60);

        }
    );


    /* =====================================================
       DONUT HOVER
    ====================================================== */

    const donut =
        document.querySelector(
            ".donut-chart"
        );


    donut.addEventListener(
        "mouseenter",
        () => {

            donut.style.transform =
                "scale(1.03)";

            donut.style.transition =
                "transform .2s ease";

        }
    );


    donut.addEventListener(
        "mouseleave",
        () => {

            donut.style.transform =
                "scale(1)";

        }
    );


});