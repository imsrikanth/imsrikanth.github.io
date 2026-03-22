/* ============================================
   PORTFOLIO — Interactivity & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* —————————————————————————————————
     1. Scroll-reveal (IntersectionObserver)
  ——————————————————————————————————— */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${i % 4 * 0.1}s`;
    revealObserver.observe(el);
  });

  /* —————————————————————————————————
     2. Typing animation (hero tagline)
  ——————————————————————————————————— */
  const taglineText = 'Handling 10k+ requests/day  |  Spring Boot  |  Microservices';
  const typingEl = document.getElementById('typingText');
  let charIndex = 0;

  function typeChar() {
    if (charIndex < taglineText.length) {
      typingEl.textContent += taglineText[charIndex];
      charIndex++;
      setTimeout(typeChar, 45);
    }
  }

  // Start typing after a small delay
  setTimeout(typeChar, 800);

  /* —————————————————————————————————
     3. Mobile hamburger menu
  ——————————————————————————————————— */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);
  navOverlay.addEventListener('click', toggleMenu);

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) toggleMenu();
    });
  });

  /* —————————————————————————————————
     4. Animated counters (metrics)
  ——————————————————————————————————— */
  const metricValues = document.querySelectorAll('.metric-value');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  metricValues.forEach((el) => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const stepTime = 30;
    const steps = Math.ceil(duration / stepTime);
    let current = 0;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, stepTime);
  }

  /* —————————————————————————————————
     5. Smooth scroll for nav links
  ——————————————————————————————————— */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* —————————————————————————————————
     6. Navbar background on scroll
  ——————————————————————————————————— */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.style.background = getComputedStyle(document.documentElement).getPropertyValue('--nav-bg-scroll').trim();
    } else {
      navbar.style.background = '';
    }
  });

  /* —————————————————————————————————
     7. Theme toggle (dark / light)
  ——————————————————————————————————— */
  const themeToggle = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;

  // Restore saved theme
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme) {
    htmlEl.setAttribute('data-theme', savedTheme);
  }

  themeToggle.addEventListener('click', () => {
    const current = htmlEl.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    htmlEl.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
    // Reset inline navbar bg so CSS var takes over
    navbar.style.background = '';
  });

});

/* —————————————————————————————————
   7. Project card expand/collapse
——————————————————————————————————— */
function toggleProject(card) {
  // Close any other open cards
  document.querySelectorAll('.project-card.expanded').forEach((c) => {
    if (c !== card) c.classList.remove('expanded');
  });
  card.classList.toggle('expanded');
}
