import { defineConfig } from 'vite';

export default defineConfig({
  base: '/TaskDoro',
  root: '.',
  build: {
    outDir: 'dist',
  },
  server: {
    open: true,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
