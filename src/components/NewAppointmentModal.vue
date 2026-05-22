<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close', 'schedule'])
const router = useRouter()

// --- ESTADO DEL FORMULARIO ---
const step = ref(1)
const selectedLocation = ref('')
const selectedSpecialty = ref('')
const selectedDoctor = ref<any>(null)
const selectedDate = ref('')
const selectedTime = ref('')
const reason = ref('')

// --- ESTADO DE LA PASARELA ---
const selectedPaymentTab = ref('billeteras')
const isQrGenerated = ref(false)
const isProcessingPayment = ref(false)

// --- TIMER DE PAGO (15 MINUTOS) ---
const paymentTimeLeft = ref(900)
let paymentTimerInterval: any = null

const qrTimeLeft = ref(300)
let timerInterval: any = null



const startQrTimer = () => {
  isQrGenerated.value = true
  qrTimeLeft.value = 300
  timerInterval = setInterval(() => {
    if (qrTimeLeft.value > 0) {
      qrTimeLeft.value--
    } else {
      clearInterval(timerInterval)
      isQrGenerated.value = false
    }
  }, 1000)
}

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

onUnmounted(() => {
  if (paymentTimerInterval) clearInterval(paymentTimerInterval)
  if (timerInterval) clearInterval(timerInterval)
})

