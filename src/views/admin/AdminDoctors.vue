<script setup lang="ts">
import { ref } from 'vue'
import { PhPlus, PhMagnifyingGlass } from '@phosphor-icons/vue'

const doctors = ref([
  { id: 'MED-01', name: 'Dr. Roberto Mendoza', specialty: 'Cardiología', sede: 'Miraflores', status: 'active' },
  { id: 'MED-02', name: 'Dra. Patricia Vargas', specialty: 'Dermatología', sede: 'San Isidro', status: 'active' },
  { id: 'MED-03', name: 'Dr. Jorge Castro', specialty: 'Pediatría', sede: 'Surco', status: 'inactive' },
])
</script>

<template>
  <div class="max-w-7xl mx-auto w-full px-4 sm:px-0 font-sans">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight">Gestor de Doctores</h1>
        <p class="text-slate-500 mt-2 font-medium">Administra al personal médico de todas las sedes.</p>
      </div>
      <button class="bg-gradient-to-r from-[#418FC8] to-[#6DC7DC] hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-[#418FC8]/30 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2">
        <PhPlus class="h-5 w-5" weight="bold" />
        Añadir Nuevo Médico
      </button>
    </div>

    <!-- Filtros -->
    <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row gap-4 justify-between transition-colors">
      <div class="relative max-w-md w-full">
        <PhMagnifyingGlass class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input 
          type="text" 
          placeholder="Buscar doctor..." 
          class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6DC7DC]/50 focus:border-[#418FC8] transition-all"
        />
      </div>
    </div>

    <!-- Contenedor Principal -->
    <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden transition-colors">
      
      <!-- Vista Móvil (Tarjetas) -->
      <div class="block sm:hidden divide-y divide-slate-100">
        <div v-for="doc in doctors" :key="'mob-'+doc.id" class="p-5 hover:bg-slate-50 transition-colors">
          <div class="flex justify-between items-start mb-3">
            <div>
              <h3 class="font-bold text-slate-800 text-base">{{ doc.name }}</h3>
              <p class="text-xs font-bold text-slate-400 mt-0.5">{{ doc.id }}</p>
            </div>
            <span class="px-2.5 py-1 text-[10px] font-bold rounded-full border" :class="doc.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'">
              {{ doc.status === 'active' ? 'Activo' : 'Vacaciones' }}
            </span>
          </div>
          <div class="flex flex-col gap-1.5 mb-4 text-sm">
            <div class="flex justify-between">
              <span class="text-slate-500">Especialidad:</span>
              <span class="font-bold text-[#418FC8]">{{ doc.specialty }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">Sede Base:</span>
              <span class="font-medium text-slate-700">{{ doc.sede }}</span>
            </div>
          </div>
          <button class="w-full text-[#418FC8] font-bold hover:text-white bg-[#418FC8]/10 hover:bg-[#418FC8] py-2.5 rounded-xl text-sm transition-colors text-center">
            Editar Perfil
          </button>
        </div>
      </div>

      <!-- Vista Desktop (Tabla) -->
      <div class="hidden sm:block overflow-x-auto custom-scrollbar">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50/50 border-b border-slate-200">
              <th class="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">CMP</th>
              <th class="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Nombre</th>
              <th class="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Especialidad</th>
              <th class="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Sede Base</th>
              <th class="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Estado</th>
              <th class="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="doc in doctors" :key="doc.id" class="hover:bg-slate-50/50 transition-colors">
              <td class="p-5 font-bold text-slate-500 text-sm">{{ doc.id }}</td>
              <td class="p-5 font-bold text-slate-800">{{ doc.name }}</td>
              <td class="p-5 text-[#418FC8] font-bold text-sm">{{ doc.specialty }}</td>
              <td class="p-5 text-slate-600 font-medium text-sm">{{ doc.sede }}</td>
              <td class="p-5 text-center">
                <span class="px-3 py-1 text-xs font-bold rounded-full border" :class="doc.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'">
                  {{ doc.status === 'active' ? 'Activo' : 'Vacaciones' }}
                </span>
              </td>
              <td class="p-5 text-right">
                <button class="text-[#418FC8] font-bold hover:text-white bg-[#418FC8]/10 hover:bg-[#418FC8] px-4 py-2 rounded-lg text-sm transition-all shadow-sm hover:shadow-[#418FC8]/20">
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
