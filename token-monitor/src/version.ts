export const BUILT_FOR = "2.2.6"

export function versionWarning(current: string | undefined): string | undefined {
  if (!current) return undefined
  const running = current.split(".").slice(0, 2).join(".")
  const built = BUILT_FOR.split(".").slice(0, 2).join(".")
  return running === built ? undefined : `${BUILT_FOR}|${current}`
}

