import { ref } from 'vue'

const FEEDBACK_MS = 2000

export function useClipboard() {
  const isCopied = ref(false)

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      return
    }

    isCopied.value = true
    window.setTimeout(() => (isCopied.value = false), FEEDBACK_MS)
  }

  return { isCopied, copy }
}
