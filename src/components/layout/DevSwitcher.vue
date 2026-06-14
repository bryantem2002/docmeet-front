<script setup lang="ts">
import { ref, onUnmounted, computed } from 'vue'
import { useAuthStore } from '@/store/auth-store'
import { useRouter } from 'vue-router'
import { PhArrowsOutCardinal, PhMinus, PhX } from '@phosphor-icons/vue'

const auth = useAuthStore()
const router = useRouter()

const isDev = import.meta.env.DEV
const isVisible = ref(true)
const isMinimized = ref(false)

// Validar si el usuario es "Real" (Tiene un token que NO es el de pruebas)
const isRealUserLogged = computed(() => auth.isAuthenticated && auth.token !== 'dev-fake-token-999')

// Drag and drop logic
const position = ref({ x: window.innerWidth - 450, y: window.innerHeight - 80 })
const isDragging = ref(false)
const dragOffset = ref({ x: 0, y: 0 })

function startDrag(event: MouseEvent) {
  isDragging.value = true
  dragOffset.value = {
    x: event.clientX - position.value.x,
    y: event.clientY - position.value.y
  }
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}

function onDrag(event: MouseEvent) {
  if (!isDragging.value) return
  
  let newX = event.clientX - dragOffset.value.x
  let newY = event.clientY - dragOffset.value.y
  
  const maxX = window.innerWidth - 300
  const maxY = window.innerHeight - 50
  
  newX = Math.max(0, Math.min(newX, maxX))
  newY = Math.max(0, Math.min(newY, maxY))
  
  position.value = { x: newX, y: newY }
}

function stopDrag() {
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}

onUnmounted(() => {
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
})

function setRole(role: 'admin' | 'doctor' | 'paciente' | 'secretaria') {
  const names = {
    admin: 'Admin Supremo',
    doctor: 'Dr. Gregory House',
    secretaria: 'Ana Lopez (Secretaria)',
    paciente: 'Juan Pérez'
  }

  const fakeUser = {
    id: Math.floor(Math.random() * 1000).toString(),
    fullName: names[role],
    email: `${role}@docmeet.com`,
    role: role
  }

  auth.applySession('dev-fake-token-999', fakeUser as any)

  if (role === 'admin') {
    router.push('/admin')
  } else if (role === 'doctor') {
    router.push('/medico/dashboard')
  } else if (role === 'secretaria') {
    router.push('/secretaria/dashboard')
  } else {
    router.push('/citas')
  }
}

function logout() {
  auth.logout()
  router.push('/')
}
</script>

<template>
  <div 
    v-if="isVisible" 
    class="fixed z-[9999] shadow-2xl border border-slate-700 bg-slate-900/95 backdrop-blur-md rounded-2xl overflow-hidden flex flex-col"
    :style="{ top: position.y + 'px', left: position.x + 'px' }"
    :class="isDragging ? 'opacity-90 scale-105' : ''"
  >
    <div 
      class="flex items-center justify-between px-3 py-2 bg-slate-800/80 cursor-move border-b border-slate-700 select-none"
      @mousedown="startDrag"
    >
      <div class="flex items-center gap-2">
        <PhArrowsOutCardinal class="text-slate-400 w-4 h-4" />
        <span class="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
          DocMeet DevTools
        </span>
      </div>
      
      <div class="flex items-center gap-2">
        <button @click.stop="isMinimized = !isMinimized" class="text-slate-400 hover:text-white transition-colors" title="Minimizar">
          <PhMinus class="w-4 h-4" />
        </button>
        <button @click.stop="isVisible = false" class="text-slate-400 hover:text-red-400 transition-colors" title="Cerrar permanentemente">
          <PhX class="w-4 h-4" />
        </button>
      </div>
    </div>

    <div v-show="!isMinimized" class="p-3 flex flex-col gap-2 max-w-sm">
      <div v-if="isRealUserLogged" class="text-xs font-medium text-amber-400 bg-amber-900/30 px-2.5 py-2 rounded-lg border border-amber-500/30 leading-snug">
        Usuario Real conectado. Cerrar sesión para testear con DevTools.
      </div>

      <div class="flex items-center gap-2 flex-wrap">
        <button 
          @click="setRole('admin')" 
          :disabled="isRealUserLogged"
          class="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
          :class="isRealUserLogged ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500 text-white'"
        >
          Admin
        </button>

        <button 
          @click="setRole('doctor')" 
          :disabled="isRealUserLogged"
          class="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
          :class="isRealUserLogged ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-[#3E90C8] hover:bg-blue-500 text-white'"
        >
          Médico
        </button>

        <button 
          @click="setRole('secretaria')" 
          :disabled="isRealUserLogged"
          class="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
          :class="isRealUserLogged ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-500 text-white'"
        >
          Secretaria
        </button>

        <button 
          @click="setRole('paciente')" 
          :disabled="isRealUserLogged"
          class="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
          :class="isRealUserLogged ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-slate-600 hover:bg-slate-500 text-white'"
        >
          Paciente
        </button>

        <div class="w-px h-6 bg-slate-700 mx-1"></div>

        <button 
          @click="logout" 
          class="bg-slate-800 hover:bg-red-600 border border-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
          title="Cerrar sesión"
        >
          Salir
        </button>
      </div>
    </div>
  </div>
</template>