<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import portrait from '@/assets/profile/portrait.webp'
import { profile } from '@/data/profile'

const THEME_INTERVAL_MS = 2200

const { t } = useI18n()

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const activeTheme = ref(prefersReducedMotion ? -1 : 0)

let timer: number | undefined

onMounted(() => {
  if (prefersReducedMotion) return

  timer = window.setInterval(() => {
    activeTheme.value = (activeTheme.value + 1) % profile.themes.length
  }, THEME_INTERVAL_MS)
})

onBeforeUnmount(() => window.clearInterval(timer))
</script>

<template>
  <section class="hero container">
    <div class="hero-content">
      <h1 v-reveal class="hero-title">{{ profile.name }}</h1>
      <p v-reveal="1" class="hero-role">{{ t('hero.role') }}</p>
      <p v-reveal="2" class="hero-themes">
        <span
          v-for="(theme, index) in profile.themes"
          :key="theme"
          class="hero-theme"
          :class="{ 'hero-theme-active': index === activeTheme }"
        >
          {{ t(`hero.themes.${theme}`) }}
        </span>
      </p>
      <div v-reveal="3" class="hero-actions">
        <RouterLink :to="{ name: 'projects' }" class="button button-primary">
          {{ t('hero.projects') }}
        </RouterLink>
        <RouterLink :to="{ name: 'home', hash: '#contact' }" class="button">
          {{ t('hero.contact') }}
        </RouterLink>
      </div>
    </div>
    <div v-reveal:scale="2" class="hero-visual">
      <img
        :src="portrait"
        :alt="t('hero.portraitAlt', { name: profile.name })"
        class="hero-portrait"
        width="960"
        height="960"
      />
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  padding-block: 5rem 4rem;
}

.hero-content {
  display: flex;
  flex: 1 1 26rem;
  flex-direction: column;
  gap: 0.75rem;
}

.hero-title {
  font-size: clamp(3rem, 11vw, 5.5rem);
  line-height: 1;
}

.hero-role {
  font-size: 1.375rem;
  font-weight: 600;
}

.hero-themes {
  display: flex;
  flex-wrap: wrap;
  font-size: 1.125rem;
  color: var(--color-muted);
}

.hero-theme {
  transition: color 0.5s;
}

.hero-theme + .hero-theme::before {
  margin-inline: 0.5rem;
  color: var(--color-muted);
  content: '·';
}

.hero-theme-active {
  color: var(--color-accent-text);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}

.hero-visual {
  position: relative;
  flex: 0 1 23rem;
  min-width: 0;
  isolation: isolate;
}

.hero-visual::before {
  position: absolute;
  inset: -12%;
  z-index: -1;
  border-radius: 50%;
  background: var(--gradient-rays);
  filter: blur(2.5rem);
  opacity: 0.45;
  content: '';
}

.hero-portrait {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 1.25rem;
  aspect-ratio: 1;
  object-fit: cover;
  box-shadow: 0 1.5rem 3rem rgb(0 0 0 / 0.25);
}

@media (prefers-reduced-motion: no-preference) {
  .hero-visual::before {
    animation: spin 30s linear infinite;
  }

  .hero-portrait {
    animation: float 6s ease-in-out infinite;
  }
}

@media (max-width: 48rem) {
  .hero {
    padding-block: 2rem;
  }

  .hero-visual {
    flex-basis: 100%;
    order: -1;
  }

  .hero-portrait {
    aspect-ratio: 4 / 3;
    object-position: center 30%;
  }
}
</style>
