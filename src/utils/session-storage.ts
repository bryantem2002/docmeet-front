import type { IUser } from '@/types'

const USER_KEY = 'docmeet_user'

export function getStoredUser(): IUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY)
    if (!raw) return null
    return JSON.parse(raw) as IUser
  } catch {
    return null
  }
}

export function setStoredUser(user: IUser): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearStoredUser(): void {
  localStorage.removeItem(USER_KEY)
}
