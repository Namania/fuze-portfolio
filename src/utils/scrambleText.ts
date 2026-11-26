const GLYPHS = [...'ᔑʖᓵ↸ᒷ⎓⊣⍑╎⋮ᒲリ∷ᓭ⚍⍊∴⨅']
const FRAME_MS = 45
const GLYPH_WINDOW = 4

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
}

function findChangedRange(previousText: string, nextText: string) {
  const length = Math.max(previousText.length, nextText.length)
  let start = 0
  let end = length

  while (start < length && previousText[start] === nextText[start]) start++
  while (end > start && previousText[end - 1] === nextText[end - 1]) end--

  return { start, end }
}

function composeFrame(previousText: string, nextText: string, head: number) {
  const length = Math.max(previousText.length, nextText.length)
  const glyphEnd = Math.min(head, length)
  const glyphStart = Math.min(Math.max(head - GLYPH_WINDOW, 0), glyphEnd)
  let glyphs = ''

  for (let index = glyphStart; index < glyphEnd; index++) {
    const character = nextText[index] ?? previousText[index]
    const isUnchanged = previousText[index] === nextText[index]

    glyphs += isUnchanged || !character.trim() ? character : randomGlyph()
  }

  return nextText.slice(0, glyphStart) + glyphs + previousText.slice(glyphEnd)
}

export function scrambleText(node: Text, previousText: string, durationMs: number, delayMs = 0) {
  const nextText = node.data
  const range = findChangedRange(previousText, nextText)
  const steps = range.end - range.start + GLYPH_WINDOW
  const start = performance.now() + delayMs
  let written = nextText
  let lastFrame = -1

  function tick(now: number) {
    if (!node.isConnected || node.data !== written) return

    const elapsed = Math.max(now - start, 0)
    const progress = Math.min(elapsed / durationMs, 1)
    const frame = Math.floor(elapsed / FRAME_MS)

    if (progress === 1) {
      node.data = nextText
      return
    }

    if (frame !== lastFrame) {
      const head = range.start + Math.floor(progress * steps)

      written = composeFrame(previousText, nextText, head)
      node.data = written
      lastFrame = frame
    }

    requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)
}
