import { For } from "solid-js"
import { theme } from "../theme"
import type { Project } from "../data/projects"

function Divider() {
  return <text fg={theme.border}>{"─".repeat(48)}</text>
}

function SectionTitle(props: { children: string }) {
  return <text fg={theme.accent}><b>{props.children}</b></text>
}

export function Content(props: { project: Project }) {
  const p = () => props.project

  return (
    <box flexGrow={1} height="100%" backgroundColor={theme.background} flexDirection="row">
      <scrollbox
        flexGrow={1}
        paddingLeft={2}
        paddingRight={3}
        paddingTop={2}
        paddingBottom={2}
      >
        <text fg={theme.primary}><b>◈ {p().name}</b></text>
        <text fg={theme.textMuted}>{p().tagline}</text>
        <box height={1} />
        <text fg={theme.border}>{"─".repeat(42)}</text>

        <box height={1} />

        <text fg={theme.text}>{p().description}</text>

        <box height={1} />

        <SectionTitle>Features</SectionTitle>
        <Divider />
        <For each={p().features}>
          {(feature) => {
            const idx = feature.indexOf(":")
            const before = idx >= 0 ? feature.slice(0, idx + 1) : feature
            const after = idx >= 0 ? feature.slice(idx + 1) : ""
            return (
              <text>
                <span style={{ fg: theme.primary }}>  ●</span>{" "}<span style={{ fg: theme.text }}>{before}</span><span style={{ fg: theme.textMuted }}>{after}</span>
              </text>
            )
          }}
        </For>

        <box height={1} />

        <SectionTitle>Stack</SectionTitle>
        <Divider />
        <text fg={theme.info}><For each={p().tech}>{(t, i) => <><b>{t}</b>{i() < p().tech.length - 1 ? "  ·  " : ""}</>}</For></text>

      </scrollbox>

      {p().ascii && (
        <box
          backgroundColor={theme.backgroundElement}
          paddingLeft={1}
          paddingRight={1}
          paddingTop={2}
          flexShrink={0}
        >
          <text fg={theme.accent}>{p().ascii!}</text>
        </box>
      )}
    </box>
  )
}