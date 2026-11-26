<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import LatestVideo from '@/components/home/LatestVideo.vue'
import SocialLinks from '@/components/home/SocialLinks.vue'

const { t } = useI18n()
</script>

<template>
  <section class="section container">
    <header v-reveal class="follow-header">
      <h2 class="section-title">{{ t('follow.title') }}</h2>
      <p class="follow-tagline">« {{ t('follow.tagline') }} »</p>
    </header>
    <div class="follow">
      <LatestVideo v-reveal />
      <SocialLinks />
    </div>
  </section>
</template>

<style scoped>
.follow-header {
  margin-bottom: 1.5rem;
}

.follow-tagline {
  margin-top: 0.375rem;
  font-size: 1.125rem;
  color: var(--color-muted);
}

.follow {
  display: grid;
  gap: 1rem;
}

@media (min-width: 60rem) {
  .follow {
    grid-template-columns: 1.6fr 1fr;
  }
}
</style>
