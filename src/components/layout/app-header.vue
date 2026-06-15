<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/store/auth-store'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { useDarkMode } from '@/composables/useDarkMode'
import AuthModal from '@/components/layout/AuthModal.vue'
import NotificationDropdown from '@/components/layout/NotificationDropdown.vue'
import ProfileDropdown from '@/components/layout/ProfileDropdown.vue'
import {
  PhSignOut,
  PhPhone,
  PhWhatsappLogo,
  PhList,
  PhX,
  PhStethoscope,
  PhUsers,
  PhHeartbeat,
  PhSun,
  PhMoon
} from '@phosphor-icons/vue'

const auth = useAuthStore()
const { isAuthenticated, user } = storeToRefs(auth)
const router = useRouter()
const route = useRoute()

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

function scrollToSection(sectionId: string) {
  if (route.name !== 'home') {
    void router.push({ name: 'home', hash: `#${sectionId}` })
    return
  }
  const el = document.getElementById(sectionId)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}



const dashboardRouteName = computed(() => {
  if (user.value?.role === 'admin') return 'admin'
  if (user.value?.role === 'doctor') return 'doctor-dashboard'
  if (user.value?.role === 'secretaria') return 'secretary-dashboard'
  return 'appointments'
})

const { isDark, toggleDark } = useDarkMode()
</script>

