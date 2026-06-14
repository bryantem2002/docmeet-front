<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { 
  PhCaretLeft, 
  PhCaretRight,
  PhUsersThree,
  PhAmbulance,
  PhStethoscope,
  PhCalendarPlus,
  PhFileText,
  PhVideoCamera,
  PhPhone,
  PhEnvelopeSimple,
  PhUser,
  PhDeviceMobile,
  PhChatTeardropText
} from '@phosphor-icons/vue'

// ── Banner Carousel ──
const currentSlide = ref(0)
let autoplayInterval: ReturnType<typeof setInterval> | null = null

const slides = [
  { imageDesktop: '/img/banner-1.png', imageMobile: '/img/banner-1.1.png' },
  { imageDesktop: '/img/banner-2.png', imageMobile: '/img/banner-2.1.png' },
  { imageDesktop: '/img/banner-3.png', imageMobile: '/img/banner-3.1.png' }
]

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % slides.length
  resetAutoplay()
}

function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length
  resetAutoplay()
}

function goToSlide(index: number) {
  currentSlide.value = index
  resetAutoplay()
}

function resetAutoplay() {
  if (autoplayInterval) clearInterval(autoplayInterval)
  autoplayInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 6000)
}

onMounted(() => {
  resetAutoplay()
  resetServiceAutoplay()
  updateServiceSlides()
  window.addEventListener('resize', updateServiceSlides)
})

onUnmounted(() => {
  if (autoplayInterval) clearInterval(autoplayInterval)
  if (serviceInterval) clearInterval(serviceInterval)
  window.removeEventListener('resize', updateServiceSlides)
})

// ── Data ──
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
    image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=600&h=400'
  }
])

const stats = [
  { label: 'Especialidades', value: '40+' },
  { label: 'Médicos Activos', value: '250+' },
  { label: 'Pacientes Atendidos', value: '15k+' },
  { label: 'Sedes en la ciudad', value: '3' },
]

const servicesList = [
  { icon: PhUsersThree, title: 'Servicios para ti', desc: 'Servicios pensados en tu bienestar y el de tu familia', btnText: 'Conoce más' },
  { icon: PhAmbulance, title: 'Emergencias', desc: 'Conoce nuestro servicio de emergencia 24/7', btnText: 'Reservar' },
  { icon: PhStethoscope, title: 'Staff Médico', desc: 'Conoce a tu doctor de confianza y sus horarios', btnText: 'Conoce al Staff' },
  { icon: PhCalendarPlus, title: 'Reserva una cita', desc: 'Reserva una cita a través de nuestro canal digital', btnText: 'Reservar' },
  { icon: PhFileText, title: 'Resultados', desc: 'Revisa tus exámenes y resultados médicos en línea', btnText: 'Ver Resultados' },
  { icon: PhVideoCamera, title: 'Teleconsulta', desc: 'Atención médica virtual sin necesidad de salir de casa', btnText: 'Agendar' }
]

// ── Services Carousel ──
const currentServiceSlide = ref(0)
const totalServiceSlides = ref(3) // Will update dynamically
const cardsPerView = ref(4)

let serviceInterval: ReturnType<typeof setInterval> | null = null

function updateServiceSlides() {
  const width = window.innerWidth
  if (width >= 1024) {
    cardsPerView.value = 4
    totalServiceSlides.value = servicesList.length - 3 // 6 - 4 + 1 = 3
  } else if (width >= 768) {
    cardsPerView.value = 2
    totalServiceSlides.value = servicesList.length - 1 // 6 - 2 + 1 = 5
  } else {
    cardsPerView.value = 1
    totalServiceSlides.value = servicesList.length // 6 - 1 + 1 = 6
  }
  
  if (currentServiceSlide.value >= totalServiceSlides.value) {
    currentServiceSlide.value = totalServiceSlides.value - 1
  }
}

function nextServiceSlide() {
  currentServiceSlide.value = (currentServiceSlide.value + 1) % totalServiceSlides.value
}

