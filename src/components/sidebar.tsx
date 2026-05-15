import { For, createSignal } from "solid-js"
import { theme } from "../theme"
import { projects } from "../data/projects"

export function Sidebar(props: { selected: number; onSelect: (i: number) => void }) {
  const [hovered, setHovered] = createSignal(-1)

  const whoami = projects[0]!
  const projectList = projects.slice(1)

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
      <box
        flexDirection="row"
        gap={1}
        paddingBottom={1}
        onMouseDown={() => props.onSelect(0)}
        onMouseOver={() => setHovered(0)}
        onMouseOut={() => setHovered(-1)}
      >
        <text fg={props.selected === 0 ? theme.primary : theme.border}>│</text>
        <text fg={props.selected === 0 ? theme.text : hovered() === 0 ? theme.accent : theme.textMuted}>
          {props.selected === 0 ? <b>{whoami.name}</b> : whoami.name}
        </text>
      </box>

      <box height={1} />
      <text fg={theme.accent}><b>Projects</b></text>
      <box height={1} />

      <For each={projectList}>
        {(project, i) => {
          const idx = i() + 1
          const active = () => idx === props.selected
          const hovering = () => idx === hovered()
          return (
            <box
              flexDirection="row"
              gap={1}
              paddingBottom={1}
              onMouseDown={() => props.onSelect(idx)}
              onMouseOver={() => setHovered(idx)}
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
