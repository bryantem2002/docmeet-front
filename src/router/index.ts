import { createRouter, createWebHistory } from 'vue-router'
import { navigationController } from '@/controllers/navigation.controller'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home-view.vue'),
      meta: { requiresAuth: false },
    },
    
    // --- RUTAS COMPARTIDAS / PACIENTES ---
    {
      path: '/citas',
      name: 'appointments',
      component: () => import('@/views/calendario.vue'), 
      meta: { requiresAuth: true },
    },
    {
      path: '/historial',
      name: 'medical-history',
      component: () => import('@/views/historial.vue'), 
      meta: { requiresAuth: true },
    },
    {
      path: '/recetas',
      name: 'prescriptions',
      component: () => import('@/views/receta-medica.vue'), 
      meta: { requiresAuth: true },
    },
    {
      path: '/configuracion',
      name: 'settings',
      component: () => import('@/views/ajustes.vue'), // ¡Única ruta de configuración, apuntando al archivo correcto!
      meta: { requiresAuth: true },
    },

    // --- RUTAS PÚBLICAS ---
    {
      path: '/doctor/:id',
      name: 'doctor-profile',
      component: () => import('@/views/DoctorProfile.vue'), 
      props: true,
      meta: { requiresAuth: false }
    },
    {
      path: '/directorio',
      name: 'doctors',
      component: () => import('@/views/doctors-view.vue'), 
      meta: { requiresAuth: false },
    },

    // --- RUTAS EXCLUSIVAS DEL ADMIN ---
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/appointments-view.vue'), 
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/admin/pagos',
      name: 'payments',
      component: () => import('@/views/appointments-view.vue'), 
      meta: { requiresAuth: true, requiresAdmin: true },
    },

    // --- RUTAS EXCLUSIVAS DEL MÉDICO ---
    {
      path: '/medico/dashboard',
      name: 'doctor-dashboard',
      component: () => import('@/views/appointments-view.vue'), 
      meta: { requiresAuth: true, requiresDoctor: true }
    },
    {
      path: '/medico/pacientes',
      name: 'doctor-patients',
      component: () => import('@/views/appointments-view.vue'), 
      meta: { requiresAuth: true, requiresDoctor: true }
    }
  ],
})

router.beforeEach((to) => navigationController.canActivate(to))

export { router }