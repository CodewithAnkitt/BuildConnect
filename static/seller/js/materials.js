/* =========================================================
   BUILD CONNECT - SELLER MY MATERIALS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const mobileMenu = document.getElementById("mobileMenu");
    const sidebar = document.getElementById("sidebar");

    const materialSearch =
        document.getElementById("materialSearch");

    const materialFilter =
        document.getElementById("materialFilter");

    const statusFilter =
        document.getElementById("statusFilter");

    const sortFilter =
        document.getElementById("sortFilter");

    const globalSearch =
        document.getElementById("globalSearch");

    const addMaterialBtn =
        document.getElementById("addMaterialBtn");

    const notificationBtn =
        document.getElementById("notificationBtn");

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");

    const tableBody =
        document.getElementById("materialsTable");


    /* =====================================================
       TOAST
    ===================================================== */

    function showToast(message) {

        toastMessage.textContent = message;

        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 2500);
    }


    /* =====================================================
       MOBILE SIDEBAR
    ===================================================== */

    if (mobileMenu) {

        mobileMenu.addEventListener("click", () => {

            sidebar.classList.toggle("open");

        });

    }


    /* =====================================================
       FILTER MATERIALS
    ===================================================== */

    function filterMaterials() {

        const searchValue =
            materialSearch.value.toLowerCase().trim();

        const selectedMaterial =
            materialFilter.value;

        const selectedStatus =
            statusFilter.value;

        const rows =
            Array.from(tableBody.querySelectorAll("tr"));

        rows.forEach(row => {

            const material =
                row.dataset.material.toLowerCase();

            const status =
                row.dataset.status;

            const matchesSearch =
                material.includes(searchValue);

            const matchesMaterial =
                selectedMaterial === "all" ||
                row.dataset.material === selectedMaterial;

            const matchesStatus =
                selectedStatus === "all" ||
                status === selectedStatus;

            if (
                matchesSearch &&
                matchesMaterial &&
                matchesStatus
            ) {

                row.style.display = "";

            } else {

                row.style.display = "none";

            }

        });

    }


    materialSearch.addEventListener(
        "input",
        filterMaterials
    );

    materialFilter.addEventListener(
        "change",
        filterMaterials
    );

    statusFilter.addEventListener(
        "change",
        filterMaterials
    );


    /* =====================================================
       SORT
    ===================================================== */

    sortFilter.addEventListener("change", () => {

        const rows =
            Array.from(tableBody.querySelectorAll("tr"));

        const value = sortFilter.value;

        rows.sort((a, b) => {

            if (value === "price-high") {

                return (
                    Number(b.dataset.price) -
                    Number(a.dataset.price)
                );

            }

            if (value === "price-low") {

                return (
                    Number(a.dataset.price) -
                    Number(b.dataset.price)
                );

            }

            if (value === "stock-high") {

                return (
                    Number(b.dataset.stock) -
                    Number(a.dataset.stock)
                );

            }

            if (value === "oldest") {

                return (
                    new Date(a.dataset.date) -
                    new Date(b.dataset.date)
                );

            }

            return (
                new Date(b.dataset.date) -
                new Date(a.dataset.date)
            );

        });

        rows.forEach(row => {
            tableBody.appendChild(row);
        });

    });


    /* =====================================================
       GLOBAL SEARCH
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            globalSearch.focus();

        }

    });


    globalSearch.addEventListener("input", () => {

        materialSearch.value =
            globalSearch.value;

        filterMaterials();

    });


    /* =====================================================
       ADD MATERIAL
    ===================================================== */

    addMaterialBtn.addEventListener("click", () => {

        showToast(
            "Add Material page will be connected next."
        );

    });


    /* =====================================================
       EDIT BUTTON
    ===================================================== */

    document.querySelectorAll(".edit-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                const material =
                    button.dataset.material;

                showToast(
                    `Edit ${material} listing selected.`
                );

            });

        });


    /* =====================================================
       MORE OPTIONS
    ===================================================== */

    document.querySelectorAll(".more-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                showToast(
                    "More material options opened."
                );

            });

        });


    /* =====================================================
       NOTIFICATION
    ===================================================== */

    notificationBtn.addEventListener("click", () => {

        showToast(
            "You have 1 new material notification."
        );

    });


    /* =====================================================
       COMING SOON LINKS
    ===================================================== */

    document.querySelectorAll(".coming-soon")
        .forEach(link => {

            link.addEventListener("click", (event) => {

                event.preventDefault();

                showToast(
                    "This section will be connected next."
                );

            });

        });


    /* =====================================================
       CARD ANIMATION
    ===================================================== */

    const cards =
        document.querySelectorAll(
            ".summary-card, .inventory-card, .performance-card, .stock-card"
        );

    cards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(12px)";

        setTimeout(() => {

            card.style.transition =
                "opacity .45s ease, transform .45s ease";

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }, 100 + index * 80);

    });

});