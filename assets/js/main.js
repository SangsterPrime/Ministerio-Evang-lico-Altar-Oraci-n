// Carga de componentes (header y footer) y utilidades básicas
(function loadComponents() {
	const header = document.getElementById('header');
	const footer = document.getElementById('footer');
	// base: antes de /pages/... o raíz
	const path = window.location.pathname;
	const idx = path.indexOf('/pages/');
	const base = idx >= 0 ? path.substring(0, idx + 1) : path.substring(0, path.lastIndexOf('/') + 1);
	const headerUrl = base + 'components/header.html';
	const footerUrl = base + 'components/footer.html';

	// Reescribe enlaces absolutos del header para que funcionen en GitHub Pages (subruta del repo)
	function fixHeaderLinks(container) {
		try {
			const anchors = container.querySelectorAll('a[href^="/"]');
			anchors.forEach(a => {
				const href = a.getAttribute('href');
				// Evitar reescritura de URLs absolutas con protocolo (no aplicaría por ^="/") y de enlaces externos
				if (href?.startsWith('/')) {
					// base termina con '/', quitamos el primer '/' del href
					a.setAttribute('href', base + href.slice(1));
				}
			});
		} catch (e) {
			console.warn('No se pudieron ajustar los enlaces del header:', e);
		}
	}

	if (header) {
		fetch(headerUrl)
			.then(r => r.text())
			.then(html => {
				header.innerHTML = html;
				fixHeaderLinks(header);
			})
			.catch(() => { header.innerHTML = '<header class="site-header"><div class="container"><h1>Bienvenido al Ministerio Evangelístico Altar Oración</h1></div></header>'; });
	}
	if (footer) {
		fetch(footerUrl)
			.then(r => r.text())
			.then(html => { footer.innerHTML = html; })
			.catch(() => { footer.innerHTML = '<footer class="site-footer"><div class="container"><p>Ministerio Evangelístico Altar Oración</p></div></footer>'; });
	}
})();

// Helper para construir links de WhatsApp con mensaje prellenado
window.buildWspLink = function(phone, text) {
	const cleanPhone = phone.replace(/[^\d]/g, '');
	const msg = encodeURIComponent(text || 'Hola');
	return `https://wa.me/${cleanPhone}?text=${msg}`;
}