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
// V16: no decorative cursor/circle effect.
document.addEventListener("DOMContentLoaded",()=> {
  document.querySelectorAll(".circle,.dot,.orb").forEach(el=>el.remove());
});

// V19 — Lesloy Assistant
(function(){
  if(document.body && document.body.dataset.assistant === 'off') return;
  document.addEventListener('DOMContentLoaded',()=>{
    if(document.querySelector('.lv-assistant')) return;
    const root=document.createElement('div');
    root.className='lv-assistant';
    root.innerHTML=`<button class="lv-assistant-toggle" aria-label="Open Lesloy assistent" aria-expanded="false"><span>LV</span></button>
      <div class="lv-assistant-panel" role="dialog" aria-label="Lesloy assistent">
        <div class="lv-assistant-head"><div><strong>Lesloy Assistant</strong><br><small>Hulp nodig? Vraag het gerust.</small></div><button class="lv-assistant-close" aria-label="Sluiten">×</button></div>
        <div class="lv-assistant-messages"><div class="lv-msg bot">Hey! 👋 Waar kan ik je mee helpen?</div></div>
        <div class="lv-assistant-chips"><button class="lv-chip">Wat kost een shoot?</button><button class="lv-chip">Duo met Smit Works?</button><button class="lv-chip">Ik wil boeken</button></div>
        <form class="lv-assistant-form"><input maxlength="1200" placeholder="Typ je vraag…" aria-label="Je vraag"><button type="submit">STUUR</button></form>
      </div>`;
    document.body.appendChild(root);
    const toggle=root.querySelector('.lv-assistant-toggle'), close=root.querySelector('.lv-assistant-close'), form=root.querySelector('form'), input=root.querySelector('input'), messages=root.querySelector('.lv-assistant-messages');
    const open=()=>{root.classList.add('open');toggle.setAttribute('aria-expanded','true');setTimeout(()=>input.focus(),80)};
    const shut=()=>{root.classList.remove('open');toggle.setAttribute('aria-expanded','false')};
    toggle.addEventListener('click',()=>root.classList.contains('open')?shut():open()); close.addEventListener('click',shut);
    root.querySelectorAll('.lv-chip').forEach(c=>c.addEventListener('click',()=>{input.value=c.textContent;form.requestSubmit()}));
    const add=(text,kind)=>{const d=document.createElement('div');d.className='lv-msg '+kind;d.textContent=text;messages.appendChild(d);messages.scrollTop=messages.scrollHeight;return d};
    form.addEventListener('submit',async e=>{
      e.preventDefault(); const q=input.value.trim(); if(!q)return; add(q,'user'); input.value='';
      const wait=add('Even kijken…','bot');
      try{const r=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:q})});const data=await r.json();wait.remove();add(data.answer||data.error||'Ik kan je nu even niet helpen. Mail ons gerust.','bot');}
      catch(err){wait.remove();add('Er ging iets mis. Mail ons gerust via lesloyzakelijk@gmail.com.','bot');}
    });
  });
})();
