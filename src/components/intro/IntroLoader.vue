<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import FuzeLogo from '@/components/brand/FuzeLogo.vue'
import sparks from './sparks.json'
import { createWipeClip } from './wipeClip'

const emit = defineEmits<{ done: [] }>()

const DURATION_MS = 1800
const FRAME_MS = 1000 / 30
const LOGO_LAYERS = 9
const SPARKS_VIEWBOX = '1251.6 452.5 636.8 595'
const WIPE_SWEEP = 122

const stageClip = {
  '--clip-from': createWipeClip(-118, 8, 7),
  '--clip-to': createWipeClip(-118, 8, 7, WIPE_SWEEP),
}
const edgeClip = {
  '--clip-from': createWipeClip(-131, 7, 23),
  '--clip-to': createWipeClip(-131, 7, 23, WIPE_SWEEP),
}

let timer: number | undefined

onMounted(() => {
  timer = window.setTimeout(() => emit('done'), DURATION_MS)
})

onUnmounted(() => window.clearTimeout(timer))
</script>

<template>
  <div class="intro" aria-hidden="true">
    <div class="wipe wipe-edge" :style="edgeClip" />
    <div class="wipe" :style="stageClip">
      <div class="stage">
        <div class="rays" />
        <div class="vignette" />
        <div class="logo">
          <div class="logo-spin">
            <FuzeLogo
              v-for="layer in LOGO_LAYERS"
              :key="layer"
              class="logo-layer"
              :class="{ 'logo-face': layer === 1 || layer === LOGO_LAYERS }"
              :style="{ '--depth': layer - (LOGO_LAYERS + 1) / 2 }"
            />
          </div>
          <svg class="sparks" :viewBox="SPARKS_VIEWBOX">
            <path
              v-for="spark in sparks"
              :key="spark.frame"
              :d="spark.d"
              :style="{ animationDelay: `${spark.frame * FRAME_MS}ms` }"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.intro {
  position: fixed;
  inset: 0;
  z-index: 1000;
  overflow: hidden;
}

.wipe {
  position: absolute;
  inset: 0;
  animation: wipe 0.17s linear 1.6s both;
}

.wipe-edge {
  background: #fff;
}

.stage {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: #b30d08;
  animation: light-up 0.13s ease-out both;
}

.rays {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 220vmax;
  height: 220vmax;
  margin: -110vmax 0 0 -110vmax;
  background: var(--gradient-rays);
  animation: rays 1.8s linear both;
}

.vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 45%,
    rgb(255 70 50 / 0.22) 0%,
    transparent 45%,
    rgb(50 0 0 / 0.45) 100%
  );
}

.logo {
  position: relative;
  width: min(50vh, 84vw);
  aspect-ratio: 959 / 896;
  perspective: 1100px;
  animation: zoom-out 1.6s linear both;
}

.logo-spin {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  animation: spin 0.47s cubic-bezier(0.45, 0.05, 0.55, 0.95) 0.4s both;
}

.logo-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  color: #cfcfcf;
  transform: translateZ(calc(var(--depth) * 0.55vmin));
}

.logo-layer:first-child {
  filter: drop-shadow(0 1.2vmin 1.4vmin rgb(60 0 0 / 0.45));
}

.logo-face {
  color: #fff;
}

.sparks {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  transform: translateZ(3vmin);
  filter: drop-shadow(0 0 0.4vmin #ffd9d9);
}

.sparks path {
  fill: #fff;
  stroke: #fff;
  stroke-width: 2;
  stroke-linejoin: round;
  visibility: hidden;
  animation: spark 33.34ms step-end;
}

@keyframes wipe {
  from {
    clip-path: var(--clip-from);
  }
  to {
    clip-path: var(--clip-to);
  }
}

@keyframes light-up {
  from {
    filter: brightness(0.25);
  }
  to {
    filter: brightness(1);
  }
}

@keyframes rays {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(18deg);
  }
}

@keyframes zoom-out {
  0% {
    transform: scale(7);
    filter: blur(14px);
    animation-timing-function: cubic-bezier(0.2, 0.7, 0.3, 1);
  }
  8.3% {
    transform: scale(0.82);
    filter: blur(0);
    animation-timing-function: ease-out;
  }
  15% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.04);
  }
}

@keyframes spin {
  0% {
    transform: rotateX(0deg) rotateY(0deg);
  }
  50% {
    transform: rotateX(-14deg) rotateY(180deg);
  }
  100% {
    transform: rotateX(0deg) rotateY(360deg);
  }
}

@keyframes spark {
  from,
  to {
    visibility: visible;
  }
}
</style>
