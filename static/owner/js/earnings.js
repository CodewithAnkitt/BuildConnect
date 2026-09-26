document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       SEARCH
    ===================================================== */

    const searchInput = document.getElementById("earningSearch");
    const tableRows = document.querySelectorAll(
        "#transactionsTable tbody tr"
    );

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            const searchText =
                searchInput.value.toLowerCase().trim();

            tableRows.forEach(function (row) {

                const rowText =
                    row.innerText.toLowerCase();

                row.style.display =
                    rowText.includes(searchText)
                        ? ""
                        : "none";
            });
        });
    }


    /* =====================================================
       CTRL + K SEARCH
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
       WITHDRAW EARNINGS
    ===================================================== */

    const withdrawBtn =
        document.getElementById("withdrawBtn");

    if (withdrawBtn) {

        withdrawBtn.addEventListener("click", function () {

            showToast(
                "Withdrawal",
                "Withdrawal request feature will be available here."
            );

        });
    }


    /* =====================================================
       DATE RANGE
    ===================================================== */

    const dateFilterBtn =
        document.getElementById("dateFilterBtn");

    if (dateFilterBtn) {

        dateFilterBtn.addEventListener("click", function () {

            showToast(
                "Date Range",
                "Date range selection will be available here."
            );

        });
    }


    /* =====================================================
       EXPORT
    ===================================================== */

    const exportBtn =
        document.getElementById("exportBtn");

    if (exportBtn) {

        exportBtn.addEventListener("click", function () {

            showToast(
                "Export",
                "Transaction export will be available here."
            );

        });
    }


    /* =====================================================
       VIEW TRANSACTION
    ===================================================== */

    const viewButtons =
        document.querySelectorAll(".view-btn");

    viewButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const row =
                button.closest("tr");

            if (!row) {
                return;
            }

            const transaction =
                row.cells[0].innerText
                    .split("\n")[0]
                    .trim();

            const vehicle =
                row.cells[1].innerText.trim();

            const amount =
                row.cells[4].innerText.trim();

            showToast(
                "Transaction Details",
                `${transaction} • ${vehicle} • ${amount}`
            );

        });

    });


    /* =====================================================
       NOTIFICATION
    ===================================================== */

    const notificationButton =
        document.querySelector(
            ".navbar .btn-light"
        );

    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            function () {

                showToast(
                    "Notifications",
                    "You have 3 new notifications."
                );

            }
        );

    }


    /* =====================================================
       TOAST
    ===================================================== */

    function showToast(title, message) {

        const existingToast =
            document.getElementById(
                "earningsToast"
            );

        if (existingToast) {
            existingToast.remove();
        }


        const toast =
            document.createElement("div");

        toast.id =
            "earningsToast";

        toast.className =
            "position-fixed bottom-0 end-0 p-3";

        toast.style.zIndex = "9999";


        toast.innerHTML = `
            <div
                class="toast show shadow border-0"
                role="alert"
            >

                <div class="toast-header">

                    <i class="bi bi-wallet2 text-primary me-2"></i>

                    <strong class="me-auto">
                        ${title}
                    </strong>

                    <button
                        type="button"
                        class="btn-close"
                        id="closeEarningsToast"
                    ></button>

                </div>

                <div class="toast-body">
                    ${message}
                </div>

            </div>
        `;


        document.body.appendChild(toast);


        const closeButton =
            document.getElementById(
                "closeEarningsToast"
            );

        if (closeButton) {

            closeButton.addEventListener(
                "click",
                function () {
                    toast.remove();
                }
            );

        }


        setTimeout(function () {

            if (toast) {
                toast.remove();
            }

        }, 3500);

    }


    /* =====================================================
       CHART HOVER
    ===================================================== */

    const chartBars =
        document.querySelectorAll(
            ".bg-primary.rounded-top"
        );

    chartBars.forEach(function (bar) {

        bar.style.transition =
            "opacity 0.2s ease, transform 0.2s ease";

        bar.addEventListener("mouseenter", function () {

            bar.style.opacity = "0.8";

            bar.style.transform =
                "translateY(-3px)";

        });


        bar.addEventListener("mouseleave", function () {

            bar.style.opacity = "1";

            bar.style.transform =
                "translateY(0)";

        });

    });


    /* =====================================================
       PAGE LOAD ANIMATION
    ===================================================== */

    const cards =
        document.querySelectorAll(
            ".card"
        );

    cards.forEach(function (card, index) {

        card.style.opacity = "0";

        card.style.transform =
            "translateY(8px)";

        setTimeout(function () {

            card.style.transition =
                "opacity 0.35s ease, transform 0.35s ease";

            card.style.opacity = "1";

            card.style.transform =
                "translateY(0)";

        }, index * 70);

    });

});