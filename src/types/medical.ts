export interface ApiResponse<T> {
  success: boolean
  message?: string
  data: T
  timestamp?: string
}

export interface PageResponse<T> {
  content: T[]
  page: number
  size: number
  totalElements: number
  totalPages: number
}

export type BloodType =
  | 'A_POSITIVE' | 'A_NEGATIVE'
  | 'B_POSITIVE' | 'B_NEGATIVE'
  | 'AB_POSITIVE' | 'AB_NEGATIVE'
  | 'O_POSITIVE' | 'O_NEGATIVE'

export interface MedicalRecordSummaryResponse {
  idMedicalRecord: string
  patientId: string
  patientName: string
  documentNumber: string
  bloodType: BloodType
  createdAt: string
}

export interface ClinicalItemResponse {
  id: string
  name: string
}

export interface ConsultationSummaryResponse {
  id: string
  date: string
  doctor?: string
  doctorName?: string
  status?: string
}

export interface MedicalRecordResponse {
  idMedicalRecord: string
  patientId: string
  bloodType: BloodType
  createdAt: string
  observations?: string
  allergies: ClinicalItemResponse[]
  chronicDiseases: ClinicalItemResponse[]
  consultations: ConsultationSummaryResponse[]
}

export interface CreateMedicalRecordRequest {
  patientId: string
  bloodType: BloodType
  allergies: string[]
  chronicDiseases: string[]
  observations: string
}

export interface UpdateMedicalRecordRequest {
  bloodType: BloodType
  observations: string
  allergies: string[]
  chronicDiseases?: string[]
}

export interface CreateMedicalConsultationRequest {
  reason: string
  symptoms: string
  observations: string
}

export interface MedicalConsultationResponse {
  id: string
  date: string
  doctor?: string
  doctorName?: string
  status: string
  reason?: string
}

export interface MedicalConsultationDetailsResponse extends MedicalConsultationResponse {
  symptoms?: string
  observations?: string
  diagnoses: DiagnosisResponse[]
  prescriptions: PrescriptionResponse[]
  medicalExams: MedicalExamResponse[]
}

export interface CreateDiagnosisRequest {
  description: string
  severity: string
}

export type UpdateDiagnosisRequest = CreateDiagnosisRequest

export interface DiagnosisResponse {
  id: string
  description: string
  severity: string
}

export interface CreatePrescriptionRequest {
  instructions: string
}

export interface PrescriptionResponse {
  id: string
  instructions: string
  details: PrescriptionDetailResponse[]
}

export interface AddPrescriptionDetailRequest {
  medicine: string
  dose: string
  frequency: string
  duration: string
}

export type UpdatePrescriptionDetailRequest = AddPrescriptionDetailRequest

export interface PrescriptionDetailResponse extends AddPrescriptionDetailRequest {
  id: string
}

export interface CreateMedicalExamRequest {
  name: string
  description: string
}

export interface UpdateMedicalExamRequest {
  name: string
  description: string
}

export type ExamStatus = 'REQUESTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'

export interface UpdateExamStatusRequest {
  status: ExamStatus
}

export interface RegisterExamResultRequest {
  result: string
}

export interface MedicalExamResponse {
  id: string
  name: string
  description: string
  status: ExamStatus
  result?: string
}
