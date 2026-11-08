import type { Component } from "solid-js"

export const ContextRing: Component<{
  pct: number | undefined
  used: number
  max: number | undefined
  label: string
  pending?: boolean
}> = (props) => {
  const radius = 15
  const circumference = 2 * Math.PI * radius
  const pct = () => (props.pct === undefined ? 0 : Math.max(0, Math.min(100, props.pct)))
  const offset = () => circumference * (1 - pct() / 100)
  const tone = () => {
    if (props.pct === undefined) return "tm-ring-muted"
    if (props.pct >= 95) return "tm-ring-danger"
    if (props.pct >= 80) return "tm-ring-warning"
    return "tm-ring-normal"
  }

  return (
    <div class="tm-ring-wrap" title={props.label}>
      <svg class="tm-ring" viewBox="0 0 36 36" aria-hidden="true">
        <circle class="tm-ring-bg" cx="18" cy="18" r={radius} />
        <circle
          class={`tm-ring-fg ${tone()}`}
          cx="18"
          cy="18"
          r={radius}
          stroke-dasharray={`${circumference} ${circumference}`}
          stroke-dashoffset={offset()}
        />
      </svg>
      <div class="tm-ring-copy">
        <span class="tm-ring-value">{props.pct === undefined ? "—" : `${Math.round(props.pct)}%`}</span>
        <span class="tm-ring-sub">{props.pending ? "…" : "ctx"}</span>
      </div>
    </div>
  )
}
