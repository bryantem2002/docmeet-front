<script setup lang="ts">
import { ref } from 'vue'

const payments = ref([
  { id: '1', date: '15 Oct 2026', invoice: 'F001-00123', patient: 'Juan Pérez', amount: 'S/ 150.00', status: 'Pagado', method: 'Tarjeta' },
  { id: '2', date: '15 Oct 2026', invoice: 'F001-00124', patient: 'María García', amount: 'S/ 200.00', status: 'Pendiente', method: 'Efectivo' }
])
</script>

<template>
  <div class="max-w-7xl mx-auto w-full px-4 sm:px-0 font-sans">
    <div class="mb-8 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight">Gestión de Pagos</h1>
        <p class="text-slate-500 mt-2 font-medium">Control de facturas y cobros a pacientes.</p>
      </div>
      <button class="bg-[var(--color-doc-blue-600)] hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
        Registrar Pago
      </button>
    </div>

    <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <table class="w-full text-left text-sm text-slate-600">
        <thead class="bg-slate-50 text-slate-500 font-medium">
          <tr>
            <th class="px-6 py-4">Fecha</th>
            <th class="px-6 py-4">Factura</th>
            <th class="px-6 py-4">Paciente</th>
            <th class="px-6 py-4">Monto</th>
            <th class="px-6 py-4">Método</th>
            <th class="px-6 py-4">Estado</th>
            <th class="px-6 py-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="pay in payments" :key="pay.id" class="hover:bg-slate-50/50 transition-colors">
            <td class="px-6 py-4 text-slate-800">{{ pay.date }}</td>
            <td class="px-6 py-4 font-mono text-slate-500">{{ pay.invoice }}</td>
            <td class="px-6 py-4 font-bold text-slate-800">{{ pay.patient }}</td>
            <td class="px-6 py-4 font-bold">{{ pay.amount }}</td>
            <td class="px-6 py-4">{{ pay.method }}</td>
            <td class="px-6 py-4">
              <span 
                class="px-2 py-1 rounded text-xs font-bold"
                :class="pay.status === 'Pagado' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'"
              >
                {{ pay.status }}
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <button class="text-[var(--color-doc-blue-600)] hover:text-blue-800 font-medium text-sm">Detalle</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
