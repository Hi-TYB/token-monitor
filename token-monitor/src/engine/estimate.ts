const CJK = /[\u3400-\u4dbf\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af]/u

/**
 * Character-based starting point. The engine calibrates this against the
 * provider's exact output count at the end of every step.
 */
export function heuristicTokens(text: string): number {
  let cjk = 0
  let other = 0

  for (const char of text) {
    if (CJK.test(char)) cjk += 1
    else other += 1
  }

  return cjk / 1.6 + other / 4
}

export function estimateTokens(text: string, calibration = 1): number {
  if (!text) return 0
  const factor = Number.isFinite(calibration) && calibration > 0 ? calibration : 1
  return heuristicTokens(text) * factor
}
