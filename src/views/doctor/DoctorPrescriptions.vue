<script setup lang="ts">
import { ref } from 'vue'

const prescriptions = ref([
  { id: 'REC-2051', patient: 'Ana Gómez', date: '12 May 2026', items: 2, status: 'Vigente' },
  { id: 'REC-2050', patient: 'Carlos Pérez', date: '10 May 2026', items: 1, status: 'Vencida' },
  { id: 'REC-2049', patient: 'Luis Rodríguez', date: '05 May 2026', items: 3, status: 'Vencida' },
])
</script>

<template>
  <div class="max-w-7xl mx-auto w-full px-4 sm:px-0 font-sans">
    <div class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight">Recetas Generadas</h1>
        <p class="text-slate-500 mt-2 font-medium">Control y seguimiento de todas las recetas médicas emitidas por ti.</p>
      </div>
      <button class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-200 flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        Nueva Receta Libre
      </button>
    </div>

    <!-- Filtros (Mockup visual) -->
    <div class="flex gap-4 mb-6">
      <div class="relative flex-1 max-w-md">
        <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <input type="text" placeholder="Buscar por paciente o código de receta..." class="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-sm text-slate-700" />
      </div>
    </div>

    <!-- Tabla -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-extrabold uppercase tracking-widest">
              <th class="p-5">ID Receta</th>
              <th class="p-5">Paciente</th>
              <th class="p-5">Fecha Emisión</th>
              <th class="p-5">Medicamentos</th>
              <th class="p-5 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="rec in prescriptions" :key="rec.id" class="hover:bg-emerald-50/50 transition-colors group">
              <td class="p-5 font-bold text-slate-500 text-sm">
                <span class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  {{ rec.id }}
                </span>
              </td>
              <td class="p-5 font-bold text-slate-800">{{ rec.patient }}</td>
              <td class="p-5 text-slate-600 font-medium text-sm">{{ rec.date }}</td>
              <td class="p-5">
                <span class="bg-slate-100 text-slate-600 font-bold px-3 py-1 rounded-full text-xs border border-slate-200">
                  {{ rec.items }} items
                </span>
              </td>
              <td class="p-5 text-right flex justify-end gap-2">
                <button class="text-slate-500 hover:text-emerald-600 bg-white border border-slate-200 hover:bg-emerald-50 px-3 py-2 rounded-lg text-sm transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100" title="Imprimir Receta">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                </button>
                <button class="text-emerald-600 font-bold hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-lg text-sm transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                  Ver Receta
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="p-4 border-t border-slate-100 bg-slate-50 text-center text-sm font-medium text-slate-500">
        Mostrando 3 recetas emitidas
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-sans {
  font-family: 'Inter', 'Poppins', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
</style>
