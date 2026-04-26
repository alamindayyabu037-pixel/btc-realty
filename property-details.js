/* ══════════════════════════════════════
   BTC REALTY — property-details.js
══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Gallery images data ── */
  const images = [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=85',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=85',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1400&q=85',
    'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1400&q=85',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1400&q=85',
  ];

  let currentIndex = 0;

  const mainImg     = document.getElementById('mainImg');
  const galleryCount = document.getElementById('galleryCount');
  const thumbs      = document.querySelectorAll('.thumb');

  /* Switch main image */
  function setImage(index) {
    currentIndex = index;
    mainImg.style.opacity = '0';
    setTimeout(() => {
      mainImg.src = images[index];
      mainImg.style.opacity = '1';
    }, 180);
    galleryCount.textContent = `${index + 1} / ${images.length}`;
    thumbs.forEach(t => t.classList.remove('active'));
    thumbs[index].classList.add('active');
  }

  /* Thumbnail click */
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      setImage(parseInt(thumb.dataset.index));
    });
  });

  /* ── Lightbox ── */
  const lightbox  = document.getElementById('lightbox');
  const lbImg     = document.getElementById('lbImg');
  const lbCounter = document.getElementById('lbCounter');
  const lbClose   = document.getElementById('lbClose');
  const lbPrev    = document.getElementById('lbPrev');
  const lbNext    = document.getElementById('lbNext');

  function openLightbox(index) {
    currentIndex = index;
    lbImg.src = images[index];
    lbCounter.textContent = `${index + 1} / ${images.length}`;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function lbNavigate(dir) {
    currentIndex = (currentIndex + dir + images.length) % images.length;
    lbImg.style.opacity = '0';
    setTimeout(() => {
      lbImg.src = images[currentIndex];
      lbImg.style.opacity = '1';
      lbCounter.textContent = `${currentIndex + 1} / ${images.length}`;
    }, 160);
  }

  document.getElementById('galleryMain').addEventListener('click', () => openLightbox(currentIndex));
  document.getElementById('fullscreenBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    openLightbox(currentIndex);
  });
  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click',  () => lbNavigate(-1));
  lbNext.addEventListener('click',  () => lbNavigate(1));

  /* Close lightbox on backdrop click */
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  /* Keyboard navigation */
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'ArrowLeft')  lbNavigate(-1);
    if (e.key === 'ArrowRight') lbNavigate(1);
    if (e.key === 'Escape')     closeLightbox();
  });

  /* ── Favourite Button ── */
  const favBtn = document.getElementById('favBtn');
  favBtn.addEventListener('click', () => {
    favBtn.classList.toggle('saved');
  });

  /* ── Read More ── */
  const readMoreBtn  = document.getElementById('readMoreBtn');
  const extraDesc    = document.querySelector('.pd-desc-extra');

  readMoreBtn.addEventListener('click', () => {
    extraDesc.classList.toggle('hidden');
    readMoreBtn.textContent = extraDesc.classList.contains('hidden')
      ? 'Read More' : 'Read Less';
  });

  /* ── Inquiry Form Submit ── */
  const inqSubmit = document.getElementById('inqSubmit');
  inqSubmit.addEventListener('click', () => {
    const name  = document.querySelector('.inq-input:nth-child(2)').value.trim();
    const phone = document.querySelector('.inq-input:nth-child(3)').value.trim();

    if (!name || !phone) {
      inqSubmit.textContent = 'Please fill name & phone';
      inqSubmit.style.background = '#c0392b';
      setTimeout(() => {
        inqSubmit.textContent = 'Send Message';
        inqSubmit.style.background = '';
      }, 2500);
      return;
    }

    inqSubmit.textContent = '✓ Message Sent!';
    inqSubmit.style.background = '#1a6b3a';
    setTimeout(() => {
      inqSubmit.textContent = 'Send Message';
      inqSubmit.style.background = '';
    }, 3000);
  });

});