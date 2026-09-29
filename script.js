const cursor=document.querySelector('.cursor');
if(cursor){window.addEventListener('pointermove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'})}
document.querySelectorAll('a,.btn,.menu,.video-card,.release-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{if(cursor){cursor.style.width='32px';cursor.style.height='32px'}});
  el.addEventListener('mouseleave',()=>{if(cursor){cursor.style.width='16px';cursor.style.height='16px'}});
});
const menu=document.querySelector('.menu'), mobileNav=document.querySelector('.mobile-nav');
if(menu&&mobileNav){
 menu.addEventListener('click',()=>{const open=mobileNav.classList.toggle('open');menu.setAttribute('aria-expanded',open);mobileNav.setAttribute('aria-hidden',!open)});
 mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobileNav.classList.remove('open')));
}
const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');reveal.unobserve(e.target)}}),{threshold:.1});
document.querySelectorAll('.page-intro,.release-card,.video-card,.show-row,.shop-feature,.shop-side,.contact-box').forEach(e=>{e.classList.add('reveal');reveal.observe(e)});
const slides=document.querySelectorAll('.hero-slide'),dots=document.querySelectorAll('.slider-dots b');if(slides.length){let n=0;setInterval(()=>{slides[n].classList.remove('active');dots[n]?.classList.remove('on');n=(n+1)%slides.length;slides[n].classList.add('active');dots[n]?.classList.add('on')},5000)}