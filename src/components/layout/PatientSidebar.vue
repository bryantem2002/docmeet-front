<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/store/auth-store'
import { 
  PhSquaresFour, PhUsers, PhStethoscope, PhClipboardText,
  PhHeartbeat, PhPill, PhHouse, PhCalendarPlus, PhCalendarBlank, PhFolderOpen, PhGear, PhList, PhWhatsappLogo,
  PhMapPin, PhCreditCard, PhHeadset, PhBookmark, PhCalendarCheck, PhClock, PhReceipt
} from '@phosphor-icons/vue'// Por defecto expandido en desktop, colapsado en móvil
const isExpanded = ref(typeof window !== 'undefined' ? window.innerWidth >= 1024 : false)
const router = useRouter()

function toggleSidebar() {
  isExpanded.value = !isExpanded.value
}

const auth = useAuthStore()
const { user } = storeToRefs(auth)

function openWhatsApp() {
  const phoneNumber = '51984249223' 
  const message = 'Hola, necesito soporte con mi portal DocMeet.'
  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank')
}

// MENÚS DINÁMICOS POR ROL
const menuItems = computed(() => {
  const role = user.value?.role

  if (role === 'admin') {
    return [
      { name: 'Inicio', routeName: 'home', icon: PhHouse },
      { name: 'Dashboard', routeName: 'admin', icon: PhSquaresFour },
      { name: 'Secretarias', routeName: 'admin-secretaries', icon: PhHeadset },
      { name: 'Doctores', routeName: 'admin-doctors', icon: PhStethoscope },
      { name: 'Especialidades', routeName: 'admin-specialties', icon: PhBookmark },
      { name: 'Pacientes', routeName: 'admin-patients', icon: PhUsers },
      { name: 'Sedes', routeName: 'admin-locations', icon: PhMapPin },
      { name: 'Solicitudes', routeName: 'admin-requests', icon: PhClipboardText },
      { name: 'Pagos', routeName: 'admin-payments', icon: PhCreditCard },
      { name: 'Ajustes', routeName: 'settings', icon: PhGear }
    ]
  } 
  else if (role === 'doctor') {
    return [
      { name: 'Inicio', routeName: 'home', icon: PhHouse },
      { name: 'Mi Resumen', routeName: 'doctor-dashboard', icon: PhSquaresFour },
      { name: 'Mi Agenda', routeName: 'doctor-agenda', icon: PhCalendarCheck },
      { name: 'Mi Horario', routeName: 'doctor-schedule', icon: PhClock },
      { name: 'Pacientes', routeName: 'doctor-patients', icon: PhUsers },
      { name: 'Diagnósticos', routeName: 'doctor-diagnoses', icon: PhHeartbeat },
      { name: 'Recetas', routeName: 'doctor-prescriptions', icon: PhPill },
      { name: 'Ajustes', routeName: 'settings', icon: PhGear }
    ]
  } 
  else if (role === 'secretaria') {
    return [
      { name: 'Inicio', routeName: 'home', icon: PhHouse },
      { name: 'Dashboard', routeName: 'secretary-dashboard', icon: PhSquaresFour },
      { name: 'Pacientes', routeName: 'secretary-patients', icon: PhUsers },
      { name: 'Citas', routeName: 'secretary-appointments', icon: PhCalendarPlus },
      { name: 'Pagos', routeName: 'secretary-payments', icon: PhCreditCard },
      { name: 'Ajustes', routeName: 'settings', icon: PhGear }
    ]
  }
  
  return [
    { name: 'Inicio', routeName: 'home', icon: PhHouse },
    { name: 'Agendar Cita', routeName: 'book-appointment', icon: PhCalendarPlus },
    { name: 'Mis Citas', routeName: 'appointments', icon: PhCalendarBlank },
    { name: 'Mi Historial', routeName: 'medical-history', icon: PhFolderOpen },
    { name: 'Mis Recetas', routeName: 'prescriptions', icon: PhPill },
    { name: 'Mis Pagos', routeName: 'patient-payments', icon: PhReceipt },
    { name: 'Ajustes', routeName: 'settings', icon: PhGear }
  ]
})
</script>

