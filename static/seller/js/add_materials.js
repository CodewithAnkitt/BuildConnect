/* =========================================================
   BUILD CONNECT
   SELLER - ADD MATERIAL
   Frontend Only
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const mobileMenu =
        document.getElementById("mobileMenu");

    const sidebar =
        document.getElementById("sidebar");

    const uploadArea =
        document.getElementById("uploadArea");

    const imageInput =
        document.getElementById("materialImage");

    const imagePreview =
        document.getElementById("imagePreview");

    const emptyPreview =
        document.getElementById("emptyPreview");

    const previewBox =
        document.getElementById("previewBox");

    const materialName =
        document.getElementById("materialName");

    const description =
        document.getElementById("description");

    const price =
        document.getElementById("price");

    const stock =
        document.getElementById("stock");

    const addMaterialBtn =
        document.getElementById("addMaterialBtn");

    const cancelBtn =
        document.getElementById("cancelBtn");

    const backToMaterials =
        document.getElementById("backToMaterials");

    const notificationBtn =
        document.getElementById("notificationBtn");

    const globalSearch =
        document.getElementById("globalSearch");

    const characterCount =
        document.getElementById("characterCount");

    const nameError =
        document.getElementById("nameError");

    const imageError =
        document.getElementById("imageError");

    const priceError =
        document.getElementById("priceError");

    const stockError =
        document.getElementById("stockError");

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");


    let selectedImage = null;


    /* =====================================================
       TOAST
    ====================================================== */

    function showToast(message) {

        toastMessage.textContent = message;

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
       OPEN FILE SELECTOR
    ====================================================== */

    uploadArea.addEventListener("click", () => {

        imageInput.click();

    });


    /* =====================================================
       FILE SELECTED
    ====================================================== */

    imageInput.addEventListener("change", () => {

        if (imageInput.files.length > 0) {

            handleImage(imageInput.files[0]);

        }

    });


    /* =====================================================
       DRAG & DROP
    ====================================================== */

    uploadArea.addEventListener("dragover", (event) => {

        event.preventDefault();

        uploadArea.classList.add("dragover");

    });


    uploadArea.addEventListener("dragleave", () => {

        uploadArea.classList.remove("dragover");

    });


    uploadArea.addEventListener("drop", (event) => {

        event.preventDefault();

        uploadArea.classList.remove("dragover");

        const files = event.dataTransfer.files;

        if (files.length > 0) {

            const file = files[0];

            handleImage(file);

        }

    });


    /* =====================================================
       HANDLE IMAGE
    ====================================================== */

    function handleImage(file) {

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        const maxSize =
            5 * 1024 * 1024;


        /* TYPE */

        if (!allowedTypes.includes(file.type)) {

            imageError.textContent =
                "Please upload png, PNG or WebP image.";

            uploadArea.classList.add("upload-error");

            return;
        }


        /* SIZE */

        if (file.size > maxSize) {

            imageError.textContent =
                "Image size must be less than 5MB.";

            uploadArea.classList.add("upload-error");

            return;
        }


        /* VALID */

        imageError.textContent = "";

        uploadArea.classList.remove("upload-error");

        selectedImage = file;


        const reader =
            new FileReader();


        reader.onload = (event) => {

            imagePreview.src =
                event.target.result;

            imagePreview.style.display =
                "block";

            emptyPreview.style.display =
                "none";

            previewBox.classList.add(
                "has-image"
            );

        };


        reader.readAsDataURL(file);

    }


    /* =====================================================
       DESCRIPTION COUNTER
    ====================================================== */

    description.addEventListener("input", () => {

        const length =
            description.value.length;

        characterCount.textContent =
            `${length}/500`;

    });


    /* =====================================================
       CLEAR ERROR
    ====================================================== */

    materialName.addEventListener("input", () => {

        materialName.classList.remove(
            "input-error"
        );

        nameError.textContent = "";

    });


    price.addEventListener("input", () => {

        price.classList.remove(
            "input-error"
        );

        priceError.textContent = "";

    });


    stock.addEventListener("input", () => {

        stock.classList.remove(
            "input-error"
        );

        stockError.textContent = "";

    });


    /* =====================================================
       VALIDATION
    ====================================================== */

    function validateForm() {

        let valid = true;


        /* NAME */

        if (
            materialName.value.trim() === ""
        ) {

            materialName.classList.add(
                "input-error"
            );

            nameError.textContent =
                "Please enter material name.";

            valid = false;

        }


        /* IMAGE */

        if (!selectedImage) {

            uploadArea.classList.add(
                "upload-error"
            );

            imageError.textContent =
                "Please upload a material image.";

            valid = false;

        }


        /* PRICE */

        if (
            price.value === "" ||
            Number(price.value) <= 0
        ) {

            price.classList.add(
                "input-error"
            );

            priceError.textContent =
                "Please enter a valid price.";

            valid = false;

        }


        /* STOCK */

        if (
            stock.value === "" ||
            Number(stock.value) <= 0
        ) {

            stock.classList.add(
                "input-error"
            );

            stockError.textContent =
                "Please enter available stock.";

            valid = false;

        }


        return valid;

    }


    /* =====================================================
       ADD MATERIAL
    ====================================================== */

    addMaterialBtn.addEventListener(
        "click",
        () => {

            if (!validateForm()) {

                showToast(
                    "Please complete all required fields."
                );

                return;

            }


            const status =
                document.querySelector(
                    'input[name="materialStatus"]:checked'
                ).value;


            const material = {

                id: Date.now(),

                name:
                    materialName.value.trim(),

                description:
                    description.value.trim(),

                price:
                    Number(price.value),

                stock:
                    Number(stock.value),

                status:
                    status,

                image:
                    imagePreview.src,

                createdAt:
                    new Date().toISOString()

            };


            /* =================================================
               SAVE FRONTEND DATA
            ================================================== */

            let materials =
                JSON.parse(
                    localStorage.getItem(
                        "buildConnectMaterials"
                    )
                ) || [];


            materials.push(material);


            localStorage.setItem(
                "buildConnectMaterials",
                JSON.stringify(materials)
            );


            showToast(
                `${material.name} added successfully!`
            );


            /* =================================================
               REDIRECT AFTER ADD
            ================================================== */

            setTimeout(() => {

                /*
                 * Frontend prototype:
                 * Go back to My Materials page.
                 */

                window.location.href =
                    "/seller/materials/";

            }, 1200);

        }
    );


    /* =====================================================
       CANCEL
    ====================================================== */

    cancelBtn.addEventListener(
        "click",
        () => {

            window.location.href =
                "/seller/materials/";

        }
    );


    /* =====================================================
       BACK TO MATERIALS
    ====================================================== */

    backToMaterials.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            window.location.href =
                "/seller/materials/";

        }
    );


    /* =====================================================
       NOTIFICATION
    ====================================================== */

    notificationBtn.addEventListener(
        "click",
        () => {

            showToast(
                "You have 1 new notification."
            );

        }
    );


    /* =====================================================
       CTRL + K
    ====================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                (event.ctrlKey ||
                    event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();

                globalSearch.focus();

            }

        }
    );


    /* =====================================================
       COMING SOON NAVIGATION
    ====================================================== */

    document.querySelectorAll(
        ".coming-soon"
    ).forEach(item => {

        item.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                showToast(
                    "This section will be connected next."
                );

            }
        );

    });


    /* =====================================================
       INITIAL ANIMATION
    ====================================================== */

    const cards =
        document.querySelectorAll(
            ".form-card, .side-card"
        );

    cards.forEach((card, index) => {

        card.style.opacity = "0";

        card.style.transform =
            "translateY(12px)";


        setTimeout(() => {

            card.style.transition =
                "opacity .45s ease, transform .45s ease";

            card.style.opacity = "1";

            card.style.transform =
                "translateY(0)";

        }, 100 + index * 100);

    });

});