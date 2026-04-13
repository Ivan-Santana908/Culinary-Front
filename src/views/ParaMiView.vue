<template>
  <DefaultLayout>
    <section class="max-w-7xl mx-auto px-4 py-8">
      <div class="bg-gradient-to-r from-[#E67E22] to-[#8B0000] rounded-2xl p-8 mb-8 text-white">
        <div class="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 class="text-4xl font-bold mb-2">¡Hola, {{ usuario.nombre }}! 👋</h1>
            <p class="text-white/90">Recetas que sí encajan con tu despensa</p>
          </div>
          <div class="text-right">
            <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div class="flex items-center justify-between gap-4">
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

      <div v-if="destacada" class="bg-gradient-to-br from-[#98B4A6] to-[#D1FAE5] rounded-2xl overflow-hidden mb-8 shadow-xl">
        <div class="relative h-64 md:h-80">
          <img
            :src="destacada.imagen || '/placeholder-receta.svg'"
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

      <div v-if="cargando" class="bg-white rounded-xl shadow-lg p-8 mb-8 text-center text-gray-500">
        Cargando recetas compatibles...
      </div>

      <div class="grid gap-4 md:grid-cols-4 mb-8">
        <div class="bg-white rounded-xl shadow-lg p-5 md:col-span-2">
          <div class="flex items-center justify-between mb-3">
            <div>
              <p class="text-sm font-medium text-gray-500">Recetas con match</p>
              <p class="text-3xl font-bold text-gray-900">{{ recetasConMatch.length }}</p>
            </div>
            <div class="bg-[#E67E22]/10 text-[#E67E22] rounded-xl px-3 py-2 text-sm font-semibold">
              {{ recetasPreparables }} cocinables
            </div>
          </div>
          <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-[#E67E22] to-[#8B0000] rounded-full transition-all duration-300"
              :style="{ width: `${porcentajePromedio}%` }"
            ></div>
          </div>
          <p class="text-sm text-gray-500 mt-3">
            Coincidencia promedio: <span class="font-semibold text-gray-700">{{ porcentajePromedio }}%</span>
          </p>
        </div>

        <button class="bg-white rounded-xl shadow-lg p-5 text-left hover:shadow-xl transition" @click="mostrarListaCompra = true">
          <p class="text-sm font-medium text-gray-500">Lista de compras</p>
          <p class="text-3xl font-bold text-gray-900">{{ listaCompra.length }}</p>
          <p class="text-sm text-gray-500 mt-1">ingredientes por conseguir</p>
        </button>

        <div class="bg-white rounded-xl shadow-lg p-5">
          <label class="block text-sm font-medium text-gray-700 mb-1">🔍 Buscar por ingredientes</label>
          <div class="relative">
            <MagnifyingGlassIcon class="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              v-model="filtroIngrediente"
              placeholder="Ej: tomate, arroz, pollo..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg transition-all duration-200 outline-none focus:ring-2 focus:ring-[#E67E22] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
        <label class="block text-sm font-medium text-gray-700 mb-1">🏷️ Tus preferencias</label>
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

      <div v-if="!cargando && recetasFiltradas.length === 0" class="bg-white rounded-xl shadow-lg p-10 text-center text-gray-500">
        No encontramos recetas que coincidan con tu despensa y filtros actuales.
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="item in recetasFiltradas"
          :key="item.receta._id || item.receta.id"
          class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
        >
          <div class="relative h-48">
            <img
              :src="item.receta.imagen || '/placeholder-receta.svg'"
              :alt="item.receta.titulo"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div class="absolute top-2 right-2">
              <span
                v-if="item.receta.tipo"
                class="px-2 py-1 rounded-full text-xs font-medium shadow-md"
                :class="getTypeClass(item.receta.tipo)"
              >
                {{ item.receta.tipo }}
              </span>
            </div>
            <div class="absolute left-2 top-2 flex flex-col gap-2">
              <span class="px-2 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-800 shadow">
                {{ item.score }}% ingredientes
              </span>
              <span v-if="item.faltantesCount > 0" class="px-2 py-1 rounded-full text-xs font-semibold bg-black/70 text-white shadow">
                Faltan {{ item.faltantesCount }}
              </span>
            </div>
          </div>

          <div class="p-4">
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ item.receta.titulo }}</h3>
            <p class="text-gray-600 text-sm mb-2 line-clamp-2">{{ item.receta.descripcion }}</p>
            <p v-if="item.faltantesPreview" class="text-xs text-gray-500 mb-3 line-clamp-1">
              Te faltan: {{ item.faltantesPreview }}
            </p>

            <div class="flex flex-wrap gap-2 items-center justify-between">
              <span class="flex items-center text-sm text-gray-500">
                <FireIcon class="h-4 w-4 mr-1 text-[#E67E22]" />
                {{ item.receta.calorias_porcion }} kcal
              </span>
              <div class="flex gap-2 flex-wrap">
                <button
                  @click="verReceta(item.receta)"
                  class="flex items-center text-sm font-medium text-gray-700 hover:text-[#8B0000] transition-colors"
                >
                  <EyeIcon class="h-5 w-5 mr-1" />
                  Ver receta
                </button>
                <button
                  @click="mostrarSelector(item.receta)"
                  class="flex items-center text-sm font-medium text-[#E67E22] hover:text-[#8B0000] transition-colors"
                >
                  <PlusCircleIcon class="h-5 w-5 mr-1" />
                  Agregar al plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

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

      <div v-if="mostrarListaCompra" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
        <div class="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-2xl font-bold text-gray-900">Lista de compras</h3>
              <p class="text-sm text-gray-500">Agrupada desde las recetas que no puedes preparar aún.</p>
            </div>
            <button @click="mostrarListaCompra = false" class="text-gray-400 hover:text-gray-600">
              <XIcon class="w-6 h-6" />
            </button>
          </div>

          <div class="flex-1 overflow-y-auto pr-1 space-y-3">
            <div v-if="listaCompra.length === 0" class="text-center py-10 text-gray-500">
              No hay ingredientes faltantes.
            </div>
            <div
              v-for="item in listaCompra"
              :key="`${item.nombre}-${item.unidad}`"
              class="flex items-center justify-between rounded-xl bg-amber-50 px-4 py-3"
            >
              <span class="font-medium text-gray-900">{{ item.nombre }}</span>
              <span class="text-sm text-gray-600">{{ formatQuantity(item.cantidad) }} {{ item.unidad }}</span>
            </div>
          </div>

          <div class="flex gap-3 pt-4 border-t mt-4">
            <button
              @click="copiarListaCompra"
              class="flex-1 px-4 py-2 bg-gradient-to-r from-[#E67E22] to-[#8B0000] text-white rounded-lg hover:from-[#D35400] hover:to-[#6B0000] transition-colors"
            >
              Copiar lista
            </button>
            <button
              @click="mostrarListaCompra = false"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>

      <div v-if="mostrarEditorMeta" class="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 w-full max-w-md transform transition-all">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-bold text-gray-900">Editar meta calórica semanal</h3>
            <button @click="cerrarEditor" class="text-gray-400 hover:text-gray-600">
              <XIcon class="w-6 h-6" />
            </button>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Calorías semanales</label>
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

            <p v-if="errorMensaje" class="text-sm text-red-600">{{ errorMensaje }}</p>

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
import { useRouter } from 'vue-router'
import { planSemanal } from '@/stores/planStore'
import { getRecetasDisponibles, type RecordatorioFaltantes } from '@/services/recetasService'
import {
  SparklesIcon,
  FireIcon,
  SearchIcon as MagnifyingGlassIcon,
  PlusCircleIcon,
  PencilIcon,
  EyeIcon,
  XIcon
} from '@heroicons/vue/outline'

