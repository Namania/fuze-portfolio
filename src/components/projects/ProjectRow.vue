<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'
import ProjectCard from '@/components/projects/ProjectCard.vue'
import type { Project } from '@/types/content'

defineProps<{ projects: Project[]; label: string }>()

const { t } = useI18n()

const SCROLL_RATIO = 0.8
const EDGE_TOLERANCE = 4

const track = useTemplateRef<HTMLElement>('track')
const canScrollBack = ref(false)
const canScrollForward = ref(false)

function updateControls() {
  const element = track.value
  if (!element) return

  canScrollBack.value = element.scrollLeft > EDGE_TOLERANCE
  canScrollForward.value =
    element.scrollLeft + element.clientWidth < element.scrollWidth - EDGE_TOLERANCE
}

function scroll(direction: -1 | 1) {
  const element = track.value
  if (!element) return

  element.scrollBy({ left: direction * element.clientWidth * SCROLL_RATIO, behavior: 'smooth' })
}

const resizeObserver = new ResizeObserver(updateControls)

onMounted(() => {
  if (track.value) resizeObserver.observe(track.value)
})

onBeforeUnmount(() => resizeObserver.disconnect())
</script>

<template>
  <div class="row">
    <div
      ref="track"
      class="row-track"
      role="group"
      tabindex="0"
      :aria-label="label"
      @scroll.passive="updateControls"
    >
      <ProjectCard
        v-for="(project, index) in projects"
        :key="project.id"
        v-reveal="index"
        class="row-item"
        :project="project"
      />
      <div v-if="$slots.default" v-reveal="projects.length" class="row-item row-extra">
        <slot />
      </div>
    </div>
    <button
      v-show="canScrollBack"
      type="button"
      class="row-control row-control-back"
      :aria-label="t('projects.row.previous')"
      @click="scroll(-1)"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="m15 5-7 7 7 7" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    <button
      v-show="canScrollForward"
      type="button"
      class="row-control row-control-forward"
      :aria-label="t('projects.row.next')"
      @click="scroll(1)"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="m9 5 7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.row {
  position: relative;
}

.row-track {
  display: flex;
  gap: 1rem;
  margin: -0.75rem calc(var(--gutter) * -1) -2.25rem;
  padding: 0.75rem var(--gutter) 2.25rem;
  overflow-x: auto;
  scroll-padding-inline: var(--gutter);
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.row-track::-webkit-scrollbar {
  display: none;
}

.row-item {
  flex: 1 0 min(15rem, 78%);
  scroll-snap-align: start;
}

.row-extra {
  display: grid;
}

.row-control {
  position: absolute;
  top: 50%;
  display: none;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: var(--color-surface);
  color: var(--color-text);
  box-shadow: 0 0.25rem 1rem rgb(0 0 0 / 0.2);
  cursor: pointer;
  transform: translateY(-50%);
  transition: border-color 0.15s;
}

.row-control:hover {
  border-color: var(--color-accent);
}

.row-control svg {
  width: 1.25rem;
  height: 1.25rem;
}

.row-control-back {
  left: -0.75rem;
}

.row-control-forward {
  right: -0.75rem;
}

@media (hover: hover) and (min-width: 48rem) {
  .row-control {
    display: grid;
  }
}
</style>
