import { api } from './api-client'
import type {
  AddPrescriptionDetailRequest,
  ApiResponse,
  CreateDiagnosisRequest,
  CreateMedicalConsultationRequest,
  CreateMedicalExamRequest,
  CreateMedicalRecordRequest,
  CreatePrescriptionRequest,
  MedicalConsultationDetailsResponse,
  MedicalConsultationResponse,
  MedicalExamResponse,
  MedicalRecordResponse,
  MedicalRecordSummaryResponse,
  PageResponse,
  PrescriptionDetailResponse,
  PrescriptionResponse,
  DiagnosisResponse,
  RegisterExamResultRequest,
  UpdateDiagnosisRequest,
  UpdateExamStatusRequest,
  UpdateMedicalExamRequest,
  UpdateMedicalRecordRequest,
  UpdatePrescriptionDetailRequest,
} from '@/types/medical'

export interface MedicalRecordFilters {
  page?: number
  size?: number
  search?: string
  patientId?: string
}

async function apiData<T>(request: Promise<{ data: ApiResponse<T> }>): Promise<T> {
  const response = await request
  return response.data.data
}

// Historias clínicas
export function getMedicalRecords(filters: MedicalRecordFilters = {}): Promise<PageResponse<MedicalRecordSummaryResponse>> {
  return apiData(api.get('/medical-records', { params: { page: 0, size: 10, ...filters } }))
}

export function createMedicalRecord(payload: CreateMedicalRecordRequest): Promise<MedicalRecordResponse> {
  return apiData(api.post('/medical-records', payload))
}

export function getMedicalRecordDetails(id: string): Promise<MedicalRecordResponse> {
  return apiData(api.get(`/medical-records/${id}`))
}

export function updateMedicalRecord(id: string, payload: UpdateMedicalRecordRequest): Promise<MedicalRecordResponse> {
  return apiData(api.put(`/medical-records/${id}`, payload))
}

export async function deleteMedicalRecord(id: string): Promise<void> {
  await api.delete(`/medical-records/${id}`)
}

// Consultas
export function createConsultation(medicalRecordId: string, payload: CreateMedicalConsultationRequest): Promise<MedicalConsultationResponse> {
  return apiData(api.post(`/medical-records/${medicalRecordId}/consultations`, payload))
}

export function getConsultationsByMedicalRecord(id: string): Promise<MedicalConsultationResponse[]> {
  return apiData(api.get(`/medical-records/${id}/consultations`))
}

export function getConsultationDetails(id: string): Promise<MedicalConsultationDetailsResponse> {
  return apiData(api.get(`/consultations/${id}`))
}

// Vistas agregadas: el backend aplica el alcance del token del doctor.
export async function getConsultationsByDoctor(_doctorId: string, page = 0, size = 50): Promise<PageResponse<MedicalConsultationResponse>> {
  const records = await getMedicalRecords({ page: 0, size: 100 })
  const lists = await Promise.all(records.content.map(record => getConsultationsByMedicalRecord(record.idMedicalRecord)))
  const content = lists.flat()
  return { content: content.slice(page * size, (page + 1) * size), page, size, totalElements: content.length, totalPages: Math.ceil(content.length / size) }
}

export async function getDiagnoses(consultationId: string): Promise<DiagnosisResponse[]> {
  return (await getConsultationDetails(consultationId)).diagnoses
}

export async function getPrescriptions(consultationId: string): Promise<PrescriptionResponse[]> {
  return (await getConsultationDetails(consultationId)).prescriptions
}

// Diagnósticos
export function createDiagnosis(consultationId: string, payload: CreateDiagnosisRequest): Promise<DiagnosisResponse> {
  return apiData(api.post(`/consultations/${consultationId}/diagnoses`, payload))
}

export function updateDiagnosis(consultationId: string, diagnosisId: string, payload: UpdateDiagnosisRequest): Promise<DiagnosisResponse> {
  return apiData(api.put(`/consultations/${consultationId}/diagnoses/${diagnosisId}`, payload))
}

export async function deleteDiagnosis(consultationId: string, diagnosisId: string): Promise<void> {
  await api.delete(`/consultations/${consultationId}/diagnoses/${diagnosisId}`)
}

// Recetas y medicamentos
export function createPrescription(consultationId: string, payload: CreatePrescriptionRequest): Promise<PrescriptionResponse> {
  return apiData(api.post(`/consultations/${consultationId}/prescriptions`, payload))
}

export function addPrescriptionDetail(consultationId: string, prescriptionId: string, payload: AddPrescriptionDetailRequest): Promise<PrescriptionDetailResponse> {
  return apiData(api.post(`/consultations/${consultationId}/prescriptions/${prescriptionId}/details`, payload))
}

export function updatePrescriptionDetail(consultationId: string, detailId: string, payload: UpdatePrescriptionDetailRequest): Promise<PrescriptionDetailResponse> {
  return apiData(api.put(`/consultations/${consultationId}/prescription-details/${detailId}`, payload))
}

export async function deletePrescriptionDetail(consultationId: string, detailId: string): Promise<void> {
  await api.delete(`/consultations/${consultationId}/prescription-details/${detailId}`)
}

// Exámenes
export function createMedicalExam(consultationId: string, payload: CreateMedicalExamRequest): Promise<MedicalExamResponse> {
  return apiData(api.post(`/consultations/${consultationId}/medical-exams`, payload))
}

export function getMedicalExams(consultationId: string): Promise<MedicalExamResponse[]> {
  return apiData(api.get(`/consultations/${consultationId}/medical-exams`))
}

export function updateMedicalExam(id: string, payload: UpdateMedicalExamRequest): Promise<MedicalExamResponse> {
  return apiData(api.put(`/medical-exams/${id}`, payload))
}

export function updateExamStatus(id: string, payload: UpdateExamStatusRequest): Promise<MedicalExamResponse> {
  return apiData(api.patch(`/medical-exams/${id}/status`, payload))
}

export function registerExamResult(id: string, payload: RegisterExamResultRequest): Promise<MedicalExamResponse> {
  return apiData(api.patch(`/medical-exams/${id}/result`, payload))
}
