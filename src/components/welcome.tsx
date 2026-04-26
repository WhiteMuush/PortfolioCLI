import { createSignal, onMount, onCleanup } from "solid-js"
import { theme } from "../theme"

export function Welcome(props: { onDone: () => void }) {
  const fullText = "Bienvenue sur mon portfolio"
  const [displayed, setDisplayed] = createSignal("")

  onMount(() => {
    let i = 0
    const typing = setInterval(() => {
      i++
      setDisplayed(fullText.slice(0, i))
      if (i >= fullText.length) {
        clearInterval(typing)
        setTimeout(props.onDone, 1000)
      }
    }, 50)
    onCleanup(() => clearInterval(typing))
  })

  return (
    <box
      width="100%"
      height="100%"
      backgroundColor={theme.background}
      justifyContent="center"
      alignItems="center"
    >
      <text fg={theme.primary}><b>{displayed()}</b></text>
    </box>
  )
}
