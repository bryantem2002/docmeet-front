<script setup lang="ts">
import { ref } from 'vue'
import { PhMagnifyingGlass, PhFileText } from '@phosphor-icons/vue'

const transactions = ref([
  { id: 'TXN-9021', date: '18 May 2026', patient: 'María Flores', amount: 'S/ 120.00', type: 'Ingreso', status: 'Completado', method: 'Yape' },
  { id: 'TXN-9020', date: '17 May 2026', patient: 'Luis Rodríguez', amount: 'S/ 84.00', type: 'Reembolso (70%)', status: 'Pendiente', method: 'Mercado Pago' },
  { id: 'TXN-9019', date: '15 May 2026', patient: 'Ana Gómez', amount: 'S/ 150.00', type: 'Ingreso', status: 'Completado', method: 'Tarjeta' },
])

const processRefund = (txn: any) => {
  txn.status = 'Procesado'
}
</script>

<template>
  <div class="max-w-7xl mx-auto w-full px-4 sm:px-0 font-sans">
    <div class="mb-8">
      <h1 class="text-3xl font-extrabold text-slate-800 tracking-tight">Finanzas y Pagos</h1>
      <p class="text-slate-500 mt-2 font-medium">Gestiona los ingresos de la clínica y procesa los reembolsos por cancelaciones.</p>
    </div>
    
    <!-- Filtros -->
    <div class="flex gap-4 mb-6">
      <div class="relative flex-1 max-w-md">
        <PhMagnifyingGlass class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input type="text" placeholder="Buscar transacción o paciente..." class="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-sm text-slate-700" />
      </div>
      <select class="bg-white border border-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
        <option value="">Todos los movimientos</option>
        <option value="Ingreso">Ingresos</option>
        <option value="Reembolso">Reembolsos Pendientes</option>
      </select>
    </div>

    <!-- Tabla -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-extrabold uppercase tracking-widest">
              <th class="p-5">ID Transacción</th>
              <th class="p-5">Fecha</th>
              <th class="p-5">Paciente</th>
              <th class="p-5">Monto</th>
              <th class="p-5">Tipo / Método</th>
              <th class="p-5 text-center">Estado</th>
              <th class="p-5 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="txn in transactions" :key="txn.id" class="hover:bg-slate-50 transition-colors">
              <td class="p-5 font-bold text-slate-500 text-sm">{{ txn.id }}</td>
              <td class="p-5 text-slate-600 font-medium text-sm">{{ txn.date }}</td>
              <td class="p-5 font-bold text-slate-800">{{ txn.patient }}</td>
              <td class="p-5 font-black text-slate-800 text-lg">{{ txn.amount }}</td>
              <td class="p-5">
                <p class="font-bold text-sm" :class="txn.type.includes('Reembolso') ? 'text-amber-600' : 'text-emerald-600'">{{ txn.type }}</p>
                <p class="text-xs text-slate-400 font-medium mt-0.5">{{ txn.method }}</p>
              </td>
              <td class="p-5 text-center">
                <span v-if="txn.status === 'Pendiente'" class="px-3 py-1 text-xs font-bold rounded-full bg-amber-50 text-amber-600 border border-amber-200">
                  Pendiente
                </span>
                <span v-else class="px-3 py-1 text-xs font-bold rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                  Completado
                </span>
              </td>
              <td class="p-5 text-right flex justify-end gap-2">
                <template v-if="txn.status === 'Pendiente' && txn.type.includes('Reembolso')">
                  <button @click="processRefund(txn)" class="text-emerald-600 font-bold hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-lg text-sm transition-colors">
                    Emitir Reembolso
                  </button>
                </template>
                <template v-else>
                  <button class="text-slate-500 hover:text-[#3E90C8] bg-white border border-slate-200 hover:bg-[#3E90C8]/10 px-3 py-2 rounded-lg text-sm transition-colors" title="Ver Recibo">
                    <PhFileText class="h-4 w-4" weight="bold" />
                  </button>
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
