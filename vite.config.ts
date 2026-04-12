import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    host: true, // Necesario para acceder desde otros dispositivos
    port: 5173,
    strictPort: true, // No intentar otros puertos si 5173 está ocupado
    hmr: {
      timeout: 5000, // Aumentar el timeout para conexiones lentas
      overlay: true, // Mostrar errores en overlay
    },
    watch: {
      usePolling: true, // Mejor compatibilidad en sistemas Windows
    },
    fs: {
      strict: false, // Permite acceder a archivos fuera del root
      allow: ['..'] // Permite acceder a archivos en el directorio padre
    }
  },
  preview: {
    port: 5173,
    strictPort: true,
  }
})
