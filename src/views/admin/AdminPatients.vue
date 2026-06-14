<script setup lang="ts">
import { ref } from 'vue'
import { PhPlus, PhMagnifyingGlass, PhCheckCircle, PhProhibit } from '@phosphor-icons/vue'

const patients = ref([
  { id: 'PAC-001', name: 'Carlos Pérez', dni: '74839210', phone: '987654321', lastVisit: '10 May 2026', sede: 'Miraflores', date: '10 May 2026', status: 'active' },
  { id: 'PAC-002', name: 'Ana Gómez', dni: '45637281', phone: '912345678', lastVisit: '12 May 2026', sede: 'San Isidro', date: '12 May 2026', status: 'active' },
  { id: 'PAC-003', name: 'Luis Rodríguez', dni: '09384726', phone: '999888777', lastVisit: '15 May 2026', sede: 'Miraflores', date: '15 May 2026', status: 'inactive' },
  { id: 'PAC-004', name: 'María Flores', dni: '72836412', phone: '921123456', lastVisit: '18 May 2026', sede: 'Surco', date: '18 May 2026', status: 'active' }
])

const toggleStatus = (patient: any) => {
  patient.status = patient.status === 'active' ? 'inactive' : 'active'
}
</script>

<template>
  <div class="max-w-7xl mx-auto w-full px-4 sm:px-0 font-sans">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight">Gestor de Pacientes</h1>
        <p class="text-slate-500 mt-2 font-medium">Visualiza y administra todas las cuentas de pacientes a nivel global.</p>
      </div>
      <button class="bg-[#3E90C8] hover:bg-[#2d7ab5] text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-[#3E90C8]/20 flex items-center justify-center gap-2">
        <PhPlus class="h-5 w-5" weight="bold" />
        Registrar Paciente
      </button>
    </div>

    <!-- Filtros y Búsqueda -->
    <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row gap-4 justify-between transition-colors">
      <div class="relative max-w-md w-full">
        <PhMagnifyingGlass class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input 
          type="text" 
          placeholder="Buscar por nombre, correo o DNI..." 
          class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3E90C8]/50 focus:border-[#3E90C8] transition-all"
        />
      </div>
      <div class="flex gap-2">
        <button class="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-2">
          <PhFunnel class="h-4 w-4" /> Filtros
        </button>
      </div>
    </div>

    <!-- Tabla -->
    <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden transition-colors">
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50/50 border-b border-slate-200">
              <th class="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Paciente</th>
              <th class="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Contacto</th>
              <th class="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Última Cita</th>
              <th class="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Estado</th>
              <th class="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="pac in patients" :key="pac.id" class="hover:bg-slate-50/50 transition-colors">
              <td class="p-5 font-bold text-slate-800 flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-[#3E90C8]/10 text-[#3E90C8] flex items-center justify-center font-bold text-xs">
                  {{ pac.name.charAt(0) }}
                </div>
                <div>
                  <p class="text-sm">{{ pac.name }}</p>
                  <p class="text-xs text-slate-400 font-medium mt-0.5">{{ pac.id }}</p>
                </div>
              </td>
              <td class="p-5 text-slate-500 font-medium text-sm">
                <span class="flex items-center gap-1"><PhPhone class="text-slate-400" /> {{ pac.phone }}</span>
              </td>
              <td class="p-5 text-slate-500 font-medium text-sm">{{ pac.lastVisit }}</td>
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
                  <PhCheckCircle v-if="pac.status === 'active'" class="h-4 w-4" weight="bold" />
                  <PhProhibit v-else class="h-4 w-4" weight="bold" />
                </button>
                <button class="text-[#3E90C8] font-bold hover:text-[#2d7ab5] bg-[#3E90C8]/10 hover:bg-[#3E90C8]/20 px-4 py-2 rounded-lg text-sm transition-colors">
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
