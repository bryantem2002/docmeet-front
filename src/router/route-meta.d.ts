import 'vue-router'
import type { UserRole } from '@/types'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    requiresAdmin?: boolean
    requiresDoctor?: boolean
    requiresSecretary?: boolean
    allowedRoles?: UserRole[]
  }
}

export {}
