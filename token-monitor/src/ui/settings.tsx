import { For, Show, createEffect, createSignal } from "solid-js"
import type { Prefs, PriceEntry } from "../prefs"
import { defaultPrefs } from "../prefs"
import {
  PILL_PRESETS,
  PILL_SEGMENTS,
  resolvePillSegments,
  segmentLabelKey,
  type PillSegment,
} from "../pill/segments"

type PillBoolKey =
  | "showIcon"
  | "showUnits"
  | "showLabels"
  | "showLiveDot"
  | "showTooltip"
  | "contextTone"

const PREVIEW: Record<PillSegment, string> = {
  context: "43%",
  tps: "27.3",
  ttft: "820 ms",
  turnCost: "$0.012",
  turnTokens: "12.4k",
  cacheHit: "68%",
  model: "sonnet-4.5",
  status: "streaming",
  steps: "3",
  elapsed: "12 s",
  sessionTokens: "432k",
  sessionCost: "$0.84",
}

function numberValue(value: string): number {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function NumberField(props: {
  label: string
  value: number
  placeholder?: string
  onCommit: (value: number) => void
}) {
  const [text, setText] = createSignal(String(props.value))

  createEffect(() => {
    setText(String(props.value))
  })

  const commit = () => {
    const parsed = Number(text())
    if (!Number.isFinite(parsed)) {
      setText(String(props.value))
      return
    }
    props.onCommit(parsed)
  }

  return (
    <input
      class="tm-number"
      type="text"
      inputmode="decimal"
      aria-label={props.label}
      placeholder={props.placeholder}
      value={text()}
      onInput={(event) => setText(event.currentTarget.value)}
      onBlur={commit}
      onKeyDown={(event) => {
        if (event.key === "Enter") event.currentTarget.blur()
      }}
    />
  )
}

export function SettingsView(props: { ctx: any }) {
  const ctx = props.ctx
  const prefs = ctx.stores.prefs
  const value = () => prefs.value
  const update = (fn: (draft: Prefs) => void) =>
    prefs.update((draft: Prefs) => {
      if (!draft.pill) {
        draft.pill = { ...defaultPrefs.pill, segments: [...defaultPrefs.pill.segments] }
      }
      fn(draft)
    })
  const pill = () => value().pill ?? defaultPrefs.pill

  const updatePrice = (index: number, key: keyof PriceEntry, input: string) => {
    update((draft) => {
      const row = draft.prices[index]
      if (!row) return
      if (key === "providerID" || key === "modelID") row[key] = input
      else row[key] = numberValue(input)
    })
  }

  const addPrice = () => {
    update((draft) => {
      draft.prices.push({
        providerID: "",
        modelID: "",
        input: 0,
        output: 0,
        cacheRead: 0,
        cacheWrite: 0,
      })
    })
  }

  const removePrice = (index: number) => {
    update((draft) => {
      draft.prices.splice(index, 1)
    })
  }

  const resetPrices = () => {
    update((draft) => {
      draft.prices.splice(0, draft.prices.length)
    })
  }

  const importCatalog = () => {
    const session = ctx.sessions.current()
    if (!session) {
      ctx.toast.show({ variant: "default", title: ctx.t("settings.noSession") })
      return
    }

    const models = session.server.data?.location?.model?.list?.(session.location) ?? []
    if (models.length === 0) {
      ctx.toast.show({ variant: "default", title: ctx.t("settings.noModels") })
      return
    }

    update((draft) => {
      const existing = new Set(draft.prices.map((entry) => `${entry.providerID}/${entry.modelID}`))
      for (const model of models) {
        const id = model?.modelID ?? model?.id
        if (!model?.providerID || !id) continue
        const key = `${model.providerID}/${id}`
        if (existing.has(key)) continue
        const cost =
          (model.cost ?? []).find((entry: any) => entry?.tier === undefined) ??
          (model.cost ?? [])[0]
        if (!cost) continue
        draft.prices.push({
          providerID: model.providerID,
          modelID: id,
          input: Number(cost.input) || 0,
          output: Number(cost.output) || 0,
          cacheRead: Number(cost.cache?.read) || 0,
          cacheWrite: Number(cost.cache?.write) || 0,
        })
        existing.add(key)
      }
    })

    ctx.toast.show({ variant: "success", title: ctx.t("settings.imported") })
  }

  const setPreset = (preset: string) => {
    update((draft) => {
      draft.pill.preset = preset
      const segments = PILL_PRESETS[preset]
      if (segments) draft.pill.segments = [...segments]
    })
  }

  const currentSegments = () => resolvePillSegments(pill())
  const selected = (segment: PillSegment) => currentSegments().includes(segment)
  const segmentIndex = (segment: PillSegment) => currentSegments().indexOf(segment)

  const toggleSegment = (segment: PillSegment, checked: boolean) => {
    update((draft) => {
      const current = resolvePillSegments(draft.pill)
      const next = checked
        ? current.includes(segment)
          ? current
          : [...current, segment]
        : current.filter((item) => item !== segment)
      draft.pill.preset = "custom"
      draft.pill.segments = next
    })
  }

  const moveSegment = (segment: PillSegment, direction: -1 | 1) => {
    update((draft) => {
      const current = [...resolvePillSegments(draft.pill)]
      const index = current.indexOf(segment)
      const target = index + direction
      if (index < 0 || target < 0 || target >= current.length) return
      current.splice(index, 1)
      current.splice(target, 0, segment)
      draft.pill.preset = "custom"
      draft.pill.segments = current
    })
  }

  const setPillBool = (key: PillBoolKey, checked: boolean) => {
    update((draft) => {
      draft.pill[key] = checked
    })
  }

  const setClickAction = (action: string) => {
    update((draft) => {
      draft.pill.clickAction = action
    })
  }

  const previewText = (segment: PillSegment) => {
    const label = pill().showLabels ? `${ctx.t(segmentLabelKey(segment))} ` : ""
    const unit = segment === "tps" && pill().showUnits ? " tok/s" : ""
    return `${label}${PREVIEW[segment]}${unit}`
  }

  const previewSegments = () => {
    const all = resolvePillSegments(pill())
    const count = Math.max(1, Math.min(6, Math.round(pill().maxSegments)))
    return all.slice(0, count)
  }

  return (
    <ctx.ui.SettingsLayout
      title={ctx.t("settings.title")}
      description={ctx.t("settings.description")}
      actions={
        <ctx.ui.Button variant="neutral" size="small" icon="download" onClick={importCatalog}>
          {ctx.t("settings.import")}
        </ctx.ui.Button>
      }
    >
      <ctx.ui.SettingsSection title={ctx.t("settings.behavior")}>
        <ctx.ui.SettingsRow
          id="behavior"
          title={ctx.t("settings.priceMode")}
          description={ctx.t("settings.priceMode.description")}
        >
          <ctx.ui.Select
            label={ctx.t("settings.priceMode")}
            value={value().priceMode}
            onChange={(priceMode: string) =>
              update((draft) => {
                draft.priceMode = priceMode
              })
            }
            options={[
              { value: "custom-then-catalog", label: ctx.t("settings.priceMode.fallback") },
              { value: "custom", label: ctx.t("settings.priceMode.custom") },
            ]}
          />
        </ctx.ui.SettingsRow>

        <ctx.ui.SettingsRow
          title={ctx.t("settings.window")}
          description={ctx.t("settings.window.description")}
        >
          <div class="tm-setting-input">
            <NumberField
              label={ctx.t("settings.window")}
              value={value().tpsWindowMs}
              onCommit={(input) =>
                update((draft) => {
                  draft.tpsWindowMs = Math.max(500, Math.min(15_000, input))
                })
              }
            />
            <span class="tm-muted">ms</span>
          </div>
        </ctx.ui.SettingsRow>

        <ctx.ui.SettingsRow
          title={ctx.t("settings.subagents")}
          description={ctx.t("settings.subagents.description")}
        >
          <ctx.ui.Switch
            label={ctx.t("settings.subagents")}
            hideLabel
            checked={value().includeSubagents}
            onChange={(checked: boolean) =>
              update((draft) => {
                draft.includeSubagents = checked
              })
            }
          />
        </ctx.ui.SettingsRow>
      </ctx.ui.SettingsSection>

      <ctx.ui.SettingsSection title={ctx.t("settings.pill")}>
        <ctx.ui.SettingsRow
          title={ctx.t("settings.headerPill")}
          description={ctx.t("settings.headerPill.description")}
        >
          <ctx.ui.Switch
            label={ctx.t("settings.headerPill")}
            hideLabel
            checked={value().showHeaderPill}
            onChange={(checked: boolean) =>
              update((draft) => {
                draft.showHeaderPill = checked
              })
            }
          />
        </ctx.ui.SettingsRow>

        <ctx.ui.SettingsRow
          id="pill"
          title={ctx.t("settings.pill.preset")}
          description={ctx.t("settings.pill.preset.description")}
        >
          <ctx.ui.Select
            label={ctx.t("settings.pill.preset")}
            value={pill().preset}
            onChange={setPreset}
            options={[
              { value: "minimal", label: ctx.t("settings.pill.preset.minimal") },
              { value: "standard", label: ctx.t("settings.pill.preset.standard") },
              { value: "power", label: ctx.t("settings.pill.preset.power") },
              { value: "custom", label: ctx.t("settings.pill.preset.custom") },
            ]}
          />
        </ctx.ui.SettingsRow>

        <ctx.ui.SettingsRow
          id="pill-preview"
          title={ctx.t("settings.pill.preview")}
          description={ctx.t("settings.pill.preview.description")}
        >
          <div class="tm-pill tm-pill-preview">
            <Show when={pill().showIcon}>
              <ctx.ui.Icon name="window-analytics" size="small" />
            </Show>
            <span class="tm-pill-segments">
              <For each={previewSegments()}>
                {(segment, index) => (
                  <>
                    <Show when={index() > 0}>
                      <span class="tm-pill-sep">{"\u00b7"}</span>
                    </Show>
                    <span>{previewText(segment)}</span>
                  </>
                )}
              </For>
            </span>
            <Show when={pill().showLiveDot}>
              <span class="tm-pill-dot" />
            </Show>
          </div>
        </ctx.ui.SettingsRow>

        <ctx.ui.SettingsRow
          title={ctx.t("settings.pill.max")}
          description={ctx.t("settings.pill.max.description")}
        >
          <NumberField
            label={ctx.t("settings.pill.max")}
            value={pill().maxSegments}
            onCommit={(input) =>
              update((draft) => {
                draft.pill.maxSegments = Math.max(1, Math.min(6, Math.round(input)))
              })
            }
          />
        </ctx.ui.SettingsRow>

        <ctx.ui.SettingsRow
          title={ctx.t("settings.pill.compact")}
          description={ctx.t("settings.pill.compact.description")}
        >
          <NumberField
            label={ctx.t("settings.pill.compact")}
            value={pill().compactSegments}
            onCommit={(input) =>
              update((draft) => {
                draft.pill.compactSegments = Math.max(1, Math.min(4, Math.round(input)))
              })
            }
          />
        </ctx.ui.SettingsRow>

        <ctx.ui.SettingsRow title={ctx.t("settings.pill.icon")}>
          <ctx.ui.Switch
            label={ctx.t("settings.pill.icon")}
            hideLabel
            checked={pill().showIcon}
            onChange={(checked: boolean) => setPillBool("showIcon", checked)}
          />
        </ctx.ui.SettingsRow>

        <ctx.ui.SettingsRow title={ctx.t("settings.pill.units")}>
          <ctx.ui.Switch
            label={ctx.t("settings.pill.units")}
            hideLabel
            checked={pill().showUnits}
            onChange={(checked: boolean) => setPillBool("showUnits", checked)}
          />
        </ctx.ui.SettingsRow>

        <ctx.ui.SettingsRow title={ctx.t("settings.pill.labels")}>
          <ctx.ui.Switch
            label={ctx.t("settings.pill.labels")}
            hideLabel
            checked={pill().showLabels}
            onChange={(checked: boolean) => setPillBool("showLabels", checked)}
          />
        </ctx.ui.SettingsRow>

        <ctx.ui.SettingsRow title={ctx.t("settings.pill.liveDot")}>
          <ctx.ui.Switch
            label={ctx.t("settings.pill.liveDot")}
            hideLabel
            checked={pill().showLiveDot}
            onChange={(checked: boolean) => setPillBool("showLiveDot", checked)}
          />
        </ctx.ui.SettingsRow>

        <ctx.ui.SettingsRow title={ctx.t("settings.pill.tooltip")}>
          <ctx.ui.Switch
            label={ctx.t("settings.pill.tooltip")}
            hideLabel
            checked={pill().showTooltip}
            onChange={(checked: boolean) => setPillBool("showTooltip", checked)}
          />
        </ctx.ui.SettingsRow>

        <ctx.ui.SettingsRow title={ctx.t("settings.pill.contextTone")}>
          <ctx.ui.Switch
            label={ctx.t("settings.pill.contextTone")}
            hideLabel
            checked={pill().contextTone}
            onChange={(checked: boolean) => setPillBool("contextTone", checked)}
          />
        </ctx.ui.SettingsRow>

        <ctx.ui.SettingsRow
          title={ctx.t("settings.pill.click")}
          description={ctx.t("settings.pill.click.description")}
        >
          <ctx.ui.Select
            label={ctx.t("settings.pill.click")}
            value={pill().clickAction}
            onChange={setClickAction}
            options={[
              { value: "toggle", label: ctx.t("settings.pill.click.toggle") },
              { value: "open", label: ctx.t("settings.pill.click.open") },
              { value: "settings", label: ctx.t("settings.pill.click.settings") },
              { value: "none", label: ctx.t("settings.pill.click.none") },
            ]}
          />
        </ctx.ui.SettingsRow>

        <ctx.ui.SettingsRow
          title={ctx.t("settings.pill.segments")}
          description={ctx.t("settings.pill.segments.description")}
        >
          <span class="tm-muted">{ctx.t("settings.pill.segments.hint")}</span>
        </ctx.ui.SettingsRow>

        <For each={PILL_SEGMENTS}>
          {(segment) => (
            <ctx.ui.SettingsRow
              id={`pill-${segment}`}
              title={ctx.t(segmentLabelKey(segment))}
              description={ctx.t("settings.pill.segment.description")}
            >
              <div class="tm-segment-control">
                <Show when={selected(segment)}>
                  <span class="tm-segment-order">{segmentIndex(segment) + 1}</span>
                </Show>
                <button
                  type="button"
                  class="tm-order-button"
                  aria-label={ctx.t("settings.pill.up")}
                  disabled={!selected(segment) || segmentIndex(segment) <= 0}
                  onClick={() => moveSegment(segment, -1)}
                >
                  {"\u2191"}                </button>
                <button
                  type="button"
                  class="tm-order-button"
                  aria-label={ctx.t("settings.pill.down")}
                  disabled={
                    !selected(segment) ||
                    segmentIndex(segment) < 0 ||
                    segmentIndex(segment) >= currentSegments().length - 1
                  }
                  onClick={() => moveSegment(segment, 1)}
                >
                  {"\u2193"}                </button>
                <ctx.ui.Switch
                  label={ctx.t(segmentLabelKey(segment))}
                  hideLabel
                  checked={selected(segment)}
                  onChange={(checked: boolean) => toggleSegment(segment, checked)}
                />
              </div>
            </ctx.ui.SettingsRow>
          )}
        </For>
      </ctx.ui.SettingsSection>

      <ctx.ui.SettingsSection
        title={ctx.t("settings.prices")}
        footer={<p class="tm-muted tm-settings-note">{ctx.t("settings.priceNote")}</p>}
      >
        <div class="tm-settings-section-head">
          <p class="tm-muted">{ctx.t("settings.prices.description")}</p>
          <div class="tm-settings-actions">
            <ctx.ui.Button variant="neutral" size="small" icon="plus" onClick={addPrice}>
              {ctx.t("settings.add")}
            </ctx.ui.Button>
            <ctx.ui.Button variant="ghost" size="small" icon="trash" onClick={resetPrices}>
              {ctx.t("settings.clear")}
            </ctx.ui.Button>
          </div>
        </div>

        <div class="tm-price-head">
          <span>{ctx.t("settings.provider")}</span>
          <span>{ctx.t("settings.model")}</span>
          <span>{ctx.t("settings.input")}</span>
          <span>{ctx.t("settings.output")}</span>
          <span>{ctx.t("settings.cacheRead")}</span>
          <span>{ctx.t("settings.cacheWrite")}</span>
          <span />
        </div>

        <For each={value().prices} fallback={<div class="tm-muted tm-empty">{ctx.t("settings.empty")}</div>}>
          {(row, index) => (
            <div class="tm-price-row">
              <ctx.ui.TextInput
                label={ctx.t("settings.provider")}
                value={row.providerID}
                placeholder="anthropic"
                onInput={(input: string) => updatePrice(index(), "providerID", input)}
              />
              <ctx.ui.TextInput
                label={ctx.t("settings.model")}
                value={row.modelID}
                placeholder="claude-sonnet-4-5"
                onInput={(input: string) => updatePrice(index(), "modelID", input)}
              />
              <NumberField
                label={ctx.t("settings.input")}
                value={row.input}
                onCommit={(input) => updatePrice(index(), "input", String(input))}
              />
              <NumberField
                label={ctx.t("settings.output")}
                value={row.output}
                onCommit={(input) => updatePrice(index(), "output", String(input))}
              />
              <NumberField
                label={ctx.t("settings.cacheRead")}
                value={row.cacheRead}
                onCommit={(input) => updatePrice(index(), "cacheRead", String(input))}
              />
              <NumberField
                label={ctx.t("settings.cacheWrite")}
                value={row.cacheWrite}
                onCommit={(input) => updatePrice(index(), "cacheWrite", String(input))}
              />
              <ctx.ui.IconButton
                icon="trash"
                label={ctx.t("settings.remove")}
                variant="ghost-muted"
                size="small"
                onClick={() => removePrice(index())}
              />
            </div>
          )}
        </For>
      </ctx.ui.SettingsSection>
    </ctx.ui.SettingsLayout>
  )
}

