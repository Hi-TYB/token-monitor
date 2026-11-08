export function formatTokens(value: number | undefined, locale: string): string {
  if (value === undefined || !Number.isFinite(value)) return "—"
  if (value < 1000) return String(Math.round(value))
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)
}

export function formatFullTokens(value: number | undefined, locale: string): string {
  if (value === undefined || !Number.isFinite(value)) return "—"
  return new Intl.NumberFormat(locale).format(Math.round(value))
}

export function formatTps(value: number | undefined): string {
  if (value === undefined || !Number.isFinite(value)) return "—"
  if (value >= 100) return value.toFixed(0)
  return value.toFixed(1)
}

export function formatTtft(value: number | undefined): string {
  if (value === undefined || !Number.isFinite(value)) return "—"
  if (value < 1000) return `${Math.round(value)} ms`
  return `${(value / 1000).toFixed(2)} s`
}

export function formatCost(
  value: number | undefined,
  source: "custom" | "catalog" | "none",
  locale: string,
): string {
  if (source === "none" || value === undefined || !Number.isFinite(value)) return "N/A"
  return formatUSD(value, locale)
}

export function formatUSD(value: number | undefined, locale: string): string {
  if (value === undefined || !Number.isFinite(value)) return "N/A"
  const digits = value > 0 && value < 0.01 ? 4 : 2
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value)
}

export function formatDuration(value: number | undefined): string {
  if (value === undefined || !Number.isFinite(value) || value < 0) return "—"
  if (value < 1000) return `${Math.round(value)} ms`
  if (value < 60_000) return `${(value / 1000).toFixed(value < 10_000 ? 1 : 0)} s`
  const minutes = Math.floor(value / 60_000)
  const seconds = Math.floor((value % 60_000) / 1000)
  return `${minutes}m ${seconds}s`
}

export function formatPercent(value: number | undefined): string {
  if (value === undefined || !Number.isFinite(value)) return "—"
  return `${value.toFixed(value < 10 ? 1 : 0)}%`
}

export function formatInt(value: number | undefined, locale: string): string {
  if (value === undefined || !Number.isFinite(value)) return "—"
  return new Intl.NumberFormat(locale).format(Math.round(value))
}
