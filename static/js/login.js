/* =========================================================
   BUILD CONNECT
   LOGIN / ROLE SELECTION / REGISTER
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       SCREEN ELEMENTS
    ====================================================== */

    const roleScreen = document.getElementById("roleScreen");
    const loginScreen = document.getElementById("loginScreen");
    const registerScreen = document.getElementById("registerScreen");


    /* =====================================================
       ROLE ELEMENTS
    ====================================================== */

    const roleCards = document.querySelectorAll(".role-card");

    const loginRoleTitle =
        document.getElementById("loginRoleTitle");

    const registerRoleTitle =
        document.getElementById("registerRoleTitle");

    const loginRoleBadge =
        document.getElementById("loginRoleBadge");

    const registerRoleBadge =
        document.getElementById("registerRoleBadge");

    let selectedRole = "";


    /* =====================================================
       ROLE ICONS
    ====================================================== */

    const roleIcons = {

        "Seller": "bi-shop",

        "Customer": "bi-cart3",

        "Driver": "bi-person-fill",

        "Vehicle Owner": "bi-truck-front-fill"

    };


    /* =====================================================
       CHANGE ROLE
    ====================================================== */

    function showRoleScreen() {

        roleScreen.classList.add("active");

        loginScreen.classList.remove("active");

        registerScreen.classList.remove("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    /* =====================================================
       SHOW LOGIN
    ====================================================== */

    function showLogin() {

        roleScreen.classList.remove("active");

        registerScreen.classList.remove("active");

        loginScreen.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        resetLoginForm();
    }


    /* =====================================================
       SHOW REGISTER
    ====================================================== */

    function showRegister() {

        roleScreen.classList.remove("active");

        loginScreen.classList.remove("active");

        registerScreen.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        resetRegisterForm();
    }


    /* =====================================================
       SET ROLE
    ====================================================== */

    function setRole(role) {

        selectedRole = role;

        loginRoleTitle.textContent = role;

        registerRoleTitle.textContent = role;

        const iconClass =
            roleIcons[role] || "bi-person-fill";


        loginRoleBadge.innerHTML = `
            <i class="bi ${iconClass}"></i>
            <span>${role}</span>
        `;


        registerRoleBadge.innerHTML = `
            <i class="bi ${iconClass}"></i>
            <span>${role}</span>
        `;

    }


    /* =====================================================
       ROLE CARD CLICK
    ====================================================== */

    roleCards.forEach(card => {

        card.addEventListener("click", () => {

            const role =
                card.getAttribute("data-role");

            setRole(role);

            showLogin();

        });

    });


    /* =====================================================
       CHANGE ROLE BUTTONS
    ====================================================== */

    document
        .getElementById("changeRoleFromLogin")
        .addEventListener("click", showRoleScreen);


    document
        .getElementById("changeRoleFromRegister")
        .addEventListener("click", showRoleScreen);


    /* =====================================================
       LOGIN -> REGISTER
    ====================================================== */

    document
        .getElementById("goRegister")
        .addEventListener("click", showRegister);


    /* =====================================================
       REGISTER -> LOGIN
    ====================================================== */

    document
        .getElementById("goLogin")
        .addEventListener("click", showLogin);


    /* =====================================================
       PHONE NUMBER ONLY
    ====================================================== */

    const phoneInputs =
        document.querySelectorAll(
            'input[type="tel"]'
        );


    phoneInputs.forEach(input => {

        input.addEventListener("input", () => {

            input.value =
                input.value.replace(/\D/g, "");

            if (input.value.length > 10) {

                input.value =
                    input.value.substring(0, 10);

            }

        });

    });


    /* =====================================================
       LOGIN WHATSAPP CHECKBOX
    ====================================================== */

    const loginWhatsappCheck =
        document.getElementById(
            "loginWhatsappCheck"
        );

    loginWhatsappCheck.addEventListener(
        "change",
        () => {

            const phone =
                document.getElementById(
                    "loginPhone"
                ).value.trim();

            if (
                loginWhatsappCheck.checked &&
                phone.length !== 10
            ) {

                loginWhatsappCheck.checked = false;

                showMessage(
                    "Enter a valid 10-digit mobile number first.",
                    "error"
                );

            }

        }
    );


    /* =====================================================
       REGISTER WHATSAPP
    ====================================================== */

    const sameWhatsapp =
        document.getElementById(
            "sameWhatsapp"
        );

    const whatsappBox =
        document.getElementById(
            "whatsappBox"
        );

    const registerPhone =
        document.getElementById(
            "registerPhone"
        );

    const whatsappNumber =
        document.getElementById(
            "whatsappNumber"
        );


    sameWhatsapp.addEventListener(
        "change",
        () => {

            if (sameWhatsapp.checked) {

                const phone =
                    registerPhone.value.trim();

                if (phone.length !== 10) {

                    sameWhatsapp.checked = false;

                    whatsappBox.classList.add("show");

                    whatsappNumber.focus();

                    return;
                }

                whatsappNumber.value = phone;

                whatsappBox.classList.remove("show");

            } else {

                whatsappNumber.value = "";

                whatsappBox.classList.add("show");

                whatsappNumber.focus();

            }

        }
    );


    registerPhone.addEventListener(
        "input",
        () => {

            if (sameWhatsapp.checked) {

                whatsappNumber.value =
                    registerPhone.value;

            }

        }
    );


    /* =====================================================
       INITIAL WHATSAPP BOX
    ====================================================== */

    whatsappBox.classList.remove("show");


    /* =====================================================
       REQUEST OTP
    ====================================================== */

    const requestOtpBtn =
        document.getElementById(
            "requestOtpBtn"
        );

    const otpArea =
        document.getElementById(
            "otpArea"
        );

    const loginPhone =
        document.getElementById(
            "loginPhone"
        );

    const loginPhoneError =
        document.getElementById(
            "loginPhoneError"
        );

    const otpPhoneText =
        document.getElementById(
            "otpPhoneText"
        );


    requestOtpBtn.addEventListener(
        "click",
        () => {

            const phone =
                loginPhone.value.trim();


            if (phone.length !== 10) {

                loginPhoneError.textContent =
                    "Please enter a valid 10-digit mobile number.";

                loginPhone.focus();

                return;
            }


            loginPhoneError.textContent = "";


            otpPhoneText.textContent =
                "+91 " +
                phone.substring(0, 2) +
                "******" +
                phone.substring(8);


            otpArea.classList.add("show");


            requestOtpBtn.innerHTML = `
                <span>
                    <i class="bi bi-check-circle-fill"></i>
                    OTP Sent
                </span>

                <i class="bi bi-check-lg"></i>
            `;


            requestOtpBtn.disabled = true;


            const firstOtp =
                document.querySelector(
                    ".otp-inputs input"
                );

            if (firstOtp) {
                firstOtp.focus();
            }

        }
    );


    /* =====================================================
       OTP INPUT
    ====================================================== */

    const otpInputs =
        document.querySelectorAll(
            ".otp-inputs input"
        );


    otpInputs.forEach(
        (input, index) => {

            input.addEventListener(
                "input",
                () => {

                    input.value =
                        input.value.replace(
                            /\D/g,
                            ""
                        );


                    if (
                        input.value &&
                        index < otpInputs.length - 1
                    ) {

                        otpInputs[
                            index + 1
                        ].focus();

                    }

                }
            );


            input.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key === "Backspace" &&
                        !input.value &&
                        index > 0
                    ) {

                        otpInputs[
                            index - 1
                        ].focus();

                    }

                }
            );

        }
    );


    /* =====================================================
       VERIFY OTP
       FRONTEND DEMO
    ====================================================== */

    document
        .getElementById("verifyOtpBtn")
        .addEventListener(
            "click",
            () => {

                let otp = "";

                otpInputs.forEach(input => {
                    otp += input.value;
                });


                if (otp.length !== 6) {

                    showMessage(
                        "Please enter the complete 6-digit OTP.",
                        "error"
                    );

                    return;
                }


                showMessage(
                    `${selectedRole} login verified successfully.`,
                    "success"
                );

            }
        );


    /* =====================================================
       RESEND OTP
    ====================================================== */

    document
        .getElementById("resendOtpBtn")
        .addEventListener(
            "click",
            () => {

                showMessage(
                    "A new OTP has been requested.",
                    "success"
                );

            }
        );


    /* =====================================================
       PASSWORD SHOW / HIDE
    ====================================================== */

    const passwordToggles =
        document.querySelectorAll(
            ".password-toggle"
        );


    passwordToggles.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const targetId =
                    button.getAttribute(
                        "data-target"
                    );

                const input =
                    document.getElementById(
                        targetId
                    );

                const icon =
                    button.querySelector("i");


                if (
                    input.type === "password"
                ) {

                    input.type = "text";

                    icon.classList.remove(
                        "bi-eye"
                    );

                    icon.classList.add(
                        "bi-eye-slash"
                    );

                } else {

                    input.type = "password";

                    icon.classList.remove(
                        "bi-eye-slash"
                    );

                    icon.classList.add(
                        "bi-eye"
                    );

                }

            }
        );

    });


    /* =====================================================
       CREATE ACCOUNT
    ====================================================== */

    document
        .getElementById("createAccountBtn")
        .addEventListener(
            "click",
            () => {

                const firstName =
                    document
                        .getElementById(
                            "firstName"
                        )
                        .value.trim();


                const lastName =
                    document
                        .getElementById(
                            "lastName"
                        )
                        .value.trim();


                const phone =
                    registerPhone
                        .value.trim();


                const whatsapp =
                    whatsappNumber
                        .value.trim();


                const email =
                    document
                        .getElementById(
                            "registerEmail"
                        )
                        .value.trim();


                const password =
                    document
                        .getElementById(
                            "registerPassword"
                        )
                        .value;


                const confirmPassword =
                    document
                        .getElementById(
                            "confirmPassword"
                        )
                        .value;


                const terms =
                    document
                        .getElementById(
                            "termsCheck"
                        )
                        .checked;


                if (!firstName || !lastName) {

                    showMessage(
                        "Please enter your first and last name.",
                        "error"
                    );

                    return;
                }


                if (phone.length !== 10) {

                    showMessage(
                        "Please enter a valid 10-digit mobile number.",
                        "error"
                    );

                    return;
                }


                if (
                    whatsapp.length !== 10
                ) {

                    showMessage(
                        "Please enter a valid 10-digit WhatsApp number.",
                        "error"
                    );

                    return;
                }


                if (
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                ) {

                    showMessage(
                        "Please enter a valid email address.",
                        "error"
                    );

                    return;
                }


                if (password.length < 8) {

                    showMessage(
                        "Password must contain at least 8 characters.",
                        "error"
                    );

                    return;
                }


                if (
                    password !==
                    confirmPassword
                ) {

                    showMessage(
                        "Passwords do not match.",
                        "error"
                    );

                    return;
                }


                if (!terms) {

                    showMessage(
                        "Please accept the Terms & Conditions.",
                        "error"
                    );

                    return;
                }


                showMessage(
                    `${selectedRole} account details validated successfully.`,
                    "success"
                );

            }
        );


    /* =====================================================
       RESET LOGIN
    ====================================================== */

    function resetLoginForm() {

        loginPhone.value = "";

        loginPhoneError.textContent = "";

        loginWhatsappCheck.checked = false;

        otpArea.classList.remove("show");

        otpInputs.forEach(input => {
            input.value = "";
        });


        requestOtpBtn.disabled = false;

        requestOtpBtn.innerHTML = `
            <span>
                <i class="bi bi-send-fill"></i>
                Request OTP
            </span>

            <i class="bi bi-arrow-right"></i>
        `;

    }


    /* =====================================================
       RESET REGISTER
    ====================================================== */

    function resetRegisterForm() {

        document
            .getElementById("firstName")
            .value = "";

        document
            .getElementById("lastName")
            .value = "";

        registerPhone.value = "";

        whatsappNumber.value = "";

        document
            .getElementById("registerEmail")
            .value = "";

        document
            .getElementById("registerPassword")
            .value = "";

        document
            .getElementById("confirmPassword")
            .value = "";

        document
            .getElementById("termsCheck")
            .checked = false;

        sameWhatsapp.checked = false;

        whatsappBox.classList.remove("show");

    }


    /* =====================================================
       MESSAGE TOAST
    ====================================================== */

    function showMessage(message, type) {

        const oldToast =
            document.querySelector(
                ".auth-toast"
            );

        if (oldToast) {
            oldToast.remove();
        }


        const toast =
            document.createElement("div");

        toast.className =
            `auth-toast ${type}`;


        toast.innerHTML = `
            <i class="bi ${
                type === "success"
                    ? "bi-check-circle-fill"
                    : "bi-exclamation-circle-fill"
            }"></i>

            <span>${message}</span>
        `;


        document.body.appendChild(toast);


        setTimeout(() => {

            toast.classList.add(
                "hide"
            );

            setTimeout(() => {
                toast.remove();
            }, 300);

        }, 3000);

    }


    /* =====================================================
       TERMS BUTTON
    ====================================================== */

    const termsButton =
        document.querySelector(
            ".terms-link"
        );

    if (termsButton) {

        termsButton.addEventListener(
            "click",
            () => {

                showMessage(
                    "Terms & Conditions will be available here.",
                    "success"
                );

            }
        );

    }

});