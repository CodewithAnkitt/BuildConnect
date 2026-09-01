/**
 * BuildConnect – login.js
 * ─────────────────────────────────────────────────────────────
 * Handles the complete authentication flow:
 *  1.  Role selection (4 roles)
 *  2.  Role → Login screen transition (with animation)
 *  3.  Change Role (back to role selection)
 *  4.  Login ↔ Register form switching (with slide animation)
 *  5.  Password show/hide (Login + Register + Confirm)
 *  6.  CAPTCHA generation and refresh
 *  7.  CAPTCHA validation
 *  8.  Phone number validation (10-digit Indian)
 *  9.  Email validation
 * 10.  Password validation (min 8 chars)
 * 11.  Confirm password match
 * 12.  WhatsApp number validation
 * 13.  "Same as Phone Number" checkbox
 * 14.  Terms & Conditions validation
 * 15.  Inline error messages (no alert())
 * 16.  Forgot Password modal
 * 17.  Terms & Conditions modal
 * 18.  Success toast notification
 *
 * NOTE: No backend connection yet. All validation is frontend only.
 *       Django backend integration points are marked with TODO comments.
 * ─────────────────────────────────────────────────────────────
 */

'use strict';

/* ============================================================
   UTILITY HELPERS
============================================================ */

/**
 * Show an inline error on a field.
 * @param {HTMLElement} inputEl  – The input element
 * @param {HTMLElement} errorEl  – The <span class="bc-field-error"> element
 * @param {string}      message  – Error message to display
 */
function showError(inputEl, errorEl, message) {
  if (!errorEl) return;
  errorEl.textContent = message;

  if (inputEl) {
    // Handle wrapped inputs (phone prefix wrapper)
    const wrap = inputEl.closest('.bc-input-wrap');
    if (wrap) {
      wrap.classList.add('bc-wrap-error');
      wrap.classList.remove('bc-wrap-success');
    } else {
      inputEl.classList.add('bc-input-error');
      inputEl.classList.remove('bc-input-success');
    }
  }
}

/**
 * Clear an inline error on a field.
 * @param {HTMLElement} inputEl
 * @param {HTMLElement} errorEl
 */
function clearError(inputEl, errorEl) {
  if (!errorEl) return;
  errorEl.textContent = '';

  if (inputEl) {
    const wrap = inputEl.closest('.bc-input-wrap');
    if (wrap) {
      wrap.classList.remove('bc-wrap-error');
    } else {
      inputEl.classList.remove('bc-input-error');
    }
  }
}

/**
 * Mark a field as valid (green state).
 * @param {HTMLElement} inputEl
 * @param {HTMLElement} errorEl
 */
function markSuccess(inputEl, errorEl) {
  if (!errorEl) return;
  errorEl.textContent = '';

  if (inputEl) {
    const wrap = inputEl.closest('.bc-input-wrap');
    if (wrap) {
      wrap.classList.remove('bc-wrap-error');
      wrap.classList.add('bc-wrap-success');
    } else {
      inputEl.classList.remove('bc-input-error');
      inputEl.classList.add('bc-input-success');
    }
  }
}

/**
 * Validate a 10-digit Indian phone number.
 * @param {string} phone
 * @returns {boolean}
 */
function isValidPhone(phone) {
  return /^[6-9]\d{9}$/.test(phone.trim());
}

/**
 * Validate an email address.
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Show the success toast.
 * @param {string} title
 * @param {string} message
 * @param {number} duration – ms to show the toast (default 4000)
 */
function showSuccessToast(title, message, duration) {
  duration = duration || 4000;
  const toast    = document.getElementById('bcSuccessToast');
  const titleEl  = document.getElementById('bcSuccessTitle');
  const msgEl    = document.getElementById('bcSuccessMsg');

  if (!toast) return;
  if (titleEl) titleEl.textContent = title;
  if (msgEl)   msgEl.textContent   = message;

  toast.classList.add('bc-toast-show');

  setTimeout(function () {
    toast.classList.remove('bc-toast-show');
  }, duration);
}

/* ============================================================
   1. CAPTCHA
============================================================ */

