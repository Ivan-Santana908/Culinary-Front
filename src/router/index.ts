import { createRouter, createWebHistory } from 'vue-router'

// Vistas
import HomeView from '@/views/HomeView.vue'
import RecetasView from '@/views/RecetasView.vue'
import AgregarRecetaView from '@/views/AgregarRecetaView.vue'
import DetalleRecetaView from '@/views/DetalleRecetaView.vue'
import LoginView from '@/views/LoginView.vue'
import RegistroView from '@/views/RegistroView.vue'
import CompletarPerfilView from '@/views/CompletarPerfilView.vue'
import ParaMiView from '@/views/ParaMiView.vue'
import PlanSemanalView from '@/views/PlanSemanalView.vue'
import AdminView from '@/views/AdminView.vue'
import MiDespensaView from '@/views/MiDespensaView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/registro', name: 'registro', component: RegistroView },
  {
    path: '/completar-perfil',
    name: 'completar-perfil',
    component: CompletarPerfilView,
    meta: { requiresAuth: true }
  },
  {
    path: '/recetas',
    name: 'recetas',
    component: RecetasView,
    meta: { requiresAuth: true }
  },
  {
    path: '/yo',
    name: 'para-mi',
    component: ParaMiView,
    meta: { requiresAuth: true }
  },
  {
    path: '/mi-despensa',
    name: 'mi-despensa',
    component: MiDespensaView,
    meta: { requiresAuth: true }
  },
  {
    path: '/agregar',
    name: 'agregar',
    component: AgregarRecetaView,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/recetas/:id',
    name: 'detalle-receta',
    component: DetalleRecetaView,
    props: true
  },
  {
    path: '/plan-semanal',
    name: 'plan-semanal',
    component: PlanSemanalView,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: { requiresAuth: true, requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('usuario') || 'null')

  // Si la ruta requiere autenticación y no hay usuario
  if (to.meta.requiresAuth && !user) {
    return next('/login')
  }

  // Solo redirigir a completar perfil si es usuario normal y no ha completado su perfil
  if (user && user.rol !== 'admin' && !user.perfilCompleto && to.path !== '/completar-perfil') {
    return next('/completar-perfil')
  }

  // Si la ruta requiere admin y el usuario no lo es
  if (to.meta.requiresAdmin && user?.rol !== 'admin') {
    return next('/recetas')
  }

  next()
})


export default router
