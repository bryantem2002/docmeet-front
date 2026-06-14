import { doctorModel } from '@/models/doctor.model'
import type { IDoctor } from '@/types'

export interface IDoctorListItem extends IDoctor {
  avatar: string
}

const MOCK_DOCTORS: Omit<IDoctorListItem, 'avatar'>[] = [
  {
    id: '1',
    fullName: 'Dr. Yalico',
    specialty: 'Cardiología',
    bio: 'Especialista en diagnóstico y tratamiento de enfermedades del corazón con 15 años de experiencia.',
  },
  {
    id: '2',
    fullName: 'Dra. Trujillo',
    specialty: 'Pediatría',
    bio: 'Atención integral para niños y adolescentes, enfocada en el desarrollo saludable integral.',
  },
  {
    id: '3',
    fullName: 'Dr. Amilcar Quispe',
    specialty: 'Dermatología',
    bio: 'Experto en el cuidado de la piel, cabello y uñas. Tratamientos clínicos y estéticos de vanguardia.',
  },
  {
    id: '4',
    fullName: 'Dra. Huaccha',
    specialty: 'Neurología',
    bio: 'Especialista en trastornos del sistema nervioso central y periférico. Diagnósticos de precisión.',
  },
  {
    id: '5',
    fullName: 'Dr. Luis Gómez',
    specialty: 'Traumatología',
    bio: 'Atención especializada en lesiones musculoesqueléticas, rehabilitación y medicina deportiva.',
  },
  {
    id: '6',
    fullName: 'Dra. Sofía Castro',
    specialty: 'Medicina General',
    bio: 'Médico de primer contacto para evaluación, diagnóstico integral y derivación oportuna.',
  },
]

function withAvatar(doctor: IDoctor): IDoctorListItem {
  return {
    ...doctor,
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(doctor.fullName)}&backgroundColor=0369a1,0ea5e9&textColor=ffffff`,
  }
}

function filterMock(specialty: string): IDoctorListItem[] {
  const query = specialty.trim().toLowerCase()
  return MOCK_DOCTORS.filter(
    (d) => !query || d.specialty.toLowerCase().includes(query),
  ).map(withAvatar)
}

/** Controlador del directorio médico. */
export const doctorController = {
  /** Lista desde API o mock si falla / no hay backend. */
  async list(specialty = '', options?: { useMock?: boolean }): Promise<IDoctorListItem[]> {
    if (options?.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      return filterMock(specialty)
    }

    try {
      const doctors = specialty.trim()
        ? await doctorModel.readBySpecialty(specialty.trim())
        : await doctorModel.readAll()
      return doctors.map(withAvatar)
    } catch {
      return filterMock(specialty)
    }
  },
}
