<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/store/auth-store'
import { RouterLink, useRouter } from 'vue-router'
import AuthModal from '@/components/layout/AuthModal.vue'
import NotificationDropdown from '@/components/layout/NotificationDropdown.vue'
import {
  PhSignOut,
  PhPhone,
  PhWhatsappLogo,
  PhList,
  PhX,
  PhStethoscope,
  PhUsers,
  PhHeartbeat,
  PhCalendarCheck
} from '@phosphor-icons/vue'

const auth = useAuthStore()
const { isAuthenticated, user } = storeToRefs(auth)
const router = useRouter()

const showAuthModal = ref(false)
const initialAuthMode = ref<'login' | 'register'>('login')
const mobileMenuOpen = ref(false)

function openAuthModal(mode: 'login' | 'register') {
  initialAuthMode.value = mode
  showAuthModal.value = true
  mobileMenuOpen.value = false
}

function logout(): void {
  auth.logout()
  void router.push({ name: 'home' })
}

const userInitials = computed(() => {
  if (!user.value?.fullName) return 'U'
  const names = user.value.fullName.trim().split(' ')
  if (names.length >= 2) {
    return (names[0][0] + names[1][0]).toUpperCase()
  }
  return names[0].substring(0, 2).toUpperCase()
})

const dashboardRouteName = computed(() => {
  if (user.value?.role === 'admin') return 'admin'
  if (user.value?.role === 'doctor') return 'doctor-dashboard'
  if (user.value?.role === 'secretaria') return 'secretary-dashboard'
  return 'appointments'
})
</script>

