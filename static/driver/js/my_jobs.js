/* =========================================================
   BUILD CONNECT — DRIVER MY JOBS
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const jobList =
        document.getElementById("myJobsList");

    const jobCards =
        Array.from(
            document.querySelectorAll(".my-job-card")
        );

    const tabs =
        document.querySelectorAll(".job-tab");

    const jobCount =
        document.getElementById("jobCount");

    const sortJobs =
        document.getElementById("sortJobs");

    const topSearch =
        document.getElementById("topSearch");


    /* =====================================================
       FILTER BY STATUS
    ===================================================== */

    tabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

            tabs.forEach(function (item) {

                item.classList.remove("active");

            });

            this.classList.add("active");


            const selectedStatus =
                this.dataset.status;


            let visibleCount = 0;


            jobCards.forEach(function (card) {

                const cardStatus =
                    card.dataset.status;


                if (
                    selectedStatus === "all" ||
                    cardStatus === selectedStatus
                ) {

                    card.style.display = "";

                    visibleCount++;

                } else {

                    card.style.display = "none";

                }

            });


            updateJobCount(visibleCount);

        });

    });



    /* =====================================================
       SORT JOBS
    ===================================================== */

    if (sortJobs) {

        sortJobs.addEventListener(
            "change",
            function () {

                const value =
                    this.value;


                const sortedCards =
                    [...jobCards].sort(
                        function (a, b) {


                            if (
                                value === "payment"
                            ) {

                                return (
                                    Number(
                                        b.dataset.payment
                                    ) -
                                    Number(
                                        a.dataset.payment
                                    )
                                );

                            }


                            if (
                                value === "oldest"
                            ) {

                                return (
                                    new Date(
                                        a.dataset.date
                                    ) -
                                    new Date(
                                        b.dataset.date
                                    )
                                );

                            }


                            /* Newest */

                            return (
                                new Date(
                                    b.dataset.date
                                ) -
                                new Date(
                                    a.dataset.date
                                )
                            );

                        }
                    );


                sortedCards.forEach(
                    function (card) {

                        jobList.appendChild(card);

                    }
                );

            }
        );

    }



    /* =====================================================
       SEARCH FROM TOP BAR
    ===================================================== */

    if (topSearch) {

        topSearch.addEventListener(
            "input",
            function () {

                const search =
                    this.value
                        .trim()
                        .toLowerCase();


                let visibleCount = 0;


                jobCards.forEach(
                    function (card) {

                        const cardText =
                            card.innerText.toLowerCase();


                        if (
                            search === "" ||
                            cardText.includes(search)
                        ) {

                            card.style.display = "";

                            visibleCount++;

                        } else {

                            card.style.display = "none";

                        }

                    }
                );


                updateJobCount(
                    visibleCount
                );


                /* Reset tab highlight while searching */

                if (search !== "") {

                    tabs.forEach(
                        function (tab) {

                            tab.classList.remove(
                                "active"
                            );

                        }
                    );

                } else {

                    tabs.forEach(
                        function (tab) {

                            tab.classList.remove(
                                "active"
                            );

                        }
                    );

                    if (tabs[0]) {

                        tabs[0].classList.add(
                            "active"
                        );

                    }

                }

            }
        );

    }



    /* =====================================================
       VIEW DETAILS
    ===================================================== */

    document
        .querySelectorAll(".view-job-button")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const card =
                        this.closest(
                            ".my-job-card"
                        );


                    if (!card) {
                        return;
                    }


                    const title =
                        card.querySelector(
                            ".job-heading h2"
                        );


                    const jobName =
                        title
                            ? title.textContent.trim()
                            : "Job";


                    showToast(
                        `Opening details for "${jobName}".`,
                        "info"
                    );

                }
            );

        });



    /* =====================================================
       NOTIFICATIONS
    ===================================================== */

    const notificationButton =
        document.querySelector(
            ".notification-button"
        );


    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            function () {

                showToast(
                    "You have 3 new driver notifications.",
                    "info"
                );

            }
        );

    }



    /* =====================================================
       PROFILE
    ===================================================== */

    const profile =
        document.querySelector(
            ".top-profile"
        );


    if (profile) {

        profile.addEventListener(
            "click",
            function () {

                window.location.href =
                    "/driver/profile/";

            }
        );

    }



    /* =====================================================
       PAGINATION
       FRONTEND DEMO FOR NOW
    ===================================================== */

    const pageNumbers =
        document.querySelectorAll(
            ".page-number"
        );


    pageNumbers.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    pageNumbers.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    this.classList.add(
                        "active"
                    );


                    showToast(
                        `Page ${this.textContent.trim()} selected.`,
                        "info"
                    );

                }
            );

        }
    );



    const pageArrows =
        document.querySelectorAll(
            ".page-arrow"
        );


    pageArrows.forEach(
        function (button, index) {

            button.addEventListener(
                "click",
                function () {

                    showToast(
                        index === 0
                            ? "Previous page"
                            : "Next page",
                        "info"
                    );

                }
            );

        }
    );



    /* =====================================================
       INITIAL COUNT
    ===================================================== */

    updateJobCount(
        jobCards.length
    );

});



/* =========================================================
   UPDATE JOB COUNT
   ========================================================= */

function updateJobCount(count) {

    const jobCount =
        document.getElementById(
            "jobCount"
        );


    if (jobCount) {

        jobCount.textContent =
            count;

    }

}



/* =========================================================
   TOAST
   ========================================================= */

function showToast(
    message,
    type = "success"
) {

    const oldToast =
        document.querySelector(
            ".driver-toast"
        );


    if (oldToast) {
        oldToast.remove();
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


    const icon =
        type === "info"
            ? "fa-circle-info"
            : "fa-circle-check";


    toast.innerHTML = `

        <i class="fa-solid ${icon}"></i>

        <span>
            ${message}
        </span>

        <button
            type="button"
            aria-label="Close"
            style="
                border:none;
                background:transparent;
                cursor:pointer;
                color:#71808f;
                margin-left:5px;
            "
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
            "button"
        );


    closeButton.addEventListener(
        "click",
        function () {

            removeToast(
                toast
            );

        }
    );


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