/**
 * Base URL del API Gateway. Configurar en `.env` como VITE_API_BASE_URL
 * para no depender de valores embebidos en código.
 */
const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim().replace(/\/+$/, '')

if (!configuredApiBaseUrl) {
  throw new Error('Falta configurar VITE_API_BASE_URL.')
}

if (import.meta.env.PROD && /localhost|127\.0\.0\.1/i.test(configuredApiBaseUrl)) {
  throw new Error('VITE_API_BASE_URL no puede apuntar a localhost en producción.')
}

export const apiBaseUrl: string = configuredApiBaseUrl
