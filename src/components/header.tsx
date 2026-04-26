import { createSignal, onMount, onCleanup } from "solid-js"
import { theme } from "../theme"

const sequence = [
  { text: "Portfolio",                          color: theme.primary },
  { text: "DevSecOps",                          color: theme.accent },
  { text: "Reconnaître. Exploiter. Défendre.",  color: theme.warning },
  { text: "Red Team · Blue Team · Purple Team", color: theme.info },
  { text: "DevSecOps Portfolio",                color: theme.textMuted },
]

function AnimatedTitle() {
  const [displayed, setDisplayed] = createSignal("")
  const [color, setColor] = createSignal(sequence[0]!.color)

  onMount(() => {
    let phraseIdx = 0
    let charIdx = 0
    let phase: "typing" | "pausing" | "deleting" = "typing"
    let timer: ReturnType<typeof setTimeout>

    const step = () => {
      const entry = sequence[phraseIdx]!
      const isLast = phraseIdx === sequence.length - 1

      if (phase === "typing") {
        charIdx++
        setDisplayed(entry.text.slice(0, charIdx))
        if (charIdx >= entry.text.length) {
          phase = "pausing"
          timer = setTimeout(step, isLast ? 0 : 900)
          return
        }
        timer = setTimeout(step, 55)
      } else if (phase === "pausing") {
        if (isLast) return
        phase = "deleting"
        timer = setTimeout(step, 40)
      } else if (phase === "deleting") {
        charIdx--
        setDisplayed(entry.text.slice(0, charIdx))
        if (charIdx <= 0) {
          phraseIdx++
          setColor(sequence[phraseIdx]!.color)
          phase = "typing"
          timer = setTimeout(step, 250)
          return
        }
        timer = setTimeout(step, 28)
      }
    }

    timer = setTimeout(step, 400)
    onCleanup(() => clearTimeout(timer))
  })

  return <text fg={color()}>{displayed()}</text>
}

export function Header() {
  return (
    <box
      backgroundColor={theme.backgroundPanel}
      width="100%"
      flexShrink={0}
      flexDirection="row"
      justifyContent="space-between"
      paddingLeft={3}
      paddingRight={3}
      paddingTop={1}
      paddingBottom={1}
    >
      <text fg={theme.primary}>
        <b>◈ Melvin Petit</b>
      </text>
      <AnimatedTitle />
      <text fg={theme.textMuted}>melvin.petit31@gmail.com</text>
    </box>
  )
}
