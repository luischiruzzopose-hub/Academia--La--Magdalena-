/* Tarjeta de clases de la promo: pagás 4, la 5ª es gratis */
(function () {
  const slots = Array.from(document.querySelectorAll('.slot'));
  const msg = document.getElementById('msg-promo');
  if (!slots.length || !msg) return;
  let marcadas = 0;

  function pintar() {
    slots.forEach(function (s) {
      const n = Number(s.dataset.n);
      const on = n <= marcadas;
      s.classList.toggle('on', on);
      s.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    if (marcadas === 0) msg.textContent = 'Tocá las clases para marcarlas.';
    else if (marcadas < 4) msg.textContent = 'Llevás ' + marcadas + ' de 4 clases. Seguí así.';
    else if (marcadas === 4) msg.textContent = '¡Listo! La próxima va por nuestra cuenta.';
    else msg.textContent = '5ª clase gratis: seguís aprendiendo sin pagar.';
  }

  slots.forEach(function (s) {
    s.addEventListener('click', function () {
      const n = Number(s.dataset.n);
      marcadas = (marcadas === n) ? n - 1 : n;
      pintar();
    });
  });
  pintar();
})();
