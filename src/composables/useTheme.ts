import { computed, ref, watchEffect } from 'vue'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

function readStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

function writeStoredTheme(theme: Theme | null) {
  try {
    if (theme) localStorage.setItem(STORAGE_KEY, theme)
    else localStorage.removeItem(STORAGE_KEY)
  } catch {
    return
  }
}

const systemQuery = window.matchMedia('(prefers-color-scheme: dark)')
const systemTheme = ref<Theme>(systemQuery.matches ? 'dark' : 'light')
const storedTheme = ref(readStoredTheme())
const theme = computed(() => storedTheme.value ?? systemTheme.value)

systemQuery.addEventListener('change', (event) => {
  systemTheme.value = event.matches ? 'dark' : 'light'
})

watchEffect(() => {
  document.documentElement.dataset.theme = theme.value
})

function toggleTheme() {
  const next: Theme = theme.value === 'dark' ? 'light' : 'dark'
  storedTheme.value = next === systemTheme.value ? null : next
  writeStoredTheme(storedTheme.value)
}

export function useTheme() {
  return { theme, toggleTheme }
}
