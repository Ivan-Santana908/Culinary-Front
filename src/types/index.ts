export interface User {
  _id: string;
  nombre: string;
  email: string;
  rol: 'admin' | 'user';
  perfilCompleto?: boolean;
  alergias?: string[];
  preferencias?: string[];
  metaCalorias?: number;
}

export interface Ingrediente {
  cantidad: string;
  unidad: string;
  nombre: string;
}

export interface Paso {
  descripcion: string;
}

export interface Recipe {
  _id?: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  imagen?: string;
  tiempo_preparacion: number;
  porciones: number;
  ingredientes: Ingrediente[];
  pasos: Paso[];
  calorias: number;
  usuario_id?: string;
  created_at?: string;
  updated_at?: string;
}
