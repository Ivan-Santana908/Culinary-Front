<template>
  <nav class="bg-gradient-to-r from-[#E67E22] to-[#8B0000] text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <router-link 
            to="/" 
            class="flex items-center gap-2 text-xl font-extrabold text-white hover:text-[#FFD700] transition-colors duration-200"
          >
            <span class="text-2xl">🍽️</span>
            <span class="hidden sm:block">Culinary Smart</span>
          </router-link>
        </div>

        <div class="flex items-center space-x-4">
          <nav class="hidden md:flex space-x-8">
            <router-link 
              to="/" 
              class="flex items-center px-3 py-2 text-sm font-medium text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
              active-class="bg-white/20"
            >
              <HomeIcon class="w-5 h-5 mr-1.5" />
              Inicio
            </router-link>

            <router-link 
              to="/login" 
              class="flex items-center px-3 py-2 text-sm font-medium text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
              active-class="bg-white/20"
            >
              <LoginIcon class="w-5 h-5 mr-1.5" />
              Iniciar sesión
            </router-link>
          </nav>

          <!-- Menú móvil -->
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
          to="/" 
          class="flex items-center px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
          active-class="bg-white/20"
          @click="mobileMenuOpen = false"
        >
          <HomeIcon class="w-5 h-5 mr-1.5" />
          Inicio
        </router-link>

        <router-link 
          to="/login" 
          class="flex items-center px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
          active-class="bg-white/20"
          @click="mobileMenuOpen = false"
        >
          <LoginIcon class="w-5 h-5 mr-1.5" />
          Iniciar sesión
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  HomeIcon,
  LoginIcon,
  MenuIcon,
  XIcon
} from '@heroicons/vue/outline'

const mobileMenuOpen = ref(false)
</script>