<template>
  <header class="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 transition-all duration-300">
    <div class="mx-auto w-full max-w-[1600px] flex items-center h-[72px] md:h-[80px] lg:h-[92px] px-4 md:px-6 lg:px-10">

      <!-- Logo -->
      <RouterLink :to="{ name: 'home' }" class="flex items-center gap-1.5 sm:gap-2 lg:gap-3 shrink-0 mr-auto md:mr-4 lg:mr-0 min-w-0">
        <img src="/img/logodoc.png" alt="DocMeet" class="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 object-contain shrink-0" />
        <div class="leading-none shrink-0">
          <p class="text-lg md:text-xl lg:text-[1.7rem] tracking-tight">
            <span class="font-black text-[#3E90C8]">Doc</span><span class="font-bold text-slate-800 dark:text-white">Meet</span>
          </p>
          <p class="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500 mt-0.5 hidden md:block">Salud digital</p>
        </div>
      </RouterLink>


      <!-- Nav center (desktop) -->
      <nav class="hidden md:flex items-center gap-3 lg:gap-6 xl:gap-8 mx-auto text-[13px] lg:text-sm xl:text-base font-bold text-slate-700 dark:text-slate-200">
        <a href="/#nosotros" class="py-2 hover:text-[#3E90C8] dark:hover:text-[#6DC7DC] transition-colors" @click.prevent="scrollToSection('nosotros')">
          Nosotros
        </a>

        <RouterLink :to="{ name: 'doctors' }" class="py-2 hover:text-[#3E90C8] dark:hover:text-[#6DC7DC] transition-colors">
          Médicos
        </RouterLink>

        <a href="/#servicios" class="py-2 hover:text-[#3E90C8] dark:hover:text-[#6DC7DC] transition-colors" @click.prevent="scrollToSection('servicios')">
          Servicios
        </a>

        <a href="/#sedes" class="py-2 hover:text-[#3E90C8] dark:hover:text-[#6DC7DC] transition-colors" @click.prevent="scrollToSection('sedes')">
          Sucursales
        </a>

      </nav>


      <!-- Right side -->
      <div class="flex items-center gap-2 sm:gap-5 shrink-0">

        <!-- Contact + Buttons in one row (desktop) -->
        <div class="hidden md:flex items-center gap-2 lg:gap-3 xl:gap-5">
          <!-- Contact -->
          <div class="hidden xl:flex items-center gap-5 text-[14px] font-bold text-slate-700 dark:text-slate-300">
            <a href="https://wa.me/51981124011" target="_blank" class="flex items-center gap-2 hover:text-[#3E90C8] dark:hover:text-[#6DC7DC] transition-colors">
              <PhWhatsappLogo class="h-4 w-4 text-emerald-500" weight="fill" />
              927-876-603
            </a>
            <span class="w-px h-4 bg-slate-200 dark:bg-slate-600"></span>
            <a href="tel:016103333" class="flex items-center gap-2 hover:text-[#3E90C8] dark:hover:text-[#6DC7DC] transition-colors">
              <PhPhone class="h-4 w-4 text-[#3E90C8]" weight="fill" />
              (01)610-3333
            </a>
          </div>

          <!-- Dark mode toggle -->
          <button
            @click="toggleDark"
            class="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            :title="isDark ? 'Modo claro' : 'Modo oscuro'"
          >
            <PhSun v-if="isDark" class="w-4 h-4" weight="fill" />
            <PhMoon v-else class="w-4 h-4" weight="fill" />
          </button>

          <!-- Buttons -->
          <div v-if="!isAuthenticated" class="flex items-center gap-1.5 lg:gap-2 xl:gap-3">
        <button
          @click="openAuthModal('register')"
          class="rounded-full border-2 border-[#3E90C8] px-3 md:px-4 lg:px-6 xl:px-7 py-1.5 md:py-2 lg:py-2.5 text-[#3E90C8] dark:text-white text-[12px] lg:text-[13px] xl:text-[15px] font-bold transition-all hover:bg-[#3E90C8] hover:text-white"
        >
              Regístrate
            </button>
            <button
              @click="openAuthModal('login')"
              class="rounded-full bg-[#3E90C8] px-3 md:px-4 lg:px-6 xl:px-7 py-1.5 md:py-2 lg:py-2.5 text-white text-[12px] lg:text-[13px] xl:text-[15px] font-bold transition-all hover:bg-[#2d7ab5] shadow-md shadow-[#3E90C8]/20 hover:shadow-lg hover:-translate-y-0.5"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>

        <!-- Shared Authenticated Profile / Desktop Panel Button -->
        <div v-if="isAuthenticated" class="flex items-center gap-2 sm:gap-3">
          <RouterLink
            :to="{ name: dashboardRouteName }"
            class="hidden md:block rounded-full bg-[#3E90C8] px-3 lg:px-5 xl:px-6 py-1.5 lg:py-2 text-white text-[12px] lg:text-[13px] xl:text-[14px] font-bold transition-all hover:bg-[#2d7ab5] shadow-md shadow-[#3E90C8]/20 hover:-translate-y-0.5 mr-1 lg:mr-2"
          >
            Ir a mi panel
          </RouterLink>

          <NotificationDropdown />
          <ProfileDropdown />
        </div>

        <div class="flex items-center gap-1 sm:gap-2 md:hidden">
          <button
            @click="toggleDark"
            class="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            :title="isDark ? 'Modo claro' : 'Modo oscuro'"
          >
            <PhSun v-if="isDark" class="w-3.5 h-3.5 sm:w-4 sm:h-4" weight="fill" />
            <PhMoon v-else class="w-3.5 h-3.5 sm:w-4 sm:h-4" weight="fill" />
          </button>
        </div>

        <!-- Mobile hamburger -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors -mr-2"
        >
          <PhX v-if="mobileMenuOpen" class="h-6 w-6" weight="bold" />
          <PhList v-else class="h-6 w-6" weight="bold" />
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="mobileMenuOpen" class="absolute top-[72px] left-0 w-full md:hidden border-t border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-5 py-4 shadow-2xl">

      <!-- Nav links -->
      <a href="/#nosotros" class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-700 dark:text-slate-200 font-bold text-base hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" @click="mobileMenuOpen = false; scrollToSection('nosotros')">
        <PhUsers class="h-5 w-5 text-[#3E90C8]" />
        Nosotros
      </a>
      <RouterLink :to="{ name: 'doctors' }" class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-700 dark:text-slate-200 font-bold text-base hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" @click="mobileMenuOpen = false">
        <PhStethoscope class="h-5 w-5 text-[#3E90C8]" />
        Médicos
      </RouterLink>
      <a href="/#servicios" class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-700 dark:text-slate-200 font-bold text-base hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" @click="mobileMenuOpen = false; scrollToSection('servicios')">
        <PhHeartbeat class="h-5 w-5 text-[#3E90C8]" />
        Servicios
      </a>
      <a href="/#sedes" class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-700 dark:text-slate-200 font-bold text-base hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" @click="mobileMenuOpen = false; scrollToSection('sedes')">
        <PhStethoscope class="h-5 w-5 text-[#3E90C8]" />
        Sucursales
      </a>
      <template v-if="isAuthenticated">
        <div class="px-4 py-2 flex flex-col gap-3">
          <RouterLink :to="{ name: dashboardRouteName }" class="w-full flex items-center justify-center gap-2 rounded-xl bg-[#3E90C8] px-4 py-3.5 text-base font-bold text-white transition-all hover:bg-[#2d7ab5] shadow-md shadow-[#3E90C8]/20" @click="mobileMenuOpen = false">
            <PhList class="h-5 w-5" />
            Ir a mi panel
          </RouterLink>
          <button type="button" class="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-red-500 px-4 py-3 text-base font-bold text-red-500 transition-all hover:bg-red-500 hover:text-white" @click="logout(); mobileMenuOpen = false;">
            <PhSignOut class="h-5 w-5" />
            Cerrar sesión
          </button>
        </div>
      </template>

      <div v-else class="px-4 py-3 flex flex-col gap-3">
        <button
          @click="openAuthModal('login')"
          class="w-full rounded-xl bg-[#3E90C8] px-4 py-3 text-sm font-bold text-white transition-all hover:bg-[#2d7ab5]"
        >
          Iniciar Sesión
        </button>
        <button
          @click="openAuthModal('register')"
          class="w-full rounded-xl border-2 border-[#3E90C8] px-4 py-3 text-sm font-bold text-[#3E90C8] dark:text-white transition-all hover:bg-[#3E90C8] hover:text-white"
        >
          Regístrate
        </button>
      </div>

      <hr class="my-2 border-slate-100 dark:border-slate-700" />

      <!-- Phone numbers -->
      <div class="flex items-center gap-5 px-4 py-3 text-sm text-slate-500 dark:text-slate-400 font-bold">
        <a href="https://wa.me/51981124011" target="_blank" class="flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
          <PhWhatsappLogo class="h-4 w-4 text-emerald-500" weight="fill" />
          927-876-603
        </a>
        <a href="tel:016103333" class="flex items-center gap-1.5 hover:text-[#3E90C8] dark:hover:text-[#6DC7DC] transition-colors">
          <PhPhone class="h-4 w-4 text-[#3E90C8]" weight="fill" />
          (01)610-3333
        </a>
      </div>
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