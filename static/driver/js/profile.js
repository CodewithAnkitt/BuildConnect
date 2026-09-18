document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       TOAST
    ====================================================== */

    const toast =
        document.getElementById("driverToast");

    const toastText =
        toast ? toast.querySelector("span") : null;

    const toastClose =
        toast ? toast.querySelector("button") : null;


    let toastTimer;


    function showToast(message, type = "success") {

        if (!toast || !toastText) {
            return;
        }


        toastText.textContent = message;


        const icon =
            toast.querySelector("i");


        if (icon) {

            icon.className =
                type === "error"
                    ? "fa-solid fa-circle-exclamation"
                    : type === "info"
                        ? "fa-solid fa-circle-info"
                        : "fa-solid fa-circle-check";

        }


        toast.classList.add("show");


        clearTimeout(toastTimer);


        toastTimer =
            setTimeout(function () {

                toast.classList.remove("show");

            }, 3500);

    }


    window.showDriverToast =
        showToast;


    if (toastClose) {

        toastClose.addEventListener(
            "click",
            function () {

                toast.classList.remove("show");

            }
        );

    }



    /* =====================================================
       PROFILE PHOTO
    ====================================================== */

    const cameraBtn =
        document.getElementById("cameraBtn");


    if (cameraBtn) {

        cameraBtn.addEventListener(
            "click",
            function () {

                showToast(
                    "Profile photo upload will be connected to Django next.",
                    "info"
                );

            }
        );

    }



    /* =====================================================
       EDIT PROFILE
    ====================================================== */

    const editProfileBtn =
        document.getElementById(
            "editProfileBtn"
        );


    if (editProfileBtn) {

        editProfileBtn.addEventListener(
            "click",
            function () {

                showToast(
                    "Profile editing will be connected to Django next.",
                    "info"
                );

            }
        );

    }



    /* =====================================================
       CARD EDIT BUTTONS
    ====================================================== */

    document
        .querySelectorAll(".edit-section")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const section =
                        this.dataset.section;


                    const sectionNames = {

                        personal:
                            "Personal Information",

                        vehicle:
                            "Vehicle Information",

                        bank:
                            "Bank & Payments",

                        experience:
                            "Experience & Preferences"

                    };


                    showToast(
                        `${sectionNames[section] || "Profile"} editing will be connected to Django next.`,
                        "info"
                    );

                }
            );

        });



    /* =====================================================
       DOCUMENT VIEW
    ====================================================== */

    document
        .querySelectorAll(".document-view")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const documentName =
                        this.dataset.document ||
                        "Document";


                    showToast(
                        `${documentName} preview will open here.`,
                        "info"
                    );

                }
            );

        });



    /* =====================================================
       MANAGE DOCUMENTS
    ====================================================== */

    const manageDocuments =
        document.getElementById(
            "manageDocuments"
        );


    if (manageDocuments) {

        manageDocuments.addEventListener(
            "click",
            function () {

                showToast(
                    "Document management will be connected to Django next.",
                    "info"
                );

            }
        );

    }



    /* =====================================================
       ACCOUNT SETTINGS
    ====================================================== */

    document
        .querySelectorAll(
            ".account-options button"
        )
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const setting =
                        this.dataset.setting;


                    if (setting === "delete") {

                        const confirmed =
                            window.confirm(
                                "Are you sure you want to delete your BuildConnect account?"
                            );


                        if (confirmed) {

                            showToast(
                                "Account deletion will be connected to Django later.",
                                "error"
                            );

                        }

                        return;
                    }


                    if (setting === "password") {

                        showToast(
                            "Change Password will be connected to Django next.",
                            "info"
                        );

                        return;
                    }


                    if (setting === "notifications") {

                        showToast(
                            "Notification preferences will be available here.",
                            "info"
                        );

                        return;
                    }


                    if (setting === "privacy") {

                        showToast(
                            "Privacy & Security settings will be available here.",
                            "info"
                        );

                    }

                }
            );

        });



    /* =====================================================
       NOTIFICATIONS
    ====================================================== */

    const notificationBtn =
        document.getElementById(
            "notificationBtn"
        );


    if (notificationBtn) {

        notificationBtn.addEventListener(
            "click",
            function () {

                showToast(
                    "You have 3 new notifications.",
                    "info"
                );

            }
        );

    }



    /* =====================================================
       SEARCH
    ====================================================== */

    const search =
        document.getElementById(
            "topSearch"
        );


    if (search) {

        search.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" &&
                    this.value.trim()
                ) {

                    showToast(
                        `Searching for "${this.value.trim()}"...`,
                        "info"
                    );

                }

            }
        );

    }



    /* =====================================================
       CTRL + K SEARCH
    ====================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();


                if (search) {

                    search.focus();

                    search.select();

                }

            }

        }
    );

});