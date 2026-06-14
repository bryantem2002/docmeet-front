<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  PhFacebookLogo,
  PhInstagramLogo,
  PhTwitterLogo,
  PhLinkedinLogo,
  PhMapPin,
  PhPhone,
  PhEnvelopeSimple
} from '@phosphor-icons/vue'
</script>

<template>
  <footer class="bg-[#1c4d72] border-t border-[#256694] pt-16 pb-8 mt-auto">
    <div class="mx-auto w-full max-w-[1600px] px-6 lg:px-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-12">
        
        <!-- Brand & About -->
        <div class="space-y-6">
          <RouterLink :to="{ name: 'home' }" class="flex items-center gap-3">
            <img src="/img/logodoc.png" alt="DocMeet Logo" class="h-10 w-10 object-contain brightness-0 invert" />
            <div class="leading-none">
              <p class="text-2xl tracking-tight">
                <span class="font-black text-white">Doc</span><span class="font-bold text-white">Meet</span>
              </p>
            </div>
          </RouterLink>
          <p class="text-blue-50 text-[15px] leading-relaxed">
            Tu salud es nuestra prioridad. Encuentra a los mejores especialistas y agenda tu cita en minutos desde cualquier lugar, las 24 horas del día.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-white font-black text-lg mb-6">Enlaces Rápidos</h3>
          <ul class="space-y-4 text-[15px] font-bold text-blue-50">
            <li>
              <RouterLink to="/#nosotros" class="hover:text-white/80 transition-colors">Nosotros</RouterLink>
            </li>
            <li>
              <RouterLink :to="{ name: 'doctors' }" class="hover:text-white/80 transition-colors">Médicos</RouterLink>
            </li>
            <li>
              <RouterLink to="/#servicios" class="hover:text-white/80 transition-colors">Servicios</RouterLink>
            </li>
            <li>
              <RouterLink to="/#sedes" class="hover:text-white/80 transition-colors">Sucursales</RouterLink>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-white font-black text-lg mb-6">Contacto</h3>
          <ul class="space-y-4 text-[15px] font-bold text-blue-50">
            <li class="flex items-start gap-3">
              <PhMapPin class="h-5 w-5 text-white/80 shrink-0 mt-0.5" weight="fill" />
              <span>Av. Javier Prado Este 1234<br>San Isidro, Lima</span>
            </li>
            <li class="flex items-center gap-3">
              <PhPhone class="h-5 w-5 text-white/80 shrink-0" weight="fill" />
              <a href="tel:016103333" class="hover:text-white/80 transition-colors">(01) 610-3333</a>
            </li>
            <li class="flex items-center gap-3">
              <PhEnvelopeSimple class="h-5 w-5 text-white/80 shrink-0" weight="fill" />
              <a href="mailto:citas@docmeet.com" class="hover:text-white/80 transition-colors">citas@docmeet.com</a>
            </li>
          </ul>
        </div>

        <!-- Social Media & App -->
        <div>
          <h3 class="text-white font-black text-lg mb-6">Síguenos</h3>
          <div class="flex items-center gap-3 mb-8">
            <a href="#" class="h-10 w-10 rounded-full bg-[#4E97CB] flex items-center justify-center text-white hover:bg-white hover:text-[#1c4d72] transition-all">
              <PhFacebookLogo class="h-5 w-5" weight="fill" />
            </a>
            <a href="#" class="h-10 w-10 rounded-full bg-[#4E97CB] flex items-center justify-center text-white hover:bg-white hover:text-[#1c4d72] transition-all">
              <PhInstagramLogo class="h-5 w-5" weight="bold" />
            </a>
            <a href="#" class="h-10 w-10 rounded-full bg-[#4E97CB] flex items-center justify-center text-white hover:bg-white hover:text-[#1c4d72] transition-all">
              <PhTwitterLogo class="h-5 w-5" weight="fill" />
            </a>
            <a href="#" class="h-10 w-10 rounded-full bg-[#4E97CB] flex items-center justify-center text-white hover:bg-white hover:text-[#1c4d72] transition-all">
              <PhLinkedinLogo class="h-5 w-5" weight="fill" />
            </a>
          </div>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 border-t border-[#256694] flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-bold text-blue-50/70">
        <p>&copy; {{ new Date().getFullYear() }} DocMeet. Todos los derechos reservados.</p>
        <div class="flex items-center gap-6">
          <a href="#" class="hover:text-white transition-colors">Términos y Condiciones</a>
          <a href="#" class="hover:text-white transition-colors">Políticas de Privacidad</a>
        </div>
      </div>
    </div>
  </footer>
</template>