<template>
  <!-- Contenedor general: En desktop es sticky (no se monta encima), en móvil es fixed -->
  <div class="relative z-40 lg:sticky lg:top-0 flex-shrink-0">
    
    <!-- Fondo oscuro SOLO para celular (lg:hidden) cuando está expandido -->
    <div
      v-if="isExpanded"
      class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity"
      @click="toggleSidebar"
    ></div>

    <!-- Botón Toggle flotante para Móviles (Centrado verticalmente) -->
    <button 
      v-if="!isExpanded"
      @click="toggleSidebar"
      class="lg:hidden fixed top-1/2 -translate-y-1/2 left-0 z-50 flex h-16 w-10 items-center justify-center rounded-r-xl bg-[#3E90C8] text-white shadow-lg transition-all active:scale-95 hover:bg-[#2d7ab5]"
    >
      <PhList class="h-6 w-6 pr-0.5" weight="bold" />
    </button>

    <!-- El Sidebar -->
    <aside 
      class="fixed lg:sticky top-0 lg:top-0 left-0 h-screen lg:h-screen bg-[#3E90C8] border-r border-[#2d7ab5] shadow-2xl lg:shadow-none transition-all duration-300 flex flex-col z-40 text-white"
      :class="[
        isExpanded ? 'w-64 translate-x-0' : 'w-[72px] -translate-x-full lg:translate-x-0'
      ]"
    >
      <!-- Cabecera del Sidebar -->
      <div class="h-[4.5rem] flex items-center border-b border-white/10 shrink-0 transition-all" :class="isExpanded ? 'px-4 justify-between' : 'px-2 justify-center'">
        <RouterLink v-if="isExpanded" to="/" class="flex items-center gap-2">
          <!-- Logo en blanco si lo tuviéramos, pero usamos el normal o con brightness -->
          <img src="/img/logodoc.png" alt="DocMeet" class="h-8 w-8 object-contain drop-shadow-sm brightness-0 invert" />
          <span class="text-xl tracking-tight leading-none">
            <span class="font-black text-white">Doc</span><span class="font-bold text-blue-100">Meet</span>
          </span>
        </RouterLink>
        <button 
          @click="toggleSidebar" 
          class="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/20 hover:shadow-sm transition-all focus:outline-none shrink-0"
          :title="isExpanded ? 'Colapsar menú' : 'Expandir menú'"
        >
          <PhList class="h-5 w-5" weight="bold" />
        </button>
      </div>

      <!-- Menú de Navegación -->
      <nav class="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto custom-scrollbar-dark">
        <RouterLink
          v-for="item in menuItems"
          :key="item.name"
          :to="router.hasRoute(item.routeName) ? { name: item.routeName } : { path: '/' }"
          class="flex items-center px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-200 group relative"
          :class="[
            !isExpanded && 'justify-center',
            !router.hasRoute(item.routeName) && 'opacity-50 grayscale cursor-not-allowed',
            $route.name === item.routeName ? 'bg-white text-[#3E90C8] shadow-sm font-bold' : 'text-blue-100 hover:text-white hover:bg-white/10'
          ]"
          :title="!isExpanded ? item.name : undefined"
        >
          <!-- Indicador activo izquierdo -->
          <div 
            v-if="$route.name === item.routeName" 
            class="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#2d7ab5] rounded-r-md shadow-sm hidden"
          ></div>

          <component 
            :is="item.icon" 
            class="h-[22px] w-[22px] shrink-0 transition-colors"
            :class="$route.name === item.routeName ? 'text-[#3E90C8]' : 'text-blue-200 group-hover:text-white'"
            :weight="$route.name === item.routeName ? 'bold' : 'regular'"
          />

          <span 
            v-if="isExpanded" 
            class="ml-3 truncate"
          >
            {{ item.name }}
          </span>
        </RouterLink>
      </nav>

      <!-- Footer de Ayuda -->
      <div class="border-t border-white/10 space-y-3 transition-all shrink-0 bg-black/10" :class="isExpanded ? 'p-4' : 'p-3'">

        <div 
          v-if="isExpanded" 
          class="bg-white/10 rounded-xl p-3 border border-white/10 shadow-sm text-center"
        >
          <div class="mx-auto w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mb-2 text-white">
            <PhWhatsappLogo class="h-4 w-4" weight="fill" />
          </div>
          <p class="text-[13px] font-medium text-blue-100 mb-2 leading-tight">¿Dudas o problemas?</p>
          <button @click="openWhatsApp" class="w-full bg-white text-[#3E90C8] hover:bg-blue-50 text-xs font-bold py-2 px-4 rounded-lg transition-colors">
            Escríbenos
          </button>
        </div>
        
        <button v-else @click="openWhatsApp" class="w-full flex items-center justify-center p-2.5 rounded-lg bg-white/20 text-white hover:bg-white hover:text-[#3E90C8] transition-colors group relative" title="Soporte WhatsApp">
          <PhWhatsappLogo class="h-5 w-5" weight="fill" />
        </button>
      </div>
    </aside>
  </div>
</template>

<style scoped>
/* Opcional: Para que el scroll del menú se vea estilizado y no una barra gris gigante */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 10px;
}
</style>