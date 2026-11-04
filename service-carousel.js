(() => {
  'use strict';
  const track=document.getElementById('service-photo-track');
  const previous=document.getElementById('service-previous');
  const next=document.getElementById('service-next');
  if(!track||!previous||!next)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const update=()=>{
    const max=Math.max(0,track.scrollWidth-track.clientWidth);
    previous.disabled=track.scrollLeft<=2;
    next.disabled=track.scrollLeft>=max-2;
  };
  const move=direction=>{
    const card=track.querySelector('.service-photo-card');
    const gap=parseFloat(getComputedStyle(track).columnGap)||0;
    const step=card?card.getBoundingClientRect().width+gap:track.clientWidth;
    track.scrollBy({left:direction*step,behavior:reduced.matches?'instant':'smooth'});
  };
  previous.addEventListener('click',()=>move(-1));
  next.addEventListener('click',()=>move(1));
  track.addEventListener('keydown',event=>{
    if(event.key==='ArrowRight'||event.key==='ArrowLeft'){
      event.preventDefault();move(event.key==='ArrowRight'?1:-1);
    }
    if(event.key==='Home'||event.key==='End'){
      event.preventDefault();track.scrollTo({left:event.key==='Home'?0:track.scrollWidth,behavior:reduced.matches?'instant':'smooth'});
    }
  });
  track.addEventListener('scroll',update,{passive:true});
  window.addEventListener('resize',update);
  window.addEventListener('load',update);
  if('ResizeObserver'in window)new ResizeObserver(update).observe(track);
  update();
})();