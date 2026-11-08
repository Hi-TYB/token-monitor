import { SessionEngine } from "./stats"

type Listener = () => void

type Entry = {
  key: string
  ctx: any
  session: any
  engine: SessionEngine
  refs: number
  listeners: Set<Listener>
  data: any
  cleanups: Array<() => void>
  timer?: number
}

const entries = new Map<string, Entry>()

function notify(entry: Entry) {
  for (const listener of entry.listeners) {
    try {
      listener()
    } catch {
      // A window that is going away must not break the other consumers.
    }
  }
}

function detach(entry: Entry) {
  for (const cleanup of entry.cleanups.splice(0)) {
    try {
      cleanup()
    } catch {
      // The server may already be gone.
    }
  }
  if (entry.timer !== undefined) {
    window.clearInterval(entry.timer)
    entry.timer = undefined
  }
  entry.data = undefined
}

function attach(entry: Entry, data: any) {
  if (!data || entry.data === data) return
  detach(entry)
  entry.data = data
  entry.engine.reset()
  entry.engine.hydrate(
    data.session.message.list(entry.session.id) ?? [],
    data.session.get(entry.session.id),
  )

  if (!data.session.get(entry.session.id)) {
    void data.session.sync(entry.session.id).catch(() => undefined)
  }
  if (!data.session.message.list(entry.session.id)?.length) {
    void data.session.message.sync(entry.session.id).catch(() => undefined)
  }
  if (entry.session.location && !data.location.model.list(entry.session.location)) {
    void data.location.sync(entry.session.location).catch(() => undefined)
  }

  const on = (type: string, handler: (event: any) => void) => (data.on as any)(type, handler)
  const hydrate = () => {
    entry.engine.reset()
    entry.engine.hydrate(
      data.session.message.list(entry.session.id) ?? [],
      data.session.get(entry.session.id),
    )
    notify(entry)
  }
  const handleStepEnd = (event: any) => {
    const messageID = event?.data?.assistantMessageID
    const message = messageID ? data.session.message.get(entry.session.id, messageID) : undefined
    entry.engine.setStepModel(messageID, message?.model)
    entry.engine.handle(event)
    entry.engine.setStepModel(messageID, message?.model)
    notify(entry)
  }
  const handle = (event: any) => {
    entry.engine.handle(event)
  }
  const handleImportant = (event: any) => {
    entry.engine.handle(event)
    notify(entry)
  }

  const unsubscribers = [
    on("session.execution.started", handleImportant),
    on("session.step.started", handleImportant),
    on("session.text.started", handle),
    on("session.reasoning.started", handle),
    on("session.tool.input.started", handle),
    on("session.text.delta", handle),
    on("session.reasoning.delta", handle),
    on("session.tool.input.delta", handle),
    on("session.text.ended", handle),
    on("session.reasoning.ended", handle),
    on("session.tool.input.ended", handle),
    on("session.step.streamed", handleImportant),
    on("session.step.ended", handleStepEnd),
    on("session.step.failed", handleStepEnd),
    on("session.retry.scheduled", handleImportant),
    on("session.usage.updated", handleImportant),
    on("session.compaction.started", handleImportant),
    on("session.compaction.ended", handleImportant),
    on("session.compaction.failed", handleImportant),
    on("session.execution.succeeded", handleImportant),
    on("session.execution.failed", handleImportant),
    on("session.execution.interrupted", handleImportant),
    on("session.idle", handleImportant),
    on("session.revert.staged", hydrate),
    on("session.revert.cleared", hydrate),
    on("session.revert.committed", hydrate),
    on("server.connected", hydrate),
  ]

  const timer = window.setInterval(() => {
    entry.engine.tick()
    notify(entry)
  }, 200)

  entry.timer = timer
  entry.cleanups.push(() => {
    for (const unsubscribe of unsubscribers) {
      try {
        unsubscribe()
      } catch {
        // The server may already be gone.
      }
    }
  })
}

export type EngineHandle = {
  engine: SessionEngine
  attach(data: any): void
  hydrate(messages: any[], info?: any): void
  release(): void
}

export function acquireSessionEngine(ctx: any, session: any, listener: Listener): EngineHandle {
  const key = session.key ?? `${session.server?.id ?? "server"}\n${session.id}`
  let entry = entries.get(key)

  if (!entry) {
    entry = {
      key,
      ctx,
      session,
      engine: new SessionEngine(session.id, ctx.stores.prefs.value.tpsWindowMs ?? 2000),
      refs: 0,
      listeners: new Set(),
      data: undefined,
      cleanups: [],
    }
    entries.set(key, entry)
  } else {
    entry.ctx = ctx
    entry.session = session
  }

  entry.refs += 1
  entry.listeners.add(listener)
  let released = false

  return {
    engine: entry.engine,
    attach(data) {
      attach(entry!, data)
    },
    hydrate(messages, info) {
      entry!.engine.hydrate(messages, info)
    },
    release() {
      if (released) return
      released = true
      entry!.refs -= 1
      entry!.listeners.delete(listener)
      if (entry!.refs <= 0) {
        detach(entry!)
        entries.delete(key)
      }
    },
  }
}
