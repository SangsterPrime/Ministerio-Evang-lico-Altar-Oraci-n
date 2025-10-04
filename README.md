# Ministerio Evangelístico Altar Oración — Sitio Web

## Descripción
Sitio web informativo para un centro evangélico que ayuda a personas en situación de vulnerabilidad. Incluye secciones de Videos, Fotos y Voluntariado, además de botones de acción por WhatsApp para aportes económicos, pedidos de oración y aportes en mercadería.

## Estructura
- `index.html`: Portada con CTA y accesos a secciones.
- `pages/`
  - `videos/`: Lista de videos cargados desde `data/media.json`.
  - `photos/`: Galería de fotos cargadas desde `data/media.json`.
  - `volunteer/`: Formulario simple de voluntariado.
- `components/`
  - `header.html` y `footer.html`: Componentes reutilizables, cargados dinámicamente.
- `assets/`
  - `css/`: Estilos globales y por sección.
  - `js/`: Lógica de carga de componentes, videos y fotos.
  - `img/` y `video/`: Medios estáticos.
- `data/`
  - `media.json`: Fuente de datos para fotos y videos.
  - `volunteers.json`: Espacio para futuros datos.

## Ejecutar en local (recomendado)
Para que `fetch()` funcione al leer `data/media.json`, abre el proyecto con un servidor local. En Windows con PowerShell:

```powershell
# Opción 1: Python 3 instalado
python -m http.server 5500

# Opción 2: Node.js instalado (instala http-server si no lo tienes)
npm install -g http-server
http-server -p 5500
```

Luego navega a:
- http://localhost:5500/index.html

## Botones de WhatsApp
Los botones abren conversaciones a: +56 9 5948 4424 con mensajes prellenados.
- Aporte económico: `https://wa.me/56959484424?text=Hola%20quiero%20hacer%20un%20apoyo%20econ%C3%B3mico`
- Pedido de oración: `https://wa.me/56959484424?text=Hola%20necesito%20pedido%20de%20oraci%C3%B3n`
- Aporte en mercadería: `https://wa.me/56959484424?text=Hola%20quiero%20aportar%20mercader%C3%ADa%20y%20alimentos`

## Notas
- Ajusta textos, imágenes y videos en `data/media.json` y en `assets/img` / `assets/video` según tus recursos reales.
- Si publicas en un hosting, asegúrate de conservar la estructura de carpetas para que las rutas funcionen.