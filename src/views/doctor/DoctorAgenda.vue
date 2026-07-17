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
      <h1 class="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">Mi Agenda del Día</h1>
      <p class="text-slate-500 dark:text-slate-400 mt-2 font-medium">Revisa tus citas programadas para hoy y gestiona tu atención.</p>
    </div>

    <div class="bg-white dark:bg-slate-800  border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
      <!-- Vista Móvil -->
      <div class="block sm:hidden divide-y divide-slate-100 dark:divide-slate-700">
        <div v-for="app in todayAppointments" :key="'mob-'+app.id" class="p-5 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
          <div class="flex justify-between items-start mb-3">
            <div>
              <h3 class="font-bold text-slate-800 dark:text-white text-base">{{ app.patient }}</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Hora: <span class="font-bold text-slate-700 dark:text-slate-200">{{ app.time }}</span></p>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Motivo: <span class="font-medium text-slate-700 dark:text-slate-200">{{ app.type }}</span></p>
            </div>
            <span class="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider" :class="app.status === 'En Espera' ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300' : 'bg-[#418FC8]/10 text-[#418FC8]'">
              {{ app.status }}
            </span>
          </div>
          <RouterLink to="/medical-records" class="block w-full bg-gradient-to-r from-[#418FC8] to-[#6DC7DC] hover:opacity-90 text-white py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 text-center mt-2">
            Atender Paciente
          </RouterLink>
        </div>
      </div>

      <!-- Vista Desktop -->
      <div class="hidden sm:block overflow-x-auto">
        <table class="w-full text-left text-sm text-slate-600 dark:text-slate-300 min-w-[600px]">
        <thead class="bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-400 font-medium border-b border-slate-200 dark:border-slate-700">
          <tr>
            <th class="px-6 py-4">Hora</th>
            <th class="px-6 py-4">Paciente</th>
            <th class="px-6 py-4">Motivo</th>
            <th class="px-6 py-4">Estado</th>
            <th class="px-6 py-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
          <tr v-for="app in todayAppointments" :key="app.id" class="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors">
            <td class="px-6 py-4 font-bold text-slate-800 dark:text-white">{{ app.time }}</td>
            <td class="px-6 py-4 font-bold">{{ app.patient }}</td>
            <td class="px-6 py-4">{{ app.type }}</td>
            <td class="px-6 py-4">
              <span 
                class="px-2 py-1 rounded text-xs font-bold"
                :class="app.status === 'En Espera' ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300' : 'bg-[#418FC8]/10 text-[#418FC8]'"
              >
                {{ app.status }}
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <RouterLink to="/medical-records" class="inline-block bg-gradient-to-r from-[#418FC8] to-[#6DC7DC] hover:opacity-90 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
                Atender Paciente
              </RouterLink>
            </td>
          </tr>
        </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
