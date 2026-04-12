<template>
  <nav class="bg-gradient-to-r from-[#E67E22] to-[#8B0000] text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <router-link 
            to="/" 
            class="flex items-center gap-2 text-xl font-extrabold text-white hover:text-[#FFD700] transition-colors duration-200"
          >
            <span class="hidden sm:block">Culinary Smart</span>
          </router-link>
        </div>

        <div class="flex items-center space-x-4">
          <nav class="hidden md:flex space-x-8">
            <router-link 
              to="/recetas" 
              class="flex items-center px-3 py-2 text-sm font-medium text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
              active-class="bg-white/20"
            >
              <BookOpenIcon class="w-5 h-5 mr-1.5" />
              Recetas
            </router-link>

            <router-link 
              to="/yo" 
              class="flex items-center px-3 py-2 text-sm font-medium text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
              active-class="bg-white/20"
            >
              <UserCircleIcon class="w-5 h-5 mr-1.5" />
              Para mí
            </router-link>

            <router-link 
              to="/plan-semanal" 
              class="flex items-center px-3 py-2 text-sm font-medium text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
              active-class="bg-white/20"
            >
              <CalendarIcon class="w-5 h-5 mr-1.5" />
              Plan semanal
            </router-link>

            <router-link 
              v-if="usuario.rol === 'admin'"
              to="/admin" 
              class="flex items-center px-3 py-2 text-sm font-medium text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
              active-class="bg-white/20"
            >
              <CogIcon class="w-5 h-5 mr-1.5" />
              Administración
            </router-link>
            
            <router-link 
              v-if="usuario.rol === 'admin'"
              to="/agregar" 
              class="flex items-center px-3 py-2 text-sm font-medium text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
              active-class="bg-white/20"
            >
              <PlusIcon class="w-5 h-5 mr-1.5" />
              Agregar receta
            </router-link>
          </nav>

          <!-- Menú de usuario -->
          <div class="relative ml-3">
            <Menu as="div" class="relative">
              <MenuButton class="flex items-center px-3 py-2 text-sm font-medium text-white hover:bg-white/10 rounded-lg transition-colors duration-200">
                <UserIcon class="w-5 h-5 mr-1.5" />
                <span class="hidden sm:block">{{ usuario.nombre }}</span>
                <ChevronDownIcon class="w-4 h-4 ml-1" />
              </MenuButton>

              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <MenuItems class="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem v-slot="{ active }">
                    <button
                      @click="cerrarSesion"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'flex w-full items-center px-4 py-2 text-sm text-gray-700'
                      ]"
                    >
                      <LogoutIcon class="w-5 h-5 mr-2 text-gray-400" />
                      Cerrar sesión
                    </button>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>

          <!-- Botón menú móvil -->
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden rounded-lg p-2 hover:bg-white/10 transition-colors duration-200"
          >
            <MenuIcon v-if="!mobileMenuOpen" class="w-6 h-6" />
            <XIcon v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Menú móvil expandido -->
    <div v-if="mobileMenuOpen" class="md:hidden">
      <div class="space-y-1 px-4 pb-3 pt-2">
        <router-link 
          to="/recetas" 
          class="flex items-center px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
          active-class="bg-white/20"
          @click="mobileMenuOpen = false"
        >
          <BookOpenIcon class="w-5 h-5 mr-1.5" />
          Recetas
        </router-link>

        <router-link 
          to="/yo" 
          class="flex items-center px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
          active-class="bg-white/20"
          @click="mobileMenuOpen = false"
        >
          <UserCircleIcon class="w-5 h-5 mr-1.5" />
          Para mí
        </router-link>

        <router-link 
          to="/plan-semanal" 
          class="flex items-center px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
          active-class="bg-white/20"
          @click="mobileMenuOpen = false"
        >
          <CalendarIcon class="w-5 h-5 mr-1.5" />
          Plan semanal
        </router-link>

        <router-link 
          v-if="usuario.rol === 'admin'"
          to="/admin" 
          class="flex items-center px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
          active-class="bg-white/20"
          @click="mobileMenuOpen = false"
        >
          <CogIcon class="w-5 h-5 mr-1.5" />
          Administración
        </router-link>

        <router-link 
          v-if="usuario.rol === 'admin'"
          to="/agregar" 
          class="flex items-center px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
          active-class="bg-white/20"
          @click="mobileMenuOpen = false"
        >
          <PlusIcon class="w-5 h-5 mr-1.5" />
          Agregar receta
        </router-link>

        <button
          @click="cerrarSesion"
          class="flex w-full items-center px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
        >
          <LogoutIcon class="w-5 h-5 mr-1.5" />
          Cerrar sesión
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import {
  UserIcon,
  BookOpenIcon,
  UserCircleIcon,
  CalendarIcon,
  PlusIcon,
  LogoutIcon,
  MenuIcon,
  XIcon,
  ChevronDownIcon,
  AcademicCapIcon,
  CogIcon
} from '@heroicons/vue/outline'

const usuario = useUserStore()
const router = useRouter()
const mobileMenuOpen = ref(false)

function cerrarSesion() {
  mobileMenuOpen.value = false
  usuario.cerrarSesion()
  router.push('/login')
}
</script>
