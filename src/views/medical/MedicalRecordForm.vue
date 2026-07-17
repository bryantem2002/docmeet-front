<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createMedicalRecord, getMedicalRecordDetails, updateMedicalRecord } from '@/services/medical-service'
import type { BloodType } from '@/types/medical'

const route = useRoute()
const router = useRouter()
const id = computed(() => route.params.id as string | undefined)
const form = ref<{ patientId: string; bloodType: BloodType; allergies: string; chronicDiseases: string; observations: string }>({
  patientId: '', bloodType: 'O_POSITIVE', allergies: '', chronicDiseases: '', observations: '',
})
const loading = ref(false)
const error = ref('')

onMounted(async () => {
  if (!id.value) return
  try {
    const record = await getMedicalRecordDetails(id.value)
    form.value = {
      patientId: record.patientId, bloodType: record.bloodType,
      allergies: record.allergies.map(item => item.name).join(', '),
      chronicDiseases: record.chronicDiseases.map(item => item.name).join(', '),
      observations: record.observations ?? '',
    }
  } catch (cause: any) {
    error.value = cause.response?.data?.message ?? 'No se pudo cargar la historia clínica.'
  }
})

async function submit() {
  loading.value = true
  error.value = ''
  try {
    const allergies = form.value.allergies.split(',').map(value => value.trim()).filter(Boolean)
    const chronicDiseases = form.value.chronicDiseases.split(',').map(value => value.trim()).filter(Boolean)
    const response = id.value
      ? await updateMedicalRecord(id.value, { bloodType: form.value.bloodType, observations: form.value.observations, allergies, chronicDiseases })
      : await createMedicalRecord({ patientId: form.value.patientId, bloodType: form.value.bloodType, allergies, chronicDiseases, observations: form.value.observations })
    await router.push(`/medical-records/${response.idMedicalRecord}`)
  } catch (cause: any) {
    error.value = cause.response?.data?.message ?? 'No se pudo guardar la historia clínica.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="max-w-2xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6 text-slate-800 dark:text-white">{{ id ? 'Editar' : 'Crear' }} historia clínica</h1>
    <form @submit.prevent="submit" class="space-y-5 rounded-2xl bg-white dark:bg-slate-800 border dark:border-slate-700 p-6">
      <p v-if="error" class="rounded-xl bg-red-50 p-4 text-red-700">{{ error }}</p>
      <label v-if="!id" class="block">ID del paciente<input v-model.trim="form.patientId" required class="mt-1 w-full rounded-xl border p-3 dark:bg-slate-900" /></label>
      <label class="block">Grupo sanguíneo<select v-model="form.bloodType" class="mt-1 w-full rounded-xl border p-3 dark:bg-slate-900"><option v-for="value in ['A_POSITIVE','A_NEGATIVE','B_POSITIVE','B_NEGATIVE','AB_POSITIVE','AB_NEGATIVE','O_POSITIVE','O_NEGATIVE']" :key="value">{{ value }}</option></select></label>
      <label class="block">Alergias <span class="text-xs text-slate-500">(separadas por coma)</span><input v-model="form.allergies" class="mt-1 w-full rounded-xl border p-3 dark:bg-slate-900" /></label>
      <label class="block">Enfermedades crónicas <span class="text-xs text-slate-500">(separadas por coma)</span><input v-model="form.chronicDiseases" class="mt-1 w-full rounded-xl border p-3 dark:bg-slate-900" /></label>
      <label class="block">Observaciones<textarea v-model.trim="form.observations" rows="5" class="mt-1 w-full rounded-xl border p-3 dark:bg-slate-900"></textarea></label>
      <div class="flex justify-end gap-3"><RouterLink to="/medical-records" class="px-5 py-3">Cancelar</RouterLink><button :disabled="loading" class="rounded-xl bg-[#3E90C8] px-5 py-3 font-semibold text-white disabled:opacity-50">Guardar</button></div>
    </form>
  </main>
</template>
