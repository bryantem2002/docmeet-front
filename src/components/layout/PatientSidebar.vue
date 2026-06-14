<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/store/auth-store'
import { 
  PhSquaresFour, PhUsers, PhStethoscope, PhClipboardText,
  PhHeartbeat, PhPill, PhHouse, PhCalendarPlus, PhCalendarBlank, PhFolderOpen, PhGear, PhList, PhWhatsappLogo, PhSignOut,
  PhMapPin, PhCreditCard, PhHeadset, PhBookmark, PhCalendarCheck, PhClock, PhReceipt
} from '@phosphor-icons/vue'// Por defecto expandido en desktop, pero puedes cambiarlo a false si prefieres que inicie colapsado
const isExpanded = ref(true)
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

function logoutUser() {
  auth.logout()
  router.push('/')
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
      { name: 'Pagos', routeName: 'admin-payments', icon: PhCreditCard }
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
      { name: 'Pagos', routeName: 'secretary-payments', icon: PhCreditCard }
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

    <!-- El Sidebar -->
    <aside 
      class="fixed lg:sticky top-0 lg:top-0 left-0 h-screen lg:h-screen bg-white border-r border-slate-200 shadow-xl lg:shadow-none transition-all duration-300 flex flex-col"
      :class="[
        isExpanded ? 'w-64 translate-x-0' : 'w-[72px] -translate-x-full lg:translate-x-0'
      ]"
    >
      <!-- Cabecera del Sidebar -->
      <div class="h-[4.5rem] flex items-center border-b border-slate-100 shrink-0 transition-all" :class="isExpanded ? 'px-4 justify-between' : 'px-2 justify-center'">
        <RouterLink v-if="isExpanded" to="/" class="flex items-center gap-2">
          <img src="/img/logodoc.png" alt="DocMeet" class="h-8 w-8 object-contain" />
          <span class="text-xl tracking-tight leading-none">
            <span class="font-black text-[#3E90C8]">Doc</span><span class="font-bold text-slate-800">Meet</span>
          </span>
        </RouterLink>
        <button 
          @click="toggleSidebar" 
          class="p-2 rounded-lg text-slate-400 hover:text-[#3E90C8] hover:bg-blue-50 transition-colors focus:outline-none shrink-0"
          :title="isExpanded ? 'Colapsar menú' : 'Expandir menú'"
        >
          <PhList class="h-5 w-5" weight="bold" />
        </button>
      </div>

      <!-- User Profile Summary -->
      <div v-if="user" class="border-b border-slate-100 flex items-center shrink-0 transition-all" :class="isExpanded ? 'px-4 py-5 gap-3 justify-start' : 'p-3 flex-col justify-center gap-2'">
        <div class="h-10 w-10 rounded-full bg-gradient-to-tr from-[#3E90C8] to-[#70C6DC] text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
          {{ user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U' }}
        </div>
        <div v-if="isExpanded" class="flex flex-col min-w-0">
          <span class="text-sm font-bold text-slate-800 truncate">{{ user.fullName || 'Usuario' }}</span>
          <span class="text-xs text-slate-500 capitalize truncate font-medium">
            {{ user.role === 'admin' ? 'Administrador' : user.role === 'doctor' ? 'Médico' : user.role === 'secretaria' ? 'Secretaria' : 'Paciente' }}
          </span>
        </div>
      </div>

      <!-- Menú de Navegación -->
      <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
        <RouterLink
          v-for="item in menuItems"
          :key="item.name"
          :to="router.hasRoute(item.routeName) ? { name: item.routeName } : { path: '/' }"
          class="flex items-center px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-200 group relative"
          :class="[
            !isExpanded && 'justify-center',
            !router.hasRoute(item.routeName) && 'opacity-50 grayscale cursor-not-allowed'
          ]"
          active-class="bg-blue-50/80 text-[var(--color-doc-blue-700)] shadow-sm font-semibold"
          :title="!isExpanded ? item.name : undefined"
        >
          <!-- Indicador activo izquierdo -->
          <div 
            v-if="$route.name === item.routeName" 
            class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[var(--color-doc-blue-600)] rounded-r-md"
          ></div>

          <component 
            :is="item.icon" 
            class="h-[22px] w-[22px] shrink-0 transition-colors"
            :class="$route.name === item.routeName ? 'text-[var(--color-doc-blue-600)]' : 'text-slate-400 group-hover:text-slate-600'"
            weight="regular"
          />

          <span 
            v-if="isExpanded" 
            class="ml-3 truncate"
            :class="$route.name === item.routeName ? 'text-[var(--color-doc-blue-700)]' : 'text-slate-600 group-hover:text-slate-900'"
          >
            {{ item.name }}
          </span>
        </RouterLink>
      </nav>

      <!-- Footer de Ayuda -->
      <div class="border-t border-slate-100 bg-slate-50/50 space-y-3 transition-all shrink-0" :class="isExpanded ? 'p-4' : 'p-3'">
        
        <!-- User Logout -->
        <button 
          @click="logoutUser"
          class="w-full flex items-center p-2.5 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors group relative"
          :class="!isExpanded && 'justify-center'"
          title="Cerrar sesión"
        >
          <PhSignOut class="h-[22px] w-[22px] shrink-0" weight="bold" />
          <span v-if="isExpanded" class="ml-3 font-semibold text-sm">Cerrar Sesión</span>
        </button>

        <div 
          v-if="isExpanded" 
          class="bg-white rounded-xl p-3 border border-slate-200 shadow-sm text-center"
        >
          <div class="mx-auto w-8 h-8 bg-green-50 rounded-full flex items-center justify-center mb-2 text-green-600">
            <PhWhatsappLogo class="h-4 w-4" weight="fill" />
          </div>
          <p class="text-[13px] font-medium text-slate-700 mb-2 leading-tight">¿Dudas o problemas?</p>
          <button @click="openWhatsApp" class="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold py-2 px-4 rounded-lg transition-colors">
            Escríbenos
          </button>
        </div>
        
        <button v-else @click="openWhatsApp" class="w-full flex items-center justify-center p-2.5 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors group relative" title="Soporte WhatsApp">
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