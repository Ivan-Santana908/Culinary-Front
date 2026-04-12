<template>
  <router-view />
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'

const usuario = useUserStore()
usuario.cargarDesdeLocalStorage()
</script>
