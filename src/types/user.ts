export type UserRole = 'patient' | 'doctor' | 'admin' | 'paciente' | 'secretaria'

export interface IUser {
  id: string
  email: string
  fullName: string
  role?: UserRole
}
