<script setup lang="ts">
import { ref } from 'vue'
import { useDarkMode } from '@/composables/useDarkMode'
import { PhMoon, PhBell, PhLockKey, PhUser, PhCamera, PhSpinner, PhCheckCircle } from '@phosphor-icons/vue'
import { changePassword } from '@/services/auth-service'

const { isDark: isDarkMode, toggleDark } = useDarkMode()

// --- ESTADOS DE CONFIGURACIÓN ---
const userProfile = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dni: '',
  birthDate: '',
  gender: '',
  avatar: ''
})

// 1. Notificaciones
const notifyAppointments = ref(true)
const notifyResults = ref(true)
const notifyPromotions = ref(false)

// 2. Privacidad y Seguridad
const shareDataWithDoctors = ref(true)

const settingsNotice = ref('')

const saveSettings = () => {
  settingsNotice.value = 'El guardado del perfil estará disponible cuando el backend exponga su endpoint de actualización.'
}

// Cambiar contraseña
const showChangePasswordForm = ref(false)
const cpOldPassword = ref('')
const cpNewPassword = ref('')
const cpConfirmPassword = ref('')
const cpLoading = ref(false)
const cpError = ref<string | null>(null)
const cpSuccess = ref<string | null>(null)

async function submitChangePassword() {
  cpError.value = null
  cpSuccess.value = null
  if (cpNewPassword.value !== cpConfirmPassword.value) {
    cpError.value = 'Las contraseñas nuevas no coinciden'
    return
  }
  if (cpNewPassword.value.length < 6) {
    cpError.value = 'La nueva contraseña debe tener al menos 6 caracteres'
    return
  }
  cpLoading.value = true
  try {
    await changePassword({ oldPassword: cpOldPassword.value, newPassword: cpNewPassword.value })
    cpSuccess.value = '¡Contraseña actualizada correctamente!'
    cpOldPassword.value = ''
    cpNewPassword.value = ''
    cpConfirmPassword.value = ''
    showChangePasswordForm.value = false
  } catch (e: any) {
    cpError.value = e.response?.data?.message || 'Error al actualizar la contraseña.'
  } finally {
    cpLoading.value = false
  }
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

      <!-- TARJETA 0: PERFIL PERSONAL -->
      <section class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 sm:p-8 shadow-sm transition-colors duration-300">
        <h2 class="text-lg font-bold text-slate-800 dark:text-white mb-1 flex items-center gap-2">
          <PhUser class="h-5 w-5 text-[#418FC8]" />
          Información Personal
        </h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 mb-6">Actualiza tus datos básicos de contacto.</p>

        <div class="flex flex-col md:flex-row gap-8 items-center md:items-start">
          
          <!-- Foto de Perfil -->
          <div class="shrink-0 flex flex-col items-center gap-3">
            <div class="relative group cursor-pointer">
              <div class="h-32 w-32 rounded-full bg-gradient-to-r from-[#418FC8] to-[#6DC7DC] flex items-center justify-center text-white text-4xl font-black shadow-lg overflow-hidden border-4 border-white dark:border-slate-700 transition-transform group-hover:scale-105">
                <span v-if="!userProfile.avatar">JP</span>
                <img v-else :src="userProfile.avatar" class="w-full h-full object-cover" />
              </div>
              <div class="absolute bottom-1 right-1 p-2.5 bg-white text-[#418FC8] rounded-full shadow-md border border-slate-100 hover:bg-slate-50 transition-colors">
                <PhCamera class="h-5 w-5" weight="fill" />
              </div>
            </div>
            <p class="text-xs font-semibold text-[#418FC8] hover:underline cursor-pointer">Cambiar foto</p>
          </div>

          <!-- Campos del Formulario -->
          <div class="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-200">Nombres</label>
              <input type="text" v-model="userProfile.firstName" class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6DC7DC]/50 focus:border-[#418FC8] text-sm text-slate-800 dark:text-slate-200 transition-colors shadow-sm" />
            </div>
            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-200">Apellidos</label>
              <input type="text" v-model="userProfile.lastName" class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6DC7DC]/50 focus:border-[#418FC8] text-sm text-slate-800 dark:text-slate-200 transition-colors shadow-sm" />
            </div>
            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-200">DNI / Pasaporte</label>
              <input type="text" v-model="userProfile.dni" class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6DC7DC]/50 focus:border-[#418FC8] text-sm text-slate-800 dark:text-slate-200 transition-colors shadow-sm" />
            </div>
            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-200">Fecha de Nacimiento</label>
              <input type="date" v-model="userProfile.birthDate" class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6DC7DC]/50 focus:border-[#418FC8] text-sm text-slate-800 dark:text-slate-200 transition-colors shadow-sm" />
            </div>
            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-200">Género</label>
              <select v-model="userProfile.gender" class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6DC7DC]/50 focus:border-[#418FC8] text-sm text-slate-800 dark:text-slate-200 transition-colors shadow-sm">
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
                <option value="Prefiero no decirlo">Prefiero no decirlo</option>
              </select>
            </div>
            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-200">Teléfono</label>
              <input type="tel" v-model="userProfile.phone" class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6DC7DC]/50 focus:border-[#418FC8] text-sm text-slate-800 dark:text-slate-200 transition-colors shadow-sm" />
            </div>
            <div class="space-y-1.5 sm:col-span-2">
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-200">Correo Electrónico</label>
              <input type="email" v-model="userProfile.email" class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6DC7DC]/50 focus:border-[#418FC8] text-sm text-slate-800 dark:text-slate-200 transition-colors shadow-sm" />
            </div>
          </div>
        </div>
      </section>

      <!-- TARJETA 1: APARIENCIA -->
      <section class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 sm:p-8 shadow-sm transition-colors duration-300">
        <h2 class="text-lg font-bold text-slate-800 dark:text-white mb-1 flex items-center gap-2">
          <PhMoon class="h-5 w-5 text-[#418FC8]" />
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
            @click="toggleDark"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            :class="isDarkMode ? 'bg-[#418FC8]' : 'bg-slate-200 dark:bg-slate-600'"
          >
            <span 
              class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              :class="isDarkMode ? 'translate-x-6' : 'translate-x-1'"
            ></span>
          </button>
        </div>
      </section>

      <!-- TARJETA 2: NOTIFICACIONES -->
      <section class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 sm:p-8 shadow-sm transition-colors duration-300">
        <h2 class="text-lg font-bold text-slate-800 dark:text-white mb-1 flex items-center gap-2">
          <PhBell class="h-5 w-5 text-[#418FC8]" />
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
            <button @click="notifyAppointments = !notifyAppointments" class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none" :class="notifyAppointments ? 'bg-[#418FC8]' : 'bg-slate-200 dark:bg-slate-600'">
              <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform" :class="notifyAppointments ? 'translate-x-6' : 'translate-x-1'"></span>
            </button>
          </div>
          <hr class="border-slate-100 dark:border-slate-700">
          
          <!-- Item 2 -->
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-semibold text-slate-700 dark:text-slate-200">Resultados Disponibles</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Alertas cuando el doctor suba una nueva receta o diagnóstico.</p>
            </div>
            <button @click="notifyResults = !notifyResults" class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none" :class="notifyResults ? 'bg-[#418FC8]' : 'bg-slate-200 dark:bg-slate-600'">
              <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform" :class="notifyResults ? 'translate-x-6' : 'translate-x-1'"></span>
            </button>
          </div>
          <hr class="border-slate-100 dark:border-slate-700">

          <!-- Item 3 -->
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-semibold text-slate-700 dark:text-slate-200">Promociones y Salud</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Boletines informativos y descuentos en clínicas.</p>
            </div>
            <button @click="notifyPromotions = !notifyPromotions" class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none" :class="notifyPromotions ? 'bg-[#418FC8]' : 'bg-slate-200 dark:bg-slate-600'">
              <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform" :class="notifyPromotions ? 'translate-x-6' : 'translate-x-1'"></span>
            </button>
          </div>
        </div>
      </section>

      <!-- TARJETA 3: SEGURIDAD -->
      <section class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 sm:p-8 shadow-sm transition-colors duration-300">
        <h2 class="text-lg font-bold text-slate-800 dark:text-white mb-1 flex items-center gap-2">
          <PhLockKey class="h-5 w-5 text-[#418FC8]" />
          Seguridad y Privacidad
        </h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 mb-6">Protege tu cuenta y gestiona quién ve tus datos.</p>

        <div class="space-y-5">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 class="text-sm font-semibold text-slate-700 dark:text-slate-200">Contraseña de acceso</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Actualiza tu contraseña periódicamente para mayor seguridad.</p>
            </div>
            <button @click="showChangePasswordForm = !showChangePasswordForm" class="shrink-0 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-sm font-semibold rounded-lg transition-colors">
              {{ showChangePasswordForm ? 'Cancelar' : 'Cambiar contraseña' }}
            </button>
          </div>
          
          <!-- Formulario inline de cambio de contraseña -->
          <div v-if="showChangePasswordForm" class="border border-slate-200 dark:border-slate-700 rounded-xl p-5 bg-slate-50 dark:bg-slate-900 space-y-4">
            <div v-if="cpError" class="rounded-lg bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm px-4 py-3 border border-red-200 dark:border-red-800">
              {{ cpError }}
            </div>
            <div v-if="cpSuccess" class="rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm px-4 py-3 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2">
              <PhCheckCircle class="w-5 h-5" weight="fill" />
              {{ cpSuccess }}
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">Contraseña actual</label>
              <input v-model="cpOldPassword" type="password" class="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6DC7DC]/50 focus:border-[#418FC8]" />
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">Nueva contraseña</label>
                <input v-model="cpNewPassword" type="password" minlength="6" class="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6DC7DC]/50 focus:border-[#418FC8]" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">Confirmar nueva contraseña</label>
                <input v-model="cpConfirmPassword" type="password" minlength="6" class="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6DC7DC]/50 focus:border-[#418FC8]" />
              </div>
            </div>
            <div class="flex justify-end">
              <button @click="submitChangePassword" :disabled="cpLoading" class="bg-gradient-to-r from-[#418FC8] to-[#6DC7DC] hover:opacity-90 text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all disabled:opacity-70">
                <PhSpinner v-if="cpLoading" class="animate-spin w-4 h-4" />
                Actualizar
              </button>
            </div>
          </div>
          
          <hr class="border-slate-100 dark:border-slate-700">

          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-semibold text-slate-700 dark:text-slate-200">Compartir historial</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Permitir que nuevos doctores vean tu historial clínico pasado.</p>
            </div>
            <button @click="shareDataWithDoctors = !shareDataWithDoctors" class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none" :class="shareDataWithDoctors ? 'bg-[#418FC8]' : 'bg-slate-200 dark:bg-slate-600'">
              <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform" :class="shareDataWithDoctors ? 'translate-x-6' : 'translate-x-1'"></span>
            </button>
          </div>
        </div>
      </section>

      <!-- Botón Guardar -->
      <div class="flex justify-end pt-4">
        <p v-if="settingsNotice" class="mr-4 self-center text-sm font-medium text-amber-700 dark:text-amber-300">
          {{ settingsNotice }}
        </p>
        <button @click="saveSettings" class="bg-gradient-to-r from-[#418FC8] to-[#6DC7DC] hover:opacity-90 text-white px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg active:scale-95 hover:-translate-y-0.5">
          Guardar Cambios
        </button>
      </div>

    </div>
  </div>
</template>
