<script setup lang="ts">
import { ref } from 'vue'
import { PhX, PhCheck } from '@phosphor-icons/vue'

const requests = ref([
  { id: 'REQ-01', doctor: 'Dra. Patricia Vargas', patient: 'Luis Rodríguez', date: '15 May 2026', time: '02:00 PM', reason: 'Emergencia médica', status: 'pending' },
  { id: 'REQ-02', doctor: 'Dr. Roberto Mendoza', patient: 'Ana Gómez', date: '12 May 2026', time: '10:30 AM', reason: 'Ausencia por motivos de salud', status: 'approved' },
])

const approveRequest = (req: any) => {
  req.status = 'approved'
}

const rejectRequest = (req: any) => {
  req.status = 'rejected'
}
</script>

<template>
  <div class="max-w-7xl mx-auto w-full px-4 sm:px-0 font-sans">
    <div class="mb-8">
      <h1 class="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">Solicitudes de Reprogramación</h1>
      <p class="text-slate-500 dark:text-slate-400 mt-2 font-medium">Bandeja de entrada de las solicitudes enviadas por los médicos por motivos de fuerza mayor.</p>
    </div>

    <!-- Contenedor Principal -->
    <div class="bg-white dark:bg-slate-800  border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden mt-8 transition-colors">
      
      <!-- Vista Móvil (Tarjetas) -->
      <div class="block sm:hidden divide-y divide-slate-100 dark:divide-slate-700">
        <div v-for="req in requests" :key="'mob-'+req.id" class="p-5 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
          <div class="flex justify-between items-start mb-3">
            <div>
              <h3 class="font-bold text-slate-800 dark:text-white text-base">{{ req.doctor }}</h3>
              <p class="text-xs font-bold text-slate-400 dark:text-slate-400 mt-0.5">{{ req.id }}</p>
            </div>
            <div class="text-right">
              <span v-if="req.status === 'pending'" class="px-2.5 py-1 text-[10px] font-bold rounded-full bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                Pendiente
              </span>
              <span v-else-if="req.status === 'approved'" class="px-2.5 py-1 text-[10px] font-bold rounded-full bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                Aprobada
              </span>
              <span v-else class="px-2.5 py-1 text-[10px] font-bold rounded-full bg-red-50 dark:bg-red-900/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
                Rechazada
              </span>
            </div>
          </div>
          <div class="flex flex-col gap-1.5 mb-4 text-sm bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
            <div class="flex justify-between items-center">
              <span class="text-slate-500 dark:text-slate-400">Paciente:</span>
              <span class="font-medium text-slate-700 dark:text-slate-200">{{ req.patient }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-500 dark:text-slate-400">Fecha/Hora:</span>
              <span class="font-medium text-slate-700 dark:text-slate-200">{{ req.date }} a las {{ req.time }}</span>
            </div>
            <div class="flex flex-col mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
              <span class="text-slate-500 dark:text-slate-400 text-xs mb-1">Motivo:</span>
              <span class="font-bold text-amber-600 leading-tight">{{ req.reason }}</span>
            </div>
          </div>
          <div class="flex gap-2">
            <template v-if="req.status === 'pending'">
              <button @click="rejectRequest(req)" class="flex-1 text-red-600 font-bold hover:text-red-800 bg-red-50 hover:bg-red-100 py-2.5 rounded-xl text-sm transition-colors text-center flex items-center justify-center gap-1">
                <PhX class="h-4 w-4" weight="bold" /> Rechazar
              </button>
              <button @click="approveRequest(req)" class="flex-1 text-[#418FC8] font-bold hover:text-white bg-[#418FC8]/10 hover:bg-[#418FC8] py-2.5 rounded-xl text-sm transition-colors text-center flex items-center justify-center gap-1">
                <PhCheck class="h-4 w-4" weight="bold" /> Aprobar
              </button>
            </template>
            <template v-else>
              <div class="w-full text-center text-slate-400 dark:text-slate-400 text-sm font-medium py-2 border border-slate-100 dark:border-slate-700 rounded-xl bg-slate-50">
                Gestión completada
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- Vista Desktop (Tabla) -->
      <div class="hidden sm:block overflow-x-auto custom-scrollbar">
        <table class="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr class="bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-xs font-extrabold uppercase tracking-widest">
              <th class="p-5">ID</th>
              <th class="p-5">Médico Solicitante</th>
              <th class="p-5">Paciente Afectado</th>
              <th class="p-5">Cita Original</th>
              <th class="p-5">Motivo Indicado</th>
              <th class="p-5 text-center">Estado</th>
              <th class="p-5 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
            <tr v-for="req in requests" :key="req.id" class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
              <td class="p-5 font-bold text-slate-500 dark:text-slate-400 text-sm">{{ req.id }}</td>
              <td class="p-5 font-bold text-slate-800 dark:text-white">{{ req.doctor }}</td>
              <td class="p-5 text-slate-600 dark:text-slate-300 font-medium text-sm">{{ req.patient }}</td>
              <td class="p-5 text-slate-600 dark:text-slate-300 font-medium text-sm">{{ req.date }} a las {{ req.time }}</td>
              <td class="p-5 text-amber-600 font-bold text-sm">{{ req.reason }}</td>
              <td class="p-5 text-center">
                <span v-if="req.status === 'pending'" class="px-3 py-1 text-xs font-bold rounded-full bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                  Pendiente
                </span>
                <span v-else-if="req.status === 'approved'" class="px-3 py-1 text-xs font-bold rounded-full bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  Aprobada y Contactando
                </span>
                <span v-else class="px-3 py-1 text-xs font-bold rounded-full bg-red-50 dark:bg-red-900/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
                  Rechazada
                </span>
              </td>
              <td class="p-5 text-right flex justify-end gap-2">
                <template v-if="req.status === 'pending'">
                  <button @click="rejectRequest(req)" class="text-red-600 font-bold hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg text-sm transition-colors" title="Rechazar">
                    <PhX class="h-4 w-4" weight="bold" />
                  </button>
                  <button @click="approveRequest(req)" class="text-[#418FC8] font-bold hover:text-white bg-[#418FC8]/10 hover:bg-[#418FC8] px-4 py-2 rounded-lg text-sm transition-all shadow-sm hover:shadow-[#418FC8]/20">
                    Aprobar y Reasignar
                  </button>
                </template>
                <template v-else>
                   <span class="text-slate-400 dark:text-slate-400 text-sm font-medium">Gestión completada</span>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-sans {
  font-family: 'Inter', 'Poppins', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
</style>
