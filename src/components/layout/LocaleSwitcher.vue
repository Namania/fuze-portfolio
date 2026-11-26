<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'
import enFlag from '@/assets/flags/en.svg'
import frFlag from '@/assets/flags/fr.svg'
import { LOCALES, setLocale, type Locale } from '@/i18n'

const flags: Record<Locale, string> = { en: enFlag, fr: frFlag }

const { t, locale } = useI18n()

const root = useTemplateRef<HTMLElement>('root')
const trigger = useTemplateRef<HTMLButtonElement>('trigger')
const isOpen = ref(false)
const currentLocale = computed(() => locale.value as Locale)

function select(code: Locale) {
  setLocale(code)
  close()
}

function close() {
  if (!isOpen.value) return

  isOpen.value = false
  trigger.value?.focus()
}

function onPointerDown(event: PointerEvent) {
  if (!root.value?.contains(event.target as Node)) isOpen.value = false
}

onMounted(() => document.addEventListener('pointerdown', onPointerDown))
onBeforeUnmount(() => document.removeEventListener('pointerdown', onPointerDown))
</script>

<template>
  <div ref="root" class="locale" @keydown.esc="close">
    <button
      ref="trigger"
      type="button"
      class="locale-trigger"
      aria-haspopup="menu"
      :aria-expanded="isOpen"
      :aria-label="t('locale.label')"
      @click="isOpen = !isOpen"
    >
      <img :src="flags[currentLocale]" alt="" class="locale-flag" width="20" height="15" />
      <span class="locale-code">{{ currentLocale }}</span>
      <svg
        class="locale-chevron"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    <Transition name="menu">
      <ul v-show="isOpen" class="locale-menu" role="menu">
        <li v-for="code in LOCALES" :key="code" role="none">
          <button
            type="button"
            class="locale-option"
            role="menuitemradio"
            :aria-checked="code === currentLocale"
            @click="select(code)"
          >
            <img :src="flags[code]" alt="" class="locale-flag" width="20" height="15" />
            {{ t(`locale.names.${code}`) }}
          </button>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
.locale {
  position: relative;
}

.locale-trigger {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 2.75rem;
  padding: 0 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: none;
  color: var(--color-muted);
  font: inherit;
  font-size: 0.8125rem;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    color 0.15s,
    border-color 0.15s;
}

.locale-trigger:hover,
.locale-trigger[aria-expanded='true'] {
  border-color: var(--color-muted);
  color: var(--color-text);
}

.locale-flag {
  width: 1.25rem;
  height: 0.9375rem;
  border-radius: 0.1875rem;
  object-fit: cover;
}

.locale-chevron {
  width: 0.875rem;
  height: 0.875rem;
  transition: rotate 0.2s;
}

.locale-trigger[aria-expanded='true'] .locale-chevron {
  rotate: 180deg;
}

.locale-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  min-width: 10.5rem;
  padding: 0.375rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-surface);
  box-shadow: 0 1rem 2rem rgb(0 0 0 / 0.2);
}

.locale-option {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
  min-height: 2.75rem;
  padding: 0 0.75rem;
  border: 0;
  border-radius: 0.5rem;
  background: none;
  color: var(--color-text);
  font: inherit;
  font-size: 0.9375rem;
  text-align: left;
  cursor: pointer;
}

.locale-option:hover {
  background: var(--color-bg);
}

.locale-option[aria-checked='true'] {
  font-weight: 700;
  color: var(--color-accent-text);
}

.menu-enter-active,
.menu-leave-active {
  transition:
    opacity 0.15s,
    transform 0.15s;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-0.375rem);
}

@media (max-width: 30rem) {
  .locale-trigger {
    padding: 0 0.625rem;
  }

  .locale-code,
  .locale-chevron {
    display: none;
  }
}
</style>
