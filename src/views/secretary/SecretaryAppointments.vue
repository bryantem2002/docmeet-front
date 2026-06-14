<script setup lang="ts">
import { ref } from 'vue'

const appointments = ref([
  { id: '1', date: '15 Oct 2026', time: '10:00 AM', patient: 'Juan Pérez', doctor: 'Dr. Gregory House', status: 'Programada' },
  { id: '2', date: '15 Oct 2026', time: '11:30 AM', patient: 'María García', doctor: 'Dr. Gregory House', status: 'En Espera' }
])
</script>

<template>
  <div class="max-w-7xl mx-auto w-full px-4 sm:px-0 font-sans">
    <div class="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight">Citas Médicas</h1>
        <p class="text-slate-500 mt-2 font-medium">Gestión de agenda y citas de pacientes.</p>
      </div>
      <button class="bg-gradient-to-r from-[#418FC8] to-[#6DC7DC] hover:opacity-90 text-white px-4 py-2 rounded-lg font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
        Agendar Cita
      </button>
    </div>

    <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <!-- Vista Móvil -->
      <div class="block md:hidden divide-y divide-slate-100">
        <div v-for="app in appointments" :key="'mob-'+app.id" class="p-5 hover:bg-slate-50 transition-colors">
          <div class="flex justify-between items-start mb-3">
            <div>
              <p class="text-xs text-slate-500 font-medium mb-1">{{ app.date }} - {{ app.time }}</p>
              <h3 class="font-bold text-slate-800 text-base">{{ app.patient }}</h3>
              <p class="text-xs text-slate-500 mt-0.5">{{ app.doctor }}</p>
            </div>
            <span class="bg-[#418FC8]/10 text-[#418FC8] px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">{{ app.status }}</span>
          </div>
          <button class="w-full text-[#418FC8] hover:text-white bg-[#418FC8]/10 hover:bg-[#418FC8] py-2.5 rounded-xl text-sm font-bold transition-all text-center mt-2">
            Gestionar
          </button>
        </div>
      </div>

      <!-- Vista Desktop -->
      <div class="hidden md:block overflow-x-auto">
        <table class="w-full text-left text-sm text-slate-600 min-w-[600px]">
        <thead class="bg-slate-50 text-slate-500 font-medium">
          <tr>
            <th class="px-6 py-4">Fecha</th>
            <th class="px-6 py-4">Hora</th>
            <th class="px-6 py-4">Paciente</th>
            <th class="px-6 py-4">Médico</th>
            <th class="px-6 py-4">Estado</th>
            <th class="px-6 py-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="app in appointments" :key="app.id" class="hover:bg-slate-50/50 transition-colors">
            <td class="px-6 py-4 font-bold text-slate-800">{{ app.date }}</td>
            <td class="px-6 py-4">{{ app.time }}</td>
            <td class="px-6 py-4">{{ app.patient }}</td>
            <td class="px-6 py-4">{{ app.doctor }}</td>
            <td class="px-6 py-4">
              <span class="bg-[#418FC8]/10 text-[#418FC8] px-2 py-1 rounded text-xs font-bold">{{ app.status }}</span>
            </td>
            <td class="px-6 py-4 text-right">
              <button class="text-[#418FC8] hover:text-white bg-[#418FC8]/10 hover:bg-[#418FC8] px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm hover:shadow-md">Gestionar</button>
            </td>
          </tr>
        </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
