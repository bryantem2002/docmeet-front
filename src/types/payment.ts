export type PaymentStatus = 'pending' | 'paid' | 'failed'

export interface IPayment {
  id: string
  appointmentId: string
  amount: number
  currency: string
  status: PaymentStatus
}
