const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const flip=$('#flip-card'), flipButton=$('#flip-button');
function turnCard(){const active=flip.classList.toggle('is-flipped');flipButton.setAttribute('aria-pressed',String(active));flipButton.textContent=active?'翻回写着诗句的一面 ↺':'翻过名片，看看另一面 ↺';}
flip.addEventListener('click',turnCard);flip.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();turnCard();}});flipButton.addEventListener('click',turnCard);
function enterUniverse(){$('#universe').scrollIntoView({behavior:reduced.matches?'instant':'smooth'});}
$('#entry').addEventListener('click',e=>{if(!e.target.closest('#flip-card,#flip-button,.entry-actions a'))enterUniverse();});
const meteor=$('#meteor'),verse=$('#meteor-verse');meteor.addEventListener('click',()=>{verse.hidden=!verse.hidden;meteor.setAttribute('aria-expanded',String(!verse.hidden));});
// Direct chapter links retain native navigation; no forced transition wait.
const events=[
 ['2025.7','第一次独自旅行','the first solo trip','#travel-book'],
 ['2026.2','Game Jam','和伙伴在 48 小时里共创游戏','#ggj'],
 ['2026.5','Diggers 青年营队','从旁观，走进一群人','#camp'],
 ['2026.6','赋启黑衣人营队','相遇、表达、一起做事','#camp'],
 ['2026.7','北辰线上实习','探索 AI 如何落到真实实践','#ai'],
 ['2026.8','AIY 黑客松','尝试开发 TrueSeeking','#ai'],
 ['2026.8','云南哈尼夏令营','把星光带向新的现场','#teaching'],
 ['2026.9','校园实验 · 进行中','开始尝试成为发起人','#campus']
];
$$('.trajectory-intro h2,.works .section-heading h2,.camp-lead h2,.practice h2,.teaching h2,.campus h2,.energy h2,.travel-intro h3,.work-lead h3').forEach(heading=>{
 heading.classList.add('light-lines');
 heading.innerHTML=heading.innerHTML.split(/<br\s*\/?\s*>/i).map(line=>`<span>${line}</span>`).join('');
});
const lightGroups=$$('.light-lines');
function updateLight(vh){lightGroups.forEach(group=>{
 const lines=[...group.children].filter(line=>line.tagName==='SPAN');
 const stage=group.closest('.universe,.collision,.works-intro-run,.camp-lead-run');
 if(stage){
  const distance=Math.max(1,stage.offsetHeight-vh);
  const progress=Math.min(1,Math.max(0,-stage.getBoundingClientRect().top/distance));
  lines.forEach((line,i)=>line.classList.toggle('is-lit',reduced.matches||progress>=(i+1)/(lines.length+1)));
  return;
 }
 const titleTop=group.getBoundingClientRect().top;
 lines.forEach((line,i)=>line.classList.toggle('is-lit',reduced.matches||titleTop<=vh*(.7-i*.13)));
});}
const run=$('.tunnel-run'),ring=$('.tunnel-rings'),tunnelEvent=$('#tunnel-event');let eventIndex=-1;
function position(){
 const vh=innerHeight;
 updateLight(vh);
 const start=run.getBoundingClientRect().top;
 const progress=Math.min(1,Math.max(0,-start/Math.max(1,run.offsetHeight-vh)));
 const raw=Math.min(events.length-.001,progress*events.length),idx=reduced.matches?(window.LuuCinema?.currentIndex??0):Math.floor(raw);
 if(idx!==eventIndex){eventIndex=idx;const e=events[idx];$('#tunnel-date').textContent=e[0];$('#tunnel-title').textContent=e[1];$('#tunnel-caption').textContent=e[2];$('#tunnel-link').href=e[3];$('#tunnel-link').textContent='走近这段经历 ↗';$('#tunnel-count').textContent=String(idx+1).padStart(2,'0')+' / 08';window.LuuCinema?.showFilm(idx);if(!reduced.matches)tunnelEvent.animate([{opacity:.3,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:360,easing:'ease-out'});}
 window.LuuCinema?.seek(progress);
 ring.style.setProperty('--tunnel-scale',String(1+(raw%1)*.8));
 $$('.scroll-rail[data-rail]').forEach(rail=>{
  if(innerWidth<=600||reduced.matches){rail.style.removeProperty('--rail-x');return;}
  const stage=rail.querySelector('.rail-stage'),track=rail.querySelector('.rail-track');
  const distance=Math.max(0,track.scrollWidth-stage.clientWidth);
  const p=Math.min(1,Math.max(0,-rail.getBoundingClientRect().top/Math.max(1,rail.offsetHeight-vh)));
  rail.style.setProperty('--rail-x',`${-distance*p}px`);
 });
 const flight=$('#travel-flight');
 if(!reduced.matches&&!flight.hidden){
  const pages=$$('[data-flight-page]');
  const p=Math.min(1,Math.max(0,-flight.getBoundingClientRect().top/Math.max(1,flight.offsetHeight-vh)));
  const step=Math.min(8.85,p*9);
  $('#flight-count').textContent=`${String(Math.floor(step)+1).padStart(2,'0')} / 09`;
  pages.forEach((page,i)=>{
   const local=step-i;
   const approaching=Math.max(0,Math.min(1,(local+.25)/.25));
   const departing=Math.max(0,Math.min(1,(1-local)/.18));
   const visible=local>=-.25&&local<=1;
   const depth=-450+Math.max(0,local)*1000+Math.max(0,local-.82)*1300;
   page.style.transform=`translate3d(-50%,-50%,${depth}px) rotate(${(i%2?1:-1)*Math.max(0,1-local)*2}deg)`;
   page.style.opacity=visible?String(approaching*departing):'0';
   page.style.pointerEvents=local>.1&&local<.87?'auto':'none';
   page.querySelector('button').tabIndex=local>.1&&local<.87?0:-1;
  });
 }
}
let ticking=false;function update(){if(ticking)return;ticking=true;requestAnimationFrame(()=>{position();ticking=false;});}
addEventListener('scroll',update,{passive:true});addEventListener('resize',update);reduced.addEventListener('change',()=>{eventIndex=-1;$$('[data-flight-page] button').forEach(b=>b.tabIndex=0);update();});position();
const travelToggle=document.createElement('button');travelToggle.className='travel-toggle';travelToggle.type='button';travelToggle.setAttribute('aria-expanded','false');travelToggle.textContent='一键展开九张绘本 ＋';$('.travel-intro').append(travelToggle);
const travelAll=document.createElement('div');travelAll.className='travel-all';travelAll.id='travel-all';travelAll.hidden=true;travelAll.innerHTML=$$('[data-flight-page]').map((page,i)=>`<figure><button data-image="assets/travel-book-${i+1}.jpeg" data-caption="旅行绘本 · 第 ${i+1} 页" aria-label="放大旅行绘本第 ${i+1} 页"><img src="assets/travel-book-${i+1}.jpeg" alt="旅行绘本手绘页 ${i+1}" loading="lazy"></button><figcaption>${String(i+1).padStart(2,'0')} / 09</figcaption></figure>`).join('');$('#travel-flight').after(travelAll);
travelToggle.addEventListener('click',()=>{const open=travelAll.hidden;travelAll.hidden=!open;$('#travel-flight').hidden=open;travelToggle.setAttribute('aria-expanded',String(open));travelToggle.textContent=open?'收起九张，继续飞页 −':'一键展开九张绘本 ＋';(open?travelAll:$('#travel-flight')).scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});update();});
const notes=window.LUU_NOTES||[];
$('#essay-list').innerHTML=notes.map((n,i)=>`<button class="essay-item" data-note="${n.id}"><small>${String(i+1).padStart(2,'0')}</small><div><strong>${n.title}</strong><p>打开这篇随笔，看看我留下的想法</p></div><span>↗</span></button>`).join('');
const energyNote=notes.find(n=>n.id==='energy');
const energy=energyNote?energyNote.text.split('\n').filter(x=>/^\d+\./.test(x)).map(x=>x.replace(/^\d+\./,'')):[];
$('#energy-grid').innerHTML=energy.map((item,i)=>`<button data-energy="${i}"><span>✦ ${String(i+1).padStart(2,'0')}</span>${item}</button>`).join('');let energyIndex=0;
function selectEnergy(i){$('#copy-status').textContent='';energyIndex=i;$('#energy-current').textContent=energy[i];if(!reduced.matches)$('#energy-current').animate([{transform:'rotate(-7deg) translateY(8px)',opacity:.3},{transform:'rotate(-3deg) translateY(0)',opacity:1}],{duration:420,easing:'ease-out'});}
const rollButton=$('#energy-next'),die=rollButton.querySelector('.energy-die');
rollButton.addEventListener('click',async()=>{
 if(!energy.length||rollButton.disabled)return;
 rollButton.disabled=true;rollButton.setAttribute('aria-busy','true');$('#copy-status').textContent='';
 rollButton.querySelector('.dice-label').textContent='骰子正在翻滚…';
 const face=1+Math.floor(Math.random()*6);
 if(!reduced.matches){const roll=die.animate([{transform:'rotate(-12deg) translateY(0)'},{transform:'rotate(150deg) translateY(-22px)',offset:.42},{transform:'rotate(370deg) translateY(3px)',offset:.85},{transform:'rotate(360deg) translateY(0)'}],{duration:680,easing:'cubic-bezier(.22,1,.36,1)'});await roll.finished.catch(()=>{});}
 die.dataset.face=String(face);
 const offset=energy.length>1?1+Math.floor(Math.random()*(energy.length-1)):0;
 selectEnergy((energyIndex+offset)%energy.length);
 rollButton.querySelector('.dice-label').textContent='再掷一次能量骰子';
 rollButton.disabled=false;rollButton.removeAttribute('aria-busy');
});
$('#energy-grid').addEventListener('click',e=>{const b=e.target.closest('[data-energy]');if(b)selectEnergy(+b.dataset.energy);});
$('#energy-all').addEventListener('click',()=>{const grid=$('#energy-grid');grid.hidden=!grid.hidden;$('#energy-all').setAttribute('aria-expanded',String(!grid.hidden));$('#energy-all').textContent=grid.hidden?'摊开全部收藏 ＋':'收好这些光 −';});
const reader=$('#reader'),lightbox=$('#lightbox');let previousFocus=null;
function openDialog(d){previousFocus=document.activeElement;d.showModal();document.body.classList.add('modal-open');}
document.addEventListener('click',e=>{const note=e.target.closest('[data-note]');if(note){const n=notes.find(x=>x.id===note.dataset.note);if(!n)return;$('#reader-meta').textContent=['LUU',n.collection||'小红书随笔',n.date].filter(Boolean).join(' / ');$('#reader-title').textContent=n.title;
 const body=$('#reader-body');body.replaceChildren();
 if(n.blocks){for(const block of n.blocks){if(block.type==='text'){const p=document.createElement('p');p.textContent=block.text;body.append(p);}else if(block.type==='image'){const figure=document.createElement('figure');const img=document.createElement('img');img.src=block.src;img.alt=block.alt;img.loading='lazy';figure.append(img);body.append(figure);}}
 }else{body.textContent=n.text;}
 const sourceLink=$('#reader-source');sourceLink.hidden=!n.source;if(n.source){sourceLink.href=`https://www.xiaohongshu.com/explore/${n.source}`;}else{sourceLink.removeAttribute('href');}
 openDialog(reader);return;}const pic=e.target.closest('[data-image]');if(pic){$('#lightbox-image').src=pic.dataset.image;$('#lightbox-image').alt=pic.dataset.caption;$('#lightbox-caption').textContent=pic.dataset.caption;openDialog(lightbox);}});
$('#close-reader').addEventListener('click',()=>reader.close());$('#close-lightbox').addEventListener('click',()=>lightbox.close());
[reader,lightbox].forEach(d=>d.addEventListener('close',()=>{document.body.classList.remove('modal-open');previousFocus?.focus();}));
