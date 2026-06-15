<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/store/auth-store'
import { PhUser, PhGear, PhSignOut } from '@phosphor-icons/vue'

const auth = useAuthStore()
const { user } = storeToRefs(auth)
const router = useRouter()

const isOpen = ref(false)

const userInitials = computed(() => {
  if (!user.value?.fullName) return 'U'
  const names = user.value.fullName.trim().split(' ')
  if (names.length >= 2) {
    return (names[0][0] + names[1][0]).toUpperCase()
  }
  return names[0].substring(0, 2).toUpperCase()
})

const userRoleFormatted = computed(() => {
  const role = user.value?.role || 'paciente'
  return role.charAt(0).toUpperCase() + role.slice(1)
})

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function closeOnClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!target.closest('.profile-container')) {
    isOpen.value = false
  }
}

function logout() {
  auth.logout()
  isOpen.value = false
  void router.push({ name: 'home' })
}

function goToSettings() {
  isOpen.value = false
  void router.push({ name: 'ajustes' })
}

onMounted(() => {
  document.addEventListener('click', closeOnClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', closeOnClickOutside)
})
</script>

<template>
  <div class="relative profile-container flex items-center">
    <button 
      @click="toggleDropdown"
      class="h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-full bg-gradient-to-br from-[#68C8E0] to-[#3E90C8] text-white text-[13px] sm:text-sm font-black shadow-sm border-2 border-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-transform hover:scale-105"
      title="Perfil"
    >
      {{ userInitials }}
    </button>

    <Transition 
      enter-active-class="transition ease-out duration-200" 
      enter-from-class="transform opacity-0 scale-95 translate-y-2" 
      enter-to-class="transform opacity-100 scale-100 translate-y-0" 
      leave-active-class="transition ease-in duration-150" 
      leave-from-class="transform opacity-100 scale-100 translate-y-0" 
      leave-to-class="transform opacity-0 scale-95 translate-y-2"
    >
      <div v-if="isOpen" class="absolute right-0 top-14 mt-1 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 dark:border-slate-700 overflow-hidden z-50">
        
        <div class="px-5 py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
          <p class="text-[15px] font-bold text-slate-800 dark:text-white truncate">{{ user?.fullName || 'Usuario' }}</p>
          <p class="text-xs font-medium text-[#3E90C8] dark:text-[#6DC7DC] mt-0.5">{{ userRoleFormatted }}</p>
        </div>
        
        <div class="py-2">
          <RouterLink 
            v-if="user?.role === 'doctor'"
            :to="{ name: 'doctor-profile' }" 
            @click="isOpen = false"
            class="w-full flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-[#3E90C8] hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <PhUser class="h-5 w-5" />
            Ver Perfil
          </RouterLink>
          
          <button 
            @click="goToSettings"
            class="w-full flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-[#3E90C8] hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <PhGear class="h-5 w-5" />
            Ajustes
          </button>
        </div>
        
        <div class="border-t border-slate-100 dark:border-slate-700 py-2">
          <button 
            @click="logout"
            class="w-full flex items-center gap-3 px-5 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <PhSignOut class="h-5 w-5" />
            Cerrar sesión
          </button>
        </div>

      </div>
    </Transition>
  </div>
</template>
