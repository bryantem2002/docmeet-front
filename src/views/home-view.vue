<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import {
  PhHeart,
  PhAmbulance,
  PhUserCircle,
  PhCalendarCheck,
  PhClipboardText,
  PhMonitor,
  PhTarget,
  PhEye,
  PhMapPin,
  PhArrowRight,
  PhPhone,
  PhEnvelopeSimple,
  PhUser,
  PhDeviceMobile,
  PhChatTeardropText,
  PhMagnifyingGlass,
  PhStar,
  PhStarHalf,
  PhCheckCircle,
  PhMicroscope,
  PhStethoscope,
  PhHeartbeat,
  PhBrain,
  PhBone,
  PhCaretLeft,
  PhCaretRight
} from '@phosphor-icons/vue'
import { doctorController, type IDoctorListItem } from '@/controllers/doctor.controller'

// ── Banner Carousel ──
const slides = [
  { image: '/img/banner-1.png', mobileImage: '/img/banner-1.1.png', tabletImage: '/img/banner-tablet1.png' },
  { image: '/img/banner-2.png', mobileImage: '/img/banner-2.1.png', tabletImage: '/img/banner-tablet2.png' },
  { image: '/img/banner-3.png', mobileImage: '/img/banner-3.1.png', tabletImage: '/img/banner-tablet3.png' }
]

const currentSlide = ref(0)
let autoplayInterval: ReturnType<typeof setInterval> | null = null

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

// ── Doctor Search ──
const searchQuery = ref('')
const selectedSpecialty = ref('')
const doctors = ref<IDoctorListItem[]>([])
const doctorsLoading = ref(true)

const specialties = [
  'Cardiología',
  'Pediatría',
  'Dermatología',
  'Neurología',
  'Traumatología',
  'Medicina General'
]

async function loadDoctors() {
  doctorsLoading.value = true
  try {
    doctors.value = await doctorController.list('', { useMock: true })
  } catch {
    doctors.value = []
  } finally {
    doctorsLoading.value = false
  }
}

const filteredDoctors = computed(() => {
  const searchTerm = (searchQuery.value || '').toLowerCase().trim()
  return [...doctors.value].filter((doc) => {
    if (selectedSpecialty.value && doc.specialty !== selectedSpecialty.value) return false
    if (!searchTerm) return true
    const nameMatch = doc.fullName?.toLowerCase().includes(searchTerm) || (doc as any).name?.toLowerCase().includes(searchTerm)
    const specialtyMatch = doc.specialty?.toLowerCase().includes(searchTerm)
    return nameMatch || specialtyMatch
  })
})

function selectSpecialty(s: string) {
  selectedSpecialty.value = selectedSpecialty.value === s ? '' : s
}

// ── Locations ──
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
  },
  {
    id: 4,
    name: 'Sede San Juan de Lurigancho (Centro Médico SJL)',
    address: 'Av. Próceres de la Independencia 1500',
    district: 'San Juan de Lurigancho',
    phone: '(01) 555-0103',
    schedule: 'Lun - Dom: 7:00 am - 11:00 pm',
    image: 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?auto=format&fit=crop&q=80&w=600&h=400'
  }
])

const stats = [
  { label: 'Especialidades', value: '40+' },
  { label: 'Médicos Activos', value: '250+' },
  { label: 'Pacientes Atendidos', value: '15k+' },
  { label: 'Sedes en la ciudad', value: '4' }
]

// ── Services Carousel ──
const servicesList = [
  { icon: PhHeart, title: 'Servicios para ti', desc: 'Cuidamos tu salud y la de tu familia con una amplia gama de servicios médicos diseñados para brindarte bienestar integral en cada etapa de tu vida.', btnText: 'Conoce más' },
  { icon: PhAmbulance, title: 'Emergencias', desc: 'Atención inmediata las 24 horas del día, los 365 días del año. Nuestro equipo de emergencia está listo para atender cualquier urgencia médica con rapidez y profesionalismo.', btnText: 'Reservar' },
  { icon: PhUserCircle, title: 'Staff Médico', desc: 'Especialistas de primer nivel en todas las áreas de la salud. Encuentra al doctor ideal para ti y agenda una cita en el horario que mejor se adapte a tus necesidades.', btnText: 'Conoce al Staff' },
  { icon: PhCalendarCheck, title: 'Reserva una cita', desc: 'Agenda tus consultas de forma rápida y sencilla desde nuestra plataforma digital. Olvídate de las colas y las esperas: tu salud al alcance de un clic.', btnText: 'Reservar' },
  { icon: PhClipboardText, title: 'Resultados', desc: 'Accede a tus exámenes y resultados médicos en línea desde cualquier dispositivo. Recibe tus diagnósticos de forma segura, rápida y completamente confidencial.', btnText: 'Ver Resultados' },
  { icon: PhMonitor, title: 'Teleconsulta', desc: 'Conecta con tu médico desde la comodidad de tu hogar a través de videoconsultas seguras. Atención especializada sin necesidad de desplazarte ni esperar.', btnText: 'Agendar' }
]

