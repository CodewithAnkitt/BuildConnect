/* =========================================================
   BUILDCONNECT - CUSTOMER PROFILE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE SIDEBAR
    ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const sidebar = document.querySelector(".sidebar");

    if (menuBtn && sidebar) {
        menuBtn.addEventListener("click", () => {
            sidebar.classList.toggle("open");
        });
    }


    /* =====================================================
       SAVE PROFILE
    ===================================================== */

    const profileForm = document.getElementById("profileForm");
    const saveProfileBtn = document.getElementById("saveProfileBtn");

    if (profileForm && saveProfileBtn) {

        profileForm.addEventListener("submit", (event) => {
            event.preventDefault();
        });

        saveProfileBtn.addEventListener("click", () => {

            if (!profileForm.checkValidity()) {
                profileForm.reportValidity();
                return;
            }

            const originalText = saveProfileBtn.innerHTML;

            saveProfileBtn.innerHTML =
                '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';

            saveProfileBtn.disabled = true;

            setTimeout(() => {

                saveProfileBtn.innerHTML =
                    '<i class="fa-solid fa-circle-check"></i> Saved';

                showToast(
                    "Profile updated successfully.",
                    "success"
                );

                setTimeout(() => {

                    saveProfileBtn.innerHTML = originalText;
                    saveProfileBtn.disabled = false;

                }, 1800);

            }, 900);

        });
    }


    /* =====================================================
       PASSWORD VISIBILITY
    ===================================================== */

    const passwordEyes =
        document.querySelectorAll(".password-eye");

    passwordEyes.forEach(button => {

        button.addEventListener("click", () => {

            const targetId =
                button.getAttribute("data-target");

            const input =
                document.getElementById(targetId);

            if (!input) return;

            const icon =
                button.querySelector("i");

            if (input.type === "password") {

                input.type = "text";

                icon.classList.remove("fa-eye");
                icon.classList.add("fa-eye-slash");

            } else {

                input.type = "password";

                icon.classList.remove("fa-eye-slash");
                icon.classList.add("fa-eye");

            }

        });

    });


    /* =====================================================
       CHANGE PASSWORD
    ===================================================== */

    const passwordForm =
        document.getElementById("passwordForm");

    if (passwordForm) {

        passwordForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const currentPassword =
                document.getElementById("currentPassword");

            const newPassword =
                document.getElementById("newPassword");

            const confirmPassword =
                document.getElementById("confirmPassword");

            if (
                !currentPassword ||
                !newPassword ||
                !confirmPassword
            ) {
                return;
            }


            if (!currentPassword.value.trim()) {

                showToast(
                    "Please enter your current password.",
                    "error"
                );

                currentPassword.focus();

                return;
            }


            if (newPassword.value.length < 8) {

                showToast(
                    "New password must contain at least 8 characters.",
                    "error"
                );

                newPassword.focus();

                return;
            }


            if (
                newPassword.value !==
                confirmPassword.value
            ) {

                showToast(
                    "New passwords do not match.",
                    "error"
                );

                confirmPassword.focus();

                return;
            }


            showToast(
                "Password updated successfully.",
                "success"
            );

            passwordForm.reset();

        });

    }


    /* =====================================================
       PREFERENCES
    ===================================================== */

    const preferenceToggles =
        document.querySelectorAll(
            'input[data-preference]'
        );

    preferenceToggles.forEach(toggle => {

        toggle.addEventListener("change", () => {

            const preference =
                toggle.getAttribute(
                    "data-preference"
                );

            const enabled =
                toggle.checked;

            let preferenceName =
                "Preference";

            switch (preference) {

                case "email":
                    preferenceName =
                        "Email notifications";
                    break;

                case "sms":
                    preferenceName =
                        "SMS notifications";
                    break;

                case "marketing":
                    preferenceName =
                        "Marketing updates";
                    break;

                case "dark":
                    preferenceName =
                        "Dark mode";
                    break;

            }


            if (preference === "dark") {

                if (enabled) {
                    document.body.classList.add("dark-preview");
                } else {
                    document.body.classList.remove("dark-preview");
                }

                showToast(
                    `${preferenceName} ${enabled ? "enabled" : "disabled"}.`,
                    "success"
                );

                return;
            }


            showToast(
                `${preferenceName} ${enabled ? "enabled" : "disabled"}.`,
                "success"
            );

        });

    });


    /* =====================================================
       QUICK ACTIONS
    ===================================================== */

    const quickActions =
        document.querySelectorAll(
            ".quick-action"
        );

    quickActions.forEach(action => {

        action.addEventListener("click", () => {

            const actionType =
                action.getAttribute(
                    "data-action"
                );


            if (actionType === "edit") {

                const fullName =
                    document.getElementById("fullName");

                if (fullName) {
                    fullName.focus();
                    fullName.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
                }

                showToast(
                    "You can edit your profile information above.",
                    "success"
                );

            }


            else if (actionType === "password") {

                const password =
                    document.getElementById(
                        "currentPassword"
                    );

                if (password) {

                    password.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                    setTimeout(() => {
                        password.focus();
                    }, 500);

                }

            }


            else if (actionType === "notifications") {

                const preferences =
                    document.querySelector(
                        ".preferences-list"
                    );

                if (preferences) {

                    preferences.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }

                showToast(
                    "Notification preferences are shown below.",
                    "success"
                );

            }


            else if (actionType === "delete") {

                const confirmed =
                    confirm(
                        "Are you sure you want to delete your BuildConnect account?\n\nThis action cannot be undone."
                    );

                if (confirmed) {

                    showToast(
                        "Account deletion request submitted.",
                        "error"
                    );

                }

            }

        });

    });


    /* =====================================================
       PROFILE PHOTO
    ===================================================== */

    const cameraBtn =
        document.querySelector(".camera-btn");

    if (cameraBtn) {

        cameraBtn.addEventListener("click", () => {

            showToast(
                "Profile photo upload will be connected to Django shortly.",
                "success"
            );

        });

    }


    /* =====================================================
       NOTIFICATIONS
    ===================================================== */

    const notificationBtn =
        document.getElementById(
            "notificationBtn"
        );

    if (notificationBtn) {

        notificationBtn.addEventListener(
            "click",
            () => {

                showToast(
                    "You have 3 new notifications.",
                    "success"
                );

            }
        );

    }


    // /* =====================================================
    //    HELP & SUPPORT
    // ===================================================== */

    // const comingSoon =
    //     document.querySelectorAll(
    //         ".coming-soon"
    //     );

    // comingSoon.forEach(link => {

    //     link.addEventListener("click", event => {

    //         event.preventDefault();

    //         showToast(
    //             "Help & Support is coming soon.",
    //             "success"
    //         );

    //     });

    // });


    /* =====================================================
       TOAST MESSAGE
    ===================================================== */

    function showToast(message, type = "success") {

        const existingToast =
            document.querySelector(".profile-toast");

        if (existingToast) {
            existingToast.remove();
        }


        const toast =
            document.createElement("div");

        toast.className =
            `profile-toast ${type}`;


        const icon =
            type === "error"
                ? "fa-circle-exclamation"
                : "fa-circle-check";


        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fa-solid ${icon}"></i>
            </div>

            <span>${message}</span>

            <button class="toast-close">
                <i class="fa-solid fa-xmark"></i>
            </button>
        `;


        document.body.appendChild(toast);


        requestAnimationFrame(() => {
            toast.classList.add("show");
        });


        const closeBtn =
            toast.querySelector(
                ".toast-close"
            );

        closeBtn.addEventListener(
            "click",
            () => {

                toast.classList.remove("show");

                setTimeout(() => {
                    toast.remove();
                }, 300);

            }
        );


        setTimeout(() => {

            if (document.body.contains(toast)) {

                toast.classList.remove("show");

                setTimeout(() => {

                    if (
                        document.body.contains(toast)
                    ) {
                        toast.remove();
                    }

                }, 300);

            }

        }, 3500);

    }


    /* =====================================================
       CLOSE SIDEBAR ON MOBILE
       ===================================================== */

    document.addEventListener("click", event => {

        if (
            window.innerWidth <= 760 &&
            sidebar &&
            sidebar.classList.contains("open") &&
            !sidebar.contains(event.target) &&
            event.target !== menuBtn
        ) {

            sidebar.classList.remove("open");

        }

    });

});