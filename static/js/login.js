/* ============================================================
   BUILDCONNECT LOGIN.JS
   Final version for current login.html
============================================================ */

document.addEventListener("DOMContentLoaded", function () {

    /* ========================================================
       ROLE / SCREEN ELEMENTS
    ======================================================== */

    const roleScreen =
        document.getElementById("roleScreen");

    const loginScreen =
        document.getElementById("loginScreen");

    const registerScreen =
        document.getElementById("registerScreen");


    const roleCards =
        document.querySelectorAll(".role-card");


    const changeRoleFromLogin =
        document.getElementById("changeRoleFromLogin");

    const changeRoleFromRegister =
        document.getElementById("changeRoleFromRegister");


    /* ========================================================
       LOGIN ELEMENTS
    ======================================================== */

    const loginForm =
        document.getElementById("loginForm");

    const loginPhone =
        document.getElementById("loginPhone");

    const loginPassword =
        document.getElementById("loginPassword");

    const loginRole =
        document.getElementById("loginRole");

    const loginBtn =
        document.getElementById("loginBtn");

    const loginRoleTitle =
        document.getElementById("loginRoleTitle");

    const loginRoleBadgeText =
        document.getElementById("loginRoleBadgeText");

    const loginRoleIcon =
        document.getElementById("loginRoleIcon");


    /* ========================================================
       REMEMBER ME
    ======================================================== */

    const rememberMe =
        document.getElementById("bcRememberMe");


    /* ========================================================
       REGISTER ELEMENTS
    ======================================================== */

    const registerForm =
        document.getElementById("registerForm");

    const registerRole =
        document.getElementById("registerRole");

    const registerRoleTitle =
        document.getElementById("registerRoleTitle");

    const registerRoleBadgeText =
        document.getElementById(
            "registerRoleBadgeText"
        );

    const registerRoleIcon =
        document.getElementById(
            "registerRoleIcon"
        );


    const firstName =
        document.getElementById("firstName");

    const lastName =
        document.getElementById("lastName");

    const registerPhone =
        document.getElementById("registerPhone");

    const sameWhatsapp =
        document.getElementById("sameWhatsapp");

    const whatsappNumber =
        document.getElementById("whatsappNumber");

    const registerEmail =
        document.getElementById("registerEmail");

    const registerPassword =
        document.getElementById("registerPassword");

    const confirmPassword =
        document.getElementById("confirmPassword");

    const termsCheck =
        document.getElementById("termsCheck");

    const createAccountBtn =
        document.getElementById(
            "createAccountBtn"
        );


    /* ========================================================
       OTHER BUTTONS
    ======================================================== */

    const goRegister =
        document.getElementById("goRegister");

    const goLogin =
        document.getElementById("goLogin");


    /* ========================================================
       CURRENT ROLE
    ======================================================== */

    let selectedRole = "";


    /* ========================================================
       ROLE ICONS
    ======================================================== */

    const roleIcons = {

        "Seller":
            "bi-shop",

        "Customer":
            "bi-cart3",

        "Driver":
            "bi-person-fill",

        "Vehicle Owner":
            "bi-truck-front-fill"

    };


    /* ========================================================
       SCREEN FUNCTIONS
    ======================================================== */

    function showRoleScreen() {

        if (roleScreen) {

            roleScreen.classList.add("active");

        }

        if (loginScreen) {

            loginScreen.classList.remove("active");

        }

        if (registerScreen) {

            registerScreen.classList.remove("active");

        }

    }


    function showLoginScreen() {

        if (roleScreen) {

            roleScreen.classList.remove("active");

        }

        if (loginScreen) {

            loginScreen.classList.add("active");

        }

        if (registerScreen) {

            registerScreen.classList.remove("active");

        }

        loadRememberedPhone();

    }


    function showRegisterScreen() {

        if (roleScreen) {

            roleScreen.classList.remove("active");

        }

        if (loginScreen) {

            loginScreen.classList.remove("active");

        }

        if (registerScreen) {

            registerScreen.classList.add("active");

        }

    }


    /* ========================================================
       SET ROLE
    ======================================================== */

    function setRole(role) {

        selectedRole = role;


        /* Login hidden role */

        if (loginRole) {

            loginRole.value = role;

        }


        /* Register hidden role */

        if (registerRole) {

            registerRole.value = role;

        }


        /* Login heading */

        if (loginRoleTitle) {

            loginRoleTitle.textContent =
                role;

        }


        /* Login badge */

        if (loginRoleBadgeText) {

            loginRoleBadgeText.textContent =
                role;

        }


        /* Register heading */

        if (registerRoleTitle) {

            registerRoleTitle.textContent =
                role;

        }


        /* Register badge */

        if (registerRoleBadgeText) {

            registerRoleBadgeText.textContent =
                role;

        }


        /* Login icon */

        if (loginRoleIcon) {

            loginRoleIcon.className =
                "bi " +
                (
                    roleIcons[role] ||
                    "bi-person-fill"
                );

        }


        /* Register icon */

        if (registerRoleIcon) {

            registerRoleIcon.className =
                "bi " +
                (
                    roleIcons[role] ||
                    "bi-person-fill"
                );

        }

    }


    /* ========================================================
       ROLE CARD CLICK
    ======================================================== */

    roleCards.forEach(function (card) {

        card.addEventListener(
            "click",
            function () {

                const role =
                    card.getAttribute(
                        "data-role"
                    );


                if (!role) {
                    return;
                }


                setRole(role);

                showLoginScreen();

            }
        );

    });


    /* ========================================================
       CHANGE ROLE
    ======================================================== */

    if (changeRoleFromLogin) {

        changeRoleFromLogin.addEventListener(
            "click",
            function () {

                showRoleScreen();

            }
        );

    }


    if (changeRoleFromRegister) {

        changeRoleFromRegister.addEventListener(
            "click",
            function () {

                showRoleScreen();

            }
        );

    }


    /* ========================================================
       LOGIN → REGISTER
    ======================================================== */

    if (goRegister) {

        goRegister.addEventListener(
            "click",
            function () {

                showRegisterScreen();

            }
        );

    }


    /* ========================================================
       REGISTER → LOGIN
    ======================================================== */

    if (goLogin) {

        goLogin.addEventListener(
            "click",
            function () {

                showLoginScreen();

            }
        );

    }


    /* ========================================================
       PASSWORD SHOW / HIDE
    ======================================================== */

    document
        .querySelectorAll(".password-toggle")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const targetId =
                        button.getAttribute(
                            "data-target"
                        );


                    const input =
                        document.getElementById(
                            targetId
                        );


                    const icon =
                        button.querySelector(
                            "i"
                        );


                    if (!input) {
                        return;
                    }


                    if (
                        input.type ===
                        "password"
                    ) {

                        input.type =
                            "text";


                        if (icon) {

                            icon.className =
                                "bi bi-eye-slash";

                        }

                    } else {

                        input.type =
                            "password";


                        if (icon) {

                            icon.className =
                                "bi bi-eye";

                        }

                    }

                }
            );

        });


    /* ========================================================
       PHONE NUMBER - ONLY DIGITS
    ======================================================== */

    function setupPhoneInput(input) {

        if (!input) {
            return;
        }


        input.addEventListener(
            "input",
            function () {

                this.value =
                    this.value.replace(
                        /\D/g,
                        ""
                    );


                if (
                    this.value.length > 10
                ) {

                    this.value =
                        this.value.substring(
                            0,
                            10
                        );

                }

            }
        );

    }


    setupPhoneInput(loginPhone);

    setupPhoneInput(registerPhone);

    setupPhoneInput(whatsappNumber);


    /* ========================================================
       REMEMBER ME - LOAD PHONE
    ======================================================== */

    function loadRememberedPhone() {

        if (!loginPhone) {
            return;
        }


        const savedPhone =
            localStorage.getItem(
                "buildconnect_login_phone"
            );


        if (savedPhone) {

            loginPhone.value =
                savedPhone;


            if (rememberMe) {

                rememberMe.checked =
                    true;

            }

        }

    }


    /* ========================================================
       REMEMBER ME - CHECKBOX
    ======================================================== */

    if (rememberMe) {

        rememberMe.addEventListener(
            "change",
            function () {

                if (this.checked) {

                    if (
                        loginPhone &&
                        loginPhone.value.trim()
                    ) {

                        localStorage.setItem(
                            "buildconnect_login_phone",
                            loginPhone.value.trim()
                        );

                    }

                } else {

                    localStorage.removeItem(
                        "buildconnect_login_phone"
                    );

                }

            }
        );

    }


    /* ========================================================
       REMEMBER ME - PHONE INPUT
    ======================================================== */

    if (loginPhone) {

        loginPhone.addEventListener(
            "input",
            function () {

                if (
                    rememberMe &&
                    rememberMe.checked
                ) {

                    localStorage.setItem(
                        "buildconnect_login_phone",
                        this.value.trim()
                    );

                }

            }
        );

    }


    /* ========================================================
       SAME PHONE AS WHATSAPP
    ======================================================== */

    if (sameWhatsapp) {

        sameWhatsapp.addEventListener(
            "change",
            function () {

                if (!registerPhone) {
                    return;
                }


                if (this.checked) {

                    if (whatsappNumber) {

                        whatsappNumber.value =
                            registerPhone.value;

                        whatsappNumber.readOnly =
                            true;

                    }

                } else {

                    if (whatsappNumber) {

                        whatsappNumber.readOnly =
                            false;

                    }

                }

            }
        );

    }


    if (registerPhone) {

        registerPhone.addEventListener(
            "input",
            function () {

                if (
                    sameWhatsapp &&
                    sameWhatsapp.checked &&
                    whatsappNumber
                ) {

                    whatsappNumber.value =
                        this.value;

                }

            }
        );

    }


    /* ========================================================
       LOGIN VALIDATION
    ======================================================== */

    function validateLogin() {

        if (!selectedRole) {

            alert(
                "Please select your role first."
            );

            return false;

        }


        if (
            !loginPhone ||
            !/^[0-9]{10}$/.test(
                loginPhone.value.trim()
            )
        ) {

            const error =
                document.getElementById(
                    "loginPhoneError"
                );


            if (error) {

                error.textContent =
                    "Please enter a valid 10-digit mobile number.";

            }

            return false;

        }


        const phoneError =
            document.getElementById(
                "loginPhoneError"
            );


        if (phoneError) {

            phoneError.textContent = "";

        }


        if (
            !loginPassword ||
            !loginPassword.value
        ) {

            const error =
                document.getElementById(
                    "loginPasswordError"
                );


            if (error) {

                error.textContent =
                    "Please enter your password.";

            }

            return false;

        }


        const passwordError =
            document.getElementById(
                "loginPasswordError"
            );


        if (passwordError) {

            passwordError.textContent = "";

        }


        return true;

    }


    /* ========================================================
       REAL DJANGO LOGIN
    ======================================================== */

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function (event) {

                if (!validateLogin()) {

                    event.preventDefault();

                    return;

                }


                /*
                   Make sure the selected role is sent
                   to Django.
                */

                if (loginRole) {

                    loginRole.value =
                        selectedRole;

                }


                /*
                   Remember phone number.
                */

                if (
                    rememberMe &&
                    rememberMe.checked &&
                    loginPhone
                ) {

                    localStorage.setItem(
                        "buildconnect_login_phone",
                        loginPhone.value.trim()
                    );

                }


                /*
                   If Remember Me is unchecked,
                   remove saved phone.
                */

                if (
                    rememberMe &&
                    !rememberMe.checked
                ) {

                    localStorage.removeItem(
                        "buildconnect_login_phone"
                    );

                }


                /*
                   Allow normal Django form submission.

                   DO NOT use fetch here.
                   Django will process:
                   phone_number
                   password
                   role
                   remember_me
                   csrfmiddlewaretoken
                */

                if (loginBtn) {

                    loginBtn.disabled =
                        true;


                    const buttonText =
                        loginBtn.querySelector(
                            "span"
                        );


                    if (buttonText) {

                        buttonText.innerHTML =
                            '<i class="bi bi-hourglass-split"></i> Logging in...';

                    }

                }

            }
        );

    }


    /* ========================================================
       REGISTRATION VALIDATION
    ======================================================== */

    function validateRegistration() {

        if (!selectedRole) {

            alert(
                "Please select your role first."
            );

            return false;

        }


        if (
            !firstName ||
            !firstName.value.trim()
        ) {

            alert(
                "Please enter your first name."
            );

            return false;

        }


        if (
            !lastName ||
            !lastName.value.trim()
        ) {

            alert(
                "Please enter your last name."
            );

            return false;

        }


        if (
            !registerPhone ||
            !/^[0-9]{10}$/.test(
                registerPhone.value.trim()
            )
        ) {

            alert(
                "Please enter a valid 10-digit mobile number."
            );

            return false;

        }


        if (
            !whatsappNumber ||
            !/^[0-9]{10}$/.test(
                whatsappNumber.value.trim()
            )
        ) {

            alert(
                "Please enter a valid 10-digit WhatsApp number."
            );

            return false;

        }


        if (
            !registerEmail ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                registerEmail.value.trim()
            )
        ) {

            alert(
                "Please enter a valid email address."
            );

            return false;

        }


        if (
            !registerPassword ||
            registerPassword.value.length < 8
        ) {

            alert(
                "Password must contain at least 8 characters."
            );

            return false;

        }


        if (
            !confirmPassword ||
            registerPassword.value !==
            confirmPassword.value
        ) {

            alert(
                "Passwords do not match."
            );

            return false;

        }


        if (
            !termsCheck ||
            !termsCheck.checked
        ) {

            alert(
                "Please accept the Terms & Conditions."
            );

            return false;

        }


        return true;

    }


    /* ========================================================
       REAL DJANGO REGISTRATION
    ======================================================== */

    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                if (!validateRegistration()) {
                    return;
                }


                if (createAccountBtn) {

                    createAccountBtn.disabled =
                        true;

                    const buttonText =
                        createAccountBtn.querySelector(
                            "span"
                        );


                    if (buttonText) {

                        buttonText.innerHTML =
                            '<i class="bi bi-hourglass-split"></i> Creating Account...';

                    }

                }


                const formData =
                    new FormData(
                        registerForm
                    );


                /*
                   Make sure selected role is current.
                */

                formData.set(
                    "role",
                    selectedRole
                );


                try {

                    const response =
                        await fetch(
                            registerForm.action,
                            {
                                method: "POST",
                                body: formData,
                                credentials: "same-origin"
                            }
                        );


                    const data =
                        await response.json();


                    if (data.success) {

                        alert(
                            data.message ||
                            "Your account has been created successfully."
                        );


                        /*
                           Put the registered phone
                           into login.
                        */

                        if (
                            loginPhone &&
                            registerPhone
                        ) {

                            loginPhone.value =
                                registerPhone.value;

                        }


                        showLoginScreen();


                    } else {

                        alert(
                            data.message ||
                            "Unable to create account."
                        );

                    }

                } catch (error) {

                    console.error(
                        "Registration error:",
                        error
                    );


                    alert(
                        "Something went wrong while creating your account."
                    );

                }


                if (createAccountBtn) {

                    createAccountBtn.disabled =
                        false;


                    const buttonText =
                        createAccountBtn.querySelector(
                            "span"
                        );


                    if (buttonText) {

                        buttonText.innerHTML =
                            '<i class="bi bi-person-plus-fill"></i> Create Account';

                    }

                }

            }
        );

    }


    /* ========================================================
       INITIAL STATE
    ======================================================== */

    showRoleScreen();

    loadRememberedPhone();

});