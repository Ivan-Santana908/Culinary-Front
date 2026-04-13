import type { ItemFaltante, RecordatorioFaltantes } from '@/services/recetasService'
import type { Receta } from '@/types/Receta'

export interface RecetaConMatch {
  receta: Receta
  recordatorio: RecordatorioFaltantes | null
  score: number
  faltantesCount: number
  faltantesPreview: string
}

export interface ItemCompra {
  nombre: string
  cantidad: number
  unidad: string
}

const INGREDIENTES_POR_UNIDAD = [
  'zanahoria',
  'papa',
  'tomate',
  'cebolla',
  'ajo',
  'limon',
  'lima',
  'aguacate',
  'banana',
  'banano',
  'manzana',
  'pera',
  'pepino',
  'pimiento',
  'calabacin',
  'berenjena',
  'naranja',
  'mandarina'
]

const INGREDIENTES_LIQUIDOS_BOTELLA = [
  'leche',
  'agua',
  'jugo',
  'zumo',
  'caldo',
  'bebida',
  'refresco'
]

const INGREDIENTES_LIQUIDOS_VOLUMEN = [
  'aceite',
  'vinagre',
  'salsa',
  'soya',
  'soja',
  'crema',
  'yogur',
  'yogurt'
]

const INGREDIENTES_POR_PESO = [
  'carne',
  'carne molida',
  'pollo',
  'pechuga de pollo',
  'pescado',
  'atun',
  'atun',
  'salmon',
  'res',
  'cerdo',
  'jamon',
  'tocino',
  'marisco',
  'camaron',
  'queso',
  'queso parmesano',
  'arroz',
  'arroz cocido',
  'pasta',
  'quinoa',
  'lentejas',
  'garbanzos cocidos'
]

