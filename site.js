
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
  