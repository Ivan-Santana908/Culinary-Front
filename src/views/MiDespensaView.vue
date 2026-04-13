<template>
  <DefaultLayout>
    <section class="min-h-screen bg-amber-50 py-8 px-4">
      <div class="max-w-6xl mx-auto space-y-6">
        <div class="bg-white rounded-2xl shadow p-6">
          <h1 class="text-3xl font-extrabold text-gray-900">Mi Despensa</h1>
          <p class="text-gray-600 mt-1">Administra tus ingredientes y manten tu inventario al dia.</p>
        </div>

        <div class="bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 class="text-xl font-bold text-gray-900">Agregar ingrediente</h2>

          <div class="grid md:grid-cols-4 gap-3">
            <div class="md:col-span-2">
              <label class="text-sm font-medium text-gray-700">Ingrediente</label>
              <input
                v-model="queryIngrediente"
                type="text"
                placeholder="Escribe para buscar..."
                class="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <div class="mt-2 max-h-44 overflow-y-auto border border-gray-200 rounded-lg" v-if="ingredientesFiltrados.length > 0">
                <button
                  v-for="item in ingredientesFiltrados"
                  :key="item._id"
                  type="button"
                  @click="seleccionarIngrediente(item)"
                  class="w-full text-left px-3 py-2 hover:bg-amber-50 border-b border-gray-100 last:border-0"
                >
                  {{ item.nombre }}
                </button>
              </div>
            </div>

            <div>
              <label class="text-sm font-medium text-gray-700">Unidad</label>
              <select
                v-model="unidadSeleccionada"
                class="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option v-for="unidad in unidadesDisponibles" :key="unidad" :value="unidad">
                  {{ unidad }}
                </option>
              </select>
            </div>

            <div>
              <label class="text-sm font-medium text-gray-700">Cantidad</label>
              <input
                v-model.number="cantidad"
                type="number"
                min="0"
                step="0.1"
                :disabled="!requiereCantidadSeleccionado"
                class="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:bg-gray-100"
              />
            </div>

            <div class="flex items-end">
              <button
                @click="agregarIngrediente"
                :disabled="guardando || !ingredienteSeleccionado"
                class="w-full px-4 py-2 rounded-lg bg-amber-500 text-white font-semibold hover:bg-amber-600 disabled:opacity-60"
              >
                {{ guardando ? 'Guardando...' : 'Agregar' }}
              </button>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold text-gray-900">Ingredientes en despensa</h2>
            <button @click="cargarDespensa" class="text-sm text-amber-600 hover:text-amber-700 font-semibold">Recargar</button>
          </div>

          <div v-if="cargando" class="text-gray-500">Cargando despensa...</div>
          <div v-else-if="error" class="text-red-600">{{ error }}</div>
          <div v-else-if="Object.keys(despensa).length === 0" class="text-gray-500">Aun no tienes ingredientes en despensa.</div>

          <div v-else class="space-y-5">
            <div v-for="(items, categoria) in despensa" :key="categoria">
              <h3 class="text-sm uppercase tracking-wide text-amber-700 font-bold mb-2">{{ categoria }}</h3>
              <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div v-for="item in items" :key="item._id" class="bg-amber-50 rounded-xl p-3 border border-amber-100">
                  <div class="flex items-start justify-between gap-3">
                    <div>
                      <p class="font-semibold text-gray-900">{{ item.nombre_ingrediente }}</p>
                      <p class="text-sm text-gray-600">
                        {{ item.cantidad != null ? formatItemAmount(item) : 'Disponible' }}
                      </p>
                    </div>
                    <button
                      @click="eliminarIngrediente(item._id || '')"
                      class="text-red-500 hover:text-red-700 text-sm font-semibold"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import api from '@/services/axios'
import {
  formatQuantity,
  getPreferredUnitForIngredient,
  getUnitOptionsForIngredient,
  normalizeForStorage,
  normalizeText,
  resolveDisplayMeasure
} from '@/utils/recetasDisponibles'

