import type { IAppointment } from '@/types'
import { api } from './api-client'

export interface CreateAppointmentPayload {
  doctorId: string
  startsAt: string
  notes?: string
}

export async function getAppointments(): Promise<IAppointment[]> {
  const { data } = await api.get<IAppointment[]>('/appointments')
  return data
}

export async function createAppointment(
  payload: CreateAppointmentPayload,
): Promise<IAppointment> {
  const { data } = await api.post<IAppointment>('/appointments', payload)
  return data
}

export async function cancelAppointment(id: string): Promise<void> {
  await api.delete(`/appointments/${id}`)
}
