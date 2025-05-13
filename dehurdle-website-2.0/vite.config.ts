import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsConfigPaths from 'vite-tsconfig-paths';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',
  },
  esbuild: {
    ...(process.env.NODE_ENV === 'production' && {
      drop: ['console', 'debugger'],
    }),
  },
  plugins: [
    svgr({
      esbuildOptions: {},
      include: '**/*.svg',
      exclude: '',
    }),
    tsConfigPaths(),
    react(),
  ],
  server: {
    port: 8080,
    open: true,
  },
});
