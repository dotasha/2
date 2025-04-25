import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/roblox-pwn/',
  server: {
    port: 5173,
    host: true,
    hmr: {
      overlay: false
    }
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    outDir: 'dist'
  }
});