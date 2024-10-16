import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

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
  plugins: [
    vue(),
    //  npm i vite-svg-loader -D --> Transforma o svg em um componente Vue. passando a flag ?component no import. Ex: export { default as IconCommentComponent } from './icon-comment.svg?component'
    svgLoader(),
  ],
  resolve: {
    alias: {
      // npm install @types/node --save-dev para pegar o alias __dirname
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      external: ['dayjs/locale/pt-br'],
    },
  },
  server: {
    port: 5172,
  },
})
