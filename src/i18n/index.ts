import { createI18n } from 'vue-i18n'
import en from './locales/en'
import fr from './locales/fr'

export const LOCALES = ['fr', 'en'] as const

export type Locale = (typeof LOCALES)[number]

const STORAGE_KEY = 'locale'
const DEFAULT_LOCALE: Locale = 'en'

function isLocale(value: unknown): value is Locale {
  return LOCALES.some((locale) => locale === value)
}

function readStoredLocale() {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return isLocale(value) ? value : null
  } catch {
    return null
  }
}

function detectLocale(): Locale {
  const browserLocale = navigator.language.split('-')[0]
  return readStoredLocale() ?? (isLocale(browserLocale) ? browserLocale : DEFAULT_LOCALE)
}

export const i18n = createI18n({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: DEFAULT_LOCALE,
  messages: { en, fr },
})

export function setLocale(locale: Locale) {
  i18n.global.locale.value = locale

  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    return
  }
}
