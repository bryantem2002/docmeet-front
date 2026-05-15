import type { IDoctor } from '@/types'
import * as doctorService from '@/services/doctor-service'

/** Modelo de médicos: acceso a datos vía API. */
export const doctorModel = {
  async readAll(): Promise<IDoctor[]> {
    return doctorService.getDoctors()
  },

  async readBySpecialty(specialty: string): Promise<IDoctor[]> {
    return doctorService.getDoctorsBySpecialty(specialty)
  },
}
