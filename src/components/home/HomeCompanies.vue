<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ProjectRow from '@/components/projects/ProjectRow.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { projects } from '@/data/projects'

const { t } = useI18n()

const companies = projects.filter((project) => project.category === 'company')
</script>

<template>
  <section class="section container">
    <SectionHeader :title="t('home.companies')" />
    <ProjectRow :projects="companies" :label="t('home.companies')" />
  </section>
</template>
