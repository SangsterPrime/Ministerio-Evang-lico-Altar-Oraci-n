// Carga header/footer y ajusta navegación en cualquier ruta (raíz o /pages/*)
(function () {
  // Asegurar Font Awesome global (evita duplicados y que no cargue antes de footer)
  (function ensureFontAwesome(){
    if (!document.querySelector('link[data-fa="true"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css';
      link.setAttribute('data-fa','true');
      document.head.appendChild(link);
      // Fallback si la fuente no carga en 3s
      setTimeout(() => {
        const testIcon = document.createElement('i');
        testIcon.className = 'fa-brands fa-facebook';
        testIcon.style.position='absolute';
        testIcon.style.opacity='0';
        document.body.appendChild(testIcon);
        const fam = getComputedStyle(testIcon).fontFamily || '';
        document.body.removeChild(testIcon);
        if (!/Font Awesome/i.test(fam)) {
          const alt = document.createElement('link');
          alt.rel='stylesheet';
            alt.href='https://kit-free.fontawesome.com/releases/latest/css/free.min.css';
          alt.setAttribute('data-fa-alt','true');
          document.head.appendChild(alt);
        }
      }, 3000);
    }
  })();

  const header = document.getElementById('header');
  const footer = document.getElementById('footer');

  // Base del sitio (hasta la raíz del repo o del dominio)
  const path = location.pathname;
  const idx = path.indexOf('/pages/');
  const base = idx >= 0 ? path.substring(0, idx + 1) : path.substring(0, path.lastIndexOf('/') + 1);

  const cacheBuster = 'v=20251008a';
  const headerUrl = base + 'components/header.html?' + cacheBuster;
  const footerUrl = base + 'components/footer.html?' + cacheBuster;

  const routes = {
    home: 'index.html',
    videos: 'pages/videos/',
    photos: 'pages/photos/',
    volunteer: 'pages/volunteer/'
  };

  const applyRoutes = () => {
    if (!header) return;
    header.querySelectorAll('a[data-route]').forEach(a => {
      const r = a.getAttribute('data-route');
      if (routes[r]) a.href = base + routes[r];
    });

    // Marcar activo según URL actual
    let current = 'home';
    if (path.includes('/pages/videos/')) current = 'videos';
    else if (path.includes('/pages/photos/')) current = 'photos';
    else if (path.includes('/pages/volunteer/')) current = 'volunteer';

    header.querySelectorAll('a[data-route]').forEach(a => {
      a.classList.toggle('active', a.getAttribute('data-route') === current);
    });
  };

  if (header) {
    fetch(headerUrl).then(r => r.text()).then(html => {
      header.innerHTML = html;
      applyRoutes();
    }).catch(() => {
      header.innerHTML = '<header class="site-header"><div class="container"><h1>Ministerio Evangelístico Altar Oración</h1></div></header>';
    });
  }

  if (footer) {
    fetch(footerUrl).then(r => r.text()).then(html => {
      footer.innerHTML = html;
    }).catch(() => {
      footer.innerHTML = '<footer class="site-footer"><div class="container"><p>Ministerio Evangelístico Altar Oración</p></div></footer>';
    });
  }

  // Utilidad WhatsApp
  window.buildWspLink = function (phone, text) {
    const cleanPhone = (phone || '').replace(/[^\d]/g, '');
    const msg = encodeURIComponent(text || 'Hola');
    return `https://wa.me/${cleanPhone}?text=${msg}`;
  };

  // Año dinámico en footer
  (function autoYear(){
    const yEl = document.querySelector('.site-footer [data-year]');
    if (yEl) yEl.textContent = new Date().getFullYear();
  })();
})();