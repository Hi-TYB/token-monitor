import type { Component } from "solid-js"

export const Sparkline: Component<{ values: number[] }> = (props) => {
  const points = () => {
    const values = props.values.filter((value) => Number.isFinite(value))
    if (values.length < 2) return ""
    const max = Math.max(1, ...values)
    return values
      .map((value, index) => {
        const x = (index / (values.length - 1)) * 100
        const y = 26 - Math.min(1, Math.max(0, value / max)) * 24
        return `${x.toFixed(2)},${y.toFixed(2)}`
      })
      .join(" ")
  }

  return (
    <svg class="tm-spark" viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true">
      <line class="tm-spark-baseline" x1="0" y1="26" x2="100" y2="26" />
      <polyline class="tm-spark-line" points={points()} />
    </svg>
  )
}
