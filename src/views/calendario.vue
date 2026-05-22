<script setup lang="ts">
import { ref, computed } from 'vue'
import NewAppointmentModal from '@/components/NewAppointmentModal.vue'

// --- ESTADOS DEL CALENDARIO ---
const today = new Date()
// Mantenemos la fecha actual en la vista y el día seleccionado
const currentDate = ref(new Date(today.getFullYear(), today.getMonth(), 1))
const selectedDate = ref(new Date(today.getFullYear(), today.getMonth(), today.getDate()))
const isModalOpen = ref(false)

const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

// --- UTILIDADES DE FECHA ---
// Formatea a YYYY-MM-DD para comparar fácilmente
const formatDateStr = (date: Date) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// Calculamos "hoy", "mañana" y "pasado" dinámicamente para que el mock data siempre funcione
const todayStr = formatDateStr(today)
const tomorrowStr = formatDateStr(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1))
const nextWeekStr = formatDateStr(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5))

// --- DATOS DE PRUEBA (MOCK DATA) ---
const appointments = ref([
  { id: 1, date: todayStr, time: '10:00 AM', doctor: 'Dr. Gregory House', specialty: 'Medicina Interna', type: 'Presencial', status: 'confirmed' },
  { id: 2, date: todayStr, time: '03:30 PM', doctor: 'Dra. Allison Cameron', specialty: 'Inmunología', type: 'Videollamada', status: 'confirmed' },
  { id: 3, date: tomorrowStr, time: '09:15 AM', doctor: 'Dr. Robert Chase', specialty: 'Cardiología', type: 'Presencial', status: 'confirmed' },
  { id: 4, date: nextWeekStr, time: '11:00 AM', doctor: 'Dra. Lisa Cuddy', specialty: 'Endocrinología', type: 'Presencial', status: 'confirmed' }
])

// Capitaliza la primera letra del mes
const currentMonthName = computed(() => {
  const name = new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(currentDate.value)
  return name.charAt(0).toUpperCase() + name.slice(1)
})

const formattedSelectedDate = computed(() => {
  const name = new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }).format(selectedDate.value)
  return name.charAt(0).toUpperCase() + name.slice(1)
})

// --- LÓGICA DEL CALENDARIO ---
const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  const days = []
  let startingDayOfWeek = firstDay.getDay() // 0 = Dom, 1 = Lun
  let startOffset = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1 // Lunes como primer día

  // Días del mes anterior
  const prevMonthLastDay = new Date(year, month, 0).getDate()
  for (let i = startOffset - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, prevMonthLastDay - i),
      isCurrentMonth: false,
    })
  }

  // Días del mes actual
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push({
      date: new Date(year, month, i),
      isCurrentMonth: true,
    })
  }

  // Días del mes siguiente (para completar 42 celdas)
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false,
    })
  }

  // Inyectar estado a cada día (si tiene citas, si es hoy, etc.)
  return days.map(day => {
    const dateStr = formatDateStr(day.date)
    const dayAppointments = appointments.value.filter(app => app.date === dateStr)
    const isSelected = formatDateStr(selectedDate.value) === dateStr
    const isToday = todayStr === dateStr

    return { 
      ...day, 
      dateStr, 
      hasAppointments: dayAppointments.length > 0,
      isSelected, 
      isToday 
    }
  })
})

const selectedAppointments = computed(() => {
  const dateStr = formatDateStr(selectedDate.value)
  return appointments.value.filter(app => app.date === dateStr)
})

// --- NAVEGACIÓN ---
function nextMonth() {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}
function prevMonth() {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}
function selectDay(day: any) {
  selectedDate.value = day.date
  if (!day.isCurrentMonth) {
    currentDate.value = new Date(day.date.getFullYear(), day.date.getMonth(), 1)
  }
}

// --- CREAR CITA ---
const handleNewAppointment = (data: any) => {
  appointments.value.push({
    id: Date.now(),
    date: data.date,
    time: data.time,
    doctor: data.doctor || 'Por asignar',
    specialty: data.specialty || 'General',
    type: 'Presencial',
    status: 'pending'
  })
}
</script>

