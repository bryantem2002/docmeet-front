<script setup lang="ts">
import { ref } from 'vue'
import { PhPlus, PhMapPin, PhX } from '@phosphor-icons/vue'

const locations = ref([
  { id: 'SED-01', name: 'Sede Miraflores', address: 'Av. Pardo 123', phone: '01 456-7890', status: 'active' },
  { id: 'SED-02', name: 'Sede San Isidro', address: 'Av. Javier Prado Este 456', phone: '01 456-7891', status: 'active' },
  { id: 'SED-03', name: 'Sede Surco', address: 'Av. Benavides 789', phone: '01 456-7892', status: 'active' },
])

const showModal = ref(false)
const newLocation = ref({
  name: '',
  address: '',
  phone: '',
  status: 'active'
})

function saveLocation() {
  if (!newLocation.value.name || !newLocation.value.address || !newLocation.value.phone) return
  
  const nextId = `SED-0${locations.value.length + 1}`
  locations.value.unshift({
    id: nextId,
    name: newLocation.value.name,
    address: newLocation.value.address,
    phone: newLocation.value.phone,
    status: newLocation.value.status
  })
  
  newLocation.value = { name: '', address: '', phone: '', status: 'active' }
  showModal.value = false
}
</script>

<template>
  <div class="max-w-7xl mx-auto w-full px-4 sm:px-0 font-sans">
    <div class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">Gestor de Sedes</h1>
        <p class="text-slate-500 dark:text-slate-400 mt-2 font-medium">Administra las ubicaciones físicas de la clínica.</p>
      </div>
      <button @click="showModal = true" class="bg-gradient-to-r from-[#418FC8] to-[#6DC7DC] hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-[#418FC8]/30 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2">
        <PhPlus class="h-5 w-5" weight="bold" />
        Añadir Nueva Sede
      </button>
    </div>

    <!-- Contenedor Principal -->
    <div class="bg-white dark:bg-slate-800  border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden mt-8 transition-colors">
      
      <!-- Vista Móvil (Tarjetas) -->
      <div class="block sm:hidden divide-y divide-slate-100 dark:divide-slate-700">
        <div v-for="sede in locations" :key="'mob-'+sede.id" class="p-5 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
          <div class="flex justify-between items-start mb-3">
            <div class="flex items-center gap-2">
              <PhMapPin class="h-5 w-5 text-blue-500 shrink-0" />
              <div>
                <h3 class="font-bold text-slate-800 dark:text-white text-base">{{ sede.name }}</h3>
                <p class="text-xs font-bold text-slate-400 dark:text-slate-400 mt-0.5">{{ sede.id }}</p>
              </div>
            </div>
            <span class="px-2.5 py-1 text-[10px] font-bold rounded-full border shrink-0" :class="sede.status === 'active' ? 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' : 'bg-slate-100 dark:bg-slate-600 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'">
              {{ sede.status === 'active' ? 'Activo' : 'Inactivo' }}
            </span>
          </div>
          <div class="flex flex-col gap-1.5 mb-4 text-sm pl-7">
            <div class="flex flex-col">
              <span class="text-slate-500 dark:text-slate-400 text-xs">Dirección:</span>
              <span class="font-medium text-slate-700 dark:text-slate-200 leading-tight mt-0.5">{{ sede.address }}</span>
            </div>
            <div class="flex justify-between mt-1">
              <span class="text-slate-500 dark:text-slate-400">Teléfono:</span>
              <span class="font-bold text-[#418FC8]">{{ sede.phone }}</span>
            </div>
          </div>
          <button class="w-full text-[#418FC8] font-bold hover:text-white bg-[#418FC8]/10 hover:bg-[#418FC8] py-2.5 rounded-xl text-sm transition-colors text-center">
            Editar
          </button>
        </div>
      </div>

      <!-- Vista Desktop (Tabla) -->
      <div class="hidden sm:block overflow-x-auto custom-scrollbar">
        <table class="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr class="bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-xs font-extrabold uppercase tracking-widest">
              <th class="p-5">ID Sede</th>
              <th class="p-5">Nombre</th>
              <th class="p-5">Dirección</th>
              <th class="p-5">Teléfono</th>
              <th class="p-5 text-center">Estado</th>
              <th class="p-5 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
            <tr v-for="sede in locations" :key="sede.id" class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
              <td class="p-5 font-bold text-slate-500 dark:text-slate-400 text-sm">{{ sede.id }}</td>
              <td class="p-5 font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <PhMapPin class="h-5 w-5 text-blue-500" />
                {{ sede.name }}
              </td>
              <td class="p-5 text-slate-600 dark:text-slate-300 font-medium text-sm">{{ sede.address }}</td>
              <td class="p-5 text-slate-600 dark:text-slate-300 font-medium text-sm">{{ sede.phone }}</td>
              <td class="p-5 text-center">
                <span class="px-3 py-1 text-xs font-bold rounded-full border" :class="sede.status === 'active' ? 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' : 'bg-slate-100 dark:bg-slate-600 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'">
                  {{ sede.status === 'active' ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
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

    <!-- Modal Añadir Sede -->
    <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="showModal = false"></div>
      
      <div class="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div class="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
          <h2 class="text-xl font-bold text-slate-800 dark:text-white">Nueva Sede</h2>
          <button @click="showModal = false" class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-50 dark:bg-slate-700 rounded-full transition-colors">
            <PhX class="w-5 h-5" />
          </button>
        </div>
        
        <form @submit.prevent="saveLocation" class="p-6 flex flex-col gap-5">
          <!-- Nombre -->
          <div>
            <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Nombre de la Sede</label>
            <input 
              v-model="newLocation.name"
              type="text" 
              required
              placeholder="Ej. Sede Los Olivos" 
              class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6DC7DC]/50 focus:border-[#418FC8] transition-all"
            />
          </div>
          
          <!-- Dirección -->
          <div>
            <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Dirección Completa</label>
            <input 
              v-model="newLocation.address"
              type="text" 
              required
              placeholder="Ej. Av. Las Palmeras 123" 
              class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6DC7DC]/50 focus:border-[#418FC8] transition-all"
            />
          </div>
          
          <!-- Teléfono -->
          <div>
            <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Teléfono Principal</label>
            <input 
              v-model="newLocation.phone"
              type="text" 
              required
              placeholder="Ej. 01 123-4567" 
              class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6DC7DC]/50 focus:border-[#418FC8] transition-all"
            />
          </div>
          
          <!-- Estado -->
          <div>
            <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Estado Operativo</label>
            <div class="flex gap-4">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" v-model="newLocation.status" value="active" class="w-4 h-4 text-[#418FC8] focus:ring-[#418FC8] border-slate-300" />
                <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Activo</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" v-model="newLocation.status" value="inactive" class="w-4 h-4 text-[#418FC8] focus:ring-[#418FC8] border-slate-300" />
                <span class="text-sm font-medium text-slate-700 dark:text-slate-300">En Remodelación / Cerrado</span>
              </label>
            </div>
          </div>
          
          <!-- Botones -->
          <div class="mt-4 flex justify-end gap-3">
            <button type="button" @click="showModal = false" class="px-5 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
              Cancelar
            </button>
            <button type="submit" class="bg-gradient-to-r from-[#418FC8] to-[#6DC7DC] hover:opacity-90 text-white text-sm font-bold py-2.5 px-6 rounded-xl transition-all shadow-md shadow-[#418FC8]/20">
              Guardar Sede
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
