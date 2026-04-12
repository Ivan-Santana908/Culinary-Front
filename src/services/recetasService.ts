// src/services/recetasService.ts
import api from './api'
import type { Receta } from '@/types/Receta'

export const getRecetas = () => api.get<Receta[]>('/recetas')
export const getRecetaById = (id: string) => api.get<Receta>(`/recetas/${id}`)
export const createReceta = (data: Partial<Receta>) => api.post('/recetas', data)
