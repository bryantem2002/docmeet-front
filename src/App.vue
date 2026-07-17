<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import AppHeader from '@/components/layout/app-header.vue'
import AppFooter from '@/components/layout/app-footer.vue'
import PatientSidebar from '@/components/layout/PatientSidebar.vue'
import DashboardHeader from '@/components/layout/DashboardHeader.vue'
import DevSwitcher from '@/components/layout/DevSwitcher.vue' 
import { PhWhatsappLogo } from '@phosphor-icons/vue'

const route = useRoute()
const showDevTools = import.meta.env.DEV

const isDashboardRoute = computed(() => {
  return route.meta.requiresAuth === true
})
</script>

<template>
  <div class="flex flex-col bg-gradient-to-b from-doc-blue-50 to-white text-slate-800 font-sans" :class="isDashboardRoute ? 'h-screen overflow-hidden' : 'min-h-svh'">
    
    <AppHeader v-if="!isDashboardRoute" />
    
    <!-- 1. ELIMINAMOS max-w-7xl y mx-auto para que crezca al 100% de la pantalla -->
    <div class="flex-1 w-full flex items-start">
        <PatientSidebar v-if="isDashboardRoute" />
      
      <main class="flex-1 w-full flex flex-col min-w-0" :class="isDashboardRoute ? 'h-screen overflow-y-auto bg-slate-50/50 dark:bg-slate-900/80' : ''">
        <DashboardHeader v-if="isDashboardRoute" />
        <div :class="isDashboardRoute ? 'p-6 lg:p-10 flex-1' : 'flex-1 flex flex-col'">
          <RouterView v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" :key="route.path" />
            </transition>
          </RouterView>
        </div>
      </main>
      
    </div>
    
    <AppFooter v-if="!isDashboardRoute" />
    
    <!-- WhatsApp Flotante -->
    <a 
      v-if="!isDashboardRoute"
      href="https://wa.me/51987654321" 
      target="_blank" 
      rel="noopener noreferrer"
      class="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
      aria-label="Contactar por WhatsApp"
    >
      <PhWhatsappLogo class="w-8 h-8" weight="fill" />
    </a>

    <DevSwitcher v-if="showDevTools" />
    
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
