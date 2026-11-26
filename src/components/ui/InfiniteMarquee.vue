<script setup lang="ts">
withDefaults(defineProps<{ duration?: number; reverse?: boolean }>(), {
  duration: 40,
  reverse: false,
})
</script>

<template>
  <div class="marquee" :style="{ '--duration': `${duration}s` }">
    <div class="marquee-track" :class="{ 'marquee-reverse': reverse }">
      <div
        v-for="copy in 2"
        :key="copy"
        class="marquee-group"
        :aria-hidden="copy === 2 || undefined"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, #000 10%, #000 90%, transparent);
}

.marquee-track {
  display: flex;
  width: max-content;
}

.marquee-group {
  display: flex;
  align-items: center;
  gap: 3rem;
  padding-right: 3rem;
}

@media (prefers-reduced-motion: no-preference) {
  .marquee-track {
    animation: marquee var(--duration) linear infinite;
  }

  .marquee-reverse {
    animation-direction: reverse;
  }

  .marquee:hover .marquee-track {
    animation-play-state: paused;
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    width: auto;
    justify-content: center;
  }

  .marquee-group {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem 2rem;
    padding-inline: var(--gutter);
  }

  .marquee-group + .marquee-group {
    display: none;
  }
}

@keyframes marquee {
  to {
    transform: translateX(-50%);
  }
}
</style>