var currentCaptcha = '';

/**
 * Generate a random 5-character CAPTCHA string.
 * Uses a mix of uppercase letters and digits (excluding confusing chars).
 * @returns {string}
 */
function generateCaptchaString() {
  var chars  = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  var result = '';
  for (var i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Render the CAPTCHA into the display element.
 */
function renderCaptcha() {
  currentCaptcha = generateCaptchaString();
  var displayEl  = document.getElementById('bcCaptchaDisplay');
  if (!displayEl) return;

  // Clear previous content
  displayEl.innerHTML = '';

  // Render each character in a slightly randomised <span>
  for (var i = 0; i < currentCaptcha.length; i++) {
    var span = document.createElement('span');
    span.textContent = currentCaptcha[i];

    // Slight random rotation and color variation for each char
    var rotate  = (Math.random() * 20) - 10; // -10 to +10 deg
    var colors  = ['#93c5fd', '#c4b5fd', '#86efac', '#fde68a', '#fca5a5', '#ffffff'];
    var color   = colors[Math.floor(Math.random() * colors.length)];
    var skewX   = (Math.random() * 10) - 5;

    span.style.cssText =
      'display:inline-block;' +
      'transform: rotate(' + rotate + 'deg) skewX(' + skewX + 'deg);' +
      'color:' + color + ';' +
      'font-size:' + (1.1 + Math.random() * 0.3) + 'rem;' +
      'margin: 0 1px;';

    displayEl.appendChild(span);
  }
}

// Init CAPTCHA on DOM ready
document.addEventListener('DOMContentLoaded', function () {
  renderCaptcha();
});

// Refresh CAPTCHA button
var captchaRefreshBtn = document.getElementById('bcCaptchaRefreshBtn');
if (captchaRefreshBtn) {
  captchaRefreshBtn.addEventListener('click', function () {
    renderCaptcha();
    // Clear captcha input and error
    var captchaInput = document.getElementById('bcLoginCaptchaInput');
    var captchaErr   = document.getElementById('bcLoginCaptchaErr');
    if (captchaInput) {
      captchaInput.value = '';
      captchaInput.classList.remove('bc-input-error', 'bc-input-success');
    }
    if (captchaErr) captchaErr.textContent = '';
  });
}

/* ============================================================
   2. ROLE SELECTION STATE
============================================================ */

var selectedRole     = '';  // e.g. "Customer"
var selectedRoleIcon = '';  // e.g. "bi-person-fill"

// Role → Bootstrap icon map
var roleIconMap = {
  'Seller':        'bi-shop-window',
  'Customer':      'bi-person-fill',
  'Driver':        'bi-person-badge-fill',
  'Vehicle Owner': 'bi-truck-front-fill'
};

/* ============================================================
   3. SCREEN TRANSITION HELPERS
============================================================ */

var screenRoles = document.getElementById('bcScreenRoles');
var screenAuth  = document.getElementById('bcScreenAuth');

/**
 * Transition from Role Selection → Auth Screen.
 */
function showAuthScreen() {
  if (!screenRoles || !screenAuth) return;

  // Animate role screen out
  screenRoles.classList.add('bc-hiding');

  setTimeout(function () {
    screenRoles.style.display = 'none';

    // Show auth screen
    screenAuth.style.display = 'block';

    // Small delay to allow display:block before transition
    setTimeout(function () {
      screenAuth.classList.add('bc-visible');
    }, 20);
  }, 350);
}

/**
 * Transition from Auth Screen → Role Selection.
 */
function showRoleScreen() {
  if (!screenRoles || !screenAuth) return;

  // Hide auth screen
  screenAuth.classList.remove('bc-visible');

  setTimeout(function () {
    screenAuth.style.display = 'none';

    // Show role screen
    screenRoles.style.display = 'block';
    screenRoles.classList.remove('bc-hiding');

    // Deselect all role cards
    document.querySelectorAll('.bc-role-card-auth').forEach(function (card) {
      card.classList.remove('bc-rca-selected');
    });

    selectedRole = '';
    selectedRoleIcon = '';

    // Re-render captcha (fresh start)
    renderCaptcha();
    var captchaInput = document.getElementById('bcLoginCaptchaInput');
    if (captchaInput) captchaInput.value = '';

  }, 350);
}

/* ============================================================
   4. ROLE SELECTION CLICK HANDLER
============================================================ */

document.querySelectorAll('.bc-role-card-auth').forEach(function (card) {

  // Click handler
  function handleRoleSelect() {
    var role = card.getAttribute('data-role');
    var icon = card.getAttribute('data-icon');

    if (!role) return;

    selectedRole     = role;
    selectedRoleIcon = icon || roleIconMap[role] || 'bi-person-fill';

    // Visual selected state on card
    document.querySelectorAll('.bc-role-card-auth').forEach(function (c) {
      c.classList.remove('bc-rca-selected');
    });
    card.classList.add('bc-rca-selected');

    // Update auth screen role badge
    updateRoleBadge();

    // Update login/register form role names
    var loginRoleName    = document.getElementById('bcLoginRoleName');
    var registerRoleName = document.getElementById('bcRegisterRoleName');
    if (loginRoleName)    loginRoleName.textContent    = selectedRole;
    if (registerRoleName) registerRoleName.textContent = selectedRole;

    // Delay then show auth screen
    setTimeout(function () {
      showAuthScreen();
    }, 220);
  }

  card.addEventListener('click', handleRoleSelect);

  // Keyboard: Enter or Space
  card.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleRoleSelect();
    }
  });

});

