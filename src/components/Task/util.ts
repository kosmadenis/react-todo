export function timeToString(timerTime: number, timerOrigin: number | null) {
  const additionalTime = timerOrigin
    ? Math.max(0, Date.now() - timerOrigin) / 1000
    : 0

  const totalTime = timerTime + additionalTime

  const minutes = Math.floor(totalTime / 60)
  const seconds = Math.floor(totalTime) % 60

  const result = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`

  return result
}
