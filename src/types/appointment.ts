export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled'

export interface IAppointment {
  id: string
  doctorId: string
  patientId: string
  startsAt: string
  endsAt?: string
  status: AppointmentStatus
  notes?: string
}
