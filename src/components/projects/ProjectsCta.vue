<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import FuzeLogo from '@/components/brand/FuzeLogo.vue'
import { useClipboard } from '@/composables/useClipboard'
import { profile } from '@/data/profile'

const { t } = useI18n()
const { isCopied, copy } = useClipboard()
</script>

<template>
  <aside v-reveal:scale class="cta rays-panel">
    <FuzeLogo class="cta-mark" />
    <div class="cta-content">
      <p class="cta-eyebrow">{{ t('projects.cta.eyebrow') }}</p>
      <h2 class="cta-title">{{ t('projects.cta.title') }}</h2>
      <p class="cta-description">{{ t('projects.cta.description') }}</p>
    </div>
    <div class="cta-actions">
      <a :href="`mailto:${profile.contactEmail}`" class="button button-inverse">
        {{ profile.contactEmail }}
      </a>
      <button
        type="button"
        class="button button-ghost"
        aria-live="polite"
        @click="copy(profile.contactEmail)"
      >
        {{ t(isCopied ? 'contact.copied' : 'contact.copy') }}
      </button>
    </div>
  </aside>
</template>

<style scoped>
.cta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem 2rem;
  margin-top: 3.5rem;
  padding: clamp(1.75rem, 5vw, 3rem);
  border-radius: 1.5rem;
}

.cta-mark {
  position: absolute;
  right: -1.5rem;
  bottom: -35%;
  z-index: -1;
  width: 17rem;
  opacity: 0.14;
  rotate: -10deg;
}

.cta-content {
  flex: 1 1 20rem;
}

.cta-eyebrow {
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.85;
}

.cta-title {
  margin-top: 0.375rem;
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  line-height: 1.05;
}

.cta-description {
  margin-top: 0.5rem;
  font-size: 1.0625rem;
  font-weight: 500;
}

.cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
</style>
