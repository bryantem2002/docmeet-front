<script setup lang="ts">
import { ref } from 'vue'

const patients = ref([
  { id: 1, name: 'Carlos Pérez', lastVisit: '10 May 2026', totalVisits: 3 },
  { id: 2, name: 'Ana Gómez', lastVisit: '12 May 2026', totalVisits: 1 },
  { id: 3, name: 'Luis Rodríguez', lastVisit: '15 May 2026', totalVisits: 5 }
])
</script>

<template>
  <div class="max-w-6xl mx-auto w-full px-4 sm:px-0 font-sans">
    <div class="mb-8">
      <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight">Mis Pacientes</h1>
      <p class="text-slate-500 mt-2 font-medium">Revisa el historial de los pacientes que has atendido.</p>
    </div>

    <!-- Filtros Búsqueda -->
    <div class="flex gap-4 mb-6">
      <div class="relative flex-1 max-w-md">
        <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <input type="text" placeholder="Buscar paciente por nombres o DNI..." class="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-sm text-slate-700" />
      </div>
      <button class="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold py-3 px-6 rounded-xl flex items-center gap-2 text-sm transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
        Filtros
      </button>
    </div>

    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm font-bold uppercase tracking-wider">
            <th class="p-4">Paciente</th>
            <th class="p-4">Última Visita</th>
            <th class="p-4">Nº Visitas</th>
            <th class="p-4 text-right">Acción</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="patient in patients" :key="patient.id" class="hover:bg-slate-50 transition-colors">
            <td class="p-4 font-bold text-slate-800">{{ patient.name }}</td>
            <td class="p-4 text-slate-500 font-medium">{{ patient.lastVisit }}</td>
            <td class="p-4 text-slate-500 font-medium">{{ patient.totalVisits }}</td>
            <td class="p-4 text-right">
              <button class="text-blue-600 font-bold hover:underline">Ver Historial</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
