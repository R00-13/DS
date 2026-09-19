(function () {
  var SUPPORTED = ['en', 'sq', 'mk'];
  var DEFAULT_LANG = 'en';

  function getSavedLang() {
    var saved = null;
    try { saved = localStorage.getItem('ds_lang'); } catch (e) {}
    return SUPPORTED.indexOf(saved) !== -1 ? saved : DEFAULT_LANG;
  }

  function getByPath(obj, path) {
    return path.split('.').reduce(function (acc, key) {
      return acc && acc[key] !== undefined ? acc[key] : undefined;
    }, obj);
  }

  function applyTranslations(dict) {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var value = getByPath(dict, key);
      if (typeof value === 'string') el.innerHTML = value;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      var value = getByPath(dict, key);
      if (typeof value === 'string') el.setAttribute('placeholder', value);
    });
    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-title');
      var value = getByPath(dict, key);
      if (typeof value === 'string') el.setAttribute('title', value);
    });
  }

  function updateLangUI(lang) {
    var labels = { en: 'EN', sq: 'SQ', mk: 'MK' };
    var labelEl = document.getElementById('langBtnLabel');
    if (labelEl) labelEl.textContent = labels[lang] || 'EN';
    document.querySelectorAll('#langMenu button').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    document.documentElement.setAttribute('lang', lang);
  }

  function applyLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT_LANG;
    var data = window.DS_I18N_DATA || {};
    var dict = data[lang];
    if (!dict) { console.error('DS i18n: no data for language', lang); return; }
    applyTranslations(dict);
    updateLangUI(lang);
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT_LANG;
    try { localStorage.setItem('ds_lang', lang); } catch (e) {}
    applyLang(lang);
  }

  window.DSI18n = { setLang: setLang, getSavedLang: getSavedLang, SUPPORTED: SUPPORTED };

  function init() { applyLang(getSavedLang()); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
