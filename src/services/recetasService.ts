// src/services/recetasService.ts
import api from './api'
import type { Receta } from '@/types/Receta'

export const getRecetas = () => api.get<Receta[]>('/recetas')
export const getRecetaById = (id: string) => api.get<Receta>(`/recetas/${id}`)
export const createReceta = (data: Partial<Receta>) => api.post('/recetas', data)

export interface ItemFaltante {
	nombre: string
	faltante: number
	unidad: string
}

export interface RecordatorioFaltantes {
	receta_id: string
	titulo: string
	puede_preparar: boolean
	faltantes: ItemFaltante[]
	faltantes_count: number
}

export interface RecetasDisponiblesResponse {
	recetas: Receta[]
	ingredientes_disponibles: string[]
	recordatorios: RecordatorioFaltantes[]
	total: number
}

export const getRecetasDisponibles = () =>
	api.get<RecetasDisponiblesResponse>('/despensa/recetas-disponibles')
