document.documentElement.classList.add('js-motion');
document.addEventListener('DOMContentLoaded',()=>{
  const menu=document.querySelector('.menu-toggle');
  const nav=document.querySelector('.nav');
  if(menu&&nav){menu.addEventListener('click',()=>{nav.classList.toggle('open');menu.setAttribute('aria-expanded',nav.classList.contains('open')?'true':'false')})}

  const posterMenu=document.querySelector('.poster-menu');
  const posterMenuButtons=[document.querySelector('.menu-hotspot'),document.querySelector('.mobile-menu-button')].filter(Boolean);
  posterMenuButtons.forEach(button=>button.addEventListener('click',()=>{
    if(!posterMenu)return;
    const open=posterMenu.classList.toggle('open');
    posterMenuButtons.forEach(b=>b.setAttribute('aria-expanded',open?'true':'false'));
  }));
  document.addEventListener('click',event=>{
    if(!posterMenu||!posterMenu.classList.contains('open'))return;
    if(posterMenu.contains(event.target)||posterMenuButtons.some(b=>b.contains(event.target)))return;
    posterMenu.classList.remove('open');posterMenuButtons.forEach(b=>b.setAttribute('aria-expanded','false'));
  });

  const revealElements=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const obs=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('visible');obs.unobserve(entry.target)}
    }),{threshold:.12});
    revealElements.forEach(element=>obs.observe(element));
  }else{
    revealElements.forEach(element=>element.classList.add('visible'));
  }

  const glow=document.querySelector('.cursor-glow');
  if(glow&&matchMedia('(pointer:fine)').matches){window.addEventListener('pointermove',event=>{
    glow.style.left=event.clientX+'px';glow.style.top=event.clientY+'px';
  },{passive:true});}

  // Animated ambient particles over the approved hero artwork.
  const heroCanvas=document.querySelector('.hero-particles');
  if(heroCanvas&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    const ctx=heroCanvas.getContext('2d');
    if(ctx){
      let w=1,h=1,dpr=1,raf=0,heroVisible=true;
      const pointer={x:.5,y:.5};
      const particles=Array.from({length:matchMedia('(max-width: 700px)').matches?36:72},(_,i)=>({
        x:Math.random(),y:Math.random(),r:.45+Math.random()*1.65,
        speed:.00012+Math.random()*.00034,phase:Math.random()*Math.PI*2,
        hue:[43,195,285,320][i%4],alpha:.2+Math.random()*.55,
        drift:(Math.random()-.5)*.00022
      }));
      const resize=()=>{
        const rect=heroCanvas.getBoundingClientRect();
        w=Math.max(1,rect.width);h=Math.max(1,rect.height);dpr=Math.min(devicePixelRatio||1,1.5);
        heroCanvas.width=Math.round(w*dpr);heroCanvas.height=Math.round(h*dpr);
        ctx.setTransform(dpr,0,0,dpr,0,0);
      };
      resize();window.addEventListener('resize',resize,{passive:true});
      heroCanvas.parentElement.addEventListener('pointermove',e=>{
        const r=heroCanvas.parentElement.getBoundingClientRect();
        pointer.x=(e.clientX-r.left)/r.width;pointer.y=(e.clientY-r.top)/r.height;
      },{passive:true});
      const io=new IntersectionObserver(entries=>{
        heroVisible=entries[0].isIntersecting;
        if(heroVisible&&!raf)draw();
      },{threshold:0});io.observe(heroCanvas);
      document.addEventListener('visibilitychange',()=>{
        if(document.hidden){cancelAnimationFrame(raf);raf=0}else if(heroVisible&&!raf)draw();
      });
      let last=0;
      function draw(now=0){
        if(!heroVisible||document.hidden){raf=0;return}
        raf=requestAnimationFrame(draw);
        const dt=Math.min(40,now-last||16);last=now;
        ctx.clearRect(0,0,w,h);
        particles.forEach(p=>{
          p.y-=p.speed*dt;p.x+=p.drift*dt;
          if(p.y<-.025){p.y=1.025;p.x=Math.random()}
          if(p.x<-.02)p.x=1.02;if(p.x>1.02)p.x=-.02;
          const twinkle=.45+.55*Math.sin(now*.0013+p.phase);
          const x=p.x*w+(pointer.x-.5)*p.r*4;
          const y=p.y*h+(pointer.y-.5)*p.r*3;
          const radius=p.r*(.75+twinkle*.5);
          ctx.beginPath();ctx.arc(x,y,radius,0,Math.PI*2);
          ctx.fillStyle=`hsla(${p.hue},100%,83%,${p.alpha*twinkle})`;ctx.shadowBlur=radius*8;
          ctx.shadowColor=`hsla(${p.hue},100%,75%,.8)`;ctx.fill();ctx.shadowBlur=0;
        });
      }
      draw();
    }
  }

  // Subtle pointer parallax on the approved hero artwork. The composition itself stays intact.
  const poster=document.querySelector('.poster-stage');
  const posterImage=document.querySelector('.poster-image');
  if(poster&&posterImage&&matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    poster.addEventListener('pointermove',event=>{
      const rect=poster.getBoundingClientRect();
      const x=(event.clientX-rect.left)/rect.width-.5;
      const y=(event.clientY-rect.top)/rect.height-.5;
      posterImage.style.transform=`scale(1.025) translate3d(${x*-13}px,${y*-10}px,0)`;
    });
    poster.addEventListener('pointerleave',()=>{posterImage.style.transform='scale(1.008)'});
  }

  document.querySelectorAll('.gallery-grid img').forEach(img=>img.addEventListener('click',()=>{
    const box=document.querySelector('.lightbox');if(box){box.querySelector('img').src=img.src;box.classList.add('open')}
  }));
  const lightbox=document.querySelector('.lightbox');
  if(lightbox){lightbox.addEventListener('click',event=>{if(event.target===lightbox||event.target.tagName==='BUTTON')lightbox.classList.remove('open')})}

  const params=new URLSearchParams(location.search);
  if(params.get('service')){
    const select=document.querySelector('[name="type_shoot"]');
    if(select){const map={'portrait-mini':'Portret','portrait-standard':'Portret','portrait-premium':'Portret','automotive-basic':'Automotive','automotive-premium':'Automotive','extra-car':'Automotive','event-2h':'Event','event-4h':'Event','event-8h':'Event','custom':'Creatief / anders','wedding':'Bruiloft'};select.value=map[params.get('service')]||'';}
  }
  if(params.get('type')==='duo'){const select=document.querySelector('[name="type_shoot"]');if(select)select.value='Lesloy Visuals × Smit Works — duo'}
  if(params.get('sent')==='1'){const note=document.createElement('p');note.className='form-success';note.textContent='Bedankt! Je bericht is verzonden. Ik kom er zo snel mogelijk op terug.';const form=document.querySelector('form');if(form)form.before(note)}

  // Immersive Three.js environment: a ringed planet, floating sculptures and portals.
  // The approved homepage artwork remains untouched; this scene lives in the next world.
  const worldCanvas=document.getElementById('world-3d');
  if(worldCanvas&&window.THREE&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    try{
      const THREE=window.THREE;
      const scene=new THREE.Scene();
      const camera=new THREE.PerspectiveCamera(42,1,.1,100);
      camera.position.set(0,.1,9.2);
      const renderer=new THREE.WebGLRenderer({canvas:worldCanvas,alpha:true,antialias:true,powerPreference:'low-power'});
      renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6));
      renderer.setClearColor(0x000000,0);
      renderer.outputColorSpace=THREE.SRGBColorSpace;
      const ambient=new THREE.AmbientLight(0x9e9bff,1.6);scene.add(ambient);
      const key=new THREE.PointLight(0xff72ce,95,22);key.position.set(-3,3,5);scene.add(key);
      const goldLight=new THREE.PointLight(0xffc36a,75,20);goldLight.position.set(4,-2,3);scene.add(goldLight);
      const planetGroup=new THREE.Group();scene.add(planetGroup);
      const planet=new THREE.Mesh(new THREE.SphereGeometry(1.27,64,48),new THREE.MeshPhysicalMaterial({color:0x4657d7,metalness:.28,roughness:.34,clearcoat:.85,clearcoatRoughness:.2,emissive:0x17125b,emissiveIntensity:.45}));
      planetGroup.add(planet);
      const planetGlow=new THREE.Mesh(new THREE.SphereGeometry(1.31,48,32),new THREE.MeshBasicMaterial({color:0x8d7aff,transparent:true,opacity:.09,side:THREE.BackSide}));planetGroup.add(planetGlow);
      const ring=new THREE.Mesh(new THREE.TorusGeometry(1.9,.035,16,180),new THREE.MeshStandardMaterial({color:0xffdb68,metalness:.68,roughness:.22,emissive:0xffa73f,emissiveIntensity:.5}));ring.rotation.x=1.22;ring.rotation.y=-.18;planetGroup.add(ring);
      const ring2=new THREE.Mesh(new THREE.TorusGeometry(2.13,.012,8,180),new THREE.MeshBasicMaterial({color:0xff7fcf,transparent:true,opacity:.8}));ring2.rotation.copy(ring.rotation);planetGroup.add(ring2);
      const shapes=[];
      const palette=[0xff5dc8,0x8c6aff,0xffa15b,0x71a4ff,0xffdf64];
      for(let i=0;i<12;i++){
        const geometry=i%3===0?new THREE.TorusKnotGeometry(.26,.075,72,10,2,3):i%3===1?new THREE.IcosahedronGeometry(.28,1):new THREE.OctahedronGeometry(.3,1);
        const material=new THREE.MeshPhysicalMaterial({color:palette[i%palette.length],metalness:.42,roughness:.24,clearcoat:1,clearcoatRoughness:.16,emissive:palette[i%palette.length],emissiveIntensity:.1});
        const mesh=new THREE.Mesh(geometry,material);
        const angle=i/12*Math.PI*2;const radius=2.9+(i%3)*.42;
        mesh.position.set(Math.cos(angle)*radius,Math.sin(angle*1.5)*1.35,Math.sin(angle)*1.25);
        const s=.55+(i%4)*.18;mesh.scale.setScalar(s);mesh.userData={seed:i,baseY:mesh.position.y};
        scene.add(mesh);shapes.push(mesh);
      }
      // Two elliptical portal loops in the far field.
      for(let i=0;i<3;i++){
        const portal=new THREE.Mesh(new THREE.TorusGeometry(1.15+i*.22,.018,10,120),new THREE.MeshBasicMaterial({color:palette[i],transparent:true,opacity:.56}));
        portal.position.set((i-1)*2.5,.1,-2.2-i*.35);portal.rotation.set(.3+i*.2,.5+i*.35,.25);portal.scale.y=1.45;portal.userData={baseY:portal.position.y,seed:i+12};scene.add(portal);shapes.push(portal);
      }
      const count=480;const positions=new Float32Array(count*3);const colors=new Float32Array(count*3);
      const cA=new THREE.Color(0xff9ddf),cB=new THREE.Color(0x8b9fff),cC=new THREE.Color(0xffda75);
      for(let i=0;i<count;i++){
        positions[i*3]=(Math.random()-.5)*15;positions[i*3+1]=(Math.random()-.5)*8;positions[i*3+2]=(Math.random()-.5)*8-1;
        const c=[cA,cB,cC][i%3];colors[i*3]=c.r;colors[i*3+1]=c.g;colors[i*3+2]=c.b;
      }
      const particlesGeometry=new THREE.BufferGeometry();particlesGeometry.setAttribute('position',new THREE.BufferAttribute(positions,3));particlesGeometry.setAttribute('color',new THREE.BufferAttribute(colors,3));
      const particles=new THREE.Points(particlesGeometry,new THREE.PointsMaterial({size:.035,vertexColors:true,transparent:true,opacity:.78,sizeAttenuation:true}));scene.add(particles);
      let width=1,height=1,raf=0,visible=true,mouseX=0,mouseY=0;
      const resize=()=>{const rect=worldCanvas.parentElement.getBoundingClientRect();width=Math.max(1,rect.width);height=Math.max(1,rect.height);renderer.setSize(width,height,false);camera.aspect=width/height;camera.position.z=width<600?11:9.2;camera.updateProjectionMatrix()};
      resize();window.addEventListener('resize',resize,{passive:true});
      window.addEventListener('pointermove',e=>{mouseX=(e.clientX/window.innerWidth-.5)*.6;mouseY=(e.clientY/window.innerHeight-.5)*.32},{passive:true});
      const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible&&!raf)animate()},{threshold:.02});observer.observe(worldCanvas);
      const clock=new THREE.Clock();
      function animate(){if(!visible){raf=0;return}raf=requestAnimationFrame(animate);const t=clock.getElapsedTime();planetGroup.rotation.y=t*.12;planetGroup.rotation.x=Math.sin(t*.16)*.08;planetGroup.position.y=Math.sin(t*.55)*.12;shapes.forEach(m=>{m.rotation.x+=.0018*(1+(m.userData.seed||1)%3);m.rotation.y+=.0024;m.position.y=(m.userData.baseY||m.position.y)+Math.sin(t*.8+(m.userData.seed||0))*0.1});particles.rotation.y=t*.012;camera.position.x+=(mouseX-camera.position.x)*.018;camera.position.y+=(-mouseY-camera.position.y)*.018;camera.lookAt(0,0,0);renderer.render(scene,camera)}
      animate();
    }catch(error){console.warn('3D scene fallback active:',error)}
  }

  // Gentle depth tilt on portfolio tiles; disabled on touch screens and reduced-motion setups.
  if(matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.querySelectorAll('.universe-photo,.work-card,.info-card,.price-card').forEach(card=>{
      card.addEventListener('pointermove',event=>{const r=card.getBoundingClientRect();const x=(event.clientX-r.left)/r.width-.5;const y=(event.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateX(${y*-3}deg) rotateY(${x*3}deg) translateY(-4px)`});
      card.addEventListener('pointerleave',()=>{card.style.transform=''});
    });
  }

});
