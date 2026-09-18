/* =========================================================
   BUILD CONNECT
   DRIVER - EARNINGS JS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       SIDEBAR MOBILE
    ====================================================== */

    const sidebar = document.querySelector(".driver-sidebar");


    /*
       Small-screen sidebar support.
       If later we add a hamburger button,
       this is already ready.
    */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            if (sidebar) {
                sidebar.classList.remove("open");
            }

        }

    });



    /* =====================================================
       NOTIFICATION
    ====================================================== */

    const notificationBtn =
        document.querySelector(".notification-btn");


    if (notificationBtn) {

        notificationBtn.addEventListener("click", function () {

            showToast(
                "You have 3 new notifications."
            );

        });

    }



    /* =====================================================
       SEARCH
    ====================================================== */

    const searchInput =
        document.querySelector(".search-box input");


    if (searchInput) {

        searchInput.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {

                const value =
                    searchInput.value.trim();

                if (value !== "") {

                    showToast(
                        `Searching for "${value}"...`
                    );

                }

            }

        });

    }



    /* =====================================================
       CTRL + K SEARCH
    ====================================================== */

    document.addEventListener("keydown", function (event) {

        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            if (searchInput) {

                searchInput.focus();

            }

        }

    });



    /* =====================================================
       CHART PERIOD BUTTONS
    ====================================================== */

    const chartButtons =
        document.querySelectorAll(
            ".chart-controls button"
        );


    chartButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            chartButtons.forEach(function (btn) {

                btn.classList.remove("selected");

            });


            button.classList.add("selected");


            showToast(
                `${button.textContent.trim()} earnings selected.`
            );

        });

    });



    /* =====================================================
       CHART DATE SELECT
    ====================================================== */

    const chartSelect =
        document.querySelector(
            ".chart-controls select"
        );


    if (chartSelect) {

        chartSelect.addEventListener("change", function () {

            showToast(
                `Showing earnings for ${this.value}.`
            );

        });

    }



    /* =====================================================
       SUMMARY PERIOD
    ====================================================== */

    const monthSelect =
        document.querySelector(".month-select");


    if (monthSelect) {

        monthSelect.addEventListener("change", function () {

            showToast(
                `Earnings summary changed to ${this.value}.`
            );

        });

    }



    /* =====================================================
       PAYMENT DOWNLOAD
    ====================================================== */

    const downloadButtons =
        document.querySelectorAll(
            ".download-btn"
        );


    downloadButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            showToast(
                "Payment receipt download started."
            );

        });

    });



    /* =====================================================
       VIEW ALL JOBS
    ====================================================== */

    const viewAllButtons =
        document.querySelectorAll(
            ".view-all"
        );


    viewAllButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            showToast(
                "Opening complete history..."
            );

        });

    });



    /* =====================================================
       DOWNLOAD STATEMENT
    ====================================================== */

    const downloadStatement =
        document.getElementById(
            "downloadStatement"
        );


    if (downloadStatement) {

        downloadStatement.addEventListener(
            "click",
            function () {

                const select =
                    document.querySelector(
                        ".statement-card select"
                    );

                const selectedMonth =
                    select
                        ? select.value
                        : "selected period";


                showToast(
                    `Preparing earnings statement for ${selectedMonth}.`
                );

            }
        );

    }



    /* =====================================================
       SUPPORT
    ====================================================== */

    const supportBtn =
        document.getElementById(
            "supportBtn"
        );


    if (supportBtn) {

        supportBtn.addEventListener(
            "click",
            function () {

                showToast(
                    "Support request option will be connected with Django."
                );

            }
        );

    }



    /* =====================================================
       ANIMATE STAT CARDS
    ====================================================== */

    const cards =
        document.querySelectorAll(
            ".earning-card"
        );


    cards.forEach(function (card, index) {

        card.style.opacity = "0";

        card.style.transform =
            "translateY(15px)";


        setTimeout(function () {

            card.style.transition =
                "opacity .45s ease, transform .45s ease";

            card.style.opacity = "1";

            card.style.transform =
                "translateY(0)";

        }, index * 100);

    });



    /* =====================================================
       TOAST FUNCTION
    ====================================================== */

    function showToast(message) {

        const toast =
            document.getElementById(
                "driverToast"
            );


        if (!toast) {
            return;
        }


        const text =
            toast.querySelector("span");


        if (text) {

            text.textContent =
                message;

        }


        toast.classList.add("show");


        clearTimeout(
            window.driverToastTimer
        );


        window.driverToastTimer =
            setTimeout(function () {

                toast.classList.remove("show");

            }, 2800);

    }

});