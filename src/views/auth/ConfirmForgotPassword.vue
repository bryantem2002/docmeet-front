<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { PhLockKey, PhSpinner } from '@phosphor-icons/vue'
import { confirmForgotPassword } from '@/services/auth-service'

const router = useRouter()
const route = useRoute()

const email = ref('')
const code = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const errorMessage = ref<string | null>(null)
const successMessage = ref<string | null>(null)

onMounted(() => {
  const queryEmail = route.query.email as string
  if (queryEmail) email.value = queryEmail
})

async function submit() {
  errorMessage.value = null
  successMessage.value = null
  loading.value = true
  try {
    if (password.value !== confirmPassword.value) throw new Error('Las contraseñas no coinciden')
    if (password.value.length < 6) throw new Error('La contraseña debe tener al menos 6 caracteres')

    await confirmForgotPassword({
      userEmail: email.value,
      confirmationCode: code.value,
      newPassword: password.value
    })

    successMessage.value = '¡Contraseña cambiada! Redirigiendo...'
    setTimeout(() => router.push('/'), 2000)
  } catch (e: any) {
    errorMessage.value = e.response?.data?.message || e.message || 'Código inválido o expirado.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center text-[#3E90C8] mb-6">
        <PhLockKey class="w-16 h-16" weight="fill" />
      </div>
      <h2 class="text-center text-3xl font-extrabold text-slate-800 dark:text-white">Nueva Contraseña</h2>
      <p class="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
        Ingresa el código enviado a tu correo y elige una nueva contraseña.
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white dark:bg-slate-800 py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-slate-200 dark:border-slate-700">
        <form class="space-y-5" @submit.prevent="submit">
          <div v-if="errorMessage" class="rounded-lg bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm px-4 py-3 border border-red-200 dark:border-red-800">
            {{ errorMessage }}
          </div>
          <div v-if="successMessage" class="rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm px-4 py-3 border border-emerald-200 dark:border-emerald-800">
            {{ successMessage }}
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">Correo electrónico</label>
            <input v-model="email" type="email" required class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#418FC8] text-sm" />
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">Código de verificación</label>
            <input v-model="code" type="text" required maxlength="6" pattern="\d{6}" placeholder="123456" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#418FC8] text-sm tracking-widest text-center text-lg font-bold" />
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">Nueva contraseña</label>
            <input v-model="password" type="password" required minlength="6" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#418FC8] text-sm" />
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">Confirmar contraseña</label>
            <input v-model="confirmPassword" type="password" required minlength="6" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#418FC8] text-sm" />
          </div>

          <button
            type="submit"
            :disabled="loading || !!successMessage"
            class="w-full flex justify-center py-3 px-4 rounded-xl text-sm font-bold text-white bg-[#3E90C8] hover:bg-[#347BAE] disabled:opacity-70 transition-colors shadow-md"
          >
            <PhSpinner v-if="loading" class="animate-spin mr-2 h-5 w-5" />
            Cambiar contraseña
          </button>

          <div class="text-center">
            <router-link to="/forgot-password" class="text-sm font-medium text-[#3E90C8] hover:underline">
              Solicitar nuevo código
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
