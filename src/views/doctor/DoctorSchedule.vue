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
    <div class="mb-8 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight">Mi Horario de Atención</h1>
        <p class="text-slate-500 mt-2 font-medium">Configura tus días y horas de disponibilidad para citas.</p>
      </div>
      <button class="bg-[var(--color-doc-teal-600)] hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
        Guardar Cambios
      </button>
    </div>

    <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <table class="w-full text-left text-sm text-slate-600">
        <thead class="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
          <tr>
            <th class="px-6 py-4">Día de la Semana</th>
            <th class="px-6 py-4">Hora de Inicio</th>
            <th class="px-6 py-4">Hora de Fin</th>
            <th class="px-6 py-4">Estado</th>
            <th class="px-6 py-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="sch in schedules" :key="sch.id" class="hover:bg-slate-50/50 transition-colors">
            <td class="px-6 py-4 font-bold text-slate-800">{{ sch.day }}</td>
            <td class="px-6 py-4">{{ sch.startTime }}</td>
            <td class="px-6 py-4">{{ sch.endTime }}</td>
            <td class="px-6 py-4">
              <span 
                class="px-2 py-1 rounded text-xs font-bold"
                :class="sch.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'"
              >
                {{ sch.active ? 'Habilitado' : 'Deshabilitado' }}
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <button class="text-[var(--color-doc-teal-600)] hover:text-teal-800 font-medium text-sm">Editar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
