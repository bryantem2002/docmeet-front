<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { PhShieldWarning, PhSpinner } from '@phosphor-icons/vue'
import { respondNewPassword } from '@/services/auth-service'
import { useAuthStore } from '@/store/auth-store'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const session = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const errorMessage = ref<string | null>(null)
const successMessage = ref<string | null>(null)

onMounted(() => {
  const tempEmail = sessionStorage.getItem('temp_email')
  const tempSession = sessionStorage.getItem('temp_session')

  if (!tempEmail) {
    router.push('/')
    return
  }

  email.value = tempEmail
  if (tempSession) session.value = tempSession
})

async function submit() {
  errorMessage.value = null
  successMessage.value = null
  loading.value = true

  try {
    if (password.value !== confirmPassword.value) throw new Error('Las contraseñas no coinciden')
    if (password.value.length < 6) throw new Error('La contraseña debe tener al menos 6 caracteres')

    const response = await respondNewPassword({
      userEmail: email.value,
      newPassword: password.value,
      session: session.value
    })

    // Limpiar temporales
    sessionStorage.removeItem('temp_email')
    sessionStorage.removeItem('temp_session')

    // Autenticar con la respuesta del backend
    authStore.applySession(response.token, response.user)

    successMessage.value = '¡Contraseña actualizada! Ingresando...'
    setTimeout(() => router.push('/'), 1500)
  } catch (e: any) {
    errorMessage.value = e.response?.data?.message || e.message || 'Error al actualizar la contraseña.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center text-amber-500 mb-6">
        <PhShieldWarning class="w-16 h-16" weight="fill" />
      </div>
      <h2 class="text-center text-3xl font-extrabold text-slate-800 dark:text-white">
        Cambio de contraseña obligatorio
      </h2>
      <p class="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
        Por seguridad, debes cambiar la contraseña temporal que recibiste.
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white dark:bg-slate-800 py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-amber-200 dark:border-amber-800/50">
        <div class="mb-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-3">
          <p class="text-sm text-amber-700 dark:text-amber-300 font-medium">
            ⚠️ Tu cuenta requiere un cambio de contraseña antes de continuar.
          </p>
        </div>

        <form class="space-y-5" @submit.prevent="submit">
          <div v-if="errorMessage" class="rounded-lg bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm px-4 py-3 border border-red-200 dark:border-red-800">
            {{ errorMessage }}
          </div>
          <div v-if="successMessage" class="rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm px-4 py-3 border border-emerald-200 dark:border-emerald-800">
            {{ successMessage }}
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">Nueva contraseña</label>
            <input
              v-model="password"
              type="password"
              required
              minlength="6"
              placeholder="Mínimo 6 caracteres"
              class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">Confirmar nueva contraseña</label>
            <input
              v-model="confirmPassword"
              type="password"
              required
              minlength="6"
              class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
            />
          </div>

          <button
            type="submit"
            :disabled="loading || !!successMessage"
            class="w-full flex justify-center py-3 px-4 rounded-xl text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 disabled:opacity-70 transition-colors shadow-md"
          >
            <PhSpinner v-if="loading" class="animate-spin mr-2 h-5 w-5" />
            Continuar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
