export function openUrl(url: string) {
  const full = url.startsWith("http") ? url : `https://${url}`
  Bun.spawn(["bash", "-c", `xdg-open "${full}" 2>/dev/null || powershell.exe Start-Process "${full}"`], {
    stdout: "ignore",
    stderr: "ignore",
  })
}

export function copyToClipboard(text: string) {
  Bun.spawn(["bash", "-c", `printf '%s' "${text}" | clip.exe 2>/dev/null || printf '%s' "${text}" | xclip -selection clipboard 2>/dev/null || printf '%s' "${text}" | xdotool type --clearmodifiers --file -`], {
    stdout: "ignore",
    stderr: "ignore",
  })
}
