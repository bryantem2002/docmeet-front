<script setup lang="ts">
import { ref } from 'vue'
import { PhPlus, PhMagnifyingGlass, PhX } from '@phosphor-icons/vue'

const doctors = ref([
  { id: 'MED-01', name: 'Dr. Roberto Mendoza', specialty: 'Cardiología', sede: 'Miraflores', status: 'active' },
  { id: 'MED-02', name: 'Dra. Patricia Vargas', specialty: 'Dermatología', sede: 'San Isidro', status: 'active' },
  { id: 'MED-03', name: 'Dr. Jorge Castro', specialty: 'Pediatría', sede: 'Surco', status: 'inactive' },
])

const showModal = ref(false)
const newDoctor = ref({
  name: '',
  specialty: '',
  sede: '',
  status: 'active'
})

function saveDoctor() {
  if (!newDoctor.value.name || !newDoctor.value.specialty || !newDoctor.value.sede) return
  
  const nextId = `MED-0${doctors.value.length + 1}`
  doctors.value.unshift({
    id: nextId,
    name: newDoctor.value.name,
    specialty: newDoctor.value.specialty,
    sede: newDoctor.value.sede,
    status: newDoctor.value.status
  })
  
  // Reset
  newDoctor.value = { name: '', specialty: '', sede: '', status: 'active' }
  showModal.value = false
}
</script>

