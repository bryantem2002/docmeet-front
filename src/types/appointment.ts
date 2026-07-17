export type AppointmentStatus = 'PENDING_PAYMENT' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW' | 'RESCHEDULED'
export type PaymentStatus = 'PENDING_PAYMENT' | 'PAID'
export type AppointmentType = 'VIRTUAL' | 'PRESENTIAL'
export type AvailabilityStatus = 'AVAILABLE' | 'RESERVED' | 'BLOCKED' | 'UNAVAILABLE'
export type DayOfWeek = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY'
export type ConsultingRoomStatus = 'AVAILABLE' | 'UNAVAILABLE' | 'MAINTENANCE'

export interface PageResponse<T> {
  content: T[]
  page?: number
  size?: number
  totalElements?: number
  totalPages?: number
}

export interface CreateAppointmentRequest {
  idPatient: string
  idDoctor: string
  idAvailability: string
  appointmentType: AppointmentType
  consultationReason: string
}

export interface AppointmentResponse {
  idAppointment: string
  idPatient: string
  idDoctor?: string
  idAvailability?: string
  appointmentType?: AppointmentType
  consultationReason?: string
  appointmentStatus: AppointmentStatus
  paymentStatus: PaymentStatus
  appointmentPrice?: number
  observation?: string
  date?: string
  startTime?: string
  doctorName?: string
}

export interface RescheduleAppointmentRequest { newAvailabilityId: string }
export interface CancelAppointmentRequest { reason: string }
export interface UpdateAppointmentStatusRequest { appointmentStatus: AppointmentStatus }
export interface AppointmentObservationRequest { observation: string }
export interface AppointmentPaymentRequest { paymentStatus: 'PAID' }

export interface CreateAvailabilityRequest {
  idDoctorSchedule: string
  date: string
  startTime: string
  endTime: string
}
export type UpdateAvailabilityRequest = CreateAvailabilityRequest
export interface DoctorAvailabilityResponse extends CreateAvailabilityRequest {
  idAvailability: string
  status: AvailabilityStatus
}
export interface UpdateAvailabilityStatusRequest { status: AvailabilityStatus }

export interface CreateDoctorScheduleRequest {
  idDoctor: string
  idClinic: string
  idConsultingRoom: string
  dayOfWeek: DayOfWeek
  startTime: string
  endTime: string
  appointmentDuration: number
}
export type UpdateDoctorScheduleRequest = CreateDoctorScheduleRequest
export interface DoctorScheduleResponse extends CreateDoctorScheduleRequest {
  idSchedule: string
  active: boolean
}
export interface UpdateScheduleStatusRequest { active: boolean }

export interface CreateConsultingRoomRequest {
  idClinic: string
  name: string
  floor: string
}
export type UpdateConsultingRoomRequest = CreateConsultingRoomRequest
export interface ConsultingRoomResponse extends CreateConsultingRoomRequest {
  idConsultingRoom: string
  status: ConsultingRoomStatus
}
export interface UpdateConsultingRoomStatusRequest { status: ConsultingRoomStatus }

// Compatibilidad interna con el store existente.
export interface IAppointment {
  id: string
  doctorId: string
  patientId: string
  startsAt: string
  endsAt?: string
  status: AppointmentStatus
  notes?: string
}
