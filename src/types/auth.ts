import type { IUser, UserRole } from './user'

export interface ILoginCredentials {
  email: string
  password: string
}

export interface IRegisterPayload extends ILoginCredentials {
  fullName: string
  role?: UserRole | 'paciente'
  dni?: string
  fechaNacimiento?: string
  genero?: string
  telefono?: string
  nombreContactoEmergencia?: string
  telefonoContactoEmergencia?: string
}

export interface ICognitoRegisterRequest {
  userEmail: string
  password: string
}

export interface ICognitoConfirmRequest {
  userEmail: string
  confirmationCode: string
}

export interface IForgotPasswordRequest {
  userEmail: string
}

export interface IConfirmForgotPasswordRequest {
  userEmail: string
  confirmationCode: string
  newPassword: string
}

export interface IChangePasswordRequest {
  oldPassword: string
  newPassword: string
}

export interface IRespondNewPasswordRequest {
  userEmail: string
  newPassword: string
  session: string
}

export interface IPatientCreateRequest {
  idUser: string
  dniPaciente: string
  nombres: string
  apellidoPaterno: string
  apellidoMaterno: string
  fechaNacimiento: string
  sexo: string
  telefono: string
  direccion: string
  departamento: string
  provincia: string
  distrito: string
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
