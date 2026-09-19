document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggle
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      mainNav.classList.toggle('open');
    });
    mainNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { mainNav.classList.remove('open'); });
    });
  }

  // Language switcher dropdown
  var langBtn = document.getElementById('langBtn');
  var langMenu = document.getElementById('langMenu');
  if (langBtn && langMenu) {
    langBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      langMenu.classList.toggle('open');
    });
    langMenu.querySelectorAll('button[data-lang]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        window.DSI18n.setLang(btn.getAttribute('data-lang'));
        langMenu.classList.remove('open');
      });
    });
    document.addEventListener('click', function () { langMenu.classList.remove('open'); });
  }

  // Cookie consent banner
  var COOKIE_KEY = 'ds_cookie_consent';
  var banner = document.getElementById('cookieBanner');
  function showBannerIfNeeded() {
    if (banner && !localStorage.getItem(COOKIE_KEY)) {
      banner.classList.add('show');
    }
  }
  function setConsent(value) {
    localStorage.setItem(COOKIE_KEY, value);
    if (banner) banner.classList.remove('show');
  }
  showBannerIfNeeded();
  var acceptAll = document.getElementById('cookieAcceptAll');
  var rejectAll = document.getElementById('cookieRejectAll');
  if (acceptAll) acceptAll.addEventListener('click', function () { setConsent('all'); });
  if (rejectAll) rejectAll.addEventListener('click', function () { setConsent('necessary'); });
  var pageAccept = document.getElementById('pageCookieAccept');
  var pageReject = document.getElementById('pageCookieReject');
  if (pageAccept) pageAccept.addEventListener('click', function () { setConsent('all'); });
  if (pageReject) pageReject.addEventListener('click', function () { setConsent('necessary'); });

  // Contact form validation (static site — no backend, shows local confirmation)
  var form = document.getElementById('contactForm');
  if (form) {
    var successBox = document.getElementById('formSuccess');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      var nameField = document.getElementById('field-name');
      var nameInput = document.getElementById('name');
      if (!nameInput.value.trim()) { nameField.classList.add('invalid'); valid = false; }
      else nameField.classList.remove('invalid');

      var emailField = document.getElementById('field-email');
      var emailInput = document.getElementById('email');
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) { emailField.classList.add('invalid'); valid = false; }
      else emailField.classList.remove('invalid');

      var messageField = document.getElementById('field-message');
      var messageInput = document.getElementById('message');
      if (!messageInput.value.trim()) { messageField.classList.add('invalid'); valid = false; }
      else messageField.classList.remove('invalid');

      if (!valid) return;

      if (successBox) {
        successBox.classList.add('show');
        successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      form.reset();
    });
  }
});
