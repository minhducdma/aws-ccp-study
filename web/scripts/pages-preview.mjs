/**
 * Chạy thử bản build y như GitHub Pages: phục vụ dist/ dưới tiền tố /<repo>/ và
 * trả về 404.html cho mọi đường dẫn không phải file tĩnh.
 * Dùng để kiểm tra base path và deep link trước khi deploy: node scripts/pages-preview.mjs
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';

const BASE = process.env.BASE_PATH ?? '/aws-ccp-study/';
const PORT = Number(process.env.PORT ?? 4173);
const DIST = resolve(import.meta.dirname, '..', 'dist');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
};

const server = createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);

  if (!path.startsWith(BASE)) {
    res.writeHead(404, { 'content-type': 'text/plain' }).end('Ngoai base path');
    return;
  }

  const relative = normalize(path.slice(BASE.length)).replace(/^(\.\.[/\\])+/, '');
  const target = relative === '' || relative === '.' ? 'index.html' : relative;
  try {
    const body = await readFile(join(DIST, target));
    res.writeHead(200, { 'content-type': MIME[extname(target)] ?? 'application/octet-stream' }).end(body);
  } catch {
    // GitHub Pages tra ve 404.html cho duong dan khong ton tai; SPA tu dinh tuyen lai.
    res.writeHead(404, { 'content-type': MIME['.html'] }).end(await readFile(join(DIST, '404.html')));
  }
});

server.listen(PORT, () => console.log(`http://localhost:${PORT}${BASE}`));
