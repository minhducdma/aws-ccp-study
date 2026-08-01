/**
 * Previews the build the way Firebase Hosting serves it: dist/ mounted at the domain
 * root, with index.html returned for any path that is not a static file (matching the
 * SPA rewrite in firebase.json).
 * Use it to check deep links before deploying:
 *   node scripts/pages-preview.mjs
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';

const BASE = process.env.BASE_PATH ?? '/';
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
    res.writeHead(404, { 'content-type': 'text/plain' }).end('Outside the base path');
    return;
  }

  const relative = normalize(path.slice(BASE.length)).replace(/^(\.\.[/\\])+/, '');
  const target = relative === '' || relative === '.' ? 'index.html' : relative;
  try {
    const body = await readFile(join(DIST, target));
    res.writeHead(200, { 'content-type': MIME[extname(target)] ?? 'application/octet-stream' }).end(body);
  } catch {
    // Firebase Hosting's rewrite sends unknown paths to index.html; the SPA then routes itself.
    res.writeHead(200, { 'content-type': MIME['.html'] }).end(await readFile(join(DIST, 'index.html')));
  }
});

server.listen(PORT, () => console.log(`http://localhost:${PORT}${BASE}`));
