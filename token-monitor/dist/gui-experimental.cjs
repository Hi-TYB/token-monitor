"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const n=require("solid-js/web"),F=require("@opencode/plugin/gui"),w=require("effect"),h=require("solid-js"),xe=require("@opencode/client/solid"),be={"command.open":"Open Token Monitor","command.open.description":"Show live TPS, TTFT, tokens, cost and context usage","command.settings":"Token Monitor Settings","menu.open":"Token Monitor","panel.title":"Tokens","header.title":"Token Monitor",unknown:"Unknown model",noSession:"Open a session first","status.compacting":"Compacting","status.tools":"Running tools","status.streaming":"Streaming","status.failed":"Failed","status.interrupted":"Interrupted","status.running":"Running","status.idle":"Idle","tps.label":"TPS","tps.unit":"tok/s","tps.exact":"exact","tps.estimate":"estimated","tps.frozen":"stream ended","tps.none":"no data","ttft.label":"TTFT","ttft.retries":"{{count}} retries","context.label":"Context","context.unknown":"Unknown limit","tokens.title":"This step","tokens.hint":"input / output / reasoning / cache","tokens.input":"Input","tokens.output":"Output","tokens.reasoning":"Reasoning","tokens.cacheRead":"Cache read","tokens.cacheWrite":"Cache write","totals.title":"Totals","totals.unit":"tokens","totals.step":"Step","totals.turn":"Turn","totals.session":"Session","cost.title":"Cost","cost.unit":"USD","cost.step":"Step","cost.turn":"Turn estimate","cost.session":"Session (server)","cost.note":"Estimates use your price table or the model catalog. Server cost includes subagent sessions.","footer.local":"Local estimate · no data leaves this app","footer.settings":"Settings","version.warning":"Built for OpenCode {{built}}, running {{current}}. Rebuild the plugin after upgrading.","settings.title":"Token Monitor","settings.description":"Live token, speed, cost and context metrics for each session.","settings.import":"Import from catalog","settings.noSession":"Open a session to import its model catalog","settings.noModels":"No models are loaded for the current session","settings.imported":"Model prices imported","settings.behavior":"Behavior","settings.priceMode":"Price fallback","settings.priceMode.description":"Use your table first, then the model catalog when no entry exists.","settings.priceMode.fallback":"Custom, then catalog","settings.priceMode.custom":"Custom only","settings.window":"TPS window","settings.window.description":"Rolling window used for the live estimate.","settings.headerPill":"Header pill","settings.headerPill.description":"Show context usage in the session header.","settings.subagents":"Include subagents","settings.subagents.description":"Include child session tokens in the session total.","settings.prices":"Model prices","settings.prices.description":"USD per 1M tokens. Leave a row empty to show N/A for that model.","settings.add":"Add row","settings.clear":"Clear","settings.provider":"Provider","settings.model":"Model","settings.input":"Input","settings.output":"Output","settings.cacheRead":"Cache R","settings.cacheWrite":"Cache W","settings.remove":"Remove price","settings.empty":"No custom prices yet.","settings.priceNote":"Prices are per 1M tokens in USD. Reasoning is charged at the output price. Use * as a model wildcard.","pill.segment.context":"Context","pill.segment.tps":"TPS","pill.segment.ttft":"TTFT","pill.segment.turnCost":"Turn cost","pill.segment.turnTokens":"Turn tokens","pill.segment.cacheHit":"Cache hit","pill.segment.model":"Model","pill.segment.status":"Status","pill.segment.steps":"Steps","pill.segment.elapsed":"Elapsed","pill.segment.sessionTokens":"Session tokens","pill.segment.sessionCost":"Session cost","pill.steps":"{{count}} steps","pill.tip.context":"Context","pill.tip.tps":"TPS","pill.tip.ttft":"TTFT","pill.tip.step":"Step","pill.tip.turn":"Turn","pill.tip.session":"Session","pill.tip.cache":"Cache hit","pill.tip.status":"Status","settings.pill":"Header pill","settings.pill.preset":"Preset","settings.pill.preset.description":"Choose a quick layout, then fine-tune individual segments.","settings.pill.preset.minimal":"Minimal","settings.pill.preset.standard":"Standard","settings.pill.preset.power":"Power","settings.pill.preset.custom":"Custom","settings.pill.preview":"Preview","settings.pill.preview.description":"Uses sample values so you can see the current layout.","settings.pill.max":"Maximum segments","settings.pill.max.description":"How many segments the pill shows when the title has room.","settings.pill.compact":"Compact segments","settings.pill.compact.description":"How many segments remain when the title is tight.","settings.pill.icon":"Show icon","settings.pill.units":"Show units","settings.pill.labels":"Show labels","settings.pill.liveDot":"Show live dot","settings.pill.tooltip":"Show details on hover","settings.pill.contextTone":"Color context by usage","settings.pill.click":"Click action","settings.pill.click.description":"What happens when the pill is clicked.","settings.pill.click.toggle":"Toggle panel","settings.pill.click.open":"Open panel","settings.pill.click.settings":"Open settings","settings.pill.click.none":"Do nothing","settings.pill.segments":"Segments","settings.pill.segments.description":"Enable a segment, then move it into the order you want.","settings.pill.segments.hint":"Order follows this list.","settings.pill.segment.description":"Show this value in the header pill.","settings.pill.up":"Move up","settings.pill.down":"Move down"},Kt={"command.open":"打开 Token 监控","command.open.description":"显示实时 TPS、TTFT、Token、费用和上下文占用","command.settings":"Token 监控设置","menu.open":"Token 监控","panel.title":"Token","header.title":"Token 监控",unknown:"未知模型",noSession:"请先打开一个会话","status.compacting":"压缩中","status.tools":"工具执行中","status.streaming":"流式输出","status.failed":"失败","status.interrupted":"已中断","status.running":"运行中","status.idle":"空闲","tps.label":"TPS","tps.unit":"tok/s","tps.exact":"精确","tps.estimate":"估算","tps.frozen":"流已结束","tps.none":"无数据","ttft.label":"TTFT","ttft.retries":"重试 {{count}} 次","context.label":"上下文","context.unknown":"未知上限","tokens.title":"本步","tokens.hint":"输入 / 输出 / 推理 / 缓存","tokens.input":"输入","tokens.output":"输出","tokens.reasoning":"推理","tokens.cacheRead":"缓存读","tokens.cacheWrite":"缓存写","totals.title":"累计","totals.unit":"tokens","totals.step":"本步","totals.turn":"本轮","totals.session":"会话","cost.title":"费用","cost.unit":"USD","cost.step":"本步","cost.turn":"本轮估算","cost.session":"会话（服务端）","cost.note":"估算优先使用自定义价格表，其次使用模型目录价格。服务端费用包含子代理会话。","footer.local":"本地估算 · 数据不会离开应用","footer.settings":"设置","version.warning":"插件针对 OpenCode {{built}} 构建，当前为 {{current}}。升级后请重新构建插件。","settings.title":"Token 监控","settings.description":"为每个会话显示实时 Token、速度、费用和上下文指标。","settings.import":"从模型目录导入","settings.noSession":"请先打开一个会话再导入模型目录","settings.noModels":"当前会话还没有加载模型目录","settings.imported":"已导入模型价格","settings.behavior":"行为","settings.priceMode":"价格回退","settings.priceMode.description":"优先使用自定义价格表，缺少条目时回退到模型目录价格。","settings.priceMode.fallback":"自定义，然后目录","settings.priceMode.custom":"仅自定义","settings.window":"TPS 窗口","settings.window.description":"实时估算使用的滚动窗口。","settings.headerPill":"标题栏胶囊","settings.headerPill.description":"在会话标题栏显示上下文占用。","settings.subagents":"包含子代理","settings.subagents.description":"会话累计 token 包含子会话。","settings.prices":"模型价格","settings.prices.description":"单位为 USD / 100 万 tokens。留空该模型会显示 N/A。","settings.add":"添加一行","settings.clear":"清空","settings.provider":"供应商","settings.model":"模型","settings.input":"输入","settings.output":"输出","settings.cacheRead":"缓存读","settings.cacheWrite":"缓存写","settings.remove":"删除价格","settings.empty":"还没有自定义价格。","settings.priceNote":"价格为 USD / 100 万 tokens，推理按输出价格计费。模型 ID 可以用 * 作为通配符。","pill.segment.context":"上下文","pill.segment.tps":"TPS","pill.segment.ttft":"TTFT","pill.segment.turnCost":"本轮费用","pill.segment.turnTokens":"本轮 Token","pill.segment.cacheHit":"缓存命中","pill.segment.model":"模型","pill.segment.status":"状态","pill.segment.steps":"步数","pill.segment.elapsed":"耗时","pill.segment.sessionTokens":"会话 Token","pill.segment.sessionCost":"会话费用","pill.steps":"{{count}} 步","pill.tip.context":"上下文","pill.tip.tps":"TPS","pill.tip.ttft":"TTFT","pill.tip.step":"本步","pill.tip.turn":"本轮","pill.tip.session":"会话","pill.tip.cache":"缓存命中","pill.tip.status":"状态","settings.pill":"标题栏胶囊","settings.pill.preset":"预设","settings.pill.preset.description":"先选一个快捷布局，再单独调整指标。","settings.pill.preset.minimal":"极简","settings.pill.preset.standard":"标准","settings.pill.preset.power":"性能","settings.pill.preset.custom":"自定义","settings.pill.preview":"预览","settings.pill.preview.description":"使用示例数值展示当前布局。","settings.pill.max":"最多指标数","settings.pill.max.description":"标题空间充足时胶囊最多显示几段。","settings.pill.compact":"紧凑指标数","settings.pill.compact.description":"标题空间不足时保留几段。","settings.pill.icon":"显示图标","settings.pill.units":"显示单位","settings.pill.labels":"显示标签","settings.pill.liveDot":"显示实时圆点","settings.pill.tooltip":"悬停显示详情","settings.pill.contextTone":"按上下文占用着色","settings.pill.click":"点击行为","settings.pill.click.description":"点击胶囊时执行的操作。","settings.pill.click.toggle":"切换面板","settings.pill.click.open":"打开面板","settings.pill.click.settings":"打开设置","settings.pill.click.none":"不响应","settings.pill.segments":"指标段","settings.pill.segments.description":"启用指标后，用上下按钮调整顺序。","settings.pill.segments.hint":"顺序按此列表排列。","settings.pill.segment.description":"在标题栏胶囊中显示这个数值。","settings.pill.up":"上移","settings.pill.down":"下移"},we=w.Schema.Struct({providerID:w.Schema.String,modelID:w.Schema.String,input:w.Schema.Number,output:w.Schema.Number,cacheRead:w.Schema.Number,cacheWrite:w.Schema.Number}),Se=w.Schema.Struct({preset:w.Schema.String,segments:w.Schema.Array(w.Schema.String),maxSegments:w.Schema.Number,compactSegments:w.Schema.Number,showIcon:w.Schema.Boolean,showUnits:w.Schema.Boolean,showLabels:w.Schema.Boolean,showLiveDot:w.Schema.Boolean,showTooltip:w.Schema.Boolean,contextTone:w.Schema.Boolean,clickAction:w.Schema.String}),ke=w.Schema.Struct({prices:w.Schema.Array(we),priceMode:w.Schema.String,tpsWindowMs:w.Schema.Number,showHeaderPill:w.Schema.Boolean,includeSubagents:w.Schema.Boolean,pill:w.Schema.optional(Se)}),ct={prices:[],priceMode:"custom-then-catalog",tpsWindowMs:2e3,showHeaderPill:!0,includeSubagents:!1,pill:{preset:"standard",segments:["context","tps","turnCost"],maxSegments:3,compactSegments:2,showIcon:!0,showUnits:!0,showLabels:!1,showLiveDot:!0,showTooltip:!0,contextTone:!0,clickAction:"toggle"}},$e=F.Plugin.define({stores:{prefs:F.Store.global(ke,ct)},i18n:{en:be,"zh-CN":Kt,zh:Kt}}),Ce=`
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
`;function Q(){return{input:0,output:0,reasoning:0,cacheRead:0,cacheWrite:0}}function N(e){return e?e.input+e.output+e.reasoning+e.cacheRead+e.cacheWrite:0}function lt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function et(e){return{input:lt(e?.input),output:lt(e?.output),reasoning:lt(e?.reasoning),cacheRead:lt(e?.cacheRead??e?.cache?.read),cacheWrite:lt(e?.cacheWrite??e?.cache?.write)}}function Vt(e){const t=e?.providerID??"unknown",s=e?.id??e?.modelID??"unknown";return`${t}/${s}`}function Te(e){return e?.id??e?.modelID}const Yt=["context","tps","ttft","turnCost","turnTokens","cacheHit","model","status","steps","elapsed","sessionTokens","sessionCost"],_t={minimal:["context","tps"],standard:["context","tps","turnCost"],power:["context","tps","ttft","cacheHit"]};function ye(e){return Yt.includes(e)}function at(e){if(e.preset!=="custom"){const s=_t[e.preset];if(s)return[...s]}const t=e.segments.filter(ye);return t.length>0?t:[..._t.standard]}function wt(e){return`pill.segment.${e}`}function Dt(e,t){if(!t)return;const s=t.id??t.modelID;if(s)return(e??[]).find(r=>r?.providerID===t.providerID&&(r?.id===s||r?.modelID===s))}function _e(e,t){try{const s=e?.session?.message?.list?.(t.id)??[],r=e?.session?.get?.(t.id),i=xe.lastAssistantWithUsage(s,r?.revert?.messageID),l=i?et(i.tokens):Q(),c=i?N(l):0,u=e?.location?.model?.list?.(t.location)??[],v=Dt(u,i?.model??r?.model),f=v?.limit?.context,b=typeof f=="number"&&f>0?f:void 0;return{used:c,max:b,pct:b?c/b*100:void 0,modelName:v?.name??i?.model?.id??r?.model?.id,tokens:l}}catch{return{used:0,max:void 0,pct:void 0,modelName:void 0,tokens:Q()}}}function Zt(e,t,s){try{const r=s?e?.session?.family?.(t.id)??[t.id]:[t.id],i=Q();for(const l of r){const c=e?.session?.get?.(l);if(!c?.tokens)continue;const u=et(c.tokens);i.input+=u.input,i.output+=u.output,i.reasoning+=u.reasoning,i.cacheRead+=u.cacheRead,i.cacheWrite+=u.cacheWrite}return i}catch{return Q()}}function te(e,t){try{const s=e?.session?.cost?.(t.id);return typeof s=="number"&&Number.isFinite(s)?s:void 0}catch{return}}function R(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Me(e,t){if(!e||typeof e!="object")return;const s=t.input+t.cacheRead+t.cacheWrite,r=(Array.isArray(e)?e:[]).filter(i=>i?.tier?.type==="context"&&R(i.tier.size)<s).sort((i,l)=>R(l.tier?.size)-R(i.tier?.size))[0];return r||(Array.isArray(e)?e:[]).find(i=>i?.tier===void 0)}function Jt(e,t,s,r,i){return(e.input*t+(e.output+e.reasoning)*s+e.cacheRead*r+e.cacheWrite*i)/1e6}function ee(e,t,s,r){const i=Te(e);if(!i||!e?.providerID)return{amount:void 0,source:"none"};const l=r.prices.find(v=>(v.providerID==="*"||v.providerID===e.providerID)&&(v.modelID===i||v.modelID==="*"));if(l)return{amount:Jt(t,R(l.input),R(l.output),R(l.cacheRead),R(l.cacheWrite)),source:"custom"};if(r.priceMode==="custom")return{amount:void 0,source:"none"};const c=(s??[]).find(v=>v?.providerID===e.providerID&&(v?.id===i||v?.modelID===i)),u=Me(c?.cost,t);return u?{amount:Jt(t,R(u.input),R(u.output),R(u.cacheRead??u.cache?.read),R(u.cacheWrite??u.cache?.write)),source:"catalog"}:{amount:void 0,source:"none"}}function ne(e){return e?e.exact?e.exact:{input:0,output:e.estimatedOutput,reasoning:e.estimatedReasoning,cacheRead:0,cacheWrite:0}:Q()}function se(e,t,s){return e?ee(e.model,ne(e),t,s):{amount:void 0,source:"none"}}function ie(e,t,s){if(e.length===0)return{amount:void 0,source:"none"};let r=0,i="catalog";for(const l of e){const c=ee(l.model,ne(l),t,s);if(c.source==="none"||c.amount===void 0)return{amount:void 0,source:"none"};r+=c.amount,c.source==="custom"&&(i="custom")}return{amount:r,source:i}}function P(e,t){return e===void 0||!Number.isFinite(e)?"—":e<1e3?String(Math.round(e)):new Intl.NumberFormat(t,{notation:"compact",maximumFractionDigits:1}).format(e)}function Gt(e,t){return e===void 0||!Number.isFinite(e)?"—":new Intl.NumberFormat(t).format(Math.round(e))}function St(e){return e===void 0||!Number.isFinite(e)?"—":e>=100?e.toFixed(0):e.toFixed(1)}function Mt(e){return e===void 0||!Number.isFinite(e)?"—":e<1e3?`${Math.round(e)} ms`:`${(e/1e3).toFixed(2)} s`}function ut(e,t,s){return t==="none"||e===void 0||!Number.isFinite(e)?"N/A":kt(e,s)}function kt(e,t){if(e===void 0||!Number.isFinite(e))return"N/A";const s=e>0&&e<.01?4:2;return new Intl.NumberFormat(t,{style:"currency",currency:"USD",minimumFractionDigits:s,maximumFractionDigits:s}).format(e)}function De(e){if(e===void 0||!Number.isFinite(e)||e<0)return"—";if(e<1e3)return`${Math.round(e)} ms`;if(e<6e4)return`${(e/1e3).toFixed(e<1e4?1:0)} s`;const t=Math.floor(e/6e4),s=Math.floor(e%6e4/1e3);return`${t}m ${s}s`}function Tt(e){return e===void 0||!Number.isFinite(e)?"—":`${e.toFixed(e<10?1:0)}%`}const Ie=/[\u3400-\u4dbf\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af]/u;function Ae(e){let t=0,s=0;for(const r of e)Ie.test(r)?t+=1:s+=1;return t/1.6+s/4}function Re(e,t=1){if(!e)return 0;const s=Number.isFinite(t)&&t>0?t:1;return Ae(e)*s}function U(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Pe(e,t){for(let s=e.length-1;s>=0;s-=1)if(t(e[s]))return s;return-1}class Fe{sessionID;windowMs;turn;current;last;active=!1;compacting=!1;samples=[];history=[];firstDeltaLocalAt;calibrations={};sessionTokens;sessionCost;constructor(t,s){this.sessionID=t,this.windowMs=Math.max(500,Math.min(15e3,s))}setWindow(t){this.windowMs=Math.max(500,Math.min(15e3,t)),this.prune(Date.now())}setStepModel(t,s){const r=this.findStep(t);r&&!r.model&&(r.model=s)}reset(){this.turn=void 0,this.current=void 0,this.last=void 0,this.active=!1,this.compacting=!1,this.samples=[],this.history=[],this.firstDeltaLocalAt=void 0,this.sessionTokens=void 0,this.sessionCost=void 0}handle(t){const s=t?.type,r=t?.data??{};if(r.sessionID&&r.sessionID!==this.sessionID)return;const i=U(t?.created)||Date.now();switch(s){case"session.execution.started":(!this.turn||this.turn.status!=="running")&&this.startTurn(i),this.active=!0;return;case"session.step.started":this.startStep(r,i);return;case"session.text.started":case"session.reasoning.started":case"session.tool.input.started":this.startPart(r,i);return;case"session.text.delta":this.addDelta(r,i,"text",r.delta??"");return;case"session.reasoning.delta":this.addDelta(r,i,"reasoning",r.delta??"");return;case"session.tool.input.delta":this.addDelta(r,i,"tool",r.delta??"");return;case"session.text.ended":this.endPart(r,"text",r.text??"");return;case"session.reasoning.ended":this.endPart(r,"reasoning",r.text??"");return;case"session.tool.input.ended":this.endPart(r,"tool",r.text??"");return;case"session.step.streamed":this.markStreamed(r,i);return;case"session.step.ended":this.finishStep(r,i,!1);return;case"session.step.failed":this.finishStep(r,i,!0);return;case"session.retry.scheduled":this.markRetry(r);return;case"session.usage.updated":this.sessionTokens=et(r.tokens),typeof r.cost=="number"&&(this.sessionCost=r.cost);return;case"session.compaction.started":this.compacting=!0;return;case"session.compaction.ended":case"session.compaction.failed":this.compacting=!1;return;case"session.execution.succeeded":this.endTurn("succeeded",i);return;case"session.execution.failed":this.endTurn("failed",i);return;case"session.execution.interrupted":this.endTurn("interrupted",i);return;case"session.idle":this.turn?.status==="running"&&this.endTurn("succeeded",i);return;default:return}}tick(t=Date.now()){if(this.current?.status!=="streaming")return;const s=this.liveTps(t);s!==void 0&&(this.history.push(s),this.history.length>120&&this.history.shift())}snapshot(t=Date.now()){const s=this.current??this.last;let r,i="none";this.current?this.current.exactTps!==void 0?(r=this.current.exactTps,i="exact"):this.current.status==="stream-ended"?(r=this.current.frozenTps??this.estimatedStepTps(this.current),i=r===void 0?"none":"frozen"):(r=this.liveTps(t),i=r===void 0?"none":"estimate"):this.last?.exactTps!==void 0?(r=this.last.exactTps,i="exact"):this.last?.frozenTps!==void 0&&(r=this.last.frozenTps,i="frozen");const l=s?.firstDeltaAt!==void 0&&s.startedAt>0&&s.firstDeltaAt>=s.startedAt?s.firstDeltaAt-s.startedAt:void 0,c=this.liveStepTokens(s),u=this.turnTokens();return{active:this.active||this.current?.status==="streaming"||this.current?.status==="stream-ended",compacting:this.compacting,tps:r,tpsKind:i,tpsEndToEnd:s?.endToEndTps,ttftMs:l,retryCount:s?.retryCount??0,current:this.current,last:this.last,turn:this.turn,stepTokens:c,turnTokens:u,history:[...this.history],sessionTokens:this.sessionTokens,sessionCost:this.sessionCost}}hydrate(t,s){if(this.turn||this.current)return;const r=Array.isArray(t)?t:[],i=Pe(r,u=>u?.type==="idle"),l=r.slice(i+1),c=[];for(const u of l){if(u?.type!=="assistant"||!u.tokens)continue;const v=et(u.tokens);if(N(v)<=0)continue;const f=U(u.time?.created)||Date.now(),b=U(u.time?.streamed)||U(u.time?.completed)||f;c.push({messageID:u.id,startedAt:f,streamedAt:b,completedAt:U(u.time?.completed)||b,model:u.model,status:"done",retryCount:0,chars:{text:0,reasoning:0,tool:0},estimated:0,estimatedOutput:0,estimatedReasoning:0,exact:v,cost:typeof u.cost=="number"?u.cost:void 0,finish:u.finish,exactTps:this.computeTps(v,f,b),endToEndTps:this.computeTps(v,f,b)})}c.length>0&&(this.turn={startedAt:c[0].startedAt,endedAt:c[c.length-1].completedAt,status:"succeeded",steps:c},this.last=c[c.length-1]),this.sessionTokens=s?.tokens?et(s.tokens):void 0,this.sessionCost=typeof s?.cost=="number"?s.cost:void 0,this.active=!1}startTurn(t){this.turn={startedAt:t,status:"running",steps:[]},this.active=!0}startStep(t,s){const r=t?.assistantMessageID;if(!r)return;let i=this.findStep(r);(!this.turn||this.turn.status!=="running")&&this.startTurn(U(t?.started)||s),i?(i.model=t?.model??i.model,i.startedAt||(i.startedAt=U(t?.started)||s)):(i=this.createStep(r,U(t?.started)||s,t?.model),this.turn.steps.push(i)),this.current=i,this.active=!0,this.samples=[],this.history=[],this.firstDeltaLocalAt=void 0}startPart(t,s){const r=this.ensureStep(t,s);r&&(r.firstStartedAt===void 0&&(r.firstStartedAt=s),r.status==="waiting"&&(r.status="streaming"),this.active=!0)}addDelta(t,s,r,i){if(!i)return;const l=this.ensureStep(t,s);if(!l||l.status==="done"||l.status==="failed")return;l.firstDeltaAt===void 0&&(l.firstDeltaAt=s),this.firstDeltaLocalAt===void 0&&(this.firstDeltaLocalAt=Date.now());const c=this.calibrationFor(l.model),u=Re(i,c),v=Date.now();l.chars[r]+=i.length,l.estimated+=u,r==="reasoning"?l.estimatedReasoning+=u:l.estimatedOutput+=u,l.status="streaming",this.active=!0,this.samples.push({at:v,tokens:u}),this.prune(v)}endPart(t,s,r){const i=this.findStep(t?.assistantMessageID);!i||!r||(i.chars[s]=Math.max(i.chars[s],r.length))}markStreamed(t,s){const r=this.findStep(t?.assistantMessageID);r&&(r.streamedAt=s,r.status="stream-ended",r.frozenTps=this.liveTps(Date.now())??this.estimatedStepTps(r),this.active=!0)}markRetry(t){const s=this.findStep(t?.assistantMessageID);s&&(s.retryCount+=1,s.firstDeltaAt===void 0&&(this.samples=[],this.history=[],this.firstDeltaLocalAt=void 0))}finishStep(t,s,r){const i=this.ensureStep(t,s);if(i){if(t?.tokens!==void 0){i.exact=et(t.tokens);const l=i.streamedAt??s;i.exactTps=this.computeTps(i.exact,i.firstDeltaAt,l),i.endToEndTps=this.computeTps(i.exact,i.startedAt,l),i.joinedMidStream||this.calibrate(i)}typeof t?.cost=="number"&&(i.cost=t.cost),typeof t?.finish=="string"&&(i.finish=t.finish),i.completedAt=s,i.status=r?"failed":"done",this.last=i,this.current===i&&(this.current=void 0),this.active=this.turn?.status==="running"}}endTurn(t,s){this.turn&&(this.turn.status=t,this.turn.endedAt=s,this.current&&((this.current.status==="waiting"||this.current.status==="streaming"||this.current.status==="stream-ended")&&(this.current.completedAt=s,this.current.status=t==="failed"||t==="interrupted"?"failed":"done"),this.last=this.current,this.current=void 0),this.active=!1)}ensureStep(t,s){const r=t?.assistantMessageID;if(!r)return;let i=this.findStep(r);return i||(i=this.createStep(r,U(t?.started)||s,t?.model),i.joinedMidStream=!0,(!this.turn||this.turn.status!=="running")&&this.startTurn(i.startedAt),this.turn.steps.push(i),this.current=i,this.active=!0,i)}createStep(t,s,r){return{messageID:t,startedAt:s,model:r,status:"waiting",retryCount:0,chars:{text:0,reasoning:0,tool:0},estimated:0,estimatedOutput:0,estimatedReasoning:0}}findStep(t){if(t)return this.current?.messageID===t?this.current:this.last?.messageID===t?this.last:this.turn?.steps.find(s=>s.messageID===t)}calibrationFor(t){return this.calibrations[Vt(t)]??1}calibrate(t){if(!t.exact||t.estimated<=0)return;const s=t.exact.output+t.exact.reasoning;if(s<=0)return;let r=s/t.estimated;if(!Number.isFinite(r))return;r=Math.max(.2,Math.min(5,r));const i=Vt(t.model),l=this.calibrations[i];this.calibrations[i]=l===void 0?r:l*.7+r*.3}computeTps(t,s,r){if(s===void 0||r===void 0)return;const i=t.output+t.reasoning,l=(r-s)/1e3;if(!(i<=0||l<=.05))return i/l}estimatedStepTps(t){if(!t?.firstDeltaAt||!t.streamedAt)return;const s=t.estimatedOutput+t.estimatedReasoning,r=(t.streamedAt-t.firstDeltaAt)/1e3;if(!(s<=0||r<=.05))return s/r}liveStepTokens(t){return t?t.exact?t.exact:{input:0,output:t.estimatedOutput,reasoning:t.estimatedReasoning,cacheRead:0,cacheWrite:0}:Q()}turnTokens(){const t=Q();for(const s of this.turn?.steps??[]){const r=this.liveStepTokens(s);t.input+=r.input,t.output+=r.output,t.reasoning+=r.reasoning,t.cacheRead+=r.cacheRead,t.cacheWrite+=r.cacheWrite}return t}liveTps(t){if(this.firstDeltaLocalAt===void 0)return;const s=t-this.windowMs;let r=0;for(const l of this.samples)l.at>=s&&(r+=l.tokens);const i=Math.max(.25,Math.min(this.windowMs,t-this.firstDeltaLocalAt)/1e3);return r/i}prune(t){const s=t-this.windowMs*4;for(;this.samples.length>0&&this.samples[0].at<s;)this.samples.shift()}}const yt=new Map;function bt(e){for(const t of e.listeners)try{t()}catch{}}function re(e){for(const t of e.cleanups.splice(0))try{t()}catch{}e.timer!==void 0&&(window.clearInterval(e.timer),e.timer=void 0),e.data=void 0}function Ne(e,t){if(!t||e.data===t)return;re(e),e.data=t,e.engine.reset(),e.engine.hydrate(t.session.message.list(e.session.id)??[],t.session.get(e.session.id)),t.session.get(e.session.id)||t.session.sync(e.session.id).catch(()=>{}),t.session.message.list(e.session.id)?.length||t.session.message.sync(e.session.id).catch(()=>{}),e.session.location&&!t.location.model.list(e.session.location)&&t.location.sync(e.session.location).catch(()=>{});const s=(f,b)=>t.on(f,b),r=()=>{e.engine.reset(),e.engine.hydrate(t.session.message.list(e.session.id)??[],t.session.get(e.session.id)),bt(e)},i=f=>{const b=f?.data?.assistantMessageID,M=b?t.session.message.get(e.session.id,b):void 0;e.engine.setStepModel(b,M?.model),e.engine.handle(f),e.engine.setStepModel(b,M?.model),bt(e)},l=f=>{e.engine.handle(f)},c=f=>{e.engine.handle(f),bt(e)},u=[s("session.execution.started",c),s("session.step.started",c),s("session.text.started",l),s("session.reasoning.started",l),s("session.tool.input.started",l),s("session.text.delta",l),s("session.reasoning.delta",l),s("session.tool.input.delta",l),s("session.text.ended",l),s("session.reasoning.ended",l),s("session.tool.input.ended",l),s("session.step.streamed",c),s("session.step.ended",i),s("session.step.failed",i),s("session.retry.scheduled",c),s("session.usage.updated",c),s("session.compaction.started",c),s("session.compaction.ended",c),s("session.compaction.failed",c),s("session.execution.succeeded",c),s("session.execution.failed",c),s("session.execution.interrupted",c),s("session.idle",c),s("session.revert.staged",r),s("session.revert.cleared",r),s("session.revert.committed",r),s("server.connected",r)],v=window.setInterval(()=>{e.engine.tick(),bt(e)},200);e.timer=v,e.cleanups.push(()=>{for(const f of u)try{f()}catch{}})}function ze(e,t,s){const r=t.key??`${t.server?.id??"server"}
${t.id}`;let i=yt.get(r);i?(i.ctx=e,i.session=t):(i={key:r,ctx:e,session:t,engine:new Fe(t.id,e.stores.prefs.value.tpsWindowMs??2e3),refs:0,listeners:new Set,data:void 0,cleanups:[]},yt.set(r,i)),i.refs+=1,i.listeners.add(s);let l=!1;return{engine:i.engine,attach(c){Ne(i,c)},hydrate(c,u){i.engine.hydrate(c,u)},release(){l||(l=!0,i.refs-=1,i.listeners.delete(s),i.refs<=0&&(re(i),yt.delete(r)))}}}function oe(e,t){const[s,r]=h.createSignal(0),i=ze(e,t,()=>r(f=>f+1)),l=()=>t.server.data,c=()=>e.stores.prefs.value;h.createEffect(()=>{const f=l();f&&i.attach(f)}),h.createEffect(()=>{i.engine.setWindow(c().tpsWindowMs??2e3)}),h.createEffect(()=>{const f=l();if(!f)return;const b=f.session.message.list(t.id)??[];b.length>0&&i.hydrate(b,f.session.get(t.id))}),h.onCleanup(()=>i.release());const u=h.createMemo(()=>(s(),i.engine.snapshot(Date.now()))),v=h.createMemo(()=>(s(),_e(l(),t)));return{engine:i.engine,snapshot:u,context:v,data:l,prefs:c}}var We=n.template("<div class=tm-pill-tip><div class=tm-pill-tip-title></div><div class=tm-pill-tip-grid><span></span><span></span><span></span><span> tok/s · </span><span></span><span></span><span></span><span> · </span><span></span><span> · </span><span></span><span> · </span><span></span><span></span><span></span><span>"),Qt=n.template("<span>"),Le=n.template("<button type=button class=tm-pill><span class=tm-pill-segments>"),Ee=n.template("<span class=tm-pill-sep>·");function Oe(e){return n.createComponent(h.Show,{get when(){return e.active},get children(){return n.createComponent(h.Show,{keyed:!0,get when(){return e.session.key},children:t=>n.createComponent(Ue,{get ctx(){return e.ctx},get session(){return e.session},get compact(){return e.compact}})})}})}function Ue(e){const t=e.ctx,{snapshot:s,context:r,data:i}=oe(t,e.session),l=()=>t.stores.prefs.value,c=()=>l().pill??ct.pill,u=()=>t.locale.locale(),v=h.createMemo(()=>i()?.location?.model?.list?.(e.session.location)??[]),f=()=>s().current??s().last,b=()=>s().stepTokens,M=h.createMemo(()=>se(f(),v(),l())),D=h.createMemo(()=>ie(s().turn?.steps??[],v(),l())),k=h.createMemo(()=>Zt(i(),e.session,l().includeSubagents)),A=h.createMemo(()=>te(i(),e.session)),z=h.createMemo(()=>{const p=f()?.model??i()?.session?.get?.(e.session.id)?.model;return Dt(v(),p)?.name??p?.id??t.t("unknown")}),W=()=>{const p=z();return p.length>18?`${p.slice(0,17)}…`:p},I=()=>{const p=b(),x=p.input+p.cacheRead;return x>0?p.cacheRead/x*100:void 0},X=()=>{const p=s().turn;if(p?.startedAt)return Math.max(0,(p.endedAt??Date.now())-p.startedAt)},H=()=>{const p=s();return p.compacting?t.t("status.compacting"):p.current?.status==="stream-ended"?t.t("status.tools"):p.current?.status==="streaming"?t.t("status.streaming"):p.turn?.status==="failed"||p.last?.status==="failed"?t.t("status.failed"):p.turn?.status==="interrupted"?t.t("status.interrupted"):p.active?t.t("status.running"):t.t("status.idle")},Y=h.createMemo(()=>{const p=at(c()),x=e.compact?c().compactSegments:c().maxSegments,T=Math.max(1,Math.min(6,Math.round(x)));return p.slice(0,T)}),o=p=>{switch(p){case"context":return Tt(r().pct);case"tps":return St(s().tps);case"ttft":return Mt(s().ttftMs);case"turnCost":{const x=ut(D().amount,D().source,u());return s().active&&D().source!=="none"?`~${x}`:x}case"turnTokens":return`${s().active?"~":""}${P(N(s().turnTokens),u())}`;case"cacheHit":return I()===void 0?void 0:`${Math.round(I())}%`;case"model":return W();case"status":return H();case"steps":return t.t("pill.steps",{count:s().turn?.steps.length??0});case"elapsed":return De(X());case"sessionTokens":return P(N(k()),u());case"sessionCost":return kt(A(),u());default:return}},d=p=>{const x=o(p);if(x===void 0||x==="—"&&p!=="context"&&p!=="tps")return;const T=c().showLabels?`${t.t(wt(p))} `:"",E=p==="tps"&&c().showUnits&&!e.compact&&x!=="—"?" tok/s":"";return`${T}${x}${E}`},m=h.createMemo(()=>{const p=Y().map(x=>({id:x,text:d(x)})).filter(x=>!!x.text);return p.length>0?p:[{id:"context",text:Tt(r().pct)},{id:"tps",text:St(s().tps)}]}),g=p=>{if(p!=="context"||!c().contextTone)return"";const x=r().pct;return x===void 0?"":x>=95?"tm-pill-danger":x>=80?"tm-pill-warning":""},a=()=>{const p=r(),x=P(p.used,u()),T=p.max?P(p.max,u()):"?";return`${x} / ${T} · ${Tt(p.pct)}`},S=()=>{const p=s().tpsKind;return p==="exact"?t.t("tps.exact"):p==="estimate"?t.t("tps.estimate"):p==="frozen"?t.t("tps.frozen"):t.t("tps.none")},$=()=>(()=>{var p=We(),x=p.firstChild,T=x.nextSibling,E=T.firstChild,O=E.nextSibling,nt=O.nextSibling,Z=nt.nextSibling,pt=Z.firstChild,dt=Z.nextSibling,st=dt.nextSibling,tt=st.nextSibling,j=tt.nextSibling,$t=j.firstChild,it=j.nextSibling,q=it.nextSibling,mt=q.firstChild,rt=q.nextSibling,K=rt.nextSibling,gt=K.firstChild,ht=K.nextSibling,ft=ht.nextSibling,ot=ft.nextSibling,vt=ot.nextSibling;return n.insert(x,z),n.insert(E,()=>t.t("pill.tip.context")),n.insert(O,a),n.insert(nt,()=>t.t("pill.tip.tps")),n.insert(Z,()=>St(s().tps),pt),n.insert(Z,S,null),n.insert(dt,()=>t.t("pill.tip.ttft")),n.insert(st,()=>Mt(s().ttftMs)),n.insert(tt,()=>t.t("pill.tip.step")),n.insert(j,()=>P(N(b()),u()),$t),n.insert(j,()=>ut(M().amount,M().source,u()),null),n.insert(it,()=>t.t("pill.tip.turn")),n.insert(q,()=>P(N(s().turnTokens),u()),mt),n.insert(q,()=>ut(D().amount,D().source,u()),null),n.insert(rt,()=>t.t("pill.tip.session")),n.insert(K,()=>P(N(k()),u()),gt),n.insert(K,()=>kt(A(),u()),null),n.insert(ht,()=>t.t("pill.tip.cache")),n.insert(ft,(()=>{var xt=n.memo(()=>I()===void 0);return()=>xt()?"—":`${Math.round(I())}%`})()),n.insert(ot,()=>t.t("pill.tip.status")),n.insert(vt,H),p})(),C=()=>{const p=s();return p.turn?.status==="failed"||p.last?.status==="failed"?"tm-pill-dot tm-pill-dot-danger":p.turn?.status==="interrupted"?"tm-pill-dot tm-pill-dot-warning":p.current?.status==="stream-ended"?"tm-pill-dot tm-pill-dot-tools":"tm-pill-dot"},_=()=>{const p=c().clickAction;if(p!=="none"){if(p==="settings"){t.layout.settings("token-monitor");return}if(p==="open"){t.layout.open(`${t.id}:monitor`,e.session,{background:!0});return}t.layout.toggle(`${t.id}:monitor`,e.session)}},L=()=>(()=>{var p=Le(),x=p.firstChild;return p.$$click=_,n.insert(p,n.createComponent(h.Show,{get when(){return c().showIcon},get children(){return n.createComponent(t.ui.Icon,{name:"window-analytics",size:"small"})}}),x),n.insert(x,n.createComponent(h.For,{get each(){return m()},children:(T,E)=>[n.createComponent(h.Show,{get when(){return E()>0},get children(){return Ee()}}),(()=>{var O=Qt();return n.insert(O,()=>T.text),n.effect(()=>n.className(O,g(T.id))),O})()]})),n.insert(p,n.createComponent(h.Show,{get when(){return n.memo(()=>!!c().showLiveDot)()&&s().active},get children(){var T=Qt();return n.effect(()=>n.className(T,C())),T}}),null),n.effect(()=>n.setAttribute(p,"aria-label",t.t("header.title"))),p})();return c().showTooltip?n.createComponent(t.ui.Tooltip,{get value(){return $()},placement:"bottom",get children(){return L()}}):L()}n.delegateEvents(["click"]);var Be=n.template('<div class=tm-ring-wrap><svg class=tm-ring viewBox="0 0 36 36"aria-hidden=true><circle class=tm-ring-bg cx=18 cy=18 r=15></circle><circle cx=18 cy=18 r=15></circle></svg><div class=tm-ring-copy><span class=tm-ring-value></span><span class=tm-ring-sub>');const He=e=>{const s=2*Math.PI*15,r=()=>e.pct===void 0?0:Math.max(0,Math.min(100,e.pct)),i=()=>s*(1-r()/100),l=()=>e.pct===void 0?"tm-ring-muted":e.pct>=95?"tm-ring-danger":e.pct>=80?"tm-ring-warning":"tm-ring-normal";return(()=>{var c=Be(),u=c.firstChild,v=u.firstChild,f=v.nextSibling,b=u.nextSibling,M=b.firstChild,D=M.nextSibling;return n.setAttribute(f,"stroke-dasharray",`${s} ${s}`),n.insert(M,(()=>{var k=n.memo(()=>e.pct===void 0);return()=>k()?"—":`${Math.round(e.pct)}%`})()),n.insert(D,()=>e.pending?"…":"ctx"),n.effect(k=>{var A=e.label,z=`tm-ring-fg ${l()}`,W=i();return A!==k.e&&n.setAttribute(c,"title",k.e=A),z!==k.t&&n.setAttribute(f,"class",k.t=z),W!==k.a&&n.setAttribute(f,"stroke-dashoffset",k.a=W),k},{e:void 0,t:void 0,a:void 0}),c})()};var je=n.template('<svg class=tm-spark viewBox="0 0 100 28"preserveAspectRatio=none aria-hidden=true><line class=tm-spark-baseline x1=0 y1=26 x2=100 y2=26></line><polyline class=tm-spark-line>');const qe=e=>{const t=()=>{const s=e.values.filter(i=>Number.isFinite(i));if(s.length<2)return"";const r=Math.max(1,...s);return s.map((i,l)=>{const c=l/(s.length-1)*100,u=26-Math.min(1,Math.max(0,i/r))*24;return`${c.toFixed(2)},${u.toFixed(2)}`}).join(" ")};return(()=>{var s=je(),r=s.firstChild,i=r.nextSibling;return n.effect(()=>n.setAttribute(i,"points",t())),s})()},Xt="2.2.6";function Ke(e){if(!e)return;const t=e.split(".").slice(0,2).join("."),s=Xt.split(".").slice(0,2).join(".");return t===s?void 0:`${Xt}|${e}`}var Ve=n.template("<div class=tm-muted>"),Je=n.template('<div class=tm-panel><div class=tm-top><div class=tm-model><span class=tm-model-name></span></div><div><span class=tm-dot></span><span></span></div></div><div class=tm-hero><div class=tm-hero-main><div class=tm-label></div><div class=tm-big><span></span><span class=tm-unit></span></div><div></div></div><div class=tm-hero-chart></div></div><div class=tm-metrics><div class=tm-metric><div class=tm-label></div><div class=tm-metric-value></div></div><div class="tm-metric tm-metric-context"><div class=tm-label></div><div class="tm-muted tm-context-label"></div></div></div><div class=tm-section><div class=tm-section-head><span></span><span class=tm-muted></span></div><div class=tm-token-grid></div></div><div class=tm-section><div class=tm-section-head><span></span><span class=tm-muted></span></div><div class=tm-totals><div class=tm-total><span class=tm-muted></span><strong></strong></div><div class=tm-total><span class=tm-muted></span><strong></strong></div><div class=tm-total><span class=tm-muted></span><strong></strong></div></div></div><div class=tm-section><div class=tm-section-head><span></span><span class=tm-muted></span></div><div class=tm-costs><div class=tm-cost-row><span class=tm-muted></span><span></span></div><div class=tm-cost-row><span class=tm-muted></span><span></span></div><div class=tm-cost-row><span class=tm-muted></span><span></span></div></div><div class="tm-muted tm-cost-note"></div></div><div class=tm-footer><span class=tm-muted>'),Ge=n.template("<div class=tm-token-row><span class=tm-muted></span><span>"),Qe=n.template("<div class=tm-version-warn>");function Xe(e){return n.createComponent(h.Show,{keyed:!0,get when(){return e.session.key},children:t=>n.createComponent(Ye,{get ctx(){return e.ctx},get session(){return e.session}})})}function Ye(e){const t=e.ctx,s=e.session,{snapshot:r,context:i,data:l}=oe(t,s),c=()=>t.stores.prefs.value,u=()=>t.locale.locale(),v=h.createMemo(()=>Zt(l(),s,c().includeSubagents)),f=h.createMemo(()=>te(l(),s)),b=h.createMemo(()=>l()?.location?.model?.list?.(s.location)??[]),M=()=>r().current??r().last,D=()=>{const a=M();return!!a&&!a.exact},k=()=>{const a=M()?.model??l()?.session?.get?.(s.id)?.model;return Dt(b(),a)?.name??a?.id??t.t("unknown")},A=()=>{const a=r();return a.compacting?t.t("status.compacting"):a.current?.status==="stream-ended"?t.t("status.tools"):a.current?.status==="streaming"?t.t("status.streaming"):a.turn?.status==="failed"||a.last?.status==="failed"?t.t("status.failed"):a.turn?.status==="interrupted"?t.t("status.interrupted"):a.active?t.t("status.running"):t.t("status.idle")},z=()=>{const a=r();return a.turn?.status==="failed"||a.last?.status==="failed"?"tm-status-danger":a.turn?.status==="interrupted"?"tm-status-warning":a.active||a.compacting?"tm-status-live":"tm-status-idle"},W=()=>{const a=r().tpsKind;return a==="exact"?t.t("tps.exact"):a==="estimate"?t.t("tps.estimate"):a==="frozen"?t.t("tps.frozen"):t.t("tps.none")},I=h.createMemo(()=>{const a=r(),S=M(),$=a.stepTokens,C=!!S&&!S.exact,_=L=>{if(!S||C&&(L==="input"||L==="cacheRead"||L==="cacheWrite"))return"—";const p=$[L];return`${C?"~":""}${P(p,u())}`};return[{id:"input",label:t.t("tokens.input"),value:_("input")},{id:"output",label:t.t("tokens.output"),value:_("output")},{id:"reasoning",label:t.t("tokens.reasoning"),value:_("reasoning")},{id:"cacheRead",label:t.t("tokens.cacheRead"),value:_("cacheRead")},{id:"cacheWrite",label:t.t("tokens.cacheWrite"),value:_("cacheWrite")}]}),X=h.createMemo(()=>{const a=r();return se(a.current??a.last,b(),c())}),H=h.createMemo(()=>ie(r().turn?.steps??[],b(),c())),Y=()=>{const a=i();return a.max?`${Gt(a.used,u())} / ${Gt(a.max,u())}`:t.t("context.unknown")},o=h.createMemo(()=>Ke(t.app.version)),d=()=>N(r().stepTokens),m=()=>N(r().turnTokens),g=()=>N(v());return(()=>{var a=Je(),S=a.firstChild,$=S.firstChild,C=$.firstChild,_=$.nextSibling,L=_.firstChild,p=L.nextSibling,x=S.nextSibling,T=x.firstChild,E=T.firstChild,O=E.nextSibling,nt=O.firstChild,Z=nt.nextSibling,pt=O.nextSibling,dt=T.nextSibling,st=x.nextSibling,tt=st.firstChild,j=tt.firstChild,$t=j.nextSibling,it=tt.nextSibling,q=it.firstChild,mt=q.nextSibling,rt=st.nextSibling,K=rt.firstChild,gt=K.firstChild,ht=gt.nextSibling,ft=K.nextSibling,ot=rt.nextSibling,vt=ot.firstChild,xt=vt.firstChild,le=xt.nextSibling,ae=vt.nextSibling,It=ae.firstChild,At=It.firstChild,ce=At.nextSibling,Rt=It.nextSibling,Pt=Rt.firstChild,ue=Pt.nextSibling,pe=Rt.nextSibling,Ft=pe.firstChild,de=Ft.nextSibling,Nt=ot.nextSibling,zt=Nt.firstChild,Wt=zt.firstChild,me=Wt.nextSibling,Lt=zt.nextSibling,Et=Lt.firstChild,Ot=Et.firstChild,Ut=Ot.nextSibling,Bt=Et.nextSibling,Ht=Bt.firstChild,jt=Ht.nextSibling,ge=Bt.nextSibling,qt=ge.firstChild,he=qt.nextSibling,fe=Lt.nextSibling,Ct=Nt.nextSibling,ve=Ct.firstChild;return n.insert($,n.createComponent(t.ui.Icon,{name:"window-analytics",size:"normal"}),C),n.insert(C,k),n.insert(p,A),n.insert(E,()=>t.t("tps.label")),n.insert(nt,()=>St(r().tps)),n.insert(Z,()=>t.t("tps.unit")),n.insert(pt,W),n.insert(dt,n.createComponent(qe,{get values(){return r().history}})),n.insert(j,()=>t.t("ttft.label")),n.insert($t,()=>Mt(r().ttftMs)),n.insert(tt,n.createComponent(h.Show,{get when(){return r().retryCount>0},get children(){var y=Ve();return n.insert(y,()=>t.t("ttft.retries",{count:r().retryCount})),y}}),null),n.insert(q,()=>t.t("context.label")),n.insert(it,n.createComponent(He,{get pct(){return i().pct},get used(){return i().used},get max(){return i().max},get label(){return Y()},get pending(){return r().active}}),mt),n.insert(mt,Y),n.insert(gt,()=>t.t("tokens.title")),n.insert(ht,()=>t.t("tokens.hint")),n.insert(ft,n.createComponent(h.For,{get each(){return I()},children:y=>(()=>{var V=Ge(),J=V.firstChild,B=J.nextSibling;return n.insert(J,()=>y.label),n.insert(B,()=>y.value),n.effect(()=>n.className(B,D()&&y.id==="output"?"tm-token-live":"")),V})()})),n.insert(xt,()=>t.t("totals.title")),n.insert(le,()=>t.t("totals.unit")),n.insert(At,()=>t.t("totals.step")),n.insert(ce,()=>P(d(),u())),n.insert(Pt,()=>t.t("totals.turn")),n.insert(ue,()=>P(m(),u())),n.insert(Ft,()=>t.t("totals.session")),n.insert(de,()=>P(g(),u())),n.insert(Wt,()=>t.t("cost.title")),n.insert(me,()=>t.t("cost.unit")),n.insert(Ot,()=>t.t("cost.step")),n.insert(Ut,()=>D()?"~":"",null),n.insert(Ut,()=>ut(X().amount,X().source,u()),null),n.insert(Ht,()=>t.t("cost.turn")),n.insert(jt,()=>r().active?"~":"",null),n.insert(jt,()=>ut(H().amount,H().source,u()),null),n.insert(qt,()=>t.t("cost.session")),n.insert(he,()=>kt(f(),u())),n.insert(fe,()=>t.t("cost.note")),n.insert(a,n.createComponent(h.Show,{get when(){return o()},children:y=>{const[V,J]=y().split("|");return(()=>{var B=Qe();return n.insert(B,()=>t.t("version.warning",{built:V,current:J})),B})()}}),Ct),n.insert(ve,()=>t.t("footer.local")),n.insert(Ct,n.createComponent(t.ui.Button,{variant:"ghost",size:"small",icon:"settings-gear",onClick:()=>t.layout.settings("token-monitor"),get children(){return t.t("footer.settings")}}),null),n.effect(y=>{var V=k(),J=`tm-status ${z()}`,B=`tm-tag tm-tag-${r().tpsKind}`;return V!==y.e&&n.setAttribute($,"title",y.e=V),J!==y.t&&n.className(_,y.t=J),B!==y.a&&n.className(pt,y.a=B),y},{e:void 0,t:void 0,a:void 0}),a})()}var Ze=n.template("<input class=tm-number type=text inputmode=decimal>"),tn=n.template("<div class=tm-setting-input><span class=tm-muted>ms"),en=n.template("<span class=tm-pill-dot>"),nn=n.template('<div class="tm-pill tm-pill-preview"><span class=tm-pill-segments>'),sn=n.template("<span class=tm-muted>"),rn=n.template("<div class=tm-settings-section-head><p class=tm-muted></p><div class=tm-settings-actions>"),on=n.template("<div class=tm-price-head><span></span><span></span><span></span><span></span><span></span><span></span><span>"),ln=n.template("<span class=tm-pill-sep>·"),an=n.template("<span>"),cn=n.template("<span class=tm-segment-order>"),un=n.template("<div class=tm-segment-control><button type=button class=tm-order-button>↑ </button><button type=button class=tm-order-button>↓ "),pn=n.template('<p class="tm-muted tm-settings-note">'),dn=n.template('<div class="tm-muted tm-empty">'),mn=n.template("<div class=tm-price-row>");const gn={context:"43%",tps:"27.3",ttft:"820 ms",turnCost:"$0.012",turnTokens:"12.4k",cacheHit:"68%",model:"sonnet-4.5",status:"streaming",steps:"3",elapsed:"12 s",sessionTokens:"432k",sessionCost:"$0.84"};function hn(e){const t=Number(e);return Number.isFinite(t)?t:0}function G(e){const[t,s]=h.createSignal(String(e.value));h.createEffect(()=>{s(String(e.value))});const r=()=>{const i=Number(t());if(!Number.isFinite(i)){s(String(e.value));return}e.onCommit(i)};return(()=>{var i=Ze();return i.$$keydown=l=>{l.key==="Enter"&&l.currentTarget.blur()},i.addEventListener("blur",r),i.$$input=l=>s(l.currentTarget.value),n.effect(l=>{var c=e.label,u=e.placeholder;return c!==l.e&&n.setAttribute(i,"aria-label",l.e=c),u!==l.t&&n.setAttribute(i,"placeholder",l.t=u),l},{e:void 0,t:void 0}),n.effect(()=>i.value=t()),i})()}function fn(e){const t=e.ctx,s=t.stores.prefs,r=()=>s.value,i=o=>s.update(d=>{d.pill||(d.pill={...ct.pill,segments:[...ct.pill.segments]}),o(d)}),l=()=>r().pill??ct.pill,c=(o,d,m)=>{i(g=>{const a=g.prices[o];a&&(d==="providerID"||d==="modelID"?a[d]=m:a[d]=hn(m))})},u=()=>{i(o=>{o.prices.push({providerID:"",modelID:"",input:0,output:0,cacheRead:0,cacheWrite:0})})},v=o=>{i(d=>{d.prices.splice(o,1)})},f=()=>{i(o=>{o.prices.splice(0,o.prices.length)})},b=()=>{const o=t.sessions.current();if(!o){t.toast.show({variant:"default",title:t.t("settings.noSession")});return}const d=o.server.data?.location?.model?.list?.(o.location)??[];if(d.length===0){t.toast.show({variant:"default",title:t.t("settings.noModels")});return}i(m=>{const g=new Set(m.prices.map(a=>`${a.providerID}/${a.modelID}`));for(const a of d){const S=a?.modelID??a?.id;if(!a?.providerID||!S)continue;const $=`${a.providerID}/${S}`;if(g.has($))continue;const C=(a.cost??[]).find(_=>_?.tier===void 0)??(a.cost??[])[0];C&&(m.prices.push({providerID:a.providerID,modelID:S,input:Number(C.input)||0,output:Number(C.output)||0,cacheRead:Number(C.cache?.read)||0,cacheWrite:Number(C.cache?.write)||0}),g.add($))}}),t.toast.show({variant:"success",title:t.t("settings.imported")})},M=o=>{i(d=>{d.pill.preset=o;const m=_t[o];m&&(d.pill.segments=[...m])})},D=()=>at(l()),k=o=>D().includes(o),A=o=>D().indexOf(o),z=(o,d)=>{i(m=>{const g=at(m.pill),a=d?g.includes(o)?g:[...g,o]:g.filter(S=>S!==o);m.pill.preset="custom",m.pill.segments=a})},W=(o,d)=>{i(m=>{const g=[...at(m.pill)],a=g.indexOf(o),S=a+d;a<0||S<0||S>=g.length||(g.splice(a,1),g.splice(S,0,o),m.pill.preset="custom",m.pill.segments=g)})},I=(o,d)=>{i(m=>{m.pill[o]=d})},X=o=>{i(d=>{d.pill.clickAction=o})},H=o=>{const d=l().showLabels?`${t.t(wt(o))} `:"",m=o==="tps"&&l().showUnits?" tok/s":"";return`${d}${gn[o]}${m}`},Y=()=>{const o=at(l()),d=Math.max(1,Math.min(6,Math.round(l().maxSegments)));return o.slice(0,d)};return n.createComponent(t.ui.SettingsLayout,{get title(){return t.t("settings.title")},get description(){return t.t("settings.description")},get actions(){return n.createComponent(t.ui.Button,{variant:"neutral",size:"small",icon:"download",onClick:b,get children(){return t.t("settings.import")}})},get children(){return[n.createComponent(t.ui.SettingsSection,{get title(){return t.t("settings.behavior")},get children(){return[n.createComponent(t.ui.SettingsRow,{id:"behavior",get title(){return t.t("settings.priceMode")},get description(){return t.t("settings.priceMode.description")},get children(){return n.createComponent(t.ui.Select,{get label(){return t.t("settings.priceMode")},get value(){return r().priceMode},onChange:o=>i(d=>{d.priceMode=o}),get options(){return[{value:"custom-then-catalog",label:t.t("settings.priceMode.fallback")},{value:"custom",label:t.t("settings.priceMode.custom")}]}})}}),n.createComponent(t.ui.SettingsRow,{get title(){return t.t("settings.window")},get description(){return t.t("settings.window.description")},get children(){var o=tn(),d=o.firstChild;return n.insert(o,n.createComponent(G,{get label(){return t.t("settings.window")},get value(){return r().tpsWindowMs},onCommit:m=>i(g=>{g.tpsWindowMs=Math.max(500,Math.min(15e3,m))})}),d),o}}),n.createComponent(t.ui.SettingsRow,{get title(){return t.t("settings.subagents")},get description(){return t.t("settings.subagents.description")},get children(){return n.createComponent(t.ui.Switch,{get label(){return t.t("settings.subagents")},hideLabel:!0,get checked(){return r().includeSubagents},onChange:o=>i(d=>{d.includeSubagents=o})})}})]}}),n.createComponent(t.ui.SettingsSection,{get title(){return t.t("settings.pill")},get children(){return[n.createComponent(t.ui.SettingsRow,{get title(){return t.t("settings.headerPill")},get description(){return t.t("settings.headerPill.description")},get children(){return n.createComponent(t.ui.Switch,{get label(){return t.t("settings.headerPill")},hideLabel:!0,get checked(){return r().showHeaderPill},onChange:o=>i(d=>{d.showHeaderPill=o})})}}),n.createComponent(t.ui.SettingsRow,{id:"pill",get title(){return t.t("settings.pill.preset")},get description(){return t.t("settings.pill.preset.description")},get children(){return n.createComponent(t.ui.Select,{get label(){return t.t("settings.pill.preset")},get value(){return l().preset},onChange:M,get options(){return[{value:"minimal",label:t.t("settings.pill.preset.minimal")},{value:"standard",label:t.t("settings.pill.preset.standard")},{value:"power",label:t.t("settings.pill.preset.power")},{value:"custom",label:t.t("settings.pill.preset.custom")}]}})}}),n.createComponent(t.ui.SettingsRow,{id:"pill-preview",get title(){return t.t("settings.pill.preview")},get description(){return t.t("settings.pill.preview.description")},get children(){var o=nn(),d=o.firstChild;return n.insert(o,n.createComponent(h.Show,{get when(){return l().showIcon},get children(){return n.createComponent(t.ui.Icon,{name:"window-analytics",size:"small"})}}),d),n.insert(d,n.createComponent(h.For,{get each(){return Y()},children:(m,g)=>[n.createComponent(h.Show,{get when(){return g()>0},get children(){return ln()}}),(()=>{var a=an();return n.insert(a,()=>H(m)),a})()]})),n.insert(o,n.createComponent(h.Show,{get when(){return l().showLiveDot},get children(){return en()}}),null),o}}),n.createComponent(t.ui.SettingsRow,{get title(){return t.t("settings.pill.max")},get description(){return t.t("settings.pill.max.description")},get children(){return n.createComponent(G,{get label(){return t.t("settings.pill.max")},get value(){return l().maxSegments},onCommit:o=>i(d=>{d.pill.maxSegments=Math.max(1,Math.min(6,Math.round(o)))})})}}),n.createComponent(t.ui.SettingsRow,{get title(){return t.t("settings.pill.compact")},get description(){return t.t("settings.pill.compact.description")},get children(){return n.createComponent(G,{get label(){return t.t("settings.pill.compact")},get value(){return l().compactSegments},onCommit:o=>i(d=>{d.pill.compactSegments=Math.max(1,Math.min(4,Math.round(o)))})})}}),n.createComponent(t.ui.SettingsRow,{get title(){return t.t("settings.pill.icon")},get children(){return n.createComponent(t.ui.Switch,{get label(){return t.t("settings.pill.icon")},hideLabel:!0,get checked(){return l().showIcon},onChange:o=>I("showIcon",o)})}}),n.createComponent(t.ui.SettingsRow,{get title(){return t.t("settings.pill.units")},get children(){return n.createComponent(t.ui.Switch,{get label(){return t.t("settings.pill.units")},hideLabel:!0,get checked(){return l().showUnits},onChange:o=>I("showUnits",o)})}}),n.createComponent(t.ui.SettingsRow,{get title(){return t.t("settings.pill.labels")},get children(){return n.createComponent(t.ui.Switch,{get label(){return t.t("settings.pill.labels")},hideLabel:!0,get checked(){return l().showLabels},onChange:o=>I("showLabels",o)})}}),n.createComponent(t.ui.SettingsRow,{get title(){return t.t("settings.pill.liveDot")},get children(){return n.createComponent(t.ui.Switch,{get label(){return t.t("settings.pill.liveDot")},hideLabel:!0,get checked(){return l().showLiveDot},onChange:o=>I("showLiveDot",o)})}}),n.createComponent(t.ui.SettingsRow,{get title(){return t.t("settings.pill.tooltip")},get children(){return n.createComponent(t.ui.Switch,{get label(){return t.t("settings.pill.tooltip")},hideLabel:!0,get checked(){return l().showTooltip},onChange:o=>I("showTooltip",o)})}}),n.createComponent(t.ui.SettingsRow,{get title(){return t.t("settings.pill.contextTone")},get children(){return n.createComponent(t.ui.Switch,{get label(){return t.t("settings.pill.contextTone")},hideLabel:!0,get checked(){return l().contextTone},onChange:o=>I("contextTone",o)})}}),n.createComponent(t.ui.SettingsRow,{get title(){return t.t("settings.pill.click")},get description(){return t.t("settings.pill.click.description")},get children(){return n.createComponent(t.ui.Select,{get label(){return t.t("settings.pill.click")},get value(){return l().clickAction},onChange:X,get options(){return[{value:"toggle",label:t.t("settings.pill.click.toggle")},{value:"open",label:t.t("settings.pill.click.open")},{value:"settings",label:t.t("settings.pill.click.settings")},{value:"none",label:t.t("settings.pill.click.none")}]}})}}),n.createComponent(t.ui.SettingsRow,{get title(){return t.t("settings.pill.segments")},get description(){return t.t("settings.pill.segments.description")},get children(){var o=sn();return n.insert(o,()=>t.t("settings.pill.segments.hint")),o}}),n.createComponent(h.For,{each:Yt,children:o=>n.createComponent(t.ui.SettingsRow,{id:`pill-${o}`,get title(){return t.t(wt(o))},get description(){return t.t("settings.pill.segment.description")},get children(){var d=un(),m=d.firstChild,g=m.nextSibling;return n.insert(d,n.createComponent(h.Show,{get when(){return k(o)},get children(){var a=cn();return n.insert(a,()=>A(o)+1),a}}),m),m.$$click=()=>W(o,-1),g.$$click=()=>W(o,1),n.insert(d,n.createComponent(t.ui.Switch,{get label(){return t.t(wt(o))},hideLabel:!0,get checked(){return k(o)},onChange:a=>z(o,a)}),null),n.effect(a=>{var S=t.t("settings.pill.up"),$=!k(o)||A(o)<=0,C=t.t("settings.pill.down"),_=!k(o)||A(o)<0||A(o)>=D().length-1;return S!==a.e&&n.setAttribute(m,"aria-label",a.e=S),$!==a.t&&(m.disabled=a.t=$),C!==a.a&&n.setAttribute(g,"aria-label",a.a=C),_!==a.o&&(g.disabled=a.o=_),a},{e:void 0,t:void 0,a:void 0,o:void 0}),d}})})]}}),n.createComponent(t.ui.SettingsSection,{get title(){return t.t("settings.prices")},get footer(){return(()=>{var o=pn();return n.insert(o,()=>t.t("settings.priceNote")),o})()},get children(){return[(()=>{var o=rn(),d=o.firstChild,m=d.nextSibling;return n.insert(d,()=>t.t("settings.prices.description")),n.insert(m,n.createComponent(t.ui.Button,{variant:"neutral",size:"small",icon:"plus",onClick:u,get children(){return t.t("settings.add")}}),null),n.insert(m,n.createComponent(t.ui.Button,{variant:"ghost",size:"small",icon:"trash",onClick:f,get children(){return t.t("settings.clear")}}),null),o})(),(()=>{var o=on(),d=o.firstChild,m=d.nextSibling,g=m.nextSibling,a=g.nextSibling,S=a.nextSibling,$=S.nextSibling;return n.insert(d,()=>t.t("settings.provider")),n.insert(m,()=>t.t("settings.model")),n.insert(g,()=>t.t("settings.input")),n.insert(a,()=>t.t("settings.output")),n.insert(S,()=>t.t("settings.cacheRead")),n.insert($,()=>t.t("settings.cacheWrite")),o})(),n.createComponent(h.For,{get each(){return r().prices},get fallback(){return(()=>{var o=dn();return n.insert(o,()=>t.t("settings.empty")),o})()},children:(o,d)=>(()=>{var m=mn();return n.insert(m,n.createComponent(t.ui.TextInput,{get label(){return t.t("settings.provider")},get value(){return o.providerID},placeholder:"anthropic",onInput:g=>c(d(),"providerID",g)}),null),n.insert(m,n.createComponent(t.ui.TextInput,{get label(){return t.t("settings.model")},get value(){return o.modelID},placeholder:"claude-sonnet-4-5",onInput:g=>c(d(),"modelID",g)}),null),n.insert(m,n.createComponent(G,{get label(){return t.t("settings.input")},get value(){return o.input},onCommit:g=>c(d(),"input",String(g))}),null),n.insert(m,n.createComponent(G,{get label(){return t.t("settings.output")},get value(){return o.output},onCommit:g=>c(d(),"output",String(g))}),null),n.insert(m,n.createComponent(G,{get label(){return t.t("settings.cacheRead")},get value(){return o.cacheRead},onCommit:g=>c(d(),"cacheRead",String(g))}),null),n.insert(m,n.createComponent(G,{get label(){return t.t("settings.cacheWrite")},get value(){return o.cacheWrite},onCommit:g=>c(d(),"cacheWrite",String(g))}),null),n.insert(m,n.createComponent(t.ui.IconButton,{icon:"trash",get label(){return t.t("settings.remove")},variant:"ghost-muted",size:"small",onClick:()=>v(d())}),null),m})()})]}})]}})}n.delegateEvents(["input","keydown","click"]);const vn=F.Plugin.define({...$e,setup(e){e.add(F.Style,Ce);const t={id:"monitor",get title(){return e.t("panel.title")},closable:"compact",fallback:!0};e.add(F.Command,()=>({id:"open",title:e.t("command.open"),description:e.t("command.open.description"),keywords:"token tokens tps ttft usage cost context monitor",section:"session",slash:{name:"tokens"},run:()=>{const s=e.sessions.current();if(!s){e.toast.show({title:e.t("noSession"),variant:"default"});return}e.layout.toggle(`${e.id}:monitor`,s)}})),e.add(F.Command,()=>({id:"settings",title:e.t("command.settings"),keywords:"token monitor prices cost settings",section:"general",run:()=>e.layout.settings("token-monitor")})),e.add(F.MenuItem,()=>{const s=e.sessions.current();if(s)return{menu:"session.panel",id:"open",title:e.t("menu.open"),icon:"window-analytics",keybind:`${e.id}.open`,opened:e.layout.state(`${e.id}:monitor`,s)!=="closed",run:()=>e.layout.open(`${e.id}:monitor`,s,{background:!0})}}),e.add(F.Panel,{id:"monitor",region:"side",width:340,list:s=>s.open.includes("monitor")?[t]:[],render:s=>n.createComponent(Xe,{ctx:e,get session(){return s.session}})}),e.add(F.SettingsPage,{id:"token-monitor",icon:"window-analytics",get title(){return e.t("settings.title")},entries:[{id:"behavior",get title(){return e.t("settings.behavior")}},{id:"pill",get title(){return e.t("settings.pill")},get description(){return e.t("settings.pill.preset.description")},keywords:"header pill tps context preset segments tooltip"},{id:"pill-preview",get title(){return e.t("settings.pill.preview")},keywords:"preview header pill"},{id:"prices",get title(){return e.t("settings.prices")},get description(){return e.t("settings.prices.description")},keywords:"token price cost model cache"}],render:()=>n.createComponent(fn,{ctx:e})}),e.add(F.Slot,()=>e.stores.prefs.value.showHeaderPill?{at:"session.header",order:10,render:s=>n.createComponent(Oe,{ctx:e,get session(){return s.session},get active(){return s.active},get compact(){return s.compact}})}:void 0)}});exports.default=vn;
