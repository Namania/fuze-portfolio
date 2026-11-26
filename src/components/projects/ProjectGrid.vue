<script setup lang="ts">
import ProjectCard from '@/components/projects/ProjectCard.vue'
import type { Project } from '@/types/content'

defineProps<{ projects: Project[] }>()
</script>

<template>
  <div class="grid">
    <ProjectCard
      v-for="(project, index) in projects"
      :key="project.id"
      v-reveal="index"
      :project="project"
    />
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(18rem, 100%), 1fr));
  gap: 1rem;
}
</style>
