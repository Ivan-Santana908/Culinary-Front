<template>
  <DefaultLayout>
    <div class="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <!-- Header con título y búsqueda -->
      <div class="bg-white shadow-md border-b-4 border-amber-400">
        <div class="max-w-7xl mx-auto px-4 py-6">
          <div class="text-center mb-4">
            <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
              <span class="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Descubre Recetas
              </span>
            </h1>
            <p class="text-gray-600 text-base">Encuentra la receta perfecta para cada ocasión</p>
          </div>

          <!-- Barra de búsqueda -->
          <div class="max-w-2xl mx-auto">
            <div class="relative">
              <input 
                type="text" 
                placeholder="Buscar recetas, ingredientes..." 
                v-model.trim="searchTerm"
                class="w-full px-5 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all duration-300 text-base pl-12"
              />
              <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl">🔍</span>
            </div>
          </div>

          <!-- Filtros rápidos -->
          <div class="flex justify-center gap-2 mt-4 flex-wrap">
            <button class="px-4 py-1.5 bg-white border-2 border-amber-400 text-amber-600 rounded-lg text-sm font-semibold hover:bg-amber-50 transition-all duration-300">
              🍕 Todas
            </button>
            <button class="px-4 py-1.5 bg-white border-2 border-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-all duration-300">
              🥗 Saludables
            </button>
            <button class="px-4 py-1.5 bg-white border-2 border-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-all duration-300">
              ⏱️ Rápidas
            </button>
            <button class="px-4 py-1.5 bg-white border-2 border-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-all duration-300">
              🌱 Vegetarianas
            </button>
          </div>
        </div>
      </div>

      <!-- Grid de recetas -->
      <div class="max-w-7xl mx-auto px-4 py-8">
        <div v-if="error" class="mb-4 rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-3">
          {{ error }}
        </div>
        <div v-if="cargando" class="text-center text-gray-500 py-8">Cargando recetas...</div>
        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <RecetaCard
            v-for="receta in recetasVisibles"
            :key="receta.id || receta._id"
            :receta="receta"
            @click="verDetalle(receta)"
          />
        </section>

        <div v-if="!cargando && recetasFiltradas.length === 0" class="text-center text-gray-500 py-8">
          No se encontraron recetas con ese criterio.
        </div>

        <div v-if="hasMoreRecetas" class="mt-8 flex justify-center">
          <button
            @click="cargarMas"
            class="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-sm"
          >
            Cargar mas recetas
          </button>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import RecetaCard from '@/components/RecetaCard.vue'
import { useRouter } from 'vue-router'
import { ref, onMounted, computed, watch } from 'vue'
import { getRecetas } from '@/services/recetasService'

import type { Receta } from '@/types/Receta'

const router = useRouter()
const recetas = ref<Receta[]>([])
const cargando = ref(true)
const error = ref('')
const searchTerm = ref('')
const visibleCount = ref(24)
const PAGE_SIZE = 24

const recetasFiltradas = computed(() => {
  const term = searchTerm.value.trim().toLowerCase()
  if (!term) return recetas.value

  return recetas.value.filter((receta: any) => {
    const titulo = String(receta?.titulo || '').toLowerCase()
    const descripcion = String(receta?.descripcion || '').toLowerCase()
    const ingredientes = Array.isArray(receta?.ingredientes)
      ? receta.ingredientes
          .map((ing: any) => {
            if (typeof ing?.ingrediente === 'string') return ing.ingrediente
            if (ing?.ingrediente?.nombre) return ing.ingrediente.nombre
            return ing?.nombre || ''
          })
          .join(' ')
          .toLowerCase()
      : ''

    return titulo.includes(term) || descripcion.includes(term) || ingredientes.includes(term)
  })
})

const recetasVisibles = computed(() => recetasFiltradas.value.slice(0, visibleCount.value))
const hasMoreRecetas = computed(() => recetasVisibles.value.length < recetasFiltradas.value.length)

watch(searchTerm, () => {
  visibleCount.value = PAGE_SIZE
})

onMounted(async () => {
  try {
    cargando.value = true
    const res = await getRecetas()
    recetas.value = res.data
  } catch (e) {
    console.error('Error cargando recetas:', e)
    error.value = 'Error al cargar las recetas'
  } finally {
    cargando.value = false
  }
})

function verDetalle(receta: Receta) {
  const id = (receta as any)._id || receta.id
  router.push(`/recetas/${id}`)
}

function cargarMas() {
  visibleCount.value += PAGE_SIZE
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
