<script setup lang="ts">
import { ref } from 'vue'
import { PhX } from '@phosphor-icons/vue'

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

const showModal = ref(false)
const newSecretary = ref({
  name: '',
  dni: '',
  shift: '',
  clinic: '',
  active: true
})

function saveSecretary() {
  if (!newSecretary.value.name || !newSecretary.value.dni || !newSecretary.value.shift || !newSecretary.value.clinic) return
  
  const nextId = String(secretaries.value.length + 1)
  secretaries.value.unshift({
    id: nextId,
    name: newSecretary.value.name,
    dni: newSecretary.value.dni,
    shift: newSecretary.value.shift,
    clinic: newSecretary.value.clinic,
    doctorsAssigned: 0,
    active: newSecretary.value.active
  })
  
  newSecretary.value = { name: '', dni: '', shift: '', clinic: '', active: true }
  showModal.value = false
}
</script>

<template>
  <div class="max-w-7xl mx-auto w-full px-4 sm:px-0 font-sans">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">Secretarias</h1>
        <p class="text-slate-500 dark:text-slate-400 mt-2 font-medium">Gestión del personal administrativo y asignación a médicos.</p>
      </div>
      <button @click="showModal = true" class="w-full sm:w-auto bg-gradient-to-r from-[#418FC8] to-[#6DC7DC] hover:opacity-90 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-[#418FC8]/30 hover:shadow-xl hover:-translate-y-0.5">
        Nueva Secretaria
      </button>
    </div>

    <!-- Contenedor Principal -->
    <div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden transition-colors">
      
      <!-- Vista Móvil (Tarjetas) -->
      <div class="block sm:hidden divide-y divide-slate-100 dark:divide-slate-700">
        <div v-for="sec in secretaries" :key="'mob-'+sec.id" class="p-5 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
          <div class="flex justify-between items-start mb-3">
            <div>
              <h3 class="font-bold text-slate-800 dark:text-white text-base">{{ sec.name }}</h3>
              <p class="text-xs font-bold text-slate-400 dark:text-slate-400 mt-0.5">DNI: {{ sec.dni }}</p>
            </div>
            <span class="px-2.5 py-1 text-[10px] font-bold rounded-full border shrink-0" :class="sec.active ? 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 dark:text-slate-400 border-slate-200 dark:border-slate-700'">
              {{ sec.active ? 'Activo' : 'Inactivo' }}
            </span>
          </div>
          <div class="flex flex-col gap-1.5 mb-4 text-sm">
            <div class="flex justify-between">
              <span class="text-slate-500 dark:text-slate-400">Sede Asignada:</span>
              <span class="font-bold text-[#418FC8]">{{ sec.clinic }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500 dark:text-slate-400">Turno:</span>
              <span class="font-medium text-slate-700 dark:text-slate-200">{{ sec.shift }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-500 dark:text-slate-400">Doctores Asignados:</span>
              <span class="bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-200 px-2 py-0.5 rounded text-xs font-bold">{{ sec.doctorsAssigned }}</span>
            </div>
          </div>
          <button class="w-full text-[#418FC8] font-bold hover:text-white bg-[#418FC8]/10 hover:bg-[#418FC8] py-2.5 rounded-xl text-sm transition-colors text-center">
            Gestionar
          </button>
        </div>
      </div>

      <!-- Vista Desktop (Tabla) -->
      <div class="hidden sm:block overflow-x-auto custom-scrollbar">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
              <th class="p-5 text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">Nombre Completo</th>
              <th class="p-5 text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">Turno</th>
              <th class="p-5 text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">Sede Asignada</th>
              <th class="p-5 text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider text-center">Docs Asignados</th>
              <th class="p-5 text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider text-center">Estado</th>
              <th class="p-5 text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider text-right">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
            <tr v-for="sec in secretaries" :key="sec.id" class="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors">
              <td class="p-5 font-bold text-slate-800 dark:text-white text-sm">{{ sec.name }}</td>
              <td class="p-5 text-slate-600 dark:text-slate-300 text-sm font-medium">{{ sec.shift }}</td>
              <td class="p-5 text-[#418FC8] font-bold text-sm">{{ sec.clinic }}</td>
              <td class="p-5 text-center">
                <span class="bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-200 px-2 py-1 rounded text-xs font-bold">{{ sec.doctorsAssigned }}</span>
              </td>
              <td class="p-5 text-center">
                <span 
                  class="px-3 py-1 text-xs font-bold rounded-full border"
                  :class="sec.active ? 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 dark:text-slate-400 border-slate-200 dark:border-slate-700'"
                >
                  {{ sec.active ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td class="p-5 text-right">
                <button class="text-[#418FC8] font-bold hover:text-white bg-[#418FC8]/10 hover:bg-[#418FC8] px-4 py-2 rounded-lg text-sm transition-all shadow-sm hover:shadow-[#418FC8]/20">
                  Gestionar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Añadir Secretaria -->
    <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="showModal = false"></div>
      
      <div class="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div class="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
          <h2 class="text-xl font-bold text-slate-800 dark:text-white">Nueva Secretaria</h2>
          <button @click="showModal = false" class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-50 dark:bg-slate-700 rounded-full transition-colors">
            <PhX class="w-5 h-5" />
          </button>
        </div>
        
        <form @submit.prevent="saveSecretary" class="p-6 flex flex-col gap-5">
          <!-- Nombre -->
          <div>
            <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Nombre Completo</label>
            <input 
              v-model="newSecretary.name"
              type="text" 
              required
              placeholder="Ej. Ana Lopez" 
              class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6DC7DC]/50 focus:border-[#418FC8] transition-all"
            />
          </div>
          
          <!-- DNI -->
          <div>
            <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">DNI</label>
            <input 
              v-model="newSecretary.dni"
              type="text" 
              required
              maxlength="8"
              placeholder="Nro. Documento" 
              class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6DC7DC]/50 focus:border-[#418FC8] transition-all"
            />
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <!-- Turno -->
            <div>
              <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Turno</label>
              <select v-model="newSecretary.shift" required class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6DC7DC]/50 focus:border-[#418FC8] transition-all appearance-none">
                <option value="" disabled>Seleccionar...</option>
                <option>Mañana</option>
                <option>Tarde</option>
                <option>Noche</option>
              </select>
            </div>
            
            <!-- Sede -->
            <div>
              <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Sede Asignada</label>
              <select v-model="newSecretary.clinic" required class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6DC7DC]/50 focus:border-[#418FC8] transition-all appearance-none">
                <option value="" disabled>Seleccionar...</option>
                <option>Sede Principal</option>
                <option>Sede Norte</option>
                <option>Sede Sur</option>
              </select>
            </div>
          </div>
          
          <!-- Estado -->
          <div>
            <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Estado</label>
            <div class="flex gap-4">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" :value="true" v-model="newSecretary.active" class="w-4 h-4 text-[#418FC8] focus:ring-[#418FC8] border-slate-300" />
                <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Activa</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" :value="false" v-model="newSecretary.active" class="w-4 h-4 text-[#418FC8] focus:ring-[#418FC8] border-slate-300" />
                <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Inactiva</span>
              </label>
            </div>
          </div>
          
          <!-- Botones -->
          <div class="mt-4 flex justify-end gap-3">
            <button type="button" @click="showModal = false" class="px-5 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
              Cancelar
            </button>
            <button type="submit" class="bg-gradient-to-r from-[#418FC8] to-[#6DC7DC] hover:opacity-90 text-white text-sm font-bold py-2.5 px-6 rounded-xl transition-all shadow-md shadow-[#418FC8]/20">
              Guardar Secretaria
            </button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>
