/* ============================================================
   SHREYA BHOSALE — PORTFOLIO SCRIPT
   ============================================================ */

(function () {
  'use strict';

  /* ---------- 1. SMOOTH SCROLLING ---------- */
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ---------- 2. ACTIVE NAV HIGHLIGHTING ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  function updateActiveNav() {
    let current = '';
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  window.addEventListener('load', updateActiveNav);

  /* ---------- 3. FADE-IN ON SCROLL ---------- */
  const animatedElements = document.querySelectorAll(
    '.project-card, .exp-card, .skill-category, .timeline-item'
  );

  animatedElements.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  function checkReveal() {
    const windowHeight = window.innerHeight;
    animatedElements.forEach(function (el) {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 80) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }

  window.addEventListener('scroll', checkReveal);
  window.addEventListener('load', checkReveal);

  /* ---------- 4. RESUME DOWNLOAD TRACKING ---------- */
  const resumeBtn = document.querySelector('a[href$=".pdf"]');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', function () {
      console.log('%c📄 Resume downloaded', 'color: #10b981; font-weight: bold;');
      // Optional: show a temporary toast
      showToast('Resume download started!');
    });
  }

  /* ---------- 5. TOAST NOTIFICATION ---------- */
  function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: #0a2647;
      color: #fff;
      padding: 0.85rem 1.6rem;
      border-radius: 40px;
      font-size: 0.88rem;
      font-weight: 500;
      box-shadow: 0 12px 30px rgba(10, 38, 71, 0.25);
      z-index: 9999;
      opacity: 0;
      transition: all 0.4s ease;
      font-family: 'Inter', sans-serif;
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(function () {
      toast.style.transform = 'translateX(-50%) translateY(0)';
      toast.style.opacity = '1';
    });

    setTimeout(function () {
      toast.style.transform = 'translateX(-50%) translateY(100px)';
      toast.style.opacity = '0';
      setTimeout(function () {
        toast.remove();
      }, 400);
    }, 2600);
  }

  /* ---------- 6. AUTO YEAR ---------- */
  const footerYear = document.querySelector('footer .footer-content div');
  if (footerYear) {
    footerYear.innerHTML = footerYear.innerHTML.replace('2026', new Date().getFullYear());
  }

  /* ---------- 7. LOG ---------- */
  console.log('%c✨ Shreya Bhosale · AI & ML Portfolio Loaded ✨',
    'color: #10b981; font-size: 14px; font-weight: bold;');

  /* ---------- 8. FORCE CONTACT ACTIVE AT BOTTOM ---------- */
  window.addEventListener('scroll', function () {
    const isBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 5;
    if (isBottom) {
      navItems.forEach(function (link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#contact') {
          link.classList.add('active');
        }
      });
    }
  });

})();
