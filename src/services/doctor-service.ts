import type { IDoctor } from '@/types'
import { api } from './api-client'

export async function getDoctors(): Promise<IDoctor[]> {
  const { data } = await api.get<IDoctor[]>('/doctors')
  return data
}

export async function getDoctorsBySpecialty(
  specialty: string,
): Promise<IDoctor[]> {
  const { data } = await api.get<IDoctor[]>('/doctors', {
    params: { specialty },
  })
  return data
}
