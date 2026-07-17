<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { PhEnvelopeSimple, PhSpinner } from '@phosphor-icons/vue'
import { forgotPassword } from '@/services/auth-service'

const router = useRouter()
const route = useRoute()
const email = ref((route.query.email as string) || '')
const loading = ref(false)
const errorMessage = ref<string | null>(null)

async function submit() {
  errorMessage.value = null
  loading.value = true
  try {
    await forgotPassword({ userEmail: email.value })
    await router.push({ path: '/confirm-forgot-password', query: { email: email.value } })
  } catch (e: any) {
    errorMessage.value = e.response?.data?.message || 'Error al solicitar cambio de contraseña.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center text-[#3E90C8] mb-6">
        <PhEnvelopeSimple class="w-16 h-16" weight="fill" />
      </div>
      <h2 class="text-center text-3xl font-extrabold text-slate-800 dark:text-white">
        ¿Olvidaste tu contraseña?
      </h2>
      <p class="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
        Ingresa tu correo y te enviaremos un código para restablecerla.
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white dark:bg-slate-800 py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-slate-200 dark:border-slate-700">
        <form class="space-y-6" @submit.prevent="submit">
          <div v-if="errorMessage" class="rounded-lg bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm px-4 py-3 border border-red-200 dark:border-red-800">
            {{ errorMessage }}
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">Correo electrónico</label>
            <input
              v-model="email"
              type="email"
              required
              placeholder="tu@correo.com"
              class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#418FC8] focus:border-[#418FC8] text-sm shadow-sm"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center py-3 px-4 rounded-xl text-sm font-bold text-white bg-[#3E90C8] hover:bg-[#347BAE] disabled:opacity-70 transition-colors shadow-md"
          >
            <PhSpinner v-if="loading" class="animate-spin mr-2 h-5 w-5" />
            Enviar código
          </button>

          <div class="text-center">
            <router-link to="/" class="text-sm font-medium text-[#3E90C8] hover:underline">
              Volver al inicio
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
