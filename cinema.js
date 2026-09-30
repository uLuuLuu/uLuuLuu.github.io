(() => {
  'use strict';
  const q = s => document.querySelector(s);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const archive = [...q('#trajectory-archive').children];
  const images = ['travel.jpg','ggj-background.png','camp-5.jpg','camp-3.jpg','hero-particle.png','trueseeking.jpeg','hanni-embrace.png','campus-3.jpg'];
  const captions = ['独自旅行途中留下的画面。','和伙伴在 48 小时里共创游戏。','从旁观，走进一群人。','相遇、表达、一起做事。','探索 AI 如何落到真实实践。','尝试开发 TrueSeeking。','云南哈尼夏令营，和孩子们相拥的一刻。','开始尝试成为发起人。'];
  const films = archive.map((a,i) => {
    const [date,...title] = a.textContent.split(' · ');
    return {date,title:title.join(' · '),href:a.getAttribute('href'),image:images[i],caption:captions[i]};
  });
  const coords = [[31,11],[70,9],[88,37],[74,73],[42,91],[12,74],[4,41],[48,44]];
  const nav = q('.film-constellation'), modal = q('#star-cinema');
  let active = 0, viewing = 0, previousFocus, savedY = 0, followLink = null;
  const stars = films.map((film,i) => {
    const star = document.createElement('button');
    star.type='button';star.className='film-star';star.dataset.film=i;
    star.style.setProperty('--star-x',coords[i][0]+'%');star.style.setProperty('--star-y',coords[i][1]+'%');
    star.setAttribute('aria-label',`放映：${film.date} ${film.title}`);star.setAttribute('aria-haspopup','dialog');
    star.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0 15 9 24 12 15 15 12 24 9 15 0 12 9 9Z"/></svg><span></span><small></small>';
    star.querySelector('span').textContent=film.date;star.querySelector('small').textContent=film.title;
    star.addEventListener('click',()=>openFilm(i));nav.append(star);
    const choice=document.createElement('button');choice.type='button';choice.textContent=archive[i].textContent;choice.setAttribute('aria-haspopup','dialog');choice.addEventListener('click',()=>openFilm(i));archive[i].replaceWith(choice);
    return star;
  });
  function showFilm(index) {
    active=index;
    stars.forEach((star,i)=>star.setAttribute('aria-current',String(i===index)));
    q('#film-prev').disabled=index===0;q('#film-next').disabled=index===films.length-1;
    q('#film-open').setAttribute('aria-label',`点亮这一幕，放映${films[index].title}`);
  }
  function goFilm(index) {
    index=Math.max(0,Math.min(films.length-1,index));
    if(reduced.matches){
      const film=films[index];q('#tunnel-date').textContent=film.date;q('#tunnel-title').textContent=film.title;q('#tunnel-caption').textContent=film.caption;q('#tunnel-link').href=film.href;q('#tunnel-count').textContent=`${String(index+1).padStart(2,'0')} / 08`;showFilm(index);return;
    }
    const run=q('.tunnel-run');
    scrollTo({top:run.getBoundingClientRect().top+scrollY+(run.offsetHeight-innerHeight)*(index+.12)/films.length,behavior:'smooth'});
  }
  function renderFilm(index) {
    viewing=index;const film=films[index],img=q('#screen-still'),status=q('#screen-status');
    q('#screen-count').textContent=`${String(index+1).padStart(2,'0')} / 08`;
    q('#screen-title').textContent=film.title;q('#screen-date').textContent=film.date;q('#screen-caption').textContent=film.caption;q('#screen-link').href=film.href;
    q('#screen-prev').disabled=index===0;q('#screen-next').disabled=index===films.length-1;
    img.getAnimations().forEach(a=>a.cancel());img.hidden=true;status.textContent='正在点亮这一幕…';
    img.onload=()=>{img.hidden=false;status.textContent=index===4?'这一幕以网站主题肖像作为视觉引子。':'';if(!reduced.matches)img.animate([{opacity:.25,transform:'scale(.985)'},{opacity:1,transform:'scale(1)'}],{duration:600,easing:'cubic-bezier(.16,1,.3,1)'});};
    img.onerror=()=>{img.hidden=true;status.textContent='这张影像暂时没有加载成功，可以下方打开完整记录。';};
    img.alt=film.title;img.src=`assets/${film.image}`;
  }
  function openFilm(index) {
    previousFocus=document.activeElement;savedY=scrollY;followLink=null;
    renderFilm(index);modal.showModal();document.body.classList.add('modal-open');modal.scrollTop=0;
  }
  q('#film-open').addEventListener('click',()=>openFilm(active));
  q('#film-prev').addEventListener('click',()=>goFilm(active-1));q('#film-next').addEventListener('click',()=>goFilm(active+1));
  q('#screen-prev').addEventListener('click',()=>renderFilm(Math.max(0,viewing-1)));
  q('#screen-next').addEventListener('click',()=>renderFilm(Math.min(films.length-1,viewing+1)));
  q('#screen-close').addEventListener('click',()=>modal.close());
  q('#screen-link').addEventListener('click',e=>{e.preventDefault();followLink=films[viewing].href;modal.close();});
  modal.addEventListener('close',()=>{
    document.body.classList.remove('modal-open');
    if(followLink){const target=q(followLink);scrollTo({top:target.getBoundingClientRect().top+scrollY-q('header').offsetHeight-12,behavior:'instant'});history.replaceState(null,'',followLink);target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}
    else{scrollTo({top:savedY,behavior:'instant'});previousFocus?.focus({preventScroll:true});}
  });

  // Depth derives from native scroll, with no wheel capture or autonomous camera.
  const canvas=q('.star-flight'),ctx=canvas.getContext('2d'),scene=q('.tunnel-scene');
  let progress=0, visible=false;
  const field=Array.from({length:210},(_,i)=>({angle:i*2.399963,radius:.1+((i*73)%193)/193*.95,z:((i*97)%211)/211}));
  function draw(){
    if(!visible||!ctx)return;
    const w=scene.clientWidth,h=scene.clientHeight,dpr=Math.min(devicePixelRatio||1,2);
    if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);}
    ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);
    const cx=w*(w<=700?.5:.6),cy=h*(w<=700?.68:.48),size=Math.max(w,h)*.42,p=reduced.matches?0:progress;
    field.forEach(s=>{
      const z=((s.z-p*3)%1+1)%1,depth=.12+z*1.8;
      const x=Math.cos(s.angle)*s.radius*size/depth,y=Math.sin(s.angle)*s.radius*size/depth;
      const fade=Math.min(1,z*14,(1-z)*14),r=Math.min(2.1,.55/depth);
      ctx.globalAlpha=fade*(.3+.6*(1-z));ctx.fillStyle='#e4d8f2';ctx.beginPath();ctx.arc(cx+x,cy+y,r,0,Math.PI*2);ctx.fill();
      if(!reduced.matches){ctx.strokeStyle='#cfb7e5';ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(cx+x,cy+y);ctx.lineTo(cx+x*(1+.025/depth),cy+y*(1+.025/depth));ctx.stroke();}
    });
    ctx.globalAlpha=1;
  }
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)draw();}).observe(scene);
  // Rings recycle at zero opacity at the far and near ends, without a scale snap.
  function seek(value){
    progress=value;
    scene.querySelectorAll('.tunnel-rings i').forEach((ring,i)=>{
      const z=((i/5-(reduced.matches?0:value*3))%1+1)%1;
      ring.style.width='32vmin';ring.style.height='32vmin';ring.style.transform=`scale(${.12+Math.pow(1-z,2)*5.8})`;ring.style.opacity=String(Math.min(z*5,(1-z)*6,.5));
    });draw();
  }
  reduced.addEventListener('change',()=>seek(progress));
  window.LuuCinema={showFilm,seek,get currentIndex(){return active;}};showFilm(0);
})();
