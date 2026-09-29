/* =========================================================
   BUILDCONNECT HOME PAGE
   Premium interactions + transitions
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       NAVBAR
    ===================================================== */

    const navbar = document.getElementById("navbar");

    function handleNavbarScroll() {
        if (!navbar) return;

        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleNavbarScroll, {
        passive: true
    });

    handleNavbarScroll();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");

    const mobileMenu =
        document.getElementById("mobileMenu");

    if (mobileMenuBtn && mobileMenu) {

        mobileMenuBtn.addEventListener("click", function () {

            mobileMenu.classList.toggle("open");
            document.body.classList.toggle("menu-open");

            const icon =
                mobileMenuBtn.querySelector("i");

            if (icon) {

                if (mobileMenu.classList.contains("open")) {
                    icon.className = "bi bi-x-lg";
                } else {
                    icon.className = "bi bi-list";
                }

            }

        });


        mobileMenu
            .querySelectorAll("a")
            .forEach(function (link) {

                link.addEventListener("click", function () {

                    mobileMenu.classList.remove("open");
                    document.body.classList.remove("menu-open");

                    const icon =
                        mobileMenuBtn.querySelector("i");

                    if (icon) {
                        icon.className = "bi bi-list";
                    }

                });

            });

    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    const navLinks =
        document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const navbarHeight =
                navbar ? navbar.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight -
                10;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const desktopNavLinks =
        document.querySelectorAll(
            ".bc-nav-links .nav-link, .nav-link"
        );

    function updateActiveNav() {

        if (!sections.length) return;

        const scrollPosition =
            window.scrollY +
            (navbar ? navbar.offsetHeight : 0) +
            150;

        let currentSection = "";

        sections.forEach(function (section) {

            const top =
                section.offsetTop;

            const bottom =
                top + section.offsetHeight;

            if (
                scrollPosition >= top &&
                scrollPosition < bottom
            ) {
                currentSection =
                    section.getAttribute("id");
            }

        });

        desktopNavLinks.forEach(function (link) {

            link.classList.remove("active");

            if (
                currentSection &&
                link.getAttribute("href") ===
                "#" + currentSection
            ) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNav,
        {
            passive: true
        }
    );

    updateActiveNav();


    /* =====================================================
       SCROLL REVEAL
       
       IMPORTANT:
       We support both:
       .reveal.visible
       .reveal.active
       
       This prevents sections from remaining hidden.
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if (revealElements.length) {

        const revealObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("visible");
                            entry.target.classList.add("active");

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.08,
                    rootMargin: "0px 0px -40px 0px"
                }
            );


        revealElements.forEach(function (element) {

            revealObserver.observe(element);

        });

    }


    /* =====================================================
       SAFETY FALLBACK FOR REVEAL ELEMENTS
       
       If an element somehow remains hidden because of
       IntersectionObserver/CSS issues, make it visible
       after a short delay.
    ===================================================== */

    setTimeout(function () {

        revealElements.forEach(function (element) {

            const rect =
                element.getBoundingClientRect();

            if (
                rect.top < window.innerHeight &&
                rect.bottom > 0
            ) {

                element.classList.add("visible");
                element.classList.add("active");

            }

        });

    }, 700);


    /* =====================================================
       COUNTER ANIMATION
    ===================================================== */

    const counters =
        document.querySelectorAll(".counter");

    let countersStarted = false;

    function animateCounters() {

        if (countersStarted) return;

        const statsSection =
            document.querySelector(".stats-section");

        if (!statsSection) return;

        const sectionTop =
            statsSection.getBoundingClientRect().top;

        if (
            sectionTop <
            window.innerHeight * 0.85
        ) {

            countersStarted = true;

            counters.forEach(function (counter) {

                const target =
                    Number(
                        counter.dataset.target || 0
                    );

                let current = 0;

                const duration = 1600;

                const startTime =
                    performance.now();


                function updateCounter(currentTime) {

                    const elapsed =
                        currentTime - startTime;

                    const progress =
                        Math.min(
                            elapsed / duration,
                            1
                        );

                    const eased =
                        1 -
                        Math.pow(
                            1 - progress,
                            3
                        );

                    current =
                        Math.floor(
                            target * eased
                        );

                    counter.textContent =
                        current.toLocaleString(
                            "en-IN"
                        );


                    if (progress < 1) {

                        requestAnimationFrame(
                            updateCounter
                        );

                    } else {

                        counter.textContent =
                            target.toLocaleString(
                                "en-IN"
                            );

                    }

                }

                requestAnimationFrame(
                    updateCounter
                );

            });

        }

    }

    window.addEventListener(
        "scroll",
        animateCounters,
        {
            passive: true
        }
    );

    animateCounters();


    /* =====================================================
       LANGUAGE SWITCH
    ===================================================== */

    const languageToggle =
        document.getElementById("languageToggle");

    const hindiLabel =
        document.getElementById("hindiLabel");

    const englishLabel =
        document.getElementById("englishLabel");

    let currentLanguage = "en";


    if (languageToggle) {

        languageToggle.addEventListener(
            "click",
            function () {

                currentLanguage =
                    currentLanguage === "en"
                        ? "hi"
                        : "en";


                if (currentLanguage === "hi") {

                    languageToggle.classList.add(
                        "hindi"
                    );

                    if (hindiLabel) {
                        hindiLabel.classList.add(
                            "active"
                        );
                    }

                    if (englishLabel) {
                        englishLabel.classList.remove(
                            "active"
                        );
                    }

                    showToast(
                        "हिन्दी",
                        "हिंदी भाषा जल्द उपलब्ध होगी।"
                    );

                } else {

                    languageToggle.classList.remove(
                        "hindi"
                    );

                    if (englishLabel) {
                        englishLabel.classList.add(
                            "active"
                        );
                    }

                    if (hindiLabel) {
                        hindiLabel.classList.remove(
                            "active"
                        );
                    }

                    showToast(
                        "English",
                        "English language selected."
                    );

                }

            }
        );

    }


    /* =====================================================
       SERVICE CARD BUTTONS
    ===================================================== */

    const serviceButtons =
        document.querySelectorAll(
            ".service-image button"
        );

    serviceButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                showToast(
                    "BuildConnect",
                    "This service will open here."
                );

            }
        );

    });


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const nameInput =
                    document.getElementById(
                        "contactName"
                    );

                const name =
                    nameInput
                        ? nameInput.value.trim()
                        : "";


                if (!name) {

                    showToast(
                        "Missing Information",
                        "Please enter your name."
                    );

                    return;

                }


                showToast(
                    "Message Received",
                    "Thank you, " +
                    name +
                    ". We will get back to you soon."
                );

                contactForm.reset();

            }
        );

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backToTop =
        document.getElementById("backToTop");

    if (backToTop) {

        window.addEventListener(
            "scroll",
            function () {

                if (window.scrollY > 600) {

                    backToTop.classList.add(
                        "show"
                    );

                } else {

                    backToTop.classList.remove(
                        "show"
                    );

                }

            },
            {
                passive: true
            }
        );


        backToTop.addEventListener(
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
       HERO PARALLAX
    ===================================================== */

    const hero =
        document.querySelector(".hero");

    const heroImage =
        document.querySelector(".hero-image");

    const heroBackground =
        document.querySelector(".hero-background");


    if (heroImage) {

        window.addEventListener(
            "scroll",
            function () {

                const scroll =
                    window.scrollY;

                if (
                    scroll < 700 &&
                    hero
                ) {

                    heroImage.style.transform =
                        "scale(1.02) translateY(" +
                        scroll * 0.08 +
                        "px)";

                }

            },
            {
                passive: true
            }
        );

    }


    if (heroBackground) {

        window.addEventListener(
            "scroll",
            function () {

                const scroll =
                    window.scrollY;

                if (
                    hero &&
                    scroll < hero.offsetHeight
                ) {

                    heroBackground.style.transform =
                        "scale(1.04) translateY(" +
                        scroll * 0.05 +
                        "px)";

                }

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       CARD TILT EFFECT
    ===================================================== */

    const cards =
        document.querySelectorAll(
            ".service-card, .testimonial-card"
        );


    cards.forEach(function (card) {

        card.addEventListener(
            "mousemove",
            function (event) {

                if (window.innerWidth < 900) {
                    return;
                }

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    ((y - centerY) /
                    centerY) * -1.2;

                const rotateY =
                    ((x - centerX) /
                    centerX) * 1.2;


                card.style.transform =
                    "perspective(900px) " +
                    "rotateX(" +
                    rotateX +
                    "deg) " +
                    "rotateY(" +
                    rotateY +
                    "deg) " +
                    "translateY(-5px)";

            }
        );


        card.addEventListener(
            "mouseleave",
            function () {

                card.style.transform = "";

            }
        );

    });


    /* =====================================================
       SERVICE CARD STAGGER
    ===================================================== */

    const serviceCards =
        document.querySelectorAll(
            ".service-card"
        );

    serviceCards.forEach(
        function (card, index) {

            card.style.transitionDelay =
                (index * 80) + "ms";

        }
    );


    /* =====================================================
       TOAST
    ===================================================== */

    const toast =
        document.getElementById("bcToast");

    const toastTitle =
        document.getElementById("toastTitle");

    const toastMessage =
        document.getElementById("toastMessage");

    const toastClose =
        document.getElementById("toastClose");

    let toastTimer;


    function showToast(title, message) {

        if (!toast) return;

        clearTimeout(toastTimer);


        if (toastTitle) {
            toastTitle.textContent =
                title;
        }


        if (toastMessage) {
            toastMessage.textContent =
                message;
        }


        toast.classList.add("show");


        toastTimer =
            setTimeout(
                function () {

                    toast.classList.remove(
                        "show"
                    );

                },
                3500
            );

    }


    if (toastClose) {

        toastClose.addEventListener(
            "click",
            function () {

                if (toast) {
                    toast.classList.remove(
                        "show"
                    );
                }

            }
        );

    }


    /* =====================================================
       PAGE READY
       
       No dependency on pageLoader.
       This is intentional.
    ===================================================== */

    document.body.classList.add(
        "page-ready"
    );

});