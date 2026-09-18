/* =========================================================
   BUILD CONNECT - DRIVER SETTINGS
   FINAL JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       TOAST
    ===================================================== */

    const toast = document.getElementById("settingsToast");
    const toastMessage = document.getElementById("toastMessage");

    let toastTimer;


    function showToast(message) {

        if (!toast) {
            return;
        }

        toastMessage.textContent = message;

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(function () {

            toast.classList.remove("show");

        }, 2800);
    }



    /* =====================================================
       NOTIFICATION BUTTON
    ===================================================== */

    const notificationBtn =
        document.getElementById("notificationBtn");

    if (notificationBtn) {

        notificationBtn.addEventListener(
            "click",
            function () {

                showToast(
                    "You have 3 new notifications."
                );

            }
        );

    }



    /* =====================================================
       PASSWORD SHOW / HIDE
    ===================================================== */

    const passwordToggles =
        document.querySelectorAll(".password-toggle");


    passwordToggles.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const targetId =
                    button.getAttribute("data-target");

                const input =
                    document.getElementById(targetId);

                if (!input) {
                    return;
                }


                if (input.type === "password") {

                    input.type = "text";

                    button.innerHTML =
                        '<i class="fa-regular fa-eye-slash"></i>';

                } else {

                    input.type = "password";

                    button.innerHTML =
                        '<i class="fa-regular fa-eye"></i>';

                }

            }
        );

    });



    /* =====================================================
       PASSWORD FORM
    ===================================================== */

    const passwordForm =
        document.getElementById("passwordForm");


    if (passwordForm) {

        passwordForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const currentPassword =
                    document.getElementById(
                        "currentPassword"
                    ).value.trim();


                const newPassword =
                    document.getElementById(
                        "newPassword"
                    ).value.trim();


                const confirmPassword =
                    document.getElementById(
                        "confirmPassword"
                    ).value.trim();


                if (!currentPassword) {

                    showToast(
                        "Please enter your current password."
                    );

                    return;
                }


                if (!newPassword) {

                    showToast(
                        "Please enter a new password."
                    );

                    return;
                }


                if (newPassword.length < 8) {

                    showToast(
                        "New password must contain at least 8 characters."
                    );

                    return;
                }


                if (newPassword !== confirmPassword) {

                    showToast(
                        "New passwords do not match."
                    );

                    return;
                }


                showToast(
                    "Password details validated successfully."
                );


                passwordForm.reset();

            }
        );

    }



    /* =====================================================
       NOTIFICATION TOGGLES
    ===================================================== */

    const switches =
        document.querySelectorAll(
            '.switch input[type="checkbox"]'
        );


    switches.forEach(function (toggle) {

        toggle.addEventListener(
            "change",
            function () {

                const settingName =
                    toggle.getAttribute(
                        "data-setting"
                    );


                const labels = {

                    "job-alerts":
                        "New job alerts",

                    "application-updates":
                        "Application updates",

                    "payment-notifications":
                        "Payment notifications",

                    "sms-notifications":
                        "SMS notifications",

                    "email-notifications":
                        "Email notifications"

                };


                const name =
                    labels[settingName] ||
                    "Notification";


                if (toggle.checked) {

                    showToast(
                        name + " enabled."
                    );

                } else {

                    showToast(
                        name + " disabled."
                    );

                }

            }
        );

    });



    /* =====================================================
       DRIVING PREFERENCES
    ===================================================== */

    const preferenceSelects =
        document.querySelectorAll(
            ".preference-select"
        );


    preferenceSelects.forEach(function (select) {

        select.addEventListener(
            "change",
            function () {

                const preference =
                    select.getAttribute(
                        "data-preference"
                    );


                const names = {

                    "job-type":
                        "Preferred job type",

                    "location":
                        "Preferred locations",

                    "vehicle":
                        "Vehicle preference",

                    "availability":
                        "Availability status"

                };


                const name =
                    names[preference] ||
                    "Preference";


                showToast(
                    name + " updated."
                );

            }
        );

    });



    /* =====================================================
       LANGUAGE
    ===================================================== */

    const languageSelect =
        document.getElementById(
            "languageSelect"
        );


    if (languageSelect) {

        languageSelect.addEventListener(
            "change",
            function () {

                const language =
                    languageSelect.value;


                if (language === "hi") {

                    showToast(
                        "Hindi selected. Language integration will be connected with Django."
                    );

                } else {

                    showToast(
                        "English selected."
                    );

                }

            }
        );

    }



    /* =====================================================
       PRIVACY & SECURITY ACTIONS
    ===================================================== */

    const actionButtons =
        document.querySelectorAll(
            "[data-action]"
        );


    actionButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const action =
                    button.getAttribute(
                        "data-action"
                    );


                if (action === "login-security") {

                    showToast(
                        "Login Security settings coming soon."
                    );

                    return;
                }


                if (action === "sessions") {

                    showToast(
                        "Active Sessions will be available soon."
                    );

                    return;
                }


                if (action === "privacy") {

                    showToast(
                        "Privacy Settings will be available soon."
                    );

                    return;
                }


                if (action === "deactivate") {

                    const confirmed =
                        window.confirm(
                            "Are you sure you want to deactivate your account?"
                        );


                    if (confirmed) {

                        showToast(
                            "Account deactivation request selected."
                        );

                    }

                    return;
                }


                if (action === "delete") {

                    const confirmed =
                        window.confirm(
                            "Are you sure you want to delete your account? This action cannot be undone."
                        );


                    if (confirmed) {

                        showToast(
                            "Account deletion request selected."
                        );

                    }

                    return;
                }

            }
        );

    });



    /* =====================================================
       GLOBAL SEARCH - CTRL + K
    ===================================================== */

    const globalSearch =
        document.getElementById(
            "globalSearch"
        );


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();

                if (globalSearch) {

                    globalSearch.focus();

                }

            }

        }
    );


    if (globalSearch) {

        globalSearch.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    const value =
                        globalSearch.value.trim();


                    if (value !== "") {

                        showToast(
                            'Searching for "' +
                            value +
                            '"...'
                        );

                    }

                }

            }
        );

    }



    /* =====================================================
       MOBILE SIDEBAR
    ===================================================== */

    const sidebar =
        document.querySelector(
            ".driver-sidebar"
        );


    const mobileMenu =
        document.getElementById(
            "mobileMenuBtn"
        );


    if (mobileMenu && sidebar) {

        mobileMenu.addEventListener(
            "click",
            function () {

                sidebar.classList.toggle(
                    "open"
                );

            }
        );


        document.addEventListener(
            "click",
            function (event) {

                if (
                    window.innerWidth <= 800 &&
                    sidebar.classList.contains("open") &&
                    !sidebar.contains(event.target) &&
                    !mobileMenu.contains(event.target)
                ) {

                    sidebar.classList.remove(
                        "open"
                    );

                }

            }
        );

    }



    /* =====================================================
       SIDEBAR ACTIVE LINK
    ===================================================== */

    const sidebarLinks =
        document.querySelectorAll(
            ".sidebar-link"
        );


    sidebarLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                sidebarLinks.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                link.classList.add(
                    "active"
                );

            }
        );

    });



    /* =====================================================
       PROFILE BUTTON
    ===================================================== */

    const topUser =
        document.querySelector(
            ".top-user"
        );


    if (topUser) {

        topUser.addEventListener(
            "click",
            function () {

                window.location.href =
                    "{% url 'driver_profile' %}";

            }
        );

    }



    /* =====================================================
       INITIAL LOAD
    ===================================================== */

    console.log(
        "BuildConnect Driver Settings loaded successfully."
    );

});