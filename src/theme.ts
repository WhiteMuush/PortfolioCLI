import { createSignal } from "solid-js"
import { RGBA } from "@opentui/core"

const light = {
  background:        RGBA.fromInts(245, 239, 230),
  backgroundPanel:   RGBA.fromInts(239, 228, 210),
  backgroundElement: RGBA.fromInts(255, 250, 242),
  border:            RGBA.fromInts(201, 183, 156),
  text:              RGBA.fromInts(59,  47,  42),
  textMuted:         RGBA.fromInts(122, 103, 90),
  primary:           RGBA.fromInts(128, 0,   32),
  accent:            RGBA.fromInts(163, 71,  91),
  success:           RGBA.fromInts(143, 168, 122),
  info:              RGBA.fromInts(126, 163, 176),
  warning:           RGBA.fromInts(212, 167, 106),
}

const dark = {
  background:        RGBA.fromInts(24,  20,  22),
  backgroundPanel:   RGBA.fromInts(34,  28,  31),
  backgroundElement: RGBA.fromInts(46,  38,  42),
  border:            RGBA.fromInts(92,  76,  84),
  text:              RGBA.fromInts(238, 228, 218),
  textMuted:         RGBA.fromInts(178, 160, 147),
  primary:           RGBA.fromInts(160, 28,  60),
  accent:            RGBA.fromInts(196, 94,  118),
  success:           RGBA.fromInts(132, 166, 120),
  info:              RGBA.fromInts(112, 150, 166),
  warning:           RGBA.fromInts(201, 155, 89),
}

export const [isDark, setIsDark] = createSignal(true)
export const toggleTheme = () => setIsDark(v => !v)

export const theme = new Proxy({} as typeof light, {
  get(_, key: string) {
    return (isDark() ? dark : light)[key as keyof typeof light]
  },
})
