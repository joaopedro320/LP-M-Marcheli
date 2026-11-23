(function () {
  'use strict';
  var C = window.QH4_CFG, $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* botões de WhatsApp */
  $$('[data-wa]').forEach(function (a) {
    var msg = a.getAttribute('data-msg') || C.waMensagem;
    a.href = window.qh4WaLink(msg);
    a.target = '_blank'; a.rel = 'noopener';
    a.addEventListener('click', function () { window.qh4Track('whatsapp_click', { wa_local: a.getAttribute('data-wa') }); });
  });

  /* header */
  var hdr = $('.hdr');
  function onScroll() {
    var y = window.scrollY;
    if (hdr) hdr.classList.toggle('on', y > 40);
    var bg = $('.hero-bg img');
    if (bg && y < window.innerHeight * 1.2) bg.style.transform = 'translate3d(0,' + (y * 0.18) + 'px,0) scale(1.04)';
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* menu mobile */
  var bg = $('.burger'), nav = $('.nav');
  if (bg && nav) {
    bg.addEventListener('click', function () { nav.classList.toggle('open'); bg.setAttribute('aria-expanded', nav.classList.contains('open')); });
    $$('a', nav).forEach(function (a) { a.addEventListener('click', function () { nav.classList.remove('open'); }); });
  }

  /* scroll reveal */
  var els = $$('.rv,.lanes,.step');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('in'); }); }

  /* contador 33 */
  var cnt = $('[data-count]');
  if (cnt && 'IntersectionObserver' in window) {
    var to = parseInt(cnt.getAttribute('data-count'), 10), done = false;
    new IntersectionObserver(function (en, ob) {
      if (en[0].isIntersecting && !done) {
        done = true; var t0 = performance.now();
        (function step(t) { var p = Math.min((t - t0) / 1400, 1); cnt.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + '+'; if (p < 1) requestAnimationFrame(step); })(t0);
        ob.disconnect();
      }
    }, { threshold: 0.6 }).observe(cnt);
  }

  /* lightbox */
  var lb = $('.lb'), lbi = lb && $('img', lb);
  $$('.gal figure').forEach(function (f) {
    f.addEventListener('click', function () { var i = $('img', f); lbi.src = i.currentSrc || i.src; lbi.alt = i.alt; lb.classList.add('on'); });
  });
  if (lb) { lb.addEventListener('click', function () { lb.classList.remove('on'); }); document.addEventListener('keydown', function (e) { if (e.key === 'Escape') lb.classList.remove('on'); }); }

  /* máscara de telefone */
  var tel = $('#f-tel');
  if (tel) tel.addEventListener('input', function () {
    var d = tel.value.replace(/\D/g, '').slice(0, 11), o = d;
    if (d.length > 2) o = '(' + d.slice(0, 2) + ') ' + d.slice(2);
    if (d.length > 7) o = '(' + d.slice(0, 2) + ') ' + d.slice(2, d.length - 4) + '-' + d.slice(-4);
    tel.value = o;
  });

  /* formulário */
  var form = $('#lead-form');
  if (form) {
    var btn = $('button[type=submit]', form), started = false;
    function valid() {
      var ok = form.checkValidity();
      var t = (tel.value || '').replace(/\D/g, ''); if (t.length < 10) ok = false;
      btn.disabled = !ok;
    }
    btn.disabled = true;
    form.addEventListener('input', function () { if (!started) { started = true; window.qh4Track('form_start'); } valid(); });
    form.addEventListener('change', valid);
    form.addEventListener('submit', function (e) {
      e.preventDefault(); valid(); if (btn.disabled) return;
      var f = new FormData(form), d = {};
      f.forEach(function (v, k) { d[k] = String(v).trim(); });
      window.qh4Track('generate_lead', { lead_interesse: d.interesse, lead_fase: d.fase });
      btn.disabled = true; btn.textContent = 'Enviando...';
      if (C.webhook) {
        var body = new URLSearchParams(d); body.append('origem', location.href);
        fetch(C.webhook, { method: 'POST', mode: 'no-cors', body: body }).catch(function () {}).then(function () { location.href = 'obrigado.html'; });
        setTimeout(function () { location.href = 'obrigado.html'; }, 4000);
      } else {
        var m = 'Olá! Vim pelo site da Marcheli e preenchi o formulário.\n\n' +
          '*Nome:* ' + d.nome + '\n*WhatsApp:* ' + d.telefone + '\n*Cidade:* ' + d.cidade +
          '\n*Interesse:* ' + d.interesse + '\n*Momento da obra:* ' + d.fase + '\n*Tem arquiteto ou designer:* ' + d.arquiteto +
          (d.mensagem ? '\n*Mensagem:* ' + d.mensagem : '');
        setTimeout(function () { location.href = window.qh4WaLink(m); }, 250);
      }
    });
  }

  /* página de obrigado */
  var ob = $('[data-obrigado]');
  if (ob) {
    window.qh4Track('thank_you_view');
    var link = window.qh4WaLink(C.waMensagemForm), a = $('#ob-wa'); if (a) a.href = link;
    setTimeout(function () { location.href = link; }, C.obrigadoDelay);
  }
})();
