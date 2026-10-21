/* Front-end entrance password for a static site. This is not server-side authorization. */
(()=>{
 'use strict';
 const EXPECTED='b2ca9cd80c3b252cef89972cb2cae5fc26c9df1a82b34c18e0026b2ca9a411da';
 const src=document.currentScript?.src||new URL('auth.js',location.href).href;
 const scope=new URL('.',src).pathname;
 const key='lingoace-entry-v1:'+scope,ttl=12*60*60*1000;
 let unlocked=false;
 function parentGranted(){try{return window.top!==window&&window.top.__LINGOACE_ENTRY__?.scope===scope&&window.top.__LINGOACE_ENTRY__.expires>Date.now()}catch{return false}}
 function valid(){if(parentGranted())return true;try{const v=JSON.parse(sessionStorage.getItem(key)||'null');return v?.version===1&&Number.isFinite(v.expires)&&v.expires>Date.now()}catch{return false}}
 function sha256(text){
  const bytes=new TextEncoder().encode(text),len=bytes.length,padded=((len+9+63)>>6)<<6;
  const data=new Uint8Array(padded);data.set(bytes);data[len]=128;
  const view=new DataView(data.buffer);view.setUint32(padded-4,len*8,false);view.setUint32(padded-8,Math.floor(len/0x20000000),false);
  const k=[0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
  const h=[0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19],w=new Uint32Array(64),rotr=(x,n)=>(x>>>n)|(x<<(32-n));
  for(let offset=0;offset<padded;offset+=64){
   for(let t=0;t<16;t++)w[t]=view.getUint32(offset+t*4,false);
   for(let t=16;t<64;t++){const x=w[t-15],y=w[t-2];w[t]=(w[t-16]+(rotr(x,7)^rotr(x,18)^(x>>>3))+w[t-7]+(rotr(y,17)^rotr(y,19)^(y>>>10)))>>>0}
   let [a,b,c,d,e,f,g,j]=h;
   for(let t=0;t<64;t++){const t1=(j+(rotr(e,6)^rotr(e,11)^rotr(e,25))+((e&f)^(~e&g))+k[t]+w[t])>>>0,t2=((rotr(a,2)^rotr(a,13)^rotr(a,22))+((a&b)^(a&c)^(b&c)))>>>0;j=g;g=f;f=e;e=(d+t1)>>>0;d=c;c=b;b=a;a=(t1+t2)>>>0}
   [a,b,c,d,e,f,g,j].forEach((v,i)=>h[i]=(h[i]+v)>>>0);
  }
  return h.map(x=>x.toString(16).padStart(8,'0')).join('');
 }
 function unlock(persist){unlocked=true;const expires=Date.now()+ttl;window.__LINGOACE_ENTRY__={scope,expires};if(persist)try{sessionStorage.setItem(key,JSON.stringify({version:1,expires}))}catch{}document.documentElement.classList.remove('auth-locked');document.getElementById('access-gate')?.remove()}
 function lock(){try{sessionStorage.removeItem(key)}catch{}window.__LINGOACE_ENTRY__=null;location.reload()}
 function show(){
  if(unlocked)return;
  const gate=document.createElement('div');gate.id='access-gate';gate.setAttribute('role','dialog');gate.setAttribute('aria-modal','true');gate.setAttribute('aria-labelledby','access-title');
  gate.innerHTML='<form class="access-panel" id="access-form"><div class="access-brand"><span class="access-logo">a</span>lingoace</div><div class="access-eyebrow">TEACHING & LEARNING STUDIO</div><h1 id="access-title">欢迎回到教学工作台。</h1><p class="access-description">每一份专业，都从用心准备开始。<br>请输入访问密码，开启今天的教学工作。</p><label class="access-label" for="access-password">访问密码</label><div class="access-input-wrap"><input id="access-password" type="password" autocomplete="current-password" placeholder="请输入访问密码" required><button class="access-reveal" id="access-reveal" type="button" aria-label="显示密码" aria-pressed="false">◉</button></div><button class="access-submit" type="submit">进入工作台 ↗</button><p class="access-error" id="access-error" role="alert" aria-live="polite"></p><div class="access-footer"><span>CONTENT & CARE</span><span>developer: Rachel Hu</span></div></form>';
  document.body.appendChild(gate);const input=document.getElementById('access-password');
  document.getElementById('access-form').addEventListener('submit',event=>{event.preventDefault();if(sha256(input.value)===EXPECTED){unlock(true)}else{document.getElementById('access-error').textContent='密码不正确，请重新输入。';input.value='';input.focus()}});
  document.getElementById('access-reveal').addEventListener('click',event=>{const visible=input.type==='password';input.type=visible?'text':'password';event.currentTarget.setAttribute('aria-pressed',String(visible));event.currentTarget.setAttribute('aria-label',visible?'隐藏密码':'显示密码');input.focus()});
  gate.addEventListener('keydown',event=>{if(event.key!=='Tab')return;const controls=[...gate.querySelectorAll('input,button')],first=controls[0],last=controls[controls.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}});
  input.focus();
 }
 if(valid())unlock(false);else document.documentElement.classList.add('auth-locked');
 function ready(){if(!unlocked)show();const header=document.querySelector('.header-actions');if(header){const btn=document.createElement('button');btn.type='button';btn.className='session-lock';btn.title='锁定工作台';btn.setAttribute('aria-label','锁定工作台');btn.textContent='⌑';btn.addEventListener('click',lock);header.prepend(btn)}}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});else ready();
})();
