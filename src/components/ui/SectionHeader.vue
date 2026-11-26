<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <header v-reveal class="section-header">
    <h2 class="section-title">{{ title }}</h2>
    <slot />
  </header>
</template>

<style scoped>
.section-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem 1.5rem;
  margin-bottom: 1.5rem;
}
</style>
