/* La Magdalena · interacciones del sitio */
(function () {
  'use strict';
  var reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Menú móvil ---------- */
  var btnMenu = document.getElementById('btn-menu');
  var menu = document.getElementById('menu');
  function cerrarMenu() {
    if (!menu.classList.contains('abierto')) return;
    menu.classList.remove('abierto');
    document.body.classList.remove('menu-abierto');
    btnMenu.setAttribute('aria-expanded', 'false');
    btnMenu.setAttribute('aria-label', 'Abrir menú');
  }
  if (btnMenu && menu) {
    btnMenu.addEventListener('click', function () {
      var abrir = !menu.classList.contains('abierto');
      menu.classList.toggle('abierto', abrir);
      document.body.classList.toggle('menu-abierto', abrir);
      btnMenu.setAttribute('aria-expanded', abrir ? 'true' : 'false');
      btnMenu.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
    });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', cerrarMenu); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') cerrarMenu(); });
    window.addEventListener('resize', function () { if (window.innerWidth > 980) cerrarMenu(); });
  }

  /* ---------- Sombra del nav y sección activa ---------- */
  var nav = document.getElementById('nav');
  window.addEventListener('scroll', function () {
    nav.classList.toggle('con-sombra', window.scrollY > 8);
  }, { passive: true });

  var enlaces = Array.prototype.slice.call(document.querySelectorAll('.menu a[href^="#"]'));
  if ('IntersectionObserver' in window) {
    var obsNav = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (!en.isIntersecting) return;
        enlaces.forEach(function (a) {
          a.classList.toggle('activo', a.getAttribute('href') === '#' + en.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    enlaces.forEach(function (a) {
      var s = document.querySelector(a.getAttribute('href'));
      if (s) obsNav.observe(s);
    });
  }

  /* ---------- Aparición al hacer scroll ---------- */
  var revelar = document.querySelectorAll('.revelar');
  if (!reducir && 'IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('visible'); obs.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revelar.forEach(function (el) { obs.observe(el); });
  } else {
    revelar.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- Contador del hero ---------- */
  document.querySelectorAll('[data-contar]').forEach(function (el) {
    var fin = Number(el.getAttribute('data-contar'));
    if (reducir || !fin) return;
    var inicio = null;
    el.textContent = '0';
    function paso(t) {
      if (!inicio) inicio = t;
      var p = Math.min((t - inicio) / 1100, 1);
      el.textContent = Math.round(fin * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(paso);
    }
    setTimeout(function () { requestAnimationFrame(paso); }, 300);
  });

  /* ---------- Tarjeta de la promo 4 + 1 ---------- */
  var slots = Array.prototype.slice.call(document.querySelectorAll('.slot'));
  var msg = document.getElementById('msg-promo');
  var marcadas = 0;
  function pintar() {
    slots.forEach(function (s) {
      var on = Number(s.dataset.n) <= marcadas;
      s.classList.toggle('on', on);
      s.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    if (!msg) return;
    if (marcadas === 0) msg.textContent = 'Tocá las clases para ver cómo llegás a la de regalo.';
    else if (marcadas < 4) msg.textContent = 'Llevás ' + marcadas + ' de 4 clases. ¡Seguí así!';
    else if (marcadas === 4) msg.textContent = '¡Listo! La próxima va por nuestra cuenta.';
    else msg.textContent = '5ª clase gratis: seguís aprendiendo sin pagar.';
  }
  slots.forEach(function (s) {
    s.addEventListener('click', function () {
      var n = Number(s.dataset.n);
      marcadas = (marcadas === n) ? n - 1 : n;
      pintar();
    });
  });

  /* ---------- Carrusel de alumnos ---------- */
  var pista = document.getElementById('pista');
  var prev = document.getElementById('carr-prev');
  var next = document.getElementById('carr-next');
  var puntos = document.getElementById('puntos');
  if (pista) {
    var items = pista.children;
    for (var i = 0; i < items.length; i++) puntos.appendChild(document.createElement('span'));
    function paso() { return items[0].getBoundingClientRect().width + parseFloat(getComputedStyle(pista).columnGap || 20); }
    function estado() {
      var max = pista.scrollWidth - pista.clientWidth - 4;
      prev.disabled = pista.scrollLeft <= 4;
      next.disabled = pista.scrollLeft >= max;
      var idx = Math.round(pista.scrollLeft / paso());
      Array.prototype.forEach.call(puntos.children, function (p, k) { p.classList.toggle('on', k === idx); });
    }
    prev.addEventListener('click', function () { pista.scrollBy({ left: -paso(), behavior: reducir ? 'auto' : 'smooth' }); });
    next.addEventListener('click', function () { pista.scrollBy({ left: paso(), behavior: reducir ? 'auto' : 'smooth' }); });
    pista.addEventListener('scroll', function () { window.requestAnimationFrame(estado); }, { passive: true });
    pista.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); next.click(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev.click(); }
    });
    window.addEventListener('resize', estado);
    estado();
  }

  /* ---------- Visor del certificado ---------- */
  var abrir = document.getElementById('abrir-certificado');
  var visor = document.getElementById('visor-certificado');
  var cerrar = document.getElementById('cerrar-certificado');
  if (abrir && visor) {
    abrir.addEventListener('click', function () {
      if (typeof visor.showModal === 'function') visor.showModal();
      else window.open('assets/images/certificado-andipec.jpg', '_blank');
    });
    cerrar.addEventListener('click', function () { visor.close(); });
    visor.addEventListener('click', function (e) { if (e.target === visor) visor.close(); });
  }

  /* ---------- Año del pie ---------- */
  var anio = document.getElementById('anio');
  if (anio) anio.textContent = new Date().getFullYear();
})();
