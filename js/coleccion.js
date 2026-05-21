/* ============================================================
   MORISHITA MEAT — coleccion.js (catálogo)
   ============================================================ */

(() => {
  'use strict';

  const products = window.MORISHITA_PRODUCTS || [];
  const grid     = document.getElementById('productGrid');
  const search   = document.getElementById('searchInput');
  const filters  = document.getElementById('filters');
  const toggle   = document.getElementById('filterToggle');
  if (!grid) return;

  let activeFilter = 'todos';
  let query = '';

  const mediaHTML = (p) =>
    p.image
      ? `<img src="${p.image}" alt="${p.nombre}" loading="lazy" />`
      : `<div class="media-meat"></div>`;

  const desde = (p) => Math.min(...p.pesos.map(w => w.precio));

  const cardHTML = (p) => `
    <article class="product-card reveal">
      <a href="producto.html?id=${p.id}" class="product-card__media" aria-label="${p.nombre}">
        ${p.badge ? `<span class="product-card__badge">${p.badge}</span>` : ''}
        ${mediaHTML(p)}
      </a>
      <div class="product-card__body">
        <a href="producto.html?id=${p.id}"><h3 class="product-card__title">${p.nombre}</h3></a>
        <div class="product-card__meta"><span>${p.pesos[0].label}</span><span>BMS ${p.bms}</span></div>
        <div class="product-card__foot">
          <span class="product-card__price">${window.MM.formatPrice(desde(p))} <small>desde</small></span>
          <button class="add-btn" data-add="${p.id}" aria-label="Añadir ${p.nombre} al carrito">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
          </button>
        </div>
      </div>
    </article>`;

  const render = () => {
    const list = products.filter(p => {
      const matchFilter = activeFilter === 'todos' || p.categoria === activeFilter;
      const q = query.toLowerCase();
      const matchQuery = !q ||
        p.nombre.toLowerCase().includes(q) ||
        p.origen.toLowerCase().includes(q) ||
        p.categoria.toLowerCase().includes(q);
      return matchFilter && matchQuery;
    });

    grid.innerHTML = list.length
      ? list.map(cardHTML).join('')
      : `<p class="catalog__empty">No encontramos cortes con esos criterios.</p>`;

    // reveal inmediato para tarjetas nuevas
    grid.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));

    grid.querySelectorAll('[data-add]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const p = products.find(x => x.id === btn.dataset.add);
        if (p) window.MM.addToCart({ id: p.id, nombre: p.nombre, peso: p.pesos[0].label, precio: p.pesos[0].precio });
      });
    });
  };

  search?.addEventListener('input', (e) => { query = e.target.value; render(); });

  toggle?.addEventListener('click', () => filters?.classList.toggle('is-open'));

  filters?.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      filters.querySelectorAll('.chip').forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      activeFilter = chip.dataset.filter;
      render();
    });
  });

  render();
})();
