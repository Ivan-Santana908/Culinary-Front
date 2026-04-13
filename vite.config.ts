import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico'],
      manifest: {
        name: 'CulinarySmart',
        short_name: 'CulinarySmart',
        description: 'Recetas personalizadas segun tu despensa',
        theme_color: '#d97706',
        background_color: '#fffbeb',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/favicon.ico',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'external-assets',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7
              }
            }
          }
        ]
      }
    })
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
