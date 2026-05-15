<script setup lang="ts">
import { ref } from 'vue'
const searchQuery = ref('')

const locations = ref([
  {
    id: 1,
    name: 'Sede Principal San Isidro',
    address: 'Av. Javier Prado Este 1234',
    district: 'San Isidro',
    phone: '(01) 555-0100',
    schedule: 'Lun - Dom: 24 horas',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600&h=400'
  },
  {
    id: 2,
    name: 'Centro Médico Los Olivos',
    address: 'Av. Carlos Izaguirre 789',
    district: 'Los Olivos',
    phone: '(01) 555-0101',
    schedule: 'Lun - Sáb: 7:00 am - 10:00 pm',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=600&h=400'
  },
  {
    id: 3,
    name: 'Clínica Especializada Miraflores',
    address: 'Av. José Pardo 456',
    district: 'Miraflores',
    phone: '(01) 555-0102',
    schedule: 'Lun - Sáb: 8:00 am - 8:00 pm',
    image: 'https://images.unsplash.com/photo-1538108149393-cebb47ac0925?auto=format&fit=crop&q=80&w=600&h=400'
  }
])

const stats = [
  { label: 'Especialidades', value: '40+' },
  { label: 'Médicos Activos', value: '250+' },
  { label: 'Pacientes Atendidos', value: '15k+' },
  { label: 'Sedes en la ciudad', value: '3' },
]
</script>

<template>
  <div class="min-h-screen bg-slate-50/40">
    
    <section class="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-white to-slate-50 pt-16 pb-24 md:pt-24 md:pb-28">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[400px] w-[400px] rounded-full bg-blue-500 opacity-10 blur-[100px]"></div>

      <div class="relative z-10 mx-auto w-full px-6 lg:px-20 2xl:px-40">
        <div class="flex flex-col items-center justify-between gap-12 lg:flex-row xl:gap-16">
          
          <div class="max-w-3xl flex-1 space-y-7 text-center lg:text-left">
            <div class="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 shadow-sm border border-slate-200">
              <span class="flex h-2.5 w-2.5 rounded-full bg-blue-600 animate-pulse"></span>
              <span class="text-slate-700 text-xs font-bold tracking-widest uppercase">Red de Salud Docmeet</span>
            </div>
            
            <h1 class="text-4xl font-extrabold tracking-tight leading-[1.08] text-slate-900 sm:text-5xl lg:text-6xl 2xl:text-7xl">
              Reserva citas <br class="hidden lg:block"> médicas con <span class="text-blue-600">confianza</span>
            </h1>
            
            <p class="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg lg:mx-0 xl:text-xl">
              Conecta con los mejores especialistas de la ciudad. Busca por especialidad, agenda en minutos y asiste a la sede más cercana a ti con total tranquilidad.
            </p>
            
            <div class="mx-auto mt-8 flex w-full max-w-3xl flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-lg shadow-slate-300/20 sm:flex-row lg:mx-0">
              <div class="flex flex-1 items-center rounded-xl border border-slate-100 bg-slate-50 px-4 transition-colors focus-within:border-blue-300 focus-within:bg-white">
                <svg class="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  v-model="searchQuery" 
                  type="text" 
                  placeholder="Sede, médico o enfermedad..." 
                  class="w-full bg-transparent border-none py-4 px-3 text-slate-700 focus:ring-0 outline-none"
                >
              </div>
              <button class="shrink-0 rounded-xl bg-blue-600 px-8 py-4 font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30">
                Buscar ahora
              </button>
            </div>

            <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-6">
              <div class="flex -space-x-3">
                <img class="w-12 h-12 rounded-full border-2 border-white object-cover" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jose" alt="Paciente">
                <img class="w-12 h-12 rounded-full border-2 border-white object-cover" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria" alt="Paciente">
                <img class="w-12 h-12 rounded-full border-2 border-white object-cover" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos" alt="Paciente">
                <div class="w-12 h-12 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">+</div>
              </div>
              <div class="text-left text-sm text-slate-600">
                <span class="font-bold text-slate-900 text-base">15,000+</span> pacientes<br>atendidos este año
              </div>
            </div>
          </div>

          <div class="relative ml-auto hidden w-full max-w-[720px] lg:block lg:w-1/2">
            <div class="relative z-10 aspect-[4/3] overflow-hidden rounded-[2.3rem] border-8 border-white bg-slate-100 shadow-2xl shadow-slate-400/20">
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200&h=900" 
                alt="Doctor usando app" 
                class="w-full h-full object-cover"
              />
            </div>

            <div class="absolute -left-10 top-20 z-20 flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl">
              <div class="w-14 h-14 rounded-full bg-green-50 text-green-500 flex items-center justify-center shrink-0">
                <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Atención Rápida</p>
                <p class="text-base font-extrabold text-slate-900">Médicos 24/7</p>
              </div>
            </div>

            <div class="absolute -right-4 bottom-14 z-20 flex flex-col gap-1 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-xl">
              <div class="flex items-center gap-1 text-amber-400">
                <svg v-for="i in 5" :key="i" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              </div>
              <p class="text-sm font-bold text-slate-900">4.9/5 Calificación</p>
              <p class="text-xs text-slate-500">Basado en 2,500 reseñas</p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <section class="bg-blue-600 py-14">
      <div class="w-full mx-auto px-6 lg:px-20 2xl:px-40">
        <div class="grid grid-cols-2 gap-8 text-center md:grid-cols-4 md:divide-x md:divide-blue-500">
          <div v-for="stat in stats" :key="stat.label" class="space-y-1.5">
            <p class="text-4xl font-extrabold text-white lg:text-5xl 2xl:text-6xl">{{ stat.value }}</p>
            <p class="text-blue-200 text-sm lg:text-base font-semibold uppercase tracking-wide">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <section id="sedes" class="mx-auto w-full px-6 py-20 lg:px-20 2xl:px-40">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div class="max-w-3xl">
          <h2 class="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">Cerca de ti, en tu distrito</h2>
          <p class="mt-4 text-lg lg:text-xl text-slate-600 leading-relaxed">
            Contamos con instalaciones de primer nivel distribuidas estratégicamente para brindarte la mejor atención.
          </p>
        </div>
        <button class="hidden md:inline-flex text-blue-600 font-bold hover:text-blue-800 transition-colors text-lg">
          Ver directorio completo &rarr;
        </button>
      </div>

      <div class="grid gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-10">
        <div 
          v-for="location in locations" 
          :key="location.id"
          class="group flex flex-col overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-300/30"
        >
          <div class="relative h-64 overflow-hidden">
            <img 
              :src="location.image" 
              :alt="location.name" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div class="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-300"></div>
            <div class="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold text-blue-700 shadow-sm">
              {{ location.district }}
            </div>
          </div>
          
          <div class="flex flex-1 flex-col p-7">
            <h3 class="mb-5 text-xl font-bold text-slate-900">{{ location.name }}</h3>
            
            <div class="mt-auto space-y-4 text-base text-slate-600">
              <p class="flex items-center gap-3">
                <span class="font-semibold text-slate-900 w-24 shrink-0">Dirección:</span> 
                {{ location.address }}
              </p>
              <p class="flex items-center gap-3">
                <span class="font-semibold text-slate-900 w-24 shrink-0">Teléfono:</span> 
                {{ location.phone }}
              </p>
              <p class="flex items-center gap-3">
                <span class="font-semibold text-slate-900 w-24 shrink-0">Horario:</span> 
                <span class="text-green-600 font-medium">{{ location.schedule }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>