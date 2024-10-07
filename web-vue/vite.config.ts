import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  css: {
    // Caso não queria criar o arquivo postcss.config.js para processar o tailwindCss:
    /*
      export default {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      }
    */
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      // npm install @types/node --save-dev para pegar o alias __dirname
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
})
