<script setup lang="ts">
import { ref } from 'vue'
import { PhCalendarBlank, PhFileText, PhPill, PhSpinner, PhDownloadSimple, PhFolderOpen } from '@phosphor-icons/vue'

// --- ESTADOS ---
// Controla qué receta se está "descargando" para mostrar un spinner de carga
const downloadingId = ref<number | null>(null)

// --- DATOS DE PRUEBA (MOCK DATA) ---
const prescriptions = ref([
  {
    id: 201,
    date: '2026-05-02',
    doctor: 'Dr. Gregory House',
    specialty: 'Medicina Interna',
    diagnosis: 'Infección respiratoria aguda',
    medications: [
      { name: 'Amoxicilina', dosage: '500mg', frequency: 'Cada 8 horas', duration: '7 días' },
      { name: 'Paracetamol', dosage: '1g', frequency: 'Cada 12 horas', duration: '3 días (si hay fiebre)' }
    ],
    notes: 'Tomar la amoxicilina junto con los alimentos para evitar irritación gástrica.'
  },
  {
    id: 202,
    date: '2026-03-22',
    doctor: 'Dra. Allison Cameron',
    specialty: 'Inmunología',
    diagnosis: 'Rinitis Alérgica',
    medications: [
      { name: 'Cetirizina', dosage: '10mg', frequency: '1 vez al día', duration: '14 días' },
      { name: 'Budesonida Spray Nasal', dosage: '2 disparos/fosa', frequency: 'Cada 12 horas', duration: '1 mes' }
    ],
    notes: 'Evitar la exposición prolongada al polvo y usar el spray nasal después de limpiar las fosas nasales.'
  },
  {
    id: 203,
    date: '2025-08-05',
    doctor: 'Dr. Robert Chase',
    specialty: 'Gastroenterología',
    diagnosis: 'Gastritis Aguda',
    medications: [
      { name: 'Omeprazol', dosage: '20mg', frequency: '1 vez al día (en ayunas)', duration: '14 días' },
      { name: 'Sucralfato', dosage: '1g', frequency: 'Cada 8 horas', duration: '7 días' }
    ],
    notes: 'Evitar comidas picantes, café y alcohol durante el tratamiento.'
  }
])

// --- UTILIDADES ---
const formatDate = (dateString: string) => {
  const date = new Date(dateString + 'T00:00:00')
  return new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
}

// --- LÓGICA DE DESCARGA PDF ---
const descargarPDF = async (id: number) => {
  // 1. Activamos el estado de carga para que el botón muestre el spinner
  downloadingId.value = id

  try {
    // 2. Simulamos el tiempo que tarda el servidor en generar el PDF (1.5 segundos)
    await new Promise(resolve => setTimeout(resolve, 1500))

    // 3. AQUÍ IRÁ LA LLAMADA REAL A SPRING BOOT EN EL FUTURO:
    // const response = await axios.get(`http://localhost:8080/api/prescriptions/${id}/pdf`, { responseType: 'blob' })
    // const url = window.URL.createObjectURL(new Blob([response.data]))
    // const link = document.createElement('a')
    // link.href = url
    // link.setAttribute('download', `Receta_Medica_${id}.pdf`)
    // document.body.appendChild(link)
    // link.click()
    
    // Alerta temporal para que veas que funciona
    alert(`¡PDF de la receta #${id} descargado con éxito!`)
  } catch (error) {
    console.error("Error al descargar el PDF", error)
    alert("Hubo un error al generar el PDF.")
  } finally {
    // 4. Apagamos el spinner de carga
    downloadingId.value = null
  }
}
</script>

