import { api } from './api-client'
import type {
  AppointmentObservationRequest, AppointmentPaymentRequest, AppointmentResponse, AppointmentStatus,
  AvailabilityStatus, CancelAppointmentRequest, ConsultingRoomResponse,
  CreateAppointmentRequest, CreateAvailabilityRequest, CreateConsultingRoomRequest, CreateDoctorScheduleRequest,
  DoctorAvailabilityResponse, DoctorScheduleResponse, IAppointment, PageResponse, RescheduleAppointmentRequest,
  UpdateAppointmentStatusRequest, UpdateAvailabilityRequest, UpdateAvailabilityStatusRequest,
  UpdateConsultingRoomRequest, UpdateConsultingRoomStatusRequest, UpdateDoctorScheduleRequest, UpdateScheduleStatusRequest,
} from '@/types/appointment'

type Envelope<T> = { success: boolean; message?: string; data: T }
const unwrap = <T>(body: T | Envelope<T>): T =>
  typeof body === 'object' && body !== null && 'success' in body && 'data' in body
    ? (body as Envelope<T>).data : body as T

async function response<T>(request: Promise<{ data: T | Envelope<T> }>): Promise<T> {
  return unwrap((await request).data)
}

// AppointmentController (11)
export const createAppointment = (payload: CreateAppointmentRequest) =>
  response<AppointmentResponse>(api.post('/api/v1/appointments', payload))
export const getAppointmentById = (id: string) =>
  response<AppointmentResponse>(api.get(`/api/v1/appointments/${id}`))
export const rescheduleAppointment = (id: string, payload: RescheduleAppointmentRequest) =>
  response<AppointmentResponse>(api.put(`/api/v1/appointments/${id}/reschedule`, payload))
export const cancelAppointmentById = (id: string, payload: CancelAppointmentRequest) =>
  response<AppointmentResponse>(api.put(`/api/v1/appointments/${id}/cancel`, payload))
export const updateAppointmentStatus = (id: string, payload: UpdateAppointmentStatusRequest) =>
  response<AppointmentResponse>(api.put(`/api/v1/appointments/${id}/status`, payload))
export const confirmAttendance = (id: string) =>
  response<AppointmentResponse>(api.put(`/api/v1/appointments/${id}/attendance`))
export const updateAppointmentObservation = (id: string, payload: AppointmentObservationRequest) =>
  response<AppointmentResponse>(api.put(`/api/v1/appointments/${id}/observation`, payload))
export const markAppointmentPaid = (id: string, payload: AppointmentPaymentRequest = { paymentStatus: 'PAID' }) =>
  response<AppointmentResponse>(api.put(`/api/v1/appointments/${id}/payment`, payload))
export const getAppointmentsByPatient = (id: string, page = 0, size = 10) =>
  response<PageResponse<AppointmentResponse>>(api.get(`/api/v1/appointments/patient/${id}`, { params: { page, size } }))
export const getAppointmentsByStatus = (status: AppointmentStatus, page = 0, size = 10) =>
  response<PageResponse<AppointmentResponse>>(api.get(`/api/v1/appointments/status/${status}`, { params: { page, size } }))
export const getAppointmentsByAvailability = (id: string) =>
  response<AppointmentResponse[]>(api.get(`/api/v1/appointments/availability/${id}`))

// DoctorAvailabilityController (7)
export const createAvailability = (payload: CreateAvailabilityRequest) =>
  response<DoctorAvailabilityResponse>(api.post('/api/v1/availabilities', payload))
export const getAvailabilityById = (id: string) =>
  response<DoctorAvailabilityResponse>(api.get(`/api/v1/availabilities/${id}`))
export const updateAvailability = (id: string, payload: UpdateAvailabilityRequest) =>
  response<DoctorAvailabilityResponse>(api.put(`/api/v1/availabilities/${id}`, payload))
export const getAvailabilitiesBySchedule = (id: string) =>
  response<DoctorAvailabilityResponse[]>(api.get(`/api/v1/availabilities/schedule/${id}`))
export const getAvailabilitiesByDate = (date: string) =>
  response<DoctorAvailabilityResponse[]>(api.get(`/api/v1/availabilities/date/${date}`))
export const getAvailabilitiesByStatus = (status: AvailabilityStatus) =>
  response<DoctorAvailabilityResponse[]>(api.get(`/api/v1/availabilities/status/${status}`))
export const updateAvailabilityStatus = (id: string, payload: UpdateAvailabilityStatusRequest) =>
  response<DoctorAvailabilityResponse>(api.put(`/api/v1/availabilities/${id}/status`, payload))

// DoctorScheduleController (6)
export const createDoctorSchedule = (payload: CreateDoctorScheduleRequest) =>
  response<DoctorScheduleResponse>(api.post('/api/v1/schedules', payload))
export const getDoctorScheduleById = (id: string) =>
  response<DoctorScheduleResponse>(api.get(`/api/v1/schedules/${id}`))
export const updateDoctorSchedule = (id: string, payload: UpdateDoctorScheduleRequest) =>
  response<DoctorScheduleResponse>(api.put(`/api/v1/schedules/${id}`, payload))
export const getSchedulesByDoctor = (id: string) =>
  response<DoctorScheduleResponse[]>(api.get(`/api/v1/schedules/doctor/${id}`))
export const getSchedulesByClinic = (id: string) =>
  response<DoctorScheduleResponse[]>(api.get(`/api/v1/schedules/clinic/${id}`))
export const updateScheduleStatus = (id: string, payload: UpdateScheduleStatusRequest) =>
  response<DoctorScheduleResponse>(api.put(`/api/v1/schedules/${id}/status`, payload))

// ConsultingRoomController (5)
export const createConsultingRoom = (payload: CreateConsultingRoomRequest) =>
  response<ConsultingRoomResponse>(api.post('/api/v1/consulting-rooms', payload))
export const getConsultingRoomById = (id: string) =>
  response<ConsultingRoomResponse>(api.get(`/api/v1/consulting-rooms/${id}`))
export const updateConsultingRoom = (id: string, payload: UpdateConsultingRoomRequest) =>
  response<ConsultingRoomResponse>(api.put(`/api/v1/consulting-rooms/${id}`, payload))
export const getConsultingRoomsByClinic = (id: string) =>
  response<ConsultingRoomResponse[]>(api.get(`/api/v1/consulting-rooms/clinic/${id}`))
export const updateConsultingRoomStatus = (id: string, payload: UpdateConsultingRoomStatusRequest) =>
  response<ConsultingRoomResponse>(api.put(`/api/v1/consulting-rooms/${id}/status`, payload))

// Adaptadores del store heredado.
export interface CreateAppointmentPayload extends CreateAppointmentRequest {}
const legacy = (item: AppointmentResponse): IAppointment => ({
  id: item.idAppointment, doctorId: item.idDoctor ?? '', patientId: item.idPatient,
  startsAt: `${item.date ?? ''}T${item.startTime ?? ''}`, status: item.appointmentStatus,
  notes: item.consultationReason,
})
export async function getAppointments(): Promise<IAppointment[]> { return [] }
export async function cancelAppointment(id: string): Promise<void> { await cancelAppointmentById(id, { reason: 'Cancelada por el usuario' }) }
export async function createLegacyAppointment(payload: CreateAppointmentPayload): Promise<IAppointment> { return legacy(await createAppointment(payload)) }
