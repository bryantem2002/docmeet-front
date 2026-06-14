import { createRouter, createWebHistory } from 'vue-router'
import { navigationController } from '@/controllers/navigation.controller'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, _from, _savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home-view.vue'),
      meta: { requiresAuth: false },
    },
    
    // --- RUTAS COMPARTIDAS / PACIENTES ---
    {
      path: '/agendar',
      name: 'book-appointment',
      component: () => import('@/views/calendario.vue'), 
      meta: { requiresAuth: true },
    },
    {
      path: '/citas',
      name: 'appointments',
      component: () => import('@/views/appointments-view.vue'), 
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
    {
      path: '/pagos',
      name: 'patient-payments',
      component: () => import('@/views/patient/PatientPayments.vue'), 
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
      component: () => import('@/views/admin/AdminDashboard.vue'), 
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/admin/pacientes',
      name: 'admin-patients',
      component: () => import('@/views/admin/AdminPatients.vue'), 
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/admin/doctores',
      name: 'admin-doctors',
      component: () => import('@/views/admin/AdminDoctors.vue'), 
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/admin/sedes',
      name: 'admin-locations',
      component: () => import('@/views/admin/AdminLocations.vue'), 
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/admin/solicitudes',
      name: 'admin-requests',
      component: () => import('@/views/admin/AdminRequests.vue'), 
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/admin/pagos',
      name: 'admin-payments',
      component: () => import('@/views/admin/AdminPayments.vue'), 
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/admin/secretarias',
      name: 'admin-secretaries',
      component: () => import('@/views/admin/AdminSecretaries.vue'), 
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/admin/especialidades',
      name: 'admin-specialties',
      component: () => import('@/views/admin/AdminSpecialties.vue'), 
      meta: { requiresAuth: true, requiresAdmin: true },
    },

    // --- RUTAS EXCLUSIVAS DEL MÉDICO ---
    {
      path: '/medico/dashboard',
      name: 'doctor-dashboard',
      component: () => import('@/views/doctor/DoctorDashboard.vue'), 
      meta: { requiresAuth: true, requiresDoctor: true }
    },
    {
      path: '/medico/agenda',
      name: 'doctor-agenda',
      component: () => import('@/views/doctor/DoctorAgenda.vue'), 
      meta: { requiresAuth: true, requiresDoctor: true }
    },
    {
      path: '/medico/horario',
      name: 'doctor-schedule',
      component: () => import('@/views/doctor/DoctorSchedule.vue'), 
      meta: { requiresAuth: true, requiresDoctor: true }
    },
    {
      path: '/medico/pacientes',
      name: 'doctor-patients',
      component: () => import('@/views/doctor/DoctorPatients.vue'), 
      meta: { requiresAuth: true, requiresDoctor: true }
    },
    {
      path: '/medico/diagnosticos',
      name: 'doctor-diagnoses',
      component: () => import('@/views/doctor/DoctorDiagnoses.vue'), 
      meta: { requiresAuth: true, requiresDoctor: true }
    },
    {
      path: '/medico/recetas',
      name: 'doctor-prescriptions',
      component: () => import('@/views/doctor/DoctorPrescriptions.vue'), 
      meta: { requiresAuth: true, requiresDoctor: true }
    },

    // --- RUTAS EXCLUSIVAS DE LA SECRETARIA ---
    {
      path: '/secretaria/dashboard',
      name: 'secretary-dashboard',
      component: () => import('@/views/secretary/SecretaryDashboard.vue'), 
      meta: { requiresAuth: true, requiresSecretary: true }
    },
    {
      path: '/secretaria/pacientes',
      name: 'secretary-patients',
      component: () => import('@/views/secretary/SecretaryPatients.vue'), 
      meta: { requiresAuth: true, requiresSecretary: true }
    },
    {
      path: '/secretaria/citas',
      name: 'secretary-appointments',
      component: () => import('@/views/secretary/SecretaryAppointments.vue'), 
      meta: { requiresAuth: true, requiresSecretary: true }
    },
    {
      path: '/secretaria/pagos',
      name: 'secretary-payments',
      component: () => import('@/views/secretary/SecretaryPayments.vue'), 
      meta: { requiresAuth: true, requiresSecretary: true }
    }
  ],
})

router.beforeEach((to) => navigationController.canActivate(to))

export { router }