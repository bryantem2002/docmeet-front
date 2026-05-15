<script setup lang="ts">
import { RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/store/auth-store'

import AppHeader from '@/components/layout/app-header.vue'
import PatientSidebar from '@/components/layout/PatientSidebar.vue'
import DevSwitcher from '@/components/layout/DevSwitcher.vue' // <-- 1. Importamos el DevSwitcher

const auth = useAuthStore()
const { isAuthenticated } = storeToRefs(auth)
</script>

<template>
  <div class="min-h-svh flex flex-col bg-gradient-to-b from-doc-blue-50 to-white text-slate-800 font-sans">
    
    <!-- Header (Ocupa todo el ancho superior) -->
    <AppHeader />
    
    <!-- 2. ELIMINAMOS max-w-7xl y mx-auto para que crezca al 100% de la pantalla -->
    <div class="flex-1 w-full">
      
      <!-- 3. Sidebar: Ahora sale para TODOS los usuarios logueados (Admin, Médico, Paciente) -->
      <PatientSidebar v-if="isAuthenticated" />
      
      <!-- Contenido Principal de las rutas -->
      <main class="w-full min-w-0 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <div class="mx-auto w-full max-w-7xl">
          <RouterView v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </RouterView>
        </div>
      </main>
      
    </div>
    
    <!-- Footer -->
    <footer class="border-t border-slate-200/80 py-6 text-center text-sm text-slate-500 mt-auto bg-white/50 backdrop-blur-sm">
      Docmeet — Gestión de citas médicas
    </footer>
    
    <!-- 4. Colocamos el DevSwitcher para hacer pruebas de roles -->
    <DevSwitcher />
    
  </div>
</template>

<style scoped>
/* Animación suave al cambiar de vista en el RouterView */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>