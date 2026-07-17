import type {
  IAuthResponse,
  ILoginCredentials,
  IUpdateProfilePayload,
  IUser,
} from '@/types'
import * as authService from '@/services/auth-service'
import { clearToken, getToken, setToken } from '@/utils/token-storage'
import {
  clearStoredUser,
  getStoredUser,
  setStoredUser,
} from '@/utils/session-storage'

/** Modelo de autenticación: persistencia local + API. */
export const authModel = {
  /** CREATE — nueva sesión (login). */
  async createSession(credentials: ILoginCredentials): Promise<IAuthResponse> {
    return authService.login(credentials)
  },

  /** CREATE — nuevo usuario y sesión (registro). */
  /** READ — sesión almacenada en el cliente. */
  readSession(): { token: string | null; user: IUser | null } {
    return {
      token: getToken(),
      user: getStoredUser(),
    }
  },

  /** READ — perfil desde el servidor (requiere token). */
  async readProfile(): Promise<IUser> {
    return authService.getProfile()
  },

  /** UPDATE — perfil en servidor y caché local. */
  async updateProfile(payload: IUpdateProfilePayload): Promise<IUser> {
    const user = await authService.updateProfile(payload)
    setStoredUser(user)
    return user
  },

  /** UPDATE — guardar sesión tras login/registro. */
  writeSession(token: string, user: IUser): void {
    setToken(token)
    setStoredUser(user)
  },

  /** DELETE — cerrar sesión (servidor + local). */
  async deleteSession(): Promise<void> {
    clearToken()
    clearStoredUser()
    await authService.logoutRequest().catch(() => {
      /* sesión ya invalidada en cliente */
    })
  },

  /** DELETE — solo almacenamiento local (p. ej. 401 del interceptor). */
  clearLocalSession(): void {
    clearToken()
    clearStoredUser()
  },
}
