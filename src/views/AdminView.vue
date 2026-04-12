<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6 text-gray-800">Panel de Administración</h1>
      
      <!-- Loading Indicator -->
      <div v-if="isLoading" class="flex justify-center items-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline"> {{ error }}</span>
      </div>

      <!-- Tabs -->
      <div v-if="!isLoading" class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="border-b border-gray-200">
          <nav class="flex -mb-px">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'px-6 py-4 text-sm font-medium whitespace-nowrap flex items-center',
                activeTab === tab.id
                  ? 'border-b-2 border-orange-500 text-orange-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              <component :is="tab.icon" class="w-5 h-5 mr-2" />
              {{ tab.name }}
            </button>
          </nav>
        </div>

        <div class="p-6">
          <!-- Contenido de las pestañas -->
          <div v-if="activeTab === 'users'" class="space-y-6">
            <!-- Barra de búsqueda y botón de crear -->
            <div class="flex justify-between items-center mb-6">
              <div class="relative flex-1 max-w-md">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Buscar usuarios..."
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <SearchIcon class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              <button
                @click="showCreateModal = true"
                class="ml-4 inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                <PlusIcon class="w-5 h-5 mr-2" />
                Nuevo Usuario
              </button>
            </div>

            <!-- Tabla de usuarios -->
            <div class="bg-white rounded-lg shadow overflow-hidden">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="user in filteredUsers" :key="user._id" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="h-10 w-10 flex-shrink-0">
                          <div class="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                            <span class="text-orange-600 font-medium">{{ user.nombre[0]?.toUpperCase() }}</span>
                          </div>
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">{{ user.nombre }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ user.email }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                        :class="user.rol === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'">
                        {{ user.rol }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                        :class="user.perfilCompleto ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'">
                        {{ user.perfilCompleto ? 'Completo' : 'Incompleto' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        @click="editUser(user)"
                        class="text-orange-600 hover:text-orange-900 mr-3"
                      >
                        <PencilAltIcon class="h-5 w-5" />
                      </button>
                      <button
                        @click="deleteUser(user._id)"
                        class="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon class="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div v-else-if="activeTab === 'recipes'" class="space-y-6">
            <!-- Barra de búsqueda y botón de crear receta -->
            <div class="flex justify-between items-center mb-6">
              <div class="relative flex-1 max-w-md">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Buscar recetas..."
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <SearchIcon class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              <button
                @click="$router.push('/agregar')"
                class="ml-4 inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                <PlusIcon class="w-5 h-5 mr-2" />
                Nueva Receta
              </button>
            </div>

            <!-- Grid de recetas -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="recipe in filteredRecipes" :key="recipe._id" 
                class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  :src="recipe.imagen || '/images/default-recipe.jpg'" 
                  :alt="recipe.titulo"
                  class="w-full h-48 object-cover"
                />
                <div class="p-4">
                  <h3 class="text-lg font-semibold text-gray-900">{{ recipe.titulo }}</h3>
                  <p class="mt-1 text-sm text-gray-500">{{ recipe.descripcion }}</p>
                  <div class="mt-4 flex justify-between items-center">
                    <div class="text-sm text-gray-600">
                      {{ recipe.tiempo_preparacion }}min | {{ recipe.porciones }} porciones
                    </div>
                    <div class="flex space-x-2">
                      <button
                        @click="editRecipe(recipe)"
                        class="text-orange-600 hover:text-orange-900"
                      >
                        <PencilAltIcon class="h-5 w-5" />
                      </button>
                      <button
                        @click="deleteRecipe(recipe._id)"
                        class="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon class="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="activeTab === 'backup'" class="space-y-6">
            <div class="bg-white rounded-lg shadow-lg p-6">
              <h2 class="text-xl font-semibold mb-4 text-gray-900">Respaldo de Base de Datos</h2>
              
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-4">
                    Seleccionar Colecciones a Respaldar
                  </label>
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div v-for="collection in collections" :key="collection" 
                      class="relative flex items-center">
                      <input
                        type="checkbox"
                        v-model="selectedCollections"
                        :value="collection"
                        :id="collection"
                        class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                      >
                      <label :for="collection" class="ml-3 text-sm text-gray-700">
                        {{ collection }}
                      </label>
                    </div>
                  </div>
                </div>

                <div class="flex justify-end mt-6">
                  <button
                    @click="createBackup"
                    class="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
                    :disabled="!selectedCollections.length"
                  >
                    <SaveIcon class="w-5 h-5 mr-2" />
                    Crear Respaldo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Edición/Creación de Usuario -->
    <div v-if="showEditModal || showCreateModal" 
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg max-w-md w-full p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">
            {{ showCreateModal ? 'Crear Usuario' : 'Editar Usuario' }}
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
            <XIcon class="h-6 w-6" />
          </button>
        </div>

        <form @submit.prevent="submitUserForm" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              v-model="userForm.nombre"
              type="text"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="userForm.email"
              type="email"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Rol</label>
            <select
              v-model="userForm.rol"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <div v-if="showCreateModal">
            <label class="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              v-model="userForm.password"
              type="password"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-orange-600 text-white rounded-md text-sm font-medium hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              {{ showCreateModal ? 'Crear' : 'Guardar' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/axios'
import { 
  UserGroupIcon, 
  BookOpenIcon, 
  DatabaseIcon,
  PencilAltIcon,
  TrashIcon,
  SearchIcon,
  PlusIcon,
  SaveIcon,
  XIcon
} from '@heroicons/vue/outline'

const router = useRouter()

// Estado de la interfaz
const activeTab = ref('users')
const isLoading = ref(false)
const error = ref('')
const showEditModal = ref(false)
const showCreateModal = ref(false)
const searchQuery = ref('')

// Importar tipos
import type { User, Recipe } from '@/types'

// Datos
const users = ref<User[]>([])
const recipes = ref<(Recipe & { _id?: string })[]>([])
const collections = ref<string[]>([])
const selectedCollections = ref<string[]>([])
const backupPath = ref('')
const selectedUser = ref<User | null>(null)
const selectedRecipe = ref<Recipe | null>(null)

// Formularios
const userForm = ref({
  nombre: '',
  email: '',
  rol: 'user',
  password: ''
})

const recipeForm = ref({
  titulo: '',
  descripcion: '',
  ingredientes: [],
  pasos: [],
  tiempo_preparacion: 0,
  porciones: 1,
  calorias: 0
})

// Configuración de pestañas
const tabs = [
  { id: 'users', name: 'Usuarios', icon: UserGroupIcon },
  { id: 'recipes', name: 'Recetas', icon: BookOpenIcon },
  { id: 'backup', name: 'Respaldo', icon: DatabaseIcon }
]

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value
  const query = searchQuery.value.toLowerCase()
  return users.value.filter(user => 
    user.nombre.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query) ||
    user.rol.toLowerCase().includes(query)
  )
})

const filteredRecipes = computed(() => {
  if (!searchQuery.value) return recipes.value
  const query = searchQuery.value.toLowerCase()
  return recipes.value.filter(recipe => 
    recipe.titulo.toLowerCase().includes(query) ||
    recipe.descripcion.toLowerCase().includes(query)
  )
})

// Cargar datos iniciales
onMounted(async () => {
  isLoading.value = true
  try {
    const [usersResponse, recipesResponse, collectionsResponse] = await Promise.all([
      api.get('/admin/users'),
      api.get('/admin/recipes'),
      api.get('/admin/backup/collections')
    ])
    users.value = usersResponse.data.users
    recipes.value = recipesResponse.data.recipes
    collections.value = collectionsResponse.data.collections
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Error al cargar los datos'
    console.error('Error al cargar datos:', err)
  } finally {
    isLoading.value = false
  }
})

// Funciones para usuarios
const editUser = (user: any) => {
  selectedUser.value = user
  userForm.value = {
    nombre: user.nombre,
    email: user.email,
    rol: user.rol,
    password: ''
  }
  showEditModal.value = true
}

const closeModal = () => {
  showEditModal.value = false
  showCreateModal.value = false
  selectedUser.value = null
  userForm.value = {
    nombre: '',
    email: '',
    rol: 'user',
    password: ''
  }
}

const submitUserForm = async () => {
  try {
    if (showCreateModal.value) {
      const response = await api.post<{user: User}>('/admin/users', userForm.value)
      users.value.push(response.data.user)
    } else if (selectedUser.value) {
      const response = await api.put<{user: User}>(`/admin/users/${selectedUser.value._id}`, userForm.value)
      const index = users.value.findIndex(u => u._id === selectedUser.value!._id)
      if (index !== -1) {
        users.value[index] = response.data.user
      }
    }
    closeModal()
  } catch (error: any) {
    alert('Error al guardar usuario: ' + error.response?.data?.message || error.message)
  }
}

const deleteUser = async (userId: string) => {
  if (!confirm('¿Estás seguro de que deseas eliminar este usuario?')) return
  
  try {
    await api.delete(`/admin/users/${userId}`)
    users.value = users.value.filter(u => u._id !== userId)
  } catch (error: any) {
    alert('Error al eliminar usuario: ' + error.response?.data?.message || error.message)
  }
}

// Funciones para recetas
const editRecipe = (recipe: any) => {
  selectedRecipe.value = recipe
  // Redirigir a la página de edición de recetas
  router.push(`/recetas/${recipe._id}/editar`)
}

const deleteRecipe = async (recipeId: string | undefined) => {
  if (!recipeId) return
  if (!confirm('¿Estás seguro de que deseas eliminar esta receta?')) return
  
  try {
    await api.delete(`/admin/recipes/${recipeId}`)
    recipes.value = recipes.value.filter(r => r._id !== recipeId)
  } catch (error: any) {
    alert('Error al eliminar receta: ' + error.response?.data?.message || error.message)
  }
}

// Función para respaldo
const createBackup = async () => {
  if (!selectedCollections.value.length) {
    alert('Por favor selecciona al menos una colección')
    return
  }

  try {
    const response = await api.post('/admin/backup/create', 
      { collections: selectedCollections.value },
      { responseType: 'blob' } // Importante: especificar que esperamos un blob
    )

    // Crear un objeto URL para el blob
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    
    // Obtener el nombre del archivo del header de la respuesta o usar uno por defecto
    const contentDisposition = response.headers['content-disposition']
    const fileName = contentDisposition
      ? contentDisposition.split('filename=')[1].replace(/['"]/g, '')
      : `backup_${new Date().toISOString().split('T')[0]}.json`
    
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)

    alert('Respaldo descargado exitosamente')
  } catch (error: any) {
    console.error('Error completo:', error)
    alert('Error al crear el respaldo: ' + (error.response?.data?.message || error.message))
  }
}
</script>
