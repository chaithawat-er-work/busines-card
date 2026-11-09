import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
const routes = JSON.parse(await readFile(".next/routes-manifest.json", "utf8").catch(() => "{}"));
const mount = routes.basePath ?? "";
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".txt": "text/plain; charset=utf-8", ".json": "application/json" };
await stat(path.join(root, "index.html"));
http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    if (mount && (pathname === "/" || pathname === mount)) {
      response.writeHead(302, { Location: `${mount}/` }).end(); return;
    }
    if (mount && !pathname.startsWith(`${mount}/`)) { response.writeHead(404).end("Not found"); return; }
    const relativePath = pathname.slice(mount.length);
    let filename = path.resolve(root, `.${relativePath}`);
    if (filename !== root && !filename.startsWith(root + path.sep)) { response.writeHead(403).end(); return; }
    if ((await stat(filename)).isDirectory()) filename = path.join(filename, "index.html");
    const content = await readFile(filename);
    response.writeHead(200, { "Content-Type": types[path.extname(filename)] ?? "application/octet-stream", "X-Content-Type-Options": "nosniff" });
    response.end(content);
  } catch { response.writeHead(404, { "Content-Type": "text/plain" }).end("Not found"); }
}).listen(3000, "127.0.0.1", () => console.log(`Local: http://127.0.0.1:3000${mount}/`));
