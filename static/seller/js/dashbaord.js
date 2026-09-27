document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MOBILE SIDEBAR
    ========================== */

    const menuBtn = document.querySelector(".mobile-menu-btn");
    const sidebar = document.querySelector(".sidebar");

    if (menuBtn && sidebar) {
        menuBtn.addEventListener("click", () => {
            sidebar.classList.toggle("mobile-open");
        });
    }


    /* =========================
       TOAST
    ========================== */

    function showToast(message) {

        const oldToast = document.querySelector(".toast");

        if (oldToast) {
            oldToast.remove();
        }

        const toast = document.createElement("div");

        toast.className = "toast";
        toast.textContent = message;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add("show");
        }, 50);

        setTimeout(() => {
            toast.classList.remove("show");

            setTimeout(() => {
                toast.remove();
            }, 300);

        }, 2500);
    }


    /* =========================
       COMING SOON BUTTONS
    ========================== */

    const comingSoonButtons =
        document.querySelectorAll(".coming-soon");

    comingSoonButtons.forEach(button => {

        button.addEventListener("click", (event) => {

            event.preventDefault();

            showToast("This Seller section will be built next.");

        });

    });


    /* =========================
       SEARCH
    ========================== */

    const searchInput =
        document.getElementById("searchInput");

    if (searchInput) {

        searchInput.addEventListener("keydown", event => {

            if (event.key === "Enter") {

                const value =
                    searchInput.value.trim();

                if (value) {
                    showToast(`Searching for "${value}"...`);
                }

            }

        });

    }


    /* =========================
       CTRL + K
    ========================== */

    document.addEventListener("keydown", event => {

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            searchInput?.focus();

        }

    });


    /* =========================
       NOTIFICATION
    ========================== */

    const notificationBtn =
        document.querySelector(".notification-btn");

    if (notificationBtn) {

        notificationBtn.addEventListener("click", () => {

            showToast("You have 5 pending orders.");

        });

    }


    /* =========================
       ORDER MORE BUTTONS
    ========================== */

    const moreButtons =
        document.querySelectorAll(".more-btn");

    moreButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.stopPropagation();

            showToast("Order options will be available here.");

        });

    });


    /* =========================
       PROFILE CLICK
    ========================== */

    const profile =
        document.querySelector(".nav-profile");

    if (profile) {

        profile.addEventListener("click", () => {

            showToast("Seller profile options.");

        });

    }


    /* =========================
       STAT CARD ANIMATION
    ========================== */

    const statCards =
        document.querySelectorAll(".stat-card");

    statCards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(15px)";

        setTimeout(() => {

            card.style.transition =
                "opacity .5s ease, transform .5s ease";

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }, 100 + index * 100);

    });


    /* =========================
       BAR CHART ANIMATION
    ========================== */

    const bars =
        document.querySelectorAll(".bar");

    bars.forEach((bar, index) => {

        const finalHeight = bar.style.height;

        bar.style.height = "0";

        setTimeout(() => {

            bar.style.transition =
                "height .8s cubic-bezier(.2,.8,.2,1)";

            bar.style.height = finalHeight;

        }, 500 + index * 100);

    });


    /* =========================
       MATERIAL ROW HOVER
    ========================== */

    const materialRows =
        document.querySelectorAll(".material-row");

    materialRows.forEach(row => {

        row.addEventListener("mouseenter", () => {
            row.style.background = "#fffaf4";
        });

        row.addEventListener("mouseleave", () => {
            row.style.background = "transparent";
        });

    });

});