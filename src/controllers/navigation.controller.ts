import type { RouteLocationNormalized } from 'vue-router'
import type { IUser } from '@/types'
import { authController } from './auth.controller'

/** Controlador de navegación / guards de rutas. */
export const navigationController = {
  getSessionUser(): IUser | null {
    return authController.readSession().user
  },

  hasToken(): boolean {
    return authController.isAuthenticated()
  },

  canActivate(to: RouteLocationNormalized): true | { path: string } {
    const user = this.getSessionUser()
    const token = this.hasToken()

    if (to.meta.requiresAuth && !token) {
      return { path: '/' }
    }

    if (to.meta.requiresAdmin && user?.role !== 'admin') {
      return { path: '/' }
    }

    if (to.meta.requiresDoctor && user?.role !== 'doctor') {
      return { path: '/' }
    }

    if (to.meta.requiresSecretary && user?.role !== 'secretaria') {
      return { path: '/' }
    }

    if (to.meta.allowedRoles?.length && (!user?.role || !to.meta.allowedRoles.includes(user.role))) {
      return { path: '/' }
    }

    return true
  },
}
