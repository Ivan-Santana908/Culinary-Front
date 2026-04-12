interface Ingrediente {
  id?: number
  nombre: string
  unidad: string
}

interface RecetaIngrediente {
  ingrediente?: Ingrediente
  // Flat structure from API response
  nombre?: string
  unidad?: string
  cantidad: number
}

interface Autor {
  id: number
  nombre: string
}

export interface Receta {
  id?: number
  _id?: string
  titulo: string
  descripcion: string
  imagen?: string
  tiempo_preparacion?: number
  tiempo_coccion?: number
  calorias_porcion?: number
  porciones?: number
  dificultad?: 'Fácil' | 'Intermedio' | 'Difícil'
  tipo?: string
  autor?: Autor
  ingredientes: RecetaIngrediente[]
  pasos?: string[]
}

export type { Ingrediente, RecetaIngrediente, Autor }
