(()=>{'use strict';
 const NS='http://www.w3.org/2000/svg',selector='#sidebar,.home-page .clock-widget,.home-page .quote-widget,.home-page .calendar-widget';
 const reduce=matchMedia('(prefers-reduced-motion:reduce)'),fine=matchMedia('(pointer:fine)');
 const states=new Map();let raf=0,lastTime=0,lastPointer=null,hoverButton=null;
 const enabled=()=>fine.matches&&!reduce.matches&&!document.documentElement.classList.contains('ambient-paused')&&!document.hidden;
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 function outline(w,h,x,y,flow,r){
  const l=5,t=5,R=w-5,B=h-5,rr=Math.min(r,(w-12)/3,(h-12)/3),ww=R-l-2*rr,hh=B-t-2*rr;
  const f=n=>n.toFixed(2);
  return `M${f(l+rr)},${t} C${f(l+rr+ww*.32)},${f(t+y*.78+flow*.2)} ${f(R-rr-ww*.32)},${f(t+y*.62-flow*.25)} ${f(R-rr)},${t} Q${f(R+x*.15)},${f(t+y*.15)} ${R},${f(t+rr)} C${f(R+x*.95-flow*.28)},${f(t+rr+hh*.28+y*.25)} ${f(R+x*.72+flow*.18)},${f(B-rr-hh*.28+y*.25)} ${R},${f(B-rr)} Q${f(R+x*.15)},${f(B+y*.15)} ${f(R-rr)},${B} C${f(R-rr-ww*.32)},${f(B+y*.82+flow*.2)} ${f(l+rr+ww*.32)},${f(B+y*.63-flow*.24)} ${f(l+rr)},${B} Q${f(l+x*.15)},${f(B+y*.15)} ${l},${f(B-rr)} C${f(l+x*.8+flow*.24)},${f(B-rr-hh*.28+y*.2)} ${f(l+x*.98-flow*.2)},${f(t+rr+hh*.28+y*.2)} ${l},${f(t+rr)} Q${f(l+x*.15)},${f(t+y*.15)} ${f(l+rr)},${t} Z`;
 }
 function render(s){const d=outline(s.w,s.h,s.x,s.y,s.flow,s.r);s.fill.style.clipPath=`path('${d}')`;s.paths.forEach(p=>p.setAttribute('d',d));s.skin.style.setProperty('--liquid-x',(42+s.x*4)+'%');s.skin.style.setProperty('--liquid-y',(24+s.y*5)+'%');s.skin.style.setProperty('--liquid-tail-x',(54-s.x*3)+'%');s.skin.style.setProperty('--liquid-tail-y',(70-s.y*3)+'%');s.skin.style.setProperty('--liquid-angle',(120+s.flow*5+s.x*3)+'deg');s.skin.style.setProperty('--liquid-fx',s.x*1.8+'px');s.skin.style.setProperty('--liquid-fy',s.y*1.5+'px');}
 function reset(){cancelAnimationFrame(raf);raf=0;lastTime=0;for(const s of states.values()){s.x=s.y=s.flow=s.vx=s.vy=s.vf=s.tx=s.ty=s.tf=0;render(s);}if(hoverButton)hoverButton.style.removeProperty('--liquid-button-radius');hoverButton=null;lastPointer=null;}
 function tick(time){raf=0;if(!enabled()){reset();return;}const dt=lastTime?clamp((time-lastTime)/16.667,.3,1.5):1;lastTime=time;let moving=false;
  for(const [el,s] of states){if(!el.isConnected){s.ro.disconnect();states.delete(el);continue;}
   for(const [p,v,t] of [['x','vx','tx'],['y','vy','ty'],['flow','vf','tf']]){s[v]+=((s[t]-s[p])*.083-s[v]*.23)*dt;s[p]+=s[v]*dt;s[p]=clamp(s[p],-3.9,3.9);if(Math.abs(s[t]-s[p])>.004||Math.abs(s[v])>.004)moving=true;else{s[p]=s[t];s[v]=0;}}
   s.tf*=Math.pow(.88,dt);render(s);
  }if(moving)raf=requestAnimationFrame(tick);else lastTime=0;
 }
 function start(){if(!raf&&enabled())raf=requestAnimationFrame(tick);}
 function add(el){if(states.has(el)||el.clientWidth<50)return;const rect=el.getBoundingClientRect(),paint=getComputedStyle(el).backgroundImage,color=getComputedStyle(el).backgroundColor;
  const skin=document.createElement('div');skin.className='liquid-surface';skin.setAttribute('aria-hidden','true');const fill=document.createElement('div');fill.className='liquid-fill';fill.style.setProperty('--liquid-paint',paint==='none'?color:paint);const svg=document.createElementNS(NS,'svg');svg.classList.add('liquid-edge');svg.setAttribute('aria-hidden','true');const paths=['inner','outer'].map(c=>{const p=document.createElementNS(NS,'path');p.setAttribute('class',c);svg.append(p);return p;});skin.append(fill,svg);el.prepend(skin);el.classList.add('liquid-ready');
  const s={el,skin,fill,svg,paths,w:rect.width,h:rect.height,r:el.id==='sidebar'?28:24,x:0,y:0,flow:0,vx:0,vy:0,vf:0,tx:0,ty:0,tf:0,rect};
  s.ro=new ResizeObserver(()=>{if(!el.isConnected)return;s.rect=el.getBoundingClientRect();s.w=s.rect.width;s.h=s.rect.height;svg.setAttribute('viewBox',`0 0 ${s.w} ${s.h}`);render(s);});s.ro.observe(el);svg.setAttribute('viewBox',`0 0 ${s.w} ${s.h}`);states.set(el,s);render(s);
 }
 function scan(){document.querySelectorAll(selector).forEach(add);for(const [el,s] of states){if(!el.isConnected){s.ro.disconnect();states.delete(el);}}}
 function move(e){if(!enabled())return;const t=performance.now(),speed=lastPointer?clamp((e.clientX-lastPointer.x)/Math.max(8,t-lastPointer.t)*.8,-1.8,1.8):0;lastPointer={x:e.clientX,t};
  for(const [el,s] of states){const r=el.getBoundingClientRect();const inside=e.clientX>=r.left-12&&e.clientX<=r.right+12&&e.clientY>=r.top-12&&e.clientY<=r.bottom+12;const nx=clamp((e.clientX-r.left)/r.width*2-1,-1,1),ny=clamp((e.clientY-r.top)/r.height*2-1,-1,1);const a=el.id==='sidebar'?2.8:3.6;s.tx=inside?nx*a:0;s.ty=inside?ny*a:0;s.tf=inside?speed:0;}
  const b=e.target.closest?.('#sidebar .nav-item');if(b!==hoverButton&&hoverButton)hoverButton.style.removeProperty('--liquid-button-radius');hoverButton=b;if(b){const r=b.getBoundingClientRect(),nx=clamp((e.clientX-r.left)/r.width,0,1);b.style.setProperty('--liquid-button-radius',`${11+nx*4}px ${15-nx*4}px ${12+nx*3}px ${15-nx*3}px / ${13+nx*2}px ${15-nx*2}px ${13+nx*2}px ${15-nx*2}px`);}start();
 }
 function leave(){for(const s of states.values())s.tx=s.ty=s.tf=0;if(hoverButton)hoverButton.style.removeProperty('--liquid-button-radius');hoverButton=null;lastPointer=null;start();}
 scan();const main=document.querySelector('#main');if(main)new MutationObserver(scan).observe(main,{childList:true});
 document.addEventListener('pointermove',move,{passive:true});document.documentElement.addEventListener('pointerleave',leave);window.addEventListener('blur',leave);document.addEventListener('visibilitychange',()=>{if(document.hidden)reset();});reduce.addEventListener('change',reset);fine.addEventListener('change',reset);new MutationObserver(()=>{if(!enabled())reset();}).observe(document.documentElement,{attributes:true,attributeFilter:['class']});
 document.addEventListener('pointerdown',e=>{if(!enabled())return;const b=e.target.closest?.('#sidebar .nav-item,.cal-buttons button,.cute-hug,.motion-toggle');if(b)b.animate([{scale:'1'},{scale:'.97',offset:.35},{scale:'1.012',offset:.75},{scale:'1'}],{duration:330});},{passive:true});
})();
