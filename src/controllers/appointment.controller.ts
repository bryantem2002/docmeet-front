import { appointmentModel } from '@/models/appointment.model'
import type { IAppointment } from '@/types'
import type { CreateAppointmentPayload } from '@/services/appointment-service'

/** Controlador de citas. */
export const appointmentController = {
  async list(): Promise<IAppointment[]> {
    return appointmentModel.readAll()
  },

  async create(payload: CreateAppointmentPayload): Promise<IAppointment> {
    return appointmentModel.create(payload)
  },

  async cancel(id: string): Promise<void> {
    return appointmentModel.delete(id)
  },
}
