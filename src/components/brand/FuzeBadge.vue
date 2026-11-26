<script setup lang="ts">
import FuzeLogo from '@/components/brand/FuzeLogo.vue'
</script>

<template>
  <span class="badge">
    <FuzeLogo class="badge-logo" />
  </span>
</template>

<style scoped>
.badge {
  display: grid;
  place-items: center;
  aspect-ratio: 1;
  border-radius: 22%;
  background: var(--gradient-rays);
}

.badge-logo {
  width: 66%;
  color: #fff;
}
</style>
