<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { deleteMedicalRecord, getMedicalRecordDetails } from '@/services/medical-service'
import type { MedicalRecordResponse } from '@/types/medical'

const id = useRoute().params.id as string
const router = useRouter()
const record = ref<MedicalRecordResponse>()
const error = ref('')

onMounted(async () => {
  try { record.value = await getMedicalRecordDetails(id) }
  catch (cause: any) { error.value = cause.response?.data?.message ?? 'No se pudo cargar la historia clínica.' }
})

async function remove() {
  if (!confirm('¿Eliminar lógicamente esta historia clínica?')) return
  try { await deleteMedicalRecord(id); await router.push('/medical-records') }
  catch (cause: any) { error.value = cause.response?.data?.message ?? 'No se pudo eliminar.' }
}
</script>

<template>
  <main class="max-w-5xl mx-auto p-6 space-y-6">
    <p v-if="error" class="rounded-xl bg-red-50 p-4 text-red-700">{{ error }}</p>
    <template v-if="record">
      <section class="rounded-2xl border bg-white dark:bg-slate-800 dark:border-slate-700 p-6">
        <div class="flex flex-wrap justify-between gap-4"><h1 class="text-3xl font-bold">Historia clínica</h1><div class="space-x-4"><RouterLink :to="`/medical-records/${id}/edit`" class="text-[#3E90C8] font-semibold">Editar</RouterLink><button @click="remove" class="text-red-600 font-semibold">Eliminar</button></div></div>
        <dl class="grid sm:grid-cols-3 gap-4 mt-6"><div><dt class="text-slate-500">Paciente</dt><dd>{{ record.patientId }}</dd></div><div><dt class="text-slate-500">Grupo sanguíneo</dt><dd>{{ record.bloodType }}</dd></div><div><dt class="text-slate-500">Creación</dt><dd>{{ record.createdAt }}</dd></div><div class="sm:col-span-3"><dt class="text-slate-500">Observaciones</dt><dd>{{ record.observations || 'Sin observaciones' }}</dd></div></dl>
      </section>
      <div class="grid md:grid-cols-2 gap-6">
        <section class="rounded-2xl border bg-white dark:bg-slate-800 dark:border-slate-700 p-6"><h2 class="text-xl font-bold mb-3">Alergias</h2><ul><li v-for="item in record.allergies" :key="item.id" class="py-2">{{ item.name }}</li><li v-if="!record.allergies.length" class="text-slate-500">Sin alergias.</li></ul></section>
        <section class="rounded-2xl border bg-white dark:bg-slate-800 dark:border-slate-700 p-6"><h2 class="text-xl font-bold mb-3">Enfermedades crónicas</h2><ul><li v-for="item in record.chronicDiseases" :key="item.id" class="py-2">{{ item.name }}</li><li v-if="!record.chronicDiseases.length" class="text-slate-500">Sin enfermedades crónicas.</li></ul></section>
      </div>
      <section class="rounded-2xl border bg-white dark:bg-slate-800 dark:border-slate-700 p-6">
        <div class="flex justify-between"><h2 class="text-xl font-bold">Consultas</h2><RouterLink :to="{ path: '/consultations/new', query: { medicalRecord: id } }" class="text-[#3E90C8] font-semibold">Nueva consulta</RouterLink></div>
        <ul class="mt-4 divide-y"><li v-for="item in record.consultations" :key="item.id" class="py-3 flex justify-between"><span>{{ item.date }} — {{ item.doctorName || item.doctor }}</span><RouterLink :to="`/consultations/${item.id}`" class="text-[#3E90C8]">Ver</RouterLink></li><li v-if="!record.consultations.length" class="py-4 text-slate-500">Sin consultas.</li></ul>
      </section>
    </template>
  </main>
</template>
