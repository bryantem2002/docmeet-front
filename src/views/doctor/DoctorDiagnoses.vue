<script setup lang="ts">
import { ref } from 'vue'

const diagnoses = ref([
  { id: 'DX-1001', patient: 'Ana Gómez', date: '12 May 2026', code: 'J02.9', description: 'Faringitis aguda no especificada', status: 'Registrado' },
  { id: 'DX-1002', patient: 'Carlos Pérez', date: '10 May 2026', code: 'E11.9', description: 'Diabetes mellitus tipo 2 sin complicaciones', status: 'Registrado' },
  { id: 'DX-1003', patient: 'Luis Rodríguez', date: '05 May 2026', code: 'I10', description: 'Hipertensión esencial (primaria)', status: 'Registrado' },
])
</script>

<template>
  <div class="max-w-7xl mx-auto w-full px-4 sm:px-0 font-sans">
    <div class="mb-8">
      <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight">Diagnósticos Clínicos Emitidos</h1>
      <p class="text-slate-500 mt-2 font-medium">Historial completo de los diagnósticos que has registrado a tus pacientes.</p>
    </div>

    <!-- Filtros (Mockup visual) -->
    <div class="flex gap-4 mb-6">
      <div class="relative flex-1 max-w-md">
        <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <input type="text" placeholder="Buscar por nombre o CIE-10..." class="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-sm text-slate-700" />
      </div>
      <button class="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold py-3 px-6 rounded-xl flex items-center gap-2 text-sm transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
        Filtrar
      </button>
    </div>

    <!-- Tabla -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-extrabold uppercase tracking-widest">
              <th class="p-5">ID</th>
              <th class="p-5">Paciente</th>
              <th class="p-5">Fecha</th>
              <th class="p-5">Diagnóstico (CIE-10)</th>
              <th class="p-5 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="diag in diagnoses" :key="diag.id" class="hover:bg-blue-50/50 transition-colors group">
              <td class="p-5 font-bold text-slate-500 text-sm">{{ diag.id }}</td>
              <td class="p-5 font-bold text-slate-800 flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                  {{ diag.patient.charAt(0) }}
                </div>
                {{ diag.patient }}
              </td>
              <td class="p-5 text-slate-600 font-medium text-sm">{{ diag.date }}</td>
              <td class="p-5">
                <div class="flex items-center gap-2">
                  <span class="bg-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded text-xs border border-indigo-200">{{ diag.code }}</span>
                  <span class="text-sm font-medium text-slate-700">{{ diag.description }}</span>
                </div>
              </td>
              <td class="p-5 text-right">
                <button class="text-blue-600 font-bold hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                  Ver Detalles
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="p-4 border-t border-slate-100 bg-slate-50 text-center text-sm font-medium text-slate-500">
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