const currentServiceSlide = ref(0)
const totalServiceSlides = ref(3)
const cardsPerView = ref(4)
let serviceInterval: ReturnType<typeof setInterval> | null = null

function updateServiceSlides() {
  const width = window.innerWidth
  if (width >= 1024) { cardsPerView.value = 4; totalServiceSlides.value = servicesList.length - 3 }
  else if (width >= 768) { cardsPerView.value = 2; totalServiceSlides.value = servicesList.length - 1 }
  else { cardsPerView.value = 1; totalServiceSlides.value = servicesList.length }
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
  serviceInterval = setInterval(() => nextServiceSlide(), 5000)
}

// ── Doctor rating helper ──
const doctorRatings: Record<string, { rating: number; reviews: number }> = {
  'Dr. Yalico': { rating: 4.8, reviews: 127 },
  'Dra. Trujillo': { rating: 4.9, reviews: 203 },
  'Dr. Amilcar Quispe': { rating: 4.7, reviews: 89 },
  'Dra. Huaccha': { rating: 4.6, reviews: 64 },
  'Dr. Luis Gómez': { rating: 4.5, reviews: 156 },
  'Dra. Sofía Castro': { rating: 4.9, reviews: 312 }
}

function getRating(name: string) {
  return doctorRatings[name] ?? { rating: 4.5, reviews: 50 }
}

function ratingStars(r: number): string[] {
  const full = Math.floor(r)
  const half = r % 1 >= 0.5 ? 1 : 0
  const empty = 5 - full - half
  return [
    ...Array(full).fill('full'),
    ...Array(half).fill('half'),
    ...Array(empty).fill('empty')
  ]
}

const specialtyIcons: Record<string, any> = {
  Cardiología: PhHeartbeat,
  Pediatría: PhUserCircle,
  Dermatología: PhMicroscope,
  Neurología: PhBrain,
  Traumatología: PhBone,
  'Medicina General': PhStethoscope
}

// ── Animated counter ──
const animatedStats = ref(stats.map(() => ({ display: '0', target: 0 })))
let counterInterval: ReturnType<typeof setInterval> | null = null

function animateCounters() {
  const numericValues = [40, 250, 15, 4]
    stats.forEach((_, i) => {
    animatedStats.value[i].target = numericValues[i]
    animatedStats.value[i].display = '0'
  })
  if (counterInterval) clearInterval(counterInterval)
  counterInterval = setInterval(() => {
    let done = true
    stats.forEach((_, i) => {
      const current = parseInt(animatedStats.value[i].display) || 0
      if (current < animatedStats.value[i].target) {
        done = false
        const next = Math.min(current + Math.ceil(animatedStats.value[i].target / 20), animatedStats.value[i].target)
        animatedStats.value[i].display = String(next) + (i === 2 ? 'k+' : '+')
      } else {
        animatedStats.value[i].display = stats[i].value
      }
    })
    if (done && counterInterval) clearInterval(counterInterval)
  }, 50)
}

// ── Lifecycle ──
onMounted(() => {
  resetAutoplay()
  resetServiceAutoplay()
  updateServiceSlides()
  window.addEventListener('resize', updateServiceSlides)
  void loadDoctors()
  setTimeout(animateCounters, 600)
})

onUnmounted(() => {
  if (autoplayInterval) clearInterval(autoplayInterval)
  if (serviceInterval) clearInterval(serviceInterval)
  if (counterInterval) clearInterval(counterInterval)
  window.removeEventListener('resize', updateServiceSlides)
})
</script>

