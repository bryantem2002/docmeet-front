<script setup lang="ts">
import { ref } from 'vue'

const secretaries = ref([
  { 
    id: '1', 
    name: 'Ana Lopez', 
    dni: '12345678', 
    shift: 'Mañana', 
    clinic: 'Sede Principal', 
    doctorsAssigned: 2,
    active: true 
  },
  { 
    id: '2', 
    name: 'Carlos Mendoza', 
    dni: '87654321', 
    shift: 'Tarde', 
    clinic: 'Sede Norte', 
    doctorsAssigned: 1,
    active: true 
  }
])
</script>

<template>
  <div class="max-w-7xl mx-auto w-full px-4 sm:px-0 font-sans">
    <div class="mb-8 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight">Secretarias</h1>
        <p class="text-slate-500 mt-2 font-medium">Gestión del personal administrativo y asignación a médicos.</p>
      </div>
      <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
        Nueva Secretaria
      </button>
    </div>

    <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <table class="w-full text-left text-sm text-slate-600">
        <thead class="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
          <tr>
            <th class="px-6 py-4">Nombre Completo</th>
            <th class="px-6 py-4">Turno</th>
            <th class="px-6 py-4">Sede Asignada</th>
            <th class="px-6 py-4">Doctores Asignados</th>
            <th class="px-6 py-4">Estado</th>
            <th class="px-6 py-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="sec in secretaries" :key="sec.id" class="hover:bg-slate-50/50 transition-colors">
            <td class="px-6 py-4 font-bold text-slate-800">{{ sec.name }}</td>
            <td class="px-6 py-4">{{ sec.shift }}</td>
            <td class="px-6 py-4">{{ sec.clinic }}</td>
            <td class="px-6 py-4 text-center">
              <span class="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-bold">{{ sec.doctorsAssigned }}</span>
            </td>
            <td class="px-6 py-4">
              <span 
                class="px-2 py-1 rounded text-xs font-bold"
                :class="sec.active ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'"
              >
                {{ sec.active ? 'Activo' : 'Inactivo' }}
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <button class="text-purple-600 hover:text-purple-800 font-medium text-sm">Gestionar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
