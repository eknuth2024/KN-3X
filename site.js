
    const container = document.getElementById('compareContainer');
    const overlay = document.getElementById('compareOverlay');
    const handle = document.getElementById('compareHandle');
    const beforeImg = document.getElementById('beforeImg');

    function syncImgWidth() {
      if (container && beforeImg) {
        beforeImg.style.width = `${container.offsetWidth}px`;
      }
    }
    window.addEventListener('resize', syncImgWidth);
    syncImgWidth();

    let isDown = false;
    function moveSlider(clientX) {
      const rect = container.getBoundingClientRect();
      let pos = clientX - rect.left;
      if (pos < 0) pos = 0;
      if (pos > rect.width) pos = rect.width;
      const percentage = (pos / rect.width) * 100;
      overlay.style.width = percentage + '%';
      handle.style.left = percentage + '%';
    }

    container?.addEventListener('mousedown', () => isDown = true);
    window.addEventListener('mouseup', () => isDown = false);
    container?.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      moveSlider(e.clientX);
    });

    container?.addEventListener('touchstart', () => isDown = true);
    window.addEventListener('touchend', () => isDown = false);
    container?.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      moveSlider(e.touches[0].clientX);
    });

    function openEstimateModal() {
      document.getElementById('estimateModal').classList.remove('hidden');
    }
    function closeEstimateModal() {
      document.getElementById('estimateModal').classList.add('hidden');
    }

    function requestSpecificService(serviceName) {
      document.getElementById('modalService').value = serviceName;
      openEstimateModal();
    }

    function handleSearch(e) {
      e.preventDefault();
      const service = document.getElementById('hero-service-select').value;
      const zip = document.getElementById('hero-zip').value;
      document.getElementById('modalService').value = service;
      document.getElementById('modalZip').value = zip;
      openEstimateModal();
    }



    // Native POST lets Formspree handle verification and confirmation.
    ['handymanForm', 'estimateForm'].forEach(id => {
      document.getElementById(id)?.addEventListener('submit', event => {
        event.currentTarget.elements.namedItem('Language').value = document.documentElement.lang;
      });
    });
  
/* Independent Handyman contact menu; no estimate form submission. */
(()=>{
 const labels={"tv":{"en":"TV Wall Mount Installation","es":"Instalación de soportes de pared para televisores"},"doors":{"en":"Doors & Cabinet Adjustments","es":"Ajustes de puertas y gabinetes"},"furniture":{"en":"Furniture Assembly","es":"Armado de muebles"},"mounting":{"en":"Shelves, Curtains & Wall Accessories","es":"Repisas, cortinas y accesorios de pared"},"drywall":{"en":"Drywall Patches & Paint Touch-ups","es":"Parches de drywall y retoques de pintura"},"caulk":{"en":"Caulking & Weatherstripping","es":"Sellado de juntas y burletes"},"other":{"en":"Home Repair Checklist & More","es":"Lista de reparaciones del hogar y más"}};
 const menu=document.querySelector('.handyman-menu');
 if(!menu)return;
 const contact=menu.querySelector('.handyman-contact');
 const selected=menu.querySelector('.handyman-selected');
 const sms=menu.querySelector('.handyman-sms');
 let task=null;
 function refresh(){
  if(!task)return;
  const es=document.documentElement.lang==='es';
  const label=labels[task][es?'es':'en'];
  selected.textContent=label;
  const message=es?'Hola, me interesa el servicio de Handyman: '+label+'.':'Hello, I am interested in Handyman service: '+label+'.';
  const ios=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  sms.href='sms:+15129993239'+(ios?'&':'?')+'body='+encodeURIComponent(message);
 }
 menu.querySelectorAll('[data-handyman-task]').forEach(button=>button.addEventListener('click',()=>{
  task=button.dataset.handymanTask;
  menu.querySelectorAll('[data-handyman-task]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  contact.hidden=false;refresh();
  contact.scrollIntoView({block:'nearest',behavior:'smooth'});
 }));
 new MutationObserver(refresh).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 document.addEventListener('click',event=>{if(menu.open&&!menu.contains(event.target))menu.open=false;});
 menu.addEventListener('keydown',event=>{if(event.key==='Escape'){menu.open=false;menu.querySelector('summary').focus();}});
})();
