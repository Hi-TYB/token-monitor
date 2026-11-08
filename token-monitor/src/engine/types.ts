export type TokenCounts = {
  input: number
  output: number
  reasoning: number
  cacheRead: number
  cacheWrite: number
}

export type ModelRefLike = {
  providerID?: string
  id?: string
  modelID?: string
  variant?: string
}

export type PriceEntry = {
  providerID: string
  modelID: string
  input: number
  output: number
  cacheRead: number
  cacheWrite: number
}

export type Prefs = {
  prices: PriceEntry[]
  priceMode: string
  tpsWindowMs: number
  showHeaderPill: boolean
  includeSubagents: boolean
}

export function emptyTokens(): TokenCounts {
  return { input: 0, output: 0, reasoning: 0, cacheRead: 0, cacheWrite: 0 }
}

export function totalTokens(tokens: TokenCounts | undefined): number {
  if (!tokens) return 0
  return tokens.input + tokens.output + tokens.reasoning + tokens.cacheRead + tokens.cacheWrite
}

export function addTokens(target: TokenCounts, source: TokenCounts | undefined): TokenCounts {
  if (!source) return target
  target.input += source.input
  target.output += source.output
  target.reasoning += source.reasoning
  target.cacheRead += source.cacheRead
  target.cacheWrite += source.cacheWrite
  return target
}

function finite(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0
}

export function normalizeTokens(value: any): TokenCounts {
  return {
    input: finite(value?.input),
    output: finite(value?.output),
    reasoning: finite(value?.reasoning),
    cacheRead: finite(value?.cacheRead ?? value?.cache?.read),
    cacheWrite: finite(value?.cacheWrite ?? value?.cache?.write),
  }
}

export function modelKey(model: ModelRefLike | undefined): string {
  const provider = model?.providerID ?? "unknown"
  const id = model?.id ?? model?.modelID ?? "unknown"
  return `${provider}/${id}`
}

export function modelID(model: ModelRefLike | undefined): string | undefined {
  return model?.id ?? model?.modelID
}
