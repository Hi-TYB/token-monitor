import { Plugin, Store } from "@opencode/plugin/gui"
import { en, zh } from "./i18n"
import { defaultPrefs, PrefsSchema } from "./prefs"

export const definition = Plugin.define({
  stores: {
    prefs: Store.global(PrefsSchema, defaultPrefs),
  },
  i18n: {
    en,
    "zh-CN": zh,
    zh,
  },
})
