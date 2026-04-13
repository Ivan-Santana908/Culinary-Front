<template>
  <div
    class="group bg-white shadow-md hover:shadow-xl rounded-xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-amber-200"
    @click="emit('click', receta)"
  >
    <!-- Imagen con overlay gradiente -->
    <div class="relative h-44 overflow-hidden">
      <img
        :src="receta.imagen || '/placeholder-receta.svg'"
        :alt="receta.titulo"
        @error="onImageError"
        loading="lazy"
        decoding="async"
        fetchpriority="low"
        class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
      />
      <!-- Overlay gradiente -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <!-- Badge de dificultad -->
      <div class="absolute top-3 right-3 flex space-x-2">
        <span 
          class="px-3 py-1.5 text-xs font-bold rounded-xl backdrop-blur-sm shadow-lg"
          :class="getDificultadClass(receta.dificultad)"
        >
          {{ receta.dificultad }}
        </span>
      </div>

      <!-- Icono flotante en hover -->
      <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div class="bg-white rounded-full p-3 shadow-xl transform scale-0 group-hover:scale-100 transition-transform duration-300">
          <span class="text-3xl">👁️</span>
        </div>
      </div>
    </div>

    <!-- Contenido -->
    <div class="p-4">
      <h3 class="text-lg font-bold text-gray-900 mb-1.5 group-hover:text-amber-600 transition-colors duration-300 line-clamp-1">
        {{ receta.titulo }}
      </h3>
      <div class="flex flex-wrap gap-1.5 mb-2" v-if="matchScore !== null || faltantesCount > 0">
        <span
          v-if="matchScore !== null"
          class="px-2.5 py-1 rounded-full text-[11px] font-semibold"
          :class="matchScore >= 80 ? 'bg-green-100 text-green-700' : (matchScore >= 50 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-700')"
        >
          Coincidencia {{ matchScore }}%
        </span>
        <span v-if="faltantesCount > 0" class="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-700">
          Faltan {{ faltantesCount }}
        </span>
      </div>
      <p v-if="faltantesPreview" class="text-[11px] text-gray-500 mb-2 line-clamp-1">
        {{ faltantesPreview }}
      </p>
      <p class="text-gray-600 text-xs mb-3 line-clamp-2 leading-relaxed">
        {{ receta.descripcion }}
      </p>

      <!-- Stats -->
      <div class="grid grid-cols-3 gap-1.5 mb-3">
        <div class="bg-blue-50 rounded-lg p-1.5 text-center">
          <div class="text-base">⏱️</div>
          <div class="text-xs font-semibold text-blue-700">
            {{ (receta.tiempo_preparacion || 0) + (receta.tiempo_coccion || 0) }}'
          </div>
        </div>
        <div class="bg-orange-50 rounded-lg p-2 text-center">
          <div class="text-lg">🔥</div>
          <div class="text-xs font-semibold text-orange-700">
            {{ receta.calorias_porcion || 0 }} kcal
          </div>
        </div>
        <div class="bg-green-50 rounded-lg p-2 text-center">
          <div class="text-lg">🍽️</div>
          <div class="text-xs font-semibold text-green-700">
            {{ receta.porciones || 2 }} pers.
          </div>
        </div>
      </div>

      <!-- Ingredientes principales -->
      <div class="mb-3">
        <div class="flex flex-wrap gap-1.5">
          <span
            v-for="(ing, index) in receta.ingredientes.slice(0, 3)"
            :key="index"
            class="bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold border border-amber-200"
          >
            {{ getIngredientName(ing) }}
          </span>
          <span
            v-if="receta.ingredientes.length > 3"
            class="text-gray-500 text-xs font-semibold px-3 py-1 bg-gray-100 rounded-full"
          >
            +{{ receta.ingredientes.length - 3 }}
          </span>
        </div>
      </div>

      <!-- Botón de acción -->
      <button class="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold py-2.5 rounded-xl transition-all duration-300 transform group-hover:scale-105 shadow-md hover:shadow-lg">
        Ver receta completa
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Receta } from '@/types/Receta'

const props = defineProps<{
  receta: Receta
  matchScore?: number | null
  faltantesCount?: number
  faltantesPreview?: string
}>()

const emit = defineEmits<{
  (e: 'click', receta: Receta): void
}>()

const getDificultadClass = (dificultad?: string) => {
  if (!dificultad) return 'bg-gray-500/90 text-white'
  const classes: Record<string, string> = {
    'Fácil': 'bg-green-500/90 text-white',
    'Media': 'bg-yellow-500/90 text-white',
    'Intermedio': 'bg-yellow-500/90 text-white',
    'Difícil': 'bg-red-500/90 text-white',
    'Avanzado': 'bg-red-500/90 text-white'
  }
  return classes[dificultad] || 'bg-gray-500/90 text-white'
}

const matchScore = props.matchScore ?? null
const faltantesCount = props.faltantesCount ?? 0
const faltantesPreview = props.faltantesPreview ?? ''

const onImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  if (target.dataset.fallbackApplied === '1') return
  target.dataset.fallbackApplied = '1'
  target.src = '/placeholder-receta.svg'
}

const getIngredientName = (ing: any) => {
  const raw = ing?.ingrediente
  if (typeof raw === 'string' && raw.trim()) return raw.trim()
  if (raw && typeof raw === 'object') {
    const fromObj = raw.nombre || raw.nombre_ingrediente || raw.ingrediente_nombre
    if (typeof fromObj === 'string' && fromObj.trim()) return fromObj.trim()
  }
  const direct = ing?.nombre || ing?.nombre_ingrediente || ing?.ingrediente_nombre
  if (typeof direct === 'string' && direct.trim()) return direct.trim()
  return 'Ingrediente'
}
</script>
