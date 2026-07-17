<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { PhSpinner, PhCheckCircle } from '@phosphor-icons/vue'
import { confirmCognito } from '@/services/auth-service'

const router = useRouter()
const route = useRoute()

const email = ref('')
const code = ref('')
const loading = ref(false)
const errorMessage = ref<string | null>(null)

onMounted(() => {
  const queryEmail = route.query.email as string
  if (queryEmail) {
    email.value = queryEmail
  } else {
    // Si no hay email, regresar al inicio
    router.push('/')
  }
})

async function submit() {
  errorMessage.value = null
  loading.value = true
  
  try {
    const response = await confirmCognito({
      userEmail: email.value,
      confirmationCode: code.value
    })
    
    // Guardar idUser
    sessionStorage.setItem('temp_idUser', response.data.idUser)
    
    // Redirigir a completar perfil
    await router.push('/complete-patient-profile')
  } catch (e: any) {
    errorMessage.value = e.response?.data?.message || 'Error al confirmar la cuenta. Verifica el código.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center text-[#3E90C8] mb-6">
        <PhCheckCircle class="w-16 h-16" weight="fill" />
      </div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-[var(--color-doc-text-main)]">
        Confirma tu cuenta
      </h2>
      <p class="mt-2 text-center text-sm text-[var(--color-doc-text-muted)]">
        Hemos enviado un código de verificación a <br>
        <span class="font-medium text-[#3E90C8]">{{ email }}</span>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white dark:bg-slate-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-slate-200 dark:border-slate-700">
        <form class="space-y-6" @submit.prevent="submit">
          <div v-if="errorMessage" class="rounded-lg bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm px-4 py-3 border border-red-200 dark:border-red-800">
            {{ errorMessage }}
          </div>

          <div>
            <label for="code" class="block text-sm font-medium text-[var(--color-doc-text-main)]">
              Código de verificación (6 dígitos)
            </label>
            <div class="mt-1">
              <input
                id="code"
                v-model="code"
                name="code"
                type="text"
                required
                maxlength="6"
                pattern="\d{6}"
                class="appearance-none block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-[#3E90C8] focus:border-[#3E90C8] sm:text-sm bg-white dark:bg-slate-900 text-[var(--color-doc-text-main)]"
                placeholder="123456"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3E90C8] hover:bg-[#347BAE] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3E90C8] disabled:opacity-70 transition-colors"
            >
              <PhSpinner v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
              Confirmar Cuenta
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
