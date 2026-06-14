<script setup lang="ts">
import { ref, computed } from 'vue'
import { PhPlus, PhCalendarBlank, PhMapPin, PhX, PhInfo, PhCheckCircle, PhWarning, PhXCircle } from '@phosphor-icons/vue'
// --- ESTADOS MOCK DE CITAS ---
const appointments = ref([
  {
    id: 1,
    doctor: 'Dr. Gregory House',
    specialty: 'Medicina Interna',
    date: '2026-06-15',
    time: '10:00 AM',
    location: 'Sede San Isidro',
    status: 'confirmed',
    type: 'upcoming',
    price: '150.00'
  },
  {
    id: 2,
    doctor: 'Dra. Allison Cameron',
    specialty: 'Inmunología',
    date: '2026-06-20',
    time: '03:30 PM',
    location: 'Sede Miraflores',
    status: 'confirmed',
    type: 'upcoming',
    price: '120.00'
  },
  {
    id: 3,
    doctor: 'Dr. Robert Chase',
    specialty: 'Cardiología',
    date: '2026-04-10',
    time: '09:15 AM',
    location: 'Sede Los Olivos',
    status: 'completed',
    type: 'past',
    price: '180.00'
  }
])

const activeTab = ref('upcoming')

const filteredAppointments = computed(() => {
  return appointments.value.filter(app => app.type === activeTab.value)
})

// --- FUNCIONALIDAD REPROGRAMAR (MINI MODAL) ---
const isRescheduleModalOpen = ref(false)
const appointmentToReschedule = ref<any>(null)
const newSelectedDate = ref('')
const newSelectedTime = ref('')

const openRescheduleModal = (app: any) => {
  appointmentToReschedule.value = app
  newSelectedDate.value = app.date
  newSelectedTime.value = app.time
  isRescheduleModalOpen.value = true
}

const closeRescheduleModal = () => {
  isRescheduleModalOpen.value = false
  appointmentToReschedule.value = null
}

const confirmReschedule = () => {
  if (appointmentToReschedule.value) {
    const index = appointments.value.findIndex(a => a.id === appointmentToReschedule.value.id)
    if (index !== -1) {
      appointments.value[index].date = newSelectedDate.value
      appointments.value[index].time = newSelectedTime.value
      appointments.value[index].status = 'confirmed'
    }
  }
  closeRescheduleModal()
}

// --- POLÍTICA DE CANCELACIÓN (MODAL) ---
const isCancelModalOpen = ref(false)
const appointmentToCancel = ref<any>(null)
const cancellationPolicy = ref<{ type: string, message: string, color: string }>({ type: '', message: '', color: '' })

const parseDateTime = (dateStr: string, timeStr: string) => {
  // Convertir '10:00 AM' a horas y minutos 24h
  const [time, modifier] = timeStr.split(' ')
  let [hours, minutes] = time.split(':')
  if (hours === '12') hours = '00'
  if (modifier === 'PM') hours = String(parseInt(hours, 10) + 12)
  
  return new Date(`${dateStr}T${hours.padStart(2, '0')}:${minutes}:00`)
}

const openCancelModal = (app: any) => {
  appointmentToCancel.value = app
  
  const appDateTime = parseDateTime(app.date, app.time)
  const now = new Date()
  const diffInHours = (appDateTime.getTime() - now.getTime()) / (1000 * 60 * 60)

  if (diffInHours > 24) {
    cancellationPolicy.value = {
      type: 'full',
      message: 'Estás cancelando con más de 24 horas de anticipación. Tienes derecho a un reembolso del 100% o saldo a favor.',
      color: 'emerald'
    }
  } else if (diffInHours > 0) {
    cancellationPolicy.value = {
      type: 'partial',
      message: 'Estás cancelando con menos de 24 horas de anticipación. Se aplicará una penalidad y recibirás un reembolso del 70%.',
      color: 'amber'
    }
  } else {
    cancellationPolicy.value = {
      type: 'none',
      message: 'La fecha de la cita ya pasó o está en curso. No califica para reembolso por inasistencia.',
      color: 'red'
    }
  }
  
  isCancelModalOpen.value = true
}

const closeCancelModal = () => {
  isCancelModalOpen.value = false
  appointmentToCancel.value = null
}

const confirmCancel = () => {
  if (appointmentToCancel.value) {
    const index = appointments.value.findIndex(a => a.id === appointmentToCancel.value.id)
    if (index !== -1) {
      appointments.value[index].status = 'cancelled'
      appointments.value[index].type = 'past'
    }
  }
  closeCancelModal()
}

// Utilidades
const formatDate = (dateString: string) => {
  const date = new Date(dateString + 'T00:00:00')
  return new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(date)
}

// Horarios de prueba para reprogramar
const availableTimes = ['08:00 AM', '09:00 AM', '10:30 AM', '02:00 PM', '04:00 PM']
</script>

