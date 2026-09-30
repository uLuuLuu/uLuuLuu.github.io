(() => {
'use strict';
const q=s=>document.querySelector(s),qa=s=>[...document.querySelectorAll(s)];
const seeds=[
  {
    "id": "sixty",
    "title": "六十分也开门",
    "text": "第一次发出我的调研招募海报，并惊心动魄的开展了第一次教练对话，也因此获得了最真实的用户反馈",
    "href": "#campus",
    "link": "看看校园里的尝试",
    "name": "Luu"
  },
  {
    "id": "sketching",
    "title": "在人群里，画我想画的",
    "text": "在昆明和大理的旅行里，我画下纹样、植物和生活场景。画着画着，激动慢慢变成平静和愉悦。我也比以前更能怡然自得地在人群里，画下想画的东西。",
    "href": "#travel-book",
    "link": "翻开我的旅行绘本",
    "name": "Luu"
  },
  {
    "id": "classroom",
    "title": "教案之外，站进课堂",
    "text": "在哈尼夏令营，我第一次在课堂里体验“教师”这个身份。备课的设想遇见真实的孩子，也遇见没预料到的情况。我尝试平等地沟通，向其他老师学习，调整自己的表达。",
    "href": "#teaching",
    "link": "回到相遇的现场",
    "name": "Luu"
  }
];
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const key='luu-tavern-local-drafts-v1';
let drafts=[],mode='moment',target='',active=null,previousId='',timers=[],generation=0,opener=null,warning='';
const dialog=q('#toast-stage'),form=q('#tavern-form'),composer=q('#tavern-composer');
const valid=d=>d&&typeof d.id==='string'&&typeof d.text==='string'&&d.text.length<=500&&typeof d.name==='string'&&d.name.length<=24&&typeof d.target==='string'&&['moment','reply'].includes(d.mode)&&typeof d.date==='string';
try{const raw=localStorage.getItem(key);if(raw){const parsed=JSON.parse(raw);if(!Array.isArray(parsed)||!parsed.every(valid))throw Error('invalid');drafts=parsed;}}catch{warning='本机酒柜暂时无法读取；新内容可以写下并下载。';}
function nameOf(id){const seed=seeds.find(m=>m.id===id);if(seed)return seed.title;const own=drafts.find(d=>d.id===id);return own?(own.name||'匿名')+' 的一杯酒':'已移除的那杯酒';}
function pool(){return [...seeds,...drafts.filter(d=>d.mode==='moment').map(d=>({...d,title:'一杯新酿的勇敢',href:'',link:''}))];}
function stop(){generation++;timers.forEach(clearTimeout);timers=[];}
function later(fn,ms){const token=generation;timers.push(setTimeout(()=>{if(token===generation&&dialog.open)fn();},ms));}
function showStory(){stop();dialog.dataset.phase='story';q('#toast-skip').hidden=true;q('#revealed-moment').hidden=false;q('#revealed-moment').focus({preventScroll:true});}
function pour(specific){
 if(dialog.open&&dialog.dataset.phase!=='story')return;
 const choices=pool().filter(m=>m.id!==previousId),all=choices.length?choices:pool();
 active=specific||all[Math.floor(Math.random()*all.length)];previousId=active.id;
 if(!dialog.open)opener=document.activeElement;
 q('#poured-title').textContent=active.title;q('#poured-author').textContent='调酒师 · '+(active.name||'匿名');q('#poured-text').textContent=active.text;
 q('#poured-link').hidden=!active.href;if(active.href){q('#poured-link').href=active.href;q('#poured-link').textContent=active.link+' ↗';}
 stop();q('#revealed-moment').hidden=true;q('#toast-skip').hidden=false;dialog.dataset.phase='mixing';q('#toast-phase-label').textContent='摇匀一点勇气，调出这一杯。';
 if(!dialog.open){dialog.showModal();document.body.classList.add('modal-open');}
 if(reduced.matches){showStory();return;}
 later(()=>{dialog.dataset.phase='clink';q('#toast-phase-label').textContent='为这一刻，碰杯。';},1500);
 later(()=>{dialog.dataset.phase='mist';q('#toast-phase-label').textContent='有个故事，正在靠近。';},2350);
 later(showStory,3450);
}
qa('[data-pour]').forEach(b=>b.addEventListener('click',()=>pour()));
q('#pour-again').addEventListener('click',()=>pour());
q('#toast-skip').addEventListener('click',showStory);
q('#toast-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>{stop();dialog.dataset.phase='idle';document.body.classList.remove('modal-open');opener?.focus({preventScroll:true});});
reduced.addEventListener('change',()=>{if(reduced.matches&&dialog.open)showStory();});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&dialog.open)showStory();});
function openComposer(nextMode,nextTarget=''){
 if(q('#guest-story').value.trim()&&(mode!==nextMode||target!==nextTarget)){
  composer.hidden=false;q('#save-status').textContent='还有一杯没调完。先保存，或清空酒的内容后再换一杯。';composer.scrollIntoView({behavior:'smooth',block:'start'});return;
 }
 mode=nextMode;target=nextTarget;composer.hidden=false;
 q('#composer-title').textContent=mode==='moment'?'自己调一杯酒':'给这杯酒加一点料';
 q('#composer-prompt').textContent=mode==='moment'?'放进一个属于你的勇敢时刻。很小的事，也能酿成一杯。':'正在回应：'+(active?.title||nameOf(target));
 q('#guest-story-label').textContent=mode==='moment'?'酒的内容':'加的料 · 你想留下的回应';
 q('.save-toast').textContent=mode==='moment'?'封存这一杯 · 仅本机':'留下这份回应 · 仅本机';
 q('#save-status').textContent=warning;composer.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});q('#guest-story').focus({preventScroll:true});
}
q('#mix-own').addEventListener('click',()=>openComposer('moment'));
q('#add-flavor').addEventListener('click',()=>{const id=active.id;dialog.close();openComposer('reply',id);});
q('#poured-link').addEventListener('click',()=>dialog.close());
q('#composer-close').addEventListener('click',()=>{composer.hidden=true;q('#mix-own').focus({preventScroll:true});});
q('#guest-story').addEventListener('input',()=>{q('#story-count').textContent=q('#guest-story').value.length+' / 500';q('#guest-story').setCustomValidity('');});
function render(){
 q('#draft-count').textContent=String(drafts.length);q('#draft-list').replaceChildren();q('#download-drafts').disabled=!drafts.length;
 if(!drafts.length){const p=document.createElement('p');p.textContent=warning||'酒柜还是空的，等你亲手调一杯。';q('#draft-list').append(p);}
 drafts.forEach(d=>{
  const el=document.createElement('article');el.className='saved-draft';const meta=document.createElement('small');meta.textContent='调酒师 · '+(d.name||'匿名')+' / '+(d.mode==='reply'?'加料给「'+nameOf(d.target)+'」':'碰杯时刻');
  const p=document.createElement('p');p.textContent=d.text;const del=document.createElement('button');del.type='button';del.textContent='删除这份本机记录';del.addEventListener('click',()=>{
   const next=drafts.filter(x=>x.id!==d.id);try{localStorage.setItem(key,JSON.stringify(next));drafts=next;render();}catch{del.textContent='删除失败，请稍后重试';}
  });el.append(meta,p);
  if(d.mode==='moment'){const taste=document.createElement('button');taste.type='button';taste.textContent='尝尝这一杯';taste.addEventListener('click',()=>pour({...d,title:'一杯新酿的勇敢'}));el.append(taste);}
  el.append(del);q('#draft-list').append(el);
 });
}
form.addEventListener('submit',e=>{
 e.preventDefault();const text=q('#guest-story').value.trim();if(!text){q('#guest-story').setCustomValidity('为这杯酒写下一句话。');q('#guest-story').reportValidity();return;}
 const d={id:crypto.randomUUID(),mode,target,name:q('#guest-name').value.trim().slice(0,24),text,date:new Date().toISOString()};const next=[...drafts,d];let persisted=false;
 try{localStorage.setItem(key,JSON.stringify(next));persisted=true;warning='';}catch{warning='本机保存失败。内容暂留在这一页，请先下载，刷新后可能丢失。';}
 drafts=next;q('#guest-story').value='';q('#story-count').textContent='0 / 500';q('#local-drafts').open=true;q('#save-status').textContent=persisted?'这一杯已存进本机酒柜，尚未发送或公开。':warning;render();
 if(mode==='moment'&&persisted)pour({...d,title:'一杯新酿的勇敢'});
});
q('#download-drafts').addEventListener('click',()=>{
 const text=drafts.map(d=>(d.mode==='moment'?'碰杯时刻':'回应：'+nameOf(d.target))+'\n调酒师：'+(d.name||'匿名')+'\n'+d.text).join('\n\n——\n\n');
 const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='我的碰杯酒柜.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
});
render();
})();
