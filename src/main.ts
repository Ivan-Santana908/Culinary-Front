import './assets/main.css'
import './assets/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// 1. Crear instancia de la app
const app = createApp(App)

// 2. Registrar plugins
app.use(createPinia())
app.use(router)

// 3. Montar en el DOM
app.mount('#app')
