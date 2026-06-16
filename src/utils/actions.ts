function spawnSilent(cmd: string[], stdin?: string) {
  const proc = Bun.spawn(cmd, {
    stdin: stdin !== undefined ? "pipe" : "ignore",
    stdout: "ignore",
    stderr: "ignore",
  })
  if (stdin !== undefined && proc.stdin) {
    proc.stdin.write(stdin)
    proc.stdin.end()
  }
}

export function openUrl(url: string) {
  const full = url.startsWith("http") ? url : `https://${url}`
  const cmd =
    process.platform === "darwin" ? ["open", full]
    : process.platform === "win32" ? ["cmd", "/c", "start", "", full]
    : ["xdg-open", full]
  spawnSilent(cmd)
}

export function copyToClipboard(text: string) {
  // WSL exposes clip.exe; prefer it when present, else native tools.
  const cmd =
    process.platform === "darwin" ? ["pbcopy"]
    : process.platform === "win32" ? ["clip"]
    : Bun.which("clip.exe") ? ["clip.exe"]
    : Bun.which("wl-copy") ? ["wl-copy"]
    : ["xclip", "-selection", "clipboard"]
  spawnSilent(cmd, text)
}
