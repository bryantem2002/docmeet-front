<script setup lang="ts">
import { ref } from 'vue'

const appointments = ref([
  { id: '1', date: '15 Oct 2026', time: '10:00 AM', patient: 'Juan Pérez', doctor: 'Dr. Gregory House', status: 'Programada' },
  { id: '2', date: '15 Oct 2026', time: '11:30 AM', patient: 'María García', doctor: 'Dr. Gregory House', status: 'En Espera' }
])
</script>

<template>
  <div class="max-w-7xl mx-auto w-full px-4 sm:px-0 font-sans">
    <div class="mb-8 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight">Citas Médicas</h1>
        <p class="text-slate-500 mt-2 font-medium">Gestión de agenda y citas de pacientes.</p>
      </div>
      <button class="bg-[var(--color-doc-blue-600)] hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
        Agendar Cita
      </button>
    </div>

    <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <table class="w-full text-left text-sm text-slate-600">
        <thead class="bg-slate-50 text-slate-500 font-medium">
          <tr>
            <th class="px-6 py-4">Fecha</th>
            <th class="px-6 py-4">Hora</th>
            <th class="px-6 py-4">Paciente</th>
            <th class="px-6 py-4">Médico</th>
            <th class="px-6 py-4">Estado</th>
            <th class="px-6 py-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="app in appointments" :key="app.id" class="hover:bg-slate-50/50 transition-colors">
            <td class="px-6 py-4 font-bold text-slate-800">{{ app.date }}</td>
            <td class="px-6 py-4">{{ app.time }}</td>
            <td class="px-6 py-4">{{ app.patient }}</td>
            <td class="px-6 py-4">{{ app.doctor }}</td>
            <td class="px-6 py-4">
              <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold">{{ app.status }}</span>
            </td>
            <td class="px-6 py-4 text-right">
              <button class="text-[var(--color-doc-blue-600)] hover:text-blue-800 font-medium text-sm">Gestionar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
