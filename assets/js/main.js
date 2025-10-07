// Carga header/footer y ajusta navegación en cualquier ruta (raíz o /pages/*)
(function () {
  const header = document.getElementById('header');
  const footer = document.getElementById('footer');

  // Base del sitio (hasta la raíz del repo o del dominio)
  const path = location.pathname;
  const idx = path.indexOf('/pages/');
  const base = idx >= 0 ? path.substring(0, idx + 1) : path.substring(0, path.lastIndexOf('/') + 1);

  const headerUrl = base + 'components/header.html';
  const footerUrl = base + 'components/footer.html';

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
    const current =
      path.includes('/pages/videos/') ? 'videos' :
      path.includes('/pages/photos/') ? 'photos' :
      path.includes('/pages/volunteer/') ? 'volunteer' : 'home';

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
})();