function goToServiceSlide(index: number) {
  currentServiceSlide.value = index
  resetServiceAutoplay()
}

function resetServiceAutoplay() {
  if (serviceInterval) clearInterval(serviceInterval)
  serviceInterval = setInterval(() => {
    nextServiceSlide()
  }, 5000) // Cambia cada 5 segundos ("poco a poco")
}
</script>

<template>
  <div class="min-h-screen bg-slate-50/40">
    
    <!-- ═══ BANNER CAROUSEL ═══ -->
    <section class="relative w-full overflow-hidden bg-gradient-to-br from-slate-50 to-white">
      <div class="relative h-[550px] sm:h-[460px] lg:h-[600px] w-full">
        
        <!-- Slides -->
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="absolute inset-0 transition-all duration-700 ease-in-out"
          :class="index === currentSlide ? 'opacity-100 translate-x-0' : index < currentSlide ? 'opacity-0 -translate-x-full' : 'opacity-0 translate-x-full'"
        >
          <div class="w-full h-full flex justify-center items-center">
            <picture class="w-full h-full">
              <!-- Móvil -->
              <source media="(max-width: 639px)" :srcset="slide.imageMobile">
              <!-- Web/Tablet -->
              <source media="(min-width: 640px)" :srcset="slide.imageDesktop">
              
              <img
                :src="slide.imageDesktop"
                alt="Banner DocMeet"
                class="w-full h-full object-cover object-top sm:object-center"
              />
            </picture>
          </div>
        </div>

        <!-- Nav Arrows -->
        <button
          @click="prevSlide"
          class="absolute left-3 lg:left-6 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-slate-600 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:text-[#418FC8] hover:shadow-lg"
        >
          <PhCaretLeft class="h-5 w-5" weight="bold" />
        </button>
        <button
          @click="nextSlide"
          class="absolute right-3 lg:right-6 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-slate-600 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:text-[#418FC8] hover:shadow-lg"
        >
          <PhCaretRight class="h-5 w-5" weight="bold" />
        </button>

        <!-- Dots -->
        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
          <button
            v-for="(_, index) in slides"
            :key="index"
            @click="goToSlide(index)"
            class="h-2 rounded-full transition-all duration-300"
            :class="index === currentSlide ? 'w-8 bg-[#418FC8]' : 'w-2 bg-slate-300 hover:bg-slate-400'"
          ></button>
        </div>
      </div>
    </section>

    <!-- ═══ STATS ═══ -->
    <section class="bg-gradient-to-r from-[#418FC8] to-[#6DC7DC] py-14">
      <div class="mx-auto w-full max-w-[1400px] px-6 lg:px-8 xl:px-12">
        <div class="grid grid-cols-2 gap-8 text-center md:grid-cols-4 md:divide-x md:divide-[#68C8E0]/30">
          <div v-for="stat in stats" :key="stat.label" class="space-y-1.5">
            <p class="text-4xl font-extrabold text-white lg:text-5xl 2xl:text-6xl">{{ stat.value }}</p>
            <p class="text-[#68C8E0] text-sm lg:text-base font-semibold uppercase tracking-wide">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ SERVICIOS RAPIDOS (CAROUSEL CON PUNTOS) ═══ -->
    <section id="servicios" class="bg-slate-50 py-20 overflow-hidden relative">
      <div class="w-full max-w-[1600px] mx-auto px-6 lg:px-10">
        <h2 class="text-3xl md:text-4xl lg:text-[2.5rem] font-black text-center text-[#2a1b3d] tracking-tight mb-14">¿En qué podemos ayudarte hoy?</h2>
        
        <!-- Contenedor del Slider -->
        <div class="overflow-hidden w-full relative -mx-3 px-3">
          <div 
            class="flex transition-transform duration-1000 ease-in-out"
            :style="{ transform: `translateX(-${currentServiceSlide * (100 / cardsPerView)}%)` }"
          >
            
            <div 
              v-for="(item, i) in servicesList" 
              :key="i"
              class="w-full md:w-1/2 lg:w-1/4 shrink-0 px-3"
            >
              <div class="h-full bg-white rounded-[1.5rem] p-8 flex flex-col items-center text-center shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 hover:shadow-xl hover:border-slate-200 transition-all duration-300 group">
                <component :is="item.icon" class="h-16 w-16 text-[#3E90C8] mb-5 group-hover:scale-110 transition-transform duration-300" weight="fill" />
                <h3 class="text-[18px] font-black text-slate-800 mb-3 leading-tight">{{ item.title }}</h3>
                <p class="text-[14.5px] font-bold text-slate-500 mb-8 leading-relaxed flex-1">{{ item.desc }}</p>
                <button class="w-full bg-[#4E97CB] hover:bg-[#70C6DC] text-white font-bold py-3.5 px-6 rounded-full transition-colors text-[14px]">
                  {{ item.btnText }}
                </button>
              </div>
            </div>

          </div>
        </div>

        <!-- Indicadores (Puntos) -->
        <div class="flex justify-center gap-2 mt-12">
          <button
            v-for="index in totalServiceSlides"
            :key="index"
            @click="goToServiceSlide(index - 1)"
            class="h-2 rounded-full transition-all duration-500"
            :class="(index - 1) === currentServiceSlide ? 'w-8 bg-[#3E90C8]' : 'w-2 bg-slate-300 hover:bg-slate-400'"
          ></button>
        </div>

      </div>
    </section>

    <!-- ═══ NOSOTROS ═══ -->
    <section id="nosotros" class="bg-white py-20">
      <div class="mx-auto w-full max-w-[1400px] px-6 lg:px-8 xl:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div class="w-full lg:w-1/2 relative">
          <div class="absolute inset-0 bg-[#3E90C8] rounded-[2rem] translate-x-4 translate-y-4 opacity-20"></div>
          <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800&h=600" alt="Sobre DocMeet" class="relative rounded-[2rem] shadow-2xl w-full object-cover aspect-[4/3] z-10" />
        </div>
        <div class="w-full lg:w-1/2 space-y-6">
          <h2 class="text-[#3E90C8] font-bold tracking-widest uppercase text-sm">Sobre Nosotros</h2>
          <h3 class="text-3xl lg:text-4xl xl:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">Transformando la experiencia en salud</h3>
          <p class="text-slate-600 text-lg leading-relaxed">
            En DocMeet, nos dedicamos a conectar pacientes con los mejores especialistas del país, facilitando el acceso a una atención médica de calidad, rápida y confiable. Nuestra plataforma está diseñada para simplificar la gestión de tus citas y cuidar de ti y tu familia.
          </p>
          <div class="pt-4 flex flex-wrap gap-4">
            <button class="bg-[#3E90C8] hover:bg-[#4E97CB] text-white font-bold py-3.5 px-8 rounded-full transition-colors shadow-lg shadow-blue-200">
              Conoce más
            </button>
            <button class="bg-slate-100 text-[#3E90C8] hover:bg-slate-200 font-bold py-3.5 px-8 rounded-full transition-colors">
              Nuestro Equipo
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ SEDES ═══ -->
    <section id="sedes" class="mx-auto w-full max-w-[1400px] px-6 py-20 lg:px-8 xl:px-12">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div class="max-w-3xl">
          <h2 class="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">Cerca de ti, en tu distrito</h2>
          <p class="mt-4 text-lg lg:text-xl text-slate-600 leading-relaxed">
            Contamos con instalaciones de primer nivel distribuidas estratégicamente para brindarte la mejor atención.
          </p>
        </div>
        <button class="hidden md:inline-flex text-[#3E90C8] font-bold hover:text-[#2d7ab5] transition-colors text-lg">
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
            <div class="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold text-[#3E90C8] shadow-sm">
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

    <!-- ═══ CONTACTO / FORMULARIO ═══ -->
    <section class="relative bg-white py-20 overflow-hidden">
      <!-- Background Decorations -->
      <div class="absolute inset-0 opacity-10 pointer-events-none">
        <div class="absolute -top-24 -right-24 w-96 h-96 bg-[#4E97CB] rounded-full blur-3xl"></div>
        <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-[#70C6DC] rounded-full blur-3xl"></div>
      </div>
      
      <div class="mx-auto w-full max-w-[1400px] px-6 lg:px-8 xl:px-12 relative z-10">
        <div class="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 overflow-hidden flex flex-col lg:flex-row">
          
          <!-- Info Column -->
          <div class="w-full lg:w-5/12 bg-gradient-to-br from-[#3E90C8] to-[#1c4d72] p-8 sm:p-10 lg:p-14 text-white flex flex-col justify-center relative overflow-hidden">
            <!-- Decorative Background Image (fondo1.png) -->
            <div class="absolute inset-0 bg-[url('/img/fondo1.png')] bg-cover bg-center opacity-20 mix-blend-overlay pointer-events-none"></div>
            
            <!-- Decorative circle -->
            <div class="absolute -right-20 -top-20 w-64 h-64 bg-white opacity-5 rounded-full blur-2xl"></div>
            
            <h3 class="text-3xl lg:text-4xl font-black mb-4 relative z-10">¿Dudas o consultas?</h3>
            <p class="text-blue-50 text-lg mb-10 leading-relaxed relative z-10">
              Déjanos tus datos y un asesor médico se comunicará contigo en la brevedad posible para ayudarte a gestionar tu cita o resolver tus inquietudes.
            </p>
            
            <div class="space-y-6 relative z-10">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                  <PhPhone class="w-6 h-6 text-[#70C6DC]" weight="fill" />
                </div>
                <div>
                  <p class="text-blue-100 text-sm font-semibold">Llámanos directo</p>
                  <p class="font-bold text-xl">(01) 610-3333</p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                  <PhEnvelopeSimple class="w-6 h-6 text-[#70C6DC]" weight="fill" />
                </div>
                <div>
                  <p class="text-blue-100 text-sm font-semibold">Escríbenos</p>
                  <p class="font-bold text-xl">contacto@docmeet.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Form Column -->
          <div class="w-full lg:w-7/12 p-6 sm:p-10 lg:p-14 bg-white">
            <form @submit.prevent class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2 relative">
                  <label class="text-sm font-bold text-slate-700">Nombres Completos</label>
                  <div class="relative">
                    <PhUser class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" weight="bold" />
                    <input type="text" placeholder="Ej. Juan Pérez" class="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#3E90C8] focus:border-[#3E90C8] outline-none transition-all text-slate-700" required>
                  </div>
                </div>
                <div class="space-y-2 relative">
                  <label class="text-sm font-bold text-slate-700">Teléfono / Celular</label>
                  <div class="relative">
                    <PhDeviceMobile class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" weight="bold" />
                    <input type="tel" placeholder="Ej. 987 654 321" class="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#3E90C8] focus:border-[#3E90C8] outline-none transition-all text-slate-700" required>
                  </div>
                </div>
              </div>
              
              <div class="space-y-2 relative">
                <label class="text-sm font-bold text-slate-700">Correo Electrónico</label>
                <div class="relative">
                  <PhEnvelopeSimple class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" weight="bold" />
                  <input type="email" placeholder="tucorreo@ejemplo.com" class="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#3E90C8] focus:border-[#3E90C8] outline-none transition-all text-slate-700" required>
                </div>
              </div>
              
              <div class="space-y-2 relative">
                <label class="text-sm font-bold text-slate-700">¿En qué podemos ayudarte?</label>
                <div class="relative">
                  <PhChatTeardropText class="absolute left-4 top-4 w-5 h-5 text-slate-400" weight="bold" />
                  <textarea rows="4" placeholder="Escribe tu mensaje o consulta aquí..." class="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#3E90C8] focus:border-[#3E90C8] outline-none transition-all text-slate-700 resize-none" required></textarea>
                </div>
              </div>
              
              <button type="submit" class="w-full bg-[#3E90C8] hover:bg-[#1c4d72] text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-blue-200 mt-2 text-lg">
                Enviar Mensaje
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </section>

  </div>
</template>