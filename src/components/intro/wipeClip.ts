function createRandom(seed: number) {
  let state = seed
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296
    return state / 4294967296
  }
}

export function createWipeClip(offset: number, amplitude: number, seed: number, shift = 0) {
  const random = createRandom(seed)
  const points: string[] = []
  let side = 1

  for (let position = -170; position <= 170; position += 3 + 6 * random()) {
    const jitter = side * amplitude * (0.2 + 0.8 * random()) * Math.SQRT1_2
    const x = position + offset / 2 + jitter + shift
    const y = position - offset / 2 - jitter - shift
    points.push(`${x.toFixed(1)}vmax ${y.toFixed(1)}vmax`)
    side = -side
  }

  points.push('600vmax 230vmax', '600vmax -600vmax', '-230vmax -600vmax')
  return `polygon(${points.join(', ')})`
}
