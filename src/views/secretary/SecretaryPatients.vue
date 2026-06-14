<script setup lang="ts">
import { ref } from 'vue'

const patients = ref([
  { id: '1', name: 'Juan Pérez', dni: '72345678', phone: '987654321', email: 'juan@example.com' },
  { id: '2', name: 'María García', dni: '73456789', phone: '987123456', email: 'maria@example.com' }
])
</script>

<template>
  <div class="max-w-7xl mx-auto w-full px-4 sm:px-0 font-sans">
    <div class="mb-8 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight">Pacientes</h1>
        <p class="text-slate-500 mt-2 font-medium">Registro y gestión de pacientes del sistema.</p>
      </div>
      <button class="bg-[var(--color-doc-blue-600)] hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
        Registrar Paciente
      </button>
    </div>

    <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <table class="w-full text-left text-sm text-slate-600">
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
              <button class="text-[var(--color-doc-blue-600)] hover:text-blue-800 font-medium text-sm">Editar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
