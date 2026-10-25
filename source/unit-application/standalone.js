(()=>{
 const all=window.UNIT_APPLICATION_DATA.units;
 const select=document.getElementById('ua-unit');
 const search=document.getElementById('ua-search');
 const main=document.getElementById('ua-content');
 const total=document.getElementById('ua-total');
 const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function options(){
  const q=search.value.trim().toLowerCase();
  const visible=all.filter(u=>!q||(u.id+' '+u.material+' '+u.level+' '+u.title+' '+u.grammar.map(g=>g.title).join(' ')+' '+u.senses.map(s=>s.word).join(' ')).toLowerCase().includes(q));
  select.innerHTML=visible.map(u=>`<option value="${escape(u.id)}">${escape(u.material)} · L${escape(u.level)} · ${escape(u.title)}</option>`).join('');
  total.textContent=`${visible.length} / ${all.length} 个单元`;
  select.disabled=!visible.length;
  const requested=decodeURIComponent(location.hash.slice(1));
  const unit=visible.find(u=>u.id===requested)||visible[0];
  if(unit){select.value=unit.id;main.innerHTML=window.UnitApplication.render(unit.id);document.title=unit.title+' · 词义与语法应用';}
  else{main.innerHTML='<div class="ua-empty">没有匹配的单元。可以搜索教材名称、单元主题、词汇或语法。</div>';}
 }
 select.addEventListener('change',()=>{location.hash=select.value;window.scrollTo({top:0});});
 search.addEventListener('input',options);
 window.addEventListener('hashchange',options);
 options();
})();
