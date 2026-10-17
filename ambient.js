/* A quiet pointer-reactive particle field. It never intercepts page interactions. */
(()=>{
 'use strict';
 const canvas=document.querySelector('#ambient-field'),toggle=document.querySelector('#motion-toggle');
 if(!canvas||!canvas.getContext)return;
 const ctx=canvas.getContext('2d');if(!ctx)return;
 const media=window.matchMedia('(prefers-reduced-motion: reduce)');
 let enabled=!media.matches,explicit=false,w=0,h=0,dpr=1,points=[],sparks=[],raf=0,last=0,pointer={x:-9999,y:-9999};
 try{const saved=localStorage.getItem('rachel-studio-motion');if(saved!==null&&!media.matches){enabled=saved==='on';explicit=true}}catch{}
 function sync(){document.documentElement.classList.toggle('ambient-paused',!enabled);if(toggle){toggle.setAttribute('aria-pressed',String(enabled));toggle.innerHTML=`<span>✧</span> ${enabled?'动态已开启':'静态模式'}`;toggle.title=enabled?'暂停渐变与粒子动画':'开启渐变与粒子动画'}}
 function resize(){w=window.innerWidth;h=window.innerHeight;dpr=Math.min(window.devicePixelRatio||1,1.5);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0);points=Array.from({length:Math.min(90,Math.max(28,Math.floor(w*h/18000)))},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.23,vy:(Math.random()-.5)*.23,r:.65+Math.random()*1.15,a:.1+Math.random()*.22}));draw(false)}
 function draw(move){ctx.clearRect(0,0,w,h);for(const p of points){if(move){const dx=p.x-pointer.x,dy=p.y-pointer.y,dist=Math.hypot(dx,dy);if(dist>1&&dist<130){p.x+=dx/dist*(1-dist/130)*1.6;p.y+=dy/dist*(1-dist/130)*1.6}p.x+=p.vx;p.y+=p.vy;if(p.x<-10)p.x=w+10;if(p.x>w+10)p.x=-10;if(p.y<-10)p.y=h+10;if(p.y>h+10)p.y=-10;if(dist<145){ctx.strokeStyle=`rgba(158,141,199,${(1-dist/145)*.12})`;ctx.lineWidth=.65;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(pointer.x,pointer.y);ctx.stroke()}}ctx.fillStyle=`rgba(151,134,189,${p.a})`;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()}if(move){sparks=sparks.filter(s=>s.life>0);for(const s of sparks){s.x+=s.vx;s.y+=s.vy;s.vx*=.98;s.vy*=.98;s.life-=.025;ctx.fillStyle=`rgba(171,147,204,${Math.max(0,s.life)*.45})`;ctx.beginPath();ctx.arc(s.x,s.y,1.2,0,Math.PI*2);ctx.fill()}}}
 function tick(t){if(!enabled||document.hidden){raf=0;return}if(t-last>32){draw(true);last=t}raf=requestAnimationFrame(tick)}
 function start(){if(enabled&&!raf&&!document.hidden)raf=requestAnimationFrame(tick)}
 window.addEventListener('resize',resize,{passive:true});window.addEventListener('pointermove',ev=>{if(ev.pointerType==='mouse')pointer={x:ev.clientX,y:ev.clientY}},{passive:true});document.addEventListener('pointerleave',()=>pointer={x:-9999,y:-9999});
 window.addEventListener('pointerdown',ev=>{if(!enabled)return;for(let i=0;i<12;i++){const angle=Math.PI*2*i/12;sparks.push({x:ev.clientX,y:ev.clientY,vx:Math.cos(angle)*(.6+Math.random()),vy:Math.sin(angle)*(.6+Math.random()),life:.7})}if(sparks.length>72)sparks=sparks.slice(-72)},{passive:true});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0}else start()});
 media.addEventListener('change',event=>{if(!explicit||event.matches){enabled=!event.matches;sync();if(!enabled){cancelAnimationFrame(raf);raf=0;draw(false)}else start()}});
 if(toggle)toggle.addEventListener('click',()=>{enabled=!enabled;explicit=true;try{localStorage.setItem('rachel-studio-motion',enabled?'on':'off')}catch{}sync();if(!enabled){cancelAnimationFrame(raf);raf=0;sparks=[];draw(false)}else start()});
 sync();resize();start();
})();
