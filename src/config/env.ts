/**
 * Base URL del API Gateway. Configurar en `.env` como VITE_API_BASE_URL
 * para no depender de valores embebidos en código.
 */
export const apiBaseUrl: string =
  import.meta.env.VITE_API_BASE_URL || 'https://api.docmeet.com'
