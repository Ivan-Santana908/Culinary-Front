<template>
  <DefaultLayout>
    <div class="flex justify-center items-center min-h-screen bg-gray-50">
      <div class="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 class="text-2xl font-bold text-[#A97C50] mb-6 text-center">📝 Crear cuenta</h2>

        <form @submit.prevent="registrar">
          <!-- Nombre -->
          <div class="mb-4">
            <label for="nombre" class="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
            <input
              id="nombre"
              v-model="nombre"
              type="text"
              placeholder="Tu nombre"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A97C50]"
              required
            />
          </div>

          <!-- Email -->
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="tucorreo@ejemplo.com"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A97C50]"
              required
            />
          </div>

          <!-- Contraseña -->
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              id="password"
              v-model="password"
              type="password"
              autocomplete="new-password"
              placeholder="••••••••"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A97C50]"
              required
            />
          </div>

          <!-- Confirmación -->
          <div class="mb-6">
            <label for="confirmacion" class="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</label>
            <input
              id="confirmacion"
              v-model="confirmacion"
              type="password"
              autocomplete="new-password"
              placeholder="••••••••"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A97C50]"
              required
            />
          </div>

          <!-- Botón -->
          <button
            type="submit"
            class="w-full bg-[#A97C50] text-white py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Registrarse
          </button>
        </form>

        <!-- Enlace opcional -->
        <p class="text-sm text-gray-500 mt-4 text-center">
          ¿Ya tienes cuenta?
          <router-link to="/login" class="text-[#A97C50] hover:underline">Inicia sesión aquí</router-link>
        </p>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { resolveApiBaseUrl } from '@/services/apiBase'

const router = useRouter()
const API_BASE_URL = resolveApiBaseUrl(import.meta.env.VITE_API_URL)

const nombre = ref('')
const email = ref('')
const password = ref('')
const confirmacion = ref('')

async function registrar() {
  if (password.value !== confirmacion.value) {
    alert('Las contraseñas no coinciden')
    return
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/register`, {
      nombre: nombre.value,
      email: email.value,
      password: password.value,
      password_confirmation: confirmacion.value
    })

    const token = response.data.access_token
    localStorage.setItem('token', token)

    // Redirigir a completar perfil
router.push('/completar-perfil')
  } catch (error: any) {
    if (error.response?.data?.detalles) {
      const errores = error.response.data.detalles
      alert(Object.values(errores).flat().join('\n'))
    } else {
      alert('Error al registrar usuario')
    }
  }
}
</script>
