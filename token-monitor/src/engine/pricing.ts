import type { ModelRefLike, Prefs, TokenCounts } from "./types"
import { modelID } from "./types"

export type PriceSource = "custom" | "catalog" | "none"

export type PriceResult = {
  amount: number | undefined
  source: PriceSource
}

function finite(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0
}

function catalogEntry(cost: any, tokens: TokenCounts) {
  if (!cost || typeof cost !== "object") return undefined
  const context = tokens.input + tokens.cacheRead + tokens.cacheWrite
  const tiered = (Array.isArray(cost) ? cost : [])
    .filter((item: any) => item?.tier?.type === "context" && finite(item.tier.size) < context)
    .sort((a: any, b: any) => finite(b.tier?.size) - finite(a.tier?.size))[0]
  if (tiered) return tiered
  return (Array.isArray(cost) ? cost : []).find((item: any) => item?.tier === undefined)
}

function amountFor(
  tokens: TokenCounts,
  input: number,
  output: number,
  cacheRead: number,
  cacheWrite: number,
): number {
  return (
    (tokens.input * input +
      (tokens.output + tokens.reasoning) * output +
      tokens.cacheRead * cacheRead +
      tokens.cacheWrite * cacheWrite) /
    1_000_000
  )
}

export function priceFor(
  model: ModelRefLike | undefined,
  tokens: TokenCounts,
  catalog: any[] | undefined,
  prefs: Prefs,
): PriceResult {
  const id = modelID(model)
  if (!id || !model?.providerID) return { amount: undefined, source: "none" }

  const custom = prefs.prices.find(
    (entry) =>
      (entry.providerID === "*" || entry.providerID === model.providerID) &&
      (entry.modelID === id || entry.modelID === "*"),
  )

  if (custom) {
    return {
      amount: amountFor(tokens, finite(custom.input), finite(custom.output), finite(custom.cacheRead), finite(custom.cacheWrite)),
      source: "custom",
    }
  }

  if (prefs.priceMode === "custom") return { amount: undefined, source: "none" }

  const item = (catalog ?? []).find(
    (candidate) =>
      candidate?.providerID === model.providerID &&
      (candidate?.id === id || candidate?.modelID === id),
  )
  const cost = catalogEntry(item?.cost, tokens)
  if (!cost) return { amount: undefined, source: "none" }

  return {
    amount: amountFor(
      tokens,
      finite(cost.input),
      finite(cost.output),
      finite(cost.cacheRead ?? cost.cache?.read),
      finite(cost.cacheWrite ?? cost.cache?.write),
    ),
    source: "catalog",
  }
}
