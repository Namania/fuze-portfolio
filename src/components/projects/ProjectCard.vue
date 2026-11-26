<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Project } from '@/types/content'
import { findProjectAsset } from '@/utils/projectAssets'

const props = defineProps<{ project: Project }>()

const { t } = useI18n()

const cover = computed(() => findProjectAsset(props.project.id, 'cover'))
const logo = computed(() => findProjectAsset(props.project.id, 'logo'))
</script>

<template>
  <article v-tilt class="project">
    <div class="project-cover">
      <img v-if="cover" :src="cover" alt="" loading="lazy" width="960" height="540" />
      <span v-if="project.inactive" class="project-status">
        {{ t('projects.card.inactive') }}
      </span>
    </div>
    <div class="project-body">
      <img
        v-if="logo"
        :src="logo"
        :alt="t('projects.card.logoAlt', { name: project.name })"
        class="project-logo"
        loading="lazy"
        width="56"
        height="56"
      />
      <p class="project-meta">
        <span>{{ t(`projects.categories.${project.category}`) }}</span>
        <span v-if="project.since">
          {{ t('projects.card.since', { year: project.since }) }}
        </span>
        <span v-else-if="project.year">{{ project.year }}</span>
      </p>
      <h3 class="project-name">{{ project.name }}</h3>
      <p class="project-description">{{ t(`projects.descriptions.${project.id}`) }}</p>
      <a
        v-if="project.url"
        :href="project.url"
        class="link project-link"
        target="_blank"
        rel="noopener"
      >
        {{ t('projects.card.view') }}
      </a>
    </div>
  </article>
</template>

<style scoped>
.project {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-surface);
  transform: perspective(50rem) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))
    translateY(var(--lift, 0));
  transition:
    transform 0.2s,
    border-color 0.2s,
    box-shadow 0.2s;
}

.project:hover {
  --lift: -4px;

  border-color: var(--color-accent);
  box-shadow: 0 0.75rem 1.5rem -0.5rem rgb(0 0 0 / 0.3);
}

.project-cover {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  background: var(--gradient-rays);
}

.project-cover img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s;
}

.project:hover .project-cover img {
  transform: scale(1.04);
}

.project-status {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  padding: 0.25rem 0.625rem;
  border-radius: 999px;
  background: rgb(0 0 0 / 0.7);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
}

.project-body {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.5rem;
}

.project-logo {
  position: absolute;
  top: -1.75rem;
  right: 1.25rem;
  width: 3.5rem;
  height: 3.5rem;
  border: 3px solid var(--color-surface);
  border-radius: 0.875rem;
  background: #fff;
  object-fit: cover;
}

.project-meta {
  display: flex;
  gap: 0.75rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-muted);
}

.project-meta span + span::before {
  margin-right: 0.75rem;
  content: '·';
}

.project-name {
  font-size: 1.25rem;
}

.project-description {
  flex: 1;
  color: var(--color-muted);
}

.project-link {
  align-self: flex-start;
  margin-top: 0.5rem;
}
</style>
