/* =========================================================
   BUILD CONNECT
   SELLER PROFILE
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

    const editPersonalBtn =
        document.getElementById("editPersonalBtn");

    const editBusinessBtn =
        document.getElementById("editBusinessBtn");

    const changePhotoBtn =
        document.getElementById("changePhotoBtn");

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");


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
       CTRL + K
    ====================================================== */

    document.addEventListener("keydown", (event) => {

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            globalSearch.focus();

        }

    });


    /* =====================================================
       SEARCH
    ====================================================== */

    globalSearch.addEventListener(
        "input",
        () => {

            const value =
                globalSearch.value.trim();

            if (value.length > 2) {

                showToast(
                    `Searching for "${value}"`
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
                "You have 1 new notification."
            );

        }
    );


    /* =====================================================
       EDIT PERSONAL INFORMATION
    ====================================================== */

    editPersonalBtn.addEventListener(
        "click",
        () => {

            showToast(
                "Personal information editing will be connected later."
            );

        }
    );


    /* =====================================================
       EDIT BUSINESS INFORMATION
    ====================================================== */

    editBusinessBtn.addEventListener(
        "click",
        () => {

            showToast(
                "Business information editing will be connected later."
            );

        }
    );


    /* =====================================================
       CHANGE PROFILE PHOTO
    ====================================================== */

    changePhotoBtn.addEventListener(
        "click",
        () => {

            showToast(
                "Profile photo upload will be connected later."
            );

        }
    );


    /* =====================================================
       DOCUMENT VIEW BUTTONS
    ====================================================== */

    document.querySelectorAll(
        ".view-document"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const documentName =
                    button
                    .closest(".document-row")
                    .querySelector(".document-info strong")
                    .textContent
                    .trim();

                showToast(
                    `Opening ${documentName}.`
                );

            }
        );

    });


    /* =====================================================
       SECURITY SETTINGS
    ====================================================== */

    document.querySelectorAll(
        ".setting-row"
    ).forEach(row => {

        row.addEventListener(
            "click",
            () => {

                const title =
                    row
                    .querySelector(".setting-info strong")
                    .textContent
                    .trim();

                showToast(
                    `${title} will be connected later.`
                );

            }
        );

    });


    /* =====================================================
       NOTIFICATION TOGGLES
    ====================================================== */

    document.querySelectorAll(
        ".switch input"
    ).forEach(toggle => {

        toggle.addEventListener(
            "change",
            () => {

                const preference =
                    toggle
                    .closest(".preference-row")
                    .querySelector(
                        ".preference-info strong"
                    )
                    .textContent
                    .trim();

                const status =
                    toggle.checked
                        ? "enabled"
                        : "disabled";

                showToast(
                    `${preference} ${status}.`
                );

            }
        );

    });


    /* =====================================================
       BUSINESS TYPE
    ====================================================== */

    const businessType =
        document.getElementById("businessType");

    businessType.addEventListener(
        "change",
        () => {

            showToast(
                `Business type selected: ${businessType.value}`
            );

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

    const cards =
        document.querySelectorAll(
            ".summary-card, .profile-card"
        );

    cards.forEach(
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

            }, 70 + index * 55);

        }
    );

});