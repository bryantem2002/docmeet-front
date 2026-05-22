<script setup lang="ts">
import { useAuthStore } from '@/store/auth-store'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

function setRole(role: 'admin' | 'doctor' | 'paciente') {
  const names = {
    admin: 'Admin Supremo',
    doctor: 'Dr. Gregory House',
    paciente: 'Juan Pérez'
  }

  // 1. Creamos el usuario de prueba
  const fakeUser = {
    id: Math.floor(Math.random() * 1000).toString(),
    fullName: names[role],
    email: `${role}@docmeet.com`,
    role: role
  }

  // 2. Usamos TU propia función del store para inyectar un token falso y el usuario
  auth.applySession('dev-fake-token-999', fakeUser as any)

  // 3. Redirigimos a la vista por defecto de cada rol
  if (role === 'admin') {
    router.push('/admin')
  } else if (role === 'doctor') {
    router.push('/medico/dashboard')
  } else {
    router.push('/citas')
  }
}

function logout() {
  auth.logout()
  router.push('/')
}

const isDev = import.meta.env.DEV
</script>

<template>
  <!-- El v-if asegura que esto JAMÁS se muestre en producción -->
  <div 
    v-if="isDev" 
    class="fixed bottom-4 right-4 bg-slate-900/90 backdrop-blur-sm p-3 rounded-2xl flex items-center gap-2 z-[9999] shadow-2xl border border-slate-700 transition-all hover:scale-105"
  >
    <span class="text-xs font-bold text-slate-300 pr-2 border-r border-slate-600 uppercase tracking-wider">
      Dev Tools
    </span>

    <button 
      @click="setRole('admin')" 
      class="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
    >
      Admin
    </button>

    <button 
      @click="setRole('doctor')" 
      class="bg-[var(--color-doc-teal-600)] hover:bg-teal-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
    >
      Médico
    </button>

    <button 
      @click="setRole('paciente')" 
      class="bg-[var(--color-doc-blue-600)] hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
    >
      Paciente
    </button>

    <button 
      @click="logout" 
      class="ml-2 bg-slate-700 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
      title="Cerrar sesión"
    >
      Salir
    </button>
  </div>
</template>