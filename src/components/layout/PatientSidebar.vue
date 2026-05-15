<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/store/auth-store'

// Por defecto expandido en desktop, pero puedes cambiarlo a false si prefieres que inicie colapsado
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

// MENÚS DINÁMICOS POR ROL
const menuItems = computed(() => {
  const role = user.value?.role

  if (role === 'admin') {
    return [
      { name: 'Dashboard', routeName: 'admin', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
      { name: 'Doctores', routeName: 'doctors', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
      { name: 'Finanzas', routeName: 'payments', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
    ]
  } 
  else if (role === 'doctor') {
    return [
      { name: 'Mi Resumen', routeName: 'doctor-dashboard', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
      { name: 'Pacientes', routeName: 'doctor-patients', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
      { name: 'Diagnósticos', routeName: 'medical-history', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
      { name: 'Recetas', routeName: 'prescriptions', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' }
    ]
  } 
  
  return [
    { name: 'Inicio', routeName: 'home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Mis Citas', routeName: 'appointments', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { name: 'Mi Historial', routeName: 'medical-history', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { name: 'Mis Recetas', routeName: 'prescriptions', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { name: 'Ajustes', routeName: 'settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
  ]
})
</script>

<template>
  <!-- Contenedor general: En desktop es sticky (no se monta encima), en móvil es fixed -->
  <div class="relative z-40 lg:sticky lg:top-[4.5rem] flex-shrink-0">
    
    <!-- Fondo oscuro SOLO para celular (lg:hidden) cuando está expandido -->
    <div
      v-if="isExpanded"
      class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity"
      @click="toggleSidebar"
    ></div>

    <!-- El Sidebar -->
    <aside 
      class="fixed lg:sticky top-0 lg:top-0 left-0 h-screen lg:h-[calc(100vh-4.5rem)] bg-white border-r border-slate-200 shadow-xl lg:shadow-none transition-all duration-300 flex flex-col"
      :class="[
        isExpanded ? 'w-64 translate-x-0' : 'w-[72px] -translate-x-full lg:translate-x-0'
      ]"
    >
      <!-- Cabecera del Sidebar -->
      <div class="h-16 flex items-center px-4" :class="isExpanded ? 'justify-between' : 'justify-center'">
        <span v-if="isExpanded" class="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Mi Portal
        </span>
        <button 
          @click="toggleSidebar" 
          class="p-2 rounded-lg text-slate-400 hover:text-[var(--color-doc-blue-600)] hover:bg-blue-50 transition-colors focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
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
        >
          <!-- Indicador activo izquierdo -->
          <div 
            v-if="$route.name === item.routeName" 
            class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[var(--color-doc-blue-600)] rounded-r-md"
          ></div>

          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            class="h-[22px] w-[22px] shrink-0 transition-colors"
            :class="$route.name === item.routeName ? 'text-[var(--color-doc-blue-600)]' : 'text-slate-400 group-hover:text-slate-600'"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" :d="item.icon" />
          </svg>

          <span 
            v-if="isExpanded" 
            class="ml-3 truncate"
            :class="$route.name === item.routeName ? 'text-[var(--color-doc-blue-700)]' : 'text-slate-600 group-hover:text-slate-900'"
          >
            {{ item.name }}
          </span>

          <!-- Tooltip para versión colapsada -->
          <div 
            v-if="!isExpanded" 
            class="absolute left-full ml-4 px-2.5 py-1 bg-slate-800 text-white text-xs font-medium rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity"
          >
            {{ item.name }}
          </div>
        </RouterLink>
      </nav>

      <!-- Footer de Ayuda (Más elegante y menos intrusivo) -->
      <div class="p-4 border-t border-slate-100 bg-slate-50/50">
        <div 
          v-if="isExpanded" 
          class="bg-white rounded-xl p-3 border border-slate-200 shadow-sm text-center"
        >
          <div class="mx-auto w-8 h-8 bg-green-50 rounded-full flex items-center justify-center mb-2 text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.827z"/>
            </svg>
          </div>
          <p class="text-[13px] font-medium text-slate-700 mb-2 leading-tight">¿Dudas o problemas?</p>
          <button @click="openWhatsApp" class="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold py-2 px-4 rounded-lg transition-colors">
            Escríbenos
          </button>
        </div>
        
        <button v-else @click="openWhatsApp" class="w-full flex items-center justify-center p-2.5 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors group relative">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.827z"/>
          </svg>
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