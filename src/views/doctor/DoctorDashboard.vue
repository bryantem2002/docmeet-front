<script setup lang="ts">
import { ref, computed } from 'vue'
import { PhUsers, PhCheckCircle, PhCalendarCheck, PhFolderOpen, PhClock, PhUser, PhCheck, PhFileText, PhX, PhPlus, PhPrinter } from '@phosphor-icons/vue'

// --- ESTADOS MOCK DE CITAS DEL DOCTOR ---
const todayAppointments = ref([
  { id: 101, patient: 'Carlos Pérez', time: '09:00 AM', type: 'Presencial', status: 'confirmed', hasDiagnosis: false, hasPrescription: false },
  { id: 102, patient: 'Ana Gómez', time: '10:30 AM', type: 'Virtual', status: 'attended', hasDiagnosis: true, hasPrescription: false },
  { id: 103, patient: 'Luis Rodríguez', time: '02:00 PM', type: 'Presencial', status: 'no_show', hasDiagnosis: false, hasPrescription: false },
  { id: 104, patient: 'María Flores', time: '04:00 PM', type: 'Presencial', status: 'confirmed', hasDiagnosis: false, hasPrescription: false }
])

// --- MÉTRICAS KPI ---
const metrics = computed(() => {
  return {
    attended: todayAppointments.value.filter(a => a.status === 'attended').length,
    noShows: todayAppointments.value.filter(a => a.status === 'no_show').length,
    rescheduled: todayAppointments.value.filter(a => a.status === 'reschedule_requested').length,
    prescriptions: todayAppointments.value.filter(a => a.hasPrescription).length,
  }
})

// --- ACCIONES DE ESTADO ---
const markAsAttended = (id: number) => {
  const index = todayAppointments.value.findIndex(a => a.id === id)
  if (index !== -1) todayAppointments.value[index].status = 'attended'
}

const markAsNoShow = (id: number) => {
  const index = todayAppointments.value.findIndex(a => a.id === id)
  if (index !== -1) todayAppointments.value[index].status = 'no_show'
}

// --- MODAL DE REPROGRAMACIÓN (SOLICITUD) ---
const isRescheduleModalOpen = ref(false)
const appointmentToReschedule = ref<any>(null)
const rescheduleReason = ref('')

const openRescheduleModal = (app: any) => {
  appointmentToReschedule.value = app
  rescheduleReason.value = ''
  isRescheduleModalOpen.value = true
}

const submitRescheduleRequest = () => {
  if (appointmentToReschedule.value && rescheduleReason.value) {
    const index = todayAppointments.value.findIndex(a => a.id === appointmentToReschedule.value.id)
    if (index !== -1) todayAppointments.value[index].status = 'reschedule_requested'
  }
  isRescheduleModalOpen.value = false
}

// --- MODALES CLÍNICOS (DIAGNÓSTICO Y RECETA) ---
const activeClinicalApp = ref<any>(null)

// Diagnóstico
const isDiagnosisModalOpen = ref(false)
const diagSymptoms = ref('')
const diagNotes = ref('')

const openDiagnosisModal = (app: any) => {
  activeClinicalApp.value = app
  diagSymptoms.value = ''
  diagNotes.value = ''
  isDiagnosisModalOpen.value = true
}

const saveDiagnosis = () => {
  if (activeClinicalApp.value) {
    const index = todayAppointments.value.findIndex(a => a.id === activeClinicalApp.value.id)
    if (index !== -1) todayAppointments.value[index].hasDiagnosis = true
  }
  isDiagnosisModalOpen.value = false
}

// Receta
const isPrescriptionModalOpen = ref(false)
const presMedication = ref('')
const presDosage = ref('')

const openPrescriptionModal = (app: any) => {
  activeClinicalApp.value = app
  presMedication.value = ''
  presDosage.value = ''
  isPrescriptionModalOpen.value = true
}

const savePrescription = () => {
  if (activeClinicalApp.value) {
    const index = todayAppointments.value.findIndex(a => a.id === activeClinicalApp.value.id)
    if (index !== -1) todayAppointments.value[index].hasPrescription = true
  }
  isPrescriptionModalOpen.value = false
}
</script>

