<script setup lang="ts">
import InfiniteMarquee from '@/components/ui/InfiniteMarquee.vue'
import { projects } from '@/data/projects'
import { findProjectAsset } from '@/utils/projectAssets'

const brands = projects.flatMap((project) => {
  const logo = findProjectAsset(project.id, 'logo')
  return logo ? [{ id: project.id, name: project.name, logo }] : []
})
</script>

<template>
  <InfiniteMarquee v-reveal class="brands">
    <span v-for="brand in brands" :key="brand.id" class="brand">
      <img :src="brand.logo" alt="" class="brand-logo" width="32" height="32" />
      {{ brand.name }}
    </span>
  </InfiniteMarquee>
</template>

<style scoped>
.brands {
  padding-block: 1.25rem;
  border-block: 1px solid var(--color-border);
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
  color: var(--color-muted);
}

.brand-logo {
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  background: #fff;
  object-fit: cover;
}
</style>
