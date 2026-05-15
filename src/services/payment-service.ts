import type { IPayment } from '@/types'
import { api } from './api-client'

export async function createPaymentIntent(appointmentId: string): Promise<{
  clientSecret?: string
  payment: IPayment
}> {
  const { data } = await api.post<{ clientSecret?: string; payment: IPayment }>(
    '/payments/intent',
    { appointmentId },
  )
  return data
}

export async function confirmPayment(paymentId: string): Promise<IPayment> {
  const { data } = await api.post<IPayment>(`/payments/${paymentId}/confirm`)
  return data
}
