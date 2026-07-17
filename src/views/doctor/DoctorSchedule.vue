<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/store/auth-store'
import { createAvailability, createDoctorSchedule, getSchedulesByDoctor, updateScheduleStatus } from '@/services/appointment-service'
import type { DayOfWeek, DoctorScheduleResponse } from '@/types/appointment'

const auth = useAuthStore()
const schedules = ref<DoctorScheduleResponse[]>([])
const error = ref('')
const showForm = ref(false)
const availabilityFor = ref<DoctorScheduleResponse>()
const form = ref({ idClinic: '', idConsultingRoom: '', dayOfWeek: 'MONDAY' as DayOfWeek, startTime: '08:00', endTime: '13:00', appointmentDuration: 30 })
const slot = ref({ date: '', startTime: '', endTime: '' })

async function load() {
  if (!auth.user?.id) return
  try { schedules.value = await getSchedulesByDoctor(auth.user.id) }
  catch (cause: any) { error.value = cause.response?.data?.message ?? 'No se pudieron cargar los horarios.' }
}
async function save() {
  if (!auth.user?.id) return
  try { await createDoctorSchedule({ idDoctor: auth.user.id, ...form.value }); showForm.value = false; await load() }
  catch (cause: any) { error.value = cause.response?.data?.message ?? 'No se pudo crear el horario.' }
}
async function toggle(item: DoctorScheduleResponse) {
  try { await updateScheduleStatus(item.idSchedule, { active: !item.active }); await load() }
  catch (cause: any) { error.value = cause.response?.data?.message ?? 'No se pudo cambiar el estado.' }
}
async function saveAvailability() {
  if (!availabilityFor.value) return
  try { await createAvailability({ idDoctorSchedule: availabilityFor.value.idSchedule, ...slot.value }); availabilityFor.value = undefined }
  catch (cause: any) { error.value = cause.response?.data?.message ?? 'No se pudo crear la disponibilidad.' }
}
onMounted(load)
</script>

<template>
  <main class="max-w-6xl mx-auto">
    <header class="flex justify-between items-end gap-4 mb-7"><div><h1 class="text-3xl font-extrabold">Horario médico</h1><p class="text-slate-500">Configura reglas semanales y genera disponibilidades concretas.</p></div><button @click="showForm = !showForm" class="rounded-xl bg-[#3E90C8] px-5 py-3 text-white font-bold">Nuevo horario</button></header>
    <p v-if="error" class="mb-4 rounded-xl bg-red-50 p-4 text-red-700">{{ error }}</p>
    <form v-if="showForm" @submit.prevent="save" class="grid md:grid-cols-3 gap-4 rounded-2xl border bg-white dark:bg-slate-800 p-6 mb-6">
      <label>ID clínica<input v-model="form.idClinic" required class="mt-1 w-full rounded-xl border p-3 dark:bg-slate-900" /></label>
      <label>ID consultorio<input v-model="form.idConsultingRoom" required class="mt-1 w-full rounded-xl border p-3 dark:bg-slate-900" /></label>
      <label>Día<select v-model="form.dayOfWeek" class="mt-1 w-full rounded-xl border p-3 dark:bg-slate-900"><option v-for="day in ['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY']" :key="day">{{ day }}</option></select></label>
      <label>Inicio<input v-model="form.startTime" type="time" required class="mt-1 w-full rounded-xl border p-3 dark:bg-slate-900" /></label>
      <label>Fin<input v-model="form.endTime" type="time" required class="mt-1 w-full rounded-xl border p-3 dark:bg-slate-900" /></label>
      <label>Duración (min)<input v-model.number="form.appointmentDuration" type="number" min="5" required class="mt-1 w-full rounded-xl border p-3 dark:bg-slate-900" /></label>
      <button class="md:col-span-3 rounded-xl bg-[#3E90C8] p-3 text-white font-bold">Guardar horario</button>
    </form>
    <div class="overflow-x-auto rounded-2xl border bg-white dark:bg-slate-800">
      <table class="w-full text-left"><thead class="bg-slate-50 dark:bg-slate-700"><tr><th class="p-4">Día</th><th class="p-4">Horario</th><th class="p-4">Duración</th><th class="p-4">Estado</th><th class="p-4">Acciones</th></tr></thead><tbody><tr v-for="item in schedules" :key="item.idSchedule" class="border-t"><td class="p-4">{{ item.dayOfWeek }}</td><td class="p-4">{{ item.startTime }}–{{ item.endTime }}</td><td class="p-4">{{ item.appointmentDuration }} min</td><td class="p-4">{{ item.active ? 'Activo' : 'Inactivo' }}</td><td class="p-4 space-x-3"><button @click="toggle(item)" class="text-[#3E90C8] font-semibold">{{ item.active ? 'Desactivar' : 'Activar' }}</button><button @click="availabilityFor = item" class="text-[#3E90C8] font-semibold">Generar disponibilidad</button></td></tr></tbody></table>
    </div>
    <div v-if="availabilityFor" class="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4"><form @submit.prevent="saveAvailability" class="w-full max-w-md space-y-4 rounded-2xl bg-white dark:bg-slate-800 p-6"><h2 class="text-xl font-bold">Nueva disponibilidad</h2><label class="block">Fecha<input v-model="slot.date" type="date" required class="mt-1 w-full rounded-xl border p-3 dark:bg-slate-900" /></label><div class="grid grid-cols-2 gap-3"><label>Inicio<input v-model="slot.startTime" type="time" required class="mt-1 w-full rounded-xl border p-3 dark:bg-slate-900" /></label><label>Fin<input v-model="slot.endTime" type="time" required class="mt-1 w-full rounded-xl border p-3 dark:bg-slate-900" /></label></div><div class="flex justify-end gap-3"><button type="button" @click="availabilityFor = undefined">Cancelar</button><button class="rounded-xl bg-[#3E90C8] px-5 py-3 text-white font-bold">Crear</button></div></form></div>
  </main>
</template>
