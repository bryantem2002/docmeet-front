import type {
  IAuthResponse,
  ILoginCredentials,
  IRegisterPayload,
  IUpdateProfilePayload,
  IUser,
} from '@/types'
import { api } from './api-client'

export async function login(data: ILoginCredentials): Promise<IAuthResponse> {
  const { data: body } = await api.post<IAuthResponse>('/auth/login', data)
  return body
}

export async function register(data: IRegisterPayload): Promise<IAuthResponse> {
  const { data: body } = await api.post<IAuthResponse>('/auth/register', data)
  return body
}

export async function getProfile(): Promise<IUser> {
  const { data: body } = await api.get<IUser>('/auth/profile')
  return body
}

export async function updateProfile(
  data: IUpdateProfilePayload,
): Promise<IUser> {
  const { data: body } = await api.patch<IUser>('/auth/profile', data)
  return body
}

export async function logoutRequest(): Promise<void> {
  await api.post('/auth/logout')
}
