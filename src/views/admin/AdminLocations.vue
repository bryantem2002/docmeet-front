<script setup lang="ts">
import { ref } from 'vue'
import { PhPlus, PhMapPin } from '@phosphor-icons/vue'

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
      <button class="bg-gradient-to-r from-[#418FC8] to-[#6DC7DC] hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-[#418FC8]/30 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2">
        <PhPlus class="h-5 w-5" weight="bold" />
        Añadir Nueva Sede
      </button>
    </div>

    <!-- Contenedor Principal -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-8 transition-colors">
      
      <!-- Vista Móvil (Tarjetas) -->
      <div class="block sm:hidden divide-y divide-slate-100">
        <div v-for="sede in locations" :key="'mob-'+sede.id" class="p-5 hover:bg-slate-50 transition-colors">
          <div class="flex justify-between items-start mb-3">
            <div class="flex items-center gap-2">
              <PhMapPin class="h-5 w-5 text-blue-500 shrink-0" />
              <div>
                <h3 class="font-bold text-slate-800 text-base">{{ sede.name }}</h3>
                <p class="text-xs font-bold text-slate-400 mt-0.5">{{ sede.id }}</p>
              </div>
            </div>
            <span class="px-2.5 py-1 text-[10px] font-bold rounded-full border shrink-0" :class="sede.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'">
              {{ sede.status === 'active' ? 'Activo' : 'Inactivo' }}
            </span>
          </div>
          <div class="flex flex-col gap-1.5 mb-4 text-sm pl-7">
            <div class="flex flex-col">
              <span class="text-slate-500 text-xs">Dirección:</span>
              <span class="font-medium text-slate-700 leading-tight mt-0.5">{{ sede.address }}</span>
            </div>
            <div class="flex justify-between mt-1">
              <span class="text-slate-500">Teléfono:</span>
              <span class="font-bold text-[#418FC8]">{{ sede.phone }}</span>
            </div>
          </div>
          <button class="w-full text-[#418FC8] font-bold hover:text-white bg-[#418FC8]/10 hover:bg-[#418FC8] py-2.5 rounded-xl text-sm transition-colors text-center">
            Editar
          </button>
        </div>
      </div>

      <!-- Vista Desktop (Tabla) -->
      <div class="hidden sm:block overflow-x-auto custom-scrollbar">
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
                <PhMapPin class="h-5 w-5 text-blue-500" />
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
