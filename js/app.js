(function () {
  'use strict';

  let lang = localStorage.getItem('siteLang') || 'en';
  let currentFilter = 'all';

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  function applyI18n() {
    const t = I18N[lang];
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = t[key];
        else el.textContent = t[key];
      }
    });
    $('#langBtn').textContent = lang === 'en' ? '中文' : 'English';
    $('#brandName').textContent = lang === 'en' ? SITE.artistNameEn : SITE.artistNameZh;
    $('#footerName').textContent = lang === 'en' ? SITE.artistNameEn : SITE.artistNameZh;
    $('#footerArtist').textContent = lang === 'en' ? SITE.artistNameEn : SITE.artistNameZh;
    $('#bioText').textContent = lang === 'en' ? SITE.bioEn : SITE.bioZh;
    $('#locationText').textContent = lang === 'en' ? SITE.locationEn : SITE.locationZh;
    $('#shippingText').textContent = lang === 'en' ? SITE.shippingEn : SITE.shippingZh;
    $('#emailLink').textContent = SITE.email;
    $('#emailLink').href = 'mailto:' + SITE.email;
    renderGallery();
    renderSocial();
  }

  function priceLabel(a) {
    if (!a.price) return I18N[lang].priced;
    return (lang === 'en' ? '$' : 'US$') + a.price;
  }

  function renderGallery() {
    const grid = $('#gallery');
    grid.innerHTML = '';
    ARTWORKS.forEach((a, idx) => {
      if (currentFilter !== 'all' && a.category !== currentFilter) return;
      const card = document.createElement('article');
      card.className = 'card';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', (lang === 'en' ? a.titleEn : a.titleZh));
      card.innerHTML =
        '<div class="card-img"><img src="' + a.image + '" alt="' + (lang === 'en' ? a.titleEn : a.titleZh) + '" loading="lazy"></div>' +
        '<div class="card-info"><span class="card-title">' + (lang === 'en' ? a.titleEn : a.titleZh) + '</span>' +
        '<span class="card-price">' + priceLabel(a) + '</span></div>' +
        '<div class="card-meta">' + a.year + ' · ' + (lang === 'en' ? a.sizeIn : a.sizeCm) + '</div>';
      card.addEventListener('click', () => openModal(idx));
      card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(idx); } });
      grid.appendChild(card);
    });
  }

  function renderSocial() {
    const block = $('#socialBlock');
    const items = [];
    if (SITE.instagram) items.push('<a href="' + SITE.instagram + '" target="_blank" rel="noopener">Instagram</a>');
    if (SITE.whatsapp) items.push('<a href="' + SITE.whatsapp + '" target="_blank" rel="noopener">WhatsApp</a>');
    block.innerHTML = items.length
      ? '<span class="meta-label">Social</span>' + items.join('')
      : '';
    if (items.length) block.style.display = 'flex'; else block.style.display = 'none';

    const pp = $('#paypalBlock');
    if (SITE.paypalMe && SITE.paypalMe !== '#') { $('#paypalLink').href = SITE.paypalMe; pp.style.display = 'flex'; }
    else pp.style.display = 'none';
  }

  function openModal(idx) {
    const a = ARTWORKS[idx];
    const t = I18N[lang];
    const body = $('#modalBody');
    const subject = encodeURIComponent('Enquiry: ' + a.titleEn + ' (' + a.sizeIn + ')');
    const mailBody = encodeURIComponent('Hello,\n\nI am interested in "' + a.titleEn + '" (' + a.sizeIn + ', ' + a.year + ').\n\nPlease let me know the price and shipping cost to my country.\n\nThank you.');
    const mailto = 'mailto:' + SITE.email + '?subject=' + subject + '&body=' + mailBody;
    body.innerHTML =
      '<div class="modal-image"><img src="' + a.image + '" alt="' + (lang === 'en' ? a.titleEn : a.titleZh) + '"></div>' +
      '<div class="modal-detail">' +
        '<h3>' + (lang === 'en' ? a.titleEn : a.titleZh) + '</h3>' +
        '<div class="modal-year">' + a.year + '</div>' +
        '<p class="modal-desc">' + (lang === 'en' ? a.descEn : a.descZh) + '</p>' +
        '<div class="spec-row"><span>' + t.size + '</span><span>' + (lang === 'en' ? a.sizeIn : a.sizeCm) + '</span></div>' +
        '<div class="spec-row"><span>' + t.medium + '</span><span>' + a.medium + '</span></div>' +
        '<div class="spec-row"><span>' + t.year + '</span><span>' + a.year + '</span></div>' +
        '<div class="modal-price">' + priceLabel(a) + '</div>' +
        '<a class="btn btn-primary" href="' + mailto + '">' + t.inquire + '</a>' +
      '</div>';
    $('#modal').hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    $('#modal').hidden = true;
    document.body.style.overflow = '';
  }

  $$('#filters .filter').forEach((btn) => {
    btn.addEventListener('click', () => {
      $$('#filters .filter').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      renderGallery();
    });
  });

  $('#langBtn').addEventListener('click', () => {
    lang = lang === 'en' ? 'zh' : 'en';
    localStorage.setItem('siteLang', lang);
    applyI18n();
  });

  $('#menuBtn').addEventListener('click', () => $('#mainNav').classList.toggle('open'));
  $$('#mainNav a').forEach((a) => a.addEventListener('click', () => $('#mainNav').classList.remove('open')));

  $$('[data-close]').forEach((el) => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  $('#contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#fName').value.trim();
    const email = $('#fEmail').value.trim();
    const message = $('#fMessage').value.trim();
    const subject = encodeURIComponent('Art enquiry from ' + name);
    const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
    window.location.href = 'mailto:' + SITE.email + '?subject=' + subject + '&body=' + body;
  });

  window.addEventListener('scroll', () => {
    $('#top').classList.toggle('scrolled', window.scrollY > 60);
  });

  $('#year').textContent = new Date().getFullYear();
  applyI18n();
})();
