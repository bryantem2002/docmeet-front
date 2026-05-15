<script setup lang="ts">
import { ref, computed } from 'vue'

// --- ESTADOS ---
const searchQuery = ref('')
const filterSpecialty = ref('Todas')

// --- DATOS DE PRUEBA (MOCK DATA - CITAS PASADAS) ---
// Nota: Las fechas son anteriores a "hoy" (Mayo 2026)
const pastAppointments = ref([
  {
    id: 101,
    date: '2026-04-15',
    time: '10:30 AM',
    doctor: 'Dr. Gregory House',
    specialty: 'Medicina Interna',
    diagnosis: 'Infección respiratoria aguda leve. Requiere reposo y medicación sintomática.',
    prescription: true,
    status: 'completed',
    notes: 'Paciente presentó fiebre de 38.5°C por dos días. No hay signos de complicación pulmonar.'
  },
  {
    id: 102,
    date: '2026-03-22',
    time: '04:00 PM',
    doctor: 'Dra. Allison Cameron',
    specialty: 'Inmunología',
    diagnosis: 'Reacción alérgica estacional. Rinitis alérgica.',
    prescription: true,
    status: 'completed',
    notes: 'Se recetan antihistamínicos de segunda generación.'
  },
  {
    id: 103,
    date: '2025-11-10',
    time: '09:15 AM',
    doctor: 'Dr. Robert Chase',
    specialty: 'Cardiología',
    diagnosis: 'Chequeo general preventivo. Presión arterial dentro de los límites normales (110/70).',
    prescription: false,
    status: 'completed',
    notes: 'Electrocardiograma normal. Se recomienda mantener rutina de ejercicios.'
  },
  {
    id: 104,
    date: '2025-08-05',
    time: '11:00 AM',
    doctor: 'Dr. Gregory House',
    specialty: 'Medicina Interna',
    diagnosis: 'Gastroenteritis aguda. Posible origen alimentario.',
    prescription: true,
    status: 'completed',
    notes: 'Paciente reporta dolor abdominal y náuseas. Tratamiento con suero oral y antieméticos.'
  }
])

// --- UTILIDADES ---
// Formatear la fecha para que se lea bonito (ej. "15 de Abril, 2026")
const formatDate = (dateString: string) => {
  const date = new Date(dateString + 'T00:00:00') // Prevenir desfase de zona horaria
  return new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
}

// Obtener lista única de especialidades para el select de filtros
const availableSpecialties = computed(() => {
  const specialties = new Set(pastAppointments.value.map(app => app.specialty))
  return ['Todas', ...Array.from(specialties)]
})

// --- LÓGICA DE FILTRADO ---
const filteredHistory = computed(() => {
  return pastAppointments.value.filter(app => {
    // 1. Filtrar por búsqueda (doctor o diagnóstico)
    const matchesSearch = 
      app.doctor.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      app.diagnosis.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    // 2. Filtrar por especialidad
    const matchesSpecialty = filterSpecialty.value === 'Todas' || app.specialty === filterSpecialty.value

    return matchesSearch && matchesSpecialty
  })
})
</script>

<template>
  <div class="max-w-5xl mx-auto w-full">
    
    <!-- Encabezado de la página -->
    <div class="mb-8">
      <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">Historial Clínico</h1>
      <p class="text-sm text-slate-500 mt-1">Revisa el detalle de tus consultas y diagnósticos pasados.</p>
    </div>

    <!-- Barra de Búsqueda y Filtros -->
    <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
      
      <!-- Buscador -->
      <div class="relative w-full sm:w-96">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
          </svg>
        </div>
        <input 
          v-model="searchQuery"
          type="text" 
          class="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors sm:text-sm" 
          placeholder="Buscar doctor o diagnóstico..."
        >
      </div>

      <!-- Filtro Especialidad -->
      <div class="w-full sm:w-auto flex items-center gap-3">
        <label for="specialty" class="text-sm font-medium text-slate-600 whitespace-nowrap">Especialidad:</label>
        <select 
          id="specialty" 
          v-model="filterSpecialty"
          class="block w-full sm:w-48 pl-3 pr-10 py-2.5 text-base border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-xl bg-slate-50"
        >
          <option v-for="spec in availableSpecialties" :key="spec" :value="spec">
            {{ spec }}
          </option>
        </select>
      </div>
    </div>

    <!-- Lista del Historial -->
    <div v-if="filteredHistory.length > 0" class="space-y-6">
      <div 
        v-for="record in filteredHistory" 
        :key="record.id"
        class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative"
      >
        <!-- Línea decorativa izquierda -->
        <div class="absolute left-0 top-0 bottom-0 w-2 bg-slate-300 rounded-l-2xl"></div>

        <div class="ml-4">
          <!-- Fila superior: Fecha y Doctor -->
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 class="text-lg font-bold text-slate-800 capitalize">{{ formatDate(record.date) }}</h3>
              </div>
              <p class="text-sm text-slate-500 flex items-center gap-1.5 ml-7">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ record.time }}
              </p>
            </div>
            
            <div class="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 flex items-center gap-3 w-fit">
              <div class="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                {{ record.doctor.charAt(4) }} <!-- Letra inicial del doctor -->
              </div>
              <div>
                <p class="text-sm font-bold text-slate-800">{{ record.doctor }}</p>
                <p class="text-xs font-medium text-blue-600">{{ record.specialty }}</p>
              </div>
            </div>
          </div>

          <hr class="border-slate-100 my-4">

          <!-- Cuerpo: Diagnóstico y Notas -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Diagnóstico Principal</h4>
              <p class="text-slate-700 text-sm leading-relaxed font-medium">
                {{ record.diagnosis }}
              </p>
            </div>
            <div>
              <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Notas del Especialista</h4>
              <p class="text-slate-600 text-sm leading-relaxed">
                {{ record.notes }}
              </p>
            </div>
          </div>

          <!-- Acciones Inferiores (Receta) -->
          <div class="mt-6 flex justify-end">
            <button 
              v-if="record.prescription"
              class="flex items-center gap-2 text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Ver Receta Médica
            </button>
            <span v-else class="text-sm text-slate-400 italic py-2">
              Sin receta emitida en esta consulta.
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Estado Vacío (Empty State) para Búsqueda -->
    <div v-else class="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-3xl border border-dashed border-slate-300">
      <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 class="text-lg font-bold text-slate-700 mb-2">No se encontraron resultados</h3>
      <p class="text-slate-500 max-w-md">No tienes registros médicos que coincidan con tu búsqueda actual. Intenta cambiar los filtros o los términos de búsqueda.</p>
      <button @click="searchQuery = ''; filterSpecialty = 'Todas'" class="mt-4 text-blue-600 font-medium hover:underline focus:outline-none">
        Limpiar filtros
      </button>
    </div>

  </div>
</template>