document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MOBILE SIDEBAR
    ========================== */

    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const sidebar = document.querySelector(".sidebar");

    if (mobileMenuBtn && sidebar) {
        mobileMenuBtn.addEventListener("click", () => {
            sidebar.classList.toggle("mobile-open");
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener("click", (event) => {
        if (
            sidebar &&
            sidebar.classList.contains("mobile-open") &&
            !sidebar.contains(event.target) &&
            !mobileMenuBtn?.contains(event.target)
        ) {
            sidebar.classList.remove("mobile-open");
        }
    });


    /* =========================
       TOAST MESSAGE
    ========================== */

    function showToast(message, type = "info") {

        let toastContainer = document.querySelector(".toast-container");

        if (!toastContainer) {
            toastContainer = document.createElement("div");
            toastContainer.className = "toast-container";
            document.body.appendChild(toastContainer);
        }

        const toast = document.createElement("div");
        toast.className = `profile-toast ${type}`;

        let icon = "bi-info-circle";

        if (type === "success") {
            icon = "bi-check-circle-fill";
        } else if (type === "warning") {
            icon = "bi-exclamation-circle-fill";
        }

        toast.innerHTML = `
            <i class="bi ${icon}"></i>
            <span>${message}</span>
            <button class="toast-close" type="button">
                <i class="bi bi-x"></i>
            </button>
        `;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add("show");
        }, 50);

        const closeBtn = toast.querySelector(".toast-close");

        closeBtn.addEventListener("click", () => {
            removeToast(toast);
        });

        setTimeout(() => {
            removeToast(toast);
        }, 3500);
    }


    function removeToast(toast) {
        toast.classList.remove("show");

        setTimeout(() => {
            toast.remove();
        }, 300);
    }


    /* =========================
       SEARCH
    ========================== */

    const searchInput = document.querySelector(".nav-search input");

    if (searchInput) {

        searchInput.addEventListener("keydown", (event) => {

            if (event.key === "Enter") {

                const searchValue = searchInput.value.trim();

                if (searchValue !== "") {
                    showToast(
                        `Searching for "${searchValue}"...`,
                        "info"
                    );
                }
            }
        });
    }


    /* =========================
       CTRL + K SEARCH
    ========================== */

    document.addEventListener("keydown", (event) => {

        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {

            event.preventDefault();

            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }
    });


    /* =========================
       NOTIFICATION
    ========================== */

    const notificationBtn = document.querySelector(".notification-btn");

    if (notificationBtn) {

        notificationBtn.addEventListener("click", () => {

            showToast(
                "You have 3 new notifications.",
                "info"
            );

        });
    }


    /* =========================
       EDIT PROFILE
    ========================== */

    const editProfileBtn = document.querySelector(".edit-profile-btn");

    if (editProfileBtn) {

        editProfileBtn.addEventListener("click", () => {

            showToast(
                "Profile editing will be available here.",
                "info"
            );

        });
    }


    /* =========================
       EDIT BUSINESS
    ========================== */

    const editBusinessBtn = document.querySelector(".edit-business-btn");

    if (editBusinessBtn) {

        editBusinessBtn.addEventListener("click", () => {

            showToast(
                "Business information editing will be available here.",
                "info"
            );

        });
    }


    /* =========================
       PROFILE AVATAR CAMERA
    ========================== */

    const avatarCamera = document.querySelector(".avatar-camera");

    if (avatarCamera) {

        avatarCamera.addEventListener("click", () => {

            showToast(
                "Profile photo upload will be available here.",
                "info"
            );

        });
    }


    /* =========================
       SECURITY OPTIONS
    ========================== */

    const securityOptions = document.querySelectorAll(
        ".security-option"
    );

    securityOptions.forEach((option) => {

        option.addEventListener("click", () => {

            const titleElement = option.querySelector(".option-title");

            const title = titleElement
                ? titleElement.textContent.trim()
                : "Security option";

            showToast(
                `${title} section opened.`,
                "info"
            );

        });

    });


    /* =========================
       PREFERENCE OPTIONS
    ========================== */

    const preferenceOptions = document.querySelectorAll(
        ".preference-option"
    );

    preferenceOptions.forEach((option) => {

        option.addEventListener("click", () => {

            const titleElement = option.querySelector(".option-title");

            const title = titleElement
                ? titleElement.textContent.trim()
                : "Preference";

            showToast(
                `${title} settings opened.`,
                "info"
            );

        });

    });


    /* =========================
       SUMMARY CARD ANIMATION
    ========================== */

    const statCards = document.querySelectorAll(".stat-card");

    statCards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(15px)";

        setTimeout(() => {

            card.style.transition =
                "opacity 0.5s ease, transform 0.5s ease";

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }, 100 + (index * 100));

    });


    /* =========================
       CONTENT CARD ANIMATION
    ========================== */

    const contentCards = document.querySelectorAll(".content-card");

    contentCards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(15px)";

        setTimeout(() => {

            card.style.transition =
                "opacity 0.5s ease, transform 0.5s ease";

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }, 300 + (index * 100));

    });


    /* =========================
       ACTIVE SIDEBAR PROFILE
    ========================== */

    const sidebarLinks = document.querySelectorAll(".sidebar-nav a");

    sidebarLinks.forEach((link) => {

        link.addEventListener("click", () => {

            sidebarLinks.forEach((item) => {
                item.classList.remove("active");
            });

            link.classList.add("active");

        });

    });

});