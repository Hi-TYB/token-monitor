import { createEffect, createMemo, createSignal, onCleanup } from "solid-js"
import { acquireSessionEngine } from "../engine/hub"
import { computeContext } from "./context"

/**
 * One engine per session, shared by the panel and the header pill. The hub
 * owns the event subscription and the 200ms tick; consumers only acquire a
 * reference and react to its notifications.
 */
export function useSessionEngine(ctx: any, session: any) {
  const [tick, setTick] = createSignal(0)
  const handle = acquireSessionEngine(ctx, session, () => setTick((value) => value + 1))
  const data = () => session.server.data
  const prefs = () => ctx.stores.prefs.value

  createEffect(() => {
    const value = data()
    if (value) handle.attach(value)
  })

  createEffect(() => {
    handle.engine.setWindow(prefs().tpsWindowMs ?? 2000)
  })

  createEffect(() => {
    const value = data()
    if (!value) return
    const messages = value.session.message.list(session.id) ?? []
    if (messages.length > 0) handle.hydrate(messages, value.session.get(session.id))
  })

  onCleanup(() => handle.release())

  const snapshot = createMemo(() => {
    tick()
    return handle.engine.snapshot(Date.now())
  })

  const context = createMemo(() => {
    tick()
    return computeContext(data(), session)
  })

  return { engine: handle.engine, snapshot, context, data, prefs }
}
