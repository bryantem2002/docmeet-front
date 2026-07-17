<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getMedicalRecords } from '@/services/medical-service'
import type { MedicalRecordSummaryResponse } from '@/types/medical'

const records = ref<MedicalRecordSummaryResponse[]>([])
const search = ref('')
const page = ref(0)
const totalPages = ref(0)
const loading = ref(false)
const error = ref('')

async function load(target = page.value) {
  loading.value = true
  error.value = ''
  try {
    const response = await getMedicalRecords({ page: target, size: 10, search: search.value || undefined })
    records.value = response.content
    page.value = response.page
    totalPages.value = response.totalPages
  } catch (cause: any) {
    error.value = cause.response?.data?.message ?? 'No se pudieron cargar las historias clínicas.'
  } finally {
    loading.value = false
  }
}

onMounted(() => load())
</script>

<template>
  <main class="max-w-6xl mx-auto p-6">
    <header class="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div>
        <h1 class="text-3xl font-bold text-slate-800 dark:text-white">Historias clínicas</h1>
        <p class="text-slate-500">Listado paginado de historias clínicas.</p>
      </div>
      <form @submit.prevent="load(0)" class="flex gap-2"><input v-model.trim="search" placeholder="Nombre, DNI…" class="rounded-xl border px-4 py-3 dark:bg-slate-900" /><button class="rounded-xl border px-4">Buscar</button></form>
      <RouterLink to="/medical-records/new" class="rounded-xl bg-[#3E90C8] px-5 py-3 font-semibold text-white">Crear nueva</RouterLink>
    </header>

    <p v-if="error" class="mb-4 rounded-xl bg-red-50 p-4 text-red-700">{{ error }}</p>
    <div class="overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:bg-slate-800 dark:border-slate-700">
      <table class="w-full text-left">
        <thead class="bg-slate-50 dark:bg-slate-700">
          <tr><th class="p-4">Paciente</th><th class="p-4">Documento</th><th class="p-4">Grupo sanguíneo</th><th class="p-4">Creación</th><th class="p-4">Acciones</th></tr>
        </thead>
        <tbody>
          <tr v-for="record in records" :key="record.idMedicalRecord" class="border-t border-slate-100 dark:border-slate-700">
            <td class="p-4"><strong>{{ record.patientName }}</strong><div class="text-xs text-slate-500">{{ record.patientId }}</div></td>
            <td class="p-4">{{ record.documentNumber }}</td>
            <td class="p-4">{{ record.bloodType }}</td>
            <td class="p-4">{{ new Date(record.createdAt).toLocaleDateString() }}</td>
            <td class="p-4 space-x-3">
              <RouterLink :to="`/medical-records/${record.idMedicalRecord}`" class="text-[#3E90C8] font-semibold">Ver</RouterLink>
              <RouterLink :to="`/medical-records/${record.idMedicalRecord}/edit`" class="text-[#3E90C8] font-semibold">Editar</RouterLink>
            </td>
          </tr>
          <tr v-if="!loading && records.length === 0"><td colspan="5" class="p-8 text-center text-slate-500">No hay historias clínicas.</td></tr>
        </tbody>
      </table>
    </div>
    <footer class="mt-4 flex justify-end items-center gap-3">
      <button :disabled="page === 0 || loading" @click="load(page - 1)" class="px-4 py-2 rounded-lg border disabled:opacity-40">Anterior</button>
      <span>Página {{ page + 1 }} de {{ totalPages || 1 }}</span>
      <button :disabled="page + 1 >= totalPages || loading" @click="load(page + 1)" class="px-4 py-2 rounded-lg border disabled:opacity-40">Siguiente</button>
    </footer>
  </main>
</template>
