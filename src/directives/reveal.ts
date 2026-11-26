import type { Directive } from 'vue'
import { useAppReady } from '@/composables/useAppReady'

const STAGGER_MS = 70
const MAX_STAGGER_STEPS = 6
const CLASSES = ['reveal', 'reveal-scale', 'is-revealed']

const { whenAppReady } = useAppReady()

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      observer.unobserve(entry.target)
      entry.target.classList.add('is-revealed')
    }
  },
  { rootMargin: '0px 0px -8% 0px' },
)

function cleanUp(event: AnimationEvent) {
  const element = event.currentTarget as HTMLElement
  if (event.target !== element) return

  element.classList.remove(...CLASSES)
  element.style.removeProperty('--reveal-delay')
  element.removeEventListener('animationend', cleanUp)
}

export const vReveal: Directive<HTMLElement, number | undefined> = {
  mounted(element, { value = 0, arg }) {
    const steps = Math.min(value, MAX_STAGGER_STEPS)

    element.classList.add('reveal')
    if (arg === 'scale') element.classList.add('reveal-scale')
    element.style.setProperty('--reveal-delay', `${steps * STAGGER_MS}ms`)
    element.addEventListener('animationend', cleanUp)

    whenAppReady(() => observer.observe(element))
  },
  unmounted(element) {
    observer.unobserve(element)
    element.removeEventListener('animationend', cleanUp)
  },
}
