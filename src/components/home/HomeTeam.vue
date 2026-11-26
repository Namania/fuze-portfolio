<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import FuzeBadge from '@/components/brand/FuzeBadge.vue'
import InfiniteMarquee from '@/components/ui/InfiniteMarquee.vue'
import { profile } from '@/data/profile'
import { team } from '@/data/team'
import { findProjectAsset } from '@/utils/projectAssets'

const { t } = useI18n()

const structures = team.structures.map((structure) => ({
  ...structure,
  logo: findProjectAsset(structure.id, 'logo'),
}))
</script>

<template>
  <section id="team" class="section container">
    <div v-reveal class="team">
      <div class="team-body">
        <div class="team-intro">
          <p class="team-eyebrow">{{ t('team.eyebrow') }}</p>
          <h2 class="team-title">{{ t('team.title') }}</h2>
          <p class="team-description">{{ t('team.description') }}</p>
          <a :href="profile.jobsUrl" class="button button-primary" target="_blank" rel="noopener">
            {{ t('team.action') }}
          </a>
        </div>
        <ul class="team-structures">
          <li
            v-for="(structure, index) in structures"
            :key="structure.id"
            v-reveal="index + 1"
            class="team-structure"
          >
            <img
              v-if="structure.logo"
              :src="structure.logo"
              alt=""
              class="team-logo"
              loading="lazy"
              width="44"
              height="44"
            />
            <FuzeBadge v-else class="team-logo" />
            {{ structure.name }}
          </li>
        </ul>
      </div>
      <InfiniteMarquee class="team-roles" :duration="30" reverse>
        <span v-for="role in team.roles" :key="role" class="team-role">
          {{ t(`team.roles.${role}`) }}
        </span>
      </InfiniteMarquee>
    </div>
  </section>
</template>

<style scoped>
.team {
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 1.25rem;
  background: var(--color-surface);
}

.team-body {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2rem 3rem;
  padding: clamp(1.5rem, 5vw, 3rem);
}

.team-intro {
  display: flex;
  flex: 1 1 18rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
}

.team-eyebrow {
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent-text);
}

.team-title {
  font-size: clamp(2rem, 6vw, 3rem);
  line-height: 1.05;
}

.team-description {
  max-width: 24rem;
  margin-bottom: 0.5rem;
  color: var(--color-muted);
}

.team-structures {
  display: grid;
  flex: 1 1 22rem;
  grid-template-columns: repeat(auto-fit, minmax(min(11.5rem, 100%), 1fr));
  gap: 0.75rem;
}

.team-structure {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-bg);
  font-weight: 700;
  transition:
    transform 0.2s,
    border-color 0.2s;
}

.team-structure:hover {
  border-color: var(--color-accent);
  transform: translateY(-3px);
}

.team-logo {
  flex: none;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.625rem;
  background-color: #fff;
  object-fit: cover;
}

.team-roles {
  padding-block: 1rem;
  border-top: 1px solid var(--color-border);
}

.team-role {
  font-size: 1.125rem;
  font-weight: 800;
  white-space: nowrap;
  color: var(--color-muted);
}

.team-role::after {
  margin-left: 3rem;
  color: var(--color-accent);
  content: '✦';
}
</style>
