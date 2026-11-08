import { For, Show, createMemo } from "solid-js"
import { totalTokens } from "../engine/types"
import { findModel, sessionCost, sessionTokens } from "./context"
import { costForStep, costForSteps } from "./cost"
import { ContextRing } from "./context-ring"
import { formatCost, formatFullTokens, formatPercent, formatTokens, formatTps, formatTtft, formatUSD } from "./format"
import { Sparkline } from "./sparkline"
import { useSessionEngine } from "./use-engine"
import { versionWarning as versionMismatch } from "../version"

export function TokenPanel(props: { ctx: any; session: any }) {
  return (
    <Show keyed when={props.session.key}>
      {(_key) => <Monitor ctx={props.ctx} session={props.session} />}
    </Show>
  )
}

function Monitor(props: { ctx: any; session: any }) {
  const ctx = props.ctx
  const session = props.session
  const { snapshot, context, data } = useSessionEngine(ctx, session)

  const prefs = () => ctx.stores.prefs.value
  const locale = () => ctx.locale.locale()
  const sessionTokenCounts = createMemo(() => {
    return sessionTokens(data(), session, prefs().includeSubagents)
  })
  const sessionCostValue = createMemo(() => {
    return sessionCost(data(), session)
  })
  const catalog = createMemo(() => data()?.location?.model?.list?.(session.location) ?? [])

  const stepView = () => snapshot().current ?? snapshot().last
  const stepIsLive = () => {
    const step = stepView()
    return !!step && !step.exact
  }
  const modelName = () => {
    const ref = stepView()?.model ?? data()?.session?.get?.(session.id)?.model
    return findModel(catalog(), ref)?.name ?? ref?.id ?? ctx.t("unknown")
  }

  const status = () => {
    const value = snapshot()
    if (value.compacting) return ctx.t("status.compacting")
    if (value.current?.status === "stream-ended") return ctx.t("status.tools")
    if (value.current?.status === "streaming") return ctx.t("status.streaming")
    if (value.turn?.status === "failed" || value.last?.status === "failed") return ctx.t("status.failed")
    if (value.turn?.status === "interrupted") return ctx.t("status.interrupted")
    if (value.active) return ctx.t("status.running")
    return ctx.t("status.idle")
  }

  const statusTone = () => {
    const value = snapshot()
    if (value.turn?.status === "failed" || value.last?.status === "failed") return "tm-status-danger"
    if (value.turn?.status === "interrupted") return "tm-status-warning"
    if (value.active || value.compacting) return "tm-status-live"
    return "tm-status-idle"
  }

  const tpsTag = () => {
    const kind = snapshot().tpsKind
    if (kind === "exact") return ctx.t("tps.exact")
    if (kind === "estimate") return ctx.t("tps.estimate")
    if (kind === "frozen") return ctx.t("tps.frozen")
    return ctx.t("tps.none")
  }

  const tokenRows = createMemo(() => {
    const value = snapshot()
    const step = stepView()
    const tokens = value.stepTokens
    const live = !!step && !step.exact
    const text = (kind: "input" | "output" | "reasoning" | "cacheRead" | "cacheWrite") => {
      if (!step) return "—"
      if (live && (kind === "input" || kind === "cacheRead" || kind === "cacheWrite")) return "—"
      const raw = tokens[kind]
      return `${live ? "~" : ""}${formatTokens(raw, locale())}`
    }

    return [
      { id: "input", label: ctx.t("tokens.input"), value: text("input") },
      { id: "output", label: ctx.t("tokens.output"), value: text("output") },
      { id: "reasoning", label: ctx.t("tokens.reasoning"), value: text("reasoning") },
      { id: "cacheRead", label: ctx.t("tokens.cacheRead"), value: text("cacheRead") },
      { id: "cacheWrite", label: ctx.t("tokens.cacheWrite"), value: text("cacheWrite") },
    ]
  })

  const stepPrice = createMemo(() => {
    const value = snapshot()
    return costForStep(value.current ?? value.last, catalog(), prefs())
  })

  const turnPrice = createMemo(() => {
    return costForSteps(snapshot().turn?.steps ?? [], catalog(), prefs())
  })

  const contextLabel = () => {
    const value = context()
    if (!value.max) return ctx.t("context.unknown")
    return `${formatFullTokens(value.used, locale())} / ${formatFullTokens(value.max, locale())}`
  }

  const buildWarning = createMemo(() => versionMismatch(ctx.app.version))

  const stepTotal = () => totalTokens(snapshot().stepTokens)
  const turnTotal = () => totalTokens(snapshot().turnTokens)
  const sessionTotal = () => totalTokens(sessionTokenCounts())

  return (
    <div class="tm-panel">
      <div class="tm-top">
        <div class="tm-model" title={modelName()}>
          <ctx.ui.Icon name="window-analytics" size="normal" />
          <span class="tm-model-name">{modelName()}</span>
        </div>
        <div class={`tm-status ${statusTone()}`}>
          <span class="tm-dot" />
          <span>{status()}</span>
        </div>
      </div>

      <div class="tm-hero">
        <div class="tm-hero-main">
          <div class="tm-label">{ctx.t("tps.label")}</div>
          <div class="tm-big">
            <span>{formatTps(snapshot().tps)}</span>
            <span class="tm-unit">{ctx.t("tps.unit")}</span>
          </div>
          <div class={`tm-tag tm-tag-${snapshot().tpsKind}`}>{tpsTag()}</div>
        </div>
        <div class="tm-hero-chart">
          <Sparkline values={snapshot().history} />
        </div>
      </div>

      <div class="tm-metrics">
        <div class="tm-metric">
          <div class="tm-label">{ctx.t("ttft.label")}</div>
          <div class="tm-metric-value">{formatTtft(snapshot().ttftMs)}</div>
          <Show when={snapshot().retryCount > 0}>
            <div class="tm-muted">
              {ctx.t("ttft.retries", { count: snapshot().retryCount })}
            </div>
          </Show>
        </div>
        <div class="tm-metric tm-metric-context">
          <div class="tm-label">{ctx.t("context.label")}</div>
          <ContextRing
            pct={context().pct}
            used={context().used}
            max={context().max}
            label={contextLabel()}
            pending={snapshot().active}
          />
          <div class="tm-muted tm-context-label">{contextLabel()}</div>
        </div>
      </div>

      <div class="tm-section">
        <div class="tm-section-head">
          <span>{ctx.t("tokens.title")}</span>
          <span class="tm-muted">{ctx.t("tokens.hint")}</span>
        </div>
        <div class="tm-token-grid">
          <For each={tokenRows()}>
            {(row) => (
              <div class="tm-token-row">
                <span class="tm-muted">{row.label}</span>
                <span class={stepIsLive() && row.id === "output" ? "tm-token-live" : ""}>{row.value}</span>
              </div>
            )}
          </For>
        </div>
      </div>

      <div class="tm-section">
        <div class="tm-section-head">
          <span>{ctx.t("totals.title")}</span>
          <span class="tm-muted">{ctx.t("totals.unit")}</span>
        </div>
        <div class="tm-totals">
          <div class="tm-total">
            <span class="tm-muted">{ctx.t("totals.step")}</span>
            <strong>{formatTokens(stepTotal(), locale())}</strong>
          </div>
          <div class="tm-total">
            <span class="tm-muted">{ctx.t("totals.turn")}</span>
            <strong>{formatTokens(turnTotal(), locale())}</strong>
          </div>
          <div class="tm-total">
            <span class="tm-muted">{ctx.t("totals.session")}</span>
            <strong>{formatTokens(sessionTotal(), locale())}</strong>
          </div>
        </div>
      </div>

      <div class="tm-section">
        <div class="tm-section-head">
          <span>{ctx.t("cost.title")}</span>
          <span class="tm-muted">{ctx.t("cost.unit")}</span>
        </div>
        <div class="tm-costs">
          <div class="tm-cost-row">
            <span class="tm-muted">{ctx.t("cost.step")}</span>
            <span>{stepIsLive() ? "~" : ""}{formatCost(stepPrice().amount, stepPrice().source, locale())}</span>
          </div>
          <div class="tm-cost-row">
            <span class="tm-muted">{ctx.t("cost.turn")}</span>
            <span>{snapshot().active ? "~" : ""}{formatCost(turnPrice().amount, turnPrice().source, locale())}</span>
          </div>
          <div class="tm-cost-row">
            <span class="tm-muted">{ctx.t("cost.session")}</span>
            <span>{formatUSD(sessionCostValue(), locale())}</span>
          </div>
        </div>
        <div class="tm-muted tm-cost-note">{ctx.t("cost.note")}</div>
      </div>

      <Show when={buildWarning()}>
        {(value) => {
          const [built, current] = value().split("|")
          return (
            <div class="tm-version-warn">
              {ctx.t("version.warning", { built, current })}
            </div>
          )
        }}
      </Show>

      <div class="tm-footer">
        <span class="tm-muted">{ctx.t("footer.local")}</span>
        <ctx.ui.Button
          variant="ghost"
          size="small"
          icon="settings-gear"
          onClick={() => ctx.layout.settings("token-monitor")}
        >
          {ctx.t("footer.settings")}
        </ctx.ui.Button>
      </div>
    </div>
  )
}