<template>
  <header class="sticky top-0 z-50 bg-white border-b border-slate-200">
    <div class="mx-auto w-full max-w-[1600px] flex items-center h-[92px] px-6 lg:px-10">

      <!-- Logo -->
      <RouterLink :to="{ name: 'home' }" class="flex items-center gap-3 shrink-0 mr-auto lg:mr-0">
        <img src="/img/logodoc.png" alt="DocMeet" class="h-12 w-12 object-contain" />
        <div class="leading-none">
          <p class="text-[1.7rem] tracking-tight">
            <span class="font-black text-[#3E90C8]">Doc</span><span class="font-bold text-slate-800">Meet</span>
          </p>
          <p class="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400 mt-0.5 hidden sm:block">Salud digital</p>
        </div>
      </RouterLink>


      <!-- Nav center (desktop) -->
      <nav class="hidden lg:flex items-center gap-8 mx-auto text-base font-bold text-slate-700">
        <RouterLink to="/#nosotros" class="py-2 hover:text-[#3E90C8] transition-colors">
          Nosotros
        </RouterLink>

        <RouterLink :to="{ name: 'doctors' }" class="py-2 hover:text-[#3E90C8] transition-colors">
          Médicos
        </RouterLink>

        <RouterLink to="/#servicios" class="py-2 hover:text-[#3E90C8] transition-colors">
          Servicios
        </RouterLink>

        <RouterLink to="/#sedes" class="py-2 hover:text-[#3E90C8] transition-colors">
          Sucursales
        </RouterLink>

      </nav>


      <!-- Right side -->
      <div class="flex items-center gap-5 shrink-0">

        <!-- Contact + Buttons in one row (desktop) -->
        <div class="hidden lg:flex items-center gap-5">
          <!-- Contact -->
          <div class="flex items-center gap-5 text-[14px] font-bold text-slate-700">
            <a href="https://wa.me/51981124011" target="_blank" class="flex items-center gap-2 hover:text-[#3E90C8] transition-colors">
              <PhWhatsappLogo class="h-4 w-4 text-emerald-500" weight="fill" />
              927-876-603
            </a>
            <span class="w-px h-4 bg-slate-200"></span>
            <a href="tel:016103333" class="flex items-center gap-2 hover:text-[#3E90C8] transition-colors">
              <PhPhone class="h-4 w-4 text-[#3E90C8]" weight="fill" />
              (01)610-3333
            </a>
          </div>
          <!-- Buttons -->
          <div v-if="!isAuthenticated" class="flex items-center gap-3">
            <button
              @click="openAuthModal('register')"
              class="rounded-full border-2 border-[#3E90C8] px-7 py-2.5 text-[#3E90C8] text-[15px] font-bold transition-all hover:bg-[#3E90C8] hover:text-white"
            >
              Regístrate
            </button>
            <button
              @click="openAuthModal('login')"
              class="rounded-full bg-[#3E90C8] px-7 py-2.5 text-white text-[15px] font-bold transition-all hover:bg-[#2d7ab5] shadow-md shadow-[#3E90C8]/20 hover:shadow-lg hover:-translate-y-0.5"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>

        <!-- Mobile: solo botones sin contactos -->
        <template v-if="!isAuthenticated">
          <button
            @click="openAuthModal('login')"
            class="lg:hidden rounded-full bg-[#3E90C8] px-5 py-2 text-white text-sm font-bold transition-all hover:bg-[#2d7ab5]"
          >
            Ingresar
          </button>
        </template>
        <template v-else>
          <!-- Mobile "Mi Panel" Button -->
          <RouterLink
            :to="{ name: dashboardRouteName }"
            class="lg:hidden rounded-full bg-[#3E90C8] px-5 py-2 text-white text-sm font-bold transition-all hover:bg-[#2d7ab5] mr-2"
          >
            Mi Panel
          </RouterLink>

          <!-- Shared Authenticated Profile / Desktop Panel Button -->
          <div class="flex items-center gap-3">
            <RouterLink
              :to="{ name: dashboardRouteName }"
              class="hidden lg:block rounded-full bg-[#3E90C8] px-6 py-2 text-white text-[14px] font-bold transition-all hover:bg-[#2d7ab5] shadow-md shadow-[#3E90C8]/20 hover:-translate-y-0.5 mr-2"
            >
              Ir a mi panel
            </RouterLink>

            <NotificationDropdown />


            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#68C8E0] to-[#3E90C8] text-white text-sm font-black shadow-sm border-2 border-white">
              {{ userInitials }}
            </div>

            <button
              type="button"
              class="p-2 text-slate-400 hover:text-red-500 rounded-lg transition-colors ml-1"
              title="Cerrar sesión"
              @click="logout"
            >
              <PhSignOut class="h-5 w-5" weight="bold" />
            </button>
          </div>
        </template>

        <!-- Mobile hamburger -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors -mr-2"
        >
          <PhX v-if="mobileMenuOpen" class="h-6 w-6" weight="bold" />
          <PhList v-else class="h-6 w-6" weight="bold" />
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="mobileMenuOpen" class="lg:hidden border-t border-slate-100 bg-white px-5 py-4 space-y-1">
      <RouterLink to="/#nosotros" class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-700 font-bold text-base hover:bg-slate-50 transition-colors" @click="mobileMenuOpen = false">
        <PhUsers class="h-5 w-5 text-[#3E90C8]" />
        Nosotros
      </RouterLink>
      <RouterLink :to="{ name: 'doctors' }" class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-700 font-bold text-base hover:bg-slate-50 transition-colors" @click="mobileMenuOpen = false">
        <PhStethoscope class="h-5 w-5 text-[#3E90C8]" />
        Médicos
      </RouterLink>
      <RouterLink to="/#servicios" class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-700 font-bold text-base hover:bg-slate-50 transition-colors" @click="mobileMenuOpen = false">
        <PhHeartbeat class="h-5 w-5 text-[#3E90C8]" />
        Servicios
      </RouterLink>
      <RouterLink to="/#sedes" class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-700 font-bold text-base hover:bg-slate-50 transition-colors" @click="mobileMenuOpen = false">
        <PhStethoscope class="h-5 w-5 text-[#3E90C8]" />
        Sucursales
      </RouterLink>
      <RouterLink v-if="isAuthenticated" :to="{ name: 'appointments' }" class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-700 font-bold text-base hover:bg-slate-50 transition-colors" @click="mobileMenuOpen = false">
        <PhCalendarCheck class="h-5 w-5 text-[#3E90C8]" />
        Mis Citas
      </RouterLink>
      <hr class="my-3 border-slate-100" />
      <div class="flex items-center gap-5 px-4 py-2 text-sm text-slate-500 font-bold">
        <a href="https://wa.me/51981124011" target="_blank" class="flex items-center gap-1.5 hover:text-emerald-600 transition-colors">
          <PhWhatsappLogo class="h-4 w-4 text-emerald-500" weight="fill" />
          927-876-603
        </a>
        <a href="tel:016103333" class="flex items-center gap-1.5 hover:text-[#3E90C8] transition-colors">
          <PhPhone class="h-4 w-4 text-[#3E90C8]" weight="fill" />
          (01)610-3333
        </a>
      </div>
      <template v-if="!isAuthenticated">
        <button @click="openAuthModal('login')" class="w-full mt-2 rounded-xl bg-[#3E90C8] px-5 py-3.5 text-white text-sm font-bold transition-colors hover:bg-[#2d7ab5]">
          Iniciar Sesión
        </button>
      </template>
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