import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { scrambleText } from '@/utils/scrambleText'

const DURATION_MS = 800
const MAX_DELAY_MS = 150

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function collectTextsByParent(root: Element) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const groups = new Map<Element, Text[]>()

  while (walker.nextNode()) {
    const node = walker.currentNode as Text
    const parent = node.parentElement
    if (!parent) continue

    groups.set(parent, [...(groups.get(parent) ?? []), node])
  }

  return groups
}

function isVisible(element: Element) {
  if (element.closest('[aria-live]')) return false

  const rect = element.getBoundingClientRect()
  return rect.bottom > 0 && rect.top < window.innerHeight
}

export function useLocaleGlitch(rootSelector: string) {
  const { locale } = useI18n()
  let previousTexts = new Map<Element, string[]>()

  if (prefersReducedMotion) return

  watch(
    locale,
    () => {
      const root = document.querySelector(rootSelector)
      previousTexts = new Map()
      if (!root) return

      for (const [parent, nodes] of collectTextsByParent(root)) {
        previousTexts.set(
          parent,
          nodes.map((node) => node.data),
        )
      }
    },
    { flush: 'sync' },
  )

  watch(
    locale,
    () => {
      const root = document.querySelector(rootSelector)
      if (!root) return

      for (const [parent, nodes] of collectTextsByParent(root)) {
        if (!isVisible(parent)) continue

        nodes.forEach((node, index) => {
          const previousText = previousTexts.get(parent)?.[index] ?? ''
          if (previousText === node.data) return

          scrambleText(node, previousText, DURATION_MS, Math.random() * MAX_DELAY_MS)
        })
      }

      previousTexts.clear()
    },
    { flush: 'post' },
  )
}
