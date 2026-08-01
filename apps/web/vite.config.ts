import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages serves project sites under /<repo-name>/; override with BASE_PATH when needed.
const BASE_PATH = process.env.BASE_PATH ?? '/aws-ccp-study/';

/**
 * GitHub Pages has no SPA fallback: opening /review directly, or refreshing mid-exam,
 * lands on its 404 page. Copying index.html to 404.html makes Pages hand the app back
 * so the router can resolve the path itself.
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
  build: {
    rollupOptions: {
      output: {
        // Study material changes far more often than the dependencies. Splitting them apart
        // keeps the vendor chunk and the stylesheet cached in a returning learner's browser
        // when only markdown changed; the small entry chunk still rehashes because it holds
        // the other chunks' filenames.
        //
        // npm workspaces symlink @study/content, so Vite reports the real path under
        // packages/content rather than the package name.
        manualChunks(id) {
          const path = id.replace(/\\/g, '/');
          if (path.includes('/packages/content/') || path.includes('/@study/content/')) {
            return 'content';
          }
          if (path.includes('/node_modules/')) return 'vendor';
        },
      },
    },
  },
}));