<template>
  <div class="max-w-7xl mx-auto w-full px-4 sm:px-0 font-sans">
    
    <div class="mb-8">
      <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight">Mi Resumen Diario</h1>
      <p class="text-slate-500 mt-2 font-medium">Visualiza tus métricas del día, gestiona tu agenda clínica y emite recetas.</p>
    </div>

    <!-- TARJETAS DE MÉTRICAS (KPIs) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      <!-- Card: Atendidos -->
      <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-[#418FC8]/10 text-[#418FC8] flex items-center justify-center shrink-0">
          <PhUsers class="h-6 w-6" />
        </div>
        <div>
          <p class="text-sm font-bold text-slate-400 uppercase tracking-wider">Atendidos</p>
          <p class="text-2xl font-black text-slate-800">{{ metrics.attended }}</p>
        </div>
      </div>
      <!-- Card: No Shows -->
      <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
          <PhCheckCircle class="h-6 w-6" />
        </div>
        <div>
          <p class="text-sm font-bold text-slate-400 uppercase tracking-wider">Inasistencias</p>
          <p class="text-2xl font-black text-slate-800">{{ metrics.noShows }}</p>
        </div>
      </div>
      <!-- Card: Reprogramaciones -->
      <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <PhCalendarCheck class="h-6 w-6" />
        </div>
        <div>
          <p class="text-sm font-bold text-slate-400 uppercase tracking-wider">Solicitudes</p>
          <p class="text-2xl font-black text-slate-800">{{ metrics.rescheduled }}</p>
        </div>
      </div>
      <!-- Card: Recetas -->
      <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <PhFolderOpen class="h-6 w-6" />
        </div>
        <div>
          <p class="text-sm font-bold text-slate-400 uppercase tracking-wider">Recetas Emitidas</p>
          <p class="text-2xl font-black text-slate-800">{{ metrics.prescriptions }}</p>
        </div>
      </div>
    </div>

    <!-- TÍTULO DE LA AGENDA -->
    <h2 class="text-xl font-bold text-slate-800 mb-4">Agenda del Día</h2>

    <!-- LISTA DE CITAS -->
    <div class="space-y-4">
      <div 
        v-for="app in todayAppointments" 
        :key="app.id"
        class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all flex flex-col md:flex-row"
        :class="{'opacity-75': app.status === 'reschedule_requested' || app.status === 'no_show'}"
      >
        <!-- Info Paciente -->
        <div class="p-6 flex items-center gap-4 border-b md:border-b-0 md:border-r border-slate-100 flex-1 bg-slate-50/50">
          <div class="w-12 h-12 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-lg shrink-0">
            {{ app.patient.charAt(0) }}
          </div>
          <div>
            <h3 class="font-bold text-slate-800 text-lg">{{ app.patient }}</h3>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-xs font-bold text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">{{ app.time }}</span>
              <span class="text-xs font-medium text-slate-500">{{ app.type }}</span>
            </div>
          </div>
        </div>

        <!-- Acciones por estado -->
        <div class="p-6 flex items-center md:justify-end gap-3 w-full md:w-auto overflow-x-auto">
          
          <!-- Estado: Solicitud Reprogramar -->
          <div v-if="app.status === 'reschedule_requested'" class="text-amber-600 bg-amber-50 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 whitespace-nowrap">
            <PhClock class="h-4 w-4" />
            Reprogramación en evaluación
          </div>

          <!-- Estado: No Asistió -->
          <div v-else-if="app.status === 'no_show'" class="text-red-600 bg-red-50 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 whitespace-nowrap">
            <PhUser class="h-4 w-4" />
            Inasistencia Registrada
          </div>

          <!-- Estado: Ya Atendido (Muestra herramientas clínicas) -->
          <template v-else-if="app.status === 'attended'">
            <div class="flex items-center gap-2 mr-2 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-lg text-sm font-bold whitespace-nowrap border border-emerald-100">
              <PhCheck class="h-4 w-4" />
              Atendido
            </div>

            <!-- Botón Diagnóstico -->
            <button 
              @click="openDiagnosisModal(app)" 
              class="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-sm transition-colors whitespace-nowrap"
              :class="app.hasDiagnosis ? 'bg-[#418FC8]/10 text-[#418FC8] border border-[#418FC8]/20 hover:bg-[#418FC8]/20' : 'bg-slate-800 text-white hover:bg-slate-700 shadow-md'"
            >
              <PhFileText class="h-4 w-4" />
              {{ app.hasDiagnosis ? 'Ver/Editar Diagnóstico' : 'Hacer Diagnóstico' }}
            </button>

            <!-- Botón Receta -->
            <button 
              @click="openPrescriptionModal(app)" 
              class="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-sm transition-colors whitespace-nowrap"
              :class="app.hasPrescription ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100' : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'"
            >
              <PhFolderOpen class="h-4 w-4" />
              {{ app.hasPrescription ? 'Ver Receta Emitida' : 'Generar Receta' }}
            </button>
          </template>

          <!-- Estado: Confirmado / Pendiente de Asistencia -->
          <template v-else>
            <button @click="openRescheduleModal(app)" class="text-slate-400 hover:text-amber-600 font-medium px-2 py-2 text-sm transition-colors" title="Solicitar cambio de horario">
              <PhClock class="h-5 w-5" />
            </button>
            <button @click="markAsNoShow(app.id)" class="bg-white border border-red-200 hover:bg-red-50 text-red-600 font-bold py-2.5 px-4 rounded-xl text-sm transition-colors whitespace-nowrap">
              No asistió
            </button>
            <button @click="markAsAttended(app.id)" class="bg-gradient-to-r from-[#418FC8] to-[#6DC7DC] hover:opacity-90 text-white font-bold py-2.5 px-6 rounded-xl shadow-lg shadow-[#418FC8]/30 transition-all whitespace-nowrap hover:shadow-xl hover:-translate-y-0.5">
              Marcar como Atendido
            </button>
          </template>
        </div>
      </div>
    </div>

    <!-- ============================================================== -->
    <!-- MODAL: REDACTAR DIAGNÓSTICO -->
    <!-- ============================================================== -->
    <div v-if="isDiagnosisModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-[#111111]/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        <div class="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-[#418FC8]/5">
          <div>
            <h2 class="text-xl font-bold text-slate-800">Historia Clínica y Diagnóstico</h2>
            <p class="text-sm font-medium text-[#418FC8]">Paciente: {{ activeClinicalApp?.patient }}</p>
          </div>
          <button @click="isDiagnosisModalOpen = false" class="bg-white hover:bg-slate-200 text-slate-500 p-2 rounded-full border border-slate-200 transition-colors">
            <PhX class="h-5 w-5" />
          </button>
        </div>
        <div class="p-8">
          <div class="mb-5">
            <label class="block text-sm font-bold text-slate-700 mb-2">Síntomas presentados</label>
            <textarea v-model="diagSymptoms" rows="3" placeholder="Ej. Dolor de cabeza intenso, fiebre de 38°C..." class="w-full border border-slate-300 rounded-xl p-4 text-sm focus:outline-none focus:border-[#418FC8] focus:ring-1 focus:ring-[#6DC7DC] resize-none"></textarea>
          </div>
          <div class="mb-5">
            <label class="block text-sm font-bold text-slate-700 mb-2">Diagnóstico Médico (CIE-10 o descripción)</label>
            <input type="text" placeholder="Ej. J02.9 - Faringitis aguda no especificada" class="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#418FC8] focus:ring-1 focus:ring-[#6DC7DC]" />
          </div>
          <div class="mb-8">
            <label class="block text-sm font-bold text-slate-700 mb-2">Notas Privadas / Plan de acción</label>
            <textarea v-model="diagNotes" rows="2" placeholder="Indicaciones internas, reposo recomendado..." class="w-full border border-slate-300 rounded-xl p-4 text-sm focus:outline-none focus:border-[#418FC8] focus:ring-1 focus:ring-[#6DC7DC] resize-none"></textarea>
          </div>
          <div class="flex gap-4">
            <button @click="isDiagnosisModalOpen = false" class="flex-1 font-bold text-slate-600 hover:bg-slate-100 py-4 rounded-xl transition-colors">Cancelar</button>
            <button @click="saveDiagnosis" class="flex-1 bg-gradient-to-r from-[#418FC8] to-[#6DC7DC] hover:opacity-90 text-white font-bold py-4 rounded-xl shadow-lg shadow-[#418FC8]/30 transition-all hover:-translate-y-0.5">Guardar Historia Clínica</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================================== -->
    <!-- MODAL: GENERAR RECETA -->
    <!-- ============================================================== -->
    <div v-if="isPrescriptionModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-[#111111]/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        <div class="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-emerald-50/50">
          <div>
            <h2 class="text-xl font-bold text-slate-800">Generar Receta Médica</h2>
            <p class="text-sm font-medium text-emerald-600">Paciente: {{ activeClinicalApp?.patient }}</p>
          </div>
          <button @click="isPrescriptionModalOpen = false" class="bg-white hover:bg-slate-200 text-slate-500 p-2 rounded-full border border-slate-200 transition-colors">
            <PhX class="h-5 w-5" />
          </button>
        </div>
        <div class="p-8">
          <!-- Mini formulario de medicamentos (Simplificado para la demostración UI) -->
          <div class="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
            <div class="mb-4">
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Medicamento</label>
              <input type="text" v-model="presMedication" placeholder="Ej. Paracetamol 500mg" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Dosis e Indicaciones</label>
              <input type="text" v-model="presDosage" placeholder="Ej. 1 tableta cada 8 horas por 5 días" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500" />
            </div>
            <button class="mt-4 w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
              <PhPlus class="h-4 w-4" weight="bold" />
              Añadir otro medicamento
            </button>
          </div>

          <div class="flex gap-4">
            <button @click="isPrescriptionModalOpen = false" class="flex-1 font-bold text-slate-600 hover:bg-slate-100 py-4 rounded-xl transition-colors">Cancelar</button>
            <button @click="savePrescription" class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-200 transition-colors flex justify-center items-center gap-2">
              <PhPrinter class="h-5 w-5" />
              Emitir e Imprimir
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================================== -->
    <!-- MODAL: SOLICITAR REPROGRAMACIÓN -->
    <!-- ============================================================== -->
    <div v-if="isRescheduleModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-[#111111]/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        <div class="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h2 class="text-xl font-bold text-slate-800">Solicitar Reprogramación</h2>
            <p class="text-sm text-slate-500">Paciente: {{ appointmentToReschedule?.patient }}</p>
          </div>
          <button @click="isRescheduleModalOpen = false" class="bg-white hover:bg-slate-200 text-slate-500 p-2 rounded-full border border-slate-200 transition-colors">
            <PhX class="h-5 w-5" />
          </button>
        </div>
        <div class="p-8">
          <div class="mb-5">
            <label class="block text-sm font-bold text-slate-700 mb-2">Motivo de la solicitud</label>
            <select v-model="rescheduleReason" class="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-blue-500 bg-white">
              <option value="" disabled>Seleccione un motivo...</option>
              <option value="emergencia">Emergencia médica</option>
              <option value="cirugia">Cirugía de urgencia prolongada</option>
              <option value="ausencia">Ausencia por motivos de salud</option>
            </select>
          </div>
          <div class="flex gap-4 mt-8">
            <button @click="isRescheduleModalOpen = false" class="flex-1 font-bold text-slate-600 hover:bg-slate-100 py-4 rounded-xl transition-colors">Cancelar</button>
            <button @click="submitRescheduleRequest" :disabled="!rescheduleReason" class="flex-1 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-amber-200 transition-colors">Enviar Solicitud</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.font-sans {
  font-family: 'Inter', 'Poppins', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
</style>