/**
 * Update the role badge shown at top of the auth screen.
 */
function updateRoleBadge() {
  var iconEl  = document.getElementById('bcSrbIconEl');
  var nameEl  = document.getElementById('bcSrbName');

  if (iconEl) {
    iconEl.className = 'bi ' + selectedRoleIcon;
  }
  if (nameEl) {
    nameEl.textContent = selectedRole;
  }
}

/* ============================================================
   5. "CHANGE ROLE" BUTTON
============================================================ */

var changeRoleBtn = document.getElementById('bcChangeRoleBtn');
if (changeRoleBtn) {
  changeRoleBtn.addEventListener('click', function () {
    // Reset both forms before going back
    resetLoginForm();
    resetRegisterForm();

    // Go back to role screen
    showRoleScreen();

    // If currently on register panel, make sure login panel is active for next visit
    ensureLoginPanelActive();
  });
}

/* ============================================================
   6. LOGIN ↔ REGISTER FORM SWITCHING (with slide animation)
============================================================ */

var loginPanel    = document.getElementById('bcLoginPanel');
var registerPanel = document.getElementById('bcRegisterPanel');
var goRegisterBtn = document.getElementById('bcGoRegister');
var goLoginBtn    = document.getElementById('bcGoLogin');

/**
 * Switch from Login → Register with slide animation.
 */
function switchToRegister() {
  if (!loginPanel || !registerPanel) return;

  // Slide login out to the LEFT
  loginPanel.classList.add('bc-panel-slide-out-left');

  setTimeout(function () {
    // Hide login panel
    loginPanel.style.display = 'none';
    loginPanel.classList.remove('bc-panel-slide-out-left');

    // Prepare register panel
    registerPanel.style.display = 'block';
    registerPanel.classList.remove('bc-form-panel-hidden');
    registerPanel.classList.add('bc-panel-slide-in-right');

    setTimeout(function () {
      registerPanel.classList.remove('bc-panel-slide-in-right');
    }, 400);

  }, 360);
}

/**
 * Switch from Register → Login with slide animation.
 */
function switchToLogin() {
  if (!loginPanel || !registerPanel) return;

  // Slide register out to the RIGHT
  registerPanel.classList.add('bc-panel-slide-out-right');

  setTimeout(function () {
    // Hide register panel
    registerPanel.style.display = 'none';
    registerPanel.classList.add('bc-form-panel-hidden');
    registerPanel.classList.remove('bc-panel-slide-out-right');

    // Prepare login panel
    loginPanel.style.display = 'block';
    loginPanel.classList.add('bc-panel-slide-in-left');

    setTimeout(function () {
      loginPanel.classList.remove('bc-panel-slide-in-left');
    }, 400);

  }, 360);
}

