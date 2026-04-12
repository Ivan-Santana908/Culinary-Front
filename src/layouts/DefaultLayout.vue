<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import NavbarPublic from '@/components/shared/NavbarPublic.vue'
import NavbarPrivado from '@/components/shared/NavbarPrivado.vue'

const usuario = useUserStore()

onMounted(() => {
  usuario.cargarDesdeLocalStorage()
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <component :is="usuario.isLoggedIn ? NavbarPrivado : NavbarPublic" />
    <main class="flex-1 px-4 py-6">
      <slot />
    </main>
  </div>
</template>