<template>
  <div class="max-w-5xl mx-auto w-full">
    
    <!-- Encabezado -->
    <div class="mb-8">
      <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">Mis Recetas Médicas</h1>
      <p class="text-sm text-slate-500 mt-1">Consulta tus medicamentos recetados y descarga los documentos oficiales.</p>
    </div>

    <!-- Grid de Recetas -->
    <div v-if="prescriptions.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <div 
        v-for="receta in prescriptions" 
        :key="receta.id"
        class="bg-white border border-slate-200 rounded-3xl p-6 shadow-[0_2px_15px_rgb(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 flex flex-col h-full relative overflow-hidden group"
      >
        <!-- Detalles decorativos -->
        <div class="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -z-0 opacity-50 group-hover:scale-110 transition-transform duration-500"></div>

        <!-- Cabecera de la Tarjeta -->
        <div class="flex justify-between items-start mb-5 relative z-10">
          <div>
            <div class="flex items-center gap-2 mb-1.5">
              <span class="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-lg flex items-center gap-1.5">
                <PhCalendarBlank class="h-3.5 w-3.5" />
                {{ formatDate(receta.date) }}
              </span>
              <span class="text-xs font-semibold text-slate-400">#{{ receta.id }}</span>
            </div>
            <h3 class="text-lg font-bold text-slate-800">{{ receta.doctor }}</h3>
            <p class="text-sm font-medium text-blue-600">{{ receta.specialty }}</p>
          </div>
          
          <!-- Ícono de Receta -->
          <div class="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 text-slate-400">
            <PhFileText class="h-5 w-5" />
          </div>
        </div>

        <div class="mb-4 relative z-10">
          <p class="text-sm text-slate-600"><span class="font-bold text-slate-700">Diagnóstico:</span> {{ receta.diagnosis }}</p>
        </div>

        <!-- Lista de Medicamentos -->
        <div class="bg-slate-50 rounded-2xl p-4 mb-5 flex-1 relative z-10 border border-slate-100">
          <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <PhPill class="h-4 w-4 text-slate-400" />
            Medicamentos
          </h4>
          <ul class="space-y-3">
            <li v-for="(med, index) in receta.medications" :key="index" class="flex items-start gap-3">
              <div class="mt-0.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></div>
              <div>
                <p class="text-sm font-bold text-slate-800">{{ med.name }} <span class="text-blue-600 font-semibold text-xs ml-1">{{ med.dosage }}</span></p>
                <p class="text-xs text-slate-500 mt-0.5">{{ med.frequency }} durante {{ med.duration }}</p>
              </div>
            </li>
          </ul>
        </div>

        <div v-if="receta.notes" class="mb-5 relative z-10">
          <p class="text-xs text-slate-500 italic bg-amber-50 text-amber-800 p-3 rounded-xl border border-amber-100">
            <span class="font-bold not-italic">Nota:</span> {{ receta.notes }}
          </p>
        </div>

        <!-- Botón Descargar PDF -->
        <div class="mt-auto pt-2 relative z-10">
          <button 
            @click="descargarPDF(receta.id)"
            :disabled="downloadingId === receta.id"
            class="w-full py-3 px-4 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2"
            :class="downloadingId === receta.id 
              ? 'bg-blue-100 text-blue-400 cursor-not-allowed' 
              : 'bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white shadow-sm hover:shadow-md'"
          >
            <!-- Spinner si está cargando -->
            <PhSpinner v-if="downloadingId === receta.id" class="animate-spin h-5 w-5" />
            
            <!-- Ícono de PDF si no está cargando -->
            <PhDownloadSimple v-else class="h-5 w-5" />
            
            {{ downloadingId === receta.id ? 'Generando PDF...' : 'Descargar en PDF' }}
          </button>
        </div>
      </div>

    </div>

    <!-- Empty State -->
    <div v-else class="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-3xl border border-dashed border-slate-300">
      <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
        <PhFolderOpen class="h-10 w-10 text-slate-300" />
      </div>
      <h3 class="text-lg font-bold text-slate-700 mb-2">Sin recetas médicas</h3>
      <p class="text-slate-500 max-w-md">No tienes recetas médicas emitidas actualmente. Cuando un especialista te prescriba medicamentos, aparecerán aquí.</p>
    </div>

  </div>
</template>