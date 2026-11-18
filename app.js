/* ================================================================
   Configuración única del restaurante de la hostería (sin perfiles individuales).
   Reemplazá los alias por los reales del equipo cuando los tengas.
   ================================================================ */
const SITE = {
  reviewUrl: "https://search.google.com/local/writereview?placeid=ChIJw2920SxmIpQRyMtGK3Bvzdc",
  reviewHint: "Hostería Atahualpa Yupanqui · Tafí Viejo",
  thanks: "¡Gracias por acompañarnos!",
  aliases: [
    {
      label: "Mercado Pago · equipo",
      value: "restaurante.atahualpa.mp",
      brand: "mp",
      tint: "#e8e9ff",
      ink: "#1e2a4a"
    },
    {
      label: "Nequi · equipo",
      value: "restaurante.atahualpa.nx",
      brand: "nequi",
      tint: "#fff0e2",
      ink: "#3a2114"
    }
  ]
};

/* Logotipos de proveedores (SVG inline, sin dependencias externas) */
const LOGOS = {
  mp: `
    <svg viewBox="0 0 48 48" role="img" aria-label="Mercado Pago">
      <circle cx="24" cy="24" r="22" fill="#009EE3"/>
      <text x="24" y="31" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" letter-spacing="-1" fill="#fff">mp</text>
    </svg>`,
  nequi: `
    <svg viewBox="0 0 48 48" role="img" aria-label="Nequi">
      <defs><linearGradient id="nq" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#F26A21"/><stop offset="1" stop-color="#9B2D9E"/>
      </linearGradient></defs>
      <path d="M10 36V12h5.6l16.8 15.4V12H38v24h-5.5L15.7 20.8V36H10Z" fill="url(#nq)"/>
    </svg>`,
  generic: `
    <svg viewBox="0 0 48 48" role="img" aria-label="Transferencia">
      <circle cx="24" cy="24" r="21" fill="#4C6FFF"/>
      <path d="M15 24h18m-6-6 6 6-6 6" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
};

const ICONS = {
  copy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="9" y="9" width="11" height="11" rx="2.5"/><path d="M5 15H4.5A1.5 1.5 0 0 1 3 13.5v-9A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5V5"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 13 4 4L19 7"/></svg>`
};

const $ = (id) => document.getElementById(id);

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

function render() {
  const review = $("reviewBtn");
  review.href = SITE.reviewUrl;
  $("reviewHint").textContent = SITE.reviewHint;
  $("thanksText").textContent = SITE.thanks;
  document.title = "Restaurante Hostería Atahualpa Yupanqui · Reseñas y propinas";

  const list = $("aliases");
  list.replaceChildren();
  SITE.aliases.forEach((alias) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "alias";
    btn.style.setProperty("--tint", alias.tint || "#e8e9ff");
    btn.style.setProperty("--tint-ink", alias.ink || "#1e2a4a");
    btn.setAttribute("aria-label", `Copiar alias ${alias.value}`);
    btn.innerHTML = `
      <span class="alias__logo">${LOGOS[alias.brand] || LOGOS.generic}</span>
      <span class="alias__info">
        <span class="alias__label">${escapeHtml(alias.label)}</span>
        <span class="alias__value">${escapeHtml(alias.value).replace(".", ".<wbr>")}</span>
      </span>
      <span class="alias__copy" data-copy>${ICONS.copy}</span>`;
    btn.addEventListener("click", () => copyAlias(alias.value, btn));
    list.appendChild(btn);
  });
}

async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (_) { /* se usa el método alternativo */ }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.cssText = "position:fixed;top:0;left:0;opacity:0;pointer-events:none";
  document.body.appendChild(textarea);
  textarea.select();
  let ok = false;
  try { ok = document.execCommand("copy"); } catch (_) { ok = false; }
  textarea.remove();
  return ok;
}

function selectAliasText(button) {
  const node = button.querySelector(".alias__value");
  if (!node || !window.getSelection) return;
  const range = document.createRange();
  range.selectNodeContents(node);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}

let toastTimer;
function showToast(message) {
  const toast = $("toast");
  toast.innerHTML = `${ICONS.check}<span>${escapeHtml(message)}</span>`;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

async function copyAlias(value, button) {
  const ok = await copyText(value);
  if (!ok) {
    selectAliasText(button);
    showToast("Seleccioná y copiá el alias");
    return;
  }

  const iconSlot = button.querySelector("[data-copy]");
  iconSlot.innerHTML = ICONS.check;
  button.classList.add("is-copied");
  showToast(`Alias copiado: ${value}`);
  setTimeout(() => {
    iconSlot.innerHTML = ICONS.copy;
    button.classList.remove("is-copied");
  }, 1800);
}

render();
