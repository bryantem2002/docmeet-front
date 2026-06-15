import { ref } from 'vue'

const isDark = ref(false)

function applyDarkState(dark: boolean) {
  isDark.value = dark
  document.documentElement.classList.toggle('dark', dark)
}

function initDarkMode() {
  const stored = localStorage.getItem('docmeet-dark')
  if (stored === 'true') {
    applyDarkState(true)
  } else if (stored === 'false') {
    applyDarkState(false)
  } else {
    applyDarkState(window.matchMedia('(prefers-color-scheme: dark)').matches)
  }
}

function toggleDark() {
  applyDarkState(!isDark.value)
  localStorage.setItem('docmeet-dark', String(isDark.value))
}

initDarkMode()

export function useDarkMode() {
  return {
    isDark,
    toggleDark
  }
}
