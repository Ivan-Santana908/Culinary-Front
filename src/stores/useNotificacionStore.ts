import { defineStore } from 'pinia'

export const useNotificacionStore = defineStore('notificaciones', {
  state: () => ({
    contador: 0
  }),
  actions: {
    incrementar() {
      this.contador++
    },
    reiniciar() {
      this.contador = 0
    }
  }
})
