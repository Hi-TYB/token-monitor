import { For, Show, createMemo } from "solid-js"
import { totalTokens } from "../engine/types"
import { resolvePillSegments, segmentLabelKey, type PillSegment } from "../pill/segments"
import { defaultPrefs } from "../prefs"
import { findModel, sessionCost, sessionTokens } from "./context"
import { costForStep, costForSteps } from "./cost"
import { formatCost, formatDuration, formatPercent, formatTokens, formatTps, formatTtft, formatUSD } from "./format"
import { useSessionEngine } from "./use-engine"

export function HeaderPill(props: {
  ctx: any
  session: any
  active: boolean
  compact: boolean
}) {
  return (
    <Show when={props.active}>
      <Show keyed when={props.session.key}>
        {(_key) => (
          <Pill ctx={props.ctx} session={props.session} compact={props.compact} />
        )}
      </Show>
    </Show>
  )
}

function Pill(props: { ctx: any; session: any; compact: boolean }) {
  const ctx = props.ctx
  const { snapshot, context, data } = useSessionEngine(ctx, props.session)
  const prefs = () => ctx.stores.prefs.value
  const pill = () => prefs().pill ?? defaultPrefs.pill
  const locale = () => ctx.locale.locale()
  const catalog = createMemo(() => data()?.location?.model?.list?.(props.session.location) ?? [])
  const step = () => snapshot().current ?? snapshot().last
  const stepTokens = () => snapshot().stepTokens

  const stepPrice = createMemo(() => costForStep(step(), catalog(), prefs()))
  const turnPrice = createMemo(() => costForSteps(snapshot().turn?.steps ?? [], catalog(), prefs()))
  const sessionTokenCounts = createMemo(() => sessionTokens(data(), props.session, prefs().includeSubagents))
  const sessionCostValue = createMemo(() => sessionCost(data(), props.session))

  const modelName = createMemo(() => {
    const ref = step()?.model ?? data()?.session?.get?.(props.session.id)?.model
    return findModel(catalog(), ref)?.name ?? ref?.id ?? ctx.t("unknown")
  })

  const shortModel = () => {
    const name = modelName()
    return name.length > 18 ? `${name.slice(0, 17)}…` : name
  }

  const cacheHit = () => {
    const tokens = stepTokens()
    const denominator = tokens.input + tokens.cacheRead
    return denominator > 0 ? (tokens.cacheRead / denominator) * 100 : undefined
  }

  const elapsed = () => {
    const turn = snapshot().turn
    if (!turn?.startedAt) return undefined
    return Math.max(0, (turn.endedAt ?? Date.now()) - turn.startedAt)
  }

  const statusText = () => {
    const value = snapshot()
    if (value.compacting) return ctx.t("status.compacting")
    if (value.current?.status === "stream-ended") return ctx.t("status.tools")
    if (value.current?.status === "streaming") return ctx.t("status.streaming")
    if (value.turn?.status === "failed" || value.last?.status === "failed") return ctx.t("status.failed")
    if (value.turn?.status === "interrupted") return ctx.t("status.interrupted")
    if (value.active) return ctx.t("status.running")
    return ctx.t("status.idle")
  }

  const segments = createMemo(() => {
    const all = resolvePillSegments(pill())
    const requested = props.compact ? pill().compactSegments : pill().maxSegments
    const count = Math.max(1, Math.min(6, Math.round(requested)))
    return all.slice(0, count)
  })

  const segmentValue = (id: PillSegment): string | undefined => {
    switch (id) {
      case "context":
        return formatPercent(context().pct)
      case "tps":
        return formatTps(snapshot().tps)
      case "ttft":
        return formatTtft(snapshot().ttftMs)
      case "turnCost": {
        const value = formatCost(turnPrice().amount, turnPrice().source, locale())
        return snapshot().active && turnPrice().source !== "none" ? `~${value}` : value
      }
      case "turnTokens":
        return `${snapshot().active ? "~" : ""}${formatTokens(totalTokens(snapshot().turnTokens), locale())}`
      case "cacheHit":
        return cacheHit() === undefined ? undefined : `${Math.round(cacheHit()!)}%`
      case "model":
        return shortModel()
      case "status":
        return statusText()
      case "steps":
        return ctx.t("pill.steps", { count: snapshot().turn?.steps.length ?? 0 })
      case "elapsed":
        return formatDuration(elapsed())
      case "sessionTokens":
        return formatTokens(totalTokens(sessionTokenCounts()), locale())
      case "sessionCost":
        return formatUSD(sessionCostValue(), locale())
      default:
        return undefined
    }
  }

  const segmentText = (id: PillSegment): string | undefined => {
    const value = segmentValue(id)
    if (value === undefined) return undefined
    if (value === "—" && id !== "context" && id !== "tps") return undefined

    const label = pill().showLabels ? `${ctx.t(segmentLabelKey(id))} ` : ""
    const unit = id === "tps" && pill().showUnits && !props.compact && value !== "—" ? " tok/s" : ""
    return `${label}${value}${unit}`
  }

  const visibleSegments = createMemo(() => {
    const result = segments()
      .map((id) => ({ id, text: segmentText(id) }))
      .filter((entry): entry is { id: PillSegment; text: string } => !!entry.text)
    if (result.length > 0) return result
    return [
      { id: "context" as const, text: formatPercent(context().pct) },
      { id: "tps" as const, text: formatTps(snapshot().tps) },
    ]
  })

  const segmentClass = (id: PillSegment) => {
    if (id !== "context" || !pill().contextTone) return ""
    const pct = context().pct
    if (pct === undefined) return ""
    if (pct >= 95) return "tm-pill-danger"
    if (pct >= 80) return "tm-pill-warning"
    return ""
  }

  const contextText = () => {
    const value = context()
    const used = formatTokens(value.used, locale())
    const max = value.max ? formatTokens(value.max, locale()) : "?"
    return `${used} / ${max} · ${formatPercent(value.pct)}`
  }

  const tpsKindText = () => {
    const kind = snapshot().tpsKind
    if (kind === "exact") return ctx.t("tps.exact")
    if (kind === "estimate") return ctx.t("tps.estimate")
    if (kind === "frozen") return ctx.t("tps.frozen")
    return ctx.t("tps.none")
  }

  const tooltip = () => (
    <div class="tm-pill-tip">
      <div class="tm-pill-tip-title">{modelName()}</div>
      <div class="tm-pill-tip-grid">
        <span>{ctx.t("pill.tip.context")}</span>
        <span>{contextText()}</span>
        <span>{ctx.t("pill.tip.tps")}</span>
        <span>
          {formatTps(snapshot().tps)} tok/s · {tpsKindText()}
        </span>
        <span>{ctx.t("pill.tip.ttft")}</span>
        <span>{formatTtft(snapshot().ttftMs)}</span>
        <span>{ctx.t("pill.tip.step")}</span>
        <span>
          {formatTokens(totalTokens(stepTokens()), locale())} · {formatCost(stepPrice().amount, stepPrice().source, locale())}
        </span>
        <span>{ctx.t("pill.tip.turn")}</span>
        <span>
          {formatTokens(totalTokens(snapshot().turnTokens), locale())} · {formatCost(turnPrice().amount, turnPrice().source, locale())}
        </span>
        <span>{ctx.t("pill.tip.session")}</span>
        <span>
          {formatTokens(totalTokens(sessionTokenCounts()), locale())} · {formatUSD(sessionCostValue(), locale())}
        </span>
        <span>{ctx.t("pill.tip.cache")}</span>
        <span>{cacheHit() === undefined ? "—" : `${Math.round(cacheHit()!)}%`}</span>
        <span>{ctx.t("pill.tip.status")}</span>
        <span>{statusText()}</span>
      </div>
    </div>
  )

  const dotClass = () => {
    const value = snapshot()
    if (value.turn?.status === "failed" || value.last?.status === "failed") return "tm-pill-dot tm-pill-dot-danger"
    if (value.turn?.status === "interrupted") return "tm-pill-dot tm-pill-dot-warning"
    if (value.current?.status === "stream-ended") return "tm-pill-dot tm-pill-dot-tools"
    return "tm-pill-dot"
  }

  const onClick = () => {
    const action = pill().clickAction
    if (action === "none") return
    if (action === "settings") {
      ctx.layout.settings("token-monitor")
      return
    }
    if (action === "open") {
      ctx.layout.open(`${ctx.id}:monitor`, props.session, { background: true })
      return
    }
    ctx.layout.toggle(`${ctx.id}:monitor`, props.session)
  }

  const control = () => (
    <button
      type="button"
      class="tm-pill"
      aria-label={ctx.t("header.title")}
      onClick={onClick}
    >
      <Show when={pill().showIcon}>
        <ctx.ui.Icon name="window-analytics" size="small" />
      </Show>
      <span class="tm-pill-segments">
        <For each={visibleSegments()}>
          {(segment, index) => (
            <>
              <Show when={index() > 0}>
                <span class="tm-pill-sep">·</span>
              </Show>
              <span class={segmentClass(segment.id)}>{segment.text}</span>
            </>
          )}
        </For>
      </span>
      <Show when={pill().showLiveDot && snapshot().active}>
        <span class={dotClass()} />
      </Show>
    </button>
  )

  return pill().showTooltip ? (
    <ctx.ui.Tooltip value={tooltip()} placement="bottom">
      {control()}
    </ctx.ui.Tooltip>
  ) : (
    control()
  )
}
