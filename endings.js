(() => {
 const scenes=[...document.querySelectorAll('.story-ending')],reduce=matchMedia('(prefers-reduced-motion: reduce)'),clamp=x=>Math.max(0,Math.min(1,x));let scheduled=false;
 function draw(){scheduled=false;scenes.forEach((scene,i)=>{
  const r=scene.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;
  const p=reduce.matches?1:clamp(-r.top/Math.max(1,r.height-innerHeight)),stage=scene.firstElementChild;
  scene.querySelectorAll('h2 span').forEach((line,j)=>line.style.setProperty('--line-light',reduce.matches?1:String(.12+.88*clamp((p-j*.14)/.2))));
  stage.style.setProperty('--spread',String(i===0?1-clamp(p/.68)*.96:.08+clamp(p/.8)*1.2));
  stage.style.setProperty('--orbit-light',String(i===0?.8*(1-clamp(p/.8)):.2+p*.6));
  stage.style.setProperty('--star-size',String(.5+clamp(p/.65)*.8));stage.style.setProperty('--star-y',Math.max(0,p-.8)*innerHeight*.65+'px');stage.style.setProperty('--next-light',String(clamp((p-.65)/.2)));
 });}
 function update(){if(!scheduled){scheduled=true;requestAnimationFrame(draw);}}
 addEventListener('scroll',update,{passive:true});addEventListener('resize',update);reduce.addEventListener('change',update);update();
})();
