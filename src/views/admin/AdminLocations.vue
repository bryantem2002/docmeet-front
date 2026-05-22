<script setup lang="ts">
import { ref } from 'vue'

const locations = ref([
  { id: 'SED-01', name: 'Sede Miraflores', address: 'Av. Pardo 123', phone: '01 456-7890', status: 'active' },
  { id: 'SED-02', name: 'Sede San Isidro', address: 'Av. Javier Prado Este 456', phone: '01 456-7891', status: 'active' },
  { id: 'SED-03', name: 'Sede Surco', address: 'Av. Benavides 789', phone: '01 456-7892', status: 'active' },
])
</script>

<template>
  <div class="max-w-7xl mx-auto w-full px-4 sm:px-0 font-sans">
    <div class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight">Gestor de Sedes</h1>
        <p class="text-slate-500 mt-2 font-medium">Administra las ubicaciones físicas de la clínica.</p>
      </div>
      <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-blue-200 flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        Añadir Nueva Sede
      </button>
    </div>

    <!-- Tabla -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-8">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-extrabold uppercase tracking-widest">
              <th class="p-5">ID Sede</th>
              <th class="p-5">Nombre</th>
              <th class="p-5">Dirección</th>
              <th class="p-5">Teléfono</th>
              <th class="p-5 text-center">Estado</th>
              <th class="p-5 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="sede in locations" :key="sede.id" class="hover:bg-slate-50 transition-colors">
              <td class="p-5 font-bold text-slate-500 text-sm">{{ sede.id }}</td>
              <td class="p-5 font-bold text-slate-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                {{ sede.name }}
              </td>
              <td class="p-5 text-slate-600 font-medium text-sm">{{ sede.address }}</td>
              <td class="p-5 text-slate-600 font-medium text-sm">{{ sede.phone }}</td>
              <td class="p-5 text-center">
                <span class="px-3 py-1 text-xs font-bold rounded-full border" :class="sede.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'">
                  {{ sede.status === 'active' ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td class="p-5 text-right">
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
