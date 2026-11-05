(() => {
'use strict';
const links = [...document.querySelectorAll('[data-project-photo]')];
const viewer = document.getElementById('project-photo-viewer');
if (!viewer || !links.length || typeof viewer.showModal !== 'function') return;
const image = document.getElementById('project-photo-large');
const caption = document.getElementById('project-photo-caption');
const count = document.getElementById('project-photo-count');
const previous = document.getElementById('project-photo-prev');
const next = document.getElementById('project-photo-next');
let current = 0, trigger = null, oldOverflow = '';
function render(index) {
 current = Math.max(0, Math.min(index, links.length - 1));
 const thumbnail = links[current].querySelector('img');
 image.src = links[current].href; image.alt = thumbnail.alt;
 caption.textContent = thumbnail.alt; count.textContent = (current + 1) + ' / ' + links.length;
 previous.disabled = current === 0; next.disabled = current === links.length - 1;
}
links.forEach((link,index) => link.addEventListener('click',event => {
 event.preventDefault(); trigger = link; render(index);
 oldOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden';
 viewer.showModal();
}));
document.getElementById('project-photo-close').addEventListener('click',()=>viewer.close());
previous.addEventListener('click',()=>render(current - 1));
next.addEventListener('click',()=>render(current + 1));
viewer.addEventListener('keydown',event=>{
 if(event.key === 'ArrowLeft'){event.preventDefault();render(current - 1);}
 if(event.key === 'ArrowRight'){event.preventDefault();render(current + 1);}
});
viewer.addEventListener('click',event=>{if(event.target===viewer){const r=viewer.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)viewer.close();}});
viewer.addEventListener('close',()=>{document.body.style.overflow=oldOverflow;image.removeAttribute('src');if(trigger)trigger.focus({preventScroll:true});});
new MutationObserver(()=>{if(viewer.open)render(current);}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();