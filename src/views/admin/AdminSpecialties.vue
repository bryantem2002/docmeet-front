<script setup lang="ts">
import { ref } from 'vue'

const specialties = ref([
  { id: '1', name: 'Cardiología', description: 'Especialidad médica que se ocupa de las afecciones del corazón y del aparato circulatorio.' },
  { id: '2', name: 'Pediatría', description: 'Parte de la medicina que se ocupa del estudio del crecimiento y el desarrollo de los niños.' },
  { id: '3', name: 'Dermatología', description: 'Trata las enfermedades de la piel.' }
])
</script>

<template>
  <div class="max-w-7xl mx-auto w-full px-4 sm:px-0 font-sans">
    <div class="mb-8 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight">Especialidades Médicas</h1>
        <p class="text-slate-500 mt-2 font-medium">Catálogo de especialidades disponibles en la clínica.</p>
      </div>
      <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
        Nueva Especialidad
      </button>
    </div>

    <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <table class="w-full text-left text-sm text-slate-600">
        <thead class="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
          <tr>
            <th class="px-6 py-4 w-1/3">Nombre</th>
            <th class="px-6 py-4">Descripción</th>
            <th class="px-6 py-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="spec in specialties" :key="spec.id" class="hover:bg-slate-50/50 transition-colors">
            <td class="px-6 py-4 font-bold text-slate-800">{{ spec.name }}</td>
            <td class="px-6 py-4">{{ spec.description }}</td>
            <td class="px-6 py-4 text-right">
              <button class="text-purple-600 hover:text-purple-800 font-medium text-sm">Editar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
