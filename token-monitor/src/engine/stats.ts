import { estimateTokens } from "./estimate"
import {
  emptyTokens,
  modelKey,
  normalizeTokens,
  totalTokens,
  type ModelRefLike,
  type TokenCounts,
} from "./types"

export type StepStatus = "waiting" | "streaming" | "stream-ended" | "done" | "failed"

export type StepState = {
  messageID: string
  startedAt: number
  firstStartedAt?: number
  firstDeltaAt?: number
  streamedAt?: number
  completedAt?: number
  model?: ModelRefLike
  status: StepStatus
  retryCount: number
  chars: { text: number; reasoning: number; tool: number }
  estimated: number
  estimatedOutput: number
  estimatedReasoning: number
  exact?: TokenCounts
  cost?: number
  finish?: string
  exactTps?: number
  endToEndTps?: number
  frozenTps?: number
  joinedMidStream?: boolean
}

export type TurnStatus = "running" | "succeeded" | "failed" | "interrupted"

export type TurnState = {
  startedAt: number
  endedAt?: number
  status: TurnStatus
  steps: StepState[]
}

export type EngineSnapshot = {
  active: boolean
  compacting: boolean
  tps?: number
  tpsKind: "exact" | "estimate" | "frozen" | "none"
  tpsEndToEnd?: number
  ttftMs?: number
  retryCount: number
  current?: StepState
  last?: StepState
  turn?: TurnState
  stepTokens: TokenCounts
  turnTokens: TokenCounts
  history: number[]
  sessionTokens?: TokenCounts
  sessionCost?: number
}

type Sample = { at: number; tokens: number }

function finite(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0
}

function lastIndexWhere<T>(items: readonly T[], predicate: (item: T) => boolean): number {
  for (let index = items.length - 1; index >= 0; index -= 1) {
    if (predicate(items[index]!)) return index
  }
  return -1
}

export class SessionEngine {
  readonly sessionID: string
  private windowMs: number
  private turn: TurnState | undefined
  private current: StepState | undefined
  private last: StepState | undefined
  private active = false
  private compacting = false
  private samples: Sample[] = []
  private history: number[] = []
  private firstDeltaLocalAt: number | undefined
  private calibrations: Record<string, number> = {}
  private sessionTokens: TokenCounts | undefined
  private sessionCost: number | undefined

  constructor(sessionID: string, windowMs: number) {
    this.sessionID = sessionID
    this.windowMs = Math.max(500, Math.min(15_000, windowMs))
  }

  setWindow(windowMs: number) {
    this.windowMs = Math.max(500, Math.min(15_000, windowMs))
    this.prune(Date.now())
  }

  setStepModel(messageID: string, model: ModelRefLike | undefined) {
    const step = this.findStep(messageID)
    if (step && !step.model) step.model = model
  }

  reset() {
    this.turn = undefined
    this.current = undefined
    this.last = undefined
    this.active = false
    this.compacting = false
    this.samples = []
    this.history = []
    this.firstDeltaLocalAt = undefined
    this.sessionTokens = undefined
    this.sessionCost = undefined
  }

