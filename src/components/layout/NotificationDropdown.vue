<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)

// Datos de prueba con más "sabor": agregamos títulos, tipos y tiempo
const notifications = ref([
  { 
    id: 1, 
    type: 'appointment',
    title: 'Cita Confirmada',
    text: 'Tu cita con el Dr. Pérez ha sido confirmada para mañana.', 
    time: 'Hace 5 min',
    isRead: false 
  },
  { 
    id: 2, 
    type: 'reminder',
    title: 'Recordatorio',
    text: 'Recuerda estar en ayunas para tus exámenes de laboratorio.', 
    time: 'Hace 2 horas',
    isRead: true 
  },
  { 
    id: 3, 
    type: 'system',
    title: 'Bienvenido a DocMeet',
    text: 'Tu perfil ha sido verificado con éxito. Ya puedes agendar citas.', 
    time: 'Ayer',
    isRead: true 
  },
])

const unreadCount = ref(1)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function closeOnClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!target.closest('.notification-container')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeOnClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', closeOnClickOutside)
})
</script>

<template>
  <div class="relative notification-container flex items-center">
    <!-- Botón de la campanita con efecto hover mejorado -->
    <button 
      @click="toggleDropdown"
      class="relative p-2 text-slate-400 hover:text-[var(--color-doc-blue-600)] transition-all duration-300 rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-100"
      title="Notificaciones"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      
      <!-- Indicador de notificaciones (Ping más elegante) -->
      <span v-if="unreadCount > 0" class="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border border-white"></span>
      </span>
    </button>

    <!-- Menú Desplegable con sombras premium y bordes suaves -->
    <Transition 
      enter-active-class="transition ease-out duration-200" 
      enter-from-class="transform opacity-0 scale-95 translate-y-2" 
      enter-to-class="transform opacity-100 scale-100 translate-y-0" 
      leave-active-class="transition ease-in duration-150" 
      leave-from-class="transform opacity-100 scale-100 translate-y-0" 
      leave-to-class="transform opacity-0 scale-95 translate-y-2"
    >
      <div v-if="isOpen" class="absolute right-0 top-14 mt-1 w-80 sm:w-96 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 overflow-hidden z-50">
        
        <!-- Header del Dropdown -->
        <div class="px-4 py-3 border-b border-slate-100 bg-white/50 backdrop-blur-sm flex justify-between items-center">
          <div class="flex items-center gap-2">
            <h3 class="text-[15px] font-bold text-slate-800">Notificaciones</h3>
            <span v-if="unreadCount > 0" class="bg-[var(--color-doc-blue-600)] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              Nuevas
            </span>
          </div>
          <button class="text-xs font-medium text-slate-400 hover:text-[var(--color-doc-blue-600)] transition-colors">
            Marcar leídas
          </button>
        </div>
        
        <!-- Lista de Notificaciones -->
        <div class="max-h-[360px] overflow-y-auto custom-scrollbar">
          
          <!-- Estado Vacío Ilustrado -->
          <div v-if="notifications.length === 0" class="px-6 py-10 flex flex-col items-center justify-center text-center">
            <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p class="text-sm font-medium text-slate-800">Todo al día</p>
            <p class="text-xs text-slate-500 mt-1">No tienes notificaciones nuevas por ahora.</p>
          </div>
          
          <!-- Items de notificación -->
          <ul v-else class="divide-y divide-slate-50">
            <li 
              v-for="notif in notifications" 
              :key="notif.id"
              class="relative group px-4 py-4 hover:bg-slate-50 cursor-pointer transition-all duration-200 flex gap-3"
              :class="{ 'bg-blue-50/30': !notif.isRead }"
            >
              <!-- Indicador lateral de no leído -->
              <div v-if="!notif.isRead" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 group-hover:h-8 bg-[var(--color-doc-blue-500)] rounded-r-md transition-all duration-300" :class="{'h-8': !notif.isRead}"></div>

              <!-- Icono dinámico según el tipo -->
              <div class="shrink-0 mt-0.5">
                <div class="w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-105"
                  :class="{
                    'bg-green-100 text-green-600': notif.type === 'appointment',
                    'bg-amber-100 text-amber-600': notif.type === 'reminder',
                    'bg-blue-100 text-[var(--color-doc-blue-600)]': notif.type === 'system'
                  }"
                >
                  <!-- Icono Cita -->
                  <svg v-if="notif.type === 'appointment'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <!-- Icono Recordatorio -->
                  <svg v-else-if="notif.type === 'reminder'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <!-- Icono Sistema/Info -->
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>

              <!-- Contenido Textual -->
              <div class="flex-1 min-w-0">
                <div class="flex justify-between items-start mb-0.5">
                  <p class="text-sm font-semibold text-slate-800 truncate pr-2" :class="{ 'text-[var(--color-doc-blue-700)]': !notif.isRead }">
                    {{ notif.title }}
                  </p>
                  <span class="text-[11px] font-medium text-slate-400 shrink-0 mt-0.5">{{ notif.time }}</span>
                </div>
                <p class="text-[13px] text-slate-500 leading-snug line-clamp-2">
                  {{ notif.text }}
                </p>
              </div>
            </li>
          </ul>

        </div>
        
        <!-- Footer del Dropdown -->
        <div v-if="notifications.length > 0" class="border-t border-slate-100 p-2 bg-slate-50">
          <button class="w-full py-2 text-sm font-medium text-slate-600 hover:text-[var(--color-doc-blue-700)] hover:bg-white rounded-lg transition-colors">
            Ver todas las notificaciones
          </button>
        </div>

      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Scrollbar estilizada para que no se vea tosca en Windows */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 20px;
}
</style>