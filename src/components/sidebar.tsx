import { For, createSignal } from "solid-js"
import { theme } from "../theme"
import { projects } from "../data/projects"

export function Sidebar(props: { selected: number; onSelect: (i: number) => void }) {
  const [hovered, setHovered] = createSignal(-1)

  return (
    <box
      backgroundColor={theme.backgroundPanel}
      width={20}
      height="100%"
      flexShrink={0}
      paddingTop={2}
      paddingBottom={2}
      paddingLeft={2}
      paddingRight={1}
    >
      <text fg={theme.accent}><b>Projects</b></text>
      <box height={1} />
      <For each={projects}>
        {(project, i) => {
          const active = () => i() === props.selected
          const hovering = () => i() === hovered()
          return (
            <box
              flexDirection="row"
              gap={1}
              paddingTop={0}
              paddingBottom={1}
              onMouseDown={() => props.onSelect(i())}
              onMouseOver={() => setHovered(i())}
              onMouseOut={() => setHovered(-1)}
            >
              <text fg={active() ? theme.primary : theme.border}>│</text>
              <text fg={active() ? theme.text : hovering() ? theme.accent : theme.textMuted}>
                {active() ? <b>{project.name}</b> : project.name}
              </text>
            </box>
          )
        }}
      </For>
    </box>
  )
}
