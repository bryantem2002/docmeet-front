import { defineStore } from 'pinia'
import { authController } from '@/controllers/auth.controller'
import type {
  ILoginCredentials,
  IUpdateProfilePayload,
  IUser,
} from '@/types'

/** Store reactivo (estado de UI); la lógica vive en el controlador + modelo. */
export const useAuthStore = defineStore('auth', {
  state: () => {
    const session = authController.readSession()
    return {
      user: session.user,
      token: session.token,
    }
  },
  getters: {
    isAuthenticated: (state): boolean => Boolean(state.token),
    isAdmin: (state): boolean => authController.isAdmin(state.user),
  },
  actions: {
    applySession(token: string, user: IUser): void {
      authController.applyDevSession(token, user)
      this.token = token
      this.user = user
    },

    async login(credentials: ILoginCredentials): Promise<void> {
      const res = await authController.login(credentials)
      this.token = res.token
      this.user = res.user
    },

    async updateProfile(payload: IUpdateProfilePayload): Promise<void> {
      const user = await authController.updateProfile(payload)
      this.user = user
    },

    async refreshProfile(): Promise<void> {
      const user = await authController.fetchProfile()
      this.user = user
    },

    logout(): void {
      this.token = null
      this.user = null
      void authController.logout()
    },

    syncFromStorage(): void {
      const session = authController.syncFromStorage()
      this.token = session.token
      this.user = session.user
    },
  },
})
