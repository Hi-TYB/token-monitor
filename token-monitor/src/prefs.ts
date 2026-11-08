import { Schema } from "effect"

export type PriceEntry = {
  providerID: string
  modelID: string
  input: number
  output: number
  cacheRead: number
  cacheWrite: number
}

export type PillConfig = {
  preset: string
  segments: string[]
  maxSegments: number
  compactSegments: number
  showIcon: boolean
  showUnits: boolean
  showLabels: boolean
  showLiveDot: boolean
  showTooltip: boolean
  contextTone: boolean
  clickAction: string
}

export type Prefs = {
  prices: PriceEntry[]
  priceMode: string
  tpsWindowMs: number
  showHeaderPill: boolean
  includeSubagents: boolean
  pill: PillConfig
}

export const PriceEntrySchema = Schema.Struct({
  providerID: Schema.String,
  modelID: Schema.String,
  input: Schema.Number,
  output: Schema.Number,
  cacheRead: Schema.Number,
  cacheWrite: Schema.Number,
})

export const PillSchema = Schema.Struct({
  preset: Schema.String,
  segments: Schema.Array(Schema.String),
  maxSegments: Schema.Number,
  compactSegments: Schema.Number,
  showIcon: Schema.Boolean,
  showUnits: Schema.Boolean,
  showLabels: Schema.Boolean,
  showLiveDot: Schema.Boolean,
  showTooltip: Schema.Boolean,
  contextTone: Schema.Boolean,
  clickAction: Schema.String,
})

export const PrefsSchema = Schema.Struct({
  prices: Schema.Array(PriceEntrySchema),
  priceMode: Schema.String,
  tpsWindowMs: Schema.Number,
  showHeaderPill: Schema.Boolean,
  includeSubagents: Schema.Boolean,
  // Older stores predate the pill settings. Keep the field optional so a
  // schema migration never discards the user's price table.
  pill: Schema.optional(PillSchema),
})

export const defaultPrefs: Prefs = {
  prices: [],
  priceMode: "custom-then-catalog",
  tpsWindowMs: 2000,
  showHeaderPill: true,
  includeSubagents: false,
  pill: {
    preset: "standard",
    segments: ["context", "tps", "turnCost"],
    maxSegments: 3,
    compactSegments: 2,
    showIcon: true,
    showUnits: true,
    showLabels: false,
    showLiveDot: true,
    showTooltip: true,
    contextTone: true,
    clickAction: "toggle",
  },
}