/**
 * Ensure login panel is shown (for when returning from register after change-role).
 */
function ensureLoginPanelActive() {
  if (!loginPanel || !registerPanel) return;
  loginPanel.style.display = 'block';
  loginPanel.classList.remove('bc-panel-slide-out-left', 'bc-panel-slide-in-left');

  registerPanel.style.display = 'none';
  registerPanel.classList.add('bc-form-panel-hidden');
  registerPanel.classList.remove('bc-panel-slide-in-right', 'bc-panel-slide-out-right');
}

// Button bindings
if (goRegisterBtn) {
  goRegisterBtn.addEventListener('click', switchToRegister);
}
if (goLoginBtn) {
  goLoginBtn.addEventListener('click', function () {
    resetRegisterForm();
    switchToLogin();
  });
}

/* ============================================================
   7. PASSWORD SHOW / HIDE
============================================================ */

/**
 * Toggle password visibility for a given input + eye icon.
 * @param {string} inputId   – ID of the password input
 * @param {string} iconId    – ID of the <i> eye icon element
 */
function bindEyeToggle(inputId, iconId) {
  var btn = document.getElementById(
    inputId === 'bcLoginPassword'       ? 'bcLoginEyeBtn'       :
    inputId === 'bcRegPassword'         ? 'bcRegEyeBtn'         :
    inputId === 'bcRegConfirmPassword'  ? 'bcRegConfirmEyeBtn'  : null
  );
  var inputEl = document.getElementById(inputId);
  var iconEl  = document.getElementById(iconId);

  if (!btn || !inputEl || !iconEl) return;

  btn.addEventListener('click', function () {
    if (inputEl.type === 'password') {
      inputEl.type    = 'text';
      iconEl.className = 'bi bi-eye-slash-fill';
    } else {
      inputEl.type    = 'password';
      iconEl.className = 'bi bi-eye-fill';
    }
  });
}

bindEyeToggle('bcLoginPassword',      'bcLoginEyeIcon');
bindEyeToggle('bcRegPassword',        'bcRegEyeIcon');
bindEyeToggle('bcRegConfirmPassword', 'bcRegConfirmEyeIcon');

/* ============================================================
   8. "SAME AS PHONE NUMBER" CHECKBOX
============================================================ */

var sameAsPhoneChk   = document.getElementById('bcSameAsPhone');
var regPhoneInput    = document.getElementById('bcRegPhone');
var regWhatsappInput = document.getElementById('bcRegWhatsapp');

if (sameAsPhoneChk) {
  sameAsPhoneChk.addEventListener('change', function () {
    if (!regPhoneInput || !regWhatsappInput) return;

    if (this.checked) {
      // Copy phone value to WhatsApp
      regWhatsappInput.value    = regPhoneInput.value;
      regWhatsappInput.readOnly = true;
      regWhatsappInput.style.background = 'var(--bc-blue-ultra)';
      regWhatsappInput.style.color      = 'var(--bc-blue)';

      // Clear any error on whatsapp
      clearError(regWhatsappInput, document.getElementById('bcRegWhatsappErr'));
    } else {
      // Allow user to enter different WhatsApp number
      regWhatsappInput.readOnly = false;
      regWhatsappInput.style.background = '';
      regWhatsappInput.style.color      = '';
    }
  });
}

// When phone number changes and "same as" is checked, keep WhatsApp in sync
if (regPhoneInput) {
  regPhoneInput.addEventListener('input', function () {
    if (sameAsPhoneChk && sameAsPhoneChk.checked && regWhatsappInput) {
      regWhatsappInput.value = this.value;
    }
  });
}

/* ============================================================
   9. REAL-TIME PHONE VALIDATION (numeric only)
============================================================ */

