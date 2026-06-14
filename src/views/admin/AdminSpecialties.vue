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
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight">Especialidades Médicas</h1>
        <p class="text-slate-500 mt-2 font-medium">Catálogo de especialidades disponibles en la clínica.</p>
      </div>
      <button class="w-full sm:w-auto bg-gradient-to-r from-[#418FC8] to-[#6DC7DC] hover:opacity-90 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-[#418FC8]/30 hover:shadow-xl hover:-translate-y-0.5">
        Nueva Especialidad
      </button>
    </div>

    <!-- Contenedor Principal -->
    <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden transition-colors">
      
      <!-- Vista Móvil (Tarjetas) -->
      <div class="block sm:hidden divide-y divide-slate-100">
        <div v-for="spec in specialties" :key="'mob-'+spec.id" class="p-5 hover:bg-slate-50 transition-colors">
          <h3 class="font-bold text-slate-800 text-base mb-2">{{ spec.name }}</h3>
          <p class="text-slate-500 text-sm mb-4 leading-relaxed">{{ spec.description }}</p>
          <button class="w-full text-[#418FC8] font-bold hover:text-white bg-[#418FC8]/10 hover:bg-[#418FC8] py-2.5 rounded-xl text-sm transition-colors text-center">
            Editar
          </button>
        </div>
      </div>

      <!-- Vista Desktop (Tabla) -->
      <div class="hidden sm:block overflow-x-auto custom-scrollbar">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50/50 border-b border-slate-200">
              <th class="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider w-1/3">Nombre</th>
              <th class="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Descripción</th>
              <th class="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="spec in specialties" :key="spec.id" class="hover:bg-slate-50/50 transition-colors">
              <td class="p-5 font-bold text-slate-800">{{ spec.name }}</td>
              <td class="p-5 text-slate-600 text-sm leading-relaxed">{{ spec.description }}</td>
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
