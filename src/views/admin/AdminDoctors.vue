<script setup lang="ts">
import { ref } from 'vue'
import { PhPlus, PhMagnifyingGlass, PhX, PhSpinner } from '@phosphor-icons/vue'
import { createDoctor } from '@/services/admin-service'

const doctors = ref(import.meta.env.DEV ? [
  // Mantengo los mocks por ahora para la visualización en la tabla
  { id: 'MED-01', name: 'Dr. Roberto Mendoza', specialty: 'Cardiología', sede: 'Miraflores', status: 'active' },
  { id: 'MED-02', name: 'Dra. Patricia Vargas', specialty: 'Dermatología', sede: 'San Isidro', status: 'active' },
] : [])

const showModal = ref(false)
const loading = ref(false)
const errorMessage = ref<string | null>(null)

const newDoctor = ref({
  userEmail: '',
  dniDoctor: '',
  cmp: '',
  rne: '',
  nombres: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  fechaNacimiento: '',
  sexo: '',
  telefono: '',
  direccion: '',
  especialidades: [] as string[]
})

const selectedSpecialty = ref('')

function addSpecialty() {
  if (selectedSpecialty.value && !newDoctor.value.especialidades.includes(selectedSpecialty.value)) {
    newDoctor.value.especialidades.push(selectedSpecialty.value)
    selectedSpecialty.value = ''
  }
}

function removeSpecialty(sp: string) {
  newDoctor.value.especialidades = newDoctor.value.especialidades.filter(s => s !== sp)
}

async function saveDoctor() {
  errorMessage.value = null
  loading.value = true
  
  try {
    if (newDoctor.value.especialidades.length === 0) {
      throw new Error('Debe seleccionar al menos una especialidad')
    }
    
    await createDoctor({ ...newDoctor.value })
    
    // Aquí idealmente recargaríamos la lista de doctores (getDoctors)
    // Por ahora solo cerramos
    showModal.value = false
    
    // Reset form
    newDoctor.value = {
      userEmail: '', dniDoctor: '', cmp: '', rne: '', nombres: '',
      apellidoPaterno: '', apellidoMaterno: '', fechaNacimiento: '',
      sexo: '', telefono: '', direccion: '', especialidades: []
    }
  } catch (e: any) {
    errorMessage.value = e.response?.data?.message || e.message || 'Error al crear doctor.'
  } finally {
    loading.value = false
  }
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
        
        <form @submit.prevent="saveDoctor" class="p-6 flex flex-col gap-5 max-h-[80vh] overflow-y-auto custom-scrollbar">
          <div v-if="errorMessage" class="rounded-lg bg-red-50 text-red-700 text-sm px-4 py-3 border border-red-200">
            {{ errorMessage }}
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Correo electrónico</label>
              <input v-model="newDoctor.userEmail" type="email" required class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm" />
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">DNI</label>
              <input v-model="newDoctor.dniDoctor" type="text" required pattern="\d+" class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm" />
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Nombres</label>
              <input v-model="newDoctor.nombres" type="text" required class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm" />
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Apellido Paterno</label>
              <input v-model="newDoctor.apellidoPaterno" type="text" required class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm" />
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Apellido Materno</label>
              <input v-model="newDoctor.apellidoMaterno" type="text" required class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm" />
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Fecha de Nacimiento</label>
              <input v-model="newDoctor.fechaNacimiento" type="date" required class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm" />
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Sexo</label>
              <select v-model="newDoctor.sexo" required class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm">
                <option value="" disabled>Seleccione</option>
                <option value="MASCULINO">Masculino</option>
                <option value="FEMENINO">Femenino</option>
                <option value="OTRO">Otro</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Teléfono</label>
              <input v-model="newDoctor.telefono" type="tel" required pattern="\d+" class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm" />
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Dirección</label>
              <input v-model="newDoctor.direccion" type="text" required class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm" />
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">CMP</label>
              <input v-model="newDoctor.cmp" type="text" required class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm" />
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">RNE (Opcional)</label>
              <input v-model="newDoctor.rne" type="text" class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm" />
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Especialidades</label>
              <div class="flex gap-2 mb-2">
                <select v-model="selectedSpecialty" class="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm">
                  <option value="" disabled>Seleccione especialidad</option>
                  <option value="Cardiología">Cardiología</option>
                  <option value="Dermatología">Dermatología</option>
                  <option value="Pediatría">Pediatría</option>
                </select>
                <button type="button" @click="addSpecialty" class="px-4 py-2 bg-[#418FC8] text-white rounded-xl font-bold">Agregar</button>
              </div>
              <div class="flex flex-wrap gap-2">
                <span v-for="sp in newDoctor.especialidades" :key="sp" class="inline-flex items-center gap-1 px-3 py-1 bg-[#418FC8]/10 text-[#418FC8] rounded-full text-xs font-bold">
                  {{ sp }}
                  <button type="button" @click="removeSpecialty(sp)" class="hover:text-red-500"><PhX /></button>
                </span>
              </div>
            </div>
          </div>
          
          <div class="mt-4 flex justify-end gap-3">
            <button type="button" @click="showModal = false" class="px-5 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
              Cancelar
            </button>
            <button type="submit" :disabled="loading" class="bg-gradient-to-r from-[#418FC8] to-[#6DC7DC] hover:opacity-90 text-white text-sm font-bold py-2.5 px-6 rounded-xl transition-all shadow-md flex items-center gap-2">
              <PhSpinner v-if="loading" class="animate-spin w-4 h-4" />
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
