const notes=window.LUU_NOTES;
const sketches=[['01-day11.jpg','执剑 · 背影回眸'],['02-zhongbuzuo.jpg','终不做，少年游'],['03-day10.jpg','低姿 · 拔剑势'],['04-day15.jpg','红衣 · 仰望'],['05-day7.jpg','宽袍 · 托物'],['06-yinxiang.jpg','印象 · 持风车少女']];
document.querySelector('#sketches').innerHTML=sketches.map(([file,title],i)=>`<button data-image="assets/${file}" data-caption="${title}"><img src="assets/${file}" alt="人物速写：${title}" loading="lazy"><span>0${i+1} / ${title}</span></button>`).join('');
const excerpts=['先行动起来，在行动中完美，你并不需要对自己太苛刻','是个人的有限撞上团队的滋养','每个绘本都像是“我”的一个碎片','收集更多这样的能量碎片~'];
document.querySelector('#essay-list').innerHTML=notes.map((n,i)=>`<button class="essay-item" data-note="${n.id}"><small>0${i+1}</small><div><strong>${n.title}</strong><p>${excerpts[i]}</p></div><span aria-hidden="true">↗</span></button>`).join('');
const reader=document.querySelector('#reader'),lightbox=document.querySelector('#lightbox');
let previousFocus=null;
function openDialog(dialog){previousFocus=document.activeElement;dialog.showModal();document.body.classList.add('modal-open');dialog.scrollTop=0;}
function showNote(id){const n=notes.find(n=>n.id===id);if(!n)return;document.querySelector('#reader-title').textContent=n.title;document.querySelector('#reader-meta').textContent=`LUU / 小红书随笔 / ${n.date}`;document.querySelector('#reader-body').textContent=n.text;document.querySelector('#reader-source').href=`https://www.xiaohongshu.com/explore/${n.source}`;openDialog(reader);}
document.addEventListener('click',e=>{const note=e.target.closest('[data-note]');if(note){showNote(note.dataset.note);return;}const picture=e.target.closest('[data-image]');if(picture){document.querySelector('#lightbox-image').src=picture.dataset.image;document.querySelector('#lightbox-image').alt=picture.dataset.caption;document.querySelector('#lightbox-caption').textContent=picture.dataset.caption;openDialog(lightbox);}});
document.querySelector('#close-reader').onclick=()=>reader.close();document.querySelector('#close-lightbox').onclick=()=>lightbox.close();
for(const d of [reader,lightbox]){d.addEventListener('close',()=>{document.body.classList.remove('modal-open');previousFocus?.focus();});d.addEventListener('click',e=>{if(e.target!==d)return;const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();});}
const energy=notes.find(n=>n.id==='energy').text.split('\n').filter(x=>/^\d+\./.test(x)).map(x=>x.replace(/^\d+\./,''));
const grid=document.querySelector('#energy-grid');grid.innerHTML=energy.map((x,i)=>`<button class="fragment${i===0?' selected':''}" data-energy="${i}"><span>✧ ${String(i+1).padStart(2,'0')}</span>${x}</button>`).join('');let energyIndex=0;
function selectEnergy(i){energyIndex=i;document.querySelector('#energy-current').textContent=energy[i];grid.querySelectorAll('button').forEach((b,j)=>b.classList.toggle('selected',j===i));}
document.querySelector('#energy-next').onclick=()=>selectEnergy((energyIndex+1)%energy.length);
grid.onclick=e=>{const b=e.target.closest('[data-energy]');if(b)selectEnergy(Number(b.dataset.energy));};
document.querySelector('#show-energy').onclick=e=>{grid.hidden=!grid.hidden;e.currentTarget.setAttribute('aria-expanded',String(!grid.hidden));e.currentTarget.textContent=grid.hidden?'展开全部碎片 ＋':'收起碎片 −';};
const navLinks=[...document.querySelectorAll('.header nav a')];const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){navLinks.forEach(a=>a.classList.toggle('active',a.hash==='#'+entry.target.id));}},{rootMargin:'-15% 0px -55% 0px'});document.querySelectorAll('section[id]').forEach(s=>observer.observe(s));

const prelude=document.querySelector('#opening');
const preludeObserver=new IntersectionObserver(([entry])=>{document.querySelector('.header').classList.toggle('in-prelude',entry.isIntersecting);},{rootMargin:'-65px 0px 0px 0px'});
preludeObserver.observe(document.querySelector('.opening-note'));
const identityDialog=document.querySelector('#identity-dialog');
document.querySelectorAll('[data-identity]').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#identity-title').textContent=button.dataset.identity;openDialog(identityDialog);}));
identityDialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');previousFocus?.focus();});
