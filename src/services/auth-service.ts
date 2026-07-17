import type {
  IAuthResponse,
  ILoginCredentials,
  IUpdateProfilePayload,
  IUser,
  ICognitoRegisterRequest,
  ICognitoConfirmRequest,
  IForgotPasswordRequest,
  IConfirmForgotPasswordRequest,
  IChangePasswordRequest,
  IRespondNewPasswordRequest
} from '@/types'
import { api } from './api-client'

type AuthApiPayload = IAuthResponse | {
  challenge: 'NEW_PASSWORD_REQUIRED'
  session: string
}

interface AuthApiEnvelope {
  success: boolean
  message: string
  data: AuthApiPayload
}

function unwrapAuthPayload(body: AuthApiPayload | AuthApiEnvelope): IAuthResponse {
  const payload = 'data' in body && 'success' in body ? body.data : body

  if ('challenge' in payload && payload.challenge === 'NEW_PASSWORD_REQUIRED') {
    throw Object.assign(new Error('NEW_PASSWORD_REQUIRED'), {
      challenge: payload.challenge,
      session: payload.session,
    })
  }

  if ('token' in payload && 'user' in payload) {
    return payload
  }

  throw new Error('Respuesta de autenticación inválida.')
}

export async function login(data: ILoginCredentials): Promise<IAuthResponse> {
  const { data: body } = await api.post<AuthApiPayload | AuthApiEnvelope>('/api/v1/auth/login', data)
  return unwrapAuthPayload(body)
}

export async function registerCognito(data: ICognitoRegisterRequest): Promise<{ success: boolean; message: string; data: null }> {
  const { data: body } = await api.post<{ success: boolean; message: string; data: null }>('/api/v1/auth/register', data)
  return body
}

export async function confirmCognito(data: ICognitoConfirmRequest): Promise<{ success: boolean; message: string; data: { idUser: string } }> {
  const { data: body } = await api.post<{ success: boolean; message: string; data: { idUser: string } }>('/api/v1/auth/confirm', data)
  return body
}

export async function forgotPassword(data: IForgotPasswordRequest): Promise<{ success: boolean; message: string; data: any }> {
  const { data: body } = await api.post('/api/v1/auth/forgot-password', data)
  return body
}

export async function confirmForgotPassword(data: IConfirmForgotPasswordRequest): Promise<{ success: boolean; message: string; data: any }> {
  const { data: body } = await api.post('/api/v1/auth/confirm-forgot-password', data)
  return body
}

export async function changePassword(data: IChangePasswordRequest): Promise<{ success: boolean; message: string; data: any }> {
  const { data: body } = await api.post('/api/v1/auth/change-password', data)
  return body
}

export async function respondNewPassword(data: IRespondNewPasswordRequest): Promise<IAuthResponse> {
  const { data: body } = await api.post<IAuthResponse | AuthApiEnvelope>('/api/v1/auth/respond-new-password', data)
  return unwrapAuthPayload(body)
}

export async function getProfile(): Promise<IUser> {
  const { data: body } = await api.get<IUser>('/api/v1/auth/profile')
  return body
}

export async function updateProfile(
  data: IUpdateProfilePayload,
): Promise<IUser> {
  const { data: body } = await api.patch<IUser>('/api/v1/auth/profile', data)
  return body
}

export async function logoutRequest(): Promise<void> {
  await api.post('/api/v1/auth/logout')
}
