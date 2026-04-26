import { theme, toggleTheme } from "../theme"

function Bind(props: { keys: string; label: string; onClick: () => void }) {
  return (
    <box onMouseDown={() => props.onClick()}>
      <text fg={theme.textMuted}>
        <span style={{ fg: theme.primary }}>{props.keys}</span>{"  "}{props.label}
      </text>
    </box>
  )
}

export function Footer(props: {
  launchable: boolean
  onNext: () => void
  onPrev: () => void
  onLaunch: () => void
}) {
  return (
    <box
      backgroundColor={theme.backgroundPanel}
      flexShrink={0}
      flexDirection="row"
      alignItems="center"
      gap={4}
      paddingLeft={3}
      paddingRight={3}
      paddingTop={1}
      paddingBottom={1}
    >
      <Bind keys="j / ↓" label="suivant"   onClick={props.onNext} />
      <Bind keys="k / ↑" label="précédent" onClick={props.onPrev} />
      {props.launchable && <Bind keys="Enter" label="cloner & lancer" onClick={props.onLaunch} />}
      <Bind keys="t"     label="thème"     onClick={toggleTheme} />
      <Bind keys="q"     label="quitter"   onClick={() => process.exit(0)} />
    </box>
  )
}