// --- DATOS MOCK ---
const locations = [
  { id: '1', name: 'Sede San Isidro', address: 'Av. Javier Prado Este 456', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>' },
  { id: '2', name: 'Sede Miraflores', address: 'Av. José Pardo 789', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>' },
  { id: '3', name: 'Sede Los Olivos', address: 'Av. Carlos Izaguirre 123', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>' }
]

const specialties = [
  { id: '1', name: 'Medicina Interna', img: '/img/esp-medicina-interna.png', color: 'bg-blue-50 text-blue-600 border-blue-200', activeColor: 'border-blue-600 bg-blue-600 text-white' },
  { id: '2', name: 'Cardiología', img: '/img/esp-cardiologia.png', color: 'bg-rose-50 text-rose-600 border-rose-200', activeColor: 'border-rose-600 bg-rose-600 text-white' },
  { id: '3', name: 'Dermatología', img: '/img/esp-dermatologia.png', color: 'bg-amber-50 text-amber-600 border-amber-200', activeColor: 'border-amber-600 bg-amber-600 text-white' },
  { id: '4', name: 'Pediatría', img: '/img/esp-pediatria.png', color: 'bg-emerald-50 text-emerald-600 border-emerald-200', activeColor: 'border-emerald-600 bg-emerald-600 text-white' },
  { id: '5', name: 'Oftalmología', img: '/img/esp-oftalmologia.png', color: 'bg-violet-50 text-violet-600 border-violet-200', activeColor: 'border-violet-600 bg-violet-600 text-white' },
  { id: '6', name: 'Traumatología', img: '/img/esp-traumatologia.png', color: 'bg-cyan-50 text-cyan-600 border-cyan-200', activeColor: 'border-cyan-600 bg-cyan-600 text-white' },
]

const doctors = [
  { id: 1, name: 'Dr. Gregory House', specialty: 'Medicina Interna', avatar: 'https://ui-avatars.com/api/?name=Gregory+House&background=0D8ABC&color=fff', rating: 4.9, price: '150.00', location: 'Sede San Isidro', experience: '15 años' },
  { id: 2, name: 'Dra. Allison Cameron', specialty: 'Cardiología', avatar: 'https://ui-avatars.com/api/?name=Allison+Cameron&background=D946EF&color=fff', rating: 4.8, price: '120.00', location: 'Sede Miraflores', experience: '10 años' },
  { id: 3, name: 'Dr. Robert Chase', specialty: 'Cardiología', avatar: 'https://ui-avatars.com/api/?name=Robert+Chase&background=F59E0B&color=fff', rating: 4.7, price: '200.00', location: 'Sede San Isidro', experience: '12 años' },
  { id: 4, name: 'Dr. Eric Foreman', specialty: 'Medicina Interna', avatar: 'https://ui-avatars.com/api/?name=Eric+Foreman&background=10B981&color=fff', rating: 4.6, price: '130.00', location: 'Sede Los Olivos', experience: '8 años' },
  { id: 5, name: 'Dra. Lisa Cuddy', specialty: 'Medicina Interna', avatar: 'https://ui-avatars.com/api/?name=Lisa+Cuddy&background=6366F1&color=fff', rating: 4.9, price: '180.00', location: 'Sede San Isidro', experience: '20 años' },
]

// --- CALENDARIO COMPLETO CON NAVEGACIÓN POR MES ---
const calendarViewDate = ref(new Date())
const weekDaysShort = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

const calendarMonthLabel = computed(() => {
  const d = calendarViewDate.value
  const name = new Intl.DateTimeFormat('es-PE', { month: 'long', year: 'numeric' }).format(d)
  return name.charAt(0).toUpperCase() + name.slice(1)
})

const calendarDays = computed(() => {
  const year = calendarViewDate.value.getFullYear()
  const month = calendarViewDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const days: { date: Date; dateStr: string; dayNum: number; isCurrentMonth: boolean; isToday: boolean; isPast: boolean }[] = []

  let startOffset = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1
  const prevLastDay = new Date(year, month, 0).getDate()
  for (let i = startOffset - 1; i >= 0; i--) {
    const d = new Date(year, month - 1, prevLastDay - i)
    days.push({ date: d, dateStr: formatDateStr(d), dayNum: d.getDate(), isCurrentMonth: false, isToday: false, isPast: true })
  }
  const todayStr = formatDateStr(new Date())
  const today = new Date(); today.setHours(0,0,0,0)
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const d = new Date(year, month, i)
    const ds = formatDateStr(d)
    const dClean = new Date(year, month, i); dClean.setHours(0,0,0,0)
    days.push({ date: d, dateStr: ds, dayNum: i, isCurrentMonth: true, isToday: ds === todayStr, isPast: dClean < today })
  }
  const remaining = 42 - days.length
  for (let i = 1; i <= remaining; i++) {
    const d = new Date(year, month + 1, i)
    days.push({ date: d, dateStr: formatDateStr(d), dayNum: i, isCurrentMonth: false, isToday: false, isPast: false })
  }
  return days
})

function formatDateStr(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function prevCalMonth() {
  const d = calendarViewDate.value
  calendarViewDate.value = new Date(d.getFullYear(), d.getMonth() - 1, 1)
}
function nextCalMonth() {
  const d = calendarViewDate.value
  calendarViewDate.value = new Date(d.getFullYear(), d.getMonth() + 1, 1)
}
function selectCalDay(day: any) {
  if (day.isPast && !day.isToday) return
  selectedDate.value = day.dateStr
  if (!day.isCurrentMonth) {
    calendarViewDate.value = new Date(day.date.getFullYear(), day.date.getMonth(), 1)
  }
}

const selectedDateFormatted = computed(() => {
  if (!selectedDate.value) return ''
  const parts = selectedDate.value.split('-')
  const d = new Date(+parts[0], +parts[1] - 1, +parts[2])
  const name = new Intl.DateTimeFormat('es-PE', { weekday: 'long', day: 'numeric', month: 'long' }).format(d)
  return name.charAt(0).toUpperCase() + name.slice(1)
})

// --- HORARIOS CON ESTADOS (disponible / ocupado) ---
const timeSlots = computed(() => {
  // Simular ocupación dependiendo del día seleccionado
  const hash = selectedDate.value ? selectedDate.value.split('-').reduce((a, b) => a + parseInt(b), 0) : 0
  return [
    { time: '08:00 AM', status: hash % 3 === 0 ? 'occupied' : 'available' },
    { time: '09:00 AM', status: 'available' },
    { time: '09:30 AM', status: hash % 2 === 0 ? 'occupied' : 'available' },
    { time: '10:00 AM', status: 'occupied' },
    { time: '10:30 AM', status: 'available' },
    { time: '11:00 AM', status: hash % 4 === 1 ? 'occupied' : 'available' },
    { time: '11:30 AM', status: 'available' },
    { time: '02:00 PM', status: 'available' },
    { time: '02:30 PM', status: 'occupied' },
    { time: '03:00 PM', status: 'available' },
    { time: '04:00 PM', status: hash % 3 === 1 ? 'occupied' : 'available' },
    { time: '05:00 PM', status: 'available' },
  ]
})

const filteredDoctors = computed(() => {
  if (!selectedSpecialty.value || !selectedLocation.value) return []
  return doctors.filter(d => d.specialty === selectedSpecialty.value && d.location === selectedLocation.value)
})

// --- NAVEGACIÓN ---
const steps = [
  { id: 1, title: 'Servicio' },
  { id: 2, title: 'Médico' },
  { id: 3, title: 'Fecha' },
  { id: 4, title: 'Detalles' }
]

const nextStep = () => {
  if (step.value < 5) {
    step.value++
    if (step.value === 5) {
      // Iniciar el temporizador de 15 minutos al llegar al paso de pago
      paymentTimeLeft.value = 900
      if (paymentTimerInterval) clearInterval(paymentTimerInterval)
      paymentTimerInterval = setInterval(() => {
        if (paymentTimeLeft.value > 0) {
          paymentTimeLeft.value--
        } else {
          // Si expira el tiempo, cerrar el modal y cancelar reserva
          clearInterval(paymentTimerInterval)
          closeModal()
          alert("El tiempo de reserva ha expirado. Por favor, vuelve a intentarlo.")
        }
      }, 1000)
    }
  }
}
const prevStep = () => {
  if (step.value > 1) {
    step.value--
    if (step.value < 5 && paymentTimerInterval) {
      clearInterval(paymentTimerInterval) // Detener si retrocede
    }
  }
}

const changePaymentTab = (tab: string) => {
  selectedPaymentTab.value = tab
  isQrGenerated.value = false
}

const closeModal = () => {
  step.value = 1
  selectedLocation.value = ''
  selectedSpecialty.value = ''
  selectedDoctor.value = null
  selectedDate.value = ''
  selectedTime.value = ''
  reason.value = ''
  selectedPaymentTab.value = 'billeteras'
  isQrGenerated.value = false
  if (paymentTimerInterval) clearInterval(paymentTimerInterval)
  emit('close')
}

const processPayment = () => {
  isProcessingPayment.value = true
  setTimeout(() => {
    isProcessingPayment.value = false
    step.value = 6
    emit('schedule', {
      location: selectedLocation.value,
      specialty: selectedSpecialty.value,
      doctor: selectedDoctor.value?.name || 'Por asignar',
      date: selectedDate.value,
      time: selectedTime.value,
      reason: reason.value,
      paymentMethod: selectedPaymentTab.value,
      amount: selectedDoctor.value?.price || '100.00'
    })
  }, 2000)
}

const goToAppointments = () => {
  closeModal()
  router.push('/appointments')
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-[#111111]/80 backdrop-blur-sm p-4 transition-all duration-300">
    
    <!-- ============================================== -->
    <!-- MODAL DE SELECCIÓN DE CITA (Pasos 1 al 4)      -->
    <!-- ============================================== -->
    <div v-if="step < 5" class="bg-white rounded-[2rem] shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
      <!-- HEADER -->
      <div class="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-20">
        <div>
          <h2 class="text-2xl font-extrabold text-slate-800 tracking-tight">Nueva Cita</h2>
          <p class="text-sm text-slate-500 font-medium mt-1">Sigue los pasos para confirmar tu atención.</p>
        </div>
        <button @click="closeModal" class="bg-slate-50 hover:bg-slate-200 text-slate-500 p-2.5 rounded-full transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- BODY -->
      <div class="p-8 flex-1 overflow-y-auto bg-slate-50/50">
        <!-- Stepper -->
        <div class="flex items-center justify-between mb-10 relative px-2">
          <div class="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 rounded-full z-0"></div>
          <div class="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 rounded-full z-0 transition-all duration-500 ease-in-out" :style="{ width: `${((step - 1) / 3) * 100}%` }"></div>
          
          <div v-for="s in steps" :key="s.id" class="relative z-10 flex flex-col items-center gap-2 group">
            <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300"
                 :class="step >= s.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110' : 'bg-white text-slate-400 border-2 border-slate-200'">
              <svg v-if="step > s.id" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <span v-else>{{ s.id }}</span>
            </div>
            <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider hidden sm:block transition-colors" :class="{ 'text-blue-700': step >= s.id }">
              {{ s.title }}
            </span>
          </div>
        </div>

        <!-- PASO 1: SEDE Y ESPECIALIDAD -->
        <div v-if="step === 1" class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div>
            <div class="flex items-center gap-2 mb-4">
              <div class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" /></svg>
              </div>
              <h3 class="text-base font-extrabold text-slate-800">Selecciona la Sede</h3>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button v-for="loc in locations" :key="loc.id"
                @click="selectedLocation = loc.name; selectedDoctor = null"
                class="text-left p-4 rounded-2xl border-2 transition-all duration-200 outline-none flex items-center gap-3"
                :class="selectedLocation === loc.name ? 'border-indigo-600 bg-indigo-50 shadow-md shadow-indigo-100' : 'border-slate-200 bg-white hover:border-indigo-300'">
                <div v-html="loc.icon"></div>
                <div>
                  <h4 class="font-bold text-slate-800 text-sm" :class="{ 'text-indigo-700': selectedLocation === loc.name }">{{ loc.name }}</h4>
                  <p class="text-xs text-slate-500 mt-0.5">{{ loc.address }}</p>
                </div>
              </button>
            </div>
          </div>
          <div v-if="selectedLocation">
            <div class="flex items-center gap-2 mb-4 border-t border-slate-200 pt-8">
              <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" /></svg>
              </div>
              <h3 class="text-base font-extrabold text-slate-800">Especialidad</h3>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <button v-for="sp in specialties" :key="sp.id"
                @click="selectedSpecialty = sp.name; selectedDoctor = null"
                class="flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 outline-none group"
                :class="selectedSpecialty === sp.name ? sp.activeColor + ' shadow-lg scale-[1.03]' : 'border-slate-200 bg-white hover:shadow-sm'">
                <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-2 transition-transform group-hover:scale-110 overflow-hidden"
                  :class="selectedSpecialty === sp.name ? 'bg-white/20' : sp.color">
                  <img :src="sp.img" :alt="sp.name" class="w-8 h-8 object-contain" />
                </div>
                <span class="text-xs sm:text-sm font-bold text-center leading-tight" :class="selectedSpecialty === sp.name ? 'text-white' : 'text-slate-700 group-hover:text-blue-700'">{{ sp.name }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- PASO 2: MÉDICO -->
        <div v-if="step === 2" class="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
          <h3 class="text-lg font-extrabold text-slate-800 mb-2">Médicos en {{ selectedLocation }}</h3>
          <p class="text-sm text-slate-500 mb-6">Especialidad: <strong class="text-slate-700">{{ selectedSpecialty }}</strong></p>
          <div v-if="filteredDoctors.length === 0" class="text-center py-10 bg-white rounded-3xl border border-slate-200">
            <p class="text-slate-500 font-medium">No hay médicos disponibles para esta especialidad en la sede seleccionada.</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button v-for="doc in filteredDoctors" :key="doc.id"
              @click="selectedDoctor = doc"
              class="w-full flex items-center p-4 rounded-2xl border-2 transition-all duration-200 text-left outline-none group"
              :class="selectedDoctor?.id === doc.id ? 'border-blue-600 bg-blue-50 shadow-md shadow-blue-100 ring-4 ring-blue-50' : 'border-slate-200 bg-white hover:border-blue-300'">
              <img :src="doc.avatar" alt="Doctor" class="w-16 h-16 rounded-full border-2 border-slate-100 shadow-sm object-cover mr-4 group-hover:border-blue-200 transition-colors" />
              <div class="flex-1">
                <h4 class="font-extrabold text-slate-800 text-base mb-0.5 group-hover:text-blue-700 transition-colors">{{ doc.name }}</h4>
                <div class="flex items-center text-yellow-500 text-xs font-bold mb-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-0.5" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  {{ doc.rating }}
                </div>
                <span class="inline-block px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-extrabold rounded-lg">S/ {{ doc.price }}</span>
              </div>
            </button>
          </div>
        </div>

        <!-- PASO 3: FECHA Y HORA -->
        <div v-if="step === 3" class="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
          <!-- Mini Calendario completo -->
          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <!-- Header del calendario -->
            <div class="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50">
              <button @click="prevCalMonth" class="p-2 rounded-xl hover:bg-slate-200 text-slate-500 hover:text-blue-600 transition-all outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
              </button>
              <span class="font-bold text-slate-800 text-sm">{{ calendarMonthLabel }}</span>
              <button @click="nextCalMonth" class="p-2 rounded-xl hover:bg-slate-200 text-slate-500 hover:text-blue-600 transition-all outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
            <!-- Días de la semana -->
            <div class="grid grid-cols-7 px-3 pt-3 pb-1">
              <div v-for="d in weekDaysShort" :key="d" class="text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider py-1">{{ d }}</div>
            </div>
            <!-- Cuadrícula de días -->
            <div class="grid grid-cols-7 gap-y-1 px-3 pb-3">
              <button
                v-for="day in calendarDays" :key="day.dateStr"
                @click="selectCalDay(day)"
                :disabled="day.isPast && !day.isToday"
                class="relative flex items-center justify-center aspect-square rounded-xl text-sm transition-all duration-150 outline-none"
                :class="[
                  !day.isCurrentMonth ? 'text-slate-200' : '',
                  day.isPast && !day.isToday ? 'text-slate-300 cursor-not-allowed' : '',
                  day.isCurrentMonth && !day.isPast ? 'hover:bg-blue-50 hover:text-blue-700 cursor-pointer' : '',
                  selectedDate === day.dateStr ? '!bg-blue-600 !text-white font-bold shadow-md shadow-blue-200 scale-105' : '',
                  day.isToday && selectedDate !== day.dateStr ? 'bg-blue-50 text-blue-600 font-bold ring-2 ring-blue-200 ring-inset' : '',
                  !day.isToday && selectedDate !== day.dateStr && day.isCurrentMonth && !day.isPast ? 'text-slate-700 font-medium' : ''
                ]">
                {{ day.dayNum }}
              </button>
            </div>
          </div>

          <!-- Horarios con estados -->
          <div v-if="selectedDate">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-base font-extrabold text-slate-800">
                Horarios — <span class="text-blue-600 font-bold text-sm">{{ selectedDateFormatted }}</span>
              </h3>
              <!-- Leyenda -->
              <div class="flex items-center gap-3 text-[11px] font-medium text-slate-500">
                <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span>Libre</span>
                <span class="flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block"></span>Ocupado</span>
              </div>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <button
                v-for="slot in timeSlots" :key="slot.time"
                @click="slot.status === 'available' && (selectedTime = slot.time)"
                :disabled="slot.status === 'occupied'"
                class="px-3 py-3 rounded-xl border-2 font-semibold transition-all outline-none text-center text-sm flex items-center justify-center gap-2"
                :class="[
                  slot.status === 'occupied'
                    ? 'border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed line-through'
                    : selectedTime === slot.time
                      ? 'border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-200'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700'
                ]">
                <span v-if="slot.status === 'occupied'" class="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span>
                <span v-else-if="selectedTime !== slot.time" class="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                {{ slot.time }}
              </button>
            </div>
          </div>
          <div v-else class="flex flex-col items-center justify-center py-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-slate-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5"/></svg>
            <p class="text-sm text-slate-400 font-medium">Selecciona un día en el calendario</p>
          </div>
        </div>

        <!-- PASO 4: DETALLES -->
        <div v-if="step === 4" class="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
          <div class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-7 text-white shadow-xl relative overflow-hidden">
            <div class="absolute -right-20 -top-20 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
            <div class="absolute -left-20 -bottom-20 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
            <h4 class="text-slate-300 font-bold text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" /></svg>
              Resumen de Cita
            </h4>
            <div class="flex items-center gap-5 mb-8">
              <img :src="selectedDoctor?.avatar" class="w-20 h-20 rounded-2xl border-2 border-white/20 object-cover shadow-lg" />
              <div>
                <h3 class="font-extrabold text-2xl mb-1">{{ selectedDoctor?.name }}</h3>
                <p class="text-blue-300 font-bold text-sm">{{ selectedSpecialty }}</p>
                <p class="text-slate-400 text-xs mt-1">{{ selectedLocation }}</p>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
              <div class="bg-white/5 rounded-xl p-3 border border-white/10">
                <p class="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Fecha Programada</p>
                <p class="font-bold text-sm">{{ selectedDateFormatted || selectedDate }}</p>
              </div>
              <div class="bg-white/5 rounded-xl p-3 border border-white/10">
                <p class="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Hora de Atención</p>
                <p class="font-bold text-sm">{{ selectedTime }}</p>
              </div>
            </div>
          </div>
          <div>
            <label class="block text-sm font-extrabold text-slate-800 mb-2">Motivo de la consulta (Opcional)</label>
            <textarea v-model="reason" rows="3" class="w-full bg-white border-2 border-slate-200 text-slate-700 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all resize-none shadow-sm" placeholder="Describa brevemente sus síntomas o razón de la visita..."></textarea>
          </div>
        </div>
      </div>

      <!-- FOOTER -->
      <div class="px-4 sm:px-8 py-4 sm:py-5 border-t border-slate-100 bg-white flex justify-between items-center sticky bottom-0 z-20">
        <button @click="prevStep" class="px-4 sm:px-6 py-2.5 sm:py-3 text-sm font-extrabold text-slate-400 hover:text-slate-800 transition-colors rounded-xl hover:bg-slate-50" :class="{ 'invisible': step === 1 }">
          ← Volver
        </button>
        <button @click="nextStep" :disabled="(step === 1 && (!selectedLocation || !selectedSpecialty)) || (step === 2 && !selectedDoctor) || (step === 3 && (!selectedDate || !selectedTime))"
          class="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white px-5 sm:px-8 py-3 sm:py-3.5 rounded-xl font-extrabold text-sm transition-all shadow-lg shadow-blue-200/50 active:scale-95 disabled:shadow-none flex items-center gap-2">
          <span v-if="step < 4">Continuar</span>
          <span v-else>Proceder al Pago</span>
          <svg v-if="step < 4" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
        </button>
      </div>
    </div>


    <!-- ============================================== -->
    <!-- MODAL DE PASARELA DE PAGOS (TIPO CULQI) PASO 5 -->
    <!-- ============================================== -->
    <div v-if="step === 5" class="bg-[#FFFFFF] rounded-xl shadow-2xl w-full max-w-[1000px] h-[700px] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 font-sans relative">
      <!-- Banner de Temporizador -->
      <div class="bg-amber-50 border-b border-amber-200 py-2 px-4 flex items-center justify-center gap-2 z-50 shadow-sm shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span class="text-sm font-bold text-amber-800">Tienes <span class="font-black text-amber-600 text-base">{{ formatTime(paymentTimeLeft) }}</span> minutos para completar el pago y asegurar tu cita.</span>
      </div>
      
      <!-- HEADER NEGRO -->
      <div class="h-[80px] bg-[#111111] shrink-0 flex justify-between items-center px-8 rounded-t-xl">
        <div class="flex items-center gap-4">
          <img :src="'/img/quilqui.png'" alt="Quilqui" class="h-8 object-contain" />
        </div>
        
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#00B5AD]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
            <span class="text-[#00B5AD] font-bold text-[28px]">S/. {{ selectedDoctor?.price || '100.00' }}</span>
          </div>
          <button @click="closeModal" class="text-white/60 hover:text-white transition-colors p-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>

      <!-- CUERPO DIVIDIDO 30% / 70% -->
      <div class="flex flex-1 overflow-hidden">
        
        <!-- SIDEBAR (30%) -->
        <div class="w-[30%] bg-[#F8F8F8] border-r border-slate-200 flex flex-col justify-between shrink-0">
          <div class="py-2">
            
            <button @click="changePaymentTab('tarjeta')" class="w-full text-left px-6 py-5 flex items-center gap-4 transition-colors group relative" :class="selectedPaymentTab === 'tarjeta' ? 'text-[#00B5AD] bg-white shadow-sm' : 'text-[#555555] hover:bg-black/5'">
              <div v-if="selectedPaymentTab === 'tarjeta'" class="absolute left-0 top-0 bottom-0 w-[4px] bg-[#00B5AD]"></div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 opacity-70 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
              <span class="font-medium text-[15px]" :class="{ 'font-semibold': selectedPaymentTab === 'tarjeta' }">Tarjeta débito / crédito</span>
            </button>
            
            <button @click="changePaymentTab('yape')" class="w-full text-left px-6 py-5 flex items-center gap-4 transition-colors group relative" :class="selectedPaymentTab === 'yape' ? 'text-[#00B5AD] bg-white shadow-sm' : 'text-[#555555] hover:bg-black/5'">
              <div v-if="selectedPaymentTab === 'yape'" class="absolute left-0 top-0 bottom-0 w-[4px] bg-[#00B5AD]"></div>
               <img :src="'/img/yape.png'" alt="Yape" class="w-6 h-6 object-contain opacity-90 group-hover:opacity-100" />
              <span class="font-medium text-[15px]" :class="{ 'font-semibold': selectedPaymentTab === 'yape' }">Yape</span>
            </button>
            
            <button @click="changePaymentTab('billeteras')" class="w-full text-left px-6 py-5 flex items-center gap-4 transition-colors group relative" :class="selectedPaymentTab === 'billeteras' ? 'text-[#00B5AD] bg-white shadow-sm' : 'text-[#555555] hover:bg-black/5'">
              <div v-if="selectedPaymentTab === 'billeteras'" class="absolute left-0 top-0 bottom-0 w-[4px] bg-[#00B5AD]"></div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 opacity-70 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              <span class="font-medium text-[15px]" :class="{ 'font-semibold': selectedPaymentTab === 'billeteras' }">Billeteras móviles</span>
            </button>

            <button @click="changePaymentTab('banca')" class="w-full text-left px-6 py-5 flex items-center gap-4 transition-colors group relative" :class="selectedPaymentTab === 'banca' ? 'text-[#00B5AD] bg-white shadow-sm' : 'text-[#555555] hover:bg-black/5'">
              <div v-if="selectedPaymentTab === 'banca'" class="absolute left-0 top-0 bottom-0 w-[4px] bg-[#00B5AD]"></div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 opacity-70 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <span class="font-medium text-[15px]" :class="{ 'font-semibold': selectedPaymentTab === 'banca' }">Banca móvil o internet</span>
            </button>

            <button @click="changePaymentTab('agentes')" class="w-full text-left px-6 py-5 flex items-center gap-4 transition-colors group relative" :class="selectedPaymentTab === 'agentes' ? 'text-[#00B5AD] bg-white shadow-sm' : 'text-[#555555] hover:bg-black/5'">
               <div v-if="selectedPaymentTab === 'agentes'" class="absolute left-0 top-0 bottom-0 w-[4px] bg-[#00B5AD]"></div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 opacity-70 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              <span class="font-medium text-[15px]" :class="{ 'font-semibold': selectedPaymentTab === 'agentes' }">Agentes y bodegas</span>
            </button>

            <button @click="changePaymentTab('cuotealo')" class="w-full text-left px-6 py-5 flex items-center gap-4 transition-colors group relative" :class="selectedPaymentTab === 'cuotealo' ? 'text-[#00B5AD] bg-white shadow-sm' : 'text-[#555555] hover:bg-black/5'">
               <div v-if="selectedPaymentTab === 'cuotealo'" class="absolute left-0 top-0 bottom-0 w-[4px] bg-[#00B5AD]"></div>
               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 opacity-70 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span class="font-medium text-[15px]" :class="{ 'font-semibold': selectedPaymentTab === 'cuotealo' }">Cuotéalo BCP</span>
            </button>
          </div>

          <div class="px-6 pb-6 pt-4 text-center">
            <span class="text-xs text-[#555555] opacity-60 font-medium">Powered by</span>
            <div class="mt-2 flex justify-center mx-auto">
              <img :src="'/img/quilqui.png'" alt="Quilqui" class="h-6 object-contain opacity-70 grayscale" />
            </div>
          </div>
        </div>

        <!-- CONTENIDO PRINCIPAL (70%) -->
        <div class="w-[70%] p-[50px] flex flex-col bg-white overflow-y-auto relative">
          
          <!-- TAB: TARJETA -->
          <div v-if="selectedPaymentTab === 'tarjeta'" class="flex flex-col h-full animate-in fade-in duration-300">
            <h3 class="text-[#555555] font-semibold text-[20px] mb-8">Paga de forma segura con tu tarjeta:</h3>
            <div class="space-y-5">
              <div>
                <label class="block text-sm font-medium text-[#555] mb-2">Número de tarjeta</label>
                <div class="relative">
                  <input type="text" placeholder="0000 0000 0000 0000" class="w-full border border-slate-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:border-[#00B5AD] focus:ring-1 focus:ring-[#00B5AD] transition-all" />
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-5">
                <div>
                  <label class="block text-sm font-medium text-[#555] mb-2">Vencimiento</label>
                  <input type="text" placeholder="MM / AA" class="w-full border border-slate-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:border-[#00B5AD] focus:ring-1 focus:ring-[#00B5AD] transition-all" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-[#555] mb-2">CVV</label>
                  <div class="relative">
                    <input type="text" placeholder="123" class="w-full border border-slate-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:border-[#00B5AD] focus:ring-1 focus:ring-[#00B5AD] transition-all" />
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-[#555] mb-2">Titular de la tarjeta</label>
                <input type="text" placeholder="Como aparece en la tarjeta" class="w-full border border-slate-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:border-[#00B5AD] focus:ring-1 focus:ring-[#00B5AD] transition-all" />
              </div>
            </div>
            
            <div class="mt-auto flex justify-end">
              <button @click="processPayment" :disabled="isProcessingPayment" class="w-full sm:w-[350px] h-[80px] bg-[#00B5AD] hover:bg-[#009b94] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-lg rounded-lg transition-colors duration-200 shadow-md flex items-center justify-center gap-2">
                <span v-if="isProcessingPayment" class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                {{ isProcessingPayment ? 'Procesando pago...' : `Pagar S/. ${selectedDoctor?.price || '100.00'}` }}
              </button>
            </div>
          </div>

          <!-- TAB: YAPE DIRECTO -->
          <div v-if="selectedPaymentTab === 'yape'" class="flex flex-col h-full animate-in fade-in duration-300">
            <h3 class="text-[#555555] font-semibold text-[20px] mb-8">Paga directamente con Yape:</h3>
            <div class="flex items-center gap-4 bg-purple-50 border border-purple-100 rounded-xl p-4 mb-8">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 overflow-hidden bg-[#740F69]">
                <img :src="'/img/yape.png'" alt="Yape" class="w-full h-full object-contain p-1" />
              </div>
              <p class="text-sm text-purple-900 font-medium">No necesitas escanear QR. Ingresa el celular afiliado a tu Yape y el código de aprobación que obtienes en tu app.</p>
            </div>

            <div class="space-y-6 max-w-md">
              <div>
                <label class="block text-sm font-medium text-[#555] mb-2">Número de celular Yape</label>
                <input type="text" placeholder="999 999 999" class="w-full border border-slate-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:border-[#00B5AD] focus:ring-1 focus:ring-[#00B5AD] transition-all" />
              </div>
              <div>
                <label class="block text-sm font-medium text-[#555] mb-2">Código de aprobación (6 dígitos)</label>
                <input type="text" placeholder="000000" class="w-full border border-slate-300 rounded-lg px-4 py-3 text-lg text-center tracking-[0.5em] font-bold focus:outline-none focus:border-[#00B5AD] focus:ring-1 focus:ring-[#00B5AD] transition-all" />
                <a href="#" class="text-[#00B5AD] text-sm mt-2 block font-medium hover:underline">¿Cómo obtengo mi código de aprobación?</a>
              </div>
            </div>

            <div class="mt-auto flex justify-end">
              <button @click="processPayment" :disabled="isProcessingPayment" class="w-full sm:w-[350px] h-[80px] bg-[#00B5AD] hover:bg-[#009b94] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-lg rounded-lg transition-colors duration-200 shadow-md flex items-center justify-center gap-2">
                <span v-if="isProcessingPayment" class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                {{ isProcessingPayment ? 'Procesando pago...' : `Pagar S/. ${selectedDoctor?.price || '100.00'}` }}
              </button>
            </div>
          </div>

          <!-- TAB: BILLETERAS MÓVILES (CON GENERACIÓN DE QR) -->
          <div v-if="selectedPaymentTab === 'billeteras'" class="flex flex-col h-full animate-in fade-in duration-300">
            <h3 class="text-[#555555] font-semibold text-[20px] mb-8">Paga con tu código QR desde tu billetera móvil favorita:</h3>
            
            <div v-if="!isQrGenerated" class="animate-in fade-in zoom-in-95 duration-300">
              <!-- Grid Responsive de Billeteras -->
              <div class="grid grid-cols-5 gap-5 mb-3">
                <div class="w-[80px] h-[80px] bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-center border border-slate-100 hover:shadow-[0_4px_12px_rgba(0,181,173,0.15)] transition-all cursor-pointer">
                  <img :src="'/img/yape.png'" alt="Yape" class="w-10 h-10 object-contain" />
                </div>
                 <div class="w-[80px] h-[80px] bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-center border border-slate-100 hover:shadow-[0_4px_12px_rgba(0,181,173,0.15)] transition-all cursor-pointer">
                  <img :src="'/img/plin.png'" alt="Plin" class="w-10 h-10 object-contain" />
                </div>
                 <div class="w-[80px] h-[80px] bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-center border border-slate-100 hover:shadow-[0_4px_12px_rgba(0,181,173,0.15)] transition-all cursor-pointer">
                  <span class="font-bold text-[#004481] text-xs">BBVA</span>
                </div>
                 <div class="w-[80px] h-[80px] bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-center border border-slate-100 hover:shadow-[0_4px_12px_rgba(0,181,173,0.15)] transition-all cursor-pointer p-2 text-center">
                  <span class="font-bold text-[#ED1C24] text-[11px] leading-tight">Scotiabank</span>
                </div>
                 <div class="w-[80px] h-[80px] bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-center border border-slate-100 hover:shadow-[0_4px_12px_rgba(0,181,173,0.15)] transition-all cursor-pointer p-2 text-center">
                  <span class="font-bold text-[#00A4E4] text-[11px] leading-tight">Interbank</span>
                </div>
                 <div class="w-[80px] h-[80px] bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-center border border-slate-100 hover:shadow-[0_4px_12px_rgba(0,181,173,0.15)] transition-all cursor-pointer">
                  <span class="font-extrabold text-indigo-700 text-sm">Ligo</span>
                </div>
                 <div class="w-[80px] h-[80px] bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-center border border-slate-100 hover:shadow-[0_4px_12px_rgba(0,181,173,0.15)] transition-all cursor-pointer">
                  <span class="font-bold text-sky-500 text-xs">BanBif</span>
                </div>
                 <div class="w-[80px] h-[80px] bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-center border border-slate-100 hover:shadow-[0_4px_12px_rgba(0,181,173,0.15)] transition-all cursor-pointer">
                  <span class="font-bold text-pink-500 text-sm">Tunki</span>
                </div>
              </div>
              <p class="text-[11px] text-[#555555] opacity-70 font-medium text-right mb-auto">vía PagoEfectivo</p>
            </div>

            <!-- SIMULACIÓN DE QR GENERADO -->
            <div v-if="isQrGenerated" class="flex flex-col items-center justify-center flex-1 animate-in slide-in-from-bottom-8 duration-500">
              <div class="p-4 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-100 mb-6">
                <!-- Imagen mock de QR -->
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PagoEfectivoSimulation" alt="Código QR" class="w-48 h-48 rounded-lg" />
              </div>
              <p class="text-sm font-semibold text-slate-700 mb-2">Escanea el código para pagar</p>
              <div class="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span class="font-bold text-slate-700 font-mono">{{ formatTime(qrTimeLeft) }}</span>
              </div>
            </div>

            <div class="mt-auto flex justify-end gap-4">
              <button v-if="isQrGenerated" @click="processPayment" :disabled="isProcessingPayment" class="w-full sm:w-[350px] h-[80px] bg-[#00B5AD] hover:bg-[#009b94] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-lg rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                <span v-if="isProcessingPayment" class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                {{ isProcessingPayment ? 'Verificando...' : 'Ya realicé el pago' }}
              </button>
              <button v-else @click="startQrTimer" class="w-full sm:w-[350px] h-[80px] bg-[#00B5AD] hover:bg-[#009b94] text-white font-bold text-lg rounded-lg transition-colors duration-200 shadow-md">
                Generar código QR
              </button>
            </div>
          </div>

          <!-- TAB: BANCA MÓVIL O INTERNET -->
          <div v-if="selectedPaymentTab === 'banca'" class="flex flex-col h-full animate-in fade-in duration-300">
            <h3 class="text-[#555555] font-semibold text-[20px] mb-8">Paga desde la App de tu banco o Banca por Internet:</h3>
            <p class="text-sm text-[#555] mb-6">Selecciona el banco desde el cual realizarás la transferencia para generarte un código CIP.</p>
            
            <div class="grid grid-cols-4 gap-4 mb-8">
              <div class="h-16 bg-white border border-slate-200 rounded-lg flex items-center justify-center font-bold text-[#004481] hover:border-[#004481] cursor-pointer">BBVA</div>
              <div class="h-16 bg-white border border-slate-200 rounded-lg flex items-center justify-center font-bold text-[#0039A6] hover:border-[#0039A6] cursor-pointer">BCP</div>
              <div class="h-16 bg-white border border-slate-200 rounded-lg flex items-center justify-center font-bold text-[#00A4E4] text-sm hover:border-[#00A4E4] cursor-pointer">Interbank</div>
              <div class="h-16 bg-white border border-slate-200 rounded-lg flex items-center justify-center font-bold text-[#ED1C24] text-xs hover:border-[#ED1C24] cursor-pointer">Scotiabank</div>
            </div>

            <div class="mt-auto flex justify-end">
              <button @click="processPayment" :disabled="isProcessingPayment" class="w-full sm:w-[350px] h-[80px] bg-[#00B5AD] hover:bg-[#009b94] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-lg rounded-lg transition-colors duration-200 shadow-md flex items-center justify-center gap-2">
                <span v-if="isProcessingPayment" class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                {{ isProcessingPayment ? 'Generando...' : 'Generar código CIP' }}
              </button>
            </div>
          </div>

          <!-- TAB: AGENTES -->
          <div v-if="selectedPaymentTab === 'agentes'" class="flex flex-col h-full animate-in fade-in duration-300">
            <h3 class="text-[#555555] font-semibold text-[20px] mb-6">Paga en efectivo en agentes y bodegas:</h3>
            <div class="bg-amber-50 border border-amber-100 rounded-xl p-5 mb-8">
              <h4 class="font-bold text-amber-900 mb-2">¿Cómo funciona?</h4>
              <ol class="list-decimal list-inside text-amber-800 text-sm space-y-2">
                <li>Genera tu código de pago haciendo clic en el botón de abajo.</li>
                <li>Acércate al agente o bodega más cercana.</li>
                <li>Indica que vas a realizar un pago a "PagoEfectivo".</li>
                <li>Brinda el código generado y realiza el abono en efectivo.</li>
              </ol>
            </div>

            <div class="mt-auto flex justify-end">
              <button @click="processPayment" :disabled="isProcessingPayment" class="w-full sm:w-[350px] h-[80px] bg-[#00B5AD] hover:bg-[#009b94] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-lg rounded-lg transition-colors duration-200 shadow-md flex items-center justify-center gap-2">
                <span v-if="isProcessingPayment" class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                {{ isProcessingPayment ? 'Generando...' : 'Obtener código de pago' }}
              </button>
            </div>
          </div>

          <!-- TAB: CUOTÉALO BCP -->
          <div v-if="selectedPaymentTab === 'cuotealo'" class="flex flex-col h-full animate-in fade-in duration-300">
            <h3 class="text-[#555555] font-semibold text-[20px] mb-8">Paga en cuotas sin tarjeta de crédito:</h3>
            <div class="flex items-start gap-4 mb-8">
              <div class="w-12 h-12 rounded-full bg-[#FF7800] flex items-center justify-center text-white shrink-0 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <h4 class="font-bold text-slate-800 text-lg mb-1">Cuotéalo BCP</h4>
                <p class="text-sm text-slate-500 leading-relaxed">Divide el pago de tu consulta médica en hasta 36 cuotas. No necesitas tener una tarjeta de crédito, solo evaluaremos tu DNI al instante.</p>
              </div>
            </div>

            <div class="max-w-md">
              <label class="block text-sm font-medium text-[#555] mb-2">Ingresa tu número de DNI para evaluar</label>
              <input type="text" placeholder="00000000" class="w-full border border-slate-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:border-[#FF7800] focus:ring-1 focus:ring-[#FF7800] transition-all" />
            </div>

            <div class="mt-auto flex justify-end">
              <button @click="processPayment" :disabled="isProcessingPayment" class="w-full sm:w-[350px] h-[80px] bg-[#FF7800] hover:bg-[#e66c00] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-lg rounded-lg transition-colors duration-200 shadow-md shadow-[#FF7800]/20 flex items-center justify-center gap-2">
                <span v-if="isProcessingPayment" class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                {{ isProcessingPayment ? 'Evaluando...' : 'Evaluar y Continuar' }}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- ============================================== -->
    <!-- MODAL DE ÉXITO (PASO 6)                        -->
    <!-- ============================================== -->
    <div v-if="step === 6" class="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-10 flex flex-col items-center text-center animate-in zoom-in-95 duration-500 font-sans relative overflow-hidden">
      <!-- Decorative background glow -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-emerald-50 to-transparent pointer-events-none rounded-t-3xl"></div>
      
      <!-- Check Icon -->
      <div class="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(16,185,129,0.2)] animate-bounce-short z-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 class="text-3xl font-extrabold text-slate-800 tracking-tight mb-2 z-10">¡Cita Confirmada!</h2>
      <p class="text-slate-500 font-medium mb-8 z-10">Tu reserva y pago se han procesado exitosamente.</p>

      <!-- Summary Card -->
      <div class="w-full bg-slate-50 border border-slate-100 rounded-2xl p-6 text-left mb-8 z-10">
        <div class="flex items-center justify-between mb-4 pb-4 border-b border-slate-200">
          <span class="text-sm font-semibold text-slate-400 uppercase tracking-wider">Monto Pagado</span>
          <span class="text-xl font-black text-slate-800">S/. {{ selectedDoctor?.price || '100.00' }}</span>
        </div>
        
        <div class="space-y-4">
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <div>
              <p class="text-sm font-bold text-slate-800">{{ selectedDoctor?.name || 'Por asignar' }}</p>
              <p class="text-xs font-medium text-slate-500">{{ selectedSpecialty }}</p>
            </div>
          </div>
          
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <p class="text-sm font-bold text-slate-800">{{ selectedDate }} a las {{ selectedTime }}</p>
              <p class="text-xs font-medium text-slate-500">{{ selectedLocation }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="w-full space-y-3 z-10">
        <button @click="goToAppointments" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-blue-200">
          Ver mis citas
        </button>
        <button @click="closeModal" class="w-full bg-white hover:bg-slate-50 text-slate-500 font-bold py-4 rounded-xl border border-slate-200 transition-colors">
          Cerrar
        </button>
      </div>
    </div>

  </div>
</template>

<style>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.font-sans {
  font-family: 'Inter', 'Poppins', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
</style>
