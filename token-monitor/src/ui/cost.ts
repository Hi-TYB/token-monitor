import { priceFor, type PriceResult } from "../engine/pricing"
import type { StepState } from "../engine/stats"
import { emptyTokens, type TokenCounts } from "../engine/types"
import type { Prefs } from "../prefs"

export function stepTokensFor(step: StepState | undefined): TokenCounts {
  if (!step) return emptyTokens()
  if (step.exact) return step.exact
  return {
    input: 0,
    output: step.estimatedOutput,
    reasoning: step.estimatedReasoning,
    cacheRead: 0,
    cacheWrite: 0,
  }
}

export function costForStep(
  step: StepState | undefined,
  catalog: any[] | undefined,
  prefs: Prefs,
): PriceResult {
  if (!step) return { amount: undefined, source: "none" }
  return priceFor(step.model, stepTokensFor(step), catalog, prefs)
}

export function costForSteps(
  steps: readonly StepState[],
  catalog: any[] | undefined,
  prefs: Prefs,
): PriceResult {
  if (steps.length === 0) return { amount: undefined, source: "none" }

  let amount = 0
  let source: PriceResult["source"] = "catalog"
  for (const step of steps) {
    const price = priceFor(step.model, stepTokensFor(step), catalog, prefs)
    if (price.source === "none" || price.amount === undefined) return { amount: undefined, source: "none" }
    amount += price.amount
    if (price.source === "custom") source = "custom"
  }
  return { amount, source }
}
