import { defineStore } from 'pinia'
import type { Router } from 'vue-router'
import api from '@/services/axios'

type Rol = 'admin' | 'user'

interface UsuarioData {
  nombre: string
  rol: Rol
  preferencias?: string[]
  alergias?: string[]
  metaCalorias?: number
  perfilCompleto?: boolean
}

function resolverPerfilCompleto(datos: UsuarioData): boolean {
  if (datos.rol === 'admin') return true

  if (typeof datos.perfilCompleto === 'boolean') {
    return datos.perfilCompleto
  }

  return (
    datos.rol === 'user' &&
    (datos.metaCalorias ?? 0) > 0 &&
    (datos.preferencias?.length ?? 0) > 0
  )
}

export const useUserStore = defineStore('usuario', {
  state: () => ({
    isLoggedIn: false,
    rol: '' as Rol | '',
    nombre: '',
    preferencias: [] as string[],
    alergias: [] as string[],
    metaCalorias: 0,
    perfilCompleto: false
  }),

  getters: {
    perfilCompletoLocal(state): boolean {
      return resolverPerfilCompleto({
        nombre: state.nombre,
        rol: state.rol as Rol,
        preferencias: state.preferencias,
        alergias: state.alergias,
        metaCalorias: state.metaCalorias,
        perfilCompleto: state.perfilCompleto
      })
    }
  },

  actions: {
    async iniciarSesion(datos: UsuarioData, router: Router) {
      this.isLoggedIn = true
      this.nombre = datos.nombre
      this.rol = datos.rol
      this.preferencias = datos.preferencias ?? []
      this.alergias = datos.alergias ?? []
      this.metaCalorias = datos.metaCalorias ?? 0
      this.perfilCompleto = resolverPerfilCompleto(datos)

      this.guardarEnLocalStorage()

      const token = localStorage.getItem('token')
      if (!token || token.trim() === '') {
        this.cerrarSesion()
        router.push('/login')
        return
      }

      try {
        const { data: perfil } = await api.get('/yo')

        this.metaCalorias = perfil.metaCalorias ?? this.metaCalorias
        this.preferencias = perfil.preferencias ?? this.preferencias
        this.alergias = perfil.alergias ?? this.alergias
        this.perfilCompleto = resolverPerfilCompleto({
          nombre: this.nombre,
          rol: this.rol as Rol,
          preferencias: this.preferencias,
          alergias: this.alergias,
          metaCalorias: this.metaCalorias,
          perfilCompleto: perfil.perfilCompleto
        })

        this.guardarEnLocalStorage()
      } catch (error: any) {
        console.error('Error al cargar perfil completo:', error)

        if (error.response?.status === 401) {
          this.cerrarSesion()
          router.push('/login')
        } else {
          // Si es 500, no cerramos sesión, solo mostramos el error
          console.warn('Error interno del servidor al obtener perfil. Se usará localStorage.')
        }
      }
    },

    cargarDesdeLocalStorage() {
      const datos = localStorage.getItem('usuario')
      if (!datos) return

      try {
        const usuario: UsuarioData = JSON.parse(datos)

        if (usuario.nombre && (usuario.rol === 'admin' || usuario.rol === 'user')) {
          this.isLoggedIn = true
          this.nombre = usuario.nombre
          this.rol = usuario.rol
          this.preferencias = usuario.preferencias ?? []
          this.alergias = usuario.alergias ?? []
          this.metaCalorias = usuario.metaCalorias ?? 0
          this.perfilCompleto = resolverPerfilCompleto(usuario)
        }
      } catch (error) {
        console.error('Error al cargar usuario desde localStorage:', error)
      }
    },

    cerrarSesion() {
      this.$reset()
      localStorage.removeItem('usuario')
      localStorage.removeItem('token')
    },

    marcarPerfilCompleto() {
      this.perfilCompleto = true
      this.guardarEnLocalStorage()
    },

    guardarEnLocalStorage() {
      const usuario: UsuarioData = {
        nombre: this.nombre,
        rol: this.rol as Rol,
        preferencias: this.preferencias,
        alergias: this.alergias,
        metaCalorias: this.metaCalorias,
        perfilCompleto: this.perfilCompleto
      }

      localStorage.setItem('usuario', JSON.stringify(usuario))
    },

    async actualizarMetaCalorias(nuevaMetaCalorias: number) {
      try {
        const { data } = await api.put('/usuarios/perfil', {
          alergias: this.alergias,
          preferencias: this.preferencias,
          metaCalorias: nuevaMetaCalorias
        })

        this.metaCalorias = nuevaMetaCalorias
        this.perfilCompleto = resolverPerfilCompleto({
          nombre: this.nombre,
          rol: this.rol as Rol,
          preferencias: this.preferencias,
          alergias: this.alergias,
          metaCalorias: this.metaCalorias,
          perfilCompleto: data?.usuario?.perfilCompleto ?? this.perfilCompleto
        })
        this.guardarEnLocalStorage()

        return { success: true }
      } catch (error: any) {
        console.error('Error al actualizar meta calórica:', error)
        throw error
      }
    }
  }
})
