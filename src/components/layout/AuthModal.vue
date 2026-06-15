<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { PhX, PhSpinner } from '@phosphor-icons/vue'
import { useAuthStore } from '@/store/auth-store'
import { authController } from '@/controllers/auth.controller'

const props = defineProps<{
  initialMode: 'login' | 'register'
}>()

const emit = defineEmits(['close'])

const auth = useAuthStore()
const router = useRouter()

const mode = ref<'login' | 'register'>(props.initialMode)
const loading = ref(false)
const errorMessage = ref<string | null>(null)

const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const dni = ref('')
const fechaNacimiento = ref('')
const genero = ref('')
const telefono = ref('')
const nombreContactoEmergencia = ref('')
const telefonoContactoEmergencia = ref('')

function switchMode(newMode: 'login' | 'register') {
  mode.value = newMode
  errorMessage.value = null
  password.value = ''
  confirmPassword.value = ''
  dni.value = ''
  fechaNacimiento.value = ''
  genero.value = ''
  telefono.value = ''
  nombreContactoEmergencia.value = ''
  telefonoContactoEmergencia.value = ''
}

async function submit(): Promise<void> {
  errorMessage.value = null
  loading.value = true

  try {
    const form = {
      email: email.value,
      password: password.value,
      fullName: fullName.value,
      confirmPassword: confirmPassword.value,
      dni: dni.value,
      fechaNacimiento: fechaNacimiento.value,
      genero: genero.value,
      telefono: telefono.value,
      nombreContactoEmergencia: nombreContactoEmergencia.value,
      telefonoContactoEmergencia: telefonoContactoEmergencia.value
    }

    if (mode.value === 'register') {
      const payload = authController.validateRegisterForm(form)
      await auth.register(payload)
    } else {
      const credentials = authController.validateLoginForm(form)
      await auth.login(credentials)
    }

    emit('close')
    await router.push('/')
  } catch (e) {
    errorMessage.value = authController.toErrorMessage(e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 dark:bg-slate-950/70 backdrop-blur-sm p-4 transition-all">
    <div class="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex min-h-[600px] max-h-[90vh]">
      <button
        type="button"
        class="absolute top-4 right-4 z-50 p-2 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
        title="Cerrar"
        @click="$emit('close')"
      >
        <PhX class="h-6 w-6" />
      </button>

      <div class="hidden lg:flex lg:w-5/12 relative bg-[#3E90C8] flex-col justify-center px-10 border-r border-[#347BAE] dark:border-slate-700">
        <div class="absolute inset-0 bg-gradient-to-b from-[#3E90C8] to-[#2A6A96] opacity-90"></div>
        <div class="relative z-10 w-full max-w-md mx-auto">
          <h1 class="text-4xl xl:text-5xl font-bold text-white leading-tight mb-6">
            {{ mode === 'register' ? 'Únete a DocMeet hoy.' : 'Bienvenido de nuevo.' }}
          </h1>
          <p class="text-blue-100 text-lg leading-relaxed mb-12">
            {{ mode === 'register'
              ? 'Crea tu perfil en menos de 2 minutos y comienza a gestionar tus citas médicas con facilidad.'
              : 'Accede a tu cuenta para gestionar tus citas, ver tu historial y contactar a tus especialistas.' }}
          </p>
        </div>
      </div>

      <div class="w-full lg:w-7/12 relative flex items-start justify-center p-8 sm:p-10 overflow-y-auto custom-scrollbar">
        <div class="w-full max-w-lg relative z-10 my-auto">
          <div class="mb-8">
            <h2 class="text-3xl font-bold text-[var(--color-doc-text-main)] mb-2">
              {{ mode === 'register' ? 'Crear cuenta' : 'Iniciar sesión' }}
            </h2>
            <p class="text-[var(--color-doc-text-muted)]">
              {{ mode === 'register' ? 'Completa tus datos personales para acceder al portal' : 'Ingresa tus credenciales para continuar' }}
            </p>
          </div>

          <form @submit.prevent="submit" class="space-y-4">
            <div v-if="errorMessage" class="rounded-lg bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm px-4 py-3 border border-red-200 dark:border-red-800">
              {{ errorMessage }}
            </div>

            <div v-if="mode === 'register'" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="sm:col-span-2">
                <label class="block text-sm font-semibold text-[var(--color-doc-text-main)] mb-1.5">Nombre completo</label>
                <input
                  v-model="fullName"
                  @input="fullName = ($event.target as HTMLInputElement).value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '')"
                  type="text"
                  required
                  pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+"
                  title="Solo se permiten letras y espacios"
                  placeholder="Ej. Juan Pérez"
                  class="w-full rounded-xl border border-slate-300 dark:border-slate-600 px-4 py-2.5 text-[var(--color-doc-text-main)] dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#418FC8] focus:border-[#418FC8] focus:shadow-md focus:shadow-[#418FC8]/10 transition-all duration-200 bg-white dark:bg-slate-800 shadow-sm"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-[var(--color-doc-text-main)] mb-1.5">DNI</label>
                <input
                  v-model="dni"
                  @input="dni = ($event.target as HTMLInputElement).value.replace(/[^0-9]/g, '')"
                  type="text"
                  required
                  pattern="\d+"
                  title="Solo se permiten números"
                  placeholder="Nro. de Documento"
                  class="w-full rounded-xl border border-slate-300 dark:border-slate-600 px-4 py-2.5 text-[var(--color-doc-text-main)] dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#418FC8] focus:border-[#418FC8] focus:shadow-md focus:shadow-[#418FC8]/10 transition-all duration-200 bg-white dark:bg-slate-800 shadow-sm"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-[var(--color-doc-text-main)] mb-1.5">Teléfono</label>
                <input
                  v-model="telefono"
                  @input="telefono = ($event.target as HTMLInputElement).value.replace(/[^0-9]/g, '')"
                  type="tel"
                  required
                  pattern="\d+"
                  title="Solo se permiten números"
                  placeholder="Tu número celular"
                  class="w-full rounded-xl border border-slate-300 dark:border-slate-600 px-4 py-2.5 text-[var(--color-doc-text-main)] dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#418FC8] focus:border-[#418FC8] focus:shadow-md focus:shadow-[#418FC8]/10 transition-all duration-200 bg-white dark:bg-slate-800 shadow-sm"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-[var(--color-doc-text-main)] mb-1.5">Fecha de Nacimiento</label>
                <input
                  v-model="fechaNacimiento"
                  type="date"
                  required
                  class="w-full rounded-xl border border-slate-300 dark:border-slate-600 px-4 py-2.5 text-[var(--color-doc-text-main)] dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#418FC8] focus:border-[#418FC8] focus:shadow-md focus:shadow-[#418FC8]/10 transition-all duration-200 bg-white dark:bg-slate-800 shadow-sm"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-[var(--color-doc-text-main)] mb-1.5">Género</label>
                <select
                  v-model="genero"
                  required
                  class="w-full rounded-xl border border-slate-300 dark:border-slate-600 px-4 py-2.5 text-[var(--color-doc-text-main)] dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#418FC8] focus:border-[#418FC8] focus:shadow-md focus:shadow-[#418FC8]/10 transition-all duration-200 bg-white dark:bg-slate-800 shadow-sm"
                >
                  <option value="" disabled>Seleccione</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                  <option value="O">Otro</option>
                </select>
              </div>

              <div class="sm:col-span-2 pt-2 border-t border-slate-100 dark:border-slate-700 mt-2">
                <p class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Contacto de Emergencia</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-semibold text-[var(--color-doc-text-main)] mb-1.5">Nombre</label>
                    <input
                      v-model="nombreContactoEmergencia"
                      @input="nombreContactoEmergencia = ($event.target as HTMLInputElement).value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '')"
                      type="text"
                      pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+"
                      title="Solo se permiten letras y espacios"
                      placeholder="Familiar o amigo"
                      class="w-full rounded-xl border border-slate-300 dark:border-slate-600 px-4 py-2.5 text-[var(--color-doc-text-main)] dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#418FC8] focus:border-[#418FC8] focus:shadow-md focus:shadow-[#418FC8]/10 transition-all duration-200 bg-white dark:bg-slate-800 shadow-sm"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-[var(--color-doc-text-main)] mb-1.5">Teléfono</label>
                    <input
                      v-model="telefonoContactoEmergencia"
                      @input="telefonoContactoEmergencia = ($event.target as HTMLInputElement).value.replace(/[^0-9]/g, '')"
                      type="tel"
                      pattern="\d+"
                      title="Solo se permiten números"
                      placeholder="Teléfono"
                      class="w-full rounded-xl border border-slate-300 dark:border-slate-600 px-4 py-2.5 text-[var(--color-doc-text-main)] dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#418FC8] focus:border-[#418FC8] focus:shadow-md focus:shadow-[#418FC8]/10 transition-all duration-200 bg-white dark:bg-slate-800 shadow-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div v-if="mode === 'login'">
              <label class="block text-sm font-semibold text-[var(--color-doc-text-main)] mb-1.5">Correo electrónico</label>
              <input
                v-model="email"
                type="email"
                required
                placeholder="tu@correo.com"
                class="w-full rounded-xl border border-slate-300 dark:border-slate-600 px-4 py-2.5 text-[var(--color-doc-text-main)] dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#418FC8] focus:border-[#418FC8] focus:shadow-md focus:shadow-[#418FC8]/10 transition-all duration-200 bg-white dark:bg-slate-800 shadow-sm"
              />
            </div>

            <div v-if="mode === 'register'" class="sm:col-span-2 border-t border-slate-100 dark:border-slate-700 pt-4 mt-2">
              <label class="block text-sm font-semibold text-[var(--color-doc-text-main)] mb-1.5">Correo electrónico</label>
              <input
                v-model="email"
                type="email"
                required
                placeholder="tu@correo.com"
                class="w-full rounded-xl border border-slate-300 dark:border-slate-600 px-4 py-2.5 text-[var(--color-doc-text-main)] dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#418FC8] focus:border-[#418FC8] focus:shadow-md focus:shadow-[#418FC8]/10 transition-all duration-200 bg-white dark:bg-slate-800 shadow-sm"
              />
            </div>

            <div :class="mode === 'register' ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : ''">
              <div>
                <label class="block text-sm font-semibold text-[var(--color-doc-text-main)] mb-1.5">Contraseña</label>
                <input
                  v-model="password"
                  type="password"
                  required
                  :minlength="mode === 'register' ? 6 : 1"
                  placeholder="Mínimo 6 caracteres"
                  class="w-full rounded-xl border border-slate-300 dark:border-slate-600 px-4 py-2.5 text-[var(--color-doc-text-main)] dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#418FC8] focus:border-[#418FC8] focus:shadow-md focus:shadow-[#418FC8]/10 transition-all duration-200 bg-white dark:bg-slate-800 shadow-sm"
                />
              </div>

              <div v-if="mode === 'register'">
                <label class="block text-sm font-semibold text-[var(--color-doc-text-main)] mb-1.5">Confirmar contraseña</label>
                <input
                  v-model="confirmPassword"
                  type="password"
                  required
                  placeholder="Repite tu contraseña"
                  class="w-full rounded-xl border border-slate-300 dark:border-slate-600 px-4 py-2.5 text-[var(--color-doc-text-main)] dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#418FC8] focus:border-[#418FC8] focus:shadow-md focus:shadow-[#418FC8]/10 transition-all duration-200 bg-white dark:bg-slate-800 shadow-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              class="w-full mt-6 rounded-xl bg-[#3E90C8] text-white py-3.5 font-semibold shadow-md shadow-[#3E90C8]/20 hover:bg-[#347BAE] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:hover:translate-y-0 flex justify-center items-center"
              :disabled="loading"
            >
              <PhSpinner v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
              <span>{{ loading ? 'Procesando...' : (mode === 'register' ? 'Registrarme como paciente' : 'Ingresar') }}</span>
            </button>
          </form>

          <div class="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 text-center">
            <p v-if="mode === 'register'" class="text-sm text-[var(--color-doc-text-muted)]">
              ¿Ya tienes una cuenta registrada?
              <button type="button" class="text-[#3E90C8] font-semibold hover:underline ml-1" @click="switchMode('login')">
                Inicia sesión aquí
              </button>
            </p>
            <p v-else class="text-sm text-[var(--color-doc-text-muted)]">
              ¿Aún no tienes cuenta?
              <button type="button" class="text-[#3E90C8] font-semibold hover:underline ml-1" @click="switchMode('register')">
                Regístrate aquí
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 20px;
}
</style>
