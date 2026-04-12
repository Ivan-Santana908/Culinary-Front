<template>
  <footer class="bg-[#A97C50] text-white py-6 px-4 mt-12 shadow-inner">
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
      <!-- Marca -->
      <div class="text-center md:text-left">
        <h4 class="text-lg font-bold tracking-wide">🍽️ Culinary Smart</h4>
        <p class="text-sm text-yellow-100">Inspirando sabor desde el código</p>
      </div>

      <!-- Enlaces rápidos -->
      <ul class="flex gap-6 text-sm font-medium">
        <li>
          <router-link to="/" class="hover:text-yellow-300 transition duration-200">
            Inicio
          </router-link>
        </li>
        <li>
          <router-link to="/recetas" class="hover:text-yellow-300 transition duration-200">
            Recetas
          </router-link>
        </li>
        <li>
          <router-link to="/agregar" class="hover:text-yellow-300 transition duration-200">
            Agregar
          </router-link>
        </li>
      </ul>

      <!-- Créditos -->
      <p class="text-xs text-yellow-100 text-center md:text-right">
        © 2025 — Proyecto escolar con sabor por Al 👨‍🍳
      </p>
    </div>
  </footer>
</template>
