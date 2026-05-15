import { defineStore } from 'pinia'
import { appointmentController } from '@/controllers/appointment.controller'
import type { IAppointment } from '@/types'
import type { CreateAppointmentPayload } from '@/services/appointment-service'

export const useAppointmentStore = defineStore('appointments', {
  state: () => ({
    items: [] as IAppointment[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchAll(): Promise<void> {
      this.loading = true
      this.error = null
      try {
        this.items = await appointmentController.list()
      } catch (e) {
        this.error = '[appointments] error al cargar'
        console.error(e)
      } finally {
        this.loading = false
      }
    },

    async create(payload: CreateAppointmentPayload): Promise<IAppointment | null> {
      this.loading = true
      this.error = null
      try {
        const created = await appointmentController.create(payload)
        this.items.push(created)
        return created
      } catch (e) {
        this.error = '[appointments] error al crear'
        console.error(e)
        return null
      } finally {
        this.loading = false
      }
    },

    async cancel(id: string): Promise<boolean> {
      this.error = null
      try {
        await appointmentController.cancel(id)
        this.items = this.items.filter((a) => a.id !== id)
        return true
      } catch (e) {
        this.error = '[appointments] error al cancelar'
        console.error(e)
        return false
      }
    },
  },
})
