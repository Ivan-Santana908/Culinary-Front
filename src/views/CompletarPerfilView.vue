<template>
  <DefaultLayout>
    <div class="min-h-[calc(100vh-10rem)] py-12 px-4">
      <div class="max-w-3xl mx-auto">
        <!-- Encabezado -->
        <div class="text-center mb-10">
          <div class="flex justify-center mb-6">
            <div class="relative w-20 h-20">
              <div class="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-700 rounded-full animate-pulse"></div>
              <div class="absolute inset-1 bg-white rounded-full flex items-center justify-center">
                <span class="text-3xl">👤</span>
              </div>
            </div>
          </div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Personaliza tu experiencia</h1>
          <p class="text-gray-600">Ayúdanos a conocerte mejor para ofrecerte las mejores recetas</p>
        </div>

        <!-- Formulario -->
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div class="p-8">
            <!-- Progreso -->
            <div class="mb-8">
              <div class="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progreso del perfil</span>
                <span>{{ progresoPerfil }}%</span>
              </div>
              <div class="h-2 bg-gray-200 rounded-full">
                <div
                  class="h-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full transition-all duration-500"
                  :style="{ width: progresoPerfil + '%' }"
                ></div>
              </div>
            </div>

            <!-- Sección de Alergias -->
            <div class="mb-8">
              <div class="flex items-center gap-2 mb-4">
                <div class="p-2 bg-amber-100 rounded-lg">
                  <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h2 class="text-lg font-semibold text-gray-900">Alergias e Intolerancias</h2>
                  <p class="text-sm text-gray-500">Selecciona los ingredientes que debes evitar</p>
                </div>
              </div>
              
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <label
                  v-for="alergia in opcionesAlergias"
                  :key="alergia"
                  class="relative flex items-start p-4 cursor-pointer rounded-lg border-2 transition-all duration-200"
                  :class="[
                    alergias.includes(alergia)
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-gray-200 hover:border-amber-200'
                  ]"
                >
                  <input
                    type="checkbox"
                    :value="alergia"
                    v-model="alergias"
                    class="absolute opacity-0"
                  />
                  <div class="flex flex-col items-center w-full text-center">
                    <span class="text-2xl mb-1">{{ getEmojiForAlergia(alergia) }}</span>
                    <span class="text-sm font-medium" :class="[
                      alergias.includes(alergia) ? 'text-amber-700' : 'text-gray-700'
                    ]">{{ alergia }}</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- Sección de Preferencias -->
            <div class="mb-8">
              <div class="flex items-center gap-2 mb-4">
                <div class="p-2 bg-amber-100 rounded-lg">
                  <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div>
                  <h2 class="text-lg font-semibold text-gray-900">Preferencias Alimentarias</h2>
                  <p class="text-sm text-gray-500">Elige tus tipos de comida preferidos</p>
                </div>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <label
                  v-for="preferencia in opcionesPreferencias"
                  :key="preferencia"
                  class="relative flex items-start p-4 cursor-pointer rounded-lg border-2 transition-all duration-200"
                  :class="[
                    preferencias.includes(preferencia)
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-gray-200 hover:border-amber-200'
                  ]"
                >
                  <input
                    type="checkbox"
                    :value="preferencia"
                    v-model="preferencias"
                    class="absolute opacity-0"
                  />
                  <div class="flex flex-col items-center w-full text-center">
                    <span class="text-2xl mb-1">{{ getEmojiForPreferencia(preferencia) }}</span>
                    <span class="text-sm font-medium" :class="[
                      preferencias.includes(preferencia) ? 'text-amber-700' : 'text-gray-700'
                    ]">{{ preferencia }}</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- Sección de Meta Calórica -->
            <div class="mb-8">
              <div class="flex items-center gap-2 mb-4">
                <div class="p-2 bg-amber-100 rounded-lg">
                  <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h2 class="text-lg font-semibold text-gray-900">Meta Calórica Semanal</h2>
                  <p class="text-sm text-gray-500">Define tus objetivos nutricionales semanales</p>
                </div>
              </div>

              <div class="bg-gray-50 p-6 rounded-xl">
                <div class="flex flex-col sm:flex-row items-center gap-4">
                  <div class="flex-1 w-full">
                    <input
                      type="range"
                      v-model="metaCalorias"
                      min="8400"
                      max="28000"
                      step="350"
                      class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                    <div class="flex justify-between text-xs text-gray-500 mt-2">
                      <span>8400 cal/semana</span>
                      <span>28000 cal/semana</span>
                    </div>
                  </div>
                  <div class="w-32">
                    <input
                      type="number"
                      v-model="metaCalorias"
                      class="w-full px-4 py-2 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      min="1200"
                      max="4000"
                      step="50"
                    />
                  </div>
                </div>
                <p class="text-sm text-center text-gray-500 mt-4">
                  {{ getRecomendacionCalorica }}
                </p>
              </div>
            </div>

            <!-- Mensajes de error -->
            <div v-if="errorMessage" class="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <div class="flex">
                <svg class="h-5 w-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-red-700">{{ errorMessage }}</span>
              </div>
            </div>

            <!-- Botón de guardar -->
            <button
              @click="guardarPerfil"
              class="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 px-6 rounded-xl font-medium hover:from-amber-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2"
              :disabled="loading"
            >
              <svg
                v-if="loading"
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
              <span>{{ loading ? 'Guardando...' : 'Guardar y continuar' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import api from '@/services/axios'

const router = useRouter()
const usuario = useUserStore()

const alergias = ref<string[]>([])
const preferencias = ref<string[]>([])
const metaCalorias = ref<number>(14000) // 2000 * 7 días
const errorMessage = ref('')
const loading = ref(false)

const opcionesAlergias = [
  'Gluten',
  'Lácteos',
  'Huevos',
  'Maní',
  'Soja',
  'Pescado',
  'Mariscos'
]

const opcionesPreferencias = [
  'Vegetariano',
  'Vegano',
  'Sin gluten',
  'Sin lácteos',
  'Bajo en calorías',
  'Alto en proteínas'
]

const getEmojiForAlergia = (alergia: string): string => {
  const emojis: { [key: string]: string } = {
    'Gluten': '🌾',
    'Lácteos': '🥛',
    'Huevos': '🥚',
    'Maní': '🥜',
    'Soja': '🫘',
    'Pescado': '🐟',
    'Mariscos': '🦐'
  }
  return emojis[alergia] || '❌'
}

const getEmojiForPreferencia = (preferencia: string): string => {
  const emojis: { [key: string]: string } = {
    'Vegetariano': '🥗',
    'Vegano': '🌱',
    'Sin gluten': '🌾',
    'Sin lácteos': '🥛',
    'Bajo en calorías': '⚖️',
    'Alto en proteínas': '💪'
  }
  return emojis[preferencia] || '✨'
}

const progresoPerfil = computed(() => {
  // Para administradores, siempre mostrar 100%
  if (usuario.rol === 'admin') return 100;

  let total = 0;
  // Las alergias son opcionales, no afectan el progreso
  if (preferencias.value.length > 0) total += 50;
  if (metaCalorias.value !== 2000) total += 50;
  return total;
})

const getRecomendacionCalorica = computed(() => {
  const caloriasDiarias = Math.round(metaCalorias.value / 7)
  if (caloriasDiarias < 1500) {
    return 'Recuerda consultar con un profesional antes de seguir una dieta muy restrictiva (menos de 1500 cal/día)'
  } else if (caloriasDiarias > 3000) {
    return 'Meta calórica alta - ideal para deportistas o personas muy activas (más de 3000 cal/día)'
  }
  return `Meta calórica dentro del rango recomendado (aproximadamente ${caloriasDiarias} cal/día)`
})

async function guardarPerfil() {
  loading.value = true
  errorMessage.value = ''

  // Solo validamos preferencias y meta calórica para usuarios normales
  if (usuario.rol === 'user' && (preferencias.value.length === 0 || metaCalorias.value === 2000)) {
    errorMessage.value = 'Por favor selecciona al menos una preferencia y ajusta tu meta calórica.'
    loading.value = false
    return
  }

  if (!['admin', 'user'].includes(usuario.rol)) {
    errorMessage.value = 'Tu rol no es válido. Por favor inicia sesión nuevamente.'
    volverAlLogin()
    return
  }

  const token = localStorage.getItem('token')
  if (!token || token.trim() === '') {
    errorMessage.value = 'No se encontró el token. Por favor inicia sesión nuevamente.'
    volverAlLogin()
    return
  }

  try {
    const { data } = await api.put('/usuarios/perfil', {
      alergias: alergias.value,
      preferencias: preferencias.value,
      metaCalorias: metaCalorias.value
    })

    if (!data?.usuario) {
      errorMessage.value = 'Respuesta inválida del servidor.'
      return
    }

    const datos = data.usuario

    await usuario.iniciarSesion({
      nombre: datos.nombre,
      rol: datos.rol,
      alergias: datos.alergias ?? [],
      preferencias: datos.preferencias ?? [],
      metaCalorias: datos.metaCalorias ?? 2000,
      perfilCompleto: datos.perfilCompleto ?? true
    }, router)

    router.push('/recetas')
  } catch (error: any) {
    console.error('Error al guardar perfil:', error)

    if (error.response?.status === 401) {
      errorMessage.value = 'Tu sesión ha expirado. Por favor inicia sesión nuevamente.'
      volverAlLogin()
    } else {
      errorMessage.value = 'Hubo un problema al guardar tu perfil. Intenta de nuevo.'
    }
  } finally {
    loading.value = false
  }
}

function volverAlLogin() {
  usuario.cerrarSesion()
  router.push('/login')
}
</script>

<style scoped>
.form-checkbox {
  accent-color: #A97C50;
}
</style>
