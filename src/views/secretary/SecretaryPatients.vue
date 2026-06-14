<script setup lang="ts">
import { ref } from 'vue'

const patients = ref([
  { id: '1', name: 'Juan Pérez', dni: '72345678', phone: '987654321', email: 'juan@example.com' },
  { id: '2', name: 'María García', dni: '73456789', phone: '987123456', email: 'maria@example.com' }
])
</script>

<template>
  <div class="max-w-7xl mx-auto w-full px-4 sm:px-0 font-sans">
    <div class="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight">Pacientes</h1>
        <p class="text-slate-500 mt-2 font-medium">Registro y gestión de pacientes del sistema.</p>
      </div>
      <button class="bg-gradient-to-r from-[#418FC8] to-[#6DC7DC] hover:opacity-90 text-white px-4 py-2 rounded-lg font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
        Registrar Paciente
      </button>
    </div>

    <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <!-- Vista Móvil -->
      <div class="block md:hidden divide-y divide-slate-100">
        <div v-for="patient in patients" :key="'mob-'+patient.id" class="p-5 hover:bg-slate-50 transition-colors">
          <div class="flex justify-between items-start mb-3">
            <div>
              <h3 class="font-bold text-slate-800 text-base">{{ patient.name }}</h3>
              <p class="text-xs text-slate-500 mt-0.5">DNI: <span class="font-bold text-slate-700">{{ patient.dni }}</span></p>
              <p class="text-xs text-slate-500 mt-0.5">Tel: <span class="font-medium text-slate-700">{{ patient.phone }}</span></p>
              <p class="text-xs text-slate-500 mt-0.5">{{ patient.email }}</p>
            </div>
          </div>
          <button class="w-full text-[#418FC8] hover:text-white bg-[#418FC8]/10 hover:bg-[#418FC8] py-2.5 rounded-xl text-sm font-bold transition-all text-center mt-2">
            Editar
          </button>
        </div>
      </div>

      <!-- Vista Desktop -->
      <div class="hidden md:block overflow-x-auto">
        <table class="w-full text-left text-sm text-slate-600 min-w-[600px]">
        <thead class="bg-slate-50 text-slate-500 font-medium">
          <tr>
            <th class="px-6 py-4">Nombre Completo</th>
            <th class="px-6 py-4">DNI</th>
            <th class="px-6 py-4">Teléfono</th>
            <th class="px-6 py-4">Email</th>
            <th class="px-6 py-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="patient in patients" :key="patient.id" class="hover:bg-slate-50/50 transition-colors">
            <td class="px-6 py-4 font-bold text-slate-800">{{ patient.name }}</td>
            <td class="px-6 py-4">{{ patient.dni }}</td>
            <td class="px-6 py-4">{{ patient.phone }}</td>
            <td class="px-6 py-4">{{ patient.email }}</td>
            <td class="px-6 py-4 text-right">
              <button class="text-[#418FC8] hover:text-white bg-[#418FC8]/10 hover:bg-[#418FC8] px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm hover:shadow-md">Editar</button>
            </td>
          </tr>
        </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