<template>
  <div class="max-w-6xl mx-auto w-full">
    
    <NewAppointmentModal 
      :isOpen="isModalOpen" 
      @close="isModalOpen = false" 
      @schedule="handleNewAppointment" 
    />

    <!-- Encabezado de la página -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">Mi Agenda Médica</h1>
        <p class="text-sm text-slate-500 mt-1">Administra tus citas y horarios de manera sencilla.</p>
      </div>
      <button @click="isModalOpen = true" class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm shadow-blue-200 flex items-center gap-2 active:scale-95">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
        Nueva Cita
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <!-- COLUMNA IZQUIERDA: CALENDARIO -->
      <div class="lg:col-span-7 bg-white rounded-3xl border border-slate-100 shadow-[0_2px_20px_rgb(0,0,0,0.04)] p-6 sm:p-8">
        
        <!-- Controles de Mes -->
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-xl font-bold text-slate-800">{{ currentMonthName }}</h2>
          <div class="flex gap-2">
            <button @click="prevMonth" class="p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-all focus:ring-2 focus:ring-blue-100 outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button @click="nextMonth" class="p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-all focus:ring-2 focus:ring-blue-100 outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Días de la semana -->
        <div class="grid grid-cols-7 mb-4">
          <div v-for="day in weekDays" :key="day" class="text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
            {{ day }}
          </div>
        </div>

        <!-- Cuadrícula del Calendario -->
        <div class="grid grid-cols-7 gap-y-2 gap-x-1 sm:gap-2">
          <button
            v-for="day in calendarDays"
            :key="day.dateStr"
            @click="selectDay(day)"
            class="relative flex flex-col items-center justify-center aspect-square rounded-2xl transition-all duration-200 group outline-none"
            :class="[
              !day.isCurrentMonth ? 'text-slate-300' : 'text-slate-700 font-medium',
              day.isSelected 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 font-bold scale-105' 
                : 'hover:bg-blue-50 hover:text-blue-600',
              day.isToday && !day.isSelected ? 'bg-slate-50 text-blue-600 font-bold border border-blue-100' : ''
            ]"
          >
            <span class="text-sm sm:text-base z-10">{{ day.date.getDate() }}</span>
            
            <!-- Puntito indicador de citas -->
            <div 
              v-if="day.hasAppointments" 
              class="absolute bottom-2 sm:bottom-3 w-1.5 h-1.5 rounded-full transition-colors"
              :class="day.isSelected ? 'bg-white' : 'bg-blue-400 group-hover:bg-blue-600'"
            ></div>
          </button>
        </div>
      </div>

      <!-- COLUMNA DERECHA: DETALLE DEL DÍA -->
      <div class="lg:col-span-5 bg-slate-50/50 lg:bg-transparent rounded-3xl p-6 sm:p-0">
        
        <div class="mb-6">
          <h3 class="text-lg font-bold text-slate-800">{{ formattedSelectedDate }}</h3>
          <p class="text-sm font-medium text-slate-500 mt-1">
            <span v-if="selectedAppointments.length === 0">Sin citas para este día</span>
            <span v-else>{{ selectedAppointments.length }} {{ selectedAppointments.length === 1 ? 'cita programada' : 'citas programadas' }}</span>
          </p>
        </div>

        <!-- Lista de Citas (Si hay) -->
        <div v-if="selectedAppointments.length > 0" class="space-y-4">
          <div 
            v-for="app in selectedAppointments" 
            :key="app.id"
            class="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all relative overflow-hidden group cursor-pointer"
          >
            <!-- Banda lateral decorativa -->
            <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500 opacity-80 group-hover:opacity-100 transition-opacity"></div>
            
            <div class="flex justify-between items-start mb-4 ml-2">
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ app.time }}
                </span>
                <span 
                  class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg"
                  :class="app.status === 'confirmed' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'"
                >
                  {{ app.status === 'confirmed' ? 'Confirmada' : 'Pendiente' }}
                </span>
              </div>
              
              <button class="text-slate-300 hover:text-slate-600 transition-colors p-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>

            <div class="ml-2">
              <h4 class="text-base font-bold text-slate-800">{{ app.doctor }}</h4>
              <p class="text-sm text-slate-500 mb-4">{{ app.specialty }}</p>
              
              <div class="flex items-center gap-3">
                <div class="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg w-fit">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {{ app.type }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Estado Vacío (Empty State) -->
        <div v-else class="flex flex-col items-center justify-center py-12 px-4 text-center bg-white rounded-3xl border border-dashed border-slate-200">
          <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h4 class="text-slate-700 font-bold mb-1">Día libre</h4>
          <p class="text-sm text-slate-500 max-w-[200px]">No tienes citas programadas para esta fecha.</p>
        </div>

      </div>
    </div>
  </div>
</template>