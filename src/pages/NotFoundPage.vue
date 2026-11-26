<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

const { t } = useI18n()
</script>

<template>
  <div v-reveal class="section container not-found">
    <h1>{{ t('notFound.title') }}</h1>
    <RouterLink :to="{ name: 'home' }" class="back">{{ t('notFound.back') }}</RouterLink>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-block: 6rem;
  text-align: center;
}

.back {
  font-weight: 600;
  color: var(--color-accent-text);
}
</style>
