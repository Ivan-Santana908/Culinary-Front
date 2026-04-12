<template>
  <DefaultLayout>
    <section class="max-w-7xl mx-auto px-4 py-8">
      <!-- Header con información del usuario -->
      <div class="bg-gradient-to-r from-[#E67E22] to-[#8B0000] rounded-2xl p-8 mb-8 text-white">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl font-bold mb-2">
              ¡Hola, {{ usuario.nombre }}! 👋
            </h1>
            <p class="text-white/90">Descubre recetas personalizadas para ti</p>
          </div>
          <div class="text-right">
            <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm mb-1">Meta semanal</p>
                  <p class="text-2xl font-bold">{{ usuario.metaCalorias }} kcal</p>
                  <p class="text-sm text-white/70">{{ Math.round(usuario.metaCalorias / 7) }} kcal/día</p>
                </div>
                <button 
                  @click="mostrarEditorMeta = true"
                  class="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
                >
                  <PencilIcon class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Featured recipe of the week -->
      <div v-if="destacada" class="bg-gradient-to-br from-[#98B4A6] to-[#D1FAE5] rounded-2xl overflow-hidden mb-8 shadow-xl">
        <div class="relative h-64 md:h-80">
          <img 
            :src="destacada.imagen || '/placeholder-receta.jpg'" 
            alt="Receta destacada" 
            class="absolute inset-0 w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div class="flex items-center gap-2 mb-2">
              <SparklesIcon class="h-5 w-5 text-yellow-400" />
              <span class="text-sm font-medium">Receta destacada de la semana</span>
            </div>
            <h2 class="text-2xl font-bold mb-2">{{ destacada.titulo }}</h2>
            <p class="text-sm text-gray-200">{{ destacada.descripcion }}</p>
            <div class="flex items-center gap-4 mt-3">
              <span class="flex items-center text-sm">
                <FireIcon class="h-4 w-4 mr-1" />
                {{ destacada.calorias_porcion }} kcal
              </span>
              <span 
                v-if="destacada.tipo"
                class="px-2 py-1 rounded-full text-xs font-medium"
                :class="getTypeClass(destacada.tipo)"
              >
                {{ destacada.tipo }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Search and filters -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div class="flex flex-col md:flex-row gap-4 items-center">
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              🔍 Buscar por ingredientes
            </label>
            <div class="relative">
              <MagnifyingGlassIcon class="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                v-model="filtroIngrediente"
                placeholder="Ej: tomate, arroz, pollo..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg transition-all duration-200 outline-none focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
              />
            </div>
          </div>
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              🏷️ Tus preferencias
            </label>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="preferencia in usuario.preferencias"
                :key="preferencia"
                class="px-3 py-1 bg-[#E67E22]/10 text-[#E67E22] rounded-full text-sm"
              >
                {{ preferencia }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Grid de recetas -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="receta in recetasFiltradas"
          :key="receta.id"
          class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
        >
          <div class="relative h-48">
            <img 
              :src="receta.imagen" 
              :alt="receta.titulo"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div class="absolute top-2 right-2">
              <span 
                v-if="receta.tipo"
                class="px-2 py-1 rounded-full text-xs font-medium shadow-md"
                :class="getTypeClass(receta.tipo)"
              >
                {{ receta.tipo }}
              </span>
            </div>
          </div>
          
          <div class="p-4">
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ receta.titulo }}</h3>
            <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ receta.descripcion }}</p>
            
            <div class="flex items-center justify-between">
              <span class="flex items-center text-sm text-gray-500">
                <FireIcon class="h-4 w-4 mr-1 text-[#E67E22]" />
                {{ receta.calorias_porcion }} kcal
              </span>
              <button
                @click="mostrarSelector(receta)"
                class="flex items-center text-sm font-medium text-[#E67E22] hover:text-[#8B0000] transition-colors"
              >
                <PlusCircleIcon class="h-5 w-5 mr-1" />
                Agregar al plan
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal para seleccionar día -->
      <div v-if="recetaParaAgregar" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
          <h3 class="text-lg font-bold text-[#A97C50] mb-4 text-center">Selecciona el día:</h3>
          <div class="grid grid-cols-2 gap-4">
            <button
              v-for="dia in diasSemana"
              :key="dia"
              @click="confirmarAsignacion(dia)"
              class="bg-gradient-to-r from-[#E67E22] to-[#8B0000] text-white py-3 rounded-lg hover:from-[#D35400] hover:to-[#6B0000] transition-all duration-200"
            >
              {{ dia }}
            </button>
          </div>
          <button 
            @click="recetaParaAgregar = null" 
            class="mt-4 text-sm text-gray-600 hover:text-gray-800 underline block mx-auto transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>

      <!-- Modal para editar meta calórica -->
      <div v-if="mostrarEditorMeta" class="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 w-full max-w-md transform transition-all">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-bold text-gray-900">Editar meta calórica semanal</h3>
            <button 
              @click="cerrarEditor"
              class="text-gray-400 hover:text-gray-600"
            >
              <XIcon class="w-6 h-6" />
            </button>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Calorías semanales
              </label>
              <input
                v-model="nuevaMetaCalorias"
                type="range"
                min="8400"
                max="28000"
                step="350"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#E67E22]"
              />
              <div class="flex justify-between text-sm text-gray-600 mt-2">
                <span>8400 kcal/semana</span>
                <span>28000 kcal/semana</span>
              </div>
            </div>

            <div class="flex justify-between items-center bg-orange-50 p-3 rounded-lg">
              <div>
                <p class="text-lg font-semibold text-[#E67E22]">{{ nuevaMetaCalorias }} kcal</p>
                <p class="text-sm text-gray-600">{{ Math.round(nuevaMetaCalorias / 7) }} kcal/día</p>
              </div>
            </div>

            <p class="text-sm text-gray-600" :class="{'text-amber-600': Math.round(nuevaMetaCalorias / 7) < 1500 || Math.round(nuevaMetaCalorias / 7) > 3000}">
              {{ getRecomendacionCalorica(nuevaMetaCalorias) }}
            </p>

            <!-- Error mensaje -->
            <p v-if="errorMensaje" class="text-sm text-red-600">
              {{ errorMensaje }}
            </p>

            <div class="flex gap-3">
              <button
                @click="cerrarEditor"
                class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                @click="guardarNuevaMeta"
                class="flex-1 px-4 py-2 bg-gradient-to-r from-[#E67E22] to-[#8B0000] text-white rounded-lg hover:from-[#D35400] hover:to-[#6B0000] transition-colors"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useUserStore } from '@/stores/userStore'
