<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { doctorController, type IDoctorListItem } from '@/controllers/doctor.controller'
import { toApiError } from '@/utils/handle-api-error'

const doctors = ref<IDoctorListItem[]>([])
const specialty = ref('')
const loading = ref(false)
const errorMessage = ref<string | null>(null)

async function load(): Promise<void> {
  loading.value = true
  errorMessage.value = null

  try {
    doctors.value = await doctorController.list(specialty.value, { useMock: true })
  } catch (e) {
    errorMessage.value = toApiError(e).message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  void load()
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
      <div>
        <h1 class="text-3xl font-bold text-[var(--color-doc-text-main)] dark:text-white mb-2">Directorio Médico</h1>
        <p class="text-[var(--color-doc-text-muted)] dark:text-slate-400 text-base">
          Encuentra al especialista ideal para tu cuidado y bienestar.
        </p>
      </div>

      <form class="flex w-full lg:w-auto gap-3" @submit.prevent="load">
        <div class="relative flex-1 lg:w-72">
          <input
            v-model="specialty"
            type="search"
            placeholder="Buscar especialidad..."
            class="block w-full py-2.5 px-4 border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-doc-blue-500)] sm:text-sm"
          />
        </div>
        <button
          type="submit"
          class="rounded-xl bg-[var(--color-doc-blue-600)] text-white px-5 py-2.5 text-sm font-semibold hover:bg-[var(--color-doc-blue-700)] disabled:opacity-70"
          :disabled="loading"
        >
          {{ loading ? 'Buscando…' : 'Buscar' }}
        </button>
      </form>
    </div>

    <p v-if="errorMessage" class="mb-6 rounded-xl bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm px-4 py-3 border border-red-200 dark:border-red-800">
      {{ errorMessage }}
    </p>

    <p v-if="loading" class="text-slate-500 dark:text-slate-400 text-sm">Cargando directorio…</p>

    <ul v-else-if="doctors.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <li
        v-for="d in doctors"
        :key="d.id"
        class="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4"
      >
        <div class="flex items-start gap-4">
          <img :src="d.avatar" :alt="d.fullName" class="w-16 h-16 rounded-full object-cover ring-2 ring-white dark:ring-slate-700 shadow-sm" />
          <div>
            <h3 class="font-bold text-lg text-slate-900 dark:text-white">{{ d.fullName }}</h3>
            <p class="text-sm font-semibold text-[var(--color-doc-blue-600)] dark:text-[#6DC7DC] mt-1">{{ d.specialty }}</p>
          </div>
        </div>
        <p v-if="d.bio" class="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">{{ d.bio }}</p>
        <router-link
          :to="`/doctor/${d.id}`"
          class="text-sm font-semibold text-[var(--color-doc-blue-600)] dark:text-[#6DC7DC] hover:underline mt-auto"
        >
          Ver perfil →
        </router-link>
      </li>
    </ul>

    <p v-else class="text-slate-500 dark:text-slate-400 text-sm text-center py-12">
      No se encontraron especialistas para "{{ specialty }}".
      <button type="button" class="block mx-auto mt-2 text-[var(--color-doc-blue-600)] dark:text-[#6DC7DC] font-semibold" @click="specialty = ''; load()">
        Limpiar búsqueda
      </button>
    </p>
  </div>
</template>
