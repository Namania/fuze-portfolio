<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

defineProps<{ count: number }>()

const { t } = useI18n()
</script>

<template>
  <RouterLink :to="{ name: 'projects' }" class="more rays-panel">
    <span class="more-count">+{{ count }}</span>
    <span class="more-label">{{ t('projects.more.label') }}</span>
    <span class="more-action">
      {{ t('projects.more.action') }}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="M5 12h14m-6-6 6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </span>
  </RouterLink>
</template>

<style scoped>
.more {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
  padding: 1.5rem;
  border-radius: var(--radius);
  transition: transform 0.2s;

  --rays-size: 250%;
  --rays-duration: 40s;
}

.more:hover {
  transform: translateY(-3px);
}

.more-count {
  font-size: clamp(3rem, 6vw, 4.5rem);
  font-weight: 800;
  line-height: 1;
}

.more-label {
  font-size: 1.125rem;
  font-weight: 600;
}

.more-action {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  gap: 0.5rem;
  margin-top: 1.25rem;
  padding: 0.625rem 1.25rem;
  border-radius: 999px;
  background: #fff;
  color: #a90c08;
  font-weight: 700;
}

.more-action svg {
  width: 1.125rem;
  height: 1.125rem;
  transition: transform 0.2s;
}

.more:hover .more-action svg {
  transform: translateX(3px);
}
</style>
