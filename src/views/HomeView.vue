<template>
  <DefaultLayout>
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 min-h-screen flex items-center">
      <!-- Background pattern -->
      <div class="absolute inset-0 pattern-food opacity-5"></div>
      
      <!-- Decorative elements -->
      <div class="absolute top-20 left-10 text-6xl animate-float-slow opacity-20">🥘</div>
      <div class="absolute bottom-32 right-20 text-6xl animate-float-slow-2 opacity-20">🍜</div>
      <div class="absolute top-1/2 left-1/4 text-5xl animate-float-slow opacity-15">🥗</div>
      
      <!-- Hero content -->
      <div class="container mx-auto px-4 py-20 relative z-10">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <!-- Text content -->
          <div class="text-center lg:text-left space-y-8">
            <div class="inline-block">
              <span class="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                ✨ Tu cocina, reinventada
              </span>
            </div>
            <h1 class="text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
              Cocina como un
              <span class="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent block mt-2">
                Chef Profesional
              </span>
            </h1>
            <p class="text-xl lg:text-2xl text-gray-700 leading-relaxed">
              Descubre recetas personalizadas, planifica tus comidas y domina nuevas técnicas culinarias. 
              <strong class="text-amber-600">Todo en un solo lugar.</strong>
            </p>
            <div class="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-4">
              <router-link 
                to="/registro" 
                class="group px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-2xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 text-lg"
              >
                <span class="flex items-center justify-center gap-2">
                  Comenzar gratis
                  <span class="transform group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </router-link>
              <router-link 
                to="/login" 
                class="px-10 py-4 bg-white border-3 border-amber-500 text-amber-600 font-bold rounded-2xl hover:bg-amber-50 hover:border-amber-600 transition-all duration-300 shadow-lg text-lg"
              >
                Iniciar sesión
              </router-link>
            </div>
            <!-- Trust badges -->
            <div class="flex items-center justify-center lg:justify-start gap-8 pt-6 text-gray-600">
              <div class="text-center">
                <div class="text-3xl font-bold text-amber-600">1000+</div>
                <div class="text-sm">Recetas</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-amber-600">50k+</div>
                <div class="text-sm">Usuarios</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-amber-600">4.8⭐</div>
                <div class="text-sm">Rating</div>
              </div>
            </div>
          </div>

          <!-- Feature image -->
          <div class="relative">
            <div class="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=800&h=600"
                alt="Mesa con ingredientes frescos y plato preparado"
                class="rounded-3xl shadow-2xl w-full transform hover:scale-105 transition-transform duration-700"
              />
              <!-- Decorative blur -->
              <div class="absolute inset-0 bg-gradient-to-t from-amber-600/20 to-transparent rounded-3xl"></div>
            </div>
            <!-- Floating elements -->
            <div class="absolute -top-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl animate-float-slow border-4 border-amber-100">
              <span class="text-5xl block mb-2">🥗</span>
              <p class="font-bold text-gray-800 text-lg">Recetas</p>
              <p class="text-sm text-gray-600">Saludables</p>
            </div>
            <div class="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-2xl animate-float-slow-2 border-4 border-orange-100">
              <span class="text-5xl block mb-2">📅</span>
              <p class="font-bold text-gray-800 text-lg">Plan</p>
              <p class="text-sm text-gray-600">Semanal</p>
            </div>
            <div class="absolute top-1/2 -right-8 bg-gradient-to-br from-green-400 to-emerald-500 p-5 rounded-2xl shadow-2xl animate-bounce">
              <span class="text-4xl">✨</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center text-gray-900 mb-16">¿Por qué elegir Culinary Smart?</h2>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="bg-amber-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
            <div class="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center mb-4">
              <span class="text-3xl">�</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Personalización inteligente</h3>
            <p class="text-gray-600">
              Nuestro sistema aprende de tus preferencias y necesidades nutricionales para recomendarte las mejores recetas.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="bg-amber-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
            <div class="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center mb-4">
              <span class="text-3xl">📊</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Plan semanal eficiente</h3>
            <p class="text-gray-600">
              Organiza tus comidas de la semana de manera fácil y eficiente, ahorrando tiempo y evitando el desperdicio.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="bg-amber-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
            <div class="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center mb-4">
              <span class="text-3xl">👥</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Comunidad activa</h3>
            <p class="text-gray-600">
              Únete a una comunidad apasionada por la cocina, comparte tus recetas y aprende de otros chefs.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistics Section -->
    <section class="py-20 bg-gradient-to-br from-amber-500 to-orange-600 text-white">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-4xl font-bold mb-2">1000+</div>
            <div class="text-amber-100">Recetas disponibles</div>
          </div>
          <div>
            <div class="text-4xl font-bold mb-2">50k+</div>
            <div class="text-amber-100">Usuarios activos</div>
          </div>
          <div>
            <div class="text-4xl font-bold mb-2">4.8</div>
            <div class="text-amber-100">Calificación promedio</div>
          </div>
          <div>
            <div class="text-4xl font-bold mb-2">24/7</div>
            <div class="text-amber-100">Soporte disponible</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold text-gray-900 mb-6">
          ¿Listo para comenzar tu viaje culinario?
        </h2>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Únete a nuestra comunidad y descubre una nueva forma de cocinar, 
          aprender y compartir experiencias gastronómicas.
        </p>
        <router-link 
          to="/registro" 
          class="inline-block px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Crear cuenta gratis
        </router-link>
      </div>
    </section>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>

<style scoped>
.pattern-food {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

@keyframes float-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes float-slow-2 {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.animate-float-slow {
  animation: float-slow 4s ease-in-out infinite;
}

.animate-float-slow-2 {
  animation: float-slow-2 5s ease-in-out infinite;
}
</style>
