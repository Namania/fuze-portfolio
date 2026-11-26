<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { profile } from '@/data/profile'

const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <p class="footer-legal">
        <span>© {{ year }} {{ profile.name }}</span>
        <RouterLink :to="{ name: 'credits' }">{{ t('footer.credits') }}</RouterLink>
      </p>
      <nav class="footer-links" :aria-label="t('footer.links')">
        <a :href="`mailto:${profile.contactEmail}`">{{ t('footer.contact') }}</a>
        <a :href="profile.creditReportUrl" target="_blank" rel="noopener">
          {{ t('footer.credit') }}
        </a>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--color-border);
  color: var(--color-muted);
  font-size: 0.875rem;
}

.footer-inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  padding-block: 1.5rem;
}

.footer-legal,
.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
}

.footer a:hover {
  color: var(--color-text);
}
</style>
