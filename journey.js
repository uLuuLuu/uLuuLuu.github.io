(() => {
  'use strict';
  const q = s => document.querySelector(s);
  const qa = s => [...document.querySelectorAll(s)];
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const behavior = () => motion.matches ? 'instant' : 'smooth';
  const rail=q('.sketch-rail'), stage=rail.querySelector('.rail-stage'), track=rail.querySelector('.rail-track');
  const pages=[...track.children];
  let sketchIndex=0,scheduled=false;
  function nativeAlbum(){return innerWidth<=600||motion.matches;}
  function albumProgress(){
    const distance=Math.max(1,track.scrollWidth-stage.clientWidth);
    const p=nativeAlbum()?stage.scrollLeft/distance:Math.min(1,Math.max(0,-rail.getBoundingClientRect().top/Math.max(1,rail.offsetHeight-innerHeight)));
    sketchIndex=Math.max(0,Math.min(pages.length-1,Math.round(p*(pages.length-1))));
    q('#sketch-count').textContent=`${String(sketchIndex+1).padStart(2,'0')} / ${String(pages.length).padStart(2,'0')}`;
    q('#sketch-prev').disabled=p<.01;q('#sketch-next').disabled=p>.99;
  }
  function albumUpdate(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{albumProgress();scheduled=false;});}
  addEventListener('scroll',albumUpdate,{passive:true});addEventListener('resize',albumUpdate);stage.addEventListener('scroll',albumUpdate,{passive:true});motion.addEventListener('change',()=>{stage.scrollLeft=0;albumUpdate();});
  function goSketch(i){i=Math.max(0,Math.min(pages.length-1,i));const steps=Math.max(1,pages.length-1);if(nativeAlbum()){stage.scrollTo({left:(track.scrollWidth-stage.clientWidth)*i/steps,behavior:behavior()});}else{scrollTo({top:rail.getBoundingClientRect().top+scrollY+(rail.offsetHeight-innerHeight)*i/steps,behavior:behavior()});}}
  q('#sketch-prev').addEventListener('click',()=>goSketch(sketchIndex-1));q('#sketch-next').addEventListener('click',()=>goSketch(sketchIndex+1));
  pages.forEach((page,i)=>page.querySelector('button').addEventListener('focus',()=>{if(!page.querySelector('button').matches(':focus-visible'))return;goSketch(i);}));
  albumProgress();

  q('#copy-energy').addEventListener('click',async()=>{const text=q('#energy-current').textContent;try{await navigator.clipboard.writeText(text);q('#copy-status').textContent='已复制，带着这片微光继续启程！';}catch{q('#copy-status').textContent='暂时不能自动复制，可以选中上面的文字带走。';const range=document.createRange();range.selectNodeContents(q('#energy-current'));getSelection().removeAllRanges();getSelection().addRange(range);}});
})();
