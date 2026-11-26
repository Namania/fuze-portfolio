import { copyFileSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig, type Plugin } from 'vite'

const spaFallback = (): Plugin => ({
  name: 'spa-fallback',
  apply: 'build',
  closeBundle() {
    copyFileSync('dist/index.html', 'dist/404.html')
  },
})

export default defineConfig({
  base: '/fuze-portfolio/',
  plugins: [vue(), spaFallback()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    watch: {
      usePolling: process.env.WATCH_POLLING === 'true',
    },
  },
})
