export const CSS = `
.tm-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  color: inherit;
  font-size: 12px;
  line-height: 1.45;
}
.tm-top, .tm-section-head, .tm-footer, .tm-cost-row, .tm-token-row, .tm-setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.tm-model {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}
.tm-model-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
}
.tm-status {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  flex: none;
  font-size: 11px;
  opacity: .8;
}
.tm-dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: currentColor;
  opacity: .5;
}
.tm-status-live .tm-dot {
  background: #22c55e;
  opacity: 1;
  animation: tm-pulse 1.4s ease-in-out infinite;
}
.tm-status-danger { color: #ef4444; }
.tm-status-warning { color: #f59e0b; }
.tm-status-idle { opacity: .62; }
@keyframes tm-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: .35; transform: scale(.8); }
}
.tm-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px;
  border: 1px solid rgba(127, 127, 127, .22);
  border-radius: 10px;
  background: rgba(127, 127, 127, .055);
}
.tm-hero-main { min-width: 0; }
.tm-hero-chart { width: 44%; height: 32px; flex: none; }
.tm-label {
  font-size: 10px;
  letter-spacing: .04em;
  text-transform: uppercase;
  opacity: .62;
}
.tm-big {
  display: flex;
  align-items: baseline;
  gap: 4px;
  font-size: 30px;
  font-weight: 650;
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
}
.tm-unit { font-size: 11px; font-weight: 400; opacity: .6; }
.tm-tag {
  display: inline-block;
  margin-top: 4px;
  padding: 1px 6px;
  border-radius: 999px;
  font-size: 10px;
  background: rgba(127, 127, 127, .14);
  opacity: .8;
}
.tm-tag-estimate { color: #f59e0b; }
.tm-tag-exact { color: #22c55e; }
.tm-tag-frozen { color: #3b82f6; }
.tm-spark { width: 100%; height: 28px; overflow: visible; color: inherit; opacity: .8; }
.tm-spark-baseline { stroke: currentColor; stroke-opacity: .14; stroke-width: 1; }
.tm-spark-line { fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linejoin: round; stroke-linecap: round; }
.tm-metrics {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 8px;
}
.tm-metric {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-height: 66px;
  padding: 8px;
  border: 1px solid rgba(127, 127, 127, .18);
  border-radius: 9px;
}
.tm-metric-context { align-items: flex-start; }
.tm-metric-value {
  font-size: 18px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.tm-ring-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
}
.tm-ring { width: 44px; height: 44px; transform: rotate(-90deg); flex: none; }
.tm-ring-bg { fill: none; stroke: rgba(127, 127, 127, .22); stroke-width: 3; }
.tm-ring-fg {
  fill: none;
  stroke: #3b82f6;
  stroke-width: 3;
  stroke-linecap: round;
  transition: stroke-dashoffset .25s ease;
}
.tm-ring-fg.tm-ring-warning { stroke: #f59e0b; }
.tm-ring-fg.tm-ring-danger { stroke: #ef4444; }
.tm-ring-fg.tm-ring-muted { stroke: rgba(127, 127, 127, .35); }
.tm-ring-copy { display: flex; flex-direction: column; }
.tm-ring-value { font-size: 17px; font-weight: 650; font-variant-numeric: tabular-nums; }
.tm-ring-sub { font-size: 10px; opacity: .55; }
.tm-context-label { font-size: 10px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.tm-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-top: 10px;
  border-top: 1px solid rgba(127, 127, 127, .16);
}
.tm-section-head { font-weight: 600; }
.tm-section-head .tm-muted { font-weight: 400; font-size: 10px; }
.tm-muted { opacity: .58; }
.tm-token-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px 14px;
}
.tm-token-row { font-variant-numeric: tabular-nums; }
.tm-token-live { color: #f59e0b; }
.tm-totals { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
.tm-total {
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding: 7px 8px;
  border-radius: 8px;
  background: rgba(127, 127, 127, .06);
}
.tm-total strong { font-size: 15px; font-variant-numeric: tabular-nums; }
.tm-costs { display: flex; flex-direction: column; gap: 3px; }
.tm-cost-row { font-variant-numeric: tabular-nums; }
.tm-cost-note { font-size: 10px; line-height: 1.4; }
.tm-footer {
  padding-top: 10px;
  border-top: 1px solid rgba(127, 127, 127, .16);
  font-size: 10px;
}
.tm-version-warn {
  padding: 7px 8px;
  border: 1px solid rgba(245, 158, 11, .45);
  border-radius: 7px;
  color: #b45309;
  background: rgba(245, 158, 11, .09);
  font-size: 10px;
  line-height: 1.4;
}
.tm-footer .tm-muted { max-width: 60%; }
.tm-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 24px;
  max-width: 100%;
  padding: 0 8px;
  border: 1px solid rgba(127, 127, 127, .28);
  border-radius: 999px;
  background: transparent;
  color: inherit;
  font-family: var(--font-family-sans, inherit);
  font-size: var(--font-size-small, 13px);
  font-weight: var(--font-weight-regular, 400);
  line-height: 1.2;
  letter-spacing: normal;
  cursor: pointer;
}
.tm-pill:hover { background: rgba(127, 127, 127, .1); }
.tm-pill-segments {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tm-pill-sep { opacity: .4; }
.tm-pill-warning { color: #f59e0b; }
.tm-pill-danger { color: #ef4444; }
.tm-pill-preview {
  pointer-events: none;
  border-style: dashed;
  opacity: .9;
}
.tm-pill-tip {
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 240px;
  max-width: 320px;
  font-family: var(--font-family-sans, inherit);
  font-size: var(--font-size-small, 13px);
  line-height: 1.4;
}
.tm-pill-tip-title {
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tm-pill-tip-grid {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 3px 10px;
}
.tm-pill-tip-grid > :nth-child(odd) { opacity: .58; }
.tm-pill-tip-grid > :nth-child(even) {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
.tm-pill-dot {
  width: 5px;
  height: 5px;
  margin-left: 1px;
  border-radius: 999px;
  background: #22c55e;
  animation: tm-pulse 1.4s ease-in-out infinite;
}
.tm-pill-dot-tools { background: #3b82f6; }
.tm-pill-dot-warning { background: #f59e0b; }
.tm-pill-dot-danger { background: #ef4444; }
.tm-segment-control {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}
.tm-segment-order {
  min-width: 18px;
  padding: 0 4px;
  border-radius: 999px;
  background: rgba(127, 127, 127, .12);
  font-size: 10px;
  text-align: center;
  opacity: .8;
}
.tm-order-button {
  width: 22px;
  height: 22px;
  padding: 0;
  border: 1px solid rgba(127, 127, 127, .24);
  border-radius: 5px;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 11px;
  line-height: 1;
  cursor: pointer;
}
.tm-order-button:hover:not(:disabled) { background: rgba(127, 127, 127, .1); }
.tm-order-button:disabled { opacity: .28; cursor: default; }
.tm-settings {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 880px;
  padding: 18px;
  color: inherit;
  font-size: 13px;
}
.tm-settings-head, .tm-settings-section-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}
.tm-settings h2 { margin: 0 0 4px; font-size: 18px; }
.tm-settings h3 { margin: 0 0 4px; font-size: 14px; }
.tm-settings p { margin: 0; }
.tm-settings-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 16px;
  border-top: 1px solid rgba(127, 127, 127, .16);
}
.tm-setting-row {
  align-items: flex-start;
  padding: 8px 0;
}
.tm-setting-row > div:first-child { max-width: 65%; }
.tm-setting-input { display: flex; align-items: center; gap: 6px; min-width: 160px; }
.tm-setting-input > :first-child { flex: 1; }
.tm-select {
  height: 28px;
  max-width: 220px;
  padding: 0 8px;
  border: 1px solid rgba(127, 127, 127, .28);
  border-radius: 6px;
  background: transparent;
  color: inherit;
  font: inherit;
}
.tm-number {
  width: 100%;
  height: 28px;
  min-width: 0;
  padding: 0 8px;
  border: 1px solid rgba(127, 127, 127, .28);
  border-radius: 6px;
  background: transparent;
  color: inherit;
  font: inherit;
  font-variant-numeric: tabular-nums;
}
.tm-number:focus {
  outline: 1px solid currentColor;
  outline-offset: 1px;
}
.tm-settings-actions { display: flex; gap: 6px; flex: none; }
.tm-settings-section-head { padding: 8px 12px 0; }
.tm-price-head, .tm-price-row {
  display: grid;
  grid-template-columns: 1.1fr 1.3fr repeat(4, .72fr) 30px;
  gap: 6px;
  align-items: center;
  padding-left: 12px;
  padding-right: 12px;
}
.tm-price-head { font-size: 10px; opacity: .58; padding-top: 8px; padding-bottom: 2px; }
.tm-price-row { padding-top: 2px; padding-bottom: 2px; }
.tm-empty { padding: 14px 0; }
.tm-settings-note { font-size: 11px; }
@media (max-width: 720px) {
  .tm-metrics, .tm-token-grid, .tm-totals { grid-template-columns: 1fr 1fr; }
  .tm-price-head, .tm-price-row { grid-template-columns: 1fr 1fr repeat(2, .7fr) 28px; }
  .tm-price-head span:nth-child(5), .tm-price-head span:nth-child(6),
  .tm-price-row > :nth-child(5), .tm-price-row > :nth-child(6) { display: none; }
}
`
