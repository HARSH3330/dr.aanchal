/* ============================================================
   DR. AANCHAL MEDICAL CLINIC — MAIN JAVASCRIPT
   ============================================================ */

(function () {
  'use strict';

  /* ---- Navbar: Scroll Effect + Mobile Menu ---- */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = document.querySelectorAll('.navbar__mobile a');

  function handleNavbarScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  if (navbar) {
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();
  }

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Active Nav Link ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__nav a, .navbar__mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---- Scroll Reveal Animation ---- */
  function initReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));
  }

  /* ---- Testimonial Carousel ---- */
  function initCarousel() {
    const track = document.getElementById('testimonialsTrack');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');

    if (!track) return;

    const total = track.children.length;
    let current = 0;
    let autoTimer;

    function goTo(index) {
      current = (index + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function startAuto() {
      autoTimer = setInterval(() => goTo(current + 1), 5000);
    }

    function stopAuto() {
      clearInterval(autoTimer);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); });
    });

    goTo(0);
    startAuto();

    // Touch swipe support
    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        stopAuto();
        goTo(diff > 0 ? current + 1 : current - 1);
        startAuto();
      }
    }, { passive: true });
  }

  /* ---- FAQ Accordion ---- */
  function initFAQ() {
    const faqs = document.querySelectorAll('.faq-item');
    faqs.forEach(item => {
      const btn = item.querySelector('.faq-question');
      if (!btn) return;
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close all
        faqs.forEach(f => f.classList.remove('open'));
        // Toggle clicked
        if (!isOpen) item.classList.add('open');
      });
    });
  }

  /* ============================================================
     APPOINTMENT FORM — Web3Forms Integration
     Sends submissions to draanchal3.3@gmail.com
     Free service, no backend needed.
     Web3Forms access key is tied to the recipient email.
     ============================================================ */
  function initForm() {
    // Web3Forms free access key for draanchal3.3@gmail.com
    // Get your key at https://web3forms.com (free, no login needed)
    const WEB3FORMS_ACCESS_KEY = 'ae7e3c51-ff1c-4e27-b178-6dfe57ff4a61';

    // Handle ALL forms with id="appointmentForm" on the page
    document.querySelectorAll('#appointmentForm').forEach(function (form) {
      form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const btn = form.querySelector('button[type="submit"]');
        const successMsg = form.closest('div') ? form.closest('div').querySelector('#formSuccess') : null
                        || document.getElementById('formSuccess');

        // --- Basic Validation ---
        const nameField  = form.querySelector('[name="name"]');
        const phoneField = form.querySelector('[name="phone"]');
        const emailField = form.querySelector('[name="email"]');

        if (nameField && !nameField.value.trim()) {
          nameField.focus();
          showFieldError(nameField, 'Please enter your full name.');
          return;
        }
        if (phoneField && !phoneField.value.trim()) {
          phoneField.focus();
          showFieldError(phoneField, 'Please enter your phone number.');
          return;
        }
        if (emailField && !emailField.value.trim()) {
          emailField.focus();
          showFieldError(emailField, 'Please enter your email address.');
          return;
        }

        // --- Loading State ---
        const originalText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '⏳ Sending…';

        // --- Build form data ---
        const formData = new FormData(form);
        formData.append('access_key', WEB3FORMS_ACCESS_KEY);
        formData.append('subject', 'New Appointment Request – Dr. Aanchal Medical Clinic');
        formData.append('from_name', 'Dr. Aanchal Website');
        formData.append('replyto', emailField ? emailField.value : '');

        try {
          const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
          });

          const result = await response.json();

          if (result.success) {
            // Show success
            form.style.display = 'none';
            if (successMsg) {
              successMsg.classList.add('visible');
              successMsg.style.display = 'flex';
            }
          } else {
            // API error
            btn.disabled = false;
            btn.innerHTML = originalText;
            showFormError(form, 'Something went wrong. Please try again or call us directly at +91 9258840675.');
          }
        } catch (err) {
          // Network error
          btn.disabled = false;
          btn.innerHTML = originalText;
          showFormError(form, 'Could not connect. Please check your internet or call +91 9258840675.');
        }
      });
    });
  }

  function showFieldError(field, message) {
    // Remove any existing error
    const existing = field.parentElement.querySelector('.field-error');
    if (existing) existing.remove();

    const err = document.createElement('span');
    err.className = 'field-error';
    err.style.cssText = 'color:#e53e3e;font-size:0.78rem;margin-top:4px;display:block;';
    err.textContent = message;
    field.parentElement.appendChild(err);
    field.style.borderColor = '#e53e3e';

    field.addEventListener('input', function () {
      err.remove();
      field.style.borderColor = '';
    }, { once: true });
  }

  function showFormError(form, message) {
    let errBox = form.querySelector('.form-global-error');
    if (!errBox) {
      errBox = document.createElement('div');
      errBox.className = 'form-global-error';
      errBox.style.cssText = 'background:#fff5f5;border:1px solid #fc8181;color:#c53030;padding:12px 16px;border-radius:8px;font-size:0.88rem;margin-top:12px;';
      form.appendChild(errBox);
    }
    errBox.textContent = message;
  }

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---- Hero scroll cue ---- */
  const heroScroll = document.getElementById('heroScroll');
  if (heroScroll) {
    heroScroll.addEventListener('click', () => {
      const next = document.getElementById('services');
      if (next) next.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---- Counter Animation ---- */
  function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.count, 10);
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const update = () => {
        current = Math.min(current + step, target);
        counter.textContent = Math.floor(current).toLocaleString();
        if (current < target) requestAnimationFrame(update);
        else counter.textContent = target.toLocaleString() + (counter.dataset.suffix || '');
      };

      const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) { update(); obs.disconnect(); }
      }, { threshold: 0.5 });
      obs.observe(counter);
    });
  }

  /* ---- Init ---- */
  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    initCarousel();
    initFAQ();
    initForm();
    animateCounters();
  });
})();
