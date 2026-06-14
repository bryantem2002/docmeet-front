<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/store/auth-store'
import { PhBell, PhGear, PhSignOut, PhMagnifyingGlass } from '@phosphor-icons/vue'

const auth = useAuthStore()
const { user } = storeToRefs(auth)
const router = useRouter()

const showProfileMenu = ref(false)

function toggleProfileMenu() {
  showProfileMenu.value = !showProfileMenu.value
}

function closeProfileMenu(e: Event) {
  if (!(e.target as Element).closest('.profile-dropdown-container')) {
    showProfileMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeProfileMenu)
})

onUnmounted(() => {
  document.removeEventListener('click', closeProfileMenu)
})

function logoutUser() {
  auth.logout()
  router.push('/')
}

const userInitials = computed(() => {
  if (!user.value?.fullName) return 'U'
  const names = user.value.fullName.trim().split(' ')
  if (names.length >= 2) {
    return (names[0][0] + names[1][0]).toUpperCase()
  }
  return names[0].substring(0, 2).toUpperCase()
})
</script>

<template>
  <header class="flex items-center justify-between px-4 sm:px-6 lg:px-10 py-3 sm:py-4 bg-white border-b border-slate-200 shrink-0 z-10 sticky top-0">
    <!-- Left side (Search or Title) -->
    <div class="flex-1 flex items-center">
      <div class="relative hidden sm:block max-w-xs w-full">
        <PhMagnifyingGlass class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input type="text" placeholder="Buscar..." class="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#6DC7DC]/50 focus:border-[#418FC8] text-sm text-slate-700 transition-all shadow-sm focus:shadow-md" />
      </div>
      <!-- Logo/Título para móvil -->
      <h1 class="block sm:hidden text-xl font-black text-slate-800 tracking-tight">
        <span class="text-[#3E90C8]">Doc</span>Meet
      </h1>
    </div>

    <!-- Right side (Icons + Profile) -->
    <div class="flex items-center gap-2 sm:gap-4 shrink-0">
      
      <!-- Notifications -->
      <button class="relative p-2 text-slate-400 hover:text-[#418FC8] hover:bg-[#418FC8]/10 rounded-full transition-colors">
        <PhBell class="h-6 w-6" />
        <span class="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
      </button>

      <!-- Settings -->
      <router-link :to="{ name: 'settings' }" class="p-2 text-slate-400 hover:text-[#418FC8] hover:bg-[#418FC8]/10 rounded-full transition-colors">
        <PhGear class="h-6 w-6" />
      </router-link>

      <div class="w-px h-6 bg-slate-200 mx-1"></div>

      <!-- Profile -->
      <div class="relative profile-dropdown-container">
        <button @click="toggleProfileMenu" class="flex items-center gap-3 focus:outline-none rounded-full hover:ring-2 hover:ring-[#418FC8]/20 transition-all">
          <div class="flex flex-col items-end hidden sm:flex">
            <span class="text-sm font-bold text-slate-800 leading-tight">{{ user?.fullName || 'Usuario' }}</span>
            <span class="text-[10px] font-bold text-[#418FC8] uppercase tracking-wider bg-[#418FC8]/10 px-2 py-0.5 rounded-full mt-0.5">
              {{ user?.role === 'admin' ? 'Admin' : user?.role === 'doctor' ? 'Médico' : user?.role === 'secretaria' ? 'Secretaria' : 'Paciente' }}
            </span>
          </div>
          
          <div class="h-10 w-10 rounded-full bg-gradient-to-r from-[#418FC8] to-[#6DC7DC] text-white flex items-center justify-center font-bold text-sm shadow-md">
            {{ userInitials }}
          </div>
        </button>

        <!-- Dropdown Menu -->
        <transition 
          enter-active-class="transition ease-out duration-100" 
          enter-from-class="transform opacity-0 scale-95" 
          enter-to-class="transform opacity-100 scale-100" 
          leave-active-class="transition ease-in duration-75" 
          leave-from-class="transform opacity-100 scale-100" 
          leave-to-class="transform opacity-0 scale-95"
        >
          <div v-if="showProfileMenu" class="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 origin-top-right">
            <!-- Solo visible en móvil, ya que en desktop ya sale al lado -->
            <div class="p-4 border-b border-slate-100 bg-slate-50 sm:hidden">
              <p class="font-bold text-slate-800 truncate">{{ user?.fullName || 'Usuario' }}</p>
              <p class="text-xs font-bold text-[#418FC8] uppercase mt-1">
                {{ user?.role === 'admin' ? 'Administrador' : user?.role === 'doctor' ? 'Médico' : user?.role === 'secretaria' ? 'Secretaria' : 'Paciente' }}
              </p>
            </div>
            
            <div class="p-2 flex flex-col gap-1">
              <router-link :to="{ name: 'settings' }" class="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:text-[#418FC8] hover:bg-[#418FC8]/5 rounded-xl transition-colors" @click="showProfileMenu = false">
                <PhGear class="h-5 w-5" />
                Ajustes de Perfil
              </router-link>
              <button @click="logoutUser" class="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left">
                <PhSignOut class="h-5 w-5" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </transition>
      </div>

      <div class="w-px h-6 bg-slate-200 mx-1 hidden sm:block"></div>

      <!-- Logout -->
      <button @click="logoutUser" class="hidden sm:block p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors" title="Cerrar sesión">
        <PhSignOut class="h-6 w-6" />
      </button>
      
    </div>
  </header>
</template>