export function normalizeText(value?: string): string {
  return (value || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export function normalizeUnit(value?: string): string {
  const raw = normalizeText(value)
  if (['gramo', 'gramos', 'gr'].includes(raw)) return 'g'
  if (['kilogramo', 'kilogramos', 'kilo', 'kilos'].includes(raw)) return 'kg'
  if (['mililitro', 'mililitros'].includes(raw)) return 'ml'
  if (['litro', 'litros'].includes(raw)) return 'l'
  if (['botella', 'botellas'].includes(raw)) return 'botella'
  if (['cucharada', 'cucharadas'].includes(raw)) return 'cucharada'
  if (['cucharadita', 'cucharaditas'].includes(raw)) return 'cucharadita'
  if (['taza', 'tazas'].includes(raw)) return 'taza'
  if (['pieza', 'piezas', 'unidad', 'unidades', 'un'].includes(raw)) return 'unidad'
  return raw || 'unidad'
}

export function containsWholeTerm(base: string, term: string): boolean {
  const normalizedBase = ` ${normalizeText(base)} `
  const normalizedTerm = ` ${normalizeText(term)} `
  return normalizedBase.includes(normalizedTerm)
}

function matchesAnyTerm(base: string, terms: string[]): boolean {
  return terms.some((term) => containsWholeTerm(base, term))
}

export function getIngredientName(ingrediente: any): string {
  const raw = ingrediente?.ingrediente
  if (typeof raw === 'string' && raw.trim()) return raw.trim()
  if (raw && typeof raw === 'object') {
    const fromObj = raw.nombre || raw.nombre_ingrediente || raw.ingrediente_nombre
    if (typeof fromObj === 'string' && fromObj.trim()) return fromObj.trim()
  }

  const direct = ingrediente?.nombre || ingrediente?.nombre_ingrediente || ingrediente?.ingrediente_nombre
  if (typeof direct === 'string' && direct.trim()) return direct.trim()

  return 'Ingrediente'
}

export function getIngredientQuantity(ingrediente: any): number {
  const raw = ingrediente?.cantidad ?? ingrediente?.pivot?.cantidad ?? ingrediente?.ingrediente?.cantidad ?? 0
  const value = typeof raw === 'string' ? Number(raw.replace(',', '.')) : Number(raw)
  return Number.isFinite(value) ? value : 0
}

export function getIngredientUnit(ingrediente: any): string {
  const raw = ingrediente?.unidad
    || ingrediente?.unidad_presentacion
    || ingrediente?.pivot?.unidad
    || ingrediente?.pivot?.unidad_presentacion
    || ingrediente?.ingrediente?.unidad
    || ingrediente?.ingrediente?.unidad_presentacion
    || ''

  return normalizeUnit(raw)
}

export function formatQuantity(value: number): string {
  return Number.isInteger(value) ? value.toString() : value.toFixed(1)
}

function isPieceBasedIngredient(nombre: string): boolean {
  return matchesAnyTerm(nombre, INGREDIENTES_POR_UNIDAD)
}

function isBottleBasedIngredient(nombre: string): boolean {
  return matchesAnyTerm(nombre, INGREDIENTES_LIQUIDOS_BOTELLA)
}

function isVolumeBasedIngredient(nombre: string): boolean {
  return matchesAnyTerm(nombre, INGREDIENTES_LIQUIDOS_VOLUMEN)
}

function isWeightBasedIngredient(nombre: string): boolean {
  return matchesAnyTerm(nombre, INGREDIENTES_POR_PESO)
}

export function getPreferredUnitForIngredient(nombre: string, unidadActual?: string): string {
  const baseUnit = normalizeUnit(unidadActual)

  if (isPieceBasedIngredient(nombre)) return 'unidad'
  if (isBottleBasedIngredient(nombre)) return ['ml', 'l', 'botella'].includes(baseUnit) ? baseUnit : 'botella'
  if (isVolumeBasedIngredient(nombre)) return 'ml'
  if (isWeightBasedIngredient(nombre)) return ['g', 'kg'].includes(baseUnit) ? baseUnit : 'kg'

  return baseUnit || 'unidad'
}

export function getUnitOptionsForIngredient(nombre: string, unidadCatalogo?: string): string[] {
  const base = normalizeUnit(unidadCatalogo)

  if (isPieceBasedIngredient(nombre)) return ['unidad']
  if (isBottleBasedIngredient(nombre)) return ['botella', 'l', 'ml']
  if (isVolumeBasedIngredient(nombre)) return ['ml', 'l']
  if (isWeightBasedIngredient(nombre)) return ['kg', 'g']

  return [base || 'unidad', 'unidad', 'kg', 'g', 'l', 'ml']
    .map((u) => normalizeUnit(u))
    .filter((v, i, arr) => !!v && arr.indexOf(v) === i)
}

function toMl(value: number, unit: string): number | null {
  if (unit === 'ml') return value
  if (unit === 'l') return value * 1000
  if (unit === 'botella') return value * 1000
  if (unit === 'taza') return value * 240
  if (unit === 'cucharada') return value * 15
  if (unit === 'cucharadita') return value * 5
  return null
}

function fromMl(valueMl: number, unit: string): number | null {
  if (unit === 'ml') return valueMl
  if (unit === 'l') return valueMl / 1000
  if (unit === 'botella') return valueMl / 1000
  return null
}

export function convertAmountForUnit(cantidad: number, fromUnitRaw: string, toUnitRaw: string): number {
  const fromUnit = normalizeUnit(fromUnitRaw)
  const toUnit = normalizeUnit(toUnitRaw)
  if (fromUnit === toUnit) return cantidad

  if (fromUnit === 'kg' && toUnit === 'g') return cantidad * 1000
  if (fromUnit === 'g' && toUnit === 'kg') return cantidad / 1000
  if (fromUnit === 'l' && toUnit === 'ml') return cantidad * 1000
  if (fromUnit === 'ml' && toUnit === 'l') return cantidad / 1000

  const ml = toMl(cantidad, fromUnit)
  if (ml !== null) {
    const converted = fromMl(ml, toUnit)
    if (converted !== null) return converted
  }

  if (toUnit === 'unidad' && (fromUnit === 'g' || fromUnit === 'kg')) {
    const gramos = fromUnit === 'kg' ? cantidad * 1000 : cantidad
    return Math.max(1, Math.round(gramos / 100))
  }

  return cantidad
}

export function normalizeForStorage(cantidad: number, unidadRaw: string): { cantidad: number; unidad: string } {
  const unidad = normalizeUnit(unidadRaw)

  if (unidad === 'kg') {
    return { cantidad: cantidad * 1000, unidad: 'g' }
  }

  if (unidad === 'l' || unidad === 'botella') {
    return { cantidad: cantidad * 1000, unidad: 'ml' }
  }

  return { cantidad, unidad }
}

export function resolveDisplayMeasure(nombre: string, cantidad: number, unidad: string) {
  const normalizedUnit = normalizeUnit(unidad)

  if (isPieceBasedIngredient(nombre) && ['g', 'kg'].includes(normalizedUnit)) {
    const piezasEstimadas = normalizedUnit === 'kg'
      ? Math.max(1, Math.round(cantidad * 10))
      : Math.max(1, Math.round(cantidad / 100))

    return {
      cantidad: piezasEstimadas,
      unidad: piezasEstimadas === 1 ? 'pieza' : 'piezas'
    }
  }

  if (!normalizedUnit || normalizedUnit === 'unidad') {
    return {
      cantidad,
      unidad: cantidad === 1 ? 'unidad' : 'unidades'
    }
  }

  return {
    cantidad,
    unidad: normalizedUnit
  }
}

export function getRecetaId(receta: Receta): string {
  return String(receta._id || receta.id || '')
}

export function buildRecetasConMatch(recetas: Receta[], recordatorios: RecordatorioFaltantes[]): RecetaConMatch[] {
  const recordatorioPorReceta = new Map(recordatorios.map((recordatorio) => [recordatorio.receta_id, recordatorio]))

  return recetas
    .map((receta) => {
      const recordatorio = recordatorioPorReceta.get(getRecetaId(receta)) || null
      const totalIngredientes = receta.ingredientes?.length || 1
      const faltantesCount = recordatorio?.faltantes_count ?? 0
      const disponibles = Math.max(0, totalIngredientes - faltantesCount)
      const score = Math.round((disponibles / totalIngredientes) * 100)
      const faltantesPreview = recordatorio?.faltantes?.slice(0, 3).map((item) => item.nombre).join(' • ') || ''

      return {
        receta,
        recordatorio,
        score,
        faltantesCount,
        faltantesPreview
      }
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      if (a.faltantesCount !== b.faltantesCount) return a.faltantesCount - b.faltantesCount
      return a.receta.titulo.localeCompare(b.receta.titulo)
    })
}

export function buildListaCompra(recordatorios: RecordatorioFaltantes[]): ItemCompra[] {
  const acumulado = new Map<string, ItemCompra>()

  recordatorios
    .filter((recordatorio) => !recordatorio.puede_preparar)
    .flatMap((recordatorio) => recordatorio.faltantes || [])
    .forEach((faltante: ItemFaltante) => {
      const nombre = (faltante.nombre || '').trim()
      if (!nombre) return

      const unidadOriginal = normalizeUnit(faltante.unidad)
      const unidad = getPreferredUnitForIngredient(nombre, unidadOriginal)
      const key = `${normalizeText(nombre)}|${unidad}`
      const actual = acumulado.get(key)
      const cantidadRaw = Number(faltante.faltante || 0)
      const cantidad = convertAmountForUnit(cantidadRaw, unidadOriginal, unidad)

      acumulado.set(key, {
        nombre,
        cantidad: (actual?.cantidad || 0) + cantidad,
        unidad
      })
    })

  return Array.from(acumulado.values()).sort((a, b) => a.nombre.localeCompare(b.nombre))
}

export function buildListaCompraTexto(items: ItemCompra[]): string {
  if (items.length === 0) {
    return 'No hay ingredientes faltantes.'
  }

  return [
    'Lista de compra CulinarySmart',
    '',
    ...items.map((item) => `- ${item.nombre}: ${formatQuantity(item.cantidad)} ${item.unidad}`)
  ].join('\n')
}