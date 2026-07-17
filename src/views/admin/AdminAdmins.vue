<script setup lang="ts">
import { ref } from 'vue'
import { PhX, PhSpinner, PhPlus } from '@phosphor-icons/vue'
import { createAdmin } from '@/services/admin-service'

const admins = ref([
  { 
    id: '1', 
    name: 'Admin Principal', 
    dni: '00000000', 
    superAdmin: true,
    active: true 
  }
])

const showModal = ref(false)
const loading = ref(false)
const errorMessage = ref<string | null>(null)

const newAdmin = ref({
  userEmail: '',
  dniAdmin: '',
  nombres: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  fechaNacimiento: '',
  sexo: '',
  telefono: '',
  direccion: '',
  superAdmin: false
})

async function saveAdmin() {
  errorMessage.value = null
  loading.value = true
  
  try {
    await createAdmin({ ...newAdmin.value })
    
    // Aquí idealmente recargaríamos la lista
    showModal.value = false
    
    newAdmin.value = { 
      userEmail: '', dniAdmin: '', nombres: '', apellidoPaterno: '',
      apellidoMaterno: '', fechaNacimiento: '', sexo: '', telefono: '', direccion: '', superAdmin: false
    }
  } catch (e: any) {
    errorMessage.value = e.response?.data?.message || e.message || 'Error al crear administrador.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto w-full px-4 sm:px-0 font-sans">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">Administradores</h1>
        <p class="text-slate-500 dark:text-slate-400 mt-2 font-medium">Gestión del personal con acceso al panel de administración.</p>
      </div>
      <button @click="showModal = true" class="w-full sm:w-auto bg-gradient-to-r from-[#418FC8] to-[#6DC7DC] hover:opacity-90 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-[#418FC8]/30 hover:shadow-xl flex items-center justify-center gap-2">
        <PhPlus class="w-5 h-5" weight="bold" />
        Nuevo Administrador
      </button>
    </div>

    <!-- Contenedor Principal -->
    <div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden transition-colors">
      
      <!-- Vista Desktop (Tabla) -->
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
              <th class="p-5 text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">Nombre Completo</th>
              <th class="p-5 text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">DNI</th>
              <th class="p-5 text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider text-center">Nivel</th>
              <th class="p-5 text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider text-center">Estado</th>
              <th class="p-5 text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider text-right">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
            <tr v-for="admin in admins" :key="admin.id" class="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors">
              <td class="p-5 font-bold text-slate-800 dark:text-white text-sm">{{ admin.name }}</td>
              <td class="p-5 text-slate-600 dark:text-slate-300 text-sm font-medium">{{ admin.dni }}</td>
              <td class="p-5 text-center">
                <span class="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 px-3 py-1 rounded-full text-xs font-bold">
                  {{ admin.superAdmin ? 'SuperAdmin' : 'Admin' }}
                </span>
              </td>
              <td class="p-5 text-center">
                <span 
                  class="px-3 py-1 text-xs font-bold rounded-full border"
                  :class="admin.active ? 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 dark:text-slate-400 border-slate-200 dark:border-slate-700'"
                >
                  {{ admin.active ? 'Activo' : 'Inactivo' }}
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

    <!-- Modal Añadir Administrador -->
    <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" @click="showModal = false"></div>
      
      <div class="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div class="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
          <h2 class="text-xl font-bold text-slate-800 dark:text-white">Nuevo Administrador</h2>
          <button @click="showModal = false" class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-50 dark:bg-slate-700 rounded-full transition-colors">
            <PhX class="w-5 h-5" />
          </button>
        </div>
        
        <form @submit.prevent="saveAdmin" class="p-6 flex flex-col gap-5 max-h-[80vh] overflow-y-auto custom-scrollbar">
          <div v-if="errorMessage" class="rounded-lg bg-red-50 text-red-700 text-sm px-4 py-3 border border-red-200">
            {{ errorMessage }}
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Correo electrónico</label>
              <input v-model="newAdmin.userEmail" type="email" required class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm" />
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">DNI</label>
              <input v-model="newAdmin.dniAdmin" type="text" required pattern="\d+" class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm" />
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Nombres</label>
              <input v-model="newAdmin.nombres" type="text" required class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm" />
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Apellido Paterno</label>
              <input v-model="newAdmin.apellidoPaterno" type="text" required class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm" />
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Apellido Materno</label>
              <input v-model="newAdmin.apellidoMaterno" type="text" required class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm" />
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Fecha de Nacimiento</label>
              <input v-model="newAdmin.fechaNacimiento" type="date" required class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm" />
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Sexo</label>
              <select v-model="newAdmin.sexo" required class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm">
                <option value="" disabled>Seleccione</option>
                <option value="MASCULINO">Masculino</option>
                <option value="FEMENINO">Femenino</option>
                <option value="OTRO">Otro</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Teléfono</label>
              <input v-model="newAdmin.telefono" type="tel" required pattern="\d+" class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm" />
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Dirección</label>
              <input v-model="newAdmin.direccion" type="text" required class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm" />
            </div>
            
            <div class="sm:col-span-2 pt-2 border-t border-slate-200 dark:border-slate-700 mt-2">
              <label class="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" v-model="newAdmin.superAdmin" class="w-5 h-5 rounded border-slate-300 text-[#418FC8] focus:ring-[#418FC8]" />
                <span class="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Es Super Administrador
                  <p class="text-xs font-normal text-slate-500 mt-1">Los Super Administradores pueden gestionar a otros administradores y configuraciones del sistema.</p>
                </span>
              </label>
            </div>
          </div>
          
          <!-- Botones -->
          <div class="mt-4 flex justify-end gap-3">
            <button type="button" @click="showModal = false" class="px-5 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
              Cancelar
            </button>
            <button type="submit" :disabled="loading" class="bg-gradient-to-r from-[#418FC8] to-[#6DC7DC] hover:opacity-90 text-white text-sm font-bold py-2.5 px-6 rounded-xl transition-all shadow-md flex items-center gap-2">
              <PhSpinner v-if="loading" class="animate-spin w-4 h-4" />
              Guardar Administrador
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
