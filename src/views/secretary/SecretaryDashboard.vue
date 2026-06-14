<script setup lang="ts">
import { ref } from 'vue'

const metrics = ref({
  appointmentsToday: 12,
  pendingPayments: 5,
  newPatients: 3
})
</script>

<template>
  <div class="max-w-7xl mx-auto w-full px-4 sm:px-0 font-sans">
    <div class="mb-8">
      <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight">Panel de Secretaria</h1>
      <p class="text-slate-500 mt-2 font-medium">Gestión de citas, pacientes y pagos del día.</p>
    </div>

    <!-- KPIs -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group">
        <p class="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Citas Hoy</p>
        <p class="text-3xl font-black text-[#3E90C8]">{{ metrics.appointmentsToday }}</p>
      </div>
      <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group">
        <p class="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Pacientes Nuevos</p>
        <p class="text-3xl font-black text-[#70C6DC]">{{ metrics.newPatients }}</p>
      </div>
      <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group">
        <p class="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Pagos Pendientes</p>
        <p class="text-3xl font-black text-amber-500">{{ metrics.pendingPayments }}</p>
      </div>
    </div>
  </div>
</template>
