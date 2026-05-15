import type { IUser, UserRole } from './user'

export interface ILoginCredentials {
  email: string
  password: string
}

export interface IRegisterPayload extends ILoginCredentials {
  fullName: string
  role?: UserRole | 'paciente'
}

export interface IUpdateProfilePayload {
  fullName?: string
  email?: string
  password?: string
}

export interface IAuthResponse {
  token: string
  user: IUser
}
