import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages phục vụ project site tại /<tên-repo>/, đặt qua biến BASE_PATH khi cần đổi.
const BASE_PATH = process.env.BASE_PATH ?? '/aws-ccp-study/';

/**
 * GitHub Pages không có SPA fallback: mở thẳng /review hay F5 giữa bài thi sẽ ra trang 404.
 * Nhân bản index.html thành 404.html để Pages trả về đúng app, rồi router tự xử lý đường dẫn.
 */
function spaFallback(): Plugin {
  return {
    name: 'spa-fallback-404',
    apply: 'build',
    closeBundle() {
      const dist = resolve(import.meta.dirname, 'dist');
      copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'));
    },
  };
}

export default defineConfig(({ command }) => ({
  base: command === 'build' ? BASE_PATH : '/',
  plugins: [react(), tailwindcss(), spaFallback()],
  server: { port: 5180, open: true },
}));