import type { Receta } from '@/types/Receta'
import {
  buildListaCompra,
  buildListaCompraTexto,
  buildRecetasConMatch,
  formatQuantity,
  getRecetaId,
  normalizeText
} from '@/utils/recetasDisponibles'

const usuario = useUserStore()
const router = useRouter()
const filtroIngrediente = ref('')
const recetaParaAgregar = ref<Receta | null>(null)
const mostrarEditorMeta = ref(false)
const mostrarListaCompra = ref(false)
const nuevaMetaCalorias = ref<number>(Number(usuario.metaCalorias))
const errorMensaje = ref('')
const todasLasRecetas = ref<Receta[]>([])
const destacada = ref<Receta | null>(null)
const cargando = ref(true)
const recordatorios = ref<RecordatorioFaltantes[]>([])

const diasSemana = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo']

watch(nuevaMetaCalorias, (newValue) => {
  if (typeof newValue === 'string') {
    nuevaMetaCalorias.value = Number(newValue)
  }
})

function getTypeClass(tipo: string | undefined) {
  if (!tipo) return 'bg-gray-100 text-gray-800'
  const classes = {
    Vegetariana: 'bg-green-100 text-green-800',
    'Alta proteína': 'bg-red-100 text-red-800',
    'Sin gluten': 'bg-yellow-100 text-yellow-800',
    'Baja en calorías': 'bg-blue-100 text-blue-800'
  }
  return classes[tipo as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

function mostrarSelector(receta: Receta) {
  recetaParaAgregar.value = receta
}

function verReceta(receta: Receta) {
  const id = getRecetaId(receta)
  if (id) {
    router.push({ name: 'detalle-receta', params: { id } })
  }
}

function confirmarAsignacion(dia: string) {
  if (recetaParaAgregar.value) {
    planSemanal[dia] = recetaParaAgregar.value
    recetaParaAgregar.value = null
  }
}

onMounted(async () => {
  try {
    cargando.value = true
    const res = await getRecetasDisponibles()
    todasLasRecetas.value = res.data.recetas || []
    recordatorios.value = res.data.recordatorios || []

    if (todasLasRecetas.value.length > 0) {
      destacada.value = todasLasRecetas.value[0]
    }
  } catch (error) {
    console.error('Error cargando recetas:', error)
  } finally {
    cargando.value = false
  }
})

const recetasConMatch = computed(() => buildRecetasConMatch(todasLasRecetas.value, recordatorios.value))

const recetasFiltradas = computed(() =>
  recetasConMatch.value.filter((item) => {
    const coincidePreferencia = usuario.preferencias.length
      ? !!(item.receta.tipo && usuario.preferencias.includes(item.receta.tipo))
      : true

    const coincideIngrediente = item.receta.ingredientes.some((ing: any) => {
      const nombreIngrediente = normalizeText(ing.ingrediente?.nombre || ing.nombre || '')
      return nombreIngrediente.includes(normalizeText(filtroIngrediente.value))
    })

    const pasaFiltroIngrediente = filtroIngrediente.value !== '' ? coincideIngrediente : true
    return coincidePreferencia && pasaFiltroIngrediente
  })
)

const listaCompra = computed(() => buildListaCompra(recordatorios.value))

const recetasPreparables = computed(() => recetasConMatch.value.filter((item) => item.recordatorio?.puede_preparar ?? item.score >= 100).length)

const porcentajePromedio = computed(() => {
  if (recetasFiltradas.value.length === 0) return 0
  const suma = recetasFiltradas.value.reduce((acc, item) => acc + item.score, 0)
  return Math.round(suma / recetasFiltradas.value.length)
})

function cerrarEditor() {
  mostrarEditorMeta.value = false
  nuevaMetaCalorias.value = usuario.metaCalorias
  errorMensaje.value = ''
}

function getRecomendacionCalorica(calorias: number) {
  const caloriasDiarias = Math.round(calorias / 7)
  if (caloriasDiarias < 1500) {
    return 'Recuerda consultar con un profesional antes de seguir una dieta muy restrictiva'
  }
  if (caloriasDiarias > 3000) {
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

function copiarListaCompra() {
  const texto = buildListaCompraTexto(listaCompra.value)
  navigator.clipboard?.writeText(texto)
  mostrarListaCompra.value = false
}
</script>