<template>
  <div class="max-w-6xl mx-auto w-full px-4 sm:px-0 font-sans">
    
    <!-- Encabezado -->
    <div class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight">Mis Citas</h1>
        <p class="text-slate-500 mt-2 font-medium">Administra tus próximas consultas y revisa tu historial de atenciones.</p>
      </div>
      <router-link to="/agendar" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-blue-200 flex items-center gap-2">
        <PhPlus class="h-5 w-5" weight="bold" />
        Agendar nueva cita
      </router-link>
    </div>

    <!-- Pestañas (Tabs) -->
    <div class="flex items-center gap-6 border-b border-slate-200 mb-8">
      <button 
        @click="activeTab = 'upcoming'"
        class="pb-4 font-bold text-[15px] transition-all relative"
        :class="activeTab === 'upcoming' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'"
      >
        Próximas Citas
        <div v-if="activeTab === 'upcoming'" class="absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 rounded-t-full"></div>
      </button>
      <button 
        @click="activeTab = 'past'"
        class="pb-4 font-bold text-[15px] transition-all relative"
        :class="activeTab === 'past' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'"
      >
        Citas Pasadas
        <div v-if="activeTab === 'past'" class="absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 rounded-t-full"></div>
      </button>
    </div>

    <!-- Lista de Citas -->
    <div v-if="filteredAppointments.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <div 
        v-for="app in filteredAppointments" 
        :key="app.id"
        class="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
      >
        <!-- Card Header -->
        <div class="p-6 border-b border-slate-100 flex justify-between items-start gap-4 bg-slate-50/50">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl shrink-0">
              {{ app.doctor.charAt(4) }}
            </div>
            <div>
              <h3 class="font-bold text-slate-800 text-lg">{{ app.doctor }}</h3>
              <p class="text-sm font-medium text-blue-600">{{ app.specialty }}</p>
            </div>
          </div>
          
          <span 
            class="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg flex items-center gap-1.5"
            :class="{
              'bg-green-100 text-green-700': app.status === 'confirmed',
              'bg-amber-100 text-amber-700': app.status === 'pending',
              'bg-slate-200 text-slate-700': app.status === 'completed',
              'bg-red-100 text-red-700': app.status === 'cancelled'
            }"
          >
            <div class="w-1.5 h-1.5 rounded-full"
              :class="{
                'bg-green-500': app.status === 'confirmed',
                'bg-amber-500': app.status === 'pending',
                'bg-slate-500': app.status === 'completed',
                'bg-red-500': app.status === 'cancelled'
              }"
            ></div>
            {{ 
              app.status === 'confirmed' ? 'Confirmada' : 
              app.status === 'pending' ? 'Pendiente' : 
              app.status === 'completed' ? 'Atendida' : 'Cancelada' 
            }}
          </span>
        </div>

        <!-- Card Body -->
        <div class="p-6 flex-1">
          <div class="grid grid-cols-2 gap-y-6 gap-x-4">
            
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                <PhCalendarBlank class="h-4 w-4" />
              </div>
              <div>
                <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Fecha y Hora</p>
                <p class="text-sm font-semibold text-slate-800 capitalize">{{ formatDate(app.date) }}</p>
                <p class="text-sm font-medium text-slate-500">{{ app.time }}</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                <PhMapPin class="h-4 w-4" />
              </div>
              <div>
                <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Sede</p>
                <p class="text-sm font-semibold text-slate-800">{{ app.location }}</p>
                <p class="text-xs font-medium text-slate-500">Presencial</p>
              </div>
            </div>

          </div>
        </div>

        <!-- Card Footer / Acciones -->
        <div v-if="app.type === 'upcoming'" class="p-4 border-t border-slate-100 bg-slate-50 flex gap-3">
          <button @click="openRescheduleModal(app)" class="flex-1 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-blue-600 font-bold py-2.5 rounded-xl transition-colors text-sm">
            Reprogramar Cita
          </button>
          <button @click="openCancelModal(app)" class="flex-1 bg-white hover:bg-red-50 border border-slate-200 hover:border-red-200 text-red-600 font-bold py-2.5 rounded-xl transition-colors text-sm">
            Cancelar Cita
          </button>
        </div>
        <div v-else class="p-4 border-t border-slate-100 bg-slate-50 flex gap-3 justify-end">
          <button class="bg-white border border-slate-200 text-slate-600 font-bold py-2 px-4 rounded-xl text-sm opacity-50 cursor-not-allowed">
            Ver receta médica
          </button>
        </div>

      </div>

    </div>

    <!-- Empty State -->
    <div v-else class="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-3xl border border-dashed border-slate-300">
      <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
        <PhCalendarBlank class="h-10 w-10 text-slate-300" />
      </div>
      <h3 class="text-xl font-bold text-slate-700 mb-2">No tienes {{ activeTab === 'upcoming' ? 'próximas citas' : 'citas pasadas' }}</h3>
      <p class="text-slate-500 max-w-md">Cuando agendes una nueva consulta médica, aparecerá en esta sección.</p>
      <router-link v-if="activeTab === 'upcoming'" to="/agendar" class="mt-6 text-blue-600 font-bold hover:underline">
        Agendar mi primera cita &rarr;
      </router-link>
    </div>

    <!-- ============================================================== -->
    <!-- MODAL DE REPROGRAMACIÓN -->
    <!-- ============================================================== -->
    <div v-if="isRescheduleModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-[#111111]/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        
        <!-- Header del modal -->
        <div class="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h2 class="text-xl font-bold text-slate-800">Reprogramar Cita</h2>
            <p class="text-sm text-slate-500">{{ appointmentToReschedule?.doctor }}</p>
          </div>
          <button @click="closeRescheduleModal" class="bg-white hover:bg-slate-200 text-slate-500 p-2 rounded-full border border-slate-200 transition-colors">
            <PhX class="h-5 w-5" />
          </button>
        </div>

        <div class="p-8">
          <!-- Selector de Nueva Fecha -->
          <div class="mb-6">
            <label class="block text-sm font-bold text-slate-700 mb-3">1. Selecciona la nueva fecha:</label>
            <input 
              type="date" 
              v-model="newSelectedDate"
              class="w-full border border-slate-300 rounded-xl px-4 py-3 text-lg font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <!-- Selector de Nueva Hora -->
          <div class="mb-8">
            <label class="block text-sm font-bold text-slate-700 mb-3">2. Selecciona el nuevo horario:</label>
            <div class="grid grid-cols-3 gap-3">
              <button 
                v-for="time in availableTimes" 
                :key="time"
                @click="newSelectedTime = time"
                class="py-3 px-2 rounded-xl text-sm font-bold transition-all border"
                :class="newSelectedTime === time 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200 scale-105' 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-blue-50'"
              >
                {{ time }}
              </button>
            </div>
          </div>

          <!-- Alert/Warning -->
          <div class="flex items-start gap-3 bg-blue-50 p-4 rounded-xl border border-blue-100 mb-8">
            <PhInfo class="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
            <p class="text-xs font-medium text-blue-800">
              Al confirmar, tu cita anterior quedará liberada. Esta reprogramación no tiene costo adicional.
            </p>
          </div>

          <div class="flex gap-4">
            <button @click="closeRescheduleModal" class="flex-1 font-bold text-slate-600 hover:bg-slate-100 py-4 rounded-xl transition-colors">
              Cancelar
            </button>
            <button @click="confirmReschedule" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-colors">
              Confirmar cambio
            </button>
          </div>
        </div>

      </div>
    </div>

    <!-- ============================================================== -->
    <!-- MODAL DE CANCELACIÓN (POLÍTICAS DE REEMBOLSO)                  -->
    <!-- ============================================================== -->
    <div v-if="isCancelModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-[#111111]/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        
        <div class="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 class="text-xl font-bold text-slate-800">Cancelar Cita</h2>
          <button @click="closeCancelModal" class="bg-white hover:bg-slate-200 text-slate-500 p-2 rounded-full border border-slate-200 transition-colors">
            <PhX class="h-5 w-5" />
          </button>
        </div>

        <div class="p-8">
          <div class="mb-6">
            <p class="text-slate-600 font-medium mb-1">Cita con <strong>{{ appointmentToCancel?.doctor }}</strong></p>
            <p class="text-sm text-slate-500">{{ formatDate(appointmentToCancel?.date) }} a las {{ appointmentToCancel?.time }}</p>
          </div>

          <div 
            class="flex items-start gap-3 p-4 rounded-xl border mb-8"
            :class="{
              'bg-emerald-50 border-emerald-100 text-emerald-800': cancellationPolicy.type === 'full',
              'bg-amber-50 border-amber-100 text-amber-800': cancellationPolicy.type === 'partial',
              'bg-red-50 border-red-100 text-red-800': cancellationPolicy.type === 'none'
            }"
          >
            <!-- Ícono dinámico -->
            <PhCheckCircle v-if="cancellationPolicy.type === 'full'" class="h-6 w-6 text-emerald-600 shrink-0" weight="fill" />
            <PhWarning v-else-if="cancellationPolicy.type === 'partial'" class="h-6 w-6 text-amber-600 shrink-0" weight="fill" />
            <PhXCircle v-else class="h-6 w-6 text-red-600 shrink-0" weight="fill" />
            
            <div>
              <p class="text-sm font-bold uppercase tracking-wider mb-1" :class="`text-${cancellationPolicy.color}-700`">Política de Reembolso</p>
              <p class="text-sm font-medium">{{ cancellationPolicy.message }}</p>
            </div>
          </div>

          <div class="flex gap-4">
            <button @click="closeCancelModal" class="flex-1 font-bold text-slate-600 hover:bg-slate-100 py-4 rounded-xl transition-colors">
              Volver
            </button>
            <button @click="confirmCancel" class="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-200 transition-colors">
              Sí, cancelar cita
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style>
.font-sans {
  font-family: 'Inter', 'Poppins', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
</style>
