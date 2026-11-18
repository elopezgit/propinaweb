# propinaweb

Restaurante Hostería Atahualpa Yupanqui · Reseñas y propinas

Web app única para todo el equipo del restaurante: sin perfiles individuales ni fotos de personas. Muestra la identidad de la Hostería Municipal Atahualpa Yupanqui, el acceso directo a Google Review y los alias para dejar una propina.

## Verla

```bash
npm run dev
```

Luego entrar en `http://localhost:5174`. El servidor es propio y no requiere instalar dependencias (`npm install` no es necesario). Para usar otro puerto: `PORT=3000 npm run dev`. Si el puerto está ocupado, se prueba automáticamente con el siguiente.

También se puede abrir `index.html` directamente, aunque el portapapeles funciona mejor sirviendo por HTTP.

## Personalizar

Toda la información editable está en el objeto `SITE` de `app.js`:

```js
const SITE = {
  reviewUrl: "https://search.google.com/local/writereview?placeid=ChIJw2920SxmIpQRyMtGK3Bvzdc",
  reviewHint: "Hostería Atahualpa Yupanqui · Tafí Viejo",
  thanks: "¡Gracias por acompañarnos!",
  aliases: [
    { label: "Mercado Pago · equipo", value: "restaurante.atahualpa.mp", brand: "mp", tint: "#e8e9ff", ink: "#1e2a4a" },
    { label: "Nequi · equipo", value: "restaurante.atahualpa.nx", brand: "nequi", tint: "#fff0e2", ink: "#3a2114" }
  ]
};
```

- **Alias:** reemplazar `restaurante.atahualpa.mp` y `restaurante.atahualpa.nx` por los alias reales del equipo.
- **Logos disponibles:** `mp`, `nequi` y `generic`.
- **Colores de cada alias:** `tint` (fondo) e `ink` (texto).
- **Textos del lugar:** título, subtítulo, etiquetas y pie de página están en `index.html`.

## Comportamiento

- Tocar una tarjeta de alias copia el valor y muestra una confirmación; el icono cambia a ✔. Si el navegador bloquea la copia, se selecciona el alias para copiarlo manualmente.
- "Dejá tu reseña del restaurante" abre directamente el formulario de Google Review del hotel en una pestaña nueva.
- Diseño adaptable con áreas seguras para notch, soporte para `prefers-reduced-motion` y navegación por teclado.

## Archivos

- `index.html` — estructura y textos del restaurante.
- `styles.css` — diseño, fondo difuminado, animaciones y responsive.
- `app.js` — configuración, render de alias y copia al portapapeles.
- `server.js` — servidor de desarrollo usado por `npm run dev`.
- `package.json` — scripts del proyecto.
- `assets/escudo-municipalidad.png` — escudo de la Municipalidad de Tafí Viejo.
- `assets/logo-hosteria.png` — logo oficial de la Hostería Atahualpa Yupanqui.
- `assets/hosteria.jpg` — foto de la hostería usada como fondo difuminado.
