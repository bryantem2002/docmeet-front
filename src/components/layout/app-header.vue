<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/store/auth-store'
import { RouterLink, useRouter } from 'vue-router'
import AuthModal from '@/components/layout/AuthModal.vue' // <-- Asegúrate de ajustar la ruta si es necesario
import NotificationDropdown from '@/components/layout/NotificationDropdown.vue' // Ajusta la ruta

const auth = useAuthStore()
const { isAuthenticated, user } = storeToRefs(auth)
const router = useRouter()

// Variables para controlar el modal
const showAuthModal = ref(false)
const initialAuthMode = ref<'login' | 'register'>('login')

function openAuthModal(mode: 'login' | 'register') {
  initialAuthMode.value = mode
  showAuthModal.value = true
}

function logout(): void {
  auth.logout()
  void router.push({ name: 'home' }) // Te sugiero mandar a home tras salir, en lugar de un 'login' page inexistente
}

// Generar iniciales para el avatar del usuario
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
  <header class="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl supports-[backdrop-filter]:bg-white/75">
    <div class="mx-auto grid h-16 w-full max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
      <RouterLink :to="{ name: 'home' }" class="flex items-center gap-3 group min-w-0">
        <div class="flex h-10 w-10 items-center justify-center transition-transform duration-300 group-hover:-translate-y-0.5">
          <img :src="'/img/logodoc.png'" alt="DocMeet Logo" class="w-full h-full object-contain drop-shadow-sm" />
        </div>
        <div class="leading-tight">
          <p class="text-[1.35rem] tracking-tight text-slate-800">
            <span class="font-black text-[var(--color-doc-blue-700)]">Doc</span><span class="font-semibold">Meet</span>
          </p>
          <p class="hidden text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400 sm:block">Salud digital</p>
        </div>
      </RouterLink>

      <nav class="hidden items-center justify-center gap-2 text-sm font-semibold lg:flex">
        <RouterLink
          :to="{ name: 'doctors' }"
          class="rounded-lg px-4 py-2 text-slate-600 transition-colors hover:bg-blue-50 hover:text-[var(--color-doc-blue-600)]"
          active-class="bg-blue-50 text-[var(--color-doc-blue-700)]"
        >
          Directorio Médico
        </RouterLink>

        <RouterLink
          v-if="isAuthenticated"
          :to="{ name: 'appointments' }"
          class="rounded-lg px-4 py-2 text-slate-600 transition-colors hover:bg-blue-50 hover:text-[var(--color-doc-blue-600)]"
          active-class="bg-blue-50 text-[var(--color-doc-blue-700)]"
        >
          Mis Citas
        </RouterLink>

        <RouterLink
          v-if="user?.role === 'admin'"
          :to="{ name: 'admin' }"
          class="rounded-lg px-4 py-2 text-[var(--color-doc-teal-600)] transition-colors hover:bg-teal-50"
          active-class="bg-teal-50"
        >
          Panel Admin
        </RouterLink>
      </nav>

      <nav class="flex items-center justify-end gap-2 text-sm font-medium">
        <RouterLink
          :to="{ name: 'doctors' }"
          class="rounded-md px-3 py-2 text-[var(--color-doc-text-muted)] transition-colors hover:text-[var(--color-doc-blue-600)] lg:hidden"
          active-class="text-[var(--color-doc-blue-700)]"
        >
          Directorio
        </RouterLink>
        <template v-if="!isAuthenticated">
          <button
            @click="openAuthModal('login')"
            class="hidden rounded-md px-3 py-2 text-[var(--color-doc-text-main)] transition-colors hover:text-[var(--color-doc-blue-600)] sm:inline-flex"
          >
            Ingresar
          </button>
          <button
            @click="openAuthModal('register')"
            class="rounded-xl bg-[var(--color-doc-blue-600)] px-4 py-2.5 text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[var(--color-doc-blue-700)] hover:shadow-md hover:shadow-blue-600/20"
          >
            Registrarse
          </button>
        </template>

        <template v-else>
          <div class="flex items-center gap-2 sm:gap-3">
            <NotificationDropdown />

            <div class="hidden max-w-[160px] flex-col items-end sm:flex">
              <span class="truncate text-[var(--color-doc-text-main)] font-semibold">
                {{ user?.fullName }}
              </span>
              <span class="text-xs capitalize text-[var(--color-doc-text-muted)]">
                {{ user?.role || 'Paciente' }}
              </span>
            </div>

            <div class="flex h-9 w-9 items-center justify-center rounded-full border border-blue-200 bg-blue-100 text-[var(--color-doc-blue-700)] font-bold shadow-sm">
              {{ userInitials }}
            </div>

            <button
              type="button"
              class="p-1 text-slate-400 transition-colors hover:text-red-600"
              title="Cerrar sesión"
              @click="logout"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </template>

      </nav>
    </div>
  </header>

  <Teleport to="body">
    <AuthModal 
      v-if="showAuthModal" 
      :initial-mode="initialAuthMode" 
      @close="showAuthModal = false" 
    />
  </Teleport>
</template>