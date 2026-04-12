import { reactive } from 'vue'
import type { Receta } from '@/types/Receta'

export const planSemanal = reactive<Record<string, Receta | null>>({
  lunes: null,
  martes: null,
  miércoles: null,
  jueves: null,
  viernes: null,
  sábado: null,
  domingo: null
})
