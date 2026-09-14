/* =========================================================
   BUILD CONNECT - AVAILABLE JOBS
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const jobsList = document.getElementById("jobsList");
    const jobs = Array.from(
        document.querySelectorAll(".job-card")
    );

    const searchInput =
        document.getElementById("jobSearch");

    const topSearch =
        document.getElementById("topSearch");

    const locationFilter =
        document.getElementById("locationFilter");

    const materialFilter =
        document.getElementById("materialFilter");

    const vehicleFilter =
        document.getElementById("vehicleFilter");

    const sortJobs =
        document.getElementById("sortJobs");

    const resultCount =
        document.getElementById("resultCount");

    const emptyJobs =
        document.getElementById("emptyJobs");

    const clearFilters =
        document.getElementById("clearFilters");

    const filterButton =
        document.querySelector(".filter-button");



    /* =====================================================
       FILTER JOBS
    ===================================================== */

    function filterJobs() {

        const search =
            searchInput
                ? searchInput.value
                    .trim()
                    .toLowerCase()
                : "";

        const location =
            locationFilter
                ? locationFilter.value
                : "all";

        const material =
            materialFilter
                ? materialFilter.value
                : "all";

        const vehicle =
            vehicleFilter
                ? vehicleFilter.value
                : "all";


        let visibleJobs = [];


        jobs.forEach(function (job) {

            const text =
                job.innerText.toLowerCase();

            const jobLocation =
                job.dataset.location;

            const jobMaterial =
                job.dataset.material;

            const jobVehicle =
                job.dataset.vehicle;


            const matchesSearch =
                search === "" ||
                text.includes(search);

            const matchesLocation =
                location === "all" ||
                jobLocation === location;

            const matchesMaterial =
                material === "all" ||
                jobMaterial === material;

            const matchesVehicle =
                vehicle === "all" ||
                jobVehicle === vehicle;


            if (
                matchesSearch &&
                matchesLocation &&
                matchesMaterial &&
                matchesVehicle
            ) {

                job.style.display = "";

                visibleJobs.push(job);

            } else {

                job.style.display = "none";

            }

        });


        if (resultCount) {

            resultCount.textContent =
                visibleJobs.length;

        }


        if (emptyJobs) {

            if (visibleJobs.length === 0) {

                emptyJobs.classList.add("show");

            } else {

                emptyJobs.classList.remove("show");

            }

        }

    }



    /* =====================================================
       SEARCH
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterJobs
        );

    }



    /* =====================================================
       LOCATION FILTER
    ===================================================== */

    if (locationFilter) {

        locationFilter.addEventListener(
            "change",
            filterJobs
        );

    }



    /* =====================================================
       MATERIAL FILTER
    ===================================================== */

    if (materialFilter) {

        materialFilter.addEventListener(
            "change",
            filterJobs
        );

    }



    /* =====================================================
       VEHICLE FILTER
    ===================================================== */

    if (vehicleFilter) {

        vehicleFilter.addEventListener(
            "change",
            filterJobs
        );

    }



    /* =====================================================
       TOP SEARCH
    ===================================================== */

    if (topSearch) {

        topSearch.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    if (searchInput) {

                        searchInput.value =
                            topSearch.value;

                        filterJobs();

                        searchInput.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });

                    }

                }

            }
        );

    }



    /* =====================================================
       SORT JOBS
    ===================================================== */

    if (sortJobs && jobsList) {

        sortJobs.addEventListener(
            "change",
            function () {

                const sortValue =
                    this.value;


                const sortedJobs =
                    [...jobs].sort(
                        function (a, b) {

                            if (
                                sortValue === "payment"
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
                                sortValue === "distance"
                            ) {

                                return (
                                    Number(
                                        a.dataset.distance
                                    ) -
                                    Number(
                                        b.dataset.distance
                                    )
                                );

                            }


                            /* Newest */

                            return (
                                jobs.indexOf(a) -
                                jobs.indexOf(b)
                            );

                        }
                    );


                sortedJobs.forEach(
                    function (job) {

                        jobsList.appendChild(job);

                    }
                );


                filterJobs();

            }
        );

    }



    /* =====================================================
       VIEW DETAILS
    ===================================================== */

    document
        .querySelectorAll(".details-button")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const card =
                        this.closest(".job-card");

                    const title =
                        card.querySelector(
                            ".job-title-row h2"
                        );

                    if (!title) {
                        return;
                    }


                    showJobToast(
                        `Opening details for "${title.textContent.trim()}".`,
                        "info"
                    );

                }
            );

        });



    /* =====================================================
       APPLY NOW
    ===================================================== */

    document
        .querySelectorAll(".apply-button")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const card =
                        this.closest(".job-card");

                    const title =
                        card.querySelector(
                            ".job-title-row h2"
                        );

                    if (!title) {
                        return;
                    }


                    const jobName =
                        title.textContent.trim();


                    if (
                        this.classList.contains(
                            "applied"
                        )
                    ) {

                        showJobToast(
                            "You have already applied for this job.",
                            "info"
                        );

                        return;

                    }


                    this.classList.add("applied");

                    this.innerHTML =
                        '<i class="fa-solid fa-check"></i> Applied';


                    this.style.background =
                        "#19a957";

                    this.style.borderColor =
                        "#19a957";


                    showJobToast(
                        `Application submitted for "${jobName}".`,
                        "success"
                    );

                }
            );

        });



    /* =====================================================
       CLEAR FILTERS
    ===================================================== */

    if (clearFilters) {

        clearFilters.addEventListener(
            "click",
            function () {

                if (searchInput) {
                    searchInput.value = "";
                }

                if (locationFilter) {
                    locationFilter.value = "all";
                }

                if (materialFilter) {
                    materialFilter.value = "all";
                }

                if (vehicleFilter) {
                    vehicleFilter.value = "all";
                }

                filterJobs();

            }
        );

    }



    /* =====================================================
       FILTER BUTTON
    ===================================================== */

    if (filterButton) {

        filterButton.addEventListener(
            "click",
            function () {

                showJobToast(
                    "Use the location, material and vehicle filters to narrow your jobs.",
                    "info"
                );

            }
        );

    }



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

                showJobToast(
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
        document.querySelector(".top-profile");

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
       INITIAL FILTER
    ===================================================== */

    filterJobs();

});



/* =========================================================
   TOAST
   ========================================================= */

function showJobToast(
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
        document.createElement("div");

    toast.className =
        `driver-toast ${type === "error" ? "error" : ""}`;


    let icon =
        "fa-circle-check";


    if (type === "info") {
        icon = "fa-circle-info";
    }

    if (type === "error") {
        icon = "fa-circle-exclamation";
    }


    toast.innerHTML = `
        <i class="fa-solid ${icon}"></i>
        <span>${message}</span>
        <button
            type="button"
            aria-label="Close notification"
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


    document.body.appendChild(toast);


    setTimeout(function () {

        toast.classList.add("show");

    }, 20);


    const closeButton =
        toast.querySelector("button");


    closeButton.addEventListener(
        "click",
        function () {

            toast.classList.remove("show");

            setTimeout(function () {

                if (toast.parentNode) {
                    toast.remove();
                }

            }, 250);

        }
    );


    setTimeout(function () {

        if (!toast.parentNode) {
            return;
        }

        toast.classList.remove("show");

        setTimeout(function () {

            if (toast.parentNode) {
                toast.remove();
            }

        }, 250);

    }, 3500);

}