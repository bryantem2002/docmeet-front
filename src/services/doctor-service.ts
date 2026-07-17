import type { IDoctor } from '@/types'
import { api } from './api-client'

export async function getDoctors(): Promise<IDoctor[]> {
  const { data } = await api.get<IDoctor[] | { data: IDoctor[] }>('/api/v1/doctors')
  return Array.isArray(data) ? data : data.data
}

export async function getDoctorsBySpecialty(
  specialty: string,
): Promise<IDoctor[]> {
  const { data } = await api.get<IDoctor[] | { data: IDoctor[] }>('/api/v1/doctors', {
    params: { specialty },
  })
  return Array.isArray(data) ? data : data.data
}