  handle(event: any) {
    const type = event?.type
    const data = event?.data ?? {}
    if (data.sessionID && data.sessionID !== this.sessionID) return
    const at = finite(event?.created) || Date.now()

    switch (type) {
      case "session.execution.started":
        if (!this.turn || this.turn.status !== "running") this.startTurn(at)
        this.active = true
        return
      case "session.step.started":
        this.startStep(data, at)
        return
      case "session.text.started":
      case "session.reasoning.started":
      case "session.tool.input.started":
        this.startPart(data, at)
        return
      case "session.text.delta":
        this.addDelta(data, at, "text", data.delta ?? "")
        return
      case "session.reasoning.delta":
        this.addDelta(data, at, "reasoning", data.delta ?? "")
        return
      case "session.tool.input.delta":
        this.addDelta(data, at, "tool", data.delta ?? "")
        return
      case "session.text.ended":
        this.endPart(data, "text", data.text ?? "")
        return
      case "session.reasoning.ended":
        this.endPart(data, "reasoning", data.text ?? "")
        return
      case "session.tool.input.ended":
        this.endPart(data, "tool", data.text ?? "")
        return
      case "session.step.streamed":
        this.markStreamed(data, at)
        return
      case "session.step.ended":
        this.finishStep(data, at, false)
        return
      case "session.step.failed":
        this.finishStep(data, at, true)
        return
      case "session.retry.scheduled":
        this.markRetry(data)
        return
      case "session.usage.updated":
        this.sessionTokens = normalizeTokens(data.tokens)
        if (typeof data.cost === "number") this.sessionCost = data.cost
        return
      case "session.compaction.started":
        this.compacting = true
        return
      case "session.compaction.ended":
      case "session.compaction.failed":
        this.compacting = false
        return
      case "session.execution.succeeded":
        this.endTurn("succeeded", at)
        return
      case "session.execution.failed":
        this.endTurn("failed", at)
        return
      case "session.execution.interrupted":
        this.endTurn("interrupted", at)
        return
      case "session.idle":
        if (this.turn?.status === "running") this.endTurn("succeeded", at)
        return
      default:
        return
    }
  }

  tick(now = Date.now()) {
    if (this.current?.status !== "streaming") return
    const tps = this.liveTps(now)
    if (tps === undefined) return
    this.history.push(tps)
    if (this.history.length > 120) this.history.shift()
  }

  snapshot(now = Date.now()): EngineSnapshot {
    const step = this.current ?? this.last
    let tps: number | undefined
    let tpsKind: EngineSnapshot["tpsKind"] = "none"

    if (this.current) {
      if (this.current.exactTps !== undefined) {
        tps = this.current.exactTps
        tpsKind = "exact"
      } else if (this.current.status === "stream-ended") {
        tps = this.current.frozenTps ?? this.estimatedStepTps(this.current)
        tpsKind = tps === undefined ? "none" : "frozen"
      } else {
        tps = this.liveTps(now)
        tpsKind = tps === undefined ? "none" : "estimate"
      }
    } else if (this.last?.exactTps !== undefined) {
      tps = this.last.exactTps
      tpsKind = "exact"
    } else if (this.last?.frozenTps !== undefined) {
      tps = this.last.frozenTps
      tpsKind = "frozen"
    }

    const ttftMs =
      step?.firstDeltaAt !== undefined && step.startedAt > 0 && step.firstDeltaAt >= step.startedAt
        ? step.firstDeltaAt - step.startedAt
        : undefined

    const stepTokens = this.liveStepTokens(step)
    const turnTokens = this.turnTokens()

    return {
      active: this.active || this.current?.status === "streaming" || this.current?.status === "stream-ended",
      compacting: this.compacting,
      tps,
      tpsKind,
      tpsEndToEnd: step?.endToEndTps,
      ttftMs,
      retryCount: step?.retryCount ?? 0,
      current: this.current,
      last: this.last,
      turn: this.turn,
      stepTokens,
      turnTokens,
      history: [...this.history],
      sessionTokens: this.sessionTokens,
      sessionCost: this.sessionCost,
    }
  }

  hydrate(messages: any[], info?: any) {
    if (this.turn || this.current) return
    const list = Array.isArray(messages) ? messages : []
    const idleIndex = lastIndexWhere(list, (message: any) => message?.type === "idle")
    const recent = list.slice(idleIndex + 1)
    const steps: StepState[] = []

    for (const message of recent) {
      if (message?.type !== "assistant" || !message.tokens) continue
      const tokens = normalizeTokens(message.tokens)
      if (totalTokens(tokens) <= 0) continue
      const startedAt = finite(message.time?.created) || Date.now()
      const streamedAt = finite(message.time?.streamed) || finite(message.time?.completed) || startedAt
      steps.push({
        messageID: message.id,
        startedAt,
        streamedAt,
        completedAt: finite(message.time?.completed) || streamedAt,
        model: message.model,
        status: "done",
        retryCount: 0,
        chars: { text: 0, reasoning: 0, tool: 0 },
        estimated: 0,
        estimatedOutput: 0,
        estimatedReasoning: 0,
        exact: tokens,
        cost: typeof message.cost === "number" ? message.cost : undefined,
        finish: message.finish,
        exactTps: this.computeTps(tokens, startedAt, streamedAt),
        endToEndTps: this.computeTps(tokens, startedAt, streamedAt),
      })
    }

    if (steps.length > 0) {
      this.turn = {
        startedAt: steps[0]!.startedAt,
        endedAt: steps[steps.length - 1]!.completedAt,
        status: "succeeded",
        steps,
      }
      this.last = steps[steps.length - 1]
    }

    this.sessionTokens = info?.tokens ? normalizeTokens(info.tokens) : undefined
    this.sessionCost = typeof info?.cost === "number" ? info.cost : undefined
    this.active = false
  }

