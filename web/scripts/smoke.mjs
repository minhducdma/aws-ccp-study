// Render từng route bằng SSR để bắt lỗi runtime trong component mà typecheck không thấy.
import { createServer } from 'vite';

// localStorage không tồn tại trong Node — cấp một bản giả để lib/progress hoạt động.
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
    if (html.length < 200) throw new Error(`HTML quá ngắn (${html.length} ký tự)`);
    console.log(`  ok   ${route}`);
  } catch (error) {
    failed += 1;
    console.error(`  FAIL ${route}\n       ${error.message}`);
  }
}

await server.close();
console.log(`\n${routes.length - failed}/${routes.length} route render thành công.`);
process.exit(failed > 0 ? 1 : 0);