interface IngredienteCatalogo {
  _id: string
  nombre: string
  unidad: string
  requiere_cantidad?: boolean
}

interface IngredienteDespensa {
  _id?: string
  nombre_ingrediente: string
  cantidad?: number | null
  unidad: string
}

const catalogo = ref<IngredienteCatalogo[]>([])
const despensa = ref<Record<string, IngredienteDespensa[]>>({})
const cargando = ref(false)
const guardando = ref(false)
const error = ref('')

const ingredienteSeleccionado = ref('')
const queryIngrediente = ref('')
const unidadSeleccionada = ref('unidad')
const cantidad = ref<number | null>(1)

const ingredienteActivo = computed(() =>
  catalogo.value.find((i) => i._id === ingredienteSeleccionado.value)
)

const ingredientesFiltrados = computed(() => {
  const query = normalizeText(queryIngrediente.value)
  if (!query) return catalogo.value
  return catalogo.value.filter((item) => normalizeText(item.nombre).includes(query))
})

const requiereCantidadSeleccionado = computed(() => ingredienteActivo.value?.requiere_cantidad !== false)

const unidadesDisponibles = computed(() => {
  const nombre = ingredienteActivo.value?.nombre || queryIngrediente.value
  const unidadBase = ingredienteActivo.value?.unidad || 'unidad'
  return getUnitOptionsForIngredient(nombre, unidadBase)
})

function formatQty(value: number) {
  return Number.isInteger(value) ? `${value}` : value.toFixed(1)
}

function formatItemAmount(item: IngredienteDespensa) {
  const cantidad = Number(item.cantidad || 0)
  const medida = resolveDisplayMeasure(item.nombre_ingrediente, cantidad, item.unidad)
  return `${formatQuantity(medida.cantidad)} ${medida.unidad}`
}

function seleccionarIngrediente(item: IngredienteCatalogo) {
  ingredienteSeleccionado.value = item._id
  queryIngrediente.value = item.nombre
  unidadSeleccionada.value = getPreferredUnitForIngredient(item.nombre, item.unidad)
}

async function cargarCatalogo() {
  const { data } = await api.get('/despensa/catalogo-ingredientes')
  catalogo.value = data.ingredientes || []
}

async function cargarDespensa() {
  try {
    cargando.value = true
    error.value = ''
    const { data } = await api.get('/despensa')
    despensa.value = data.despensa || {}
  } catch (e: any) {
    error.value = e?.response?.data?.message || 'No se pudo cargar la despensa'
  } finally {
    cargando.value = false
  }
}

async function agregarIngrediente() {
  if (!ingredienteActivo.value) return

  try {
    guardando.value = true

    const payload: any = {
      nombre_ingrediente: ingredienteActivo.value.nombre,
      unidad: unidadSeleccionada.value,
      categoria: 'otros'
    }

    if (requiereCantidadSeleccionado.value) {
      const normalizado = normalizeForStorage(Number(cantidad.value || 0), unidadSeleccionada.value)
      payload.cantidad = normalizado.cantidad
      payload.unidad = normalizado.unidad
    }

    await api.post('/despensa', payload)

    ingredienteSeleccionado.value = ''
    queryIngrediente.value = ''
    unidadSeleccionada.value = 'unidad'
    cantidad.value = 1
    await cargarDespensa()
  } catch (e: any) {
    alert(e?.response?.data?.message || 'No se pudo agregar ingrediente')
  } finally {
    guardando.value = false
  }
}

async function eliminarIngrediente(id: string) {
  if (!id) return
  try {
    await api.delete(`/despensa/${id}`)
    await cargarDespensa()
  } catch (e: any) {
    alert(e?.response?.data?.message || 'No se pudo eliminar ingrediente')
  }
}

onMounted(async () => {
  await Promise.all([cargarCatalogo(), cargarDespensa()])
})
</script>
