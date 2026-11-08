export type PillSegment =
  | "context"
  | "tps"
  | "ttft"
  | "turnCost"
  | "turnTokens"
  | "cacheHit"
  | "model"
  | "status"
  | "steps"
  | "elapsed"
  | "sessionTokens"
  | "sessionCost"

export const PILL_SEGMENTS: readonly PillSegment[] = [
  "context",
  "tps",
  "ttft",
  "turnCost",
  "turnTokens",
  "cacheHit",
  "model",
  "status",
  "steps",
  "elapsed",
  "sessionTokens",
  "sessionCost",
]

export const PILL_PRESETS: Record<string, readonly PillSegment[]> = {
  minimal: ["context", "tps"],
  standard: ["context", "tps", "turnCost"],
  power: ["context", "tps", "ttft", "cacheHit"],
}

export function isPillSegment(value: string): value is PillSegment {
  return (PILL_SEGMENTS as readonly string[]).includes(value)
}

export function resolvePillSegments(input: { preset: string; segments: string[] }): PillSegment[] {
  if (input.preset !== "custom") {
    const preset = PILL_PRESETS[input.preset]
    if (preset) return [...preset]
  }
  const custom = input.segments.filter(isPillSegment)
  return custom.length > 0 ? custom : [...PILL_PRESETS.standard]
}

export function segmentLabelKey(segment: PillSegment): string {
  return `pill.segment.${segment}`
}
