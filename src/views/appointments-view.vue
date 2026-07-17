<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useAuthStore } from '@/store/auth-store'
import {
  cancelAppointmentById, getAppointmentsByPatient, getAvailabilitiesByDate,
  markAppointmentPaid, rescheduleAppointment,
} from '@/services/appointment-service'
import type { AppointmentResponse, DoctorAvailabilityResponse } from '@/types/appointment'

const auth = useAuthStore()
const appointments = ref<AppointmentResponse[]>([])
const activeTab = ref<'upcoming' | 'past'>('upcoming')
const loading = ref(false)
const error = ref('')
const selected = ref<AppointmentResponse>()
const mode = ref<'reschedule' | 'cancel'>()
const date = ref('')
const reason = ref('')
const availabilityId = ref('')
const availabilities = ref<DoctorAvailabilityResponse[]>([])

const pastStatuses = ['COMPLETED', 'CANCELLED', 'NO_SHOW']
const filtered = computed(() => appointments.value.filter(item =>
  activeTab.value === 'past' ? pastStatuses.includes(item.appointmentStatus) : !pastStatuses.includes(item.appointmentStatus)))

async function load() {
  if (!auth.user?.id) return
  loading.value = true
  error.value = ''
  try { appointments.value = (await getAppointmentsByPatient(auth.user.id, 0, 50)).content }
  catch (cause: any) { error.value = cause.response?.data?.message ?? 'No se pudieron cargar las citas.' }
  finally { loading.value = false }
}

watch(date, async value => {
  availabilityId.value = ''
  availabilities.value = value ? (await getAvailabilitiesByDate(value)).filter(item => item.status === 'AVAILABLE') : []
})

function open(item: AppointmentResponse, action: 'reschedule' | 'cancel') {
  selected.value = item; mode.value = action; date.value = ''; reason.value = ''; availabilityId.value = ''
}
function close() { selected.value = undefined; mode.value = undefined }

async function submitAction() {
  if (!selected.value) return
  try {
    if (mode.value === 'reschedule') await rescheduleAppointment(selected.value.idAppointment, { newAvailabilityId: availabilityId.value })
    else await cancelAppointmentById(selected.value.idAppointment, { reason: reason.value })
    close(); await load()
  } catch (cause: any) { error.value = cause.response?.data?.message ?? 'No se pudo actualizar la cita.' }
}

async function pay(item: AppointmentResponse) {
  try { await markAppointmentPaid(item.idAppointment); await load() }
  catch (cause: any) { error.value = cause.response?.data?.message ?? 'No se pudo registrar el pago simulado.' }
}

onMounted(load)
</script>

<template>
  <main class="max-w-6xl mx-auto">
    <header class="flex flex-wrap justify-between items-end gap-4 mb-7">
      <div><h1 class="text-3xl font-extrabold text-slate-800 dark:text-white">Mis citas</h1><p class="text-slate-500 mt-1">Consulta, paga, reprograma o cancela tus reservas.</p></div>
      <RouterLink to="/agendar" class="rounded-xl bg-gradient-to-r from-[#418FC8] to-[#6DC7DC] px-5 py-3 text-white font-bold">Agendar nueva cita</RouterLink>
    </header>
    <p v-if="error" class="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">{{ error }}</p>
    <nav class="flex gap-5 border-b mb-6"><button v-for="tab in ['upcoming','past'] as const" :key="tab" @click="activeTab = tab" class="pb-3 font-bold" :class="activeTab === tab ? 'text-[#418FC8] border-b-2 border-[#418FC8]' : 'text-slate-500'">{{ tab === 'upcoming' ? 'Próximas' : 'Anteriores' }}</button></nav>
    <div v-if="loading" class="py-16 text-center text-slate-500">Cargando citas…</div>
    <div v-else-if="filtered.length" class="grid lg:grid-cols-2 gap-5">
      <article v-for="item in filtered" :key="item.idAppointment" class="rounded-2xl border bg-white dark:bg-slate-800 dark:border-slate-700 p-6 shadow-sm">
        <div class="flex justify-between gap-3"><div><h2 class="text-lg font-bold">{{ item.doctorName || 'Doctor asignado' }}</h2><p class="text-sm text-slate-500">{{ item.consultationReason }}</p></div><span class="h-fit rounded-full bg-slate-100 dark:bg-slate-700 px-3 py-1 text-xs font-bold">{{ item.appointmentStatus }}</span></div>
        <dl class="grid grid-cols-2 gap-4 my-5 text-sm"><div><dt class="text-slate-500">Fecha</dt><dd>{{ item.date || 'Por confirmar' }} {{ item.startTime }}</dd></div><div><dt class="text-slate-500">Tipo</dt><dd>{{ item.appointmentType }}</dd></div><div><dt class="text-slate-500">Precio</dt><dd>S/ {{ item.appointmentPrice ?? 0 }}</dd></div><div><dt class="text-slate-500">Pago</dt><dd>{{ item.paymentStatus }}</dd></div></dl>
        <div v-if="activeTab === 'upcoming'" class="flex flex-wrap gap-2">
          <button v-if="item.paymentStatus === 'PENDING_PAYMENT'" @click="pay(item)" class="rounded-lg bg-emerald-600 px-4 py-2 text-white font-semibold">Simular pago</button>
          <button @click="open(item, 'reschedule')" class="rounded-lg border px-4 py-2 text-[#418FC8] font-semibold">Reprogramar</button>
          <button @click="open(item, 'cancel')" class="rounded-lg border border-red-200 px-4 py-2 text-red-600 font-semibold">Cancelar</button>
        </div>
      </article>
    </div>
    <div v-else class="rounded-2xl border border-dashed p-14 text-center text-slate-500">No hay citas en esta sección.</div>

    <div v-if="selected" class="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4">
      <form @submit.prevent="submitAction" class="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-2xl space-y-5">
        <h2 class="text-2xl font-bold">{{ mode === 'reschedule' ? 'Reprogramar cita' : 'Cancelar cita' }}</h2>
        <template v-if="mode === 'reschedule'">
          <label class="block">Nueva fecha<input v-model="date" type="date" required class="mt-1 w-full rounded-xl border p-3 dark:bg-slate-900" /></label>
          <label class="block">Horario disponible<select v-model="availabilityId" required class="mt-1 w-full rounded-xl border p-3 dark:bg-slate-900"><option value="" disabled>Selecciona</option><option v-for="slot in availabilities" :key="slot.idAvailability" :value="slot.idAvailability">{{ slot.startTime }} – {{ slot.endTime }}</option></select></label>
        </template>
        <label v-else class="block">Motivo<textarea v-model.trim="reason" required rows="4" class="mt-1 w-full rounded-xl border p-3 dark:bg-slate-900"></textarea></label>
        <div class="flex justify-end gap-3"><button type="button" @click="close" class="px-4 py-2">Volver</button><button class="rounded-xl bg-[#3E90C8] px-5 py-3 text-white font-bold">Confirmar</button></div>
      </form>
    </div>
  </main>
</template>
