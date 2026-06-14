<script setup lang="ts">
import { ref } from 'vue'

const todayAppointments = ref([
  { id: '1', time: '09:00 AM', patient: 'Ana Lopez', type: 'Consulta General', status: 'En Espera' },
  { id: '2', time: '09:30 AM', patient: 'Carlos Mendoza', type: 'Control', status: 'Programada' },
  { id: '3', time: '10:00 AM', patient: 'Luis Garcés', type: 'Primera Cita', status: 'Programada' }
])
</script>

<template>
  <div class="max-w-7xl mx-auto w-full px-4 sm:px-0 font-sans">
    <div class="mb-8">
      <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight">Mi Agenda del Día</h1>
      <p class="text-slate-500 mt-2 font-medium">Revisa tus citas programadas para hoy y gestiona tu atención.</p>
    </div>

    <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <table class="w-full text-left text-sm text-slate-600">
        <thead class="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
          <tr>
            <th class="px-6 py-4">Hora</th>
            <th class="px-6 py-4">Paciente</th>
            <th class="px-6 py-4">Motivo</th>
            <th class="px-6 py-4">Estado</th>
            <th class="px-6 py-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="app in todayAppointments" :key="app.id" class="hover:bg-slate-50/50 transition-colors">
            <td class="px-6 py-4 font-bold text-slate-800">{{ app.time }}</td>
            <td class="px-6 py-4 font-bold">{{ app.patient }}</td>
            <td class="px-6 py-4">{{ app.type }}</td>
            <td class="px-6 py-4">
              <span 
                class="px-2 py-1 rounded text-xs font-bold"
                :class="app.status === 'En Espera' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'"
              >
                {{ app.status }}
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <button class="bg-[var(--color-doc-teal-600)] hover:bg-teal-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                Atender Paciente
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
