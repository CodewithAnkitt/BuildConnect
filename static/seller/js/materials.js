document.addEventListener("DOMContentLoaded", function () {

    // =========================================
    // ELEMENTS
    // =========================================

    const sidebar = document.getElementById("sidebar");
    const mobileMenu = document.getElementById("mobileMenu");

    const globalSearch = document.getElementById("globalSearch");
    const materialSearch = document.getElementById("materialSearch");

    const materialFilter = document.getElementById("materialFilter");
    const statusFilter = document.getElementById("statusFilter");
    const sortFilter = document.getElementById("sortFilter");

    const tableBody = document.getElementById("materialsTable");
    const noResultsRow = document.getElementById("noResultsRow");

    const editModal = document.getElementById("editMaterialModal");
    const editForm = document.getElementById("editMaterialForm");

    const closeEditModal = document.getElementById("closeEditModal");
    const cancelEditModal = document.getElementById("cancelEditModal");

    const editListingId = document.getElementById("editListingId");
    const editMaterialName = document.getElementById("editMaterialName");
    const editPrice = document.getElementById("editPrice");
    const editStock = document.getElementById("editStock");
    const editLocation = document.getElementById("editLocation");
    const editDescription = document.getElementById("editDescription");
    const editIsAvailable = document.getElementById("editIsAvailable");

    const saveMaterialBtn = document.getElementById("saveMaterialBtn");

    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");


    // =========================================
    // MOBILE SIDEBAR
    // =========================================

    if (mobileMenu && sidebar) {

        mobileMenu.addEventListener("click", function () {
            sidebar.classList.toggle("open");
        });

    }


    // =========================================
    // TOAST
    // =========================================

    function showToast(message, type = "success") {

        if (!toast || !toastMessage) {
            return;
        }

        toastMessage.textContent = message;

        toast.classList.remove("show", "error");

        if (type === "error") {
            toast.classList.add("error");
        }

        toast.classList.add("show");

        setTimeout(function () {
            toast.classList.remove("show");
        }, 3000);
    }


    // =========================================
    // TABLE FILTERING
    // =========================================

    function filterMaterials() {

        const searchText = (
            materialSearch?.value ||
            globalSearch?.value ||
            ""
        ).toLowerCase().trim();

        const materialValue = materialFilter
            ? materialFilter.value
            : "all";

        const statusValue = statusFilter
            ? statusFilter.value
            : "all";

        const rows = Array.from(
            tableBody.querySelectorAll("tr[data-material]")
        );

        let visibleCount = 0;

        rows.forEach(function (row) {

            const material = (
                row.dataset.material || ""
            ).toLowerCase();

            const status = row.dataset.status || "";

            const rowText = row.textContent.toLowerCase();

            const matchesSearch =
                !searchText ||
                material.includes(searchText) ||
                rowText.includes(searchText);

            const matchesMaterial =
                materialValue === "all" ||
                row.dataset.material === materialValue;

            const matchesStatus =
                statusValue === "all" ||
                status === statusValue;

            if (
                matchesSearch &&
                matchesMaterial &&
                matchesStatus
            ) {

                row.style.display = "";

                visibleCount++;

            } else {

                row.style.display = "none";

            }

        });


        if (noResultsRow) {

            if (visibleCount === 0 && rows.length > 0) {
                noResultsRow.style.display = "";
            } else {
                noResultsRow.style.display = "none";
            }

        }

        renumberRows();

    }


    // =========================================
    // RENUMBER TABLE
    // =========================================

    function renumberRows() {

        const rows = Array.from(
            tableBody.querySelectorAll("tr[data-material]")
        );

        let number = 1;

        rows.forEach(function (row) {

            if (row.style.display !== "none") {

                const numberCell = row.querySelector(".row-number");

                if (numberCell) {
                    numberCell.textContent = number;
                }

                number++;

            }

        });

    }


    // =========================================
    // SORTING
    // =========================================

    function sortMaterials() {

        const sortValue = sortFilter
            ? sortFilter.value
            : "latest";

        const rows = Array.from(
            tableBody.querySelectorAll("tr[data-material]")
        );

        rows.sort(function (a, b) {

            if (sortValue === "latest") {

                return (
                    Number(b.dataset.timestamp) -
                    Number(a.dataset.timestamp)
                );

            }

            if (sortValue === "oldest") {

                return (
                    Number(a.dataset.timestamp) -
                    Number(b.dataset.timestamp)
                );

            }

            if (sortValue === "price-high") {

                return (
                    Number(b.dataset.price) -
                    Number(a.dataset.price)
                );

            }

            if (sortValue === "price-low") {

                return (
                    Number(a.dataset.price) -
                    Number(b.dataset.price)
                );

            }

            if (sortValue === "stock-high") {

                return (
                    Number(b.dataset.stock) -
                    Number(a.dataset.stock)
                );

            }

            return 0;

        });


        rows.forEach(function (row) {
            tableBody.appendChild(row);
        });

        filterMaterials();

    }


    // =========================================
    // SEARCH
    // =========================================

    if (materialSearch) {

        materialSearch.addEventListener(
            "input",
            filterMaterials
        );

    }


    if (globalSearch) {

        globalSearch.addEventListener(
            "input",
            filterMaterials
        );

    }


    // =========================================
    // FILTERS
    // =========================================

    if (materialFilter) {

        materialFilter.addEventListener(
            "change",
            filterMaterials
        );

    }


    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            filterMaterials
        );

    }


    if (sortFilter) {

        sortFilter.addEventListener(
            "change",
            sortMaterials
        );

    }


    // =========================================
    // CTRL + K SEARCH
    // =========================================

    document.addEventListener("keydown", function (event) {

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            if (globalSearch) {
                globalSearch.focus();
            }

        }

    });


    // =========================================
    // OPEN EDIT MODAL
    // =========================================

    document.addEventListener("click", function (event) {

        const editButton = event.target.closest(".edit-btn");

        if (!editButton) {
            return;
        }

        editListingId.value =
            editButton.dataset.id || "";

        editMaterialName.textContent =
            editButton.dataset.material || "";

        editPrice.value =
            editButton.dataset.price || "";

        editStock.value =
            editButton.dataset.stock || "";

        editLocation.value =
            editButton.dataset.location || "";

        editDescription.value =
            editButton.dataset.description || "";

        editIsAvailable.checked =
            editButton.dataset.active === "true";


        editModal.classList.add("show");

        document.body.classList.add("modal-open");

    });


    // =========================================
    // CLOSE MODAL
    // =========================================

    function closeModal() {

        editModal.classList.remove("show");

        document.body.classList.remove("modal-open");

    }


    if (closeEditModal) {

        closeEditModal.addEventListener(
            "click",
            closeModal
        );

    }


    if (cancelEditModal) {

        cancelEditModal.addEventListener(
            "click",
            closeModal
        );

    }


    if (editModal) {

        editModal.addEventListener(
            "click",
            function (event) {

                if (event.target === editModal) {
                    closeModal();
                }

            }
        );

    }


    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            if (
                editModal &&
                editModal.classList.contains("show")
            ) {

                closeModal();

            }

        }

    });


    // =========================================
    // SAVE MATERIAL
    // =========================================

    if (editForm) {

        editForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();

                saveMaterialBtn.disabled = true;

                saveMaterialBtn.innerHTML =
                    '<i class="bi bi-arrow-repeat spin"></i> Saving...';


                try {

                    const formData =
                        new FormData(editForm);


                    const response = await fetch(
                        editForm.action,
                        {
                            method: "POST",
                            body: formData,
                            headers: {
                                "X-Requested-With":
                                    "XMLHttpRequest"
                            }
                        }
                    );


                    const data = await response.json();


                    if (!data.success) {

                        showToast(
                            data.message ||
                            "Unable to update material.",
                            "error"
                        );

                        return;

                    }


                    closeModal();

                    showToast(
                        data.message ||
                        "Material updated successfully."
                    );


                    // Reload so:
                    // - table updates
                    // - summary updates
                    // - stock overview updates
                    // - updated timestamp updates

                    setTimeout(function () {
                        window.location.reload();
                    }, 700);


                } catch (error) {

                    console.error(error);

                    showToast(
                        "Something went wrong while saving.",
                        "error"
                    );

                } finally {

                    saveMaterialBtn.disabled = false;

                    saveMaterialBtn.innerHTML =
                        '<i class="bi bi-check-lg"></i> Save Changes';

                }

            }
        );

    }


    // =========================================
    // MORE BUTTON
    // =========================================

    document.addEventListener("click", function (event) {

        const moreButton =
            event.target.closest(".more-btn");

        if (!moreButton) {
            return;
        }

        const material =
            moreButton.dataset.material || "Material";

        showToast(
            `Use Edit to manage ${material}.`
        );

    });


    // =========================================
    // INITIAL STATE
    // =========================================

    filterMaterials();

});