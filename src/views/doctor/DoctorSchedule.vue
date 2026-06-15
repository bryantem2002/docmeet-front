<script setup lang="ts">
import { ref } from 'vue'

const schedules = ref([
  { id: '1', day: 'Lunes', startTime: '08:00 AM', endTime: '02:00 PM', active: true },
  { id: '2', day: 'Martes', startTime: '08:00 AM', endTime: '02:00 PM', active: true },
  { id: '3', day: 'Miércoles', startTime: '10:00 AM', endTime: '06:00 PM', active: true },
  { id: '4', day: 'Jueves', startTime: '08:00 AM', endTime: '02:00 PM', active: false },
  { id: '5', day: 'Viernes', startTime: '08:00 AM', endTime: '02:00 PM', active: true }
])
</script>

<template>
  <div class="max-w-7xl mx-auto w-full px-4 sm:px-0 font-sans">
    <div class="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">Mi Horario de Atención</h1>
        <p class="text-slate-500 dark:text-slate-400 mt-2 font-medium">Configura tus días y horas de disponibilidad para citas.</p>
      </div>
      <button class="bg-gradient-to-r from-[#418FC8] to-[#6DC7DC] hover:opacity-90 text-white px-4 py-2 rounded-lg font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
        Guardar Cambios
      </button>
    </div>

    <div class="bg-white dark:bg-slate-800  border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
      <!-- Vista Móvil -->
      <div class="block sm:hidden divide-y divide-slate-100 dark:divide-slate-700">
        <div v-for="sch in schedules" :key="'mob-'+sch.id" class="p-5 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
          <div class="flex justify-between items-start mb-3">
            <h3 class="font-bold text-slate-800 dark:text-white text-base">{{ sch.day }}</h3>
            <span class="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider" :class="sch.active ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300' : 'bg-slate-100 dark:bg-slate-600 text-slate-600 dark:text-slate-300'">
              {{ sch.active ? 'Habilitado' : 'Deshabilitado' }}
            </span>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">Horario: <span class="font-bold text-slate-700 dark:text-slate-200">{{ sch.startTime }} - {{ sch.endTime }}</span></p>
          <button class="w-full text-[#418FC8] hover:text-white bg-[#418FC8]/10 hover:bg-[#418FC8] py-2.5 rounded-xl text-sm font-bold transition-all text-center">
            Editar Horario
          </button>
        </div>
      </div>

      <!-- Vista Desktop -->
      <div class="hidden sm:block overflow-x-auto">
        <table class="w-full text-left text-sm text-slate-600 dark:text-slate-300 min-w-[600px]">
        <thead class="bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-400 font-medium border-b border-slate-200 dark:border-slate-700">
          <tr>
            <th class="px-6 py-4">Día de la Semana</th>
            <th class="px-6 py-4">Hora de Inicio</th>
            <th class="px-6 py-4">Hora de Fin</th>
            <th class="px-6 py-4">Estado</th>
            <th class="px-6 py-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
          <tr v-for="sch in schedules" :key="sch.id" class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
            <td class="px-6 py-4 font-bold text-slate-800 dark:text-white">{{ sch.day }}</td>
            <td class="px-6 py-4">{{ sch.startTime }}</td>
            <td class="px-6 py-4">{{ sch.endTime }}</td>
            <td class="px-6 py-4">
              <span 
                class="px-2 py-1 rounded text-xs font-bold"
                :class="sch.active ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300' : 'bg-slate-100 dark:bg-slate-600 text-slate-600 dark:text-slate-300'"
              >
                {{ sch.active ? 'Habilitado' : 'Deshabilitado' }}
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <button class="text-[#418FC8] hover:text-white bg-[#418FC8]/10 hover:bg-[#418FC8] px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm hover:shadow-md">Editar</button>
            </td>
          </tr>
        </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
