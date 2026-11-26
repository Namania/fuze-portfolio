<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useClipboard } from '@/composables/useClipboard'
import { contactTopics } from '@/data/contact'
import { profile } from '@/data/profile'

const { t } = useI18n()
const { isCopied, copy } = useClipboard()
</script>

<template>
  <section id="contact" class="section container">
    <div v-reveal:scale class="contact rays-panel">
      <ul class="contact-topics">
        <li v-for="topic in contactTopics" :key="topic" class="contact-topic">
          {{ t(`contact.topics.${topic}`) }}
        </li>
      </ul>
      <h2 class="contact-title">{{ t('contact.title') }}</h2>
      <p class="contact-description">{{ t('contact.description') }}</p>
      <div class="contact-actions">
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
    </div>
  </section>
</template>

<style scoped>
.contact {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: clamp(2.5rem, 8vw, 5rem) clamp(1.25rem, 5vw, 3rem);
  border-radius: 1.5rem;
  text-align: center;
}

.contact-topics {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}

.contact-topic {
  padding: 0.25rem 0.875rem;
  border-radius: 999px;
  background: rgb(0 0 0 / 0.25);
  font-size: 0.875rem;
  font-weight: 600;
}

.contact-title {
  font-size: clamp(2.25rem, 8vw, 4.5rem);
  line-height: 1;
}

.contact-description {
  font-size: 1.125rem;
  font-weight: 500;
}

.contact-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1rem;
}
</style>
