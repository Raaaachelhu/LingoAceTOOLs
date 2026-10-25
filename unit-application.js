(()=>{
'use strict';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const data=()=>window.UNIT_APPLICATION_DATA?.units||[];
const example=e=>`<div class="ua-sentence"><p class="ua-en">${esc(e.en)}</p><p class="ua-zh">${esc(e.zh)}</p></div>`;
function render(unit){
 const u=typeof unit==='string'?data().find(x=>x.id===unit):data().find(x=>x.id===unit?.id);
 if(!u)return '<div class="ua-empty">未找到本单元应用内容。</div>';
 const senses=u.senses.map((s,i)=>`<article class="ua-card"><div class="ua-card-top"><span class="ua-number">${String(i+1).padStart(2,'0')}</span><div><div class="ua-eyebrow">ONE WORD · DIFFERENT CONTEXTS</div><div class="ua-word">${esc(s.word)}</div></div></div><div class="ua-senses">${s.meanings.map(m=>`<section class="ua-meaning"><span class="ua-icon" aria-hidden="true">${esc(m.icon)}</span><h4>${esc(m.meaning)}</h4><p class="ua-muted">场景：${esc(m.scene)}</p><p class="ua-en">${esc(m.en)}</p><p class="ua-zh">${esc(m.zh)}</p></section>`).join('')}</div><div class="ua-check"><b>换个情境，你能判断是哪一个意思吗？</b><p>遮住中文，读两句英文，分别指出句中的“${esc(s.word)}”是什么意思，再任选一个场景换词说一句。</p></div></article>`).join('');
 const grammar=u.grammar.map((g,i)=>`<article class="ua-card"><div class="ua-card-top"><span class="ua-number">${String(i+1).padStart(2,'0')}</span><div><div class="ua-eyebrow">USE IT IN A REAL SITUATION</div><h3>${esc(g.title)}</h3></div></div><div class="ua-scene"><b>什么时候用？</b> ${esc(g.scene)}</div><p class="ua-rule">${esc(g.rule)}</p>${g.examples.map(example).join('')}<div class="ua-practice"><section class="ua-box"><h4>轮到孩子说</h4><p>${esc(g.task)}</p><div class="ua-answer"><b>参考表达 · 合理的其他表达也可以</b><p>${esc(g.answer)}</p></div></section><section class="ua-box rose"><h4>避开一个常见错误</h4><p class="ua-error">${esc(g.incorrect)}</p><p class="ua-correct">✓ ${esc(g.correct)}</p><p class="ua-why">${esc(g.reason)}</p></section></div></article>`).join('');
 return `<div class="ua" data-ua-unit="${esc(u.id)}"><section class="ua-intro"><div class="ua-kicker">LINGOACE · UNIT APPLICATION</div><h2>${esc(u.title)}</h2><p>把词放进不同情境，把语法用在完整句子里。</p><div class="ua-badges"><span class="ua-badge">${esc(u.material)} · Level ${esc(u.level)}</span><span class="ua-badge">${u.grammar.length} 组语法应用</span><span class="ua-badge">${u.senses.length} 个词义拓展</span><span class="ua-badge">${esc(u.kind)}</span></div><p class="ua-muted">${esc(u.note)}</p><div class="ua-toolbar ua-no-print"><button class="ua-tool primary" type="button" data-ua-image="${esc(u.id)}">一键下载4K长图</button><button class="ua-tool" type="button" data-ua-print>打印 / 存为 PDF</button><button class="ua-tool" type="button" data-ua-download="${esc(u.id)}">下载本单元学习页</button></div><div class="ua-status" role="status" aria-live="polite"></div></section><div class="ua-section"><h3>01 · 一词多义，句子里的意思</h3><small>常用义项与搭配分别标注</small></div>${senses||'<div class="ua-empty">本单元优先巩固基础词义，不强行添加不常用的义项。可以直接使用下方语法场景练习。</div>'}<div class="ua-section"><h3>02 · 本单元语法，开口就能用</h3><small>读例句 → 换情境 → 自己说</small></div>${grammar}<section class="ua-check"><h4>一次 5–8 分钟的家庭练习</h4><p>① 看中文情境，孩子读一组英文例句，说出它在这里表达的意思。<br>② 做“轮到孩子说”的替换任务，参考表达用于核对意思和结构。<br>③ 联系自己的生活再说一句。能够表达意思后，再纠正本组提示的一个结构点。</p><p class="ua-muted">可以先遮住参考表达，让孩子自己组织句子，再核对词义和语法。每次选择一组练习即可。</p></section><div class="ua-source"><b>内容依据</b><p>${esc(u.note)}</p>${u.lessons.length?`<p>本包对应课次：${u.lessons.map(esc).join('；')}。</p>`:''}<p>场景图标用于快速定位，不替代教材插画；词义拓展中包含不同词性、常见引申义及已明确标注的搭配。例句是新编教学示例，不是教材原文引用。</p></div><div class="ua-footer">From Rachel Hu</div></div>`;
}
const status=(el,msg)=>{const root=el.closest('.ua');const target=root?.querySelector('.ua-status');if(target)target.textContent=msg;};
document.addEventListener('click',async e=>{
 const btn=e.target.closest('[data-ua-image],[data-ua-print],[data-ua-download]');if(!btn)return;
 if(btn.hasAttribute('data-ua-image')){
  const u=data().find(x=>x.id===btn.dataset.uaImage);if(!u)return;
  const label=btn.textContent;btn.disabled=true;btn.textContent='正在生成长图…';status(btn,'正在排版全部内容，请稍候。');
  try{
   const result=await window.UnitApplicationExport.exportUnit(u);
   const url=URL.createObjectURL(result.blob);const a=document.createElement('a');a.href=url;a.download=result.filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);
   status(btn,`已生成 ${result.width} × ${result.height} 超清PNG长图，可直接发给家长。`);
  }catch(err){status(btn,'长图暂未生成，请重试。'+(err?.message||''));}
  finally{btn.disabled=false;btn.textContent=label;}
 }
 if(btn.hasAttribute('data-ua-print'))window.print();
 if(btn.hasAttribute('data-ua-download')){
  const u=data().find(x=>x.id===btn.dataset.uaDownload);if(!u)return;
  try{
   const css=window.UNIT_APPLICATION_CSS||await fetch('unit-application.css?v=20261025-text-only').then(r=>{if(!r.ok)throw Error('css');return r.text()});
   const html='<!doctype html><html lang="zh-CN"><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(u.title)+' · 词义与语法应用</title><style>'+css+'</style><body class="ua-page"><main class="ua-standalone">'+render(u.id).replace(/<div class="ua-toolbar ua-no-print">[\s\S]*?<\/div>/,'<div class="ua-toolbar ua-no-print"><button class="ua-tool" onclick="window.print()">打印 / 存为 PDF</button></div>')+'</main></bo'+'dy></html>';
   const url=URL.createObjectURL(new Blob([html],{type:'text/html;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=u.id+'-application.html';a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);status(btn,'已生成本单元离线学习页，文件中已包含全部例句和参考表达。');
  }catch{status(btn,'学习页暂未生成，请使用打印 / 存为 PDF。');}
 }
});
window.UnitApplication={render};
})();
