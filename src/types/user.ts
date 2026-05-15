export type UserRole = 'patient' | 'doctor' | 'admin' | 'paciente'

export interface IUser {
  id: string
  email: string
  fullName: string
  role?: UserRole
}
