document.addEventListener('DOMContentLoaded', () => {
		const grid = document.getElementById('gallery-grid');
		if (!grid) return;

	// calcular ruta de datos desde /pages/photos/
	const dataPath = '../../data/media.json';

	fetch(dataPath)
		.then(r => r.json())
			.then(data => {
				const row = document.createElement('div');
				row.className = 'row g-3';

				(data.photos || []).forEach(photo => {
					const col = document.createElement('div');
					col.className = 'col-6 col-md-4 col-lg-3';

					const card = document.createElement('div');
					card.className = 'card h-100 shadow-sm';

					const img = document.createElement('img');
					img.src = `../../${photo.url}`;
					img.alt = photo.title || 'Foto';
					img.className = 'card-img-top';
					img.loading = 'lazy';
							img.style.cursor = 'zoom-in';
							img.addEventListener('click', () => {
								const modalImg = document.getElementById('photoModalImg');
								if (modalImg) {
									modalImg.src = img.src;
									const modal = new bootstrap.Modal(document.getElementById('photoModal'));
									modal.show();
								}
							});

					const body = document.createElement('div');
					body.className = 'card-body';
					const title = document.createElement('h6');
					title.className = 'card-title';
					title.textContent = photo.title || '';
					const desc = document.createElement('p');
					desc.className = 'card-text small text-muted';
					desc.textContent = photo.description || '';

					body.appendChild(title);
					body.appendChild(desc);
					card.appendChild(img);
					card.appendChild(body);
					col.appendChild(card);
					row.appendChild(col);
				});

				grid.appendChild(row);
			})
		.catch(err => {
			console.error('Error cargando fotos:', err);
			grid.innerHTML = '<p>No fue posible cargar las fotos.</p>';
		});
});