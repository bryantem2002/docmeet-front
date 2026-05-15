<script setup lang="ts">
import { RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/store/auth-store'

import AppHeader from '@/components/layout/app-header.vue'
import PatientSidebar from '@/components/layout/PatientSidebar.vue'
import DevSwitcher from '@/components/layout/DevSwitcher.vue' 

const auth = useAuthStore()
const { isAuthenticated } = storeToRefs(auth)
</script>

<template>
  <div class="min-h-svh flex flex-col bg-gradient-to-b from-doc-blue-50 to-white text-slate-800 font-sans">
    
    <AppHeader />
    
    <!-- 1. ELIMINAMOS max-w-7xl y mx-auto para que crezca al 100% de la pantalla -->
    <div class="flex-1 w-full flex items-start">
        <PatientSidebar v-if="isAuthenticated" />
      
      <main class="flex-1 w-full flex flex-col p-4 sm:p-6 lg:p-8 min-w-0">
        <RouterView v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </RouterView>
      </main>
      
    </div>
    
    <footer class="border-t border-slate-200/80 py-6 text-center text-sm text-slate-500 mt-auto bg-white/50 backdrop-blur-sm">
      Docmeet — Gestión de citas médicas
    </footer>
    
    <!-- El DevSwitcher sigue flotando aquí abajo -->
    <DevSwitcher />
    
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