// Prevent non-numeric input in phone fields
['bcLoginPhone', 'bcRegPhone', 'bcRegWhatsapp'].forEach(function (id) {
  var el = document.getElementById(id);
  if (!el) return;

  el.addEventListener('input', function () {
    // Strip non-digits
    this.value = this.value.replace(/\D/g, '');
  });

  el.addEventListener('keydown', function (e) {
    // Allow: backspace, delete, tab, escape, enter, arrows
    if (
      [8, 9, 13, 27, 35, 36, 37, 38, 39, 40, 46].indexOf(e.keyCode) !== -1 ||
      (e.ctrlKey && [65, 67, 86, 88].indexOf(e.keyCode) !== -1)
    ) return;
    // Allow digits 0-9 and numpad 0-9
    if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  });
});

/* ============================================================
   10. LOGIN FORM VALIDATION & SUBMISSION
============================================================ */

var loginForm = document.getElementById('bcLoginForm');

if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var isValid = true;

    // ── Phone ──
    var phoneEl  = document.getElementById('bcLoginPhone');
    var phoneErr = document.getElementById('bcLoginPhoneErr');

    if (!phoneEl.value.trim()) {
      showError(phoneEl, phoneErr, 'Please enter your phone number.');
      isValid = false;
    } else if (!isValidPhone(phoneEl.value)) {
      showError(phoneEl, phoneErr, 'Please enter a valid 10-digit phone number.');
      isValid = false;
    } else {
      markSuccess(phoneEl, phoneErr);
    }

    // ── Password ──
    var passEl  = document.getElementById('bcLoginPassword');
    var passErr = document.getElementById('bcLoginPasswordErr');

    if (!passEl.value.trim()) {
      showError(passEl, passErr, 'Please enter your password.');
      isValid = false;
    } else if (passEl.value.length < 8) {
      showError(passEl, passErr, 'Password must contain at least 8 characters.');
      isValid = false;
    } else {
      markSuccess(passEl, passErr);
    }

    // ── CAPTCHA ──
    var captchaInputEl = document.getElementById('bcLoginCaptchaInput');
    var captchaErr     = document.getElementById('bcLoginCaptchaErr');

    if (!captchaInputEl.value.trim()) {
      showError(captchaInputEl, captchaErr, 'Please enter the CAPTCHA code.');
      isValid = false;
    } else if (captchaInputEl.value.trim().toUpperCase() !== currentCaptcha) {
      showError(captchaInputEl, captchaErr, 'Incorrect CAPTCHA. Please try again.');
      captchaInputEl.value = '';
      renderCaptcha(); // Refresh on wrong entry
      isValid = false;
    } else {
      markSuccess(captchaInputEl, captchaErr);
    }

    if (!isValid) return;

    // ── All valid: simulate login ──
    // TODO: Replace with Django backend AJAX call
    // Example:
    // fetch('/api/auth/login/', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json', 'X-CSRFToken': getCsrfToken() },
    //   body: JSON.stringify({
    //     phone: phoneEl.value,
    //     password: passEl.value,
    //     role: selectedRole,
    //     remember_me: document.getElementById('bcRememberMe').checked
    //   })
    // })
    // .then(res => res.json())
    // .then(data => { /* handle response */ })
    // .catch(err => { /* handle error */ });

    var submitBtn = document.getElementById('bcLoginSubmit');
    if (submitBtn) {
      submitBtn.disabled   = true;
      submitBtn.innerHTML  = '<i class="bi bi-hourglass-split me-2"></i>Logging in…';
    }

    setTimeout(function () {
      if (submitBtn) {
        submitBtn.disabled  = false;
        submitBtn.innerHTML = '<i class="bi bi-box-arrow-in-right me-2"></i>Login to BuildConnect';
      }
      showSuccessToast(
        'Login Successful',
        'Welcome back! Redirecting to your ' + selectedRole + ' dashboard…',
        4500
      );
      renderCaptcha();
      if (captchaInputEl) captchaInputEl.value = '';
    }, 1400);

  });
}

/**
 * Reset the login form to its initial state.
 */
