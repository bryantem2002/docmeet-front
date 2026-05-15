import axios from 'axios'

export interface ApiErrorPayload {
  message: string
  status?: number
  code?: string
}

export function toApiError(error: unknown): ApiErrorPayload {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    const data = error.response?.data as { message?: string } | undefined
    return {
      message: data?.message ?? error.message ?? 'Error de red o del servidor',
      status,
      code: error.code,
    }
  }
  if (error instanceof Error) {
    return { message: error.message }
  }
  return { message: 'Error desconocido' }
}
