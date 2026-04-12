<template>
  <div v-if="receta" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div
      class="bg-white shadow-xl rounded-xl overflow-hidden transition-all duration-300 flex flex-col md:flex-row max-w-6xl w-full"
    >
      <!-- Imagen lateral -->
      <div class="md:w-1/2 bg-gray-100 flex items-center justify-center p-6">
        <img
          :src="receta.imagen || '/placeholder-receta.jpg'"
          :alt="receta.titulo"
          class="rounded-lg object-contain max-h-[400px] w-auto transition-transform duration-300 hover:scale-105"
        />
      </div>

      <!-- Información detallada -->
      <div class="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto max-h-[80vh]">
        <div>
          <div class="flex items-start justify-between mb-4">
            <h2 class="text-3xl font-bold text-[#A97C50]">{{ receta.titulo }}</h2>
            <span 
              v-if="receta.dificultad"
              class="px-3 py-1 text-sm font-medium rounded-full"
              :class="getDificultadClass(receta.dificultad)"
            >
              {{ receta.dificultad }}
            </span>
          </div>
          
          <p class="text-gray-700 text-base mb-6">{{ receta.descripcion }}</p>

          <!-- Metadata -->
          <div class="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-600">
            <div class="flex items-center">
              <ClockIcon class="w-5 h-5 mr-2 text-[#A97C50]" />
              <span><strong>Tiempo total:</strong> {{ (receta.tiempo_preparacion || 0) + (receta.tiempo_coccion || 0) }} min</span>
            </div>
            <div class="flex items-center">
              <FireIcon class="w-5 h-5 mr-2 text-[#A97C50]" />
              <span><strong>Calorías:</strong> {{ receta.calorias_porcion }} kcal</span>
            </div>
            <div class="flex items-center">
              <UserGroupIcon class="w-5 h-5 mr-2 text-[#A97C50]" />
              <span><strong>Porciones:</strong> {{ receta.porciones }}</span>
            </div>
            <div class="flex items-center">
              <UserIcon class="w-5 h-5 mr-2 text-[#A97C50]" />
              <span><strong>Autor:</strong> {{ receta.autor?.nombre || 'Desconocido' }}</span>
            </div>
          </div>

          <!-- Ingredientes -->
          <div class="mb-6">
            <h4 class="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
              Ingredientes
            </h4>
            <ul class="space-y-2">
              <li
                v-for="(ing, index) in receta.ingredientes"
                :key="index"
                class="flex items-center justify-between text-sm"
              >
                <span>{{ ing.ingrediente?.nombre || ing.nombre }}</span>
                <span class="text-gray-600">{{ ing.cantidad }} {{ ing.ingrediente?.unidad || ing.unidad || '' }}</span>
              </li>
            </ul>
          </div>

          <!-- Pasos -->
          <div class="mb-6">
            <h4 class="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
              Instrucciones
            </h4>
            <ol class="list-decimal list-inside space-y-2">
              <li
                v-for="(paso, index) in receta.pasos"
                :key="index"
                class="text-sm text-gray-700"
              >
                {{ paso }}
              </li>
            </ol>
          </div>
        </div>

        <!-- Botón para cerrar -->
        <div class="mt-6 text-right">
          <button
            @click="$emit('cerrar')"
            class="bg-[#A97C50] text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ClockIcon, FireIcon, UserGroupIcon, UserIcon } from '@heroicons/vue/outline'
import type { Receta } from '@/types/Receta'

defineProps<{
  receta: Receta
}>()

defineEmits(['cerrar'])

const getDificultadClass = (dificultad: string) => {
  const classes = {
    'Fácil': 'bg-green-100 text-green-800',
    'Intermedio': 'bg-yellow-100 text-yellow-800',
    'Difícil': 'bg-red-100 text-red-800'
  }
  return classes[dificultad as keyof typeof classes] || ''
}
</script>
