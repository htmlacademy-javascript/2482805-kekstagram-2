import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://28.javascript.pages.academy',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
