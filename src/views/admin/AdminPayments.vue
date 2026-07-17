<script setup lang="ts">
import { ref } from 'vue'
import { PhMagnifyingGlass, PhFileText } from '@phosphor-icons/vue'

const transactions = ref(import.meta.env.DEV ? [
  { id: 'TXN-9021', date: '18 May 2026', patient: 'María Flores', amount: 'S/ 120.00', type: 'Ingreso', status: 'Completado', method: 'Yape' },
  { id: 'TXN-9020', date: '17 May 2026', patient: 'Luis Rodríguez', amount: 'S/ 84.00', type: 'Reembolso (70%)', status: 'Pendiente', method: 'Mercado Pago' },
  { id: 'TXN-9019', date: '15 May 2026', patient: 'Ana Gómez', amount: 'S/ 150.00', type: 'Ingreso', status: 'Completado', method: 'Tarjeta' },
] : [])

const processRefund = (txn: any) => {
  txn.status = 'Procesado'
}
</script>

<template>
  <div class="max-w-7xl mx-auto w-full px-4 sm:px-0 font-sans">
    <div class="mb-8">
      <h1 class="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">Finanzas y Pagos</h1>
      <p class="text-slate-500 dark:text-slate-400 mt-2 font-medium">Gestiona los ingresos de la clínica y procesa los reembolsos por cancelaciones.</p>
    </div>
    
    <!-- Filtros -->
    <!-- Filtros -->
    <div class="flex flex-col sm:flex-row gap-4 mb-6">
      <div class="relative w-full sm:flex-1 sm:max-w-md">
        <PhMagnifyingGlass class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-400" />
        <input type="text" placeholder="Buscar transacción o paciente..." class="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-sm text-slate-700 dark:text-slate-200" />
      </div>
      <select class="w-full sm:w-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold py-3 px-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
        <option value="">Todos los movimientos</option>
        <option value="Ingreso">Ingresos</option>
        <option value="Reembolso">Reembolsos Pendientes</option>
      </select>
    </div>

    <!-- Contenedor Principal -->
    <div class="bg-white dark:bg-slate-800  border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden transition-colors">
      
      <!-- Vista Móvil (Tarjetas) -->
      <div class="block sm:hidden divide-y divide-slate-100 dark:divide-slate-700">
        <div v-for="txn in transactions" :key="'mob-'+txn.id" class="p-5 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
          <div class="flex justify-between items-start mb-3">
            <div>
              <h3 class="font-bold text-slate-800 dark:text-white text-base">{{ txn.patient }}</h3>
              <p class="text-xs font-bold text-slate-400 dark:text-slate-400 mt-0.5">{{ txn.id }}</p>
            </div>
            <div class="text-right">
              <span v-if="txn.status === 'Pendiente'" class="px-2.5 py-1 text-[10px] font-bold rounded-full bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                Pendiente
              </span>
              <span v-else class="px-2.5 py-1 text-[10px] font-bold rounded-full bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                Completado
              </span>
            </div>
          </div>
          <div class="flex flex-col gap-1.5 mb-4 text-sm bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
            <div class="flex justify-between items-center mb-1">
              <span class="text-slate-500 dark:text-slate-400">Monto:</span>
              <span class="font-black text-slate-800 dark:text-white text-lg">{{ txn.amount }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-500 dark:text-slate-400">Tipo:</span>
              <span class="font-bold" :class="txn.type.includes('Reembolso') ? 'text-amber-600' : 'text-emerald-600'">{{ txn.type }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-500 dark:text-slate-400">Método:</span>
              <span class="font-medium text-slate-700 dark:text-slate-200">{{ txn.method }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-500 dark:text-slate-400">Fecha:</span>
              <span class="font-medium text-slate-700 dark:text-slate-200">{{ txn.date }}</span>
            </div>
          </div>
          <div class="flex gap-2">
            <template v-if="txn.status === 'Pendiente' && txn.type.includes('Reembolso')">
              <button @click="processRefund(txn)" class="w-full text-emerald-600 font-bold hover:text-emerald-800 bg-emerald-50 dark:bg-emerald-900/40 hover:bg-emerald-100 dark:hover:bg-emerald-800/60 py-2.5 rounded-xl text-sm transition-colors text-center">
                Emitir Reembolso
              </button>
            </template>
            <template v-else>
              <button class="w-full text-slate-600 dark:text-slate-300 font-bold hover:text-[#418FC8] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-[#418FC8]/10 py-2.5 rounded-xl text-sm transition-colors text-center flex items-center justify-center gap-2">
                <PhFileText class="h-4 w-4" weight="bold" /> Ver Recibo
              </button>
            </template>
          </div>
        </div>
      </div>

      <!-- Vista Desktop (Tabla) -->
      <div class="hidden sm:block overflow-x-auto custom-scrollbar">
        <table class="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr class="bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-xs font-extrabold uppercase tracking-widest">
              <th class="p-5">ID Transacción</th>
              <th class="p-5">Fecha</th>
              <th class="p-5">Paciente</th>
              <th class="p-5">Monto</th>
              <th class="p-5">Tipo / Método</th>
              <th class="p-5 text-center">Estado</th>
              <th class="p-5 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
            <tr v-for="txn in transactions" :key="txn.id" class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
              <td class="p-5 font-bold text-slate-500 dark:text-slate-400 text-sm">{{ txn.id }}</td>
              <td class="p-5 text-slate-600 dark:text-slate-300 font-medium text-sm">{{ txn.date }}</td>
              <td class="p-5 font-bold text-slate-800 dark:text-white">{{ txn.patient }}</td>
              <td class="p-5 font-black text-slate-800 dark:text-white text-lg">{{ txn.amount }}</td>
              <td class="p-5">
                <p class="font-bold text-sm" :class="txn.type.includes('Reembolso') ? 'text-amber-600' : 'text-emerald-600'">{{ txn.type }}</p>
                <p class="text-xs text-slate-400 dark:text-slate-400 font-medium mt-0.5">{{ txn.method }}</p>
              </td>
              <td class="p-5 text-center">
                <span v-if="txn.status === 'Pendiente'" class="px-3 py-1 text-xs font-bold rounded-full bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                  Pendiente
                </span>
                <span v-else class="px-3 py-1 text-xs font-bold rounded-full bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  Completado
                </span>
              </td>
              <td class="p-5 text-right flex justify-end gap-2">
                <template v-if="txn.status === 'Pendiente' && txn.type.includes('Reembolso')">
                  <button @click="processRefund(txn)" class="text-emerald-600 font-bold hover:text-emerald-800 bg-emerald-50 dark:bg-emerald-900/40 hover:bg-emerald-100 dark:hover:bg-emerald-800/60 px-4 py-2 rounded-lg text-sm transition-colors">
                    Emitir Reembolso
                  </button>
                </template>
                <template v-else>
                  <button class="text-slate-500 dark:text-slate-400 hover:text-[#418FC8] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-[#418FC8]/10 px-3 py-2 rounded-lg text-sm transition-colors" title="Ver Recibo">
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
