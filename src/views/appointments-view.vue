<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppointmentStore } from '@/store/appointment-store'

const store = useAppointmentStore()
const { items, loading, error } = storeToRefs(store)

onMounted(() => {
  void store.fetchAll()
})
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold text-slate-900">Mis citas</h1>
    <p class="text-slate-600 text-sm">
      Estado sincronizado con el store Pinia y el servicio de citas.
    </p>
    <p v-if="loading" class="text-slate-500 text-sm">Cargando citas…</p>
    <p v-else-if="error" class="rounded-lg bg-red-50 text-red-700 text-sm px-3 py-2">
      {{ error }}
    </p>
    <ul v-else class="space-y-3">
      <li
        v-for="a in items"
        :key="a.id"
        class="rounded-xl border border-slate-200 bg-white p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
      >
        <div>
          <p class="font-medium text-slate-900">
            {{ new Date(a.startsAt).toLocaleString() }}
          </p>
          <p class="text-sm text-slate-600">Médico: {{ a.doctorId }}</p>
        </div>
        <span
          class="inline-flex text-xs font-semibold rounded-full px-2 py-1 capitalize self-start"
          :class="{
            'bg-doc-blue-50 text-doc-blue-700': a.status === 'scheduled',
            'bg-slate-100 text-slate-700': a.status === 'completed',
            'bg-red-50 text-red-700': a.status === 'cancelled',
          }"
        >
          {{ a.status }}
        </span>
      </li>
    </ul>
    <p v-if="!loading && !error && items.length === 0" class="text-slate-500 text-sm">
      No hay citas aún.
    </p>
  </div>
</template>
