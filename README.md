# Ministerio Evangelístico Altar Oración — Sitio web

## Descripción
Sitio web informativo del ministerio que brinda apoyo espiritual y material a personas en situación de vulnerabilidad. Incluye secciones de Videos, Fotos y Voluntariado, más botones de acción por WhatsApp para aportes económicos, pedidos de oración y aportes en mercadería.

## Estructura
- `index.html`: Portada con llamados a la acción (CTA) y accesos a secciones.
- `pages/`
  - `videos/`: Lista de videos desde `data/media.json`.
  - `photos/`: Galería de fotos desde `data/media.json`.
  - `volunteer/`: Formulario simple de voluntariado.
- `components/`
  - `header.html` y `footer.html`: Componentes reutilizables, cargados dinámicamente.
- `assets/`
  - `css/`: Estilos globales y por sección.
  - `js/`: Lógica para cargar componentes, videos y fotos.
  - `imgs/` y `videos/`: Medios estáticos usados por el sitio.
- `data/`
  - `media.json`: Fuente de datos para fotos y videos.
  - `volunteers.json`: Espacio para futuros datos.

## Ejecución en local
Para que `fetch()` funcione al leer archivos de `data/`, usa un servidor local. En Windows (PowerShell):

```powershell
# Opción 1: con Python 3
python -m http.server 5500

# Opción 2: con Node.js (instala http-server si no lo tienes)
npm install -g http-server
http-server -p 5500
```

Luego abre:
- http://localhost:5500/index.html

## Botones de WhatsApp
Se abre conversación a +56 9 5948 4424 con mensajes prellenados:
- Aporte económico: https://wa.me/56959484424?text=Quiero%20hacer%20un%20aporte%20econ%C3%B3mico
- Pedido de oración: https://wa.me/56959484424?text=Quiero%20hacer%20un%20pedido%20de%20oraci%C3%B3n
- Aporte en mercadería: https://wa.me/56959484424?text=Quiero%20aportar%20mercader%C3%ADa

## Notas
- Ajusta textos, imágenes y videos en `data/media.json` y en `assets/imgs` / `assets/videos` según tus recursos reales.
- Si publicas en un hosting, conserva la estructura de carpetas para que las rutas funcionen.