  private startTurn(at: number) {
    this.turn = { startedAt: at, status: "running", steps: [] }
    this.active = true
  }

  private startStep(data: any, at: number) {
    const messageID = data?.assistantMessageID
    if (!messageID) return

    let step = this.findStep(messageID)
    if (!this.turn || this.turn.status !== "running") this.startTurn(finite(data?.started) || at)
    if (!step) {
      step = this.createStep(messageID, finite(data?.started) || at, data?.model)
      this.turn!.steps.push(step)
    } else {
      step.model = data?.model ?? step.model
      if (!step.startedAt) step.startedAt = finite(data?.started) || at
    }

    this.current = step
    this.active = true
    this.samples = []
    this.history = []
    this.firstDeltaLocalAt = undefined
  }

  private startPart(data: any, at: number) {
    const step = this.ensureStep(data, at)
    if (!step) return
    if (step.firstStartedAt === undefined) step.firstStartedAt = at
    if (step.status === "waiting") step.status = "streaming"
    this.active = true
  }

  private addDelta(data: any, at: number, kind: "text" | "reasoning" | "tool", text: string) {
    if (!text) return
    const step = this.ensureStep(data, at)
    if (!step) return
    if (step.status === "done" || step.status === "failed") return

    if (step.firstDeltaAt === undefined) step.firstDeltaAt = at
    if (this.firstDeltaLocalAt === undefined) this.firstDeltaLocalAt = Date.now()

    const calibration = this.calibrationFor(step.model)
    const estimated = estimateTokens(text, calibration)
    const local = Date.now()

    step.chars[kind] += text.length
    step.estimated += estimated
    if (kind === "reasoning") step.estimatedReasoning += estimated
    else step.estimatedOutput += estimated
    step.status = "streaming"
    this.active = true

    this.samples.push({ at: local, tokens: estimated })
    this.prune(local)
  }

  private endPart(data: any, kind: "text" | "reasoning" | "tool", text: string) {
    const step = this.findStep(data?.assistantMessageID)
    if (!step || !text) return
    step.chars[kind] = Math.max(step.chars[kind], text.length)
  }

  private markStreamed(data: any, at: number) {
    const step = this.findStep(data?.assistantMessageID)
    if (!step) return
    step.streamedAt = at
    step.status = "stream-ended"
    step.frozenTps = this.liveTps(Date.now()) ?? this.estimatedStepTps(step)
    this.active = true
  }

  private markRetry(data: any) {
    const step = this.findStep(data?.assistantMessageID)
    if (!step) return
    step.retryCount += 1
    if (step.firstDeltaAt === undefined) {
      this.samples = []
      this.history = []
      this.firstDeltaLocalAt = undefined
    }
  }

  private finishStep(data: any, at: number, failed: boolean) {
    const step = this.ensureStep(data, at)
    if (!step) return

    if (data?.tokens !== undefined) {
      step.exact = normalizeTokens(data.tokens)
      const streamedAt = step.streamedAt ?? at
      step.exactTps = this.computeTps(step.exact, step.firstDeltaAt, streamedAt)
      step.endToEndTps = this.computeTps(step.exact, step.startedAt, streamedAt)
      if (!step.joinedMidStream) this.calibrate(step)
    }
    if (typeof data?.cost === "number") step.cost = data.cost
    if (typeof data?.finish === "string") step.finish = data.finish
    step.completedAt = at
    step.status = failed ? "failed" : "done"

    this.last = step
    if (this.current === step) this.current = undefined
    this.active = this.turn?.status === "running"
  }

