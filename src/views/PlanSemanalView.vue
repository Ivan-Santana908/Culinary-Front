<template>
  <DefaultLayout>
    <div class="min-h-screen bg-amber-50 py-12 px-4">
      <!-- Header -->
      <div class="max-w-7xl mx-auto text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Tu Plan Semanal
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Organiza tus comidas para la semana y mantén una alimentación equilibrada
        </p>
      </div>

      <!-- Plan Semanal Grid -->
      <div class="max-w-7xl mx-auto mb-12">
        <div class="grid gap-6 md:grid-cols-7">
          <!-- Días de la semana -->
          <div
            v-for="(receta, dia) in planSemanal"
            :key="dia"
            class="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <!-- Cabecera del día -->
            <div class="bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-3">
              <h3 class="text-lg font-semibold text-white capitalize">{{ dia }}</h3>
            </div>

            <!-- Contenido del día -->
            <div class="p-4">
              <template v-if="receta">
                <!-- Receta asignada -->
                <div class="space-y-4">
                  <img 
                    :src="receta.imagen" 
                    :alt="receta.titulo"
                    class="w-full h-32 object-cover rounded-lg shadow-md"
                  />
                  <div>
                    <h4 class="font-semibold text-gray-900">{{ receta.titulo }}</h4>
                    <p class="text-sm text-gray-500">{{ receta.calorias_porcion }} kcal</p>
                  </div>
                  <div class="flex justify-between items-center">
                    <button
                      @click="asignarReceta(dia)"
                      class="text-amber-600 hover:text-amber-700 text-sm font-medium"
                    >
                      Cambiar receta
                    </button>
                    <button
                      @click="eliminarReceta(dia)"
                      class="text-red-500 hover:text-red-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </template>
              <template v-else>
                <!-- Sin receta asignada -->
                <div class="h-full flex flex-col items-center justify-center py-6 space-y-4">
                  <div class="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <button
                    @click="asignarReceta(dia)"
                    class="text-amber-600 hover:text-amber-700 text-sm font-medium"
                  >
                    Agregar receta
                  </button>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 mb-12">
        <!-- Total calorías -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="flex items-center justify-between">
            <h4 class="text-lg font-semibold text-gray-900">Total calorías</h4>
            <div class="bg-amber-100 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <p class="text-3xl font-bold text-gray-900 mt-4">{{ totalCalorias }} kcal</p>
          <p :class="[
            'text-sm mt-2',
            estadoMeta === 'text-red-500 font-semibold' ? 'text-red-600' : 'text-green-600'
          ]">
            {{ textoMeta }}
          </p>
        </div>

        <!-- Lista de compras -->
        <div class="bg-white rounded-xl shadow-lg p-6 md:col-span-2">
          <div class="flex items-center justify-between mb-6">
            <h4 class="text-lg font-semibold text-gray-900">Lista de compras</h4>
            <button class="text-amber-600 hover:text-amber-700 font-medium text-sm">
              Exportar lista
            </button>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div 
              v-for="(item, nombre) in listaIngredientes" 
              :key="nombre"
              class="flex items-center space-x-2 p-2 rounded-lg bg-amber-50"
            >
              <span class="text-gray-900">{{ nombre }}</span>
              <span class="text-sm text-gray-500">({{ item.total }} {{ item.unidad }})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { ref, computed, onMounted } from 'vue'
import { planSemanal } from '@/stores/planStore'
import { useUserStore } from '@/stores/userStore'
import { getRecetas } from '@/services/recetasService'

const usuario = useUserStore()

import type { Receta } from '@/types/Receta'

const recetasDisponibles = ref<Receta[]>([])
const cargando = ref(true)

onMounted(async () => {
  try {
    cargando.value = true
    const res = await getRecetas()
    recetasDisponibles.value = res.data
  } catch (error) {
    console.error('Error cargando recetas:', error)
  } finally {
    cargando.value = false
  }
})

function asignarReceta(dia: string) {
  if (recetasDisponibles.value.length > 0) {
    const aleatoria = recetasDisponibles.value[Math.floor(Math.random() * recetasDisponibles.value.length)]
    planSemanal[dia] = aleatoria
  }
}

function eliminarReceta(dia: string) {
  planSemanal[dia] = null
}

const totalCalorias = computed(() =>
  Object.values(planSemanal).reduce((sum, r) => sum + (r?.calorias_porcion || 0), 0)
)

const estadoMeta = computed(() =>
  totalCalorias.value > usuario.metaCalorias
    ? 'text-red-500 font-semibold'
    : 'text-green-700 font-medium'
)

const textoMeta = computed(() => {
  if (usuario.metaCalorias === 0) return 'No has definido una meta calórica aún.'
  return totalCalorias.value > usuario.metaCalorias
    ? '🚨 Has superado tu meta semanal de calorías.'
    : '✅ Estás dentro de tu objetivo nutricional.'
})

const listaIngredientes = computed(() => {
  const contador: Record<string, { total: number; unidad: string }> = {}

  Object.values(planSemanal).forEach(receta => {
    receta?.ingredientes.forEach((recetaIng) => {
      const { ingrediente, cantidad, nombre: nombreFlat, unidad: unidadFlat } = recetaIng
      const nombre = ingrediente?.nombre || nombreFlat || ''
      const unidad = ingrediente?.unidad || unidadFlat || ''
      const clave = nombre.toLowerCase().trim()
      if (!contador[clave]) {
        contador[clave] = { total: cantidad, unidad }
      } else {
        contador[clave].total += cantidad
      }
    })
  })

  return contador
})
</script>
