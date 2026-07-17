<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { PhUser, PhSpinner } from '@phosphor-icons/vue'
import { createPatientProfile } from '@/services/patient-service'

const router = useRouter()

const loading = ref(false)
const errorMessage = ref<string | null>(null)

const idUser = ref('')

const nombres = ref('')
const apellidoPaterno = ref('')
const apellidoMaterno = ref('')
const dniPaciente = ref('')
const fechaNacimiento = ref('')
const sexo = ref('')
const telefono = ref('')
const direccion = ref('')
const departamento = ref('')
const provincia = ref('')
const distrito = ref('')

onMounted(() => {
  const tempIdUser = sessionStorage.getItem('temp_idUser')
  
  if (!tempIdUser) {
    // Si no se pasó por el flujo, redirigir al inicio
    router.push('/')
    return
  }
  
  idUser.value = tempIdUser
})

async function submit() {
  errorMessage.value = null
  loading.value = true
  
  try {
    await createPatientProfile({
      idUser: idUser.value,
      dniPaciente: dniPaciente.value,
      nombres: nombres.value,
      apellidoPaterno: apellidoPaterno.value,
      apellidoMaterno: apellidoMaterno.value,
      fechaNacimiento: fechaNacimiento.value,
      sexo: sexo.value,
      telefono: telefono.value,
      direccion: direccion.value,
      departamento: departamento.value,
      provincia: provincia.value,
      distrito: distrito.value
    })
    
    // Limpiar temporales
    sessionStorage.removeItem('temp_idUser')
    
    // Redirigir a inicio / login
    await router.push('/?login=true')
  } catch (e: any) {
    errorMessage.value = e.response?.data?.message || 'Error al completar el perfil. Por favor, intente nuevamente.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-10">
        <div class="flex justify-center text-[#3E90C8] mb-4">
          <PhUser class="w-16 h-16" weight="fill" />
        </div>
        <h2 class="text-3xl font-extrabold text-[var(--color-doc-text-main)]">
          Completa tu Perfil
        </h2>
        <p class="mt-2 text-sm text-[var(--color-doc-text-muted)]">
          Necesitamos algunos datos más para terminar de configurar tu cuenta.
        </p>
      </div>

      <div class="bg-white dark:bg-slate-800 shadow sm:rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
        <form @submit.prevent="submit" class="p-6 sm:p-8 space-y-8">
          <div v-if="errorMessage" class="rounded-lg bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm px-4 py-3 border border-red-200 dark:border-red-800">
            {{ errorMessage }}
          </div>

          <div>
            <h3 class="text-lg leading-6 font-medium text-[var(--color-doc-text-main)] mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
              Datos Personales
            </h3>
            <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label class="block text-sm font-medium text-[var(--color-doc-text-main)]">Nombres</label>
                <input v-model="nombres" type="text" required class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[#3E90C8] focus:ring focus:ring-[#3E90C8] focus:ring-opacity-50 dark:bg-slate-900 dark:border-slate-600 dark:text-white" />
              </div>
              <div>
                <label class="block text-sm font-medium text-[var(--color-doc-text-main)]">DNI</label>
                <input v-model="dniPaciente" type="text" required pattern="\d+" title="Solo se permiten números" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[#3E90C8] focus:ring focus:ring-[#3E90C8] focus:ring-opacity-50 dark:bg-slate-900 dark:border-slate-600 dark:text-white" />
              </div>
              <div>
                <label class="block text-sm font-medium text-[var(--color-doc-text-main)]">Apellido Paterno</label>
                <input v-model="apellidoPaterno" type="text" required class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[#3E90C8] focus:ring focus:ring-[#3E90C8] focus:ring-opacity-50 dark:bg-slate-900 dark:border-slate-600 dark:text-white" />
              </div>
              <div>
                <label class="block text-sm font-medium text-[var(--color-doc-text-main)]">Apellido Materno</label>
                <input v-model="apellidoMaterno" type="text" required class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[#3E90C8] focus:ring focus:ring-[#3E90C8] focus:ring-opacity-50 dark:bg-slate-900 dark:border-slate-600 dark:text-white" />
              </div>
              <div>
                <label class="block text-sm font-medium text-[var(--color-doc-text-main)]">Fecha de Nacimiento</label>
                <input v-model="fechaNacimiento" type="date" required class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[#3E90C8] focus:ring focus:ring-[#3E90C8] focus:ring-opacity-50 dark:bg-slate-900 dark:border-slate-600 dark:text-white" />
              </div>
              <div>
                <label class="block text-sm font-medium text-[var(--color-doc-text-main)]">Sexo</label>
                <select v-model="sexo" required class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[#3E90C8] focus:ring focus:ring-[#3E90C8] focus:ring-opacity-50 dark:bg-slate-900 dark:border-slate-600 dark:text-white">
                  <option value="" disabled>Seleccione</option>
                  <option value="MASCULINO">Masculino</option>
                  <option value="FEMENINO">Femenino</option>
                  <option value="OTRO">Otro</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-[var(--color-doc-text-main)]">Teléfono</label>
                <input v-model="telefono" type="tel" required pattern="\d+" title="Solo se permiten números" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[#3E90C8] focus:ring focus:ring-[#3E90C8] focus:ring-opacity-50 dark:bg-slate-900 dark:border-slate-600 dark:text-white" />
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg leading-6 font-medium text-[var(--color-doc-text-main)] mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
              Ubicación
            </h3>
            <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div class="sm:col-span-2">
                <label class="block text-sm font-medium text-[var(--color-doc-text-main)]">Dirección</label>
                <input v-model="direccion" type="text" required placeholder="Ej: Av. Javier Prado 123" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[#3E90C8] focus:ring focus:ring-[#3E90C8] focus:ring-opacity-50 dark:bg-slate-900 dark:border-slate-600 dark:text-white" />
              </div>
              <div>
                <label class="block text-sm font-medium text-[var(--color-doc-text-main)]">Departamento</label>
                <input v-model="departamento" type="text" required placeholder="Ej: Lima" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[#3E90C8] focus:ring focus:ring-[#3E90C8] focus:ring-opacity-50 dark:bg-slate-900 dark:border-slate-600 dark:text-white" />
              </div>
              <div>
                <label class="block text-sm font-medium text-[var(--color-doc-text-main)]">Provincia</label>
                <input v-model="provincia" type="text" required placeholder="Ej: Lima" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[#3E90C8] focus:ring focus:ring-[#3E90C8] focus:ring-opacity-50 dark:bg-slate-900 dark:border-slate-600 dark:text-white" />
              </div>
              <div>
                <label class="block text-sm font-medium text-[var(--color-doc-text-main)]">Distrito</label>
                <input v-model="distrito" type="text" required placeholder="Ej: San Isidro" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[#3E90C8] focus:ring focus:ring-[#3E90C8] focus:ring-opacity-50 dark:bg-slate-900 dark:border-slate-600 dark:text-white" />
              </div>
            </div>
          </div>

          <div class="pt-4 flex justify-end">
            <button
              type="submit"
              :disabled="loading"
              class="inline-flex justify-center items-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#3E90C8] hover:bg-[#347BAE] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3E90C8] disabled:opacity-70 transition-colors"
            >
              <PhSpinner v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
              Completar Registro
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
