/* Xu Chen - homepage interactions. No dependencies. */
(function () {
  'use strict';

  var root = document.documentElement;
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ---------- Theme ---------- */
  var themeBtn = $('#theme-toggle');
  var metaTheme = $('meta[name="theme-color"]');

  function syncThemeUI() {
    var dark = root.getAttribute('data-theme') === 'dark';
    if (themeBtn) themeBtn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    if (metaTheme) metaTheme.setAttribute('content', dark ? '#0c1017' : '#f7f8fa');
  }
  syncThemeUI();

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('xc-theme', next); } catch (e) {}
      syncThemeUI();
    });
  }

  /* ---------- Mobile navigation ---------- */
  var navToggle = $('#nav-toggle');
  var nav = $('.primary-nav');

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation');
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    $$('a', nav).forEach(function (link) { link.addEventListener('click', closeNav); });
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !navToggle.contains(e.target)) closeNav();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeNav(); });
  }

  /* ---------- Header shadow ---------- */
  var header = $('#site-header');
  var onScroll = function () {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Active nav link ---------- */
  var navLinks = $$('.nav-links a');
  var targets = navLinks.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);

  if ('IntersectionObserver' in window && targets.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-25% 0px -65% 0px', threshold: 0 });
    targets.forEach(function (t) { navObserver.observe(t); });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealItems = $$('.reveal');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    revealItems.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 4, 3) * 55 + 'ms';
      revealObserver.observe(el);
    });
  } else {
    revealItems.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Work filters ---------- */
  var filterButtons = $$('.filter');
  var cards = $$('[data-track]');
  var groups = $$('.work-group');
  var emptyState = $('#empty-state');

  function applyFilter(value) {
    var shown = 0;
    cards.forEach(function (card) {
      var match = value === 'all' || card.getAttribute('data-track') === value;
      card.classList.toggle('is-hidden', !match);
      if (match) {
        card.classList.add('is-visible'); // skip reveal animation when re-shown
        shown++;
      }
    });
    groups.forEach(function (group) {
      var visibleCards = $$('[data-track]', group).filter(function (c) { return !c.classList.contains('is-hidden'); });
      group.classList.toggle('is-hidden', visibleCards.length === 0);
    });
    if (emptyState) emptyState.hidden = shown > 0;
    filterButtons.forEach(function (btn) {
      var active = btn.getAttribute('data-filter') === value;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  }

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () { applyFilter(btn.getAttribute('data-filter')); });
  });

  /* ---------- Copy email ---------- */
  var copyBtn = $('#copy-email');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var email = copyBtn.getAttribute('data-email');
      var done = function () {
        var original = 'Copy email address';
        copyBtn.textContent = 'Copied!';
        window.setTimeout(function () { copyBtn.textContent = original; }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done, function () { fallbackCopy(email, done); });
      } else {
        fallbackCopy(email, done);
      }
    });
  }
  function fallbackCopy(text, done) {
    var tmp = document.createElement('textarea');
    tmp.value = text;
    tmp.setAttribute('readonly', '');
    tmp.style.position = 'fixed';
    tmp.style.opacity = '0';
    document.body.appendChild(tmp);
    tmp.select();
    try { document.execCommand('copy'); done(); } catch (e) {}
    document.body.removeChild(tmp);
  }

  /* ---------- Footer year ---------- */
  var yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
