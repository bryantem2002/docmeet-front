<script setup lang="ts">
import { ref } from 'vue'

const metrics = ref(import.meta.env.DEV ? {
  totalIncome: 'S/ 24,500',
  appointmentsMonth: 342,
  newPatients: 85,
  activeDoctors: 12
} : {
  totalIncome: 'S/ 0',
  appointmentsMonth: 0,
  newPatients: 0,
  activeDoctors: 0
})

// Mock data for the chart (Completadas vs Canceladas)
const chartData = import.meta.env.DEV ? [
  { day: 'Lun', completed: 80, cancelled: 10 },
  { day: 'Mar', completed: 65, cancelled: 15 },
  { day: 'Mie', completed: 90, cancelled: 5 },
  { day: 'Jue', completed: 75, cancelled: 20 },
  { day: 'Vie', completed: 85, cancelled: 8 },
  { day: 'Sab', completed: 40, cancelled: 2 },
  { day: 'Dom', completed: 20, cancelled: 0 },
] : []

const maxChartValue = 100
</script>

<template>
  <div class="max-w-7xl mx-auto w-full px-4 sm:px-0 font-sans">
    <div class="mb-8">
      <h1 class="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">Panel de Administración</h1>
      <p class="text-slate-500 dark:text-slate-400 mt-2 font-medium">Visión global del rendimiento de la clínica y gestión general.</p>
    </div>

    <!-- KPIs -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group">
        <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <p class="text-sm font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider mb-2">Ingresos del Mes</p>
        <p class="text-3xl font-black text-emerald-500">{{ metrics.totalIncome }}</p>
      </div>
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group">
        <div class="absolute inset-0 bg-gradient-to-br from-[#418FC8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <p class="text-sm font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider mb-2">Citas Realizadas</p>
        <p class="text-3xl font-black text-[#418FC8]">{{ metrics.appointmentsMonth }}</p>
      </div>
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group">
        <div class="absolute inset-0 bg-gradient-to-br from-[#70C6DC]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <p class="text-sm font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider mb-2">Pacientes Nuevos</p>
        <p class="text-3xl font-black text-[#70C6DC]">{{ metrics.newPatients }}</p>
      </div>
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group">
        <div class="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <p class="text-sm font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider mb-2">Doctores Activos</p>
        <p class="text-3xl font-black text-amber-500">{{ metrics.activeDoctors }}</p>
      </div>
    </div>

    <!-- Gráfico Visual con CSS/Tailwind -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm mb-8">
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8">
        <div>
          <h2 class="text-lg font-bold text-slate-800 dark:text-white">Flujo de Citas (Semana Actual)</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400">Citas completadas vs Cancelaciones</p>
        </div>
        <div class="flex flex-wrap gap-4">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-[#418FC8]"></span>
            <span class="text-sm font-medium text-slate-600 dark:text-slate-300">Completadas</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-slate-300"></span>
            <span class="text-sm font-medium text-slate-600 dark:text-slate-300">Canceladas</span>
          </div>
        </div>
      </div>

      <!-- Diagrama de barras CSS -->
      <div class="overflow-x-auto custom-scrollbar pb-2">
        <div class="h-64 min-w-[500px] flex items-end justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-2 relative">
          <!-- Líneas guía -->
        <div class="absolute inset-0 flex flex-col justify-between pointer-events-none">
          <div class="border-t border-slate-100 dark:border-slate-700 w-full h-0"></div>
          <div class="border-t border-slate-100 dark:border-slate-700 w-full h-0"></div>
          <div class="border-t border-slate-100 dark:border-slate-700 w-full h-0"></div>
          <div class="border-t border-slate-100 dark:border-slate-700 w-full h-0"></div>
        </div>

        <div v-for="day in chartData" :key="day.day" class="flex-1 flex flex-col items-center gap-1 group relative z-10">
          <div class="w-full flex justify-center items-end gap-1 h-full">
            <!-- Barra Completadas -->
            <div 
              class="w-full max-w-[2rem] bg-gradient-to-t from-[#418FC8] to-[#6DC7DC] rounded-t-md transition-all duration-500 hover:opacity-80 relative shadow-[0_0_10px_rgba(65,143,200,0.3)]"
              :style="{ height: `${(day.completed / maxChartValue) * 100}%` }"
            >
              <!-- Tooltip hover -->
              <span class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                {{ day.completed }}
              </span>
            </div>
            <!-- Barra Canceladas -->
            <div 
              class="w-full max-w-[2rem] bg-slate-300 rounded-t-md transition-all duration-500 hover:opacity-80 relative"
              :style="{ height: `${(day.cancelled / maxChartValue) * 100}%` }"
            >
              <span class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                {{ day.cancelled }}
              </span>
            </div>
          </div>
        </div>
        </div>
        <!-- Etiquetas eje X -->
        <div class="flex justify-between mt-4 min-w-[500px]">
          <span v-for="day in chartData" :key="'label-'+day.day" class="flex-1 text-center text-sm font-bold text-slate-500 dark:text-slate-400">
            {{ day.day }}
          </span>
        </div>
      </div>
    </div>
    
  </div>
</template>

<style scoped>
.font-sans {
  font-family: 'Inter', 'Poppins', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
</style>
