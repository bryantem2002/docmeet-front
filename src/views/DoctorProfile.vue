<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { PhCaretLeft, PhStar, PhMapPin } from '@phosphor-icons/vue'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const doctor = ref<any>(null)

// Las reseñas de demostración nunca se incluyen como datos visibles en producción.
const reviews = import.meta.env.DEV ? [
  { id: 1, author: 'María C.', date: 'Hace 2 semanas', rating: 5, comment: 'Excelente atención. El doctor fue muy paciente y me explicó todo con mucho detalle.' },
  { id: 2, author: 'Juan P.', date: 'Hace 1 mes', rating: 5, comment: 'Muy profesional. Las instalaciones están impecables y no tuve que esperar casi nada.' },
  { id: 3, author: 'Elena R.', date: 'Hace 2 meses', rating: 4, comment: 'Buen trato y diagnóstico acertado, aunque la cita empezó 10 minutos tarde.' }
] : []

async function loadDoctor() {
  loading.value = true
  const doctorId = Number(route.params.id)

  if (!import.meta.env.DEV) {
    doctor.value = null
    loading.value = false
    return
  }
  
  // Simulamos carga
  await new Promise(resolve => setTimeout(resolve, 600))
  
  // Datos simulados (en el futuro esto vendrá de tu API con getDoctorById)
  doctor.value = {
    id: doctorId,
    fullName: doctorId === 2 ? 'Dra. Trujillo' : 'Dr. Yalico', // Lógica temporal
    specialty: doctorId === 2 ? 'Pediatría' : 'Cardiología',
    bio: 'Especialista con más de 15 años de experiencia brindando atención de alta calidad. Graduado con honores de la Universidad Nacional y con especialización en el extranjero. Comprometido con el bienestar integral de sus pacientes.',
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${doctorId === 2 ? 'Laura Ríos' : 'Carlos Mendoza'}&backgroundColor=0369a1,0ea5e9&textColor=ffffff`,
    experience: '15 años',
    patients: '+2,000',
    rating: 4.9,
    price: '$50.00'
  }
  
  loading.value = false
}

onMounted(() => {
  loadDoctor()
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-8">
    
    <button @click="router.back()" class="flex items-center gap-2 text-slate-500 hover:text-[var(--color-doc-blue-600)] transition-colors mb-6 font-medium text-sm">
      <PhCaretLeft class="w-4 h-4" weight="bold" />
      Volver al directorio
    </button>

    <div v-if="loading" class="animate-pulse space-y-8">
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex gap-6">
        <div class="w-24 h-24 bg-slate-200 rounded-full"></div>
        <div class="flex-1 space-y-4 py-2">
          <div class="h-6 bg-slate-200 rounded w-1/3"></div>
          <div class="h-4 bg-slate-100 rounded w-1/4"></div>
        </div>
      </div>
    </div>

    <div v-else-if="doctor" class="space-y-6">
      <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-6 sm:items-center relative overflow-hidden">
        <div class="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 opacity-50"></div>
        
        <img :src="doctor.avatar" :alt="doctor.fullName" class="w-24 h-24 sm:w-28 sm:h-28 rounded-full shadow-md border-4 border-white object-cover" />
        
        <div class="flex-1">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 class="text-2xl sm:text-3xl font-bold text-slate-900">{{ doctor.fullName }}</h1>
              <p class="text-[var(--color-doc-blue-600)] font-semibold text-lg mt-1">{{ doctor.specialty }}</p>
            </div>
            <button class="w-full sm:w-auto px-6 py-3 bg-[var(--color-doc-blue-600)] hover:bg-[var(--color-doc-blue-700)] text-white rounded-xl font-semibold shadow-md transition-all">
              Agendar Cita
            </button>
          </div>

          <div class="flex flex-wrap gap-6 mt-6 pt-6 border-t border-slate-100">
            <div class="flex flex-col">
              <span class="text-slate-500 text-sm">Experiencia</span>
              <span class="font-bold text-slate-800">{{ doctor.experience }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-slate-500 text-sm">Pacientes</span>
              <span class="font-bold text-slate-800">{{ doctor.patients }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-slate-500 text-sm">Calificación</span>
              <div class="flex items-center gap-1">
                <span class="font-bold text-slate-800">{{ doctor.rating }}</span>
                <PhStar class="w-4 h-4 text-amber-400" weight="fill" />
              </div>
            </div>
            <div class="flex flex-col">
              <span class="text-slate-500 text-sm">Consulta desde</span>
              <span class="font-bold text-green-600">{{ doctor.price }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100">
            <h2 class="text-xl font-bold text-slate-900 mb-4">Sobre el especialista</h2>
            <p class="text-slate-600 leading-relaxed">{{ doctor.bio }}</p>
          </div>

          <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100">
            <h2 class="text-xl font-bold text-slate-900 mb-6">Referencias de pacientes</h2>
            <div class="space-y-6">
              <div v-for="review in reviews" :key="review.id" class="border-b border-slate-50 last:border-0 pb-6 last:pb-0">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">
                      {{ review.author.charAt(0) }}
                    </div>
                    <div>
                      <h4 class="font-semibold text-slate-800 text-sm">{{ review.author }}</h4>
                      <p class="text-xs text-slate-400">{{ review.date }}</p>
                    </div>
                  </div>
                  <div class="flex text-amber-400">
                    <PhStar v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= review.rating ? 'text-amber-400' : 'text-slate-200'" weight="fill" />
                  </div>
                </div>
                <p class="text-slate-600 text-sm italic">"{{ review.comment }}"</p>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 class="font-bold text-slate-900 mb-4">Ubicación del consultorio</h3>
            <div class="flex items-start gap-3 text-sm text-slate-600 mb-4">
              <PhMapPin class="w-5 h-5 text-[var(--color-doc-blue-500)] shrink-0 mt-0.5" />
              <p>Av. Principal 123, Piso 4, Consultorio 402. Centro Médico DocMeet.</p>
            </div>
            <div class="w-full h-32 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 border border-slate-200">
               [Mapa de ubicación]
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
