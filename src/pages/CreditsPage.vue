<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import logo from '@/assets/credits/logo.webp'
import { credits } from '@/data/credits'

const { t } = useI18n()
</script>

<template>
  <div class="section container credits">
    <div v-reveal:scale class="credits-mark">
      <img
        :src="logo"
        :alt="t('credits.logoAlt', { name: credits.name })"
        class="credits-logo"
        width="256"
        height="256"
      />
    </div>
    <p v-reveal="1" class="credits-eyebrow">{{ t('credits.eyebrow') }}</p>
    <h1 v-reveal="2" class="credits-name">{{ credits.name }}</h1>
    <p v-reveal="3" class="credits-tagline">« {{ t('credits.tagline') }} »</p>

    <dl class="credits-facts">
      <div
        v-for="(fact, index) in credits.facts"
        :key="fact"
        v-reveal="index + 3"
        class="credits-fact"
      >
        <dt class="credits-fact-label">{{ t(`credits.facts.${fact}.label`) }}</dt>
        <dd class="credits-fact-value">{{ t(`credits.facts.${fact}.value`) }}</dd>
      </div>
    </dl>

    <a
      v-reveal="6"
      :href="credits.portfolioUrl"
      class="button button-primary credits-action"
      target="_blank"
      rel="noopener"
    >
      {{ t('credits.action') }}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="M7 17 17 7M9 7h8v8" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </a>
    <RouterLink v-reveal="7" :to="{ name: 'home' }" class="link">{{
      t('credits.back')
    }}</RouterLink>
  </div>
</template>

<style scoped>
.credits {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding-block: 4rem;
  text-align: center;
}

.credits-logo {
  width: clamp(8rem, 30vw, 11rem);
  height: auto;
}

.credits-eyebrow {
  margin-top: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent-text);
}

.credits-name {
  font-size: clamp(2.75rem, 10vw, 4.5rem);
  line-height: 1;
}

.credits-tagline {
  max-width: 34rem;
  font-size: 1.125rem;
  color: var(--color-muted);
}

.credits-facts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(14rem, 100%), 1fr));
  gap: 0.75rem;
  width: 100%;
  max-width: 54rem;
  margin: 1.5rem 0;
}

.credits-fact {
  padding: 1.25rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-surface);
  text-align: left;
}

.credits-fact-label {
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-accent-text);
}

.credits-fact-value {
  margin: 0.375rem 0 0;
  font-weight: 500;
}

.credits-action {
  gap: 0.5rem;
  min-height: 3.25rem;
  padding-inline: 2rem;
  font-size: 1.0625rem;
}

.credits-action svg {
  width: 1.125rem;
  height: 1.125rem;
  transition: transform 0.2s;
}

.credits-action:hover svg {
  transform: translate(2px, -2px);
}

@media (prefers-reduced-motion: no-preference) {
  .credits-logo {
    animation: float 6s ease-in-out infinite;
  }
}
</style>
