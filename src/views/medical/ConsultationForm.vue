<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createConsultation } from '@/services/medical-service'

const route = useRoute()
const router = useRouter()
const medicalRecordId = String(route.query.medicalRecord ?? '')
const form = ref({ reason: '', symptoms: '', observations: '' })
const loading = ref(false)
const error = ref('')

async function submit() {
  if (!medicalRecordId) { error.value = 'Falta seleccionar una historia clínica.'; return }
  loading.value = true
  try {
    const response = await createConsultation(medicalRecordId, form.value)
    await router.push(`/consultations/${response.id}`)
  } catch (cause: any) { error.value = cause.response?.data?.message ?? 'No se pudo crear la consulta.' }
  finally { loading.value = false }
}
</script>

<template>
  <main class="max-w-2xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-2">Nueva consulta médica</h1>
    <p class="text-slate-500 mb-6">Historia clínica: {{ medicalRecordId }}</p>
    <form @submit.prevent="submit" class="space-y-5 rounded-2xl border bg-white dark:bg-slate-800 dark:border-slate-700 p-6">
      <p v-if="error" class="rounded-xl bg-red-50 p-4 text-red-700">{{ error }}</p>
      <label class="block">Motivo<input v-model.trim="form.reason" required class="mt-1 w-full rounded-xl border p-3 dark:bg-slate-900" /></label>
      <label class="block">Síntomas<textarea v-model.trim="form.symptoms" required rows="4" class="mt-1 w-full rounded-xl border p-3 dark:bg-slate-900"></textarea></label>
      <label class="block">Observaciones<textarea v-model.trim="form.observations" rows="4" class="mt-1 w-full rounded-xl border p-3 dark:bg-slate-900"></textarea></label>
      <button :disabled="loading" class="w-full rounded-xl bg-[#3E90C8] p-3 font-semibold text-white disabled:opacity-50">Crear consulta</button>
    </form>
  </main>
</template>
