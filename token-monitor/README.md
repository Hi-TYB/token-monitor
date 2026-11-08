# Token Monitor

OpenCode Desktop V2 本地 GUI 插件：在会话侧边栏显示实时 Token、TPS、TTFT、费用和上下文占用。

## 已实现

- 实时 TPS：流式 delta 滚动窗口估算，`step.streamed` 后冻结，`step.ended` 后显示精确 TPS
- TTFT：首个 delta 到 `step.started`
- Token 五项：输入、输出、推理、缓存读、缓存写
- 本步 / 本轮 / 会话累计
- 自定义价格表 + 模型目录价格回退，无价格显示 `N/A`
- 上下文窗口占用百分比，官方 `lastAssistantWithUsage` 同口径
- 会话标题栏胶囊：可配置显示上下文、TPS、TTFT、本轮费用、本轮 token、缓存命中率等；Token 总量只在展开面板里显示
- 设置页：预设、指标段开关与排序、实时预览、价格表、TPS 窗口、header pill、子代理统计、从模型目录导入
- 面板和标题栏共享同一个统计引擎，避免重复订阅事件
- 中英文界面

## 安装

插件目录已经在：

```text
C:\Users\34333\.config\opencode\plugins\token-monitor
```

OpenCode 会自动发现全局 `plugins` 目录下的本地插件。当前配置没有额外添加显式路径，避免重复 ID。

安装或更新后：

1. 如果桌面端已经打开，重启 OpenCode Desktop（或刷新窗口）。
2. 打开 **Settings > Extensions > Plugins**，确认 `token-monitor` 已加载。
3. 在会话里使用以下任一入口：
   - 命令面板：`Open Token Monitor`
   - 输入框输入 `/tokens`
   - 会话侧边栏 `+` 菜单：`Token Monitor`
   - 标题栏的上下文胶囊

## 开发

```sh
cd C:\Users\34333\.config\opencode\plugins\token-monitor
npm install
npm run typecheck
npm run build
```

开发时：

```sh
npm run dev
```

`vite build --watch` 会在每次重建后自动重载窗口里的 GUI。

## 胶囊配置

设置页 → `Token Monitor` → `Header pill`。

- 预设：`Minimal`、`Standard`、`Power`、`Custom`
- 可单独开关的指标：上下文、TPS、TTFT、本轮费用、本轮 token、缓存命中率、模型、状态、步数、耗时、会话 token、会话费用
- 用上下按钮调整显示顺序
- 可设置正常模式 / 紧凑模式最多显示几段
- 可开关图标、单位、标签、实时圆点、悬停详情、上下文阈值着色
- 点击行为：切换面板、打开面板、打开设置、不响应
- 设置页内有示例预览

默认：

```text
43% · 27.3 tok/s · $0.012
```

## 价格表

设置页 → `Token Monitor` → `Model prices`。

- 单位：USD / 1M tokens
- 供应商、模型 ID 精确匹配
- `*` 可作为模型 ID 或供应商通配符
- `Custom, then catalog`：自定义价格优先，缺失时使用模型目录价格
- `Custom only`：没有自定义条目就显示 `N/A`
- 推理 token 按输出价格计费

## 指标口径

- `input` 是 V2 的非缓存输入，`cache.read` / `cache.write` 单独统计。
- 总 token = `input + output + reasoning + cache.read + cache.write`。
- TPS 主显示使用官方口径：`(output + reasoning) / (step.streamed - 首个 delta)`。
- 上下文占用 = 最近一个带 usage 的 assistant step 的五项 token 之和 / `model.limit.context`。
- 费用估算公式：

```text
(input * inputPrice + (output + reasoning) * outputPrice
 + cache.read * cacheReadPrice + cache.write * cacheWritePrice) / 1e6
```

## 已知限制

- 流式 token 数是字符估算，step 结束后用 provider 精确 usage 校准并替换。
- V2 的 delta 在 core 中约 100ms 批量推送，所以流式 TPS/TTFT 有约 100ms 级误差。
- 输入、缓存、精确费用只能等 `step.ended`；长工具执行会延迟这些精确值。
- 面板在流中途打开时，TTFT 可能显示 `—`，TPS 从接入时刻开始。
- GUI 插件 API 是 experimental。插件针对 OpenCode Desktop `2.2.6` 构建；升级 Desktop 后请同步升级 `@opencode/plugin` 并重新构建。

## 兼容性

当前目标：

```text
OpenCode Desktop 2.2.6
@opencode/plugin 2.2.6
effect 4.1.0
```

升级 Desktop 后：

```sh
npm view @opencode/plugin version
# 修改 package.json 中的版本
npm install
npm run typecheck
npm run build
```

面板顶部会在主/次版本不一致时显示重新构建提示。
