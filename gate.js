(function(){
  'use strict';
  const LAUNCH = new Date('2026-10-05T00:00:00+02:00').getTime();
  const CODE = 'LESLOY2026';
  const STORAGE_KEY = 'lesloy_preview_access';
  const hasAccess = () => localStorage.getItem(STORAGE_KEY) === '1';
  const urlCode = new URLSearchParams(window.location.search).get('preview');
  if (urlCode === CODE) localStorage.setItem(STORAGE_KEY,'1');
  if (Date.now() >= LAUNCH || hasAccess()) return;

  document.body.classList.add('gate-locked');
  const gate = document.createElement('div');
  gate.id = 'lesloy-gate';
  gate.innerHTML = `
    <div class="gate-wrap">
      <div class="gate-mark" aria-label="Lesloy Visuals">
        <div class="gate-lv">LV</div><div class="gate-divider"></div>
        <div class="gate-word"><strong>LESLOY</strong><span>VISUALS</span></div>
      </div>
      <div class="gate-kicker">A NEW WORLD IS LOADING</div>
      <h1 class="gate-title">BINNENKORT<span>..</span><br><em>ONLINE.</em></h1>
      <div class="gate-date">De nieuwe website opent op 5 oktober 2026</div>
      <div class="gate-countdown" aria-live="polite">
        <div class="gate-time"><b id="gd">00</b><span>DAGEN</span></div>
        <div class="gate-time"><b id="gh">00</b><span>UREN</span></div>
        <div class="gate-time"><b id="gm">00</b><span>MINUTEN</span></div>
        <div class="gate-time"><b id="gs">00</b><span>SECONDEN</span></div>
      </div>
      <form class="gate-preview" id="gate-form">
        <input id="gate-code" type="password" autocomplete="off" placeholder="PREVIEW CODE" aria-label="Preview code">
        <button type="submit">BEKIJK SITE</button>
      </form>
      <div class="gate-error" id="gate-error" aria-live="polite"></div>
      <div class="gate-note">Voor genodigden · preview access</div>
    </div>`;
  document.body.appendChild(gate);

  const $ = id => document.getElementById(id);
  function tick(){
    const diff = Math.max(0, LAUNCH - Date.now());
    const d = Math.floor(diff/86400000), h = Math.floor(diff%86400000/3600000), m = Math.floor(diff%3600000/60000), s = Math.floor(diff%60000/1000);
    $('gd').textContent=String(d).padStart(2,'0'); $('gh').textContent=String(h).padStart(2,'0'); $('gm').textContent=String(m).padStart(2,'0'); $('gs').textContent=String(s).padStart(2,'0');
    if(diff<=0) location.reload();
  }
  tick(); setInterval(tick,1000);
  $('gate-form').addEventListener('submit', function(e){
    e.preventDefault();
    if(($('gate-code').value||'').trim().toUpperCase()===CODE){
      localStorage.setItem(STORAGE_KEY,'1'); document.body.classList.remove('gate-locked'); gate.remove();
    } else { $('gate-error').textContent='Ongeldige preview code.'; }
  });
})();
