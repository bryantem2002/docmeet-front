import type { IDoctorCreateRequest, ISecretaryCreateRequest, IAdminCreateRequest } from '@/types'
import { api } from './api-client'

export async function createDoctor(data: IDoctorCreateRequest): Promise<{ success: boolean; message: string; data: string }> {
  const { data: body } = await api.post<{ success: boolean; message: string; data: string }>('/api/v1/doctors', data)
  return body
}

export async function createSecretary(data: ISecretaryCreateRequest): Promise<{ success: boolean; message: string; data: string }> {
  const { data: body } = await api.post<{ success: boolean; message: string; data: string }>('/api/v1/secretaries', data)
  return body
}

export async function createAdmin(data: IAdminCreateRequest): Promise<{ success: boolean; message: string; data: string }> {
  const { data: body } = await api.post<{ success: boolean; message: string; data: string }>('/api/v1/admins', data)
  return body
}
