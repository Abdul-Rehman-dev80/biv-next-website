// Minimal static server for previewing the ./out export locally (and for the
// Playwright tests). It mimics the Apache setup: directory URLs serve
// index.html, missing files serve 404.html with a 404 status, and
// /about-us is redirected to /about-us/. It does not run PHP.
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";

const root = path.resolve(process.argv[2] ?? "out");
const port = Number(process.env.PORT ?? 3000);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

async function isFile(p) {
  return (await stat(p).catch(() => null))?.isFile() ?? false;
}

createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");
  const pathname = decodeURIComponent(url.pathname);
  const target = path.join(root, pathname);
  if (!target.startsWith(root)) {
    res.writeHead(400).end();
    return;
  }
  let file = target;
  if (pathname.endsWith("/")) file = path.join(target, "index.html");
  else if (!(await isFile(target)) && (await isFile(path.join(target, "index.html")))) {
    res.writeHead(301, { Location: `${pathname}/${url.search}` }).end();
    return;
  }
  let status = 200;
  if (!(await isFile(file))) {
    status = 404;
    file = path.join(root, "404.html");
  }
  const { size } = await stat(file);
  res.writeHead(status, {
    "Content-Type": types[path.extname(file)] ?? "application/octet-stream",
    "Content-Length": size,
  });
  if (req.method === "HEAD") res.end();
  else createReadStream(file).pipe(res);
}).listen(port, () => console.log(`Serving ${root} on http://localhost:${port}`));
