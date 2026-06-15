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
      <h1 class="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">Mis Pagos y Facturas</h1>
      <p class="text-slate-500 dark:text-slate-400 mt-2 font-medium">Historial de pagos realizados por tus consultas médicas.</p>
    </div>

    <div class="bg-white dark:bg-slate-800  border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
      <!-- Vista Móvil -->
      <div class="block md:hidden divide-y divide-slate-100 dark:divide-slate-700">
        <div v-for="pay in myPayments" :key="'mob-'+pay.id" class="p-5 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
          <div class="flex justify-between items-start mb-3">
            <div>
              <p class="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">{{ pay.date }}</p>
              <h3 class="font-bold text-slate-800 dark:text-white text-base">{{ pay.doctor }}</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{{ pay.clinic }}</p>
            </div>
            <div class="text-right">
              <p class="font-black text-slate-800 dark:text-white text-lg mb-1">{{ pay.amount }}</p>
              <span class="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider" :class="pay.status === 'Pagado' ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300' : 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300'">
                {{ pay.status }}
              </span>
            </div>
          </div>
          <button class="w-full text-[#418FC8] dark:text-[#6DC7DC] font-bold hover:text-white bg-[#418FC8]/10 dark:bg-[#418FC8]/20 hover:bg-[#418FC8] dark:hover:bg-[#418FC8] py-2.5 rounded-xl text-sm transition-all text-center mt-2">
            Descargar PDF
          </button>
        </div>
      </div>

      <!-- Vista Desktop -->
      <div class="hidden md:block overflow-x-auto">
        <table class="w-full text-left text-sm text-slate-600 dark:text-slate-300 min-w-[600px]">
        <thead class="bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-400 font-medium border-b border-slate-200 dark:border-slate-700">
          <tr>
            <th class="px-6 py-4">Fecha</th>
            <th class="px-6 py-4">Médico</th>
            <th class="px-6 py-4">Sede</th>
            <th class="px-6 py-4">Monto</th>
            <th class="px-6 py-4">Estado</th>
            <th class="px-6 py-4 text-right">Comprobante</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
          <tr v-for="pay in myPayments" :key="pay.id" class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
            <td class="px-6 py-4 text-slate-800 dark:text-white font-medium">{{ pay.date }}</td>
            <td class="px-6 py-4 font-bold">{{ pay.doctor }}</td>
            <td class="px-6 py-4">{{ pay.clinic }}</td>
            <td class="px-6 py-4 font-bold">{{ pay.amount }}</td>
            <td class="px-6 py-4">
              <span 
                class="px-2 py-1 rounded text-xs font-bold"
                :class="pay.status === 'Pagado' ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300' : 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300'"
              >
                {{ pay.status }}
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <button class="text-[#418FC8] dark:text-[#6DC7DC] hover:text-[#6DC7DC] dark:hover:text-[#6DC7DC] font-medium text-sm underline underline-offset-2">
                Descargar PDF
              </button>
            </td>
          </tr>
        </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
