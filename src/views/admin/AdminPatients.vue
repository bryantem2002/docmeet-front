<script setup lang="ts">
import { ref } from 'vue'
import { PhPlus, PhMagnifyingGlass, PhCheckCircle, PhProhibit, PhPhone, PhFunnel } from '@phosphor-icons/vue'

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
        <h1 class="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">Gestor de Pacientes</h1>
        <p class="text-slate-500 dark:text-slate-400 mt-2 font-medium">Visualiza y administra todas las cuentas de pacientes a nivel global.</p>
      </div>
      <button class="bg-gradient-to-r from-[#418FC8] to-[#6DC7DC] hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-[#418FC8]/30 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2">
        <PhPlus class="h-5 w-5" weight="bold" />
        Registrar Paciente
      </button>
    </div>

    <!-- Filtros y Búsqueda -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm mb-6 flex flex-col sm:flex-row gap-4 justify-between transition-colors">
      <div class="relative max-w-md w-full">
        <PhMagnifyingGlass class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-400" />
        <input 
          type="text" 
          placeholder="Buscar por nombre, correo o DNI..." 
          class="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6DC7DC]/50 focus:border-[#418FC8] transition-all"
        />
      </div>
      <div class="flex gap-2">
        <button class="px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors flex items-center gap-2">
          <PhFunnel class="h-4 w-4" /> Filtros
        </button>
      </div>
    </div>

    <!-- Contenedor Principal -->
    <div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden transition-colors">
      
      <!-- Vista Móvil (Tarjetas) -->
      <div class="block sm:hidden divide-y divide-slate-100 dark:divide-slate-700">
        <div v-for="pac in patients" :key="'mob-'+pac.id" class="p-5 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
          <div class="flex justify-between items-start mb-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-[#418FC8]/10 text-[#418FC8] flex items-center justify-center font-bold text-sm shrink-0">
                {{ pac.name.charAt(0) }}
              </div>
              <div>
                <h3 class="font-bold text-slate-800 dark:text-white text-base">{{ pac.name }}</h3>
                <p class="text-xs font-bold text-slate-400 dark:text-slate-400 mt-0.5">{{ pac.id }}</p>
              </div>
            </div>
            <span class="px-2.5 py-1 text-[10px] font-bold rounded-full border shrink-0" :class="pac.status === 'active' ? 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' : 'bg-slate-100 dark:bg-slate-600 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'">
              {{ pac.status === 'active' ? 'Activo' : 'Inactivo' }}
            </span>
          </div>
          <div class="flex flex-col gap-1.5 mb-4 text-sm">
            <div class="flex justify-between">
              <span class="text-slate-500 dark:text-slate-400">Teléfono:</span>
              <span class="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1"><PhPhone class="text-slate-400 dark:text-slate-400" /> {{ pac.phone }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500 dark:text-slate-400">Última Cita:</span>
              <span class="font-medium text-slate-700 dark:text-slate-200">{{ pac.lastVisit }}</span>
            </div>
          </div>
          <button class="w-full text-[#418FC8] font-bold hover:text-white bg-[#418FC8]/10 hover:bg-[#418FC8] py-2.5 rounded-xl text-sm transition-colors text-center">
            Ver Detalles
          </button>
        </div>
      </div>

      <!-- Vista Desktop (Tabla) -->
      <div class="hidden sm:block overflow-x-auto custom-scrollbar">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
              <th class="p-5 text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">Paciente</th>
              <th class="p-5 text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">Contacto</th>
              <th class="p-5 text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">Última Cita</th>
              <th class="p-5 text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider text-center">Estado</th>
              <th class="p-5 text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider text-right">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
            <tr v-for="pac in patients" :key="pac.id" class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
              <td class="p-5 font-bold text-slate-800 dark:text-white flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-[#418FC8]/10 text-[#418FC8] flex items-center justify-center font-bold text-xs">
                  {{ pac.name.charAt(0) }}
                </div>
                <div>
                  <p class="text-sm">{{ pac.name }}</p>
                  <p class="text-xs text-slate-400 dark:text-slate-400 font-medium mt-0.5">{{ pac.id }}</p>
                </div>
              </td>
              <td class="p-5 text-slate-500 dark:text-slate-400 font-medium text-sm">
                <span class="flex items-center gap-1"><PhPhone class="text-slate-400 dark:text-slate-400" /> {{ pac.phone }}</span>
              </td>
              <td class="p-5 text-slate-500 dark:text-slate-400 font-medium text-sm">{{ pac.lastVisit }}</td>
              <td class="p-5 text-center">
                <span 
                  class="px-3 py-1 text-xs font-bold rounded-full border"
                  :class="pac.status === 'active' ? 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' : 'bg-slate-100 dark:bg-slate-600 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'"
                >
                  {{ pac.status === 'active' ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td class="p-5 text-right flex justify-end gap-2">
                <button @click="toggleStatus(pac)" class="text-slate-500 dark:text-slate-400 hover:text-amber-600 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-amber-50 px-3 py-2 rounded-lg text-sm transition-colors" :title="pac.status === 'active' ? 'Desactivar cuenta' : 'Activar cuenta'">
                  <PhCheckCircle v-if="pac.status === 'active'" class="h-4 w-4" weight="bold" />
                  <PhProhibit v-else class="h-4 w-4" weight="bold" />
                </button>
                <button class="text-[#418FC8] font-bold hover:text-white bg-[#418FC8]/10 hover:bg-[#418FC8] px-4 py-2 rounded-lg text-sm transition-all shadow-sm hover:shadow-[#418FC8]/20">
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
