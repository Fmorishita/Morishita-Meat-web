/* ============================================================
   MORISHITA MEAT — producto.js (detalle)
   Lee ?id= de la URL y renderiza el producto.
   ============================================================ */

(() => {
  'use strict';

  const products = window.MORISHITA_PRODUCTS || [];
  const root = document.getElementById('pd');
  if (!root) return;

  const id = new URLSearchParams(location.search).get('id');
  const p = products.find(x => x.id === id) || products[0];

  if (!p) {
    root.innerHTML = `<p class="catalog__empty">Producto no encontrado. <a href="coleccion.html" style="color:var(--gold)">Ver colección →</a></p>`;
    return;
  }

  document.title = `${p.nombre} — Morishita Meat`;
  const crumb = document.getElementById('crumbName');
  if (crumb) crumb.textContent = p.nombre;

  let pesoIdx = 0;

  const mediaSlide = () =>
    p.image
      ? `<img src="${p.image}" alt="${p.nombre}" />`
      : `<div class="media-meat"></div>`;

  root.innerHTML = `
    <div class="gallery reveal">
      <div class="gallery__main">${mediaSlide()}</div>
      <div class="gallery__dots">
        ${[0,1,2,3].map((i) => `<button class="gallery__dot ${i===0?'is-active':''}" data-dot="${i}" aria-label="Imagen ${i+1}"></button>`).join('')}
      </div>
    </div>

    <div class="pd__info reveal">
      <h1 class="pd__title">${p.nombre}</h1>
      <p class="pd__origin">${p.origen}</p>

      <p class="pd__label">Peso</p>
      <div class="opt-group" id="pesoGroup">
        ${p.pesos.map((w, i) => `<button class="opt ${i===0?'is-active':''}" data-peso="${i}">${w.label}</button>`).join('')}
      </div>

      <p class="pd__price" id="pdPrice">${window.MM.formatPrice(p.pesos[0].precio)}</p>

      <button class="btn btn--gold btn--full btn--lg" id="addBtn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px"><path d="M6 6h15l-1.5 9h-12z"/><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M6 6 5 2H2"/></svg>
        Añadir al carrito
      </button>

      <div class="pd__divider"></div>

      <p class="pd__label">Ficha del producto</p>
      <div class="specs">
        <div>
          <div class="spec__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 12h4l2-6 4 12 2-6h6"/></svg></div>
          <div class="spec__label">Marmoleo BMS</div>
          <div class="spec__value">${p.bms}</div>
        </div>
        <div>
          <div class="spec__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg></div>
          <div class="spec__label">Origen</div>
          <div class="spec__value">${p.origen.split('·')[0].trim()}</div>
        </div>
        <div>
          <div class="spec__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="9" r="6"/><path d="M9 14l-2 7 5-3 5 3-2-7"/></svg></div>
          <div class="spec__label">Certificación</div>
          <div class="spec__value">${p.cert}</div>
        </div>
      </div>

      <div class="pd__divider"></div>

      <div class="accordion" id="guiaAcc">
        <button class="accordion__head" aria-expanded="false">
          Guía de cocción del chef
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
        </button>
        <div class="accordion__body"><div class="accordion__inner">${p.desc}<br><br>${p.guia}</div></div>
      </div>
    </div>`;

  // reveal
  root.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));

  // Selector de peso
  const priceEl = document.getElementById('pdPrice');
  root.querySelectorAll('[data-peso]').forEach(btn => {
    btn.addEventListener('click', () => {
      root.querySelectorAll('[data-peso]').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      pesoIdx = Number(btn.dataset.peso);
      priceEl.textContent = window.MM.formatPrice(p.pesos[pesoIdx].precio);
    });
  });

  // Galería (dots) — placeholder hasta tener varias fotos
  root.querySelectorAll('[data-dot]').forEach(dot => {
    dot.addEventListener('click', () => {
      root.querySelectorAll('[data-dot]').forEach(d => d.classList.remove('is-active'));
      dot.classList.add('is-active');
    });
  });

  // Acordeón
  const acc = document.getElementById('guiaAcc');
  acc?.querySelector('.accordion__head')?.addEventListener('click', (e) => {
    const open = acc.classList.toggle('is-open');
    e.currentTarget.setAttribute('aria-expanded', String(open));
  });

  // Añadir al carrito
  document.getElementById('addBtn')?.addEventListener('click', () => {
    const w = p.pesos[pesoIdx];
    window.MM.addToCart({ id: p.id, nombre: p.nombre, peso: w.label, precio: w.precio });
  });
})();
