/* Servidor estático mínimo para desarrollo (sin dependencias) */
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
let port = Number(process.env.PORT) || 5174;
const fixedPort = Boolean(process.env.PORT);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".ico": "image/x-icon"
};

const server = http.createServer((req, res) => {
  let urlPath;
  try {
    urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  } catch (_) {
    res.writeHead(400).end("Solicitud inválida");
    return;
  }

  const requested = path.normalize(urlPath === "/" ? "/index.html" : urlPath);
  const filePath = path.join(ROOT, requested);

  // Evitar rutas fuera del proyecto
  if (!filePath.startsWith(ROOT + path.sep) && filePath !== path.join(ROOT, "index.html")) {
    res.writeHead(403).end("Acceso denegado");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("No encontrado");
      return;
    }

    res.writeHead(200, {
      "Content-Type": MIME[path.extname(filePath).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-cache"
    });
    res.end(data);
  });
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE" && !fixedPort && port < 5184) {
    port += 1;
    server.listen(port, "127.0.0.1");
    return;
  }
  console.error(`No se pudo iniciar el servidor: ${err.message}`);
  process.exit(1);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`\n  ✔ PropinaWeb listo en http://localhost:${port}\n`);
});
