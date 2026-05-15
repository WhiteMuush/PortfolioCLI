import { For, Show } from "solid-js"
import { theme } from "../theme"
import type { Project } from "../data/projects"
import { openUrl, copyToClipboard } from "../utils/actions"

function Divider() {
  return <text fg={theme.border}>{"─".repeat(48)}</text>
}

function SectionTitle(props: { children: string }) {
  return <text fg={theme.accent}><b>{props.children}</b></text>
}

export function Content(props: { project: Project }) {
  const p = () => props.project

  return (
    <box flexGrow={1} height="100%" backgroundColor={theme.background} flexDirection="column">
      <Show when={p().headerAscii}>
        <box
          backgroundColor={theme.background}
          paddingLeft={2}
          paddingRight={2}
          paddingTop={1}
          paddingBottom={1}
          flexShrink={0}
        >
          <text fg={theme.accent}>{p().headerAscii}</text>
        </box>
      </Show>

      <box flexGrow={1} flexDirection="row" minHeight={0}>
        <scrollbox
          flexGrow={1}
          paddingLeft={2}
          paddingRight={3}
          paddingTop={2}
          paddingBottom={2}
        >
          <Show when={p().id === "whoami"} fallback={
            <box flexDirection="column">
              <text fg={theme.primary}><b>◈ {p().name}</b></text>
              <text fg={theme.border}>{"─".repeat(42)}</text>
              <box height={1} />
              <text fg={theme.text}>{p().description}</text>
              <box height={1} />
              <SectionTitle>Features</SectionTitle>
              <Divider />
              <For each={p().features ?? []}>
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
              <text fg={theme.info}><For each={p().tech ?? []}>{(t, i) => <><b>{t}</b>{i() < (p().tech?.length ?? 0) - 1 ? "  ·  " : ""}</>}</For></text>
            </box>
          }>
            <box flexDirection="column">
              <text fg={theme.text}>{p().description}</text>
              <box height={1} />
              <text fg={theme.accent}><b>Contact</b></text>
              <text fg={theme.border}>{"─".repeat(42)}</text>
              <For each={p().contact ?? []}>
                {(c) => (
                  <box
                    flexDirection="row"
                    onMouseDown={(e) => {
                      if (!e.modifiers.ctrl) return
                      if (c.action === "url") openUrl(c.value)
                      else if (c.action === "copy") copyToClipboard(c.value)
                    }}
                  >
                    <text fg={theme.primary}>{"  " + c.label.padEnd(10)}</text>
                    <text fg={theme.accent}>{c.value}</text>
                    <text fg={theme.textMuted}>{c.action === "copy" ? "  " : ""}</text>
                  </box>
                )}
              </For>
            </box>
          </Show>
        </scrollbox>

        {p().ascii && (
          <box
            backgroundColor={theme.background}
            paddingLeft={1}
            paddingRight={1}
            paddingTop={2}
            flexShrink={0}
          >
            <text fg={theme.accent}>{p().ascii!}</text>
          </box>
        )}
      </box>
    </box>
  )
}
