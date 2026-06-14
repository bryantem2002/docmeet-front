<script setup lang="ts">
import { ref } from 'vue'

const myPayments = ref([
  { id: '1', date: '15 Oct 2026', doctor: 'Dr. Gregory House', clinic: 'Sede Principal', amount: 'S/ 150.00', status: 'Pagado' },
  { id: '2', date: '02 Sep 2026', doctor: 'Dr. Gregory House', clinic: 'Sede Principal', amount: 'S/ 150.00', status: 'Pagado' }
])
</script>

<template>
  <div class="max-w-7xl mx-auto w-full px-4 sm:px-0 font-sans">
    <div class="mb-8">
      <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight">Mis Pagos y Facturas</h1>
      <p class="text-slate-500 mt-2 font-medium">Historial de pagos realizados por tus consultas médicas.</p>
    </div>

    <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <table class="w-full text-left text-sm text-slate-600">
        <thead class="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
          <tr>
            <th class="px-6 py-4">Fecha</th>
            <th class="px-6 py-4">Médico</th>
            <th class="px-6 py-4">Sede</th>
            <th class="px-6 py-4">Monto</th>
            <th class="px-6 py-4">Estado</th>
            <th class="px-6 py-4 text-right">Comprobante</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="pay in myPayments" :key="pay.id" class="hover:bg-slate-50/50 transition-colors">
            <td class="px-6 py-4 text-slate-800 font-medium">{{ pay.date }}</td>
            <td class="px-6 py-4 font-bold">{{ pay.doctor }}</td>
            <td class="px-6 py-4">{{ pay.clinic }}</td>
            <td class="px-6 py-4 font-bold">{{ pay.amount }}</td>
            <td class="px-6 py-4">
              <span 
                class="px-2 py-1 rounded text-xs font-bold"
                :class="pay.status === 'Pagado' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'"
              >
                {{ pay.status }}
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <button class="text-[var(--color-doc-blue-600)] hover:text-blue-800 font-medium text-sm underline underline-offset-2">
                Descargar PDF
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