function resetLoginForm() {
  var form = document.getElementById('bcLoginForm');
  if (form) form.reset();

  [
    ['bcLoginPhone',        'bcLoginPhoneErr'],
    ['bcLoginPassword',     'bcLoginPasswordErr'],
    ['bcLoginCaptchaInput', 'bcLoginCaptchaErr']
  ].forEach(function (pair) {
    var inputEl = document.getElementById(pair[0]);
    var errEl   = document.getElementById(pair[1]);
    clearError(inputEl, errEl);
    if (inputEl) {
      inputEl.classList.remove('bc-input-success');
      var wrap = inputEl.closest('.bc-input-wrap');
      if (wrap) wrap.classList.remove('bc-wrap-success');
    }
  });

  renderCaptcha();
}

/* ============================================================
   11. REGISTER FORM VALIDATION & SUBMISSION
============================================================ */

var registerForm = document.getElementById('bcRegisterForm');

if (registerForm) {
  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var isValid = true;

    // ── First Name ──
    var firstNameEl  = document.getElementById('bcRegFirstName');
    var firstNameErr = document.getElementById('bcRegFirstNameErr');

    if (!firstNameEl.value.trim()) {
      showError(firstNameEl, firstNameErr, 'Please enter your first name.');
      isValid = false;
    } else {
      markSuccess(firstNameEl, firstNameErr);
    }

    // ── Last Name ──
    var lastNameEl  = document.getElementById('bcRegLastName');
    var lastNameErr = document.getElementById('bcRegLastNameErr');

    if (!lastNameEl.value.trim()) {
      showError(lastNameEl, lastNameErr, 'Please enter your last name.');
      isValid = false;
    } else {
      markSuccess(lastNameEl, lastNameErr);
    }

    // ── Email ──
    var emailEl  = document.getElementById('bcRegEmail');
    var emailErr = document.getElementById('bcRegEmailErr');

    if (!emailEl.value.trim()) {
      showError(emailEl, emailErr, 'Please enter your email address.');
      isValid = false;
    } else if (!isValidEmail(emailEl.value)) {
      showError(emailEl, emailErr, 'Please enter a valid email address.');
      isValid = false;
    } else {
      markSuccess(emailEl, emailErr);
    }

    // ── Phone ──
    var regPhoneEl  = document.getElementById('bcRegPhone');
    var regPhoneErr = document.getElementById('bcRegPhoneErr');

    if (!regPhoneEl.value.trim()) {
      showError(regPhoneEl, regPhoneErr, 'Please enter your phone number.');
      isValid = false;
    } else if (!isValidPhone(regPhoneEl.value)) {
      showError(regPhoneEl, regPhoneErr, 'Please enter a valid 10-digit phone number.');
      isValid = false;
    } else {
      markSuccess(regPhoneEl, regPhoneErr);
    }

    // ── WhatsApp ──
    var whatsappEl  = document.getElementById('bcRegWhatsapp');
    var whatsappErr = document.getElementById('bcRegWhatsappErr');

    if (!whatsappEl.value.trim()) {
      showError(whatsappEl, whatsappErr, 'Please enter your WhatsApp number.');
      isValid = false;
    } else if (!isValidPhone(whatsappEl.value)) {
      showError(whatsappEl, whatsappErr, 'Please enter a valid 10-digit WhatsApp number.');
      isValid = false;
    } else {
      markSuccess(whatsappEl, whatsappErr);
    }

    // ── Password ──
    var regPassEl  = document.getElementById('bcRegPassword');
    var regPassErr = document.getElementById('bcRegPasswordErr');

    if (!regPassEl.value.trim()) {
      showError(regPassEl, regPassErr, 'Please enter a password.');
      isValid = false;
    } else if (regPassEl.value.length < 8) {
      showError(regPassEl, regPassErr, 'Password must contain at least 8 characters.');
      isValid = false;
    } else {
      markSuccess(regPassEl, regPassErr);
    }

    // ── Confirm Password ──
    var regConfPassEl  = document.getElementById('bcRegConfirmPassword');
    var regConfPassErr = document.getElementById('bcRegConfirmPasswordErr');

    if (!regConfPassEl.value.trim()) {
      showError(regConfPassEl, regConfPassErr, 'Please confirm your password.');
      isValid = false;
    } else if (regConfPassEl.value !== regPassEl.value) {
      showError(regConfPassEl, regConfPassErr, 'Passwords do not match.');
      isValid = false;
    } else {
      markSuccess(regConfPassEl, regConfPassErr);
    }

    // ── Terms & Conditions ──
    var termsChk = document.getElementById('bcRegTerms');
    var termsErr = document.getElementById('bcRegTermsErr');

    if (!termsChk.checked) {
      if (termsErr) termsErr.textContent = 'Please accept the Terms & Conditions.';
      isValid = false;
    } else {
      if (termsErr) termsErr.textContent = '';
    }

    if (!isValid) return;

    // ── All valid: simulate registration ──
    // TODO: Replace with Django backend AJAX call
    // Example:
    // fetch('/api/auth/register/', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json', 'X-CSRFToken': getCsrfToken() },
    //   body: JSON.stringify({
    //     first_name: firstNameEl.value.trim(),
    //     last_name:  lastNameEl.value.trim(),
    //     email:      emailEl.value.trim(),
    //     phone:      regPhoneEl.value.trim(),
    //     whatsapp:   whatsappEl.value.trim(),
    //     password:   regPassEl.value,
    //     role:       selectedRole
    //   })
    // })
    // .then(res => res.json())
    // .then(data => { /* handle response */ })
    // .catch(err => { /* handle error */ });

    var submitBtn = document.getElementById('bcRegisterSubmit');
    if (submitBtn) {
      submitBtn.disabled  = true;
      submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Creating Account…';
    }

    setTimeout(function () {
      if (submitBtn) {
        submitBtn.disabled  = false;
        submitBtn.innerHTML = '<i class="bi bi-person-plus-fill me-2"></i>Create Account';
      }

      showSuccessToast(
        'Account Created',
        'Your ' + selectedRole + ' account has been created successfully!',
        4500
      );

      // Auto-switch to login after registration
      setTimeout(function () {
        resetRegisterForm();
        switchToLogin();
      }, 1000);

    }, 1600);

  });
}

