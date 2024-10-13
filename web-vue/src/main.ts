import { createApp } from 'vue'
import './assets/index.css'
import App from './app.vue'
import { router } from './routes'
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)

app.use(VueQueryPlugin)
// Passando para o app a instância do router, com isso o app terá acesso a todas as rotas
app.use(router)
app.mount('#app')
