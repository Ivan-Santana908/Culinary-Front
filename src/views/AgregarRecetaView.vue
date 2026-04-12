<template>
  <DefaultLayout>
    <div class="max-w-4xl mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8 text-gray-800">Agregar Nueva Receta</h1>
      
      <form @submit.prevent="handleSubmit" class="bg-white shadow-lg rounded-lg p-6 space-y-6">
        <!-- Información básica -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Título de la Receta
            </label>
            <input 
              v-model="recipeForm.titulo" 
              type="text" 
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Ej: Pasta Carbonara"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Categoría
            </label>
            <select 
              v-model="recipeForm.categoria"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Selecciona una categoría</option>
              <option value="desayuno">Desayuno</option>
              <option value="almuerzo">Almuerzo</option>
              <option value="cena">Cena</option>
              <option value="postre">Postre</option>
              <option value="bebida">Bebida</option>
              <option value="snack">Snack</option>
            </select>
          </div>

          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea 
              v-model="recipeForm.descripcion"
              required
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Breve descripción de la receta..."
            ></textarea>
          </div>
        </div>

        <!-- Imagen de la receta -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Imagen de la Receta
          </label>
          <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div class="space-y-1 text-center">
              <div v-if="imagePreview" class="mb-4">
                <img :src="imagePreview" alt="Preview" class="mx-auto h-32 w-auto">
              </div>
              <div v-else class="flex text-sm text-gray-600">
                <label
                  for="file-upload"
                  class="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
                >
                  <span>Subir una imagen</span>
                  <input 
                    id="file-upload" 
                    type="file" 
                    class="sr-only" 
                    @change="handleImageUpload" 
                    accept="image/*"
                  >
                </label>
                <p class="pl-1">o arrastra y suelta</p>
              </div>
              <p class="text-xs text-gray-500">
                PNG, JPG, GIF hasta 10MB
              </p>
            </div>
          </div>
        </div>

        <!-- Detalles de la receta -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Tiempo de Preparación (min)
            </label>
            <input 
              v-model="recipeForm.tiempo_preparacion" 
              type="number" 
              required
              min="1"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Porciones
            </label>
            <input 
              v-model="recipeForm.porciones" 
              type="number"
              required
              min="1"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Calorías por Porción
            </label>
            <input 
              v-model="recipeForm.calorias" 
              type="number"
              required
              min="0"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        <!-- Ingredientes -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Ingredientes
          </label>
          <div class="space-y-2">
            <div v-for="(ing, index) in recipeForm.ingredientes" :key="index" class="flex gap-2">
              <input 
                v-model="ing.cantidad"
                type="text"
                placeholder="Cantidad"
                class="w-1/4 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <input 
                v-model="ing.unidad"
                type="text"
                placeholder="Unidad"
                class="w-1/4 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <input 
                v-model="ing.nombre"
                type="text"
                placeholder="Ingrediente"
                class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button 
                type="button"
                @click="removeIngrediente(index)"
                class="p-2 text-red-600 hover:text-red-800"
              >
                <TrashIcon class="h-5 w-5" />
              </button>
            </div>
          </div>
          <button 
            type="button"
            @click="addIngrediente"
            class="mt-2 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            <PlusIcon class="h-4 w-4 mr-1" />
            Agregar Ingrediente
          </button>
        </div>

        <!-- Pasos -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Pasos de Preparación
          </label>
          <div class="space-y-2">
            <div v-for="(paso, index) in recipeForm.pasos" :key="index" class="flex gap-2">
              <div class="flex-none w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-semibold">
                {{ index + 1 }}
              </div>
              <textarea 
                v-model="paso.descripcion"
                rows="2"
                class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                :placeholder="`Paso ${index + 1}`"
              ></textarea>
              <button 
                type="button"
                @click="removePaso(index)"
                class="p-2 text-red-600 hover:text-red-800"
              >
                <TrashIcon class="h-5 w-5" />
              </button>
            </div>
          </div>
          <button 
            type="button"
            @click="addPaso"
            class="mt-2 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            <PlusIcon class="h-4 w-4 mr-1" />
            Agregar Paso
          </button>
        </div>

        <!-- Botones de acción -->
        <div class="flex justify-end space-x-3 pt-6">
          <button
            type="button"
            @click="$router.back()"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Guardar Receta
          </button>
        </div>
      </form>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { PlusIcon, TrashIcon } from '@heroicons/vue/outline'
import axios from '@/services/axios'
import type { Recipe, Ingrediente, Paso } from '@/types'

const router = useRouter()
const imagePreview = ref<string | null>(null)
const selectedFile = ref<File | null>(null)

const recipeForm = ref<Recipe>({
  titulo: '',
  descripcion: '',
  categoria: '',
  tiempo_preparacion: 0,
  porciones: 1,
  calorias: 0,
  ingredientes: [{
    cantidad: '',
    unidad: '',
    nombre: ''
  }],
  pasos: [{
    descripcion: ''
  }]
})

const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    selectedFile.value = file
    const reader = new FileReader()
    reader.onload = e => {
      imagePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const addIngrediente = () => {
  recipeForm.value.ingredientes.push({
    cantidad: '',
    unidad: '',
    nombre: ''
  })
}

const removeIngrediente = (index: number) => {
  if (recipeForm.value.ingredientes.length > 1) {
    recipeForm.value.ingredientes.splice(index, 1)
  }
}

const addPaso = () => {
  recipeForm.value.pasos.push({
    descripcion: ''
  })
}

const removePaso = (index: number) => {
  if (recipeForm.value.pasos.length > 1) {
    recipeForm.value.pasos.splice(index, 1)
  }
}

const handleSubmit = async () => {
  try {
    const formData = new FormData()
    
    // Agregar la imagen si existe
    if (selectedFile.value) {
      formData.append('imagen', selectedFile.value)
    }
    
    // Agregar los datos de la receta
    formData.append('data', JSON.stringify(recipeForm.value))
    
    await axios.post('/api/recipes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    
    router.push('/admin')
  } catch (error: any) {
    alert('Error al guardar la receta: ' + error.response?.data?.message || error.message)
  }
}
</script>
