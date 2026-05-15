import axios, { type AxiosError } from 'axios'
import { apiBaseUrl } from '@/config/env'
import { clearToken, getToken } from '@/utils/token-storage'
import { router } from '@/router'

export const api = axios.create({
  baseURL: apiBaseUrl,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30_000,
})

api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status

    if (status === 401) {
      clearToken()
      if (router.currentRoute.value.path !== '/') {
        void router.push({
          path: '/',
          query: { redirect: router.currentRoute.value.fullPath },
        })
      }
    }

    if (!error.response) {
      console.error('[api] red o timeout', error.code, error.message)
    } else if (status && status >= 500) {
      console.error('[api] error servidor', status)
    }

    return Promise.reject(error)
  },
)
