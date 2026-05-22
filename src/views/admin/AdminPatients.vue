<script setup lang="ts">
import { ref } from 'vue'

const patients = ref([
  { id: 'PAC-001', name: 'Carlos Pérez', dni: '74839210', sede: 'Miraflores', date: '10 May 2026', status: 'active' },
  { id: 'PAC-002', name: 'Ana Gómez', dni: '45637281', sede: 'San Isidro', date: '12 May 2026', status: 'active' },
  { id: 'PAC-003', name: 'Luis Rodríguez', dni: '09384726', sede: 'Miraflores', date: '15 May 2026', status: 'inactive' },
  { id: 'PAC-004', name: 'María Flores', dni: '72836412', sede: 'Surco', date: '18 May 2026', status: 'active' }
])

const toggleStatus = (patient: any) => {
  patient.status = patient.status === 'active' ? 'inactive' : 'active'
}
</script>

<template>
  <div class="max-w-7xl mx-auto w-full px-4 sm:px-0 font-sans">
    <div class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight">Gestor de Pacientes</h1>
        <p class="text-slate-500 mt-2 font-medium">Visualiza y administra todas las cuentas de pacientes a nivel global.</p>
      </div>
      <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-blue-200 flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        Registrar Paciente
      </button>
    </div>

    <!-- Filtros Búsqueda -->
    <div class="flex gap-4 mb-6">
      <div class="relative flex-1 max-w-md">
        <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <input type="text" placeholder="Buscar por nombres, DNI o ID..." class="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-sm text-slate-700" />
      </div>
      <select class="bg-white border border-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="">Todas las sedes</option>
        <option value="Miraflores">Miraflores</option>
        <option value="San Isidro">San Isidro</option>
        <option value="Surco">Surco</option>
      </select>
    </div>

    <!-- Tabla de Pacientes -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-extrabold uppercase tracking-widest">
              <th class="p-5">ID / DNI</th>
              <th class="p-5">Paciente</th>
              <th class="p-5">Sede Base</th>
              <th class="p-5">Última Cita</th>
              <th class="p-5 text-center">Estado</th>
              <th class="p-5 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="pac in patients" :key="pac.id" class="hover:bg-slate-50 transition-colors">
              <td class="p-5">
                <p class="font-bold text-slate-800 text-sm">{{ pac.dni }}</p>
                <p class="text-xs text-slate-400 font-medium mt-0.5">{{ pac.id }}</p>
              </td>
              <td class="p-5 font-bold text-slate-800 flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                  {{ pac.name.charAt(0) }}
                </div>
                {{ pac.name }}
              </td>
              <td class="p-5 text-slate-600 font-medium text-sm">{{ pac.sede }}</td>
              <td class="p-5 text-slate-600 font-medium text-sm">{{ pac.date }}</td>
              <td class="p-5 text-center">
                <span 
                  class="px-3 py-1 text-xs font-bold rounded-full border"
                  :class="pac.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'"
                >
                  {{ pac.status === 'active' ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td class="p-5 text-right flex justify-end gap-2">
                <button @click="toggleStatus(pac)" class="text-slate-500 hover:text-amber-600 bg-white border border-slate-200 hover:bg-amber-50 px-3 py-2 rounded-lg text-sm transition-colors" :title="pac.status === 'active' ? 'Desactivar cuenta' : 'Activar cuenta'">
                  <svg v-if="pac.status === 'active'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                </button>
                <button class="text-blue-600 font-bold hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm transition-colors">
                  Editar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-sans {
  font-family: 'Inter', 'Poppins', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
</style>
