<script setup lang="ts">
import { ref } from 'vue'
import { PhMagnifyingGlass, PhFunnel } from '@phosphor-icons/vue'

const diagnoses = ref([
  { id: 'DX-1001', patient: 'Ana Gómez', date: '12 May 2026', code: 'J02.9', description: 'Faringitis aguda no especificada', status: 'Registrado' },
  { id: 'DX-1002', patient: 'Carlos Pérez', date: '10 May 2026', code: 'E11.9', description: 'Diabetes mellitus tipo 2 sin complicaciones', status: 'Registrado' },
  { id: 'DX-1003', patient: 'Luis Rodríguez', date: '05 May 2026', code: 'I10', description: 'Hipertensión esencial (primaria)', status: 'Registrado' },
])
</script>

<template>
  <div class="max-w-7xl mx-auto w-full px-4 sm:px-0 font-sans">
    <div class="mb-8">
      <h1 class="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">Diagnósticos Clínicos Emitidos</h1>
      <p class="text-slate-500 dark:text-slate-400 mt-2 font-medium">Historial completo de los diagnósticos que has registrado a tus pacientes.</p>
    </div>

    <!-- Filtros (Mockup visual) -->
    <div class="flex flex-col sm:flex-row gap-4 mb-6">
      <div class="relative w-full sm:flex-1 sm:max-w-md">
        <PhMagnifyingGlass class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-400" />
        <input type="text" placeholder="Buscar por nombre o CIE-10..." class="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6DC7DC]/50 focus:border-[#418FC8] font-medium text-sm text-slate-700 dark:text-slate-200" />
      </div>
      <button class="w-full sm:w-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors">
        <PhFunnel class="h-5 w-5" />
        Filtrar
      </button>
    </div>

    <!-- Tabla -->
    <div class="bg-white dark:bg-slate-800  border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      <!-- Vista Móvil -->
      <div class="block lg:hidden divide-y divide-slate-100 dark:divide-slate-700">
        <div v-for="diag in diagnoses" :key="'mob-'+diag.id" class="p-5 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
          <div class="flex justify-between items-start mb-3">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-[#418FC8]/10 text-[#418FC8] flex items-center justify-center font-bold text-xs shrink-0">
                {{ diag.patient.charAt(0) }}
              </div>
              <div>
                <h3 class="font-bold text-slate-800 dark:text-white text-sm">{{ diag.patient }}</h3>
                <p class="text-xs text-slate-500 dark:text-slate-400">{{ diag.date }}</p>
              </div>
            </div>
            <span class="text-xs font-bold text-slate-400 dark:text-slate-400">#{{ diag.id.split('-')[1] }}</span>
          </div>
          <div class="mb-4 bg-slate-50 dark:bg-slate-700/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
            <div class="flex items-center gap-2 mb-1">
              <span class="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-bold px-2 py-0.5 rounded text-[10px] border border-indigo-200 dark:border-indigo-800">{{ diag.code }}</span>
            </div>
            <p class="text-sm font-medium text-slate-700 dark:text-slate-200">{{ diag.description }}</p>
          </div>
          <button class="w-full text-[#418FC8] font-bold hover:text-white bg-[#418FC8]/10 hover:bg-[#418FC8] py-2.5 rounded-xl text-sm transition-all text-center">
            Ver Detalles
          </button>
        </div>
      </div>

      <!-- Vista Desktop -->
      <div class="hidden lg:block overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr class="bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-xs font-extrabold uppercase tracking-widest">
              <th class="p-5">ID</th>
              <th class="p-5">Paciente</th>
              <th class="p-5">Fecha</th>
              <th class="p-5">Diagnóstico (CIE-10)</th>
              <th class="p-5 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
            <tr v-for="diag in diagnoses" :key="diag.id" class="hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors group">
              <td class="p-5 font-bold text-slate-500 dark:text-slate-400 text-sm">{{ diag.id }}</td>
              <td class="p-5 font-bold text-slate-800 dark:text-white flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-[#418FC8]/10 text-[#418FC8] flex items-center justify-center font-bold text-xs">
                  {{ diag.patient.charAt(0) }}
                </div>
                {{ diag.patient }}
              </td>
              <td class="p-5 text-slate-600 dark:text-slate-300 font-medium text-sm">{{ diag.date }}</td>
              <td class="p-5">
                <div class="flex items-center gap-2">
                  <span class="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-bold px-2 py-0.5 rounded text-xs border border-indigo-200 dark:border-indigo-800">{{ diag.code }}</span>
                  <span class="text-sm font-medium text-slate-700 dark:text-slate-200">{{ diag.description }}</span>
                </div>
              </td>
              <td class="p-5 text-right">
                <button class="text-[#418FC8] font-bold hover:text-white bg-[#418FC8]/10 hover:bg-[#418FC8] px-4 py-2 rounded-lg text-sm transition-all shadow-sm hover:shadow-[#418FC8]/20">
                  Ver Detalles
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="p-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
        Mostrando 3 de 3 diagnósticos
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-sans {
  font-family: 'Inter', 'Poppins', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
</style>
