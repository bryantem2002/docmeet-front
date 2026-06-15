<script setup lang="ts">
import { ref } from 'vue'
import { PhX } from '@phosphor-icons/vue'

const specialties = ref([
  { id: '1', name: 'Cardiología', description: 'Especialidad médica que se ocupa de las afecciones del corazón y del aparato circulatorio.' },
  { id: '2', name: 'Pediatría', description: 'Parte de la medicina que se ocupa del estudio del crecimiento y el desarrollo de los niños.' },
  { id: '3', name: 'Dermatología', description: 'Trata las enfermedades de la piel.' }
])

const showModal = ref(false)
const newSpecialty = ref({
  name: '',
  description: ''
})

function saveSpecialty() {
  if (!newSpecialty.value.name || !newSpecialty.value.description) return
  
  const nextId = String(specialties.value.length + 1)
  specialties.value.unshift({
    id: nextId,
    name: newSpecialty.value.name,
    description: newSpecialty.value.description
  })
  
  newSpecialty.value = { name: '', description: '' }
  showModal.value = false
}
</script>

<template>
  <div class="max-w-7xl mx-auto w-full px-4 sm:px-0 font-sans">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">Especialidades Médicas</h1>
        <p class="text-slate-500 dark:text-slate-400 mt-2 font-medium">Catálogo de especialidades disponibles en la clínica.</p>
      </div>
      <button @click="showModal = true" class="w-full sm:w-auto bg-gradient-to-r from-[#418FC8] to-[#6DC7DC] hover:opacity-90 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-[#418FC8]/30 hover:shadow-xl hover:-translate-y-0.5">
        Nueva Especialidad
      </button>
    </div>

    <!-- Contenedor Principal -->
    <div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden transition-colors">
      
      <!-- Vista Móvil (Tarjetas) -->
      <div class="block sm:hidden divide-y divide-slate-100 dark:divide-slate-700">
        <div v-for="spec in specialties" :key="'mob-'+spec.id" class="p-5 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
          <h3 class="font-bold text-slate-800 dark:text-white text-base mb-2">{{ spec.name }}</h3>
          <p class="text-slate-500 dark:text-slate-400 text-sm mb-4 leading-relaxed">{{ spec.description }}</p>
          <button class="w-full text-[#418FC8] font-bold hover:text-white bg-[#418FC8]/10 hover:bg-[#418FC8] py-2.5 rounded-xl text-sm transition-colors text-center">
            Editar
          </button>
        </div>
      </div>

      <!-- Vista Desktop (Tabla) -->
      <div class="hidden sm:block overflow-x-auto custom-scrollbar">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
              <th class="p-5 text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider w-1/3">Nombre</th>
              <th class="p-5 text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">Descripción</th>
              <th class="p-5 text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider text-right">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
            <tr v-for="spec in specialties" :key="spec.id" class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
              <td class="p-5 font-bold text-slate-800 dark:text-white">{{ spec.name }}</td>
              <td class="p-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{{ spec.description }}</td>
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

    <!-- Modal Añadir Especialidad -->
    <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="showModal = false"></div>
      
      <div class="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div class="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
          <h2 class="text-xl font-bold text-slate-800 dark:text-white">Nueva Especialidad</h2>
          <button @click="showModal = false" class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-50 dark:bg-slate-700 rounded-full transition-colors">
            <PhX class="w-5 h-5" />
          </button>
        </div>
        
        <form @submit.prevent="saveSpecialty" class="p-6 flex flex-col gap-5">
          <!-- Nombre -->
          <div>
            <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Nombre de la Especialidad</label>
            <input 
              v-model="newSpecialty.name"
              type="text" 
              required
              placeholder="Ej. Oftalmología" 
              class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6DC7DC]/50 focus:border-[#418FC8] transition-all"
            />
          </div>
          
          <!-- Descripción -->
          <div>
            <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Descripción</label>
            <textarea 
              v-model="newSpecialty.description"
              required
              rows="3"
              placeholder="Breve descripción de la especialidad..." 
              class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6DC7DC]/50 focus:border-[#418FC8] transition-all resize-none"
            ></textarea>
          </div>
          
          <!-- Botones -->
          <div class="mt-4 flex justify-end gap-3">
            <button type="button" @click="showModal = false" class="px-5 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
              Cancelar
            </button>
            <button type="submit" class="bg-gradient-to-r from-[#418FC8] to-[#6DC7DC] hover:opacity-90 text-white text-sm font-bold py-2.5 px-6 rounded-xl transition-all shadow-md shadow-[#418FC8]/20">
              Guardar Especialidad
            </button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>
