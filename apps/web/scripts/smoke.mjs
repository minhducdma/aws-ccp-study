// Renders every route through SSR to catch component runtime errors that typechecking misses.
import { createServer } from 'vite';

// Node has no localStorage, so provide a stub to keep lib/progress working.
const store = new Map();
globalThis.localStorage = {
  getItem: (k) => store.get(k) ?? null,
  setItem: (k, v) => store.set(k, v),
  removeItem: (k) => store.delete(k),
};

const server = await createServer({ server: { middlewareMode: true }, logLevel: 'warn' });
const entry = await server.ssrLoadModule('/scripts/smoke-entry.tsx');

let failed = 0;
const routes = entry.routes();
for (const route of routes) {
  try {
    const html = entry.render(route);
    if (html.length < 200) throw new Error(`HTML is suspiciously short (${html.length} chars)`);
    console.log(`  ok   ${route}`);
  } catch (error) {
    failed += 1;
    console.error(`  FAIL ${route}\n       ${error.message}`);
  }
}

await server.close();
console.log(`\n${routes.length - failed}/${routes.length} routes rendered successfully.`);
process.exit(failed > 0 ? 1 : 0);
