(()=>{
'use strict';
const WIDTH=1080,SCALE=2,MARGIN=60,INNER=960;
const FONT='"PingFang SC","Microsoft YaHei","Noto Sans CJK SC",sans-serif';
const C={ink:'#342d47',muted:'#746b80',purple:'#8060a5',line:'#e5dcee',paper:'#f6f2fa',white:'#ffffff',mint:'#eef8f4',rose:'#fff2f0',lavender:'#f6f0fc'};
function painter(ctx,draw){
 function font(size,weight=400){ctx.font=`${weight} ${size}px ${FONT}`;ctx.textBaseline='top';}
 function lines(text,width,size,weight=400){
  font(size,weight);const result=[];
  for(const paragraph of String(text??'').split('\n')){
   let line='';const tokens=paragraph.match(/[A-Za-z0-9]+(?:['’.-][A-Za-z0-9]+)*\s*|\s+|./gu)||[''];
   for(const token of tokens){
    if(line&&ctx.measureText(line+token).width>width){result.push(line.trimEnd());line='';}
    if(ctx.measureText(token).width>width){for(const char of token){if(line&&ctx.measureText(line+char).width>width){result.push(line.trimEnd());line='';}line+=char;}}
    else line+=token;
   }
   result.push(line.trimEnd());
  }
  return result;
 }
 function text(value,x,y,width,size=20,color=C.ink,weight=400,leading=1.5){
  const ls=lines(value,width,size,weight),step=size*leading;
  if(draw){font(size,weight);ctx.fillStyle=color;ls.forEach((line,i)=>ctx.fillText(line,x,y+i*step));}
  return y+ls.length*step;
 }
 function box(x,y,w,h,fill=C.white,r=22){if(!draw)return;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fillStyle=fill;ctx.fill();ctx.lineWidth=1;ctx.strokeStyle=C.line;ctx.stroke();}
 function section(label,y){return text(label,MARGIN,y,INNER,26,C.purple,700)+20;}
 function column(title,body,x,y,w,fill){
  let end=y+22;end=text(title,x+24,end,w-48,17,C.purple,700)+10;
  for(const item of body)end=text(item.text,x+24,end,w-48,item.size||19,item.color||C.ink,item.weight||400)+10;
  const bottom=end+12;box(x,y,w,bottom-y,fill,17);
  if(draw){let yy=y+22;yy=text(title,x+24,yy,w-48,17,C.purple,700)+10;for(const item of body)yy=text(item.text,x+24,yy,w-48,item.size||19,item.color||C.ink,item.weight||400)+10;}
  return bottom;
 }
 // Measurement and painting use the same wrapping and coordinates.
 function layout(u){
  let y=55;y=text('lingoace',MARGIN,y,INNER,36,C.purple,700)+10;
  y=text(`${u.material}  ·  Level ${u.level}  ·  Unit ${u.no}`,MARGIN,y,INNER,18,C.muted)+28;
  y=text(u.title.replace(/^Unit\s*\d+\s*[·.:-]\s*/,''),MARGIN,y,INNER,43,C.ink,700,1.25)+18;
  y=text('一词多义 × 单元语法应用',MARGIN,y,INNER,25,C.purple,700)+10;
  y=text('看懂情境，读懂句意，再换成自己的生活说一说。',MARGIN,y,INNER,20,C.muted)+22;
  if(u.kind==='主题拓展')y=text('主题拓展 · 配套延伸句型',MARGIN,y,INNER,17,C.muted)+12;
  y=section('01  一词多义 · 同一个词，不同的意思',y+20);
  if(!u.senses.length)y=text('本单元先巩固基础词义，直接进入下方语法应用。',MARGIN,y,INNER,21,C.muted)+25;
  for(const s of u.senses){
   const top=y;let yy=y+28;yy=text(s.word,MARGIN+28,yy,INNER-56,34,C.purple,700)+18;
   const gap=18,cw=(INNER-56-gap)/2;
   for(let i=0;i<s.meanings.length;i+=2){
    const bottoms=[];
    for(let j=i;j<Math.min(i+2,s.meanings.length);j++){
     const m=s.meanings[j],x=MARGIN+28+(j-i)*(cw+gap);
     bottoms.push(column(m.meaning,[{text:'场景：'+m.scene,size:17,color:C.muted},{text:m.en,size:22,weight:600},{text:m.zh,size:18,color:C.muted}],x,yy,cw,j%2?C.mint:C.lavender));
    }
    yy=Math.max(...bottoms)+18;
   }
   yy=text('试一试：遮住中文，说出句中这个词的意思，再换一个情境造句。',MARGIN+28,yy,INNER-56,18,C.muted)+26;
   if(draw){ctx.save();ctx.globalCompositeOperation='destination-over';box(MARGIN,top,INNER,yy-top);ctx.restore();}
   y=yy+22;
  }
  y=section('02  单元语法 · 让句子用得起来',y+12);
  for(let i=0;i<u.grammar.length;i++){
   const g=u.grammar[i],top=y;let yy=y+28;
   yy=text(`${String(i+1).padStart(2,'0')}  ${g.title}`,MARGIN+28,yy,INNER-56,25,C.ink,700)+17;
   yy=text('使用场景：'+g.scene,MARGIN+28,yy,INNER-56,20,C.purple,600)+12;
   yy=text(g.rule,MARGIN+28,yy,INNER-56,19,C.muted)+20;
   for(const e of g.examples){yy=text(e.en,MARGIN+28,yy,INNER-56,25,C.ink,600)+6;yy=text(e.zh,MARGIN+28,yy,INNER-56,19,C.muted)+18;}
   const cw=(INNER-74)/2;
   const left=column('轮到孩子说',[{text:g.task,size:20},{text:'参考表达',size:16,color:C.purple,weight:700},{text:g.answer,size:22,weight:600}],MARGIN+28,yy,cw,C.mint);
   const right=column('常见错误 → 正确表达',[{text:'易错：'+g.incorrect,size:18,color:'#9a6664'},{text:'正确：'+g.correct,size:20,color:'#39765d',weight:600},{text:g.reason,size:17,color:C.muted}],MARGIN+46+cw,yy,cw,C.rose);
   yy=Math.max(left,right)+28;
   if(draw){ctx.save();ctx.globalCompositeOperation='destination-over';box(MARGIN,top,INNER,yy-top);ctx.restore();}
   y=yy+23;
  }
  y=section('03  家庭小练习 · 每次 5–8 分钟',y+10);
  y=text('① 看情境，读例句，说一说词和句子的意思。\n② 遮住参考答案，完成一个替换或表达任务。\n③ 联系自己的生活，再说一个新句子。',MARGIN,y,INNER,21,C.ink,400,1.65)+24;
  y=text('新编配套拓展 · 合理的其他表达也可以。',MARGIN,y,INNER,16,C.muted)+20;
  y=text('From Rachel Hu',MARGIN,y,INNER,17,C.purple,600)+55;
  if(draw){ctx.save();ctx.globalCompositeOperation="destination-over";ctx.fillStyle=C.paper;ctx.fillRect(0,0,WIDTH,ctx.canvas.height/SCALE);ctx.restore();}
  return Math.ceil(y);
 }
 return layout;
}
async function exportUnit(u){
 if(!u)throw Error('未找到单元');
 if(document.fonts?.ready)await document.fonts.ready;
 const measure=document.createElement('canvas');const mc=measure.getContext('2d');if(!mc)throw Error('当前浏览器无法生成图片');
 const logicalHeight=Math.max(1920,painter(mc,false)(u));
 const canvas=document.createElement('canvas');canvas.width=WIDTH*SCALE;canvas.height=logicalHeight*SCALE;
 const ctx=canvas.getContext('2d');if(!ctx)throw Error('当前浏览器无法生成图片');
 ctx.scale(SCALE,SCALE);painter(ctx,true)(u);
 const blob=await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(Error('图片生成失败')),'image/png'));
 const width=canvas.width,height=canvas.height;canvas.width=1;canvas.height=1;
 return {blob,width,height,filename:`${u.id}-家长拓展-4K-${width}x${height}.png`};
}
window.UnitApplicationExport={exportUnit};
})();
