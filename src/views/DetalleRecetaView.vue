<template>
  <DefaultLayout>
    <section class="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      
      <!-- ESTADO: Cargando -->
      <div v-if="cargando" class="flex flex-col items-center justify-center min-h-[400px]">
        <div class="relative">
          <div class="animate-spin rounded-full h-20 w-20 border-4 border-amber-200 border-t-amber-600"></div>
          <span class="absolute inset-0 flex items-center justify-center text-3xl">🍳</span>
        </div>
        <p class="text-gray-700 text-lg mt-6 font-medium">Preparando tu receta...</p>
      </div>

      <!-- ESTADO: Error -->
      <div v-else-if="error" class="min-h-screen flex items-center justify-center px-4">
        <div class="bg-white border-2 border-red-200 rounded-2xl p-12 text-center max-w-md shadow-2xl">
          <div class="text-7xl mb-6 animate-bounce">😞</div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">Oops!</h3>
          <p class="text-gray-600 mb-6">{{ error }}</p>
          <button @click="$router.push('/recetas')" 
                  class="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105">
            ← Volver a recetas
          </button>
        </div>
      </div>

      <!-- MODO NORMAL: Vista de la receta -->
      <div v-else-if="!cargando && !error && !modoCocina" class="max-w-7xl mx-auto px-4 py-8">
        <button @click="$router.back()" 
                class="flex items-center gap-2 text-[#A97C50] hover:text-[#8B6440] transition">
          <span>←</span> Volver
        </button>

        <div class="bg-white shadow-xl rounded-2xl overflow-hidden">
          <!-- Imagen de la receta -->
          <div class="relative h-64 bg-gradient-to-br from-orange-100 to-yellow-100">
            <img v-if="receta.imagen" 
                 :src="receta.imagen" 
                 :alt="receta.titulo"
                 class="w-full h-full object-cover"
                 @error="(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400/A97C50/FFFFFF?text=🍳+Receta'" />
            <div v-else class="flex items-center justify-center h-full text-6xl">🍳</div>
          </div>

          <div class="p-8 space-y-6">
            <!-- Título -->
            <h1 class="text-4xl font-bold text-gray-800">{{ receta.titulo }}</h1>
            
            <!-- Info Cards -->
            <div class="grid grid-cols-3 gap-4">
              <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl text-center transform hover:scale-105 transition">
                <div class="text-3xl mb-2">⏱️</div>
                <div class="text-sm text-gray-600">Tiempo</div>
                <div class="text-lg font-bold text-gray-800">{{ receta.tiempo_preparacion || 30 }} min</div>
              </div>
              <div class="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl text-center transform hover:scale-105 transition">
                <div class="text-3xl mb-2">🔥</div>
                <div class="text-sm text-gray-600">Calorías</div>
                <div class="text-lg font-bold text-gray-800">{{ receta.calorias_porcion || 0 }} kcal</div>
              </div>
              <div class="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl text-center transform hover:scale-105 transition">
                <div class="text-3xl mb-2">📊</div>
                <div class="text-sm text-gray-600">Dificultad</div>
                <div class="text-lg font-bold text-gray-800">{{ receta.dificultad || 'Media' }}</div>
              </div>
            </div>

            <!-- Descripción -->
            <div class="bg-gray-50 p-6 rounded-xl">
              <p class="text-gray-700 text-lg leading-relaxed">{{ receta.descripcion }}</p>
            </div>

            <!-- Selector de porciones -->
            <div class="bg-yellow-50 border-2 border-yellow-200 p-4 rounded-xl">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                🍽️ ¿Para cuántas personas?
              </label>
              <input type="number" v-model.number="personas" min="1" max="20"
                     class="w-32 border-2 border-yellow-300 rounded-lg px-4 py-2 text-center text-lg font-bold focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            </div>

            <!-- Ingredientes -->
            <div>
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <span class="text-4xl">🧺</span> 
                  <span>Ingredientes</span>
                </h3>
                <div class="flex items-center gap-3">
                  <label class="text-sm font-semibold text-gray-600">
                    🍽️ Personas:
                  </label>
                  <div class="flex items-center gap-2 bg-amber-50 border-2 border-amber-200 rounded-xl">
                    <button @click="personas = Math.max(1, personas - 1)" 
                            class="px-3 py-2 text-amber-600 hover:bg-amber-100 rounded-l-xl font-bold text-xl">
                      −
                    </button>
                          <input type="number" v-model.number="personas" min="1" max="20"
                           class="w-16 text-center text-xl font-bold bg-transparent border-none focus:outline-none" />
                    <button @click="personas = Math.min(20, personas + 1)" 
                            class="px-3 py-2 text-amber-600 hover:bg-amber-100 rounded-r-xl font-bold text-xl">
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div class="space-y-2">
                <div v-for="(ing, idx) in receta.ingredientes" :key="idx"
                     class="group flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 p-3 rounded-xl hover:border-green-400 hover:shadow-md transition-all duration-300">
                  <input type="checkbox" class="w-4 h-4 text-green-500 rounded border-gray-300 focus:ring-2 focus:ring-green-400" />
                  <span class="text-green-600 text-xl group-hover:scale-110 transition-transform">✓</span>
                  <span class="text-gray-800 font-medium text-base flex-1">
                    <strong class="text-gray-900">{{ ing.nombre }}</strong>
                  </span>
                  <span class="text-amber-700 font-bold text-base bg-white px-3 py-1 rounded-lg">
                    {{ formatearCantidad(obtenerCantidadEscalada(ing.cantidad), ing.unidad) }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- COLUMNA LATERAL: Pasos sticky -->
          <div class="lg:col-span-1">
            <div class="sticky top-4 space-y-4">
              <!-- Card de Pasos -->
              <div class="bg-white rounded-2xl shadow-xl p-4 border border-purple-100">
                <h3 class="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span class="text-2xl">📝</span> 
                  <span>Preparación</span>
                </h3>
                <div v-if="receta.pasos && receta.pasos.length > 0" class="space-y-2 max-h-80 overflow-y-auto pr-2 scrollbar-thin">
                  <div v-for="(paso, idx) in receta.pasos" :key="idx"
                       class="flex gap-3 items-start group hover:bg-purple-50 p-3 rounded-lg transition-all duration-300 border-2 border-transparent hover:border-purple-200">
                    <span class="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg flex items-center justify-center font-bold text-sm shadow-md">
                      {{ idx + 1 }}
                    </span>
                    <p class="text-gray-700 text-sm leading-relaxed pt-1">{{ paso }}</p>
                  </div>
                </div>
                <p v-else class="text-gray-400 text-center py-8">No hay pasos disponibles</p>
              </div>

              <!-- BOTÓN EMPEZAR A COCINAR -->
              <button @click="empezarACocinar"
                      class="w-full bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 hover:from-green-600 hover:via-emerald-700 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-xl shadow-xl transform hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group">
                <span class="text-3xl group-hover:animate-bounce">👨‍🍳</span>
                <div class="text-left">
                  <div class="text-lg font-extrabold">¡Empezar a Cocinar!</div>
                  <div class="text-xs text-green-100 font-normal">Modo paso a paso</div>
                </div>
              </button>
            </div>
          </div>

        </div>
      </div>

      <!-- MODO COCINA: Paso a paso con animaciones -->
      <Transition name="slide-fade">
        <div v-if="!cargando && !error && modoCocina" class="min-h-screen max-w-4xl mx-auto">
          <!-- Header -->
          <div class="bg-white shadow-lg rounded-xl p-4 mb-4 sticky top-4 z-10">
            <div class="flex justify-between items-center mb-3">
              <button @click="salirModoCocina" 
                      class="text-red-500 hover:text-red-700 font-semibold text-sm flex items-center gap-1 transition">
                <span>✕</span> Salir
              </button>
              <div class="text-gray-600 font-semibold text-sm">
                Paso {{ pasoActual + 1 }} de {{ totalPasos }}
              </div>
            </div>
            
            <!-- Barra de progreso animada -->
            <div class="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-r from-green-400 via-green-500 to-green-600 transition-all duration-500 ease-out"
                   :style="{ width: `${progreso}%` }">
                <div class="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
              </div>
            </div>
          </div>

          <!-- Contenido del paso con animación -->
          <TransitionGroup name="paso">
            <div :key="pasoActual" class="bg-white shadow-xl rounded-xl p-6 md:p-8">
              
              <!-- Paso 0: Lista de ingredientes -->
              <div v-if="pasoActual === 0" class="text-center space-y-4">
                <div class="text-6xl mb-4 animate-bounce">🧺</div>
                <h2 class="text-2xl font-bold text-gray-800 mb-2">Prepara tus ingredientes</h2>
                <p class="text-gray-600 text-base mb-4">Verifica que tengas todo listo antes de empezar</p>
                
                <div class="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-5 text-left">
                  <div class="space-y-2">
                    <div v-for="(ing, idx) in receta.ingredientes" :key="idx"
                         class="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition">
                      <input type="checkbox" 
                             class="w-5 h-5 text-green-500 rounded focus:ring-2 focus:ring-green-400" />
                      <span class="text-gray-800 text-base">
                        <strong>{{ ing.nombre }}</strong>: {{ formatearCantidad(obtenerCantidadEscalada(ing.cantidad), ing.unidad) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Pasos de cocina con animaciones dinámicas -->
              <div v-else class="space-y-5">
                <div class="text-center">
                  <!-- Emoji animado según el tipo de acción -->
                  <div class="text-6xl mb-4" :class="obtenerAnimacion(pasoActual)">
                    {{ obtenerEmoji(pasoActual) }}
                  </div>
                  <h2 class="text-xl font-bold text-gray-800 mb-2">Paso {{ pasoActual }}</h2>
                </div>

                <!-- Contenido del paso -->
                <div class="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-xl p-6 shadow-inner">
                  <p class="text-gray-800 text-lg leading-relaxed text-center font-medium">
                    {{ receta.pasos[pasoActual - 1] }}
                  </p>
                </div>

                <!-- Cronómetro funcional -->
                <div v-if="obtenerTiempo(pasoActual)" class="flex flex-col items-center gap-3">
                  <!-- Display del tiempo -->
                  <div class="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-6 shadow-xl">
                    <div class="text-white text-center">
                      <div class="text-4xl font-bold font-mono mb-1">
                        {{ formatearTiempo(tiempoRestante) }}
                      </div>
                      <div class="text-sm opacity-90">
                        {{ temporizadorActivo ? '⏱️ En marcha' : '⏸️ Pausado' }}
                      </div>
                    </div>
                  </div>

                  <!-- Botones de control -->
                  <div class="flex flex-wrap gap-2 justify-center">
                    <button v-if="!temporizadorActivo && tiempoRestante === tiempoTotalPaso * 60"
                            @click="iniciarTemporizador"
                            class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md transform hover:scale-105 transition-all flex items-center gap-1 text-sm">
                      <span class="text-lg">▶️</span>
                      <span>Iniciar</span>
                    </button>

                    <button v-if="temporizadorActivo"
                            @click="pausarTemporizador"
                            class="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md transform hover:scale-105 transition-all flex items-center gap-1 text-sm">
                      <span class="text-lg">⏸️</span>
                      <span>Pausar</span>
                    </button>

                    <button v-if="!temporizadorActivo && tiempoRestante < tiempoTotalPaso * 60"
                            @click="reanudarTemporizador"
                            class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md transform hover:scale-105 transition-all flex items-center gap-1 text-sm">
                      <span class="text-lg">▶️</span>
                      <span>Continuar</span>
                    </button>

                    <button @click="reiniciarTemporizador"
                            class="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md transform hover:scale-105 transition-all flex items-center gap-1 text-sm">
                      <span class="text-lg">🔄</span>
                      <span>Reiniciar</span>
                    </button>

                    <button @click="marcarListo"
                            class="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md transform hover:scale-105 transition-all flex items-center gap-1 text-sm">
                      <span class="text-lg">✅</span>
                      <span>¡Listo!</span>
                    </button>
                  </div>

                  <!-- Barra de progreso del temporizador -->
                  <div class="w-full max-w-md">
                    <div class="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div class="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-1000"
                           :style="{ width: `${progresoTemporizador}%` }"></div>
                    </div>
                    <p class="text-center text-xs text-gray-600 mt-1">
                      {{ Math.floor(tiempoRestante / 60) }} de {{ tiempoTotalPaso }} minutos
                    </p>
                  </div>
                </div>
              </div>

              <!-- Botones de navegación -->
              <div class="flex justify-between items-center mt-6 gap-3">
                <button v-if="pasoActual > 0"
                        @click="pasoAnterior"
                        class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all flex items-center gap-2 text-sm">
                  <span>←</span> Anterior
                </button>
                <div v-else></div>

                <button v-if="pasoActual < totalPasos - 1"
                        @click="pasoSiguiente"
                        class="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all flex items-center gap-2 text-sm">
                  <span>Siguiente</span> <span>→</span>
                </button>
                <button v-else
                        @click="finalizarReceta"
                        class="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all animate-pulse text-sm">
                  🎉 ¡Terminar!
                </button>
              </div>
            </div>
          </TransitionGroup>
        </div>
      </Transition>

    </section>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/axios'

interface Ingrediente {
  nombre: string
  cantidad: number | string
  unidad: string
}

interface IngredienteRaw {
  nombre?: string
  cantidad?: number | string
  unidad?: string
  ingrediente?: {
    nombre?: string
    cantidad?: number | string
    unidad?: string
  }
  pivot?: {
    cantidad?: number | string
    unidad?: string
  }
}

interface Receta {
  _id: string
  titulo: string
  descripcion: string
  ingredientes: Ingrediente[]
  pasos: string[]
  calorias_porcion: number
  tiempo_preparacion: number
  tiempo_coccion?: number
  porciones?: number
  imagen?: string
  dificultad?: string
  tipo?: string
}

const route = useRoute()
const router = useRouter()

// Estado de carga
const cargando = ref(true)
const error = ref('')

// Datos de la receta
const receta = ref<Receta>({
  _id: '',
  titulo: '',
  descripcion: '',
  ingredientes: [],
  pasos: [],
  calorias_porcion: 0,
  tiempo_preparacion: 0
})

const personas = ref(2)

// Estado del modo cocina
const modoCocina = ref(false)
const pasoActual = ref(0)

// Estado del temporizador
const temporizadorActivo = ref(false)
const tiempoRestante = ref(0) // en segundos
const tiempoTotalPaso = ref(0) // en minutos
const intervaloTemporizador = ref<number | null>(null)

// Computeds
const totalPasos = computed(() => {
  return 1 + (receta.value.pasos?.length || 0) // 1 para ingredientes + pasos
})

const progreso = computed(() => {
  return ((pasoActual.value + 1) / totalPasos.value) * 100
})

const progresoTemporizador = computed(() => {
  if (tiempoTotalPaso.value === 0) return 0
  return ((tiempoTotalPaso.value * 60 - tiempoRestante.value) / (tiempoTotalPaso.value * 60)) * 100
})

const porcionesBase = computed(() => {
  const porciones = Number(receta.value.porciones)
  return Number.isFinite(porciones) && porciones > 0 ? porciones : 1
})

// Cargar receta desde el backend
onMounted(async () => {
  const id = route.params.id as string
  
  if (!id) {
    error.value = 'No se especificó el ID de la receta'
    cargando.value = false
    return
  }

  try {
    const response = await api.get(`/recetas/${id}`)
    console.log('Respuesta del servidor:', response.data)
    
    // La respuesta puede venir como response.data.data o directamente como response.data
    if (response.data.data) {
      receta.value = normalizarReceta(response.data.data)
    } else if (response.data.success && response.data.data) {
      receta.value = normalizarReceta(response.data.data)
    } else {
      receta.value = normalizarReceta(response.data)
    }
    
    // Establecer número de personas según las porciones de la receta
    if (receta.value.porciones) {
      personas.value = receta.value.porciones
    }
    
    console.log('Receta cargada:', receta.value)
    cargando.value = false
  } catch (err: any) {
    console.error('Error cargando receta:', err)
    error.value = err.response?.data?.message || 'Error al cargar la receta'
    cargando.value = false
  }
})

// Limpiar temporizador al desmontar
onBeforeUnmount(() => {
  detenerTemporizador()
})

// Watch para inicializar temporizador cuando cambia el paso
watch(pasoActual, () => {
  inicializarTemporizadorPaso()
})

// Funciones del modo cocina
function empezarACocinar() {
  modoCocina.value = true
  pasoActual.value = 0
  window.scrollTo({ top: 0, behavior: 'smooth' })
  inicializarTemporizadorPaso()
}

function salirModoCocina() {
  if (confirm('¿Seguro que quieres salir del modo cocina?')) {
    modoCocina.value = false
    pasoActual.value = 0
  }
}

function pasoSiguiente() {
  detenerTemporizador()
  if (pasoActual.value < totalPasos.value - 1) {
    pasoActual.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
    inicializarTemporizadorPaso()
  }
}

function pasoAnterior() {
  detenerTemporizador()
  if (pasoActual.value > 0) {
    pasoActual.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
    inicializarTemporizadorPaso()
  }
}

function finalizarReceta() {
  detenerTemporizador()
  alert('🎉 ¡Felicidades! Has completado la receta.\n\n¡Buen provecho! 😋')
  modoCocina.value = false
  pasoActual.value = 0
}

// Funciones del temporizador
function inicializarTemporizadorPaso() {
  const tiempo = obtenerTiempo(pasoActual.value)
  if (tiempo) {
    tiempoTotalPaso.value = tiempo
    tiempoRestante.value = tiempo * 60 // convertir a segundos
  } else {
    tiempoTotalPaso.value = 0
    tiempoRestante.value = 0
  }
}

function iniciarTemporizador() {
  if (tiempoRestante.value === 0) {
    tiempoRestante.value = tiempoTotalPaso.value * 60
  }
  temporizadorActivo.value = true
  
  intervaloTemporizador.value = window.setInterval(() => {
    if (tiempoRestante.value > 0) {
      tiempoRestante.value--
    } else {
      // Tiempo terminado
      detenerTemporizador()
      reproducirAlarma()
      alert('⏰ ¡Tiempo completado! Puedes pasar al siguiente paso.')
    }
  }, 1000)
}

function pausarTemporizador() {
  temporizadorActivo.value = false
  if (intervaloTemporizador.value) {
    clearInterval(intervaloTemporizador.value)
    intervaloTemporizador.value = null
  }
}

function reanudarTemporizador() {
  iniciarTemporizador()
}

function reiniciarTemporizador() {
  detenerTemporizador()
  tiempoRestante.value = tiempoTotalPaso.value * 60
}

function detenerTemporizador() {
  temporizadorActivo.value = false
  if (intervaloTemporizador.value) {
    clearInterval(intervaloTemporizador.value)
    intervaloTemporizador.value = null
  }
}

function marcarListo() {
  detenerTemporizador()
  if (confirm('¿Has completado este paso? Se avanzará al siguiente.')) {
    pasoSiguiente()
  }
}

function formatearTiempo(segundos: number): string {
  const mins = Math.floor(segundos / 60)
  const secs = segundos % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

function normalizarReceta(data: Partial<Receta> & { ingredientes?: IngredienteRaw[]; pasos?: string[] }): Receta {
  return {
    _id: data._id || '',
    titulo: data.titulo || '',
    descripcion: data.descripcion || '',
    ingredientes: Array.isArray(data.ingredientes) ? data.ingredientes.map(normalizarIngrediente) : [],
    pasos: Array.isArray(data.pasos) ? data.pasos : [],
    calorias_porcion: obtenerCantidadNumerica(data.calorias_porcion ?? 0),
    tiempo_preparacion: obtenerCantidadNumerica(data.tiempo_preparacion ?? 0),
    tiempo_coccion: data.tiempo_coccion !== undefined ? obtenerCantidadNumerica(data.tiempo_coccion) : undefined,
    porciones: data.porciones !== undefined ? obtenerCantidadNumerica(data.porciones) : undefined,
    imagen: data.imagen,
    dificultad: data.dificultad,
    tipo: data.tipo
  }
}

function normalizarIngrediente(ingrediente: IngredienteRaw): Ingrediente {
  return {
    nombre: ingrediente.nombre || ingrediente.ingrediente?.nombre || '',
    cantidad: ingrediente.cantidad ?? ingrediente.pivot?.cantidad ?? ingrediente.ingrediente?.cantidad ?? 0,
    unidad: ingrediente.unidad || ingrediente.pivot?.unidad || ingrediente.ingrediente?.unidad || ''
  }
}

function obtenerCantidadNumerica(cantidad: number | string): number {
  if (typeof cantidad === 'number') {
    return Number.isFinite(cantidad) ? cantidad : 0
  }

  const normalizada = cantidad
    .trim()
    .replace(',', '.')
    .replace('½', ' 1/2')
    .replace('¼', ' 1/4')
    .replace('¾', ' 3/4')

  const fraccionMixta = normalizada.match(/^(\d+(?:\.\d+)?)\s+(\d+)\/(\d+)/)
  if (fraccionMixta) {
    const entero = Number(fraccionMixta[1])
    const numerador = Number(fraccionMixta[2])
    const denominador = Number(fraccionMixta[3])
    if (denominador !== 0) {
      return entero + numerador / denominador
    }
  }

  const fraccionSimple = normalizada.match(/^(\d+)\/(\d+)/)
  if (fraccionSimple) {
    const numerador = Number(fraccionSimple[1])
    const denominador = Number(fraccionSimple[2])
    if (denominador !== 0) {
      return numerador / denominador
    }
  }

  const valor = Number(normalizada)
  if (Number.isFinite(valor)) {
    return valor
  }

  const primerNumero = normalizada.match(/\d+(?:\.\d+)?/)
  if (!primerNumero) {
    return 0
  }

  const valorExtraido = Number(primerNumero[0])
  if (!Number.isFinite(valorExtraido)) {
    return 0
  }

  return valorExtraido
}

function obtenerCantidadEscalada(cantidad: number | string): number {
  const cantidadBase = obtenerCantidadNumerica(cantidad)
  return (cantidadBase * personas.value) / porcionesBase.value
}

function formatearCantidad(cantidad: number, unidad: string): string {
  const unidadLower = unidad.toLowerCase()
  
  // Convertir gramos a kilogramos si es mayor a 1000
  if ((unidadLower === 'g' || unidadLower === 'gr' || unidadLower === 'gramos' || unidadLower === 'gramo') && cantidad >= 1000) {
    return `${(cantidad / 1000).toFixed(1)} kg`
  }
  
  // Convertir mililitros a litros si es mayor a 1000
  if ((unidadLower === 'ml' || unidadLower === 'mililitros' || unidadLower === 'mililitro') && cantidad >= 1000) {
    return `${(cantidad / 1000).toFixed(1)} L`
  }
  
  // Convertir mililitros a litros si está entre 500-999
  if ((unidadLower === 'ml' || unidadLower === 'mililitros' || unidadLower === 'mililitro') && cantidad >= 500) {
    return `${(cantidad / 1000).toFixed(2)} L`
  }
  
  // Convertir gramos a kilogramos si está entre 500-999
  if ((unidadLower === 'g' || unidadLower === 'gr' || unidadLower === 'gramos' || unidadLower === 'gramo') && cantidad >= 500) {
    return `${(cantidad / 1000).toFixed(2)} kg`
  }
  
  // Simplificar unidades largas
  let unidadSimplificada = unidad
  if (unidadLower === 'gramos' || unidadLower === 'gramo') unidadSimplificada = 'g'
  if (unidadLower === 'kilogramos' || unidadLower === 'kilogramo') unidadSimplificada = 'kg'
  if (unidadLower === 'mililitros' || unidadLower === 'mililitro') unidadSimplificada = 'ml'
  if (unidadLower === 'litros' || unidadLower === 'litro') unidadSimplificada = 'L'
  if (unidadLower === 'cucharadas' || unidadLower === 'cucharada') unidadSimplificada = 'cdas'
  if (unidadLower === 'cucharaditas' || unidadLower === 'cucharadita') unidadSimplificada = 'cdtas'
  if (unidadLower === 'tazas' || unidadLower === 'taza') unidadSimplificada = 'tzs'
  if (unidadLower === 'unidades' || unidadLower === 'unidad') unidadSimplificada = 'un'
  if (unidadLower === 'piezas' || unidadLower === 'pieza') unidadSimplificada = 'pzs'
  
  // Formatear la cantidad
  const cantidadFormateada = cantidad % 1 === 0 ? cantidad.toString() : cantidad.toFixed(1)
  
  return `${cantidadFormateada} ${unidadSimplificada}`
}

function reproducirAlarma() {
  // Intentar reproducir un sonido de alarma (requiere interacción del usuario)
  try {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZRQ0PVqjn77BdGApCmuH')
    audio.play().catch(() => {
      // Si no puede reproducir, solo ignorar
    })
  } catch (e) {
    // Navegador no soporta audio
  }
}

// Funciones para animaciones dinámicas
function obtenerEmoji(paso: number): string {
  if (paso === 0) return '🧺'
  
  const texto = receta.value.pasos[paso - 1]?.toLowerCase() || ''
  
  if (texto.includes('cortar') || texto.includes('picar') || texto.includes('trocea')) return '🔪'
  if (texto.includes('cocinar') || texto.includes('hornear') || texto.includes('asar')) return '🔥'
  if (texto.includes('mezclar') || texto.includes('revolver') || texto.includes('batir')) return '🥄'
  if (texto.includes('agregar') || texto.includes('añadir') || texto.includes('incorporar')) return '➕'
  if (texto.includes('hervir') || texto.includes('cocer')) return '🍲'
  if (texto.includes('freír') || texto.includes('saltear')) return '🍳'
  if (texto.includes('servir') || texto.includes('presentar')) return '🍽️'
  if (texto.includes('refrigerar') || texto.includes('enfriar')) return '❄️'
  if (texto.includes('esperar') || texto.includes('reposar')) return '⏳'
  
  return '👨‍🍳'
}

function obtenerAnimacion(paso: number): string {
  const emoji = obtenerEmoji(paso)
  
  if (emoji === '🔪') return 'animate-[wiggle_1s_ease-in-out_infinite]'
  if (emoji === '🔥') return 'animate-pulse'
  if (emoji === '🥄') return 'animate-[spin_2s_linear_infinite]'
  if (emoji === '⏳') return 'animate-bounce'
  if (emoji === '🍳') return 'animate-[wiggle_0.5s_ease-in-out_infinite]'
  
  return 'animate-bounce'
}

function obtenerTiempo(paso: number): number | null {
  if (paso === 0) return null
  
  const texto = receta.value.pasos[paso - 1]?.toLowerCase() || ''
  
  // Detectar tiempos específicos mencionados en el texto
  const match30 = texto.match(/(\d+)\s*-?\s*(\d+)?\s*minutos/) 
  if (match30) {
    const tiempo = parseInt(match30[1])
    if (tiempo > 0) return tiempo
  }
  
  // Tiempos específicos
  if (texto.includes('30 segundos')) return 1
  if (texto.includes('1 minuto')) return 1
  if (texto.includes('2 minutos')) return 2
  if (texto.includes('3 minutos') || texto.includes('3-4 minutos')) return 4
  if (texto.includes('4 minutos') || texto.includes('4-5 minutos')) return 5
  if (texto.includes('5 minutos')) return 5
  if (texto.includes('6 minutos') || texto.includes('6-8 minutos')) return 8
  if (texto.includes('8 minutos') || texto.includes('8-10 minutos')) return 10
  if (texto.includes('10 minutos') || texto.includes('10 min')) return 10
  if (texto.includes('12 minutos')) return 12
  if (texto.includes('15 minutos') || texto.includes('15 min')) return 15
  if (texto.includes('20 minutos') || texto.includes('20 min')) return 20
  if (texto.includes('30 minutos') || texto.includes('30 min')) return 30
  
  // Palabras clave que sugieren tiempo
  if (texto.includes('hierva') || texto.includes('hervir')) return 10
  if (texto.includes('cocina') && texto.includes('pasta')) return 12
  if (texto.includes('sofríe') || texto.includes('sofreír')) return 3
  
  return null
}
</script>

<style scoped>
/* Animación de entrada/salida para el modo cocina */
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
  transform: translateY(20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

/* Animación de transición entre pasos */
.paso-enter-active,
.paso-leave-active {
  transition: all 0.6s ease;
}

.paso-enter-from {
  opacity: 0;
  transform: translateX(100px) scale(0.9);
}

.paso-leave-to {
  opacity: 0;
  transform: translateX(-100px) scale(0.9);
}

/* Animación wiggle personalizada */
@keyframes wiggle {
  0%, 100% {
    transform: rotate(-5deg);
  }
  50% {
    transform: rotate(5deg);
  }
}

/* Mejora de hover en cards */
.transform {
  transition: transform 0.2s ease-in-out;
}

/* Scrollbar personalizado */
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #a855f7, #ec4899);
  border-radius: 10px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #9333ea, #db2777);
}
</style>

