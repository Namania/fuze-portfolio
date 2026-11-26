<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import MoreProjectsCard from '@/components/projects/MoreProjectsCard.vue'
import ProjectRow from '@/components/projects/ProjectRow.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { projects } from '@/data/projects'

const { t } = useI18n()

const featuredProjects = projects.filter((project) => project.featured)
const otherProjectsCount = projects.length - featuredProjects.length
</script>

<template>
  <section class="section container">
    <SectionHeader :title="t('home.projects')">
      <RouterLink :to="{ name: 'projects' }" class="link">{{ t('home.allProjects') }}</RouterLink>
    </SectionHeader>
    <ProjectRow :projects="featuredProjects" :label="t('home.projects')">
      <MoreProjectsCard :count="otherProjectsCount" />
    </ProjectRow>
  </section>
</template>
