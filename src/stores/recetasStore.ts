// src/stores/recetasStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Receta } from '@/types/Receta'
import { getRecetas } from '@/services/recetasService'

export const useRecetasStore = defineStore('recetas', () => {
  const recetas = ref<Receta[]>([])

  const cargarRecetas = async () => {
    const res = await getRecetas()
    recetas.value = res.data
  }

  return { recetas, cargarRecetas }
})