/**
 * Reset the registration form to its initial state.
 */
function resetRegisterForm() {
  var form = document.getElementById('bcRegisterForm');
  if (form) form.reset();

  var fieldPairs = [
    ['bcRegFirstName',       'bcRegFirstNameErr'],
    ['bcRegLastName',        'bcRegLastNameErr'],
    ['bcRegEmail',           'bcRegEmailErr'],
    ['bcRegPhone',           'bcRegPhoneErr'],
    ['bcRegWhatsapp',        'bcRegWhatsappErr'],
    ['bcRegPassword',        'bcRegPasswordErr'],
    ['bcRegConfirmPassword', 'bcRegConfirmPasswordErr']
  ];

  fieldPairs.forEach(function (pair) {
    var inputEl = document.getElementById(pair[0]);
    var errEl   = document.getElementById(pair[1]);
    clearError(inputEl, errEl);
    if (inputEl) {
      inputEl.classList.remove('bc-input-success');
      var wrap = inputEl.closest('.bc-input-wrap');
      if (wrap) wrap.classList.remove('bc-wrap-success');
      // Reset whatsapp readonly state
      if (pair[0] === 'bcRegWhatsapp') {
        inputEl.readOnly      = false;
        inputEl.style.background = '';
        inputEl.style.color      = '';
      }
    }
  });

  var termsErr = document.getElementById('bcRegTermsErr');
  if (termsErr) termsErr.textContent = '';
}

/* ============================================================
   12. REAL-TIME INLINE VALIDATION (on blur)
============================================================ */

// Login phone
(function () {
  var el  = document.getElementById('bcLoginPhone');
  var err = document.getElementById('bcLoginPhoneErr');
  if (!el) return;
  el.addEventListener('blur', function () {
    if (el.value.trim() && !isValidPhone(el.value)) {
      showError(el, err, 'Please enter a valid 10-digit phone number.');
    } else if (el.value.trim()) {
      markSuccess(el, err);
    }
  });
}());

// Register phone
(function () {
  var el  = document.getElementById('bcRegPhone');
  var err = document.getElementById('bcRegPhoneErr');
  if (!el) return;
  el.addEventListener('blur', function () {
    if (el.value.trim() && !isValidPhone(el.value)) {
      showError(el, err, 'Please enter a valid 10-digit phone number.');
    } else if (el.value.trim()) {
      markSuccess(el, err);
    }
  });
}());

