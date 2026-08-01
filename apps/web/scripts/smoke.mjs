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
let total = 0;
const routes = entry.routes();
// Every route is rendered in every language: a missing translation or a message that a page
// formats with the wrong parameters only shows up in the language that has it.
for (const locale of entry.locales()) {
  for (const route of routes) {
    total += 1;
    try {
      const html = entry.render(route, locale);
      if (html.length < 200) throw new Error(`HTML is suspiciously short (${html.length} chars)`);
      console.log(`  ok   [${locale}] ${route}`);
    } catch (error) {
      failed += 1;
      console.error(`  FAIL [${locale}] ${route}\n       ${error.message}`);
    }
  }
}

await server.close();
console.log(`\n${total - failed}/${total} renders succeeded.`);
process.exit(failed > 0 ? 1 : 0);
