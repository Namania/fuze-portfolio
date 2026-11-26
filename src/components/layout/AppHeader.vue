<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import FuzeBadge from '@/components/brand/FuzeBadge.vue'
import LocaleSwitcher from '@/components/layout/LocaleSwitcher.vue'
import ThemeToggle from '@/components/layout/ThemeToggle.vue'
import { profile } from '@/data/profile'

const { t } = useI18n()
</script>

<template>
  <header class="header">
    <div v-reveal class="container header-inner">
      <RouterLink :to="{ name: 'home' }" class="brand" :aria-label="profile.name">
        <FuzeBadge class="brand-logo" />
        <span>{{ profile.name }}</span>
      </RouterLink>
      <nav class="nav" :aria-label="t('nav.main')">
        <RouterLink :to="{ name: 'projects' }" class="nav-link nav-link-page">
          {{ t('nav.projects') }}
        </RouterLink>
        <RouterLink :to="{ name: 'home', hash: '#team' }" class="nav-link">
          {{ t('nav.careers') }}
        </RouterLink>
        <RouterLink :to="{ name: 'home', hash: '#contact' }" class="nav-link nav-link-optional">
          {{ t('nav.contact') }}
        </RouterLink>
        <div class="nav-actions">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </nav>
    </div>
    <div class="header-progress" />
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid var(--color-border);
  background: color-mix(in srgb, var(--color-bg) 85%, transparent);
  backdrop-filter: blur(12px);
}

.header-progress {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--color-accent);
  transform: scaleX(0);
  transform-origin: left;
}

@supports (animation-timeline: scroll()) {
  .header-progress {
    animation: progress linear both;
    animation-timeline: scroll(root);
  }
}

@keyframes progress {
  to {
    transform: scaleX(1);
  }
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  height: 4rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-weight: 700;
}

.brand-logo {
  width: 2rem;
}

.nav {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  font-size: 0.9375rem;
}

.nav-actions {
  display: flex;
  gap: 0.5rem;
}

.nav-link {
  color: var(--color-muted);
  transition: color 0.15s;
}

.nav-link:hover,
.nav-link-page.router-link-active {
  color: var(--color-text);
}

@media (max-width: 30rem) {
  .brand span,
  .nav-link-optional {
    display: none;
  }

  .nav {
    gap: 0.75rem;
    font-size: 0.875rem;
  }

  .nav-actions {
    gap: 0.375rem;
  }
}
</style>
