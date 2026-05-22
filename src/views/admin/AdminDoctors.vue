<script setup lang="ts">
import { ref } from 'vue'

const doctors = ref([
  { id: 'MED-01', name: 'Dr. Roberto Mendoza', specialty: 'Cardiología', sede: 'Miraflores', status: 'active' },
  { id: 'MED-02', name: 'Dra. Patricia Vargas', specialty: 'Dermatología', sede: 'San Isidro', status: 'active' },
  { id: 'MED-03', name: 'Dr. Jorge Castro', specialty: 'Pediatría', sede: 'Surco', status: 'inactive' },
])
</script>

<template>
  <div class="max-w-7xl mx-auto w-full px-4 sm:px-0 font-sans">
    <div class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight">Gestor de Doctores</h1>
        <p class="text-slate-500 mt-2 font-medium">Administra al personal médico de todas las sedes.</p>
      </div>
      <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-blue-200 flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        Añadir Nuevo Médico
      </button>
    </div>

    <!-- Filtros -->
    <div class="flex gap-4 mb-6">
      <div class="relative flex-1 max-w-md">
        <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <input type="text" placeholder="Buscar médico por nombre o especialidad..." class="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-sm text-slate-700" />
      </div>
    </div>

    <!-- Tabla -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-extrabold uppercase tracking-widest">
              <th class="p-5">ID Médico</th>
              <th class="p-5">Nombre Completo</th>
              <th class="p-5">Especialidad</th>
              <th class="p-5">Sede Asignada</th>
              <th class="p-5 text-center">Estado</th>
              <th class="p-5 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="doc in doctors" :key="doc.id" class="hover:bg-slate-50 transition-colors">
              <td class="p-5 font-bold text-slate-500 text-sm">{{ doc.id }}</td>
              <td class="p-5 font-bold text-slate-800">{{ doc.name }}</td>
              <td class="p-5 text-blue-600 font-bold text-sm">{{ doc.specialty }}</td>
              <td class="p-5 text-slate-600 font-medium text-sm">{{ doc.sede }}</td>
              <td class="p-5 text-center">
                <span class="px-3 py-1 text-xs font-bold rounded-full border" :class="doc.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'">
                  {{ doc.status === 'active' ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td class="p-5 text-right">
                <button class="text-blue-600 font-bold hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm transition-colors">
                  Editar Perfil
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
