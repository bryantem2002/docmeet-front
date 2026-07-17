import { authModel } from '@/models/auth.model'
import type {
  IAuthResponse,
  ILoginCredentials,
  IRegisterPayload,
  IUpdateProfilePayload,
  IUser,
} from '@/types'
import { toApiError } from '@/utils/handle-api-error'

export interface AuthFormInput {
  email: string
  password: string
  fullName?: string
  confirmPassword?: string
  dni?: string
  fechaNacimiento?: string
  genero?: string
  telefono?: string
  nombreContactoEmergencia?: string
  telefonoContactoEmergencia?: string
}

export class AuthValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthValidationError'
  }
}

function validateEmail(email: string): void {
  if (!email.trim()) {
    throw new AuthValidationError('El correo es obligatorio.')
  }
}

function validatePassword(password: string, minLength = 6): void {
  if (password.length < minLength) {
    throw new AuthValidationError(
      `La contraseña debe tener al menos ${minLength} caracteres.`,
    )
  }
}

/** Controlador de autenticación: validación y orquestación del modelo. */
export const authController = {
  validateLoginForm(input: AuthFormInput): ILoginCredentials {
    const email = input.email.trim()
    validateEmail(email)
    if (!input.password) {
      throw new AuthValidationError('La contraseña es obligatoria.')
    }
    return { email, password: input.password }
  },

  validateRegisterForm(input: AuthFormInput): IRegisterPayload {
    const email = input.email.trim()
    const fullName = (input.fullName ?? '').trim()
    validateEmail(email)
    validatePassword(input.password)
    if (!fullName) {
      throw new AuthValidationError('El nombre completo es obligatorio.')
    }
    if (input.confirmPassword !== undefined && input.password !== input.confirmPassword) {
      throw new AuthValidationError('Las contraseñas no coinciden.')
    }
    const regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
    const regexNumeros = /^\d+$/

    if (!regexLetras.test(fullName)) {
      throw new AuthValidationError('El nombre completo solo debe contener letras.')
    }

    if (input.dni && !regexNumeros.test(input.dni)) {
      throw new AuthValidationError('El DNI solo debe contener números.')
    }

    if (input.telefono && !regexNumeros.test(input.telefono)) {
      throw new AuthValidationError('El teléfono solo debe contener números.')
    }

    if (input.nombreContactoEmergencia && !regexLetras.test(input.nombreContactoEmergencia)) {
      throw new AuthValidationError('El nombre del contacto de emergencia solo debe contener letras.')
    }

    if (input.telefonoContactoEmergencia && !regexNumeros.test(input.telefonoContactoEmergencia)) {
      throw new AuthValidationError('El teléfono del contacto de emergencia solo debe contener números.')
    }

    return {
      role: 'paciente',
      fullName,
      email,
      password: input.password,
      dni: input.dni?.trim(),
      fechaNacimiento: input.fechaNacimiento,
      genero: input.genero,
      telefono: input.telefono?.trim(),
      nombreContactoEmergencia: input.nombreContactoEmergencia?.trim(),
      telefonoContactoEmergencia: input.telefonoContactoEmergencia?.trim()
    }
  },

  /** CREATE — iniciar sesión. */
  async login(credentials: ILoginCredentials): Promise<IAuthResponse> {
    const res = await authModel.createSession(credentials)
    authModel.writeSession(res.token, res.user)
    return res
  },

  /** CREATE — registrar usuario y sesión. */
  /** READ — sesión local. */
  readSession(): { token: string | null; user: IUser | null } {
    return authModel.readSession()
  },

  isAuthenticated(): boolean {
    return Boolean(authModel.readSession().token)
  },

  isAdmin(user: IUser | null): boolean {
    return user?.role === 'admin'
  },

  /** READ — perfil remoto. */
  async fetchProfile(): Promise<IUser> {
    const user = await authModel.readProfile()
    const { token } = authModel.readSession()
    if (token) {
      authModel.writeSession(token, user)
    }
    return user
  },

  /** UPDATE — perfil. */
  async updateProfile(payload: IUpdateProfilePayload): Promise<IUser> {
    if (payload.password !== undefined && payload.password.length > 0) {
      validatePassword(payload.password)
    }
    return authModel.updateProfile(payload)
  },

  /** UPDATE — sesión de desarrollo (DevSwitcher). */
  applyDevSession(token: string, user: IUser): void {
    authModel.writeSession(token, user)
  },

  /** DELETE — cerrar sesión. */
  async logout(): Promise<void> {
    await authModel.deleteSession()
  },

  syncFromStorage(): { token: string | null; user: IUser | null } {
    return authModel.readSession()
  },

  toErrorMessage(error: unknown): string {
    if (error instanceof AuthValidationError) {
      return error.message
    }
    return toApiError(error).message
  },
}
