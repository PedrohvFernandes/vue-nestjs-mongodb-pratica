import { createApp } from 'vue'
import './assets/index.css'
import App from './app.vue'
import { router } from './routes'

const app = createApp(App)

// Passando para o app a instância do router, com isso o app terá acesso a todas as rotas
app.use(router)
app.mount('#app')