<template>
  <div class="min-h-screen bg-slate-50/40 dark:bg-slate-900 transition-colors duration-300">

    <section class="relative w-full overflow-hidden">
      <div class="relative aspect-[9/16] sm:aspect-[2.5/1] md:aspect-[3/1] xl:aspect-[3.5/1] max-h-[520px] w-full bg-[#b8dff3] dark:bg-slate-800" role="region" aria-roledescription="carousel" aria-label="Banners promocionales">

        <!-- Slides -->
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="absolute inset-0 transition-all duration-700 ease-in-out"
          :class="index === currentSlide ? 'opacity-100 translate-x-0' : index < currentSlide ? 'opacity-0 -translate-x-full' : 'opacity-0 translate-x-full'"
          :aria-hidden="index !== currentSlide"
        >
          <div class="w-full h-full relative">
            <!-- Mobile image -->
            <img
              :src="slide.mobileImage"
              :alt="'Banner ' + (index + 1)"
              class="w-full h-full object-cover object-top sm:hidden"
            />
            <!-- Tablet / Laptop -->
            <img
              :src="slide.tabletImage"
              :alt="'Banner ' + (index + 1)"
              class="hidden sm:block xl:hidden w-full h-full object-cover object-center"
            />
            <!-- Desktop XL+ -->
            <img
              :src="slide.image"
              :alt="'Banner ' + (index + 1)"
              class="hidden xl:block w-full h-full object-cover object-center"
            />
          </div>
        </div>

        <!-- Nav Arrows -->
        <button
          @click="prevSlide"
          aria-label="Anterior banner"
          class="absolute left-3 lg:left-6 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-slate-600 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:text-[#3E90C8] hover:shadow-lg"
        >
          <PhCaretLeft class="h-5 w-5" weight="bold" />
        </button>
        <button
          @click="nextSlide"
          aria-label="Siguiente banner"
          class="absolute right-3 lg:right-6 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-slate-600 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:text-[#3E90C8] hover:shadow-lg"
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
            :class="index === currentSlide ? 'w-8 bg-[#3E90C8]' : 'w-2 bg-slate-300 hover:bg-slate-400'"
          ></button>
        </div>
      </div>
    </section>

    <!-- ═══ STATS ═══ -->
    <section id="stats"  class="bg-slate-100 dark:bg-slate-800 py-10 transition-colors duration-300">
      <div class="mx-auto w-full max-w-[1400px] px-6 lg:px-8 xl:px-12">
        <div class="grid grid-cols-2 gap-6 text-center md:grid-cols-4 md:divide-x md:divide-slate-300 dark:md:divide-slate-600">
          <div v-for="(stat, i) in stats" :key="stat.label" class="space-y-1">
            <p class="text-3xl font-extrabold text-[#418FC8] dark:text-[#6DC7DC] lg:text-4xl 2xl:text-5xl">{{ animatedStats[i]?.display ?? stat.value }}</p>
            <p class="text-slate-500 dark:text-slate-400 text-sm lg:text-base font-semibold uppercase tracking-wide">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ SERVICIOS ═══ -->
    <section id="servicios"  class="bg-slate-50 dark:bg-slate-800/50 py-20 overflow-hidden relative transition-colors duration-300">
      <div class="w-full max-w-[1600px] mx-auto px-6 lg:px-10">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl md:text-4xl lg:text-[2.5rem] font-black text-slate-900 dark:text-white tracking-tight">¿En qué podemos ayudarte hoy?</h2>
          <p class="text-slate-500 dark:text-slate-400 text-lg mt-4 leading-relaxed">
            Descubre todos los servicios que tenemos preparados para cuidar de tu salud y la de tu familia.
          </p>
        </div>

        <div class="overflow-hidden w-full relative -mx-3 px-3">
          <div
            class="flex transition-transform duration-500 md:duration-700 lg:duration-1000 ease-in-out"
            :style="{ transform: `translateX(-${currentServiceSlide * (100 / cardsPerView)}%)` }"
          >
            <div
              v-for="(item, i) in servicesList"
              :key="i"
              class="w-full md:w-1/2 lg:w-1/4 shrink-0 px-3"
            >
              <div class="h-full bg-white dark:bg-slate-800 rounded-[1.5rem] p-8 flex flex-col items-center text-center shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-none border border-slate-100 dark:border-slate-700 hover:shadow-xl dark:hover:shadow-slate-900/50 hover:border-[#418FC8]/20 dark:hover:border-[#6DC7DC]/30 hover:-translate-y-1 transition-all duration-300 group">
                <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#418FC8]/10 to-[#6DC7DC]/10 dark:from-[#418FC8]/20 dark:to-[#6DC7DC]/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <component :is="item.icon" class="h-8 w-8 text-[#3E90C8] dark:text-[#6DC7DC]" weight="fill" />
                </div>
                <h4 class="text-[18px] font-black text-slate-800 dark:text-white mb-3 leading-tight">{{ item.title }}</h4>
                <p class="text-[14.5px] font-medium text-slate-500 dark:text-slate-400 mb-8 leading-relaxed flex-1">{{ item.desc }}</p>
                <button class="w-full bg-[#4E97CB] dark:bg-[#418FC8] hover:bg-[#70C6DC] dark:hover:bg-[#3a7db5] text-white font-bold py-3.5 px-6 rounded-full transition-all text-[14px] shadow-md shadow-blue-100 dark:shadow-none hover:shadow-lg hover:shadow-blue-200">
                  {{ item.btnText }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center gap-2 mt-12">
          <button
            v-for="index in totalServiceSlides"
            :key="index"
            @click="goToServiceSlide(index - 1)"
            class="h-2 rounded-full transition-all duration-500"
            :class="(index - 1) === currentServiceSlide ? 'w-8 bg-[#3E90C8] dark:bg-[#6DC7DC]' : 'w-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'"
          ></button>
        </div>
      </div>
    </section>

    <!-- ═══ SOBRE NOSOTROS ═══ -->
    <section id="nosotros"  class="bg-white dark:bg-slate-900 py-20 transition-colors duration-300">
      <div class="mx-auto w-full max-w-[1400px] px-6 lg:px-8 xl:px-12">
        <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-16">
          <div class="w-full lg:w-1/2 relative">
            <div class="absolute inset-0 bg-[#3E90C8] dark:bg-[#6DC7DC] rounded-[2rem] translate-x-4 translate-y-4 opacity-20 dark:opacity-10"></div>
            <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800&h=600" alt="Sobre DocMeet" class="relative rounded-[2rem] shadow-2xl w-full object-cover aspect-[4/3] z-10 dark:opacity-90" />
          </div>
          <div class="w-full lg:w-1/2 space-y-6">
            <h2 class="text-[#3E90C8] dark:text-[#6DC7DC] font-bold tracking-widest uppercase text-sm">Sobre Nosotros</h2>
            <h3 class="text-3xl lg:text-4xl xl:text-5xl font-extrabold text-slate-800 dark:text-white tracking-tight leading-tight">Transformando la experiencia en salud</h3>
            <p class="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              En DocMeet, nos dedicamos a conectar pacientes con los mejores especialistas del país, facilitando el acceso a una atención médica de calidad, rápida y confiable. Nuestra plataforma está diseñada para simplificar la gestión de tus citas y cuidar de ti y tu familia.
            </p>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div class="bg-gradient-to-br from-[#418FC8]/5 to-[#6DC7DC]/5 dark:from-[#418FC8]/10 dark:to-[#6DC7DC]/10 rounded-[1.5rem] p-8 border border-[#418FC8]/10 dark:border-[#418FC8]/20 hover:shadow-lg hover:shadow-[#418FC8]/5 dark:hover:shadow-[#418FC8]/10 transition-all duration-300">
            <div class="w-14 h-14 rounded-xl bg-[#418FC8] dark:bg-[#418FC8] flex items-center justify-center mb-6">
              <PhTarget class="w-7 h-7 text-white" weight="fill" />
            </div>
            <h4 class="text-xl font-black text-slate-800 dark:text-white mb-3">Nuestra Misión</h4>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
              Democratizar el acceso a la salud de calidad en el Perú, ofreciendo una plataforma digital que conecte a pacientes con los mejores especialistas médicos, eliminando barreras geográficas y burocráticas para que cada persona reciba la atención que merece.
            </p>
          </div>
          <div class="bg-gradient-to-br from-[#418FC8]/5 to-[#6DC7DC]/5 dark:from-[#418FC8]/10 dark:to-[#6DC7DC]/10 rounded-[1.5rem] p-8 border border-[#418FC8]/10 dark:border-[#418FC8]/20 hover:shadow-lg hover:shadow-[#418FC8]/5 dark:hover:shadow-[#418FC8]/10 transition-all duration-300">
            <div class="w-14 h-14 rounded-xl bg-[#6DC7DC] dark:bg-[#6DC7DC] flex items-center justify-center mb-6">
              <PhEye class="w-7 h-7 text-white" weight="fill" />
            </div>
            <h4 class="text-xl font-black text-slate-800 dark:text-white mb-3">Nuestra Visión</h4>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
              Ser la plataforma de salud digital líder en América Latina, reconocida por transformar la experiencia médica mediante la innovación tecnológica, la calidez humana y un compromiso inquebrantable con el bienestar de nuestros pacientes.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ SEDES ═══ -->
    <section id="sedes"  class="mx-auto w-full max-w-[1400px] px-6 py-20 lg:px-8 xl:px-12">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div class="max-w-3xl">
          <h2 class="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">Cerca de ti, en tu distrito</h2>
          <p class="mt-4 text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            Contamos con instalaciones de primer nivel distribuidas estratégicamente para brindarte la mejor atención.
          </p>
        </div>
        <button class="hidden md:inline-flex items-center gap-2 text-[#3E90C8] dark:text-[#6DC7DC] font-bold hover:text-[#2d7ab5] dark:hover:text-[#5db8cf] transition-colors text-lg">
          Ver directorio completo
          <PhArrowRight class="w-5 h-5" weight="bold" />
        </button>
      </div>

      <div class="grid gap-8 md:grid-cols-2 xl:grid-cols-4 xl:gap-6">
        <div
          v-for="location in locations"
          :key="location.id"
          class="group flex flex-col overflow-hidden rounded-[1.6rem] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-300/30 dark:hover:shadow-slate-900/50"
        >
          <div class="relative h-56 overflow-hidden">
            <img
              :src="location.image"
              :alt="location.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out dark:opacity-85"
            />
            <div class="absolute inset-0 bg-slate-900/10 dark:bg-slate-900/40 group-hover:bg-transparent transition-colors duration-300"></div>
            <div class="absolute top-4 right-4 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-sm font-bold text-[#3E90C8] dark:text-[#6DC7DC] shadow-sm flex items-center gap-1.5">
              <PhMapPin class="w-3.5 h-3.5" weight="fill" />
              {{ location.district }}
            </div>
          </div>

          <div class="flex flex-1 flex-col p-6">
            <h3 class="mb-4 text-lg font-bold text-slate-900 dark:text-white leading-snug">{{ location.name }}</h3>
            <div class="mt-auto space-y-3.5 text-sm text-slate-600 dark:text-slate-400">
              <p class="flex items-start gap-3">
                <span class="font-semibold text-slate-900 dark:text-white w-24 shrink-0 text-sm">Dirección:</span>
                <span>{{ location.address }}</span>
              </p>
              <p class="flex items-center gap-3">
                <span class="font-semibold text-slate-900 dark:text-white w-24 shrink-0">Teléfono:</span>
                {{ location.phone }}
              </p>
              <p class="flex items-center gap-3">
                <span class="font-semibold text-slate-900 dark:text-white w-24 shrink-0">Horario:</span>
                <span class="text-green-600 dark:text-green-400 font-medium">{{ location.schedule }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ LIVE DOCTOR SEARCH ═══ -->
    <section id="doctores"  class="bg-white dark:bg-slate-900 py-20 transition-colors duration-300">
      <div class="mx-auto w-full max-w-[1400px] px-6 lg:px-8 xl:px-12">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <h2 class="text-3xl md:text-4xl lg:text-[2.5rem] font-black text-slate-900 dark:text-white tracking-tight">Encuentra a tu especialista</h2>
          <p class="text-slate-500 dark:text-slate-400 text-lg mt-4 leading-relaxed">
            Busca entre nuestro staff de médicos por nombre, especialidad o condición.
          </p>
        </div>

        <!-- Search bar -->
        <div class="max-w-2xl mx-auto mb-8">
          <div class="relative">
            <PhMagnifyingGlass class="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" weight="bold" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar médico, especialidad..."
              class="w-full pl-13 pr-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-[#418FC8] focus:border-[#418FC8] outline-none transition-all text-lg shadow-sm"
            />
            <button
              v-if="searchQuery || selectedSpecialty"
              @click="searchQuery = ''; selectedSpecialty = ''"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-sm font-semibold"
            >
              Limpiar
            </button>
          </div>
        </div>

        <!-- Specialty chips -->
        <div class="flex flex-wrap justify-center gap-3 mb-12">
          <button
            v-for="s in specialties"
            :key="s"
            @click="selectSpecialty(s)"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border transition-all duration-200"
            :class="selectedSpecialty === s
              ? 'bg-[#418FC8] text-white border-[#418FC8] shadow-md shadow-blue-200 dark:shadow-blue-900'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-[#418FC8] hover:text-[#418FC8] dark:hover:text-[#6DC7DC] dark:hover:border-[#6DC7DC]'"
          >
            <component :is="specialtyIcons[s] || PhStethoscope" class="w-4 h-4" weight="fill" />
            {{ s }}
          </button>
        </div>

        <!-- Results -->
        <div v-if="doctorsLoading" class="flex justify-center py-16">
          <div class="w-10 h-10 border-4 border-[#418FC8]/30 border-t-[#418FC8] rounded-full animate-spin"></div>
        </div>

        <div v-else-if="filteredDoctors.length === 0" class="text-center py-16">
          <PhMagnifyingGlass class="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" weight="thin" />
          <p class="text-xl font-bold text-slate-600 dark:text-slate-400">No encontramos resultados</p>
          <p class="text-slate-400 dark:text-slate-500 mt-2">Intenta con otro término o especialidad.</p>
        </div>

        <TransitionGroup v-else name="doctor-card" tag="div" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" appear>
          <div
            v-for="d in filteredDoctors"
            :key="d.id"
            class="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div class="flex items-start gap-4">
              <img
                :src="d.avatar"
                :alt="d.fullName"
                class="w-16 h-16 rounded-full object-cover ring-2 ring-white dark:ring-slate-700 shadow-sm shrink-0"
              />
              <div class="min-w-0 flex-1">
                <h3 class="font-bold text-lg text-slate-900 dark:text-white truncate">{{ d.fullName }}</h3>
                <div class="flex items-center gap-1.5 mt-1.5">
                  <span class="inline-flex items-center gap-1 text-xs font-semibold text-[#418FC8] dark:text-[#6DC7DC] bg-[#418FC8]/10 dark:bg-[#6DC7DC]/10 px-2.5 py-0.5 rounded-full">
                    <component :is="specialtyIcons[d.specialty] || PhStethoscope" class="w-3 h-3" weight="fill" />
                    {{ d.specialty }}
                  </span>
                  <span class="inline-flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/40 px-2.5 py-0.5 rounded-full">
                    <PhCheckCircle class="w-3 h-3" weight="fill" />
                    Disponible
                  </span>
                </div>
                <!-- Rating -->
                <div class="flex items-center gap-1.5 mt-2">
                  <div class="flex items-center">
                    <template v-for="(type, ri) in ratingStars(getRating(d.fullName).rating)" :key="ri">
                      <PhStar v-if="type === 'full'" class="w-3.5 h-3.5 text-amber-400" weight="fill" />
                      <PhStarHalf v-else-if="type === 'half'" class="w-3.5 h-3.5 text-amber-400" weight="fill" />
                      <PhStar v-else class="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" weight="fill" />
                    </template>
                  </div>
                  <span class="text-xs font-bold text-slate-600 dark:text-slate-400">{{ getRating(d.fullName).rating }}</span>
                  <span class="text-xs text-slate-400 dark:text-slate-500">({{ getRating(d.fullName).reviews }})</span>
                </div>
              </div>
            </div>
            <p v-if="d.bio" class="text-sm text-slate-600 dark:text-slate-400 mt-4 line-clamp-2 leading-relaxed">{{ d.bio }}</p>
            <div class="mt-5 flex gap-3">
              <router-link
                :to="`/doctor/${d.id}`"
                class="flex-1 text-center text-sm font-bold text-white bg-[#418FC8] hover:bg-[#3a7db5] dark:bg-[#418FC8] dark:hover:bg-[#3a7db5] py-2.5 rounded-xl transition-colors"
              >
                Ver Perfil
              </router-link>
              <button class="flex-1 text-center text-sm font-bold text-[#418FC8] dark:text-[#6DC7DC] border-2 border-[#418FC8]/30 dark:border-[#6DC7DC]/30 hover:border-[#418FC8] dark:hover:border-[#6DC7DC] py-2.5 rounded-xl transition-all">
                Agendar Cita
              </button>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </section>

    <!-- ═══ CONTACTO ═══ -->
    <section  class="relative bg-white dark:bg-slate-900 py-20 overflow-hidden transition-colors duration-300">
      <div class="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none">
        <div class="absolute -top-24 -right-24 w-96 h-96 bg-[#4E97CB] rounded-full blur-3xl"></div>
        <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-[#70C6DC] rounded-full blur-3xl"></div>
      </div>

      <div class="mx-auto w-full max-w-[1400px] px-6 lg:px-8 xl:px-12 relative z-10">
        <div class="bg-white dark:bg-slate-800 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col lg:flex-row">
          <div class="w-full lg:w-5/12 bg-gradient-to-br from-[#3E90C8] to-[#1c4d72] dark:from-[#2a5783] dark:to-[#0f2a44] p-8 sm:p-10 lg:p-14 text-white flex flex-col justify-center relative overflow-hidden">
            <div class="absolute inset-0 bg-[url('/img/fondo1.png')] bg-cover bg-center opacity-20 mix-blend-overlay pointer-events-none"></div>
            <div class="absolute -right-20 -top-20 w-64 h-64 bg-white opacity-5 rounded-full blur-2xl"></div>
            <h3 class="text-3xl lg:text-4xl font-black mb-4 relative z-10">¿Dudas o consultas?</h3>
            <p class="text-blue-50 text-lg mb-10 leading-relaxed relative z-10">
              Déjanos tus datos y un asesor médico se comunicará contigo en la brevedad posible.
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

          <div class="w-full lg:w-7/12 p-6 sm:p-10 lg:p-14 bg-white dark:bg-slate-800">
            <form @submit.prevent class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2 relative">
                  <label class="text-sm font-bold text-slate-700 dark:text-slate-300">Nombres Completos</label>
                  <div class="relative">
                    <PhUser class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" weight="bold" />
                    <input type="text" placeholder="Ej. Juan Pérez" class="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-[#3E90C8] dark:focus:ring-[#6DC7DC] focus:border-[#3E90C8] dark:focus:border-[#6DC7DC] outline-none transition-all text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500" required>
                  </div>
                </div>
                <div class="space-y-2 relative">
                  <label class="text-sm font-bold text-slate-700 dark:text-slate-300">Teléfono / Celular</label>
                  <div class="relative">
                    <PhDeviceMobile class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" weight="bold" />
                    <input type="tel" placeholder="Ej. 987 654 321" class="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-[#3E90C8] dark:focus:ring-[#6DC7DC] focus:border-[#3E90C8] dark:focus:border-[#6DC7DC] outline-none transition-all text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500" required>
                  </div>
                </div>
              </div>

              <div class="space-y-2 relative">
                <label class="text-sm font-bold text-slate-700 dark:text-slate-300">Correo Electrónico</label>
                <div class="relative">
                  <PhEnvelopeSimple class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" weight="bold" />
                  <input type="email" placeholder="tucorreo@ejemplo.com" class="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-[#3E90C8] dark:focus:ring-[#6DC7DC] focus:border-[#3E90C8] dark:focus:border-[#6DC7DC] outline-none transition-all text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500" required>
                </div>
              </div>

              <div class="space-y-2 relative">
                <label class="text-sm font-bold text-slate-700 dark:text-slate-300">¿En qué podemos ayudarte?</label>
                <div class="relative">
                  <PhChatTeardropText class="absolute left-4 top-4 w-5 h-5 text-slate-400 dark:text-slate-500" weight="bold" />
                  <textarea rows="4" placeholder="Escribe tu mensaje o consulta aquí..." class="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-[#3E90C8] dark:focus:ring-[#6DC7DC] focus:border-[#3E90C8] dark:focus:border-[#6DC7DC] outline-none transition-all text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 resize-none" required></textarea>
                </div>
              </div>

              <button type="submit" class="w-full bg-[#3E90C8] dark:bg-[#418FC8] hover:bg-[#1c4d72] dark:hover:bg-[#2a5783] text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-blue-200 dark:shadow-blue-900/50 mt-2 text-lg">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
