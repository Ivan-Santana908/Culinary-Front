<template>
  <DefaultLayout>
    <div class="min-h-[calc(100vh-10rem)] flex">
      <!-- Panel izquierdo -->
      <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-700 opacity-95"></div>
        <div class="relative z-10 p-12 flex flex-col justify-center text-white">
          <div class="animate-slideUp">
            <h2 class="text-4xl font-bold mb-6 drop-shadow-lg">Bienvenido a Culinary Smart</h2>
            <p class="text-xl mb-12 text-white drop-shadow">Descubre un mundo de sabores y aprende nuevas recetas</p>
            
            <div class="grid grid-cols-2 gap-6">
              <div class="bg-amber-800/30 shadow-lg backdrop-blur-sm rounded-xl p-6 hover:bg-amber-700/40 transition-all duration-300 cursor-pointer border border-amber-200/20">
                <div class="text-4xl mb-4 drop-shadow-md">🥘</div>
                <h3 class="text-lg font-semibold mb-2 text-amber-100 drop-shadow">Recetas Personalizadas</h3>
                <p class="text-sm text-amber-50/90">Adaptadas a tus preferencias y necesidades nutricionales</p>
              </div>
              
              <div class="bg-amber-800/30 shadow-lg backdrop-blur-sm rounded-xl p-6 hover:bg-amber-700/40 transition-all duration-300 cursor-pointer border border-amber-200/20">
                <div class="text-4xl mb-4 drop-shadow-md">📝</div>
                <h3 class="text-lg font-semibold mb-2 text-amber-100 drop-shadow">Plan Semanal</h3>
                <p class="text-sm text-amber-50/90">Organiza tus comidas de manera eficiente y saludable</p>
              </div>
              
              <div class="bg-amber-800/30 shadow-lg backdrop-blur-sm rounded-xl p-6 hover:bg-amber-700/40 transition-all duration-300 cursor-pointer border border-amber-200/20">
                <div class="text-4xl mb-4 drop-shadow-md">🏆</div>
                <h3 class="text-lg font-semibold mb-2 text-amber-100 drop-shadow">Logros Culinarios</h3>
                <p class="text-sm text-amber-50/90">Mejora tus habilidades y gana reconocimientos</p>
              </div>
              
              <div class="bg-amber-800/30 shadow-lg backdrop-blur-sm rounded-xl p-6 hover:bg-amber-700/40 transition-all duration-300 cursor-pointer border border-amber-200/20">
                <div class="text-4xl mb-4 drop-shadow-md">👥</div>
                <h3 class="text-lg font-semibold mb-2 text-amber-100 drop-shadow">Comunidad Activa</h3>
                <p class="text-sm text-amber-50/90">Comparte y aprende con otros chefs apasionados</p>
              </div>
            </div>
          </div>

          <!-- Patrón decorativo -->
          <div class="absolute inset-0 opacity-10 pattern-food mix-blend-overlay"></div>
        </div>
      </div>

      <!-- Formulario de login -->
      <div class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div class="w-full max-w-md space-y-8 animate-fadeIn">
          <div class="text-center">
            <div class="flex justify-center mb-6">
              <div class="relative w-24 h-24">
                <div class="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-700 rounded-full animate-pulse"></div>
                <div class="absolute inset-1 bg-white rounded-full flex items-center justify-center">
                  <span class="text-4xl">👨‍🍳</span>
                </div>
              </div>
            </div>
            
            <h1 class="text-3xl font-bold text-gray-900 mb-2">¡Bienvenido de nuevo!</h1>
            <p class="text-gray-600">Inicia sesión para continuar tu viaje culinario</p>
          </div>

          <form @submit.prevent="login" class="mt-8 space-y-6">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    v-model="email"
                    required
                    autocomplete="username"
                    class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg transition-all duration-200 outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    :class="{ 'border-red-300 focus:ring-red-500': errorMessage }"
                    placeholder="tu@email.com"
                    :disabled="loading"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    v-model="password"
                    required
                    autocomplete="current-password"
                    class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg transition-all duration-200 outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    :class="{ 'border-red-300 focus:ring-red-500': errorMessage }"
                    placeholder="••••••••"
                    :disabled="loading"
                  />
                </div>
              </div>
            </div>

            <!-- Mensaje de error -->
            <div v-if="errorMessage" class="rounded-lg p-4 bg-red-50 flex items-start">
              <svg class="h-5 w-5 text-red-400 mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              <p class="text-sm text-red-700">{{ errorMessage }}</p>
            </div>

            <div>
              <button
                type="submit"
                :disabled="loading"
                class="w-full px-6 py-2 flex justify-center items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-700 text-white font-medium rounded-lg transition-all duration-200 hover:from-amber-600 hover:to-orange-800 focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                <span v-if="!loading">Iniciar sesión</span>
                <svg
                  v-else
                  class="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </button>
            </div>

            <div class="flex items-center justify-between text-sm mt-6">
              <router-link to="/registro" class="text-amber-600 hover:text-orange-700 font-medium transition-colors">
                ¿No tienes cuenta? Regístrate
              </router-link>
              <a href="#" class="text-amber-600 hover:text-orange-700 font-medium transition-colors">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import apiAxios from '@/services/axios'
import type { AxiosError } from 'axios'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)
const router = useRouter()
const usuario = useUserStore()

onMounted(() => {
  if (usuario.isLoggedIn) {
    router.replace('/recetas')
  }
})

const login = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await apiAxios.post('/login', {
      email: email.value.trim(),
      password: password.value.trim()
    })

    const token = response.data.access_token
    const user = response.data.usuario

    if (!token || !user) {
      throw new Error('Respuesta incompleta del servidor.')
    }

    localStorage.setItem('token', token)

    await usuario.iniciarSesion({
      nombre: user.nombre,
      rol: user.rol,
      perfilCompleto: user.perfilCompleto,
      preferencias: user.preferencias || [],
      alergias: user.alergias || [],
      metaCalorias: user.metaCalorias || 0
    }, router)

    // Redirigir según perfil
    router.push(usuario.perfilCompleto ? '/recetas' : '/completar-perfil')
  } catch (error) {
    const axiosError = error as AxiosError<{ error: string; detalles?: any }>
    if (axiosError.response?.status === 422) {
      // Mostrar detalles de validación
      const detalles = axiosError.response.data?.detalles
      if (detalles) {
        const errores = Object.values(detalles).flat().join('. ')
        errorMessage.value = errores
      } else {
        errorMessage.value = 'Por favor verifica tus datos. La contraseña debe tener al menos 6 caracteres.'
      }
    } else if (axiosError.response?.status === 401) {
      errorMessage.value = 'El correo o la contraseña son incorrectos'
    } else {
      errorMessage.value = axiosError.response?.data?.error || 'Hubo un problema al conectar con el servidor. Por favor, intenta de nuevo.'
    }
    console.error('Error de login:', axiosError.response?.data)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.pattern-food {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out;
}

.hover-scale {
  transition: transform 0.3s ease;
}

.hover-scale:hover {
  transform: scale(1.02);
}
</style>