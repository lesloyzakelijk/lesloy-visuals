document.addEventListener('DOMContentLoaded', () => {
  const header=document.querySelector('header');
  const menu=document.querySelector('.menu');
  const nav=document.querySelector('nav');
  const onScroll=()=>header?.classList.toggle('scrolled',window.scrollY>30);
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();
  if(menu&&nav){menu.addEventListener('click',()=>{const open=header.classList.toggle('nav-open');menu.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{header.classList.remove('nav-open');menu.classList.remove('open');menu.setAttribute('aria-expanded','false')}));}
  const path=location.pathname.split('/').pop()||'index.html';nav?.querySelectorAll('a').forEach(a=>{if(a.getAttribute('href')===path)a.classList.add('active')});
  const cursor=document.querySelector('.cursor'); if(cursor&&matchMedia('(pointer:fine)').matches){addEventListener('mousemove',e=>cursor.style.transform=`translate3d(${e.clientX}px,${e.clientY}px,0)`,{passive:true});document.querySelectorAll('a,button,.work-card,.service').forEach(el=>{el.addEventListener('mouseenter',()=>cursor.classList.add('hover'));el.addEventListener('mouseleave',()=>cursor.classList.remove('hover'));});}
  const reveal=()=>document.querySelectorAll('.reveal').forEach(el=>{const r=el.getBoundingClientRect();if(r.top<innerHeight*.88)el.classList.add('visible')});addEventListener('scroll',reveal,{passive:true});reveal();
  const lb=document.querySelector('.lightbox'); if(lb){const img=lb.querySelector('img'),meta=lb.querySelector('.lb-meta'),items=[...document.querySelectorAll('[data-lightbox]')];let i=0;const open=n=>{i=(n+items.length)%items.length;const item=items[i];img.src=item.dataset.lightbox;img.alt=item.dataset.title||'Lesloy Visuals';meta.textContent=`${String(i+1).padStart(2,'0')} / ${String(items.length).padStart(2,'0')} — ${item.dataset.title||'Selected work'}`;lb.classList.add('open');lb.setAttribute('aria-hidden','false');document.body.classList.add('modal-open')};const close=()=>{lb.classList.remove('open');lb.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open')};items.forEach((item,n)=>item.addEventListener('click',()=>open(n)));lb.querySelector('.lb-close')?.addEventListener('click',close);lb.querySelector('.lb-prev')?.addEventListener('click',()=>open(i-1));lb.querySelector('.lb-next')?.addEventListener('click',()=>open(i+1));lb.addEventListener('click',e=>{if(e.target===lb)close()});addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')open(i-1);if(e.key==='ArrowRight')open(i+1)});}
});
// V10 editorial reveal
document.addEventListener("DOMContentLoaded",()=>{const els=document.querySelectorAll(".reveal");if(!("IntersectionObserver" in window)){els.forEach(e=>e.classList.add("visible"));return}const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}}),{threshold:.12});els.forEach((e,i)=>{e.style.transitionDelay=Math.min(i*45,180)+"ms";io.observe(e)})});

// V11 floating header state
document.addEventListener("DOMContentLoaded",()=>{
  const header=document.querySelector("header");
  if(!header) return;
  const update=()=>header.classList.toggle("scrolled",window.scrollY>60);
  update();
  window.addEventListener("scroll",update,{passive:true});
});