import { computed, ref, watch, onMounted } from 'vue'
import { planSemanal } from '@/stores/planStore'
import api from '@/services/axios'
import { getRecetas } from '@/services/recetasService'
import { 
  SparklesIcon,
  FireIcon,
  SearchIcon as MagnifyingGlassIcon,
  PlusCircleIcon,
  PencilIcon,
  XIcon
} from '@heroicons/vue/outline'
// Ensure heroicons is properly imported

import type { Receta } from '@/types/Receta'

const usuario = useUserStore()
const filtroIngrediente = ref('')
const recetaParaAgregar = ref<Receta | null>(null)
const mostrarEditorMeta = ref(false)
const nuevaMetaCalorias = ref<number>(Number(usuario.metaCalorias))
const errorMensaje = ref('')
const todasLasRecetas = ref<Receta[]>([])
const destacada = ref<Receta | null>(null)
const cargando = ref(true)

// Watch para mantener nuevaMetaCalorias como número
watch(nuevaMetaCalorias, (newValue) => {
  if (typeof newValue === 'string') {
    nuevaMetaCalorias.value = Number(newValue)
  }
})
const diasSemana = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo']

function getTypeClass(tipo: string | undefined) {
  if (!tipo) return 'bg-gray-100 text-gray-800'
  const classes = {
    'Vegetariana': 'bg-green-100 text-green-800',
    'Alta proteína': 'bg-red-100 text-red-800',
    'Sin gluten': 'bg-yellow-100 text-yellow-800',
    'Baja en calorías': 'bg-blue-100 text-blue-800'
  }
  return classes[tipo as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

function mostrarSelector(receta: Receta) {
  recetaParaAgregar.value = receta
}

function confirmarAsignacion(dia: string) {
  if (recetaParaAgregar.value) {
    planSemanal[dia] = recetaParaAgregar.value
    recetaParaAgregar.value = null
  }
}

// Cargar recetas desde la API
onMounted(async () => {
  try {
    cargando.value = true
    const res = await getRecetas()
    todasLasRecetas.value = res.data
    
    if (todasLasRecetas.value.length > 0) {
      destacada.value = todasLasRecetas.value[0]
    }
  } catch (error) {
    console.error('Error cargando recetas:', error)
  } finally {
    cargando.value = false
  }
})

// Receta destacada semanal (primera receta cargada)
// const destacada: Receta = recetasEjemplo[0]

// Recetas base (ahora cargadas desde la API)
// const todasLasRecetas: Receta[] = recetasEjemplo

// Filtro personalizado
const recetasFiltradas = computed(() =>
  todasLasRecetas.value.filter((receta: Receta) => {
    const coincidePreferencia = receta.tipo && usuario.preferencias.includes(receta.tipo)
    const coincideIngrediente = receta.ingredientes.some((ing: any) => {
      const nombreIngrediente = ing.ingrediente?.nombre || ing.nombre || ''
      return nombreIngrediente.toLowerCase().includes(filtroIngrediente.value.toLowerCase())
    })
    return coincidePreferencia || (filtroIngrediente.value !== '' && coincideIngrediente)
  })
)

function cerrarEditor() {
  mostrarEditorMeta.value = false
  nuevaMetaCalorias.value = usuario.metaCalorias
  errorMensaje.value = ''
}

function getRecomendacionCalorica(calorias: number) {
  const caloriasDiarias = Math.round(calorias / 7)
  if (caloriasDiarias < 1500) {
    return 'Recuerda consultar con un profesional antes de seguir una dieta muy restrictiva'
  } else if (caloriasDiarias > 3000) {
    return 'Meta calórica alta - ideal para deportistas o personas muy activas'
  }
  return 'Meta calórica dentro del rango recomendado'
}

async function guardarNuevaMeta() {
  try {
    await usuario.actualizarMetaCalorias(nuevaMetaCalorias.value)
    cerrarEditor()
  } catch (error: any) {
    if (error.response?.data?.error) {
      errorMensaje.value = error.response.data.error
    } else if (error.response?.data?.message) {
      errorMensaje.value = error.response.data.message
    } else if (error.response?.status === 422) {
      errorMensaje.value = 'El valor debe estar entre 8400 y 28000 calorías semanales'
    } else {
      errorMensaje.value = 'Error al actualizar la meta calórica. Por favor, intenta de nuevo.'
    }
    console.error('Error al actualizar meta calórica:', error.response?.data || error)
  }
}
</script>
