import {
  Command,
  MenuItem,
  Panel,
  Plugin,
  SettingsPage,
  Slot,
  Style,
  type PanelTab,
} from "@opencode/plugin/gui"
import { definition } from "./definition"
import { CSS } from "./styles"
import { HeaderPill } from "./ui/header-pill"
import { TokenPanel } from "./ui/panel"
import { SettingsView } from "./ui/settings"

export default Plugin.define({
  ...definition,
  setup(ctx) {
    ctx.add(Style, CSS)

    const tab: PanelTab = {
      id: "monitor",
      get title() {
        return ctx.t("panel.title")
      },
      closable: "compact",
      fallback: true,
    }

    ctx.add(Command, (): Command => ({
      id: "open",
      title: ctx.t("command.open"),
      description: ctx.t("command.open.description"),
      keywords: "token tokens tps ttft usage cost context monitor",
      section: "session",
      slash: { name: "tokens" },
      run: () => {
        const session = ctx.sessions.current()
        if (!session) {
          ctx.toast.show({ title: ctx.t("noSession"), variant: "default" })
          return
        }
        ctx.layout.toggle(`${ctx.id}:monitor`, session)
      },
    }))

    ctx.add(Command, (): Command => ({
      id: "settings",
      title: ctx.t("command.settings"),
      keywords: "token monitor prices cost settings",
      section: "general",
      run: () => ctx.layout.settings("token-monitor"),
    }))

    ctx.add(MenuItem, () => {
      const session = ctx.sessions.current()
      if (!session) return undefined
      return {
        menu: "session.panel" as const,
        id: "open",
        title: ctx.t("menu.open"),
        icon: "window-analytics" as const,
        keybind: `${ctx.id}.open`,
        opened: ctx.layout.state(`${ctx.id}:monitor`, session) !== "closed",
        run: () => ctx.layout.open(`${ctx.id}:monitor`, session, { background: true }),
      }
    })

    ctx.add(Panel, {
      id: "monitor",
      region: "side",
      width: 340,
      list: (input) => (input.open.includes("monitor") ? [tab] : []),
      render: (props) => <TokenPanel ctx={ctx} session={props.session} />,
    })

    ctx.add(SettingsPage, {
      id: "token-monitor",
      icon: "window-analytics",
      get title() {
        return ctx.t("settings.title")
      },
      entries: [
        {
          id: "behavior",
          get title() {
            return ctx.t("settings.behavior")
          },
        },
        {
          id: "pill",
          get title() {
            return ctx.t("settings.pill")
          },
          get description() {
            return ctx.t("settings.pill.preset.description")
          },
          keywords: "header pill tps context preset segments tooltip",
        },
        {
          id: "pill-preview",
          get title() {
            return ctx.t("settings.pill.preview")
          },
          keywords: "preview header pill",
        },
        {
          id: "prices",
          get title() {
            return ctx.t("settings.prices")
          },
          get description() {
            return ctx.t("settings.prices.description")
          },
          keywords: "token price cost model cache",
        },
      ],
      render: () => <SettingsView ctx={ctx} />,
    })

    ctx.add(Slot, () =>
      ctx.stores.prefs.value.showHeaderPill
        ? {
            at: "session.header" as const,
            order: 10,
            render: (input: any) => (
              <HeaderPill
                ctx={ctx}
                session={input.session}
                active={input.active}
                compact={input.compact}
              />
            ),
          }
        : undefined,
    )
  },
})

