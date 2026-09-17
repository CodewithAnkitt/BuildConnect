document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       PROFILE PHOTO
    ===================================================== */

    const cameraButton =
        document.getElementById("cameraButton");

    const profilePhoto =
        document.getElementById("profilePhoto");


    if (cameraButton) {

        cameraButton.addEventListener(
            "click",
            function () {

                showToast(
                    "Profile photo upload will be available soon.",
                    "info"
                );

            }
        );

    }



    /* =====================================================
       EDIT PROFILE
    ===================================================== */

    const editProfileButton =
        document.getElementById(
            "editProfileButton"
        );


    if (editProfileButton) {

        editProfileButton.addEventListener(
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
    ===================================================== */

    document
        .querySelectorAll(".card-edit")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const section =
                        this.dataset.section;


                    let message =
                        "This section will be editable soon.";


                    if (section === "personal") {

                        message =
                            "Personal information editing will be connected to Django next.";

                    }

                    else if (section === "vehicle") {

                        message =
                            "Vehicle information editing will be connected to Django next.";

                    }

                    else if (section === "experience") {

                        message =
                            "Experience and preferences editing will be connected to Django next.";

                    }

                    else if (section === "bank") {

                        message =
                            "Bank details editing will be connected to Django next.";

                    }


                    showToast(
                        message,
                        "info"
                    );

                }
            );

        });



    /* =====================================================
       DOCUMENT VIEW
    ===================================================== */

    document
        .querySelectorAll(".view-document")
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
    ===================================================== */

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
    ===================================================== */

    document
        .querySelectorAll(".setting-row")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const setting =
                        this.dataset.setting;


                    if (setting === "delete") {

                        const confirmDelete =
                            confirm(
                                "Are you sure you want to delete your BuildConnect account?"
                            );


                        if (confirmDelete) {

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

                    }

                }
            );

        });



    /* =====================================================
       NOTIFICATION
    ===================================================== */

    const notificationButton =
        document.getElementById(
            "notificationButton"
        );


    if (notificationButton) {

        notificationButton.addEventListener(
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
       TOP PROFILE
    ===================================================== */

    const topProfile =
        document.getElementById(
            "topProfile"
        );


    if (topProfile) {

        topProfile.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }



    /* =====================================================
       SEARCH
    ===================================================== */

    const topSearch =
        document.getElementById(
            "topSearch"
        );


    if (topSearch) {

        topSearch.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" &&
                    this.value.trim() !== ""
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
       MOBILE SIDEBAR
    ===================================================== */

    /*
       The existing driver dashboard can add a mobile
       menu button later. This function is kept ready
       for that implementation.
    */

    const sidebar =
        document.querySelector(
            ".driver-sidebar"
        );


    document.addEventListener(
        "click",
        function (event) {

            if (
                window.innerWidth <= 760 &&
                sidebar &&
                sidebar.classList.contains("open") &&
                !event.target.closest(".driver-sidebar")
            ) {

                sidebar.classList.remove(
                    "open"
                );

            }

        }
    );

});



/* =========================================================
   TOAST FUNCTION
========================================================= */

function showToast(
    message,
    type = "success"
) {

    const existing =
        document.querySelector(
            ".driver-toast"
        );


    if (existing) {
        existing.remove();
    }


    const toast =
        document.createElement(
            "div"
        );


    toast.className =
        "driver-toast";


    if (type === "info") {

        toast.classList.add(
            "info"
        );

    }


    if (type === "error") {

        toast.classList.add(
            "error"
        );

    }


    let icon =
        "fa-circle-check";


    if (type === "info") {

        icon =
            "fa-circle-info";

    }

    else if (type === "error") {

        icon =
            "fa-circle-exclamation";

    }


    toast.innerHTML = `

        <i class="fa-solid ${icon}"></i>

        <span>
            ${message}
        </span>

        <button
            type="button"
            class="toast-close"
            aria-label="Close notification"
        >
            <i class="fa-solid fa-xmark"></i>
        </button>

    `;


    document.body.appendChild(
        toast
    );


    setTimeout(function () {

        toast.classList.add(
            "show"
        );

    }, 20);


    const closeButton =
        toast.querySelector(
            ".toast-close"
        );


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            function () {

                removeToast(
                    toast
                );

            }
        );

    }


    setTimeout(function () {

        if (
            toast &&
            toast.parentNode
        ) {

            removeToast(
                toast
            );

        }

    }, 3500);

}



/* =========================================================
   REMOVE TOAST
========================================================= */

function removeToast(toast) {

    toast.classList.remove(
        "show"
    );


    setTimeout(function () {

        if (
            toast &&
            toast.parentNode
        ) {

            toast.remove();

        }

    }, 250);

}