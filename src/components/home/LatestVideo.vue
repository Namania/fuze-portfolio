<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import latestVideo from '@/data/latest-video.json'
import type { Video } from '@/types/content'

const { t, locale } = useI18n()

const video: Video = latestVideo
const url = `https://www.youtube.com/watch?v=${video.id}`
const thumbnailUrl = `https://i.ytimg.com/vi/${video.id}/hq720.jpg`

const publishedOn = computed(() =>
  new Intl.DateTimeFormat(locale.value, { dateStyle: 'long' }).format(new Date(video.publishedAt)),
)
</script>

<template>
  <a :href="url" class="video" target="_blank" rel="noopener">
    <img
      :src="thumbnailUrl"
      alt=""
      class="video-thumbnail"
      loading="lazy"
      width="1280"
      height="720"
    />
    <span class="video-play">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M8 5.5v13l11-6.5z" />
      </svg>
    </span>
    <div class="video-content">
      <p class="video-label">{{ t('follow.latestVideo', { date: publishedOn }) }}</p>
      <h3 class="video-title">{{ video.title }}</h3>
    </div>
  </a>
</template>

<style scoped>
.video {
  position: relative;
  display: block;
  overflow: hidden;
  border-radius: var(--radius);
  aspect-ratio: 16 / 9;
  color: #fff;
  transition: transform 0.2s;
}

.video:hover {
  transform: translateY(-3px);
}

.video-thumbnail {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s;
}

.video:hover .video-thumbnail {
  transform: scale(1.04);
}

.video-play {
  position: absolute;
  top: 50%;
  left: 50%;
  display: grid;
  place-items: center;
  width: clamp(3.25rem, 9vw, 4.5rem);
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0.5rem 1.5rem rgb(0 0 0 / 0.4);
  translate: -50% -50%;
  transition: scale 0.2s;
}

.video:hover .video-play {
  scale: 1.1;
}

.video-play svg {
  width: 45%;
}

.video-content {
  position: absolute;
  inset: auto 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 3rem 1.25rem 1.125rem;
  background: linear-gradient(to top, rgb(0 0 0 / 0.85), transparent);
}

.video-label {
  font-size: 0.8125rem;
  font-weight: 600;
  opacity: 0.85;
}

.video-title {
  font-size: clamp(1rem, 2.4vw, 1.375rem);
  line-height: 1.25;
}

@media (max-width: 30rem) {
  .video-play {
    top: 36%;
  }

  .video-content {
    padding: 2rem 1rem 0.875rem;
  }
}
</style>
