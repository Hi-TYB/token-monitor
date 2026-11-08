import { Plugin } from "@opencode/plugin"

/**
 * The GUI is the product. This tiny server part exists so the desktop app can
 * discover the package, give it an id, and serve its ./gui-experimental bundle.
 */
export default Plugin.define({
  id: "token-monitor",
  setup() {},
})
