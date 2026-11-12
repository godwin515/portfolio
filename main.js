// Keep the copyright year current on every page
document.querySelectorAll('.year').forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

// "Copy email" button on the contact page
document.querySelectorAll('.copy-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var text = btn.getAttribute('data-copy');
    var status = btn.closest('div').parentNode.querySelector('.copy-status');
    function done(msg) {
      if (status) status.textContent = msg;
      btn.textContent = 'Copied!';
      setTimeout(function () { btn.textContent = 'Copy email'; }, 2000);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () { done('Email address copied.'); },
        function () { done('Copy failed. Please select the address above.'); });
    } else {
      var t = document.createElement('textarea');
      t.value = text; document.body.appendChild(t); t.select();
      try { document.execCommand('copy'); done('Email address copied.'); }
      catch (e) { done('Copy failed. Please select the address above.'); }
      document.body.removeChild(t);
    }
  });
});

// Mobile hamburger side menu
(function () {
  var toggle = document.querySelector('.menu-toggle');
  var menu = document.getElementById('mobile-menu');
  var overlay = document.querySelector('.menu-overlay');
  if (!toggle || !menu) return;

  function open() {
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    overlay.hidden = false;
    requestAnimationFrame(function () { overlay.classList.add('is-open'); });
    document.body.classList.add('menu-lock');
    var first = menu.querySelector('.menu-close');
    if (first) first.focus();
  }
  function close() {
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('is-open');
    setTimeout(function () { overlay.hidden = true; }, 250);
    document.body.classList.remove('menu-lock');
    toggle.focus();
  }
  toggle.addEventListener('click', open);
  document.querySelectorAll('[data-menu-close]').forEach(function (el) { el.addEventListener('click', close); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) close();
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768 && menu.classList.contains('is-open')) close();
  });
})();
