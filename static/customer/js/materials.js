document.addEventListener("DOMContentLoaded", () => {

    const cards = [...document.querySelectorAll(".material-card")];

    const searchInput = document.getElementById("materialSearch");
    const categoryFilter = document.getElementById("categoryFilter");
    const locationFilter = document.getElementById("locationFilter");
    const sortFilter = document.getElementById("sortFilter");

    const noResults = document.getElementById("noResults");

    const modal = document.getElementById("materialModal");
    const modalClose = document.getElementById("modalClose");
    const closeAction = document.getElementById("closeAction");

    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalSubtitle = document.getElementById("modalSubtitle");
    const modalPrice = document.getElementById("modalPrice");
    const modalQuantityAvailable = document.getElementById("modalQuantityAvailable");
    const modalType = document.getElementById("modalType");
    const modalLocation = document.getElementById("modalLocation");
    const modalSupplier = document.getElementById("modalSupplier");
    const modalDescription = document.getElementById("modalDescription");

    const thumb1 = document.getElementById("thumb1");
    const thumb2 = document.getElementById("thumb2");
    const thumb3 = document.getElementById("thumb3");

    const minusBtn = document.getElementById("minusBtn");
    const plusBtn = document.getElementById("plusBtn");
    const orderQuantity = document.getElementById("orderQuantity");

    const addToOrder = document.getElementById("addToOrder");

    const toast = document.getElementById("toast");
    const toastTitle = document.getElementById("toastTitle");
    const toastMessage = document.getElementById("toastMessage");

    const menuBtn = document.getElementById("menuBtn");
    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    let currentMaterial = null;
    let currentMaxQuantity = 500;


    /* ================= MATERIAL DATA ================= */

    const materialData = {

        coal: {
            title: "Coal",
            subtitle: "Quality coal for industrial and construction requirements.",
            price: "₹ 1,250",
            available: "350 Ton",
            type: "Industrial Coal",
            location: "Dhanbad, Jharkhand",
            supplier: "Eastern Coal Suppliers",
            description:
                "High-quality coal suitable for industrial applications and construction-related requirements. Carefully sourced from trusted suppliers.",
            image: "/static/images/coal.png",
            images: [
                "/static/images/coal-thumn.png",
                "/static/images/coalthumn1.png",
                "/static/images/coalthumn2.png"
            ]
        },

        sand: {
            title: "Construction Sand",
            subtitle: "High quality sand for all construction needs.",
            price: "₹ 850",
            available: "500 Ton",
            type: "River Sand",
            location: "Ranchi, Jharkhand",
            supplier: "Sharma Enterprises",
            description:
                "Clean, high-quality construction sand suitable for residential, commercial, and infrastructure projects. Properly graded and free from major impurities.",
            image: "/static/images/sand.png",
            images: [
                "/static/images/sand.png",
                "/static/images/sand.png",
                "/static/images/sand.png"
            ]
        },

        "crushed-stone": {
            title: "Crushed Stone",
            subtitle: "Strong and durable stone for construction projects.",
            price: "₹ 1,100",
            available: "420 Ton",
            type: "20mm Crushed Stone",
            location: "Jamshedpur, Jharkhand",
            supplier: "Singh Stone Suppliers",
            description:
                "Durable crushed stone suitable for concrete production, road construction, foundations and general infrastructure work.",
            image: "/static/images/crushed-stone.png",
            images: [
                "/static/images/crushed-stone.png",
                "/static/images/crushed-stone.png",
                "/static/images/crushed-stone.png"
            ]
        },

        "fly-ash": {
            title: "Fly Ash",
            subtitle: "Quality fly ash from trusted suppliers.",
            price: "₹ 620",
            available: "600 Ton",
            type: "Class F Fly Ash",
            location: "Dhanbad, Jharkhand",
            supplier: "GreenBuild Materials",
            description:
                "High-quality fly ash suitable for cement production, concrete work, bricks and other construction applications.",
            image: "/static/images/fly-ash.png",
            images: [
                "/static/images/fly-ash.png",
                "/static/images/fly-ash.png",
                "/static/images/fly-ash.png"
            ]
        },

        soil: {
            title: "Construction Soil",
            subtitle: "Suitable soil for construction and site development.",
            price: "₹ 300",
            available: "750 Ton",
            type: "Construction Fill Soil",
            location: "Ranchi, Jharkhand",
            supplier: "BuildEarth Suppliers",
            description:
                "Suitable quality soil for site filling, construction preparation, landscaping and general site development work.",
            image: "/static/images/soil.png",
            images: [
                "/static/images/soil.png",
                "/static/images/soil.png",
                "/static/images/soil.png"
            ]
        }

    };


    /* ================= FILTER ================= */

    function filterMaterials() {

        const searchValue =
            searchInput.value.trim().toLowerCase();

        const category =
            categoryFilter.value;

        const location =
            locationFilter.value;

        let visibleCards = [];


        cards.forEach(card => {

            const name =
                card.dataset.name.toLowerCase();

            const cardCategory =
                card.dataset.category;

            const cardLocation =
                card.dataset.location;

            const matchesSearch =
                name.includes(searchValue);

            const matchesCategory =
                category === "all" ||
                cardCategory === category;

            const matchesLocation =
                location === "all" ||
                cardLocation === location;

            const visible =
                matchesSearch &&
                matchesCategory &&
                matchesLocation;

            card.style.display =
                visible ? "" : "none";

            if (visible) {
                visibleCards.push(card);
            }

        });


        sortCards(visibleCards);

        noResults.style.display =
            visibleCards.length === 0
                ? "block"
                : "none";
    }


    /* ================= SORT ================= */

    function sortCards(visibleCards) {

        const sortValue =
            sortFilter.value;

        if (sortValue === "default") {
            return;
        }

        visibleCards.sort((a, b) => {

            if (sortValue === "price-low") {
                return (
                    Number(a.dataset.price) -
                    Number(b.dataset.price)
                );
            }

            if (sortValue === "price-high") {
                return (
                    Number(b.dataset.price) -
                    Number(a.dataset.price)
                );
            }

            if (sortValue === "name") {
                return a.dataset.name.localeCompare(
                    b.dataset.name
                );
            }

        });


        const grid =
            document.getElementById("materialsGrid");

        visibleCards.forEach(card => {
            grid.appendChild(card);
        });

    }


    searchInput.addEventListener(
        "input",
        filterMaterials
    );

    categoryFilter.addEventListener(
        "change",
        filterMaterials
    );

    locationFilter.addEventListener(
        "change",
        filterMaterials
    );

    sortFilter.addEventListener(
        "change",
        filterMaterials
    );


    /* ================= OPEN MODAL ================= */

    cards.forEach(card => {

        const button =
            card.querySelector(".details-btn");

        button.addEventListener("click", () => {

            const material =
                card.dataset.material;

            openMaterial(material);

        });

    });


    function openMaterial(material) {

        currentMaterial =
            materialData[material];

        if (!currentMaterial) {
            return;
        }


        modalTitle.textContent =
            currentMaterial.title;

        modalSubtitle.textContent =
            currentMaterial.subtitle;

        modalPrice.textContent =
            currentMaterial.price;

        modalQuantityAvailable.textContent =
            currentMaterial.available;

        modalType.textContent =
            currentMaterial.type;

        modalLocation.textContent =
            currentMaterial.location;

        modalSupplier.textContent =
            currentMaterial.supplier;

        modalDescription.textContent =
            currentMaterial.description;


        modalImage.src =
            currentMaterial.image;

        modalImage.alt =
            currentMaterial.title;


        thumb1.src =
            currentMaterial.images[0];

        thumb2.src =
            currentMaterial.images[1];

        thumb3.src =
            currentMaterial.images[2];


        currentMaxQuantity =
            parseInt(
                currentMaterial.available
            ) || 500;

        orderQuantity.value = 1;
        orderQuantity.max =
            currentMaxQuantity;


        modal.classList.add("show");

        document.body.style.overflow =
            "hidden";

    }


    /* ================= CLOSE MODAL ================= */

    function closeModal() {

        modal.classList.remove("show");

        document.body.style.overflow =
            "";

    }

    modalClose.addEventListener(
        "click",
        closeModal
    );

    closeAction.addEventListener(
        "click",
        closeModal
    );


    modal.addEventListener("click", event => {

        if (event.target === modal) {
            closeModal();
        }

    });


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeModal();
            }

        }
    );


    /* ================= THUMBNAILS ================= */

    const thumbnails = [
        thumb1,
        thumb2,
        thumb3
    ];

    thumbnails.forEach((thumbnail, index) => {

        thumbnail.parentElement.addEventListener(
            "click",
            () => {

                modalImage.src =
                    currentMaterial.images[index];

                document
                    .querySelectorAll(".thumbnail")
                    .forEach(t =>
                        t.classList.remove("active")
                    );

                thumbnail.parentElement
                    .classList.add("active");

            }
        );

    });


    /* ================= QUANTITY ================= */

    minusBtn.addEventListener("click", () => {

        let value =
            parseInt(orderQuantity.value) || 1;

        if (value > 1) {
            value--;
        }

        orderQuantity.value =
            value;

    });


    plusBtn.addEventListener("click", () => {

        let value =
            parseInt(orderQuantity.value) || 1;

        if (value < currentMaxQuantity) {
            value++;
        }

        orderQuantity.value =
            value;

    });


    orderQuantity.addEventListener(
        "input",
        () => {

            let value =
                parseInt(orderQuantity.value) || 1;

            if (value < 1) {
                value = 1;
            }

            if (value > currentMaxQuantity) {
                value = currentMaxQuantity;
            }

            orderQuantity.value =
                value;

        }
    );


    /* ================= ADD TO ORDER ================= */

    addToOrder.addEventListener(
        "click",
        () => {

            const quantity =
                orderQuantity.value;

            showToast(
                "Added to Order",
                `${currentMaterial.title} × ${quantity} Ton added successfully.`
            );

            closeModal();

        }
    );


    function showToast(title, message) {

        toastTitle.textContent =
            title;

        toastMessage.textContent =
            message;

        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 3200);

    }


    /* ================= SIDEBAR ================= */

    menuBtn.addEventListener(
        "click",
        () => {

            sidebar.classList.toggle("open");

            sidebarOverlay.classList.toggle(
                "show"
            );

        }
    );


    sidebarOverlay.addEventListener(
        "click",
        () => {

            sidebar.classList.remove("open");

            sidebarOverlay.classList.remove(
                "show"
            );

        }
    );


    /* ================= LOGOUT ================= */

    document
        .getElementById("logoutBtn")
        .addEventListener(
            "click",
            () => {

                const confirmed =
                    confirm(
                        "Are you sure you want to logout?"
                    );

                if (confirmed) {
                    window.location.href =
                        "/login/";
                }

            }
        );


    /* ================= INITIAL ================= */

    filterMaterials();

});