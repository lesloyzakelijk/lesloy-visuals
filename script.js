document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');

  const onScroll = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open'); toggle.classList.remove('open');
    }));
  }

  // Custom cursor
  const cursor = document.querySelector('.cursor');
  if (cursor && window.matchMedia('(pointer:fine)').matches) {
    window.addEventListener('mousemove', e => {
      cursor.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
    }, {passive:true});
    document.querySelectorAll('a,button,.work-card,.service-card').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  // Work filters
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.work-card[data-category]');
  filterButtons.forEach(btn => btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    cards.forEach(card => card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.category !== filter));
  }));

  // Fullscreen lightbox
  const lb = document.querySelector('.lightbox');
  if (lb) {
    const lbImg = lb.querySelector('img');
    const lbMeta = lb.querySelector('.lb-meta');
    const items = [...document.querySelectorAll('.work-card[data-lightbox]')];
    let index = 0;

    const open = (i) => {
      index = (i + items.length) % items.length;
      const item = items[index];
      lbImg.src = item.dataset.lightbox;
      lbImg.alt = item.dataset.title || 'Lesloy Visuals';
      if (lbMeta) lbMeta.textContent = `${String(index+1).padStart(2,'0')} / ${String(items.length).padStart(2,'0')} — ${item.dataset.title || 'Selected work'}`;
      lb.classList.add('open');
      document.body.classList.add('modal-open');
    };
    const close = () => { lb.classList.remove('open'); document.body.classList.remove('modal-open'); };
    const step = dir => open(index + dir);

    items.forEach((item,i) => item.addEventListener('click', () => open(i)));
    lb.querySelector('.lb-close')?.addEventListener('click', close);
    lb.querySelector('.lb-prev')?.addEventListener('click', () => step(-1));
    lb.querySelector('.lb-next')?.addEventListener('click', () => step(1));
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    document.addEventListener('keydown', e => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    });
  }
});