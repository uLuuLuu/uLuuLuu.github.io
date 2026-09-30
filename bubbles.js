(() => {
 'use strict';
 const q=s=>document.querySelector(s),entry=q('#bubbles'),slots=[...entry.querySelectorAll('.bubble-slot')],motion=matchMedia('(prefers-reduced-motion: reduce)');
 const originals=slots.map(s=>s.querySelector('.thought-bubble span').textContent);
 let inView=false,paused=false,timer=null,cursor=0,generation=0;
 const running=new Set();
 function track(animation){running.add(animation);animation.finished.catch(()=>{}).finally(()=>running.delete(animation));return animation;}
 function reveal(slot,animate=true){
   if(!slot.classList.contains('waiting'))return;
   slot.classList.remove('waiting');slot.inert=false;
   if(!animate||motion.matches)return;
   const origin=q('.machine-nozzle').getBoundingClientRect(),r=slot.getBoundingClientRect();
   const i=slots.indexOf(slot),dx=origin.x-r.x-r.width/2,dy=origin.y-r.y-r.height/2;
   track(slot.animate([
    {transform:`translate(${dx}px,${dy}px) scale(.08)`,opacity:0,offset:0},
    {transform:`translate(${dx*.65}px,${dy*.65}px) scale(.55)`,opacity:.9,offset:.04},
    {transform:'translate(-18px,36px) scale(.95)',opacity:1,offset:.16},
    {transform:'translate(20px,-30px) scale(1)',opacity:1,offset:.65},
    {transform:'translate(-8px,-65px) scale(1.04)',opacity:1,offset:.9},
    {transform:'translate(15px,-90px) scale(.95)',opacity:0,offset:1}
   ],{duration:24000+i*700,iterations:Infinity,easing:'linear'}));
 }
 function puff(){
   const air=q('.bubble-air'),origin=q('.machine-nozzle').getBoundingClientRect(),box=entry.getBoundingClientRect(),b=document.createElement('i');b.className='air-bubble';b.style.left=(origin.x-box.x)+'px';b.style.top=(origin.y-box.y)+'px';air.append(b);
   const a=track(b.animate([{transform:'translate(0,0) scale(.2)',opacity:0},{opacity:.7,offset:.2},{transform:`translate(${130+Math.random()*230}px,${-90-Math.random()*80}px) scale(${.5+Math.random()})`,opacity:0}],{duration:4200,easing:'ease-out'}));a.finished.catch(()=>{}).finally(()=>b.remove());
 }
 function sync(){
   clearInterval(timer);timer=null;
   const go=inView&&!document.hidden&&!paused&&!motion.matches;entry.classList.toggle('is-blowing',go);
   running.forEach(a=>{const el=a.effect?.target;go&&!el?.matches(':hover')&&!el?.contains(document.activeElement)?a.play():a.pause();});
   q('#bubble-pause').textContent=paused?'继续吹泡泡':'暂停吹泡泡';q('#bubble-pause').setAttribute('aria-pressed',String(paused));q('#bubble-pause').disabled=motion.matches;
   if(motion.matches){slots.forEach(s=>reveal(s,false));running.forEach(a=>a.cancel());q('#bubble-pause').textContent='静态浏览';return;}
   if(go){tick();timer=setInterval(tick,1000);}
 }
 function tick(){if(cursor<slots.length)reveal(slots[cursor++]);puff();}
 function all(){slots.forEach(s=>{reveal(s,false);s.getAnimations().forEach(a=>a.cancel());});cursor=slots.length;}
 slots.forEach(s=>{s.classList.add('waiting');s.inert=true;});
 new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;sync();}).observe(entry);
 document.addEventListener('visibilitychange',sync);motion.addEventListener('change',sync);
 q('#bubble-pause').addEventListener('click',()=>{paused=!paused;sync();});
 q('#bubble-all').addEventListener('click',all);
 slots.forEach(slot=>{
   const hold=()=>slot.getAnimations().forEach(a=>a.pause());
   const release=()=>{if(inView&&!paused&&!document.hidden&&!motion.matches&&!slot.matches(':hover')&&!slot.contains(document.activeElement))slot.getAnimations().forEach(a=>a.play());};
   slot.addEventListener('pointerenter',hold);slot.addEventListener('pointerleave',release);slot.addEventListener('focusin',hold);slot.addEventListener('focusout',()=>setTimeout(release,0));
   const button=slot.querySelector('button');
   button.addEventListener('click',async()=>{
     if(button.dataset.busy==='true'||button.classList.contains('popped'))return;
     const kind=button.dataset.kind,g=generation;button.dataset.busy='true';button.classList.add('used');
     if(kind==='keep'){
       button.classList.add('kept');button.querySelector('small').textContent='戳不破，留在这里';q('#bubble-response').textContent=button.querySelector('span').textContent+'，留在这里。';
       if(!motion.matches)await button.animate([{transform:'scale(1)'},{transform:'scale(.84,1.07)'},{transform:'scale(1)'}],{duration:520,easing:'ease-out'}).finished.catch(()=>{});
     }else if(kind==='reveal'||kind==='rainbow'){
       button.classList.add(kind==='rainbow'?'rainbow':'revealed');button.querySelector('span').textContent=button.dataset.reply;button.querySelector('small').textContent='留住这一句';q('#bubble-response').textContent=button.dataset.reply;
       if(!motion.matches)button.animate([{opacity:.4},{opacity:1}],{duration:450,easing:'ease-out'});
     }else{
       q('#bubble-response').textContent=kind==='ripple'?'活成一首不断回响的诗歌':button.querySelector('span').textContent+'，轻轻散开。';
       if(kind==='ripple')slot.classList.add('rippling');
       if(!motion.matches)await button.animate([{transform:'scale(1)',opacity:1},{transform:'scale(1.2)',opacity:0}],{duration:350,easing:'ease-out'}).finished.catch(()=>{});
       if(g!==generation)return;slot.getAnimations().forEach(a=>a.cancel());button.classList.add('popped');button.tabIndex=-1;
       if(document.activeElement===button){const next=slots.map(s=>s.querySelector('button')).find(b=>!b.classList.contains('popped')&&!b.closest('.waiting'));(next||q('#bubble-reset')).focus({preventScroll:true});}
     }
     if(g===generation)button.dataset.busy='false';
   });
 });
 q('#bubble-reset').addEventListener('click',()=>{
   generation++;running.forEach(a=>a.cancel());
   slots.forEach((slot,i)=>{const b=slot.querySelector('button');b.getAnimations().forEach(a=>a.cancel());b.classList.remove('used','kept','revealed','rainbow','popped');b.querySelector('span').textContent=originals[i];b.querySelector('small').textContent='碰一下';b.dataset.busy='false';b.tabIndex=0;slot.classList.remove('rippling');slot.classList.add('waiting');slot.inert=true;});cursor=0;
   q('#bubble-response').textContent='可以戳一颗，也可以让它们待着。';if(paused||motion.matches)all();sync();
 });
 sync();
})();
