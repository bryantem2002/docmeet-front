<script setup lang="ts">
import { ref } from 'vue'

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
      <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight">Solicitudes de Reprogramación</h1>
      <p class="text-slate-500 mt-2 font-medium">Bandeja de entrada de las solicitudes enviadas por los médicos por motivos de fuerza mayor.</p>
    </div>

    <!-- Tabla -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-8">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-extrabold uppercase tracking-widest">
              <th class="p-5">ID</th>
              <th class="p-5">Médico Solicitante</th>
              <th class="p-5">Paciente Afectado</th>
              <th class="p-5">Cita Original</th>
              <th class="p-5">Motivo Indicado</th>
              <th class="p-5 text-center">Estado</th>
              <th class="p-5 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="req in requests" :key="req.id" class="hover:bg-slate-50 transition-colors">
              <td class="p-5 font-bold text-slate-500 text-sm">{{ req.id }}</td>
              <td class="p-5 font-bold text-slate-800">{{ req.doctor }}</td>
              <td class="p-5 text-slate-600 font-medium text-sm">{{ req.patient }}</td>
              <td class="p-5 text-slate-600 font-medium text-sm">{{ req.date }} a las {{ req.time }}</td>
              <td class="p-5 text-amber-600 font-bold text-sm">{{ req.reason }}</td>
              <td class="p-5 text-center">
                <span v-if="req.status === 'pending'" class="px-3 py-1 text-xs font-bold rounded-full bg-amber-50 text-amber-600 border border-amber-200">
                  Pendiente
                </span>
                <span v-else-if="req.status === 'approved'" class="px-3 py-1 text-xs font-bold rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                  Aprobada y Contactando
                </span>
                <span v-else class="px-3 py-1 text-xs font-bold rounded-full bg-red-50 text-red-600 border border-red-200">
                  Rechazada
                </span>
              </td>
              <td class="p-5 text-right flex justify-end gap-2">
                <template v-if="req.status === 'pending'">
                  <button @click="rejectRequest(req)" class="text-red-600 font-bold hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg text-sm transition-colors" title="Rechazar">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                  <button @click="approveRequest(req)" class="text-blue-600 font-bold hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm transition-colors">
                    Aprobar y Reasignar
                  </button>
                </template>
                <template v-else>
                   <span class="text-slate-400 text-sm font-medium">Gestión completada</span>
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
