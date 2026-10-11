/* =========================================================
   CulturaZone — script.js
   ========================================================= */

/* ---------- Forms ----------
   Front-end only: shows the message in data-success, nothing is sent.
   To really receive messages, point the form's action to a backend
   or a service like Formspree and remove data-success. */
document.querySelectorAll('form[data-success]').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = form.querySelector('.form-status') || form.parentElement.querySelector('.form-status');
    if (status) status.textContent = form.dataset.success;
    form.reset();
  });
});

/* ---------- Gallery + lightbox ----------
   Loads 1.jpg … COUNT.jpg. Missing files are removed automatically. */
const grid = document.getElementById('gallery');

if (grid) {
  const COUNT = 49;
  const dlg = document.getElementById('lightbox');
  const big = dlg.querySelector('img');
  const caption = dlg.querySelector('figcaption');
  let current = null;

  const tiles = () => [...grid.querySelectorAll('.tile')];

  for (let i = 1; i <= COUNT; i++) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'tile';
    btn.setAttribute('aria-label', `Agrandir l’œuvre ${i}`);

    const img = new Image();
    img.src = `${i}.jpg`;
    img.alt = `Œuvre de Pablo Picasso n° ${i}`;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.addEventListener('error', () => btn.remove());

    btn.append(img);
    btn.addEventListener('click', () => { show(btn); dlg.showModal(); });
    grid.append(btn);
  }

  function show(tile) {
    const list = tiles();
    current = tile;
    const img = tile.querySelector('img');
    big.src = img.src;
    big.alt = img.alt;
    caption.textContent = `${list.indexOf(tile) + 1} / ${list.length}`;
  }

  function step(dir) {
    const list = tiles();
    const next = (list.indexOf(current) + dir + list.length) % list.length;
    show(list[next]);
  }

  dlg.querySelector('.lb-close').addEventListener('click', () => dlg.close());
  dlg.querySelector('.lb-prev').addEventListener('click', () => step(-1));
  dlg.querySelector('.lb-next').addEventListener('click', () => step(1));

  // Click outside the image / buttons closes the viewer
  dlg.addEventListener('click', (e) => {
    if (!e.target.closest('img, button')) dlg.close();
  });

  dlg.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
}