<template>
  <div class="max-w-7xl mx-auto w-full px-4 sm:px-0 font-sans">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">Gestor de Doctores</h1>
        <p class="text-slate-500 dark:text-slate-400 mt-2 font-medium">Administra al personal médico de todas las sedes.</p>
      </div>
      <button @click="showModal = true" class="bg-gradient-to-r from-[#418FC8] to-[#6DC7DC] hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-[#418FC8]/30 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2">
        <PhPlus class="h-5 w-5" weight="bold" />
        Añadir Nuevo Médico
      </button>
    </div>

    <!-- Filtros -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm mb-6 flex flex-col sm:flex-row gap-4 justify-between transition-colors">
      <div class="relative max-w-md w-full">
        <PhMagnifyingGlass class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500" />
        <input 
          type="text" 
          placeholder="Buscar doctor..." 
          class="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6DC7DC]/50 focus:border-[#418FC8] transition-all"
        />
      </div>
    </div>

    <!-- Contenedor Principal -->
    <div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden transition-colors">
      
      <!-- Vista Móvil (Tarjetas) -->
      <div class="block sm:hidden divide-y divide-slate-100 dark:divide-slate-700">
        <div v-for="doc in doctors" :key="'mob-'+doc.id" class="p-5 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
          <div class="flex justify-between items-start mb-3">
            <div>
              <h3 class="font-bold text-slate-800 dark:text-white text-base">{{ doc.name }}</h3>
              <p class="text-xs font-bold text-slate-400 dark:text-slate-500 mt-0.5">{{ doc.id }}</p>
            </div>
            <span class="px-2.5 py-1 text-[10px] font-bold rounded-full border" :class="doc.status === 'active' ? 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' : 'bg-slate-100 dark:bg-slate-600 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'">
              {{ doc.status === 'active' ? 'Activo' : 'Vacaciones' }}
            </span>
          </div>
          <div class="flex flex-col gap-1.5 mb-4 text-sm">
            <div class="flex justify-between">
              <span class="text-slate-500 dark:text-slate-400">Especialidad:</span>
              <span class="font-bold text-[#418FC8]">{{ doc.specialty }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500 dark:text-slate-400">Sede Base:</span>
              <span class="font-medium text-slate-700 dark:text-slate-300">{{ doc.sede }}</span>
            </div>
          </div>
          <button class="w-full text-[#418FC8] font-bold hover:text-white bg-[#418FC8]/10 hover:bg-[#418FC8] py-2.5 rounded-xl text-sm transition-colors text-center">
            Editar Perfil
          </button>
        </div>
      </div>

      <!-- Vista Desktop (Tabla) -->
      <div class="hidden sm:block overflow-x-auto custom-scrollbar">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
              <th class="p-5 text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">CMP</th>
              <th class="p-5 text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">Nombre</th>
              <th class="p-5 text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">Especialidad</th>
              <th class="p-5 text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">Sede Base</th>
              <th class="p-5 text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider text-center">Estado</th>
              <th class="p-5 text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider text-right">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
            <tr v-for="doc in doctors" :key="doc.id" class="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors">
              <td class="p-5 font-bold text-slate-500 dark:text-slate-400 text-sm">{{ doc.id }}</td>
              <td class="p-5 font-bold text-slate-800 dark:text-white">{{ doc.name }}</td>
              <td class="p-5 text-[#418FC8] font-bold text-sm">{{ doc.specialty }}</td>
              <td class="p-5 text-slate-600 dark:text-slate-300 font-medium text-sm">{{ doc.sede }}</td>
              <td class="p-5 text-center">
                <span class="px-3 py-1 text-xs font-bold rounded-full border" :class="doc.status === 'active' ? 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' : 'bg-slate-100 dark:bg-slate-600 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'">
                  {{ doc.status === 'active' ? 'Activo' : 'Vacaciones' }}
                </span>
              </td>
              <td class="p-5 text-right">
                <button class="text-[#418FC8] font-bold hover:text-white bg-[#418FC8]/10 hover:bg-[#418FC8] px-4 py-2 rounded-lg text-sm transition-all shadow-sm hover:shadow-[#418FC8]/20">
                  Editar Perfil
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Añadir Médico -->
    <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="showModal = false"></div>
      
      <div class="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div class="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
          <h2 class="text-xl font-bold text-slate-800 dark:text-white">Nuevo Médico</h2>
          <button @click="showModal = false" class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-50 dark:bg-slate-700 rounded-full transition-colors">
            <PhX class="w-5 h-5" />
          </button>
        </div>
        
        <form @submit.prevent="saveDoctor" class="p-6 flex flex-col gap-5">
          <!-- Nombre -->
          <div>
            <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Nombre Completo</label>
            <input 
              v-model="newDoctor.name"
              type="text" 
              required
              placeholder="Ej. Dr. Juan Pérez" 
              class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6DC7DC]/50 focus:border-[#418FC8] transition-all"
            />
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <!-- Especialidad -->
            <div>
              <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Especialidad</label>
              <select v-model="newDoctor.specialty" required class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6DC7DC]/50 focus:border-[#418FC8] transition-all appearance-none">
                <option value="" disabled>Seleccionar...</option>
                <option>Cardiología</option>
                <option>Dermatología</option>
                <option>Pediatría</option>
                <option>Neurología</option>
                <option>Medicina General</option>
              </select>
            </div>
            
            <!-- Sede -->
            <div>
              <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Sede Base</label>
              <select v-model="newDoctor.sede" required class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6DC7DC]/50 focus:border-[#418FC8] transition-all appearance-none">
                <option value="" disabled>Seleccionar...</option>
                <option>Miraflores</option>
                <option>San Isidro</option>
                <option>Surco</option>
                <option>Los Olivos</option>
              </select>
            </div>
          </div>
          
          <!-- Estado -->
          <div>
            <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Estado</label>
            <div class="flex gap-4">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" v-model="newDoctor.status" value="active" class="w-4 h-4 text-[#418FC8] focus:ring-[#418FC8] border-slate-300" />
                <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Activo</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" v-model="newDoctor.status" value="inactive" class="w-4 h-4 text-[#418FC8] focus:ring-[#418FC8] border-slate-300" />
                <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Vacaciones</span>
              </label>
            </div>
          </div>
          
          <!-- Botones -->
          <div class="mt-4 flex justify-end gap-3">
            <button type="button" @click="showModal = false" class="px-5 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
              Cancelar
            </button>
            <button type="submit" class="bg-gradient-to-r from-[#418FC8] to-[#6DC7DC] hover:opacity-90 text-white text-sm font-bold py-2.5 px-6 rounded-xl transition-all shadow-md shadow-[#418FC8]/20">
              Guardar Médico
            </button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<style scoped>
.font-sans {
  font-family: 'Inter', 'Poppins', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
</style>
