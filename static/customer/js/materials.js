document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const cards = [
        ...document.querySelectorAll(".material-card")
    ];

    const searchInput =
        document.getElementById("materialSearch");

    const categoryFilter =
        document.getElementById("categoryFilter");

    const locationFilter =
        document.getElementById("locationFilter");

    const sortFilter =
        document.getElementById("sortFilter");

    const noResults =
        document.getElementById("noResults");


    /* =====================================================
       MODAL ELEMENTS
    ===================================================== */

    const modal =
        document.getElementById("materialModal");

    const modalClose =
        document.getElementById("modalClose");

    const closeAction =
        document.getElementById("closeAction");

    const modalImage =
        document.getElementById("modalImage");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalSubtitle =
        document.getElementById("modalSubtitle");

    const modalPrice =
        document.getElementById("modalPrice");

    const modalQuantityAvailable =
        document.getElementById("modalQuantityAvailable");

    const modalType =
        document.getElementById("modalType");

    const modalLocation =
        document.getElementById("modalLocation");

    const modalSupplier =
        document.getElementById("modalSupplier");

    const modalDescription =
        document.getElementById("modalDescription");


    /* =====================================================
       THUMBNAILS
    ===================================================== */

    const thumb1 =
        document.getElementById("thumb1");

    const thumb2 =
        document.getElementById("thumb2");

    const thumb3 =
        document.getElementById("thumb3");

    const prevImage =
        document.getElementById("prevImage");

    const nextImage =
        document.getElementById("nextImage");


    /* =====================================================
       QUANTITY
    ===================================================== */

    const minusBtn =
        document.getElementById("minusBtn");

    const plusBtn =
        document.getElementById("plusBtn");

    const orderQuantity =
        document.getElementById("orderQuantity");

    const addToOrderButton =
    document.getElementById("addToOrder");


    /* =====================================================
       TOAST
    ===================================================== */

    const toast =
        document.getElementById("toast");

    const toastTitle =
        document.getElementById("toastTitle");

    const toastMessage =
        document.getElementById("toastMessage");


    /* =====================================================
       SIDEBAR
    ===================================================== */

    const menuBtn =
        document.getElementById("menuBtn");

    const sidebar =
        document.getElementById("sidebar");

    const sidebarOverlay =
        document.getElementById("sidebarOverlay");


    /* =====================================================
       CURRENT MATERIAL
    ===================================================== */

    let currentMaterial = null;

    let currentMaterialCard = null;

    let currentImages = [];

    let currentImageIndex = 0;

    let currentMaxQuantity = 1;


    /* =====================================================
       FILTER MATERIALS
    ===================================================== */

    function filterMaterials() {

        const searchValue =
            searchInput
                ? searchInput.value.trim().toLowerCase()
                : "";

        const category =
            categoryFilter
                ? categoryFilter.value
                : "all";

        const location =
            locationFilter
                ? locationFilter.value
                : "all";

        let visibleCards = [];


        cards.forEach(card => {

            const name =
                (card.dataset.name || "")
                    .toLowerCase();

            const description =
                (card.dataset.description || "")
                    .toLowerCase();

            const cardCategory =
                card.dataset.category || "";

            const cardLocation =
                card.dataset.location || "";


            const matchesSearch =
                name.includes(searchValue) ||
                description.includes(searchValue);


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


        if (noResults) {

            noResults.style.display =
                visibleCards.length === 0
                    ? "block"
                    : "none";

        }

    }


    /* =====================================================
       SORT MATERIALS
    ===================================================== */

    function sortCards(visibleCards) {

        if (!sortFilter) {
            return;
        }

        const sortValue =
            sortFilter.value;


        if (sortValue === "default") {
            return;
        }


        visibleCards.sort((a, b) => {

            if (sortValue === "price-low") {

                return (
                    Number(a.dataset.price || 0) -
                    Number(b.dataset.price || 0)
                );

            }


            if (sortValue === "price-high") {

                return (
                    Number(b.dataset.price || 0) -
                    Number(a.dataset.price || 0)
                );

            }


            if (sortValue === "name") {

                return (
                    (a.dataset.name || "")
                        .localeCompare(
                            b.dataset.name || ""
                        )
                );

            }


            return 0;

        });


        const grid =
            document.getElementById(
                "materialsGrid"
            );


        if (grid) {

            visibleCards.forEach(card => {
                grid.appendChild(card);
            });

        }

    }


    /* =====================================================
       FILTER EVENTS
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterMaterials
        );

    }


    if (categoryFilter) {

        categoryFilter.addEventListener(
            "change",
            filterMaterials
        );

    }


    if (locationFilter) {

        locationFilter.addEventListener(
            "change",
            filterMaterials
        );

    }


    if (sortFilter) {

        sortFilter.addEventListener(
            "change",
            filterMaterials
        );

    }


    /* =====================================================
       OPEN MATERIAL MODAL
    ===================================================== */

    cards.forEach(card => {

        const button =
            card.querySelector(".details-btn");


        if (button) {

            button.addEventListener(
                "click",
                () => {
                    openMaterial(card);
                }
            );

        }

    });


    /* =====================================================
       OPEN MATERIAL
    ===================================================== */

    function openMaterial(card) {

        /*
           IMPORTANT:
           Store the complete card so Add to Order
           knows which database listing was selected.
        */

        currentMaterialCard = card;

        currentMaterial = card.dataset;


        const title =
            currentMaterial.title ||
            currentMaterial.name ||
            "Material";


        const description =
            currentMaterial.description ||
            "Quality construction material from a trusted seller.";


        const price =
            Number(
                currentMaterial.price
            ) || 0;


        const quantity =
            Number(
                currentMaterial.quantity
            ) || 0;


        const unit =
            currentMaterial.unit ||
            "Ton";


        const location =
            currentMaterial.location ||
            "Location not specified";


        const supplier =
            currentMaterial.supplier ||
            "Trusted Seller";


        const image =
            currentMaterial.image ||
            "/static/images/logo.png";


        /* ---------------------------------------------
           MODAL CONTENT
        --------------------------------------------- */

        if (modalTitle) {

            modalTitle.textContent =
                title;

        }


        if (modalSubtitle) {

            modalSubtitle.textContent =
                description;

        }


        if (modalPrice) {

            modalPrice.textContent =
                formatCurrency(price);

        }


        if (modalQuantityAvailable) {

            modalQuantityAvailable.textContent =
                `${formatNumber(quantity)} ${unit}`;

        }


        if (modalType) {

            modalType.textContent =
                unit;

        }


        if (modalLocation) {

            modalLocation.textContent =
                location;

        }


        if (modalSupplier) {

            modalSupplier.textContent =
                supplier;

        }


        if (modalDescription) {

            modalDescription.textContent =
                description;

        }


        /* ---------------------------------------------
           IMAGES
        --------------------------------------------- */

        currentImages = [
            image,
            image,
            image
        ];

        currentImageIndex = 0;

        updateModalImage();


        /* ---------------------------------------------
           QUANTITY
        --------------------------------------------- */

        currentMaxQuantity =
            Math.max(
                1,
                Math.floor(quantity)
            );


        if (orderQuantity) {

            orderQuantity.value = 1;

            orderQuantity.max =
                currentMaxQuantity;

        }


        /* ---------------------------------------------
           SHOW MODAL
        --------------------------------------------- */

        if (modal) {

            modal.classList.add("show");

            document.body.style.overflow =
                "hidden";

        }

    }


    /* =====================================================
       UPDATE MODAL IMAGE
    ===================================================== */

    function updateModalImage() {

        if (!currentImages.length) {
            return;
        }


        if (modalImage) {

            modalImage.src =
                currentImages[currentImageIndex];

            modalImage.alt =
                currentMaterial.title ||
                currentMaterial.name ||
                "Material";

        }


        if (thumb1) {

            thumb1.src =
                currentImages[0];

        }


        if (thumb2) {

            thumb2.src =
                currentImages[1];

        }


        if (thumb3) {

            thumb3.src =
                currentImages[2];

        }


        document
            .querySelectorAll(".thumbnail")
            .forEach(
                (thumbnail, index) => {

                    thumbnail.classList.toggle(
                        "active",
                        index === currentImageIndex
                    );

                }
            );

    }


    /* =====================================================
       THUMBNAIL CLICK
    ===================================================== */

    const thumbnails = [
        thumb1,
        thumb2,
        thumb3
    ];


    thumbnails.forEach(
        (thumbnail, index) => {

            if (!thumbnail) {
                return;
            }


            if (!thumbnail.parentElement) {
                return;
            }


            thumbnail.parentElement.addEventListener(
                "click",
                () => {

                    currentImageIndex =
                        index;

                    updateModalImage();

                }
            );

        }
    );


    /* =====================================================
       PREVIOUS IMAGE
    ===================================================== */

    if (prevImage) {

        prevImage.addEventListener(
            "click",
            () => {

                if (!currentImages.length) {
                    return;
                }


                currentImageIndex--;


                if (currentImageIndex < 0) {

                    currentImageIndex =
                        currentImages.length - 1;

                }


                updateModalImage();

            }
        );

    }


    /* =====================================================
       NEXT IMAGE
    ===================================================== */

    if (nextImage) {

        nextImage.addEventListener(
            "click",
            () => {

                if (!currentImages.length) {
                    return;
                }


                currentImageIndex++;


                if (
                    currentImageIndex >=
                    currentImages.length
                ) {

                    currentImageIndex = 0;

                }


                updateModalImage();

            }
        );

    }


    /* =====================================================
       CLOSE MODAL
    ===================================================== */

    function closeModal() {

        if (modal) {

            modal.classList.remove("show");

        }

        document.body.style.overflow = "";

    }


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeModal
        );

    }


    if (closeAction) {

        closeAction.addEventListener(
            "click",
            closeModal
        );

    }


    if (modal) {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    closeModal();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeModal();

            }

        }
    );


    /* =====================================================
       QUANTITY - MINUS
    ===================================================== */

    if (minusBtn) {

        minusBtn.addEventListener(
            "click",
            () => {

                let value =
                    parseInt(
                        orderQuantity.value
                    ) || 1;


                if (value > 1) {

                    value--;

                }


                orderQuantity.value =
                    value;

            }
        );

    }


    /* =====================================================
       QUANTITY - PLUS
    ===================================================== */

    if (plusBtn) {

        plusBtn.addEventListener(
            "click",
            () => {

                let value =
                    parseInt(
                        orderQuantity.value
                    ) || 1;


                if (
                    value <
                    currentMaxQuantity
                ) {

                    value++;

                }


                orderQuantity.value =
                    value;

            }
        );

    }


    /* =====================================================
       QUANTITY INPUT
    ===================================================== */

    if (orderQuantity) {

        orderQuantity.addEventListener(
            "input",
            () => {

                let value =
                    parseInt(
                        orderQuantity.value
                    ) || 1;


                if (value < 1) {

                    value = 1;

                }


                if (
                    value >
                    currentMaxQuantity
                ) {

                    value =
                        currentMaxQuantity;

                }


                orderQuantity.value =
                    value;

            }
        );

    }


    /* =====================================================
       ADD TO ORDER
    ===================================================== */

    function addToOrder() {

        /*
           Make sure a material card is selected.
        */

        if (!currentMaterialCard) {

            showToast(
                "Order Error",
                "Material information could not be found."
            );

            return;

        }


        /*
           Get the actual MaterialListing ID
           from the card.
        */

        const listingId =
            currentMaterialCard.dataset.listingId;


        /*
           IMPORTANT:
           Use orderQuantity.
           quantityValue does NOT exist.
        */

        const quantity =
            parseFloat(
                orderQuantity.value
            );


        if (!listingId) {

            showToast(
                "Order Error",
                "Material listing information is missing."
            );

            return;

        }


        if (
            !quantity ||
            quantity <= 0
        ) {

            showToast(
                "Invalid Quantity",
                "Please select a valid quantity."
            );

            return;

        }


        if (
            quantity >
            currentMaxQuantity
        ) {

            showToast(
                "Invalid Quantity",
                `Only ${currentMaxQuantity} ${currentMaterial.unit || "Ton"} is available.`
            );

            return;

        }


        /*
           Ask customer for delivery address.
        */

        const deliveryAddress =
            window.prompt(
                "Enter your complete delivery address:"
            );


        if (
            !deliveryAddress ||
            !deliveryAddress.trim()
        ) {

            return;

        }


        /*
           Prepare form data.
        */

        const formData =
            new FormData();


        formData.append(
            "listing_id",
            listingId
        );


        formData.append(
            "quantity",
            quantity
        );


        formData.append(
            "delivery_address",
            deliveryAddress.trim()
        );


        /*
           Get Django CSRF token.
        */

        const csrfToken =
            getCookie("csrftoken");


        /*
           Send order to Django backend.
        */

        fetch(
            "/customer/order/create/",
            {
                method: "POST",

                headers: {
                    "X-CSRFToken":
                        csrfToken
                },

                body: formData
            }
        )

            .then(response => {

                /*
                   Convert Django JSON response.
                */

                return response.json();

            })

            .then(data => {

                if (data.success) {

                    showToast(
                        "Order Placed",
                        `Order #${data.order_id} has been placed successfully.`
                    );


                    closeModal();


                    /*
                       Go to My Orders
                       after the toast appears.
                    */

                    setTimeout(
                        () => {

                            window.location.href =
                                "/customer/orders/";

                        },
                        1200
                    );


                } else {

                    showToast(
                        "Order Failed",
                        data.message ||
                        "Unable to place your order."
                    );

                }

            })

            .catch(error => {

                console.error(
                    "Order Error:",
                    error
                );


                showToast(
                    "Order Error",
                    "Something went wrong while placing the order."
                );

            });

    }


    /*
       IMPORTANT:
       Connect the Add to Order button
       to the function above.
    */

    if (addToOrderButton) {

    addToOrderButton.addEventListener(
        "click",
        addToOrder
    );

}


    /* =====================================================
       TOAST
    ===================================================== */

    function showToast(
        title,
        message
    ) {

        if (!toast) {
            return;
        }


        if (toastTitle) {

            toastTitle.textContent =
                title;

        }


        if (toastMessage) {

            toastMessage.textContent =
                message;

        }


        toast.classList.add("show");


        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            3200
        );

    }


    /* =====================================================
       FORMAT CURRENCY
    ===================================================== */

    function formatCurrency(value) {

        return "₹ " +
            Number(value).toLocaleString(
                "en-IN",
                {
                    maximumFractionDigits: 0
                }
            );

    }


    /* =====================================================
       FORMAT NUMBER
    ===================================================== */

    function formatNumber(value) {

        return Number(value).toLocaleString(
            "en-IN",
            {
                maximumFractionDigits: 2
            }
        );

    }


    /* =====================================================
       SIDEBAR
    ===================================================== */

    if (menuBtn) {

        menuBtn.addEventListener(
            "click",
            () => {

                if (sidebar) {

                    sidebar.classList.toggle(
                        "open"
                    );

                }


                if (sidebarOverlay) {

                    sidebarOverlay.classList.toggle(
                        "show"
                    );

                }

            }
        );

    }


    if (sidebarOverlay) {

        sidebarOverlay.addEventListener(
            "click",
            () => {

                if (sidebar) {

                    sidebar.classList.remove(
                        "open"
                    );

                }


                sidebarOverlay.classList.remove(
                    "show"
                );

            }
        );

    }


    /* =====================================================
       LOGOUT
    ===================================================== */

    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );


    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            () => {

                const confirmed =
                    confirm(
                        "Are you sure you want to logout?"
                    );


                if (confirmed) {

                    window.location.href =
                        "/logout/";

                }

            }
        );

    }


    /* =====================================================
       INITIAL LOAD
    ===================================================== */

    filterMaterials();


    console.log(
        "BuildConnect Customer Materials loaded successfully."
    );

});


/* =========================================================
   GET DJANGO CSRF COOKIE
========================================================= */

function getCookie(name) {

    let cookieValue = null;


    if (
        document.cookie &&
        document.cookie !== ""
    ) {

        const cookies =
            document.cookie.split(";");


        for (
            let i = 0;
            i < cookies.length;
            i++
        ) {

            const cookie =
                cookies[i].trim();


            if (
                cookie.substring(
                    0,
                    name.length + 1
                ) ===
                (name + "=")
            ) {

                cookieValue =
                    decodeURIComponent(
                        cookie.substring(
                            name.length + 1
                        )
                    );

                break;

            }

        }

    }


    return cookieValue;
}