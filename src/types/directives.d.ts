import type { vReveal } from '@/directives/reveal'
import type { vTilt } from '@/directives/tilt'

declare module 'vue' {
  interface GlobalDirectives {
    vReveal: typeof vReveal
    vTilt: typeof vTilt
  }
}
