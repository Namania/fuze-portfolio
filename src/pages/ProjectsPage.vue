<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ProjectGrid from '@/components/projects/ProjectGrid.vue'
import ProjectsCta from '@/components/projects/ProjectsCta.vue'
import { projectCategories, projects } from '@/data/projects'
import type { ProjectCategory } from '@/types/content'

type Filter = ProjectCategory | 'all'

const { t } = useI18n()

const activeFilter = ref<Filter>('all')

const filters = computed<{ value: Filter; label: string; count: number }[]>(() => [
  { value: 'all', label: t('projects.all'), count: projects.length },
  ...projectCategories.map((category) => ({
    value: category,
    label: t(`projects.categories.${category}`),
    count: projects.filter((project) => project.category === category).length,
  })),
])

const visibleProjects = computed(() =>
  activeFilter.value === 'all'
    ? projects
    : projects.filter((project) => project.category === activeFilter.value),
)
</script>

<template>
  <div class="section container">
    <h1 v-reveal class="page-title">{{ t('projects.title') }}</h1>
    <p v-reveal="1" class="page-intro">{{ t('projects.intro') }}</p>

    <div v-reveal="2" class="filters" role="group" :aria-label="t('projects.filterLabel')">
      <button
        v-for="filter in filters"
        :key="filter.value"
        type="button"
        class="filter"
        :class="{ 'filter-active': filter.value === activeFilter }"
        :aria-pressed="filter.value === activeFilter"
        @click="activeFilter = filter.value"
      >
        {{ filter.label }} · {{ filter.count }}
      </button>
    </div>

    <ProjectGrid :projects="visibleProjects" />

    <ProjectsCta />
  </div>
</template>

<style scoped>
.page-title {
  font-size: clamp(2.25rem, 7vw, 3.25rem);
  line-height: 1.1;
}

.page-intro {
  max-width: 38rem;
  margin-top: 0.75rem;
  font-size: 1.0625rem;
  color: var(--color-muted);
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-block: 2.5rem 1.5rem;
}

.filter {
  min-height: 2.75rem;
  padding: 0.5rem 1.125rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: none;
  color: var(--color-text);
  font: inherit;
  cursor: pointer;
  transition: border-color 0.15s;
}

.filter:hover {
  border-color: var(--color-muted);
}

.filter-active {
  border-color: var(--color-accent);
  background: var(--color-accent);
  color: var(--color-on-accent);
  font-weight: 600;
}
</style>
