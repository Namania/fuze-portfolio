import { ref, watch } from 'vue'

const isAppReady = ref(false)

function markAppReady() {
  isAppReady.value = true
}

function whenAppReady(callback: () => void) {
  if (isAppReady.value) {
    callback()
    return
  }

  const stop = watch(isAppReady, () => {
    stop()
    callback()
  })
}

export function useAppReady() {
  return { isAppReady, markAppReady, whenAppReady }
}
