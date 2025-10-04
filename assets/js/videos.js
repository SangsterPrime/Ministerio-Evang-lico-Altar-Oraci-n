// This file contains JavaScript specific to the videos section, possibly handling video playback and interactions.

document.addEventListener('DOMContentLoaded', function() {
    const videoList = document.getElementById('video-list');
        if (!videoList) { return; }

    // Desde /pages/videos/ -> data vivirá en ../../data/media.json
        fetch('../../data/media.json')
            .then(response => response.json())
            .then(data => {
                const row = document.createElement('div');
                row.className = 'row g-3';

                (data.videos || []).forEach(video => {
                    const col = document.createElement('div');
                    col.className = 'col-12 col-md-6 col-lg-4';

                    const card = document.createElement('div');
                    card.className = 'card h-100 shadow-sm';

                    // Miniatura si existe
                    if (video.thumbnail) {
                        const img = document.createElement('img');
                        img.src = `../../${video.thumbnail}`;
                        img.alt = `Miniatura de ${video.title}`;
                        img.className = 'card-img-top';
                        img.loading = 'lazy';
                        img.style.cursor = 'pointer';
                        img.addEventListener('click', () => openInModal(`../../${video.url}`));
                        card.appendChild(img);
                    }

                    const body = document.createElement('div');
                    body.className = 'card-body';
                    const title = document.createElement('h5');
                    title.className = 'card-title';
                    title.textContent = video.title;
                    const desc = document.createElement('p');
                    desc.className = 'card-text';
                    desc.textContent = video.description || '';

                // Contenedor con proporción 16:9
                const ratio = document.createElement('div');
                ratio.className = 'ratio ratio-16x9 mb-2';
                const player = document.createElement('video');
                player.src = `../../${video.url}`;
                player.controls = true;
                player.preload = 'metadata';
                player.className = 'w-100 h-100 rounded';
                ratio.appendChild(player);

                body.appendChild(title);
                body.appendChild(desc);
                body.appendChild(ratio);

                // Botón para reproducir en modal
                const playBtn = document.createElement('button');
                playBtn.className = 'btn btn-outline-primary btn-sm';
                playBtn.textContent = 'Reproducir en grande';
                playBtn.addEventListener('click', () => openInModal(`../../${video.url}`));
                body.appendChild(playBtn);
                    card.appendChild(body);
                    col.appendChild(card);
                    row.appendChild(col);
                });

                videoList.appendChild(row);
            })
            .catch(error => {
                console.error('Error cargando videos:', error);
                videoList.innerHTML = '<p>No fue posible cargar los videos.</p>';
            });
});

function openInModal(src) {
    const modalEl = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    if (!modalEl || !modalVideo) return;

    modalVideo.src = src + '#t=0.1'; // pequeño offset para asegurar preload
    const modal = new bootstrap.Modal(modalEl);
    modal.show();

    modalEl.addEventListener('hidden.bs.modal', () => {
        modalVideo.pause();
        modalVideo.currentTime = 0;
        modalVideo.removeAttribute('src');
    }, { once: true });
}