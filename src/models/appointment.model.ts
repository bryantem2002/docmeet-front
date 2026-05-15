import type { IAppointment } from '@/types'
import * as appointmentService from '@/services/appointment-service'
import type { CreateAppointmentPayload } from '@/services/appointment-service'

/** Modelo de citas: acceso a datos vía API. */
export const appointmentModel = {
  async readAll(): Promise<IAppointment[]> {
    return appointmentService.getAppointments()
  },

  async create(payload: CreateAppointmentPayload): Promise<IAppointment> {
    return appointmentService.createAppointment(payload)
  },

  async delete(id: string): Promise<void> {
    return appointmentService.cancelAppointment(id)
  },
}
