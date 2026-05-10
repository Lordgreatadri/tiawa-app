import path from 'path'
import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      // In dev, proxy these paths to the external API so the browser never makes a
      // cross-origin request (Node forwards server-to-server — no CORS restriction).
      '/requests': {
        target: 'https://api.tiawa.co',
        changeOrigin: true,
        secure: true,
      },
      '/reports': {
        target: 'https://api.tiawa.co',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: true,
  },
})