  private endTurn(status: TurnStatus, at: number) {
    if (!this.turn) return
    this.turn.status = status
    this.turn.endedAt = at

    if (this.current) {
      if (this.current.status === "waiting" || this.current.status === "streaming" || this.current.status === "stream-ended") {
        this.current.completedAt = at
        this.current.status = status === "failed" || status === "interrupted" ? "failed" : "done"
      }
      this.last = this.current
      this.current = undefined
    }

    this.active = false
  }

  private ensureStep(data: any, at: number): StepState | undefined {
    const messageID = data?.assistantMessageID
    if (!messageID) return undefined

    let step = this.findStep(messageID)
    if (step) return step

    step = this.createStep(messageID, finite(data?.started) || at, data?.model)
    step.joinedMidStream = true
    if (!this.turn || this.turn.status !== "running") this.startTurn(step.startedAt)
    this.turn!.steps.push(step)
    this.current = step
    this.active = true
    return step
  }

  private createStep(messageID: string, startedAt: number, model?: ModelRefLike): StepState {
    return {
      messageID,
      startedAt,
      model,
      status: "waiting",
      retryCount: 0,
      chars: { text: 0, reasoning: 0, tool: 0 },
      estimated: 0,
      estimatedOutput: 0,
      estimatedReasoning: 0,
    }
  }

  private findStep(messageID: string | undefined): StepState | undefined {
    if (!messageID) return undefined
    if (this.current?.messageID === messageID) return this.current
    if (this.last?.messageID === messageID) return this.last
    return this.turn?.steps.find((step) => step.messageID === messageID)
  }

  private calibrationFor(model: ModelRefLike | undefined): number {
    return this.calibrations[modelKey(model)] ?? 1
  }

  private calibrate(step: StepState) {
    if (!step.exact || step.estimated <= 0) return
    const exactOutput = step.exact.output + step.exact.reasoning
    if (exactOutput <= 0) return

    let ratio = exactOutput / step.estimated
    if (!Number.isFinite(ratio)) return
    ratio = Math.max(0.2, Math.min(5, ratio))

    const key = modelKey(step.model)
    const previous = this.calibrations[key]
    this.calibrations[key] = previous === undefined ? ratio : previous * 0.7 + ratio * 0.3
  }

  private computeTps(tokens: TokenCounts, start: number | undefined, end: number | undefined): number | undefined {
    if (start === undefined || end === undefined) return undefined
    const output = tokens.output + tokens.reasoning
    const seconds = (end - start) / 1000
    if (output <= 0 || seconds <= 0.05) return undefined
    return output / seconds
  }

  private estimatedStepTps(step: StepState | undefined): number | undefined {
    if (!step?.firstDeltaAt || !step.streamedAt) return undefined
    const output = step.estimatedOutput + step.estimatedReasoning
    const seconds = (step.streamedAt - step.firstDeltaAt) / 1000
    if (output <= 0 || seconds <= 0.05) return undefined
    return output / seconds
  }

  private liveStepTokens(step: StepState | undefined): TokenCounts {
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

  private turnTokens(): TokenCounts {
    const result = emptyTokens()
    for (const step of this.turn?.steps ?? []) {
      const tokens = this.liveStepTokens(step)
      result.input += tokens.input
      result.output += tokens.output
      result.reasoning += tokens.reasoning
      result.cacheRead += tokens.cacheRead
      result.cacheWrite += tokens.cacheWrite
    }
    return result
  }

  private liveTps(now: number): number | undefined {
    if (this.firstDeltaLocalAt === undefined) return undefined
    const cutoff = now - this.windowMs
    let tokens = 0
    for (const sample of this.samples) {
      if (sample.at >= cutoff) tokens += sample.tokens
    }
    const elapsed = Math.max(0.25, Math.min(this.windowMs, now - this.firstDeltaLocalAt) / 1000)
    return tokens / elapsed
  }

  private prune(now: number) {
    const cutoff = now - this.windowMs * 4
    while (this.samples.length > 0 && this.samples[0]!.at < cutoff) this.samples.shift()
  }
}
