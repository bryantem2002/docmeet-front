<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { PhMoon, PhBell, PhLockKey } from '@phosphor-icons/vue'

// --- ESTADOS DE CONFIGURACIÓN ---

// 1. Apariencia (Modo Oscuro)
const isDarkMode = ref(false)

// 2. Notificaciones
const notifyAppointments = ref(true)
const notifyResults = ref(true)
const notifyPromotions = ref(false)

// 3. Privacidad y Seguridad
const shareDataWithDoctors = ref(true)

// --- LÓGICA DEL MODO OSCURO ---
// Al cargar la página, revisamos si el usuario ya tenía el modo oscuro guardado
onMounted(() => {
  if (localStorage.getItem('theme') === 'dark' || 
     (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  } else {
    isDarkMode.value = false
    document.documentElement.classList.remove('dark')
  }
})

// Observamos los cambios en el switch para aplicar la clase al <html>
watch(isDarkMode, (newValue) => {
  if (newValue) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
})

// Función para simular guardar cambios
const saveSettings = () => {
  // Aquí enviarías los datos al Spring Boot de tu amigo
  alert('¡Configuraciones guardadas con éxito!')
}
</script>

<template>
  <div class="max-w-4xl mx-auto w-full pb-10">
    
    <!-- Encabezado -->
    <div class="mb-8">
      <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight transition-colors">Configuración</h1>
      <p class="text-sm text-slate-500 dark:text-slate-400 mt-1 transition-colors">Personaliza tu experiencia en DocMeet, notificaciones y seguridad.</p>
    </div>

    <div class="space-y-6">

      <!-- TARJETA 1: APARIENCIA -->
      <section class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 sm:p-8 shadow-sm transition-colors duration-300">
        <h2 class="text-lg font-bold text-slate-800 dark:text-white mb-1 flex items-center gap-2">
          <PhMoon class="h-5 w-5 text-blue-500" />
          Apariencia
        </h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 mb-6">Ajusta cómo se ve la interfaz de la plataforma.</p>

        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-semibold text-slate-700 dark:text-slate-200">Modo Oscuro</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Activa el tema oscuro para proteger tu vista de noche.</p>
          </div>
          
          <!-- Switch Toggle Custom -->
          <button 
            @click="isDarkMode = !isDarkMode"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            :class="isDarkMode ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-600'"
          >
            <span 
              class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              :class="isDarkMode ? 'translate-x-6' : 'translate-x-1'"
            />
          </button>
        </div>
      </section>

      <!-- TARJETA 2: NOTIFICACIONES -->
      <section class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 sm:p-8 shadow-sm transition-colors duration-300">
        <h2 class="text-lg font-bold text-slate-800 dark:text-white mb-1 flex items-center gap-2">
          <PhBell class="h-5 w-5 text-blue-500" />
          Notificaciones
        </h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 mb-6">Elige qué tipo de alertas quieres recibir por correo y WhatsApp.</p>

        <div class="space-y-5">
          <!-- Item 1 -->
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-semibold text-slate-700 dark:text-slate-200">Recordatorios de Citas</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Te avisaremos 24 horas antes de tu consulta.</p>
            </div>
            <button @click="notifyAppointments = !notifyAppointments" class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none" :class="notifyAppointments ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-600'">
              <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform" :class="notifyAppointments ? 'translate-x-6' : 'translate-x-1'"/>
            </button>
          </div>
          <hr class="border-slate-100 dark:border-slate-700">
          
          <!-- Item 2 -->
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-semibold text-slate-700 dark:text-slate-200">Resultados Disponibles</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Alertas cuando el doctor suba una nueva receta o diagnóstico.</p>
            </div>
            <button @click="notifyResults = !notifyResults" class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none" :class="notifyResults ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-600'">
              <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform" :class="notifyResults ? 'translate-x-6' : 'translate-x-1'"/>
            </button>
          </div>
          <hr class="border-slate-100 dark:border-slate-700">

          <!-- Item 3 -->
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-semibold text-slate-700 dark:text-slate-200">Promociones y Salud</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Boletines informativos y descuentos en clínicas.</p>
            </div>
            <button @click="notifyPromotions = !notifyPromotions" class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none" :class="notifyPromotions ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-600'">
              <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform" :class="notifyPromotions ? 'translate-x-6' : 'translate-x-1'"/>
            </button>
          </div>
        </div>
      </section>

      <!-- TARJETA 3: SEGURIDAD -->
      <section class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 sm:p-8 shadow-sm transition-colors duration-300">
        <h2 class="text-lg font-bold text-slate-800 dark:text-white mb-1 flex items-center gap-2">
          <PhLockKey class="h-5 w-5 text-blue-500" />
          Seguridad y Privacidad
        </h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 mb-6">Protege tu cuenta y gestiona quién ve tus datos.</p>

        <div class="space-y-5">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 class="text-sm font-semibold text-slate-700 dark:text-slate-200">Contraseña de acceso</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Última actualización hace 3 meses.</p>
            </div>
            <button class="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-sm font-semibold rounded-lg transition-colors">
              Cambiar contraseña
            </button>
          </div>
          
          <hr class="border-slate-100 dark:border-slate-700">

          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-semibold text-slate-700 dark:text-slate-200">Compartir historial</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Permitir que nuevos doctores vean tu historial clínico pasado.</p>
            </div>
            <button @click="shareDataWithDoctors = !shareDataWithDoctors" class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none" :class="shareDataWithDoctors ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-600'">
              <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform" :class="shareDataWithDoctors ? 'translate-x-6' : 'translate-x-1'"/>
            </button>
          </div>
        </div>
      </section>

      <!-- Botón Guardar -->
      <div class="flex justify-end pt-4">
        <button @click="saveSettings" class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg active:scale-95">
          Guardar Cambios
        </button>
      </div>

    </div>
  </div>
</template>