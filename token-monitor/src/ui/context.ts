import { lastAssistantWithUsage } from "@opencode/client/solid"
import { emptyTokens, normalizeTokens, totalTokens, type TokenCounts } from "../engine/types"

export function findModel(models: any[] | undefined, ref: any): any | undefined {
  if (!ref) return undefined
  const id = ref.id ?? ref.modelID
  if (!id) return undefined
  return (models ?? []).find(
    (model) =>
      model?.providerID === ref.providerID && (model?.id === id || model?.modelID === id),
  )
}

export type ContextUsage = {
  used: number
  max: number | undefined
  pct: number | undefined
  modelName: string | undefined
  tokens: TokenCounts
}

export function computeContext(data: any, session: any): ContextUsage {
  try {
    const messages = data?.session?.message?.list?.(session.id) ?? []
    const info = data?.session?.get?.(session.id)
    const step = lastAssistantWithUsage(messages, info?.revert?.messageID)
    const tokens = step ? normalizeTokens(step.tokens) : emptyTokens()
    const used = step ? totalTokens(tokens) : 0
    const models = data?.location?.model?.list?.(session.location) ?? []
    const model = findModel(models, step?.model ?? info?.model)
    const limit = model?.limit?.context
    const max = typeof limit === "number" && limit > 0 ? limit : undefined
    return {
      used,
      max,
      pct: max ? (used / max) * 100 : undefined,
      modelName: model?.name ?? step?.model?.id ?? info?.model?.id,
      tokens,
    }
  } catch {
    return { used: 0, max: undefined, pct: undefined, modelName: undefined, tokens: emptyTokens() }
  }
}

export function sessionTokens(data: any, session: any, includeSubagents: boolean): TokenCounts {
  try {
    const ids = includeSubagents
      ? (data?.session?.family?.(session.id) ?? [session.id])
      : [session.id]
    const total = emptyTokens()
    for (const id of ids) {
      const info = data?.session?.get?.(id)
      if (!info?.tokens) continue
      const tokens = normalizeTokens(info.tokens)
      total.input += tokens.input
      total.output += tokens.output
      total.reasoning += tokens.reasoning
      total.cacheRead += tokens.cacheRead
      total.cacheWrite += tokens.cacheWrite
    }
    return total
  } catch {
    return emptyTokens()
  }
}

export function sessionCost(data: any, session: any): number | undefined {
  try {
    const value = data?.session?.cost?.(session.id)
    return typeof value === "number" && Number.isFinite(value) ? value : undefined
  } catch {
    return undefined
  }
}