// Register WhatsApp
(function () {
  var el  = document.getElementById('bcRegWhatsapp');
  var err = document.getElementById('bcRegWhatsappErr');
  if (!el) return;
  el.addEventListener('blur', function () {
    if (el.value.trim() && !isValidPhone(el.value)) {
      showError(el, err, 'Please enter a valid 10-digit WhatsApp number.');
    } else if (el.value.trim()) {
      markSuccess(el, err);
    }
  });
}());

// Register email
(function () {
  var el  = document.getElementById('bcRegEmail');
  var err = document.getElementById('bcRegEmailErr');
  if (!el) return;
  el.addEventListener('blur', function () {
    if (el.value.trim() && !isValidEmail(el.value)) {
      showError(el, err, 'Please enter a valid email address.');
    } else if (el.value.trim()) {
      markSuccess(el, err);
    }
  });
}());

// Register confirm password
(function () {
  var passEl    = document.getElementById('bcRegPassword');
  var confEl    = document.getElementById('bcRegConfirmPassword');
  var confErr   = document.getElementById('bcRegConfirmPasswordErr');
  if (!confEl || !passEl) return;

  confEl.addEventListener('blur', function () {
    if (confEl.value && confEl.value !== passEl.value) {
      showError(confEl, confErr, 'Passwords do not match.');
    } else if (confEl.value) {
      markSuccess(confEl, confErr);
    }
  });

  passEl.addEventListener('blur', function () {
    if (passEl.value.length > 0 && passEl.value.length < 8) {
      showError(passEl, document.getElementById('bcRegPasswordErr'), 'Password must contain at least 8 characters.');
    } else if (passEl.value.length >= 8) {
      markSuccess(passEl, document.getElementById('bcRegPasswordErr'));
    }
    // Re-validate confirm if user already typed it
    if (confEl.value && confEl.value !== passEl.value) {
      showError(confEl, confErr, 'Passwords do not match.');
    } else if (confEl.value && confEl.value === passEl.value) {
      markSuccess(confEl, confErr);
    }
  });
}());

/* ============================================================
   13. FORGOT PASSWORD MODAL
============================================================ */

var forgotModal      = document.getElementById('bcForgotModal');
var forgotBtn        = document.getElementById('bcForgotBtn');
var forgotModalClose = document.getElementById('bcForgotModalClose');

if (forgotBtn) {
  forgotBtn.addEventListener('click', function () {
    if (forgotModal) forgotModal.classList.add('bc-modal-open');
  });
}

if (forgotModalClose) {
  forgotModalClose.addEventListener('click', function () {
    if (forgotModal) forgotModal.classList.remove('bc-modal-open');
  });
}

// Close on backdrop click
if (forgotModal) {
  forgotModal.addEventListener('click', function (e) {
    if (e.target === forgotModal) forgotModal.classList.remove('bc-modal-open');
  });
}

/* ============================================================
   14. TERMS & CONDITIONS MODAL
============================================================ */

var termsModal      = document.getElementById('bcTermsModal');
var termsLink       = document.getElementById('bcTermsLink');
var termsModalClose = document.getElementById('bcTermsModalClose');

if (termsLink) {
  termsLink.addEventListener('click', function (e) {
    e.preventDefault();
    if (termsModal) termsModal.classList.add('bc-modal-open');
  });
}

if (termsModalClose) {
  termsModalClose.addEventListener('click', function () {
    if (termsModal) termsModal.classList.remove('bc-modal-open');
  });
}

// Close on backdrop click
if (termsModal) {
  termsModal.addEventListener('click', function (e) {
    if (e.target === termsModal) termsModal.classList.remove('bc-modal-open');
  });
}

// Close modals on Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    if (forgotModal) forgotModal.classList.remove('bc-modal-open');
    if (termsModal)  termsModal.classList.remove('bc-modal-open');
  }
});

/* ============================================================
   END OF login.js
============================================================ */
