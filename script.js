/* ══════════════════════════════════════
   BTC REALTY — script.js
   Hero Page JavaScript
══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. NAVBAR — scroll effect ── */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });


  /* ── 2. HAMBURGER — open mobile menu ── */
  const ham    = document.getElementById('ham');
  const mMenu  = document.getElementById('mMenu');
  const mobClose = document.getElementById('mobClose');

  function openMenu() {
    ham.classList.add('open');
    mMenu.classList.add('open');
    document.body.style.overflow = 'hidden'; // prevent background scroll
  }

  function closeMenu() {
    ham.classList.remove('open');
    mMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  ham.addEventListener('click', () => {
    if (mMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close button inside mobile menu
  mobClose.addEventListener('click', closeMenu);

  // Close when any nav link is clicked
  document.querySelectorAll('.mob-link, .mob-cta').forEach(el => {
    el.addEventListener('click', closeMenu);
  });

  // Close when clicking outside the menu (on the backdrop)
  mMenu.addEventListener('click', (e) => {
    if (e.target === mMenu) closeMenu();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mMenu.classList.contains('open')) {
      closeMenu();
    }
  });


  /* ── 3. FILTER CHIPS — toggle active state ── */
  const chips = document.querySelectorAll('.chip');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });


  /* ── 4. SEARCH BUTTON — basic validation ── */
  const searchBtn = document.getElementById('searchBtn');
  const locInput  = document.getElementById('loc');
  const typSelect = document.getElementById('typ');
  const bdgSelect = document.getElementById('bdg');

  searchBtn.addEventListener('click', () => {
    const location = locInput.value.trim();
    const type     = typSelect.value;
    const budget   = bdgSelect.value;

    // Simple feedback — will connect to PHP backend later
    if (!location && !type && !budget) {
      locInput.focus();
      locInput.placeholder = 'Please enter a location…';
      locInput.style.color = 'var(--gold)';

      setTimeout(() => {
        locInput.placeholder = 'Abuja, Lagos, Kano…';
        locInput.style.color = '';
      }, 2000);
      return;
    }

    // Ready for PHP backend — log search params for now
    console.log('Search:', { location, type, budget });

    // TODO: send to properties.php?location=...&type=...&budget=...
    // window.location.href = `properties.php?location=${location}&type=${type}&budget=${budget}`;
  });

});



/* ══ PROPERTIES — Scroll Reveal ══ */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

/* ══ PROPERTIES — Filter Tabs ══ */
const tabs  = document.querySelectorAll('.tab');
const cards = document.querySelectorAll('.prop-card');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;
    cards.forEach(card => {
      if (filter === 'all' || card.dataset.type === filter) {
        card.classList.remove('hidden');
        card.classList.remove('visible');
        setTimeout(() => card.classList.add('visible'), 60);
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ══ PROPERTIES — Favourite Toggle ══ */
document.querySelectorAll('.card-fav').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    btn.classList.toggle('saved');
  });
});


/* ══ CONTACT FORM ══ */
const contactSubmit = document.getElementById('contactSubmit');
const formSuccess = document.getElementById('formSuccess');

contactSubmit.addEventListener('click', () => {
  const name = document.getElementById('cName').value.trim();
  const phone = document.getElementById('cPhone').value.trim();
  const email = document.getElementById('cEmail').value.trim();
  const message = document.getElementById('cMessage').value.trim();
  
  /* Basic validation */
  if (!name || !phone) {
    contactSubmit.textContent = '⚠ Fill name & phone first';
    contactSubmit.style.background = '#c0392b';
    setTimeout(() => {
      contactSubmit.innerHTML = `Send Message <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
      contactSubmit.style.background = '';
    }, 2500);
    return;
  }
  
  /* Success — PHP will handle real sending later */
  contactSubmit.style.display = 'none';
  formSuccess.classList.add('show');
  
  /* TODO: send to contact.php via fetch() */
  /* 
  fetch('contact.php', {
    method: 'POST',
    body: new FormData(document.getElementById('contactForm'))
  });
  */
});




/* ══ ABOUT — Reveal Animations ══ */
const aboutReveals = document.querySelectorAll('.reveal-left, .reveal-right');

const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      aboutObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

aboutReveals.forEach(el => aboutObserver.observe(el));