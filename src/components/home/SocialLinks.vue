<script setup lang="ts">
import {
  siDiscord,
  siInstagram,
  siTiktok,
  siTwitch,
  siX,
  siYoutube,
  type SimpleIcon,
} from 'simple-icons'
import { socials } from '@/data/socials'
import type { SocialId } from '@/types/content'

const icons: Record<SocialId, SimpleIcon> = {
  youtube: siYoutube,
  twitch: siTwitch,
  instagram: siInstagram,
  tiktok: siTiktok,
  x: siX,
  discord: siDiscord,
}
</script>

<template>
  <ul class="socials">
    <li v-for="(social, index) in socials" :key="social.id" v-reveal="index">
      <a :href="social.url" class="social" target="_blank" rel="noopener">
        <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path :d="icons[social.id].path" />
        </svg>
        <span class="social-label">{{ social.label }}</span>
        <span class="social-handle">{{ social.handle }}</span>
        <svg
          class="social-arrow"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path d="M7 17 17 7M9 7h8v8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </a>
    </li>
  </ul>
</template>

<style scoped>
.socials {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(15rem, 100%), 1fr));
  gap: 0.5rem;
}

.social {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  height: 100%;
  min-height: 3.25rem;
  padding: 0 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-surface);
  transition:
    border-color 0.2s,
    transform 0.2s;
}

.social:hover {
  border-color: var(--color-accent);
  transform: translateX(4px);
}

.social-icon {
  flex: none;
  width: 1.25rem;
  height: 1.25rem;
}

.social-label {
  font-weight: 700;
}

.social-handle {
  min-width: 0;
  margin-left: auto;
  overflow: hidden;
  font-size: 0.875rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--color-muted);
}

.social-arrow {
  flex: none;
  width: 1rem;
  height: 1rem;
  color: var(--color-muted);
  transition:
    color 0.2s,
    transform 0.2s;
}

.social:hover .social-arrow {
  color: var(--color-accent-text);
  transform: translate(2px, -2px);
}

@media (min-width: 60rem) {
  .socials {
    grid-template-columns: 1fr;
    grid-auto-rows: 1fr;
    height: 100%;
  }

  .social {
    min-height: 2.75rem;
  }
}
</style>
