<script setup lang="ts">
import { ref } from 'vue'
import { PhMagnifyingGlass, PhFunnel } from '@phosphor-icons/vue'

const patients = ref(import.meta.env.DEV ? [
  { id: 1, name: 'Carlos Pérez', lastVisit: '10 May 2026', totalVisits: 3 },
  { id: 2, name: 'Ana Gómez', lastVisit: '12 May 2026', totalVisits: 1 },
  { id: 3, name: 'Luis Rodríguez', lastVisit: '15 May 2026', totalVisits: 5 }
] : [])
</script>

<template>
  <div class="max-w-6xl mx-auto w-full px-4 sm:px-0 font-sans">
    <div class="mb-8">
      <h1 class="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">Mis Pacientes</h1>
      <p class="text-slate-500 dark:text-slate-400 mt-2 font-medium">Revisa el historial de los pacientes que has atendido.</p>
    </div>

    <!-- Filtros Búsqueda -->
    <div class="flex flex-col sm:flex-row gap-4 mb-6">
      <div class="relative w-full sm:flex-1 sm:max-w-md">
        <PhMagnifyingGlass class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-400" />
        <input type="text" placeholder="Buscar paciente por nombres o DNI..." class="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6DC7DC]/50 focus:border-[#418FC8] font-medium text-sm text-slate-700 dark:text-slate-200" />
      </div>
      <button class="w-full sm:w-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors">
        <PhFunnel class="h-5 w-5" />
        Filtros
      </button>
    </div>

    <div class="bg-white dark:bg-slate-800  border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      <!-- Vista Móvil -->
      <div class="block sm:hidden divide-y divide-slate-100 dark:divide-slate-700">
        <div v-for="patient in patients" :key="'mob-'+patient.id" class="p-5 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="font-bold text-slate-800 dark:text-white text-base">{{ patient.name }}</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Última Visita: <span class="font-bold text-slate-700 dark:text-slate-200">{{ patient.lastVisit }}</span></p>
            </div>
            <div class="bg-slate-100 dark:bg-slate-600 px-3 py-1.5 rounded-xl text-center">
              <p class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Visitas</p>
              <p class="font-black text-[#418FC8] text-lg">{{ patient.totalVisits }}</p>
            </div>
          </div>
          <button class="w-full text-[#418FC8] font-bold hover:text-white bg-[#418FC8]/10 hover:bg-[#418FC8] py-2.5 rounded-xl text-sm transition-all text-center">
            Ver Historial
          </button>
        </div>
      </div>

      <!-- Vista Desktop -->
      <div class="hidden sm:block overflow-x-auto custom-scrollbar">
        <table class="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr class="bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider">
              <th class="p-4">Paciente</th>
              <th class="p-4">Última Visita</th>
              <th class="p-4">Nº Visitas</th>
              <th class="p-4 text-right">Acción</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
            <tr v-for="patient in patients" :key="patient.id" class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
              <td class="p-4 font-bold text-slate-800 dark:text-white">{{ patient.name }}</td>
              <td class="p-4 text-slate-500 dark:text-slate-400 font-medium">{{ patient.lastVisit }}</td>
              <td class="p-4 text-slate-500 dark:text-slate-400 font-medium">{{ patient.totalVisits }}</td>
              <td class="p-4 text-right">
                <button class="text-[#418FC8] font-bold hover:underline">Ver Historial</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
