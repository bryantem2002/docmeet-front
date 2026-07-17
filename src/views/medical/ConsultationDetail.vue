<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getConsultationDetails } from '@/services/medical-service'
import type { MedicalConsultationDetailsResponse } from '@/types/medical'

const id = useRoute().params.id as string
const consultation = ref<MedicalConsultationDetailsResponse>()
const error = ref('')
onMounted(async () => {
  try { consultation.value = await getConsultationDetails(id) }
  catch (cause: any) { error.value = cause.response?.data?.message ?? 'No se pudo cargar la consulta.' }
})
</script>

<template>
  <main class="max-w-6xl mx-auto p-6 space-y-6">
    <p v-if="error" class="rounded-xl bg-red-50 p-4 text-red-700">{{ error }}</p>
    <template v-if="consultation">
      <section class="rounded-2xl border bg-white dark:bg-slate-800 dark:border-slate-700 p-6">
        <h1 class="text-3xl font-bold mb-5">Consulta médica</h1>
        <dl class="grid sm:grid-cols-3 gap-4"><div><dt class="text-slate-500">Fecha</dt><dd>{{ consultation.date }}</dd></div><div><dt class="text-slate-500">Doctor</dt><dd>{{ consultation.doctorName || consultation.doctor }}</dd></div><div><dt class="text-slate-500">Estado</dt><dd>{{ consultation.status }}</dd></div><div class="sm:col-span-3"><dt class="text-slate-500">Motivo</dt><dd>{{ consultation.reason }}</dd></div><div class="sm:col-span-3"><dt class="text-slate-500">Síntomas</dt><dd>{{ consultation.symptoms }}</dd></div><div class="sm:col-span-3"><dt class="text-slate-500">Observaciones</dt><dd>{{ consultation.observations }}</dd></div></dl>
      </section>
      <div class="grid md:grid-cols-3 gap-6">
        <section class="rounded-2xl border bg-white dark:bg-slate-800 dark:border-slate-700 p-6"><h2 class="text-xl font-bold mb-3">Diagnósticos</h2><ul><li v-for="item in consultation.diagnoses" :key="item.id" class="py-2">{{ item.description }} — {{ item.severity }}</li><li v-if="!consultation.diagnoses.length" class="text-slate-500">Sin diagnósticos.</li></ul></section>
        <section class="rounded-2xl border bg-white dark:bg-slate-800 dark:border-slate-700 p-6"><h2 class="text-xl font-bold mb-3">Recetas</h2><ul><li v-for="item in consultation.prescriptions" :key="item.id" class="py-2">{{ item.instructions }}</li><li v-if="!consultation.prescriptions.length" class="text-slate-500">Sin recetas.</li></ul></section>
        <section class="rounded-2xl border bg-white dark:bg-slate-800 dark:border-slate-700 p-6"><h2 class="text-xl font-bold mb-3">Exámenes</h2><ul><li v-for="item in consultation.medicalExams" :key="item.id" class="py-2">{{ item.name }} — {{ item.status }}</li><li v-if="!consultation.medicalExams.length" class="text-slate-500">Sin exámenes.</li></ul></section>
      </div>
    </template>
  </main>
</template>
