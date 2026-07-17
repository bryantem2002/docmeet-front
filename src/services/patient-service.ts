import type { IPatientCreateRequest } from '@/types/auth'
import { api } from './api-client'

export async function createPatientProfile(data: IPatientCreateRequest): Promise<{ success: boolean; message: string; data: string }> {
  const { data: body } = await api.post<{ success: boolean; message: string; data: string }>('/api/v1/patients', data)
  return body
}
