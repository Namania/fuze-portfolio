import type { Directive } from 'vue'

const MAX_ANGLE = 6

const isEnabled =
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

function onPointerMove(event: PointerEvent) {
  const element = event.currentTarget as HTMLElement
  const rect = element.getBoundingClientRect()
  const x = (event.clientX - rect.left) / rect.width - 0.5
  const y = (event.clientY - rect.top) / rect.height - 0.5

  element.style.setProperty('--tilt-x', `${(-y * MAX_ANGLE).toFixed(2)}deg`)
  element.style.setProperty('--tilt-y', `${(x * MAX_ANGLE).toFixed(2)}deg`)
}

function onPointerLeave(event: PointerEvent) {
  const element = event.currentTarget as HTMLElement
  element.style.removeProperty('--tilt-x')
  element.style.removeProperty('--tilt-y')
}

export const vTilt: Directive<HTMLElement> = {
  mounted(element) {
    if (!isEnabled) return

    element.addEventListener('pointermove', onPointerMove)
    element.addEventListener('pointerleave', onPointerLeave)
  },
  unmounted(element) {
    element.removeEventListener('pointermove', onPointerMove)
    element.removeEventListener('pointerleave', onPointerLeave)
  },
}
