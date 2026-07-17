export type { IUser, UserRole } from './user'
export type { IDoctor } from './doctor'
export type { IAppointment, AppointmentStatus } from './appointment'
export type {
  ILoginCredentials,
  IRegisterPayload,
  IUpdateProfilePayload,
  IAuthResponse,
  ICognitoRegisterRequest,
  ICognitoConfirmRequest,
  IForgotPasswordRequest,
  IConfirmForgotPasswordRequest,
  IChangePasswordRequest,
  IRespondNewPasswordRequest,
  IPatientCreateRequest,
} from './auth'
export type { IPayment, PaymentStatus } from './payment'
export type * from './medical'
export type * from './admin'

