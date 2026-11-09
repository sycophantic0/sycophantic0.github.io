(function () {
  'use strict';

  // ---- Mobile nav ----
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');

  function setNav(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setNav(!nav.classList.contains('open'));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        setNav(false);
        toggle.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.site-header')) setNav(false);
    });
  }

  // ---- Footer year ----
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // ---- Front-end form shells (no data is sent anywhere) ----
  function wireForm(formId, statusId, message) {
    var form = document.getElementById(formId);
    var status = document.getElementById(statusId);
    if (!form || !status) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var amt = form.querySelector('input[name="amount"]:checked');
      status.textContent = amt ? message.replace('{amount}', '$' + amt.value) : message;
      status.hidden = false;
      if (!amt) form.reset();
    });
  }

  wireForm('signup-form', 'form-status', 'Thank you. Your details have been received.');
  wireForm('donate-form', 'donate-status', 'Thank you for your {amount} donation. (Demo only: no payment is processed.)');
})();
