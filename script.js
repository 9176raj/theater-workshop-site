// Add interactive behavior for mobile navigation, scroll reveals, and form submission.

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.site-nav');
const revealElements = document.querySelectorAll('.reveal');
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

// Toggle the mobile menu open and closed.
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('open');
  });
}

// Close the mobile menu when a link is selected.
navMenu?.addEventListener('click', (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    navMenu.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }
});

// Smooth reveal animation for sections as they scroll into view.
const isMobile = window.matchMedia('(max-width: 760px)').matches;
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((element) => {
  if (isMobile) {
    element.classList.add('visible');
  } else {
    observer.observe(element);
  }
});

// Basic front-end form validation and status messaging.
if (form && status) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      status.textContent = 'Please complete all required fields before sending.';
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      status.textContent = 'Please enter a valid email address.';
      return;
    }

    status.textContent = 'Thanks! Your message has been sent. We will contact you soon.';
    form.reset();
  });
}
