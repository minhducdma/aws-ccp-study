import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Firebase Hosting serves the site from the domain root; override with BASE_PATH
// only if you ever host this app under a sub-path.
const BASE_PATH = process.env.BASE_PATH ?? '/';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? BASE_PATH : '/',
  plugins: [react(), tailwindcss()],
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
