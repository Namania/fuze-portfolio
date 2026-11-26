<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterView, useRoute } from 'vue-router'
import IntroLoader from '@/components/intro/IntroLoader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import { useAppReady } from '@/composables/useAppReady'
import { useLocaleGlitch } from '@/composables/useLocaleGlitch'
import { profile } from '@/data/profile'

const { t, locale } = useI18n()
const route = useRoute()
const { markAppReady } = useAppReady()

useLocaleGlitch('#app')

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const isIntroVisible = ref(!prefersReducedMotion)

if (!isIntroVisible.value) markAppReady()

function onIntroDone() {
  isIntroVisible.value = false
  markAppReady()
}

watchEffect(() => {
  const { titleKey } = route.meta
  document.title = titleKey ? `${t(titleKey)} · ${profile.name}` : profile.name
  document.documentElement.lang = locale.value
})
</script>

<template>
  <IntroLoader v-if="isIntroVisible" @done="onIntroDone" />
  <AppHeader />
  <main class="main">
    <RouterView />
  </main>
  <AppFooter />
</template>

<style scoped>
.main {
  flex: 1;
  overflow-x: clip;
}
</style>
