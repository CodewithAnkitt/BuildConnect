/**
 * BuildConnect – script.js
 * ─────────────────────────────────────────────────────────────
 * Features:
 *  1. Language Switcher (EN ↔ HI) with localStorage persistence
 *  2. Navbar scroll effect & mobile collapse close
 *  3. Active nav-link on scroll
 *  4. Scroll fade-in animations (IntersectionObserver)
 *  5. Stats counter animation
 *  6. Contact form handler
 *  7. Smooth scroll for anchor links
 *  8. Back-to-top button
 *  9. How It Works step stagger animation
 * ─────────────────────────────────────────────────────────────
 * NOTE: Uses Bootstrap 5 bundle (required for dropdowns / collapse)
 */

'use strict';

/* ════════════════════════════════════════════════════════════
   1. LANGUAGE SWITCHER
════════════════════════════════════════════════════════════ */

const LANG_KEY  = 'bc_lang';
let currentLang = localStorage.getItem(LANG_KEY) || 'en';

/**
 * Apply a language by updating every [data-en] / [data-hi] element's
 * textContent and every [data-en-placeholder] / [data-hi-placeholder]
 * element's placeholder attribute.
 * @param {string} lang – 'en' | 'hi'
 */
function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);

  /* ── Text nodes ── */
  document.querySelectorAll('[data-en][data-hi]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (text !== null) el.textContent = text;
  });

  /* ── Placeholder attributes ── */
  document.querySelectorAll('[data-en-placeholder][data-hi-placeholder]').forEach(el => {
    el.setAttribute('placeholder', el.getAttribute('data-' + lang + '-placeholder'));
  });

  /* ── Language Switch UI ── */
const languageSwitch = document.getElementById('languageSwitch');
const hindiLabel = document.getElementById('hindiLabel');
const englishLabel = document.getElementById('englishLabel');

if (languageSwitch) {
    languageSwitch.checked = lang === 'en';
}

if (hindiLabel) {
    hindiLabel.classList.toggle('active', lang === 'hi');
}

if (englishLabel) {
    englishLabel.classList.toggle('active', lang === 'en');
}

  /* ── HTML lang attribute (accessibility) ── */
  document.documentElement.lang = lang;
}

/* Bind language switch */
const languageSwitch = document.getElementById('languageSwitch');

if (languageSwitch) {
    languageSwitch.addEventListener('change', function () {

        if (this.checked) {
            // Switch to English
            applyLanguage('en');
        } else {
            // Switch to Hindi
            applyLanguage('hi');
        }

    });
}

/* Apply on page load */
applyLanguage(currentLang);


/* ════════════════════════════════════════════════════════════
   2. NAVBAR — SCROLL EFFECT + MOBILE COLLAPSE
════════════════════════════════════════════════════════════ */

const navbar = document.getElementById('mainNavbar');

function handleNavbarScroll() {
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  updateActiveLink();

  /* Back-to-top visibility */
  const btn = document.getElementById('backToTop');
  if (btn) btn.classList.toggle('visible', window.scrollY > 400);
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll(); // run once on load


/* ════════════════════════════════════════════════════════════
   3. ACTIVE NAV LINK ON SCROLL
════════════════════════════════════════════════════════════ */

function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.bc-nav-link');
  let active     = '';

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 110) {
      active = section.id;
    }
  });

  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + active) {
      link.classList.add('active');
    }
  });
}

/* Close mobile menu on nav-link click */
document.querySelectorAll('.bc-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const collapse = document.getElementById('navbarMain');
    if (collapse && collapse.classList.contains('show')) {
      const bsCollapse = bootstrap.Collapse.getInstance(collapse);
      if (bsCollapse) bsCollapse.hide();
    }
  });
});


/* ════════════════════════════════════════════════════════════
   4. SCROLL FADE-IN (IntersectionObserver)
════════════════════════════════════════════════════════════ */

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

/* Hero elements: show immediately after DOM ready (no scroll needed) */
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelectorAll('.bc-hero .fade-in').forEach(el => {
      el.classList.add('visible');
    });
  }, 120);
});


/* ════════════════════════════════════════════════════════════
   5. STATS COUNTER ANIMATION
════════════════════════════════════════════════════════════ */

/**
 * Animate a number from 0 to `target` over `duration` ms with ease-out.
 * @param {HTMLElement} el
 * @param {number}      target
 * @param {string}      suffix  – e.g. "+", " Roles"
 * @param {number}      duration
 */
function animateCounter(el, target, suffix, duration = 1800) {
  const startTime = performance.now();

  function tick(now) {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current  = Math.floor(eased * target);
    el.textContent = current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target.querySelector('.bc-stat-num');
      if (!el || el.dataset.animated) return;

      el.dataset.animated = 'true';
      const raw    = el.getAttribute('data-target');
      const suffix = el.getAttribute('data-suffix') || '';
      animateCounter(el, parseInt(raw, 10), suffix);
      counterObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.bc-stat-item').forEach(el => counterObserver.observe(el));


/* ════════════════════════════════════════════════════════════
   6. CONTACT FORM HANDLER
════════════════════════════════════════════════════════════ */

const contactForm  = document.getElementById('contactForm');
const formSuccess  = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    /* Bootstrap 5 validation */
    if (!this.checkValidity()) {
      this.classList.add('was-validated');
      return;
    }

    /* Loading state */
    const submitBtn = this.querySelector('.bc-submit-btn');
    const origHTML  = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>' +
                          (currentLang === 'hi' ? 'भेज रहे हैं…' : 'Sending…');
    submitBtn.disabled  = true;

    /* Simulate async submission (replace with Django fetch/AJAX later) */
    setTimeout(() => {
      contactForm.reset();
      contactForm.classList.remove('was-validated');
      submitBtn.innerHTML = origHTML;
      submitBtn.disabled  = false;

      if (formSuccess) {
        formSuccess.classList.remove('d-none');
        applyLanguage(currentLang); // translate success message
        setTimeout(() => formSuccess.classList.add('d-none'), 6000);
      }
    }, 1400);
  });
}


/* ════════════════════════════════════════════════════════════
   7. SMOOTH SCROLL (anchor links)
════════════════════════════════════════════════════════════ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (!targetId || targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = (navbar ? navbar.offsetHeight : 72) + 12;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


/* ════════════════════════════════════════════════════════════
   8. BACK TO TOP BUTTON
════════════════════════════════════════════════════════════ */

const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ════════════════════════════════════════════════════════════
   9. HOW IT WORKS — STEP STAGGER ANIMATION
════════════════════════════════════════════════════════════ */

const howObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.bc-how-step').forEach((step, i) => {
        setTimeout(() => {
          step.style.opacity   = '1';
          step.style.transform = 'translateY(0)';
        }, i * 140);
      });
      howObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.bc-how-timeline').forEach(el => {
  el.querySelectorAll('.bc-how-step').forEach(step => {
    step.style.opacity    = '0';
    step.style.transform  = 'translateY(24px)';
    step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  howObserver.observe(el);
});


/* ════════════════════════════════════════════════════════════
   END OF script.js
════════════════════════════════════════════════════════════ */
