import { createMemo, createSignal, Show } from "solid-js"
import { useKeyboard } from "@opentui/solid"
import { Header } from "./components/header"
import { Sidebar } from "./components/sidebar"
import { Content } from "./components/content"
import { Footer } from "./components/footer"
import { Welcome } from "./components/welcome"
import { projects, type Project } from "./data/projects"
import { theme, toggleTheme } from "./theme"

export function App(props: { onLaunch: (project: Project) => void }) {
  const [ready, setReady] = createSignal(false)
  const [selected, setSelected] = createSignal(0)
  const current = createMemo(() => projects[selected()]!)

  useKeyboard((key) => {
    if (key.name === "j" || key.name === "down") {
      setSelected((i) => Math.min(i + 1, projects.length - 1))
      return
    }
    if (key.name === "k" || key.name === "up") {
      setSelected((i) => Math.max(i - 1, 0))
      return
    }
    if (key.name === "return" && current().repo) {
      props.onLaunch(current())
      return
    }
    if (key.name === "t") {
      toggleTheme()
      return
    }
    if (key.name === "q" || (key.ctrl && key.name === "c")) {
      process.exit(0)
    }
  })

  return (
    <box flexDirection="column" width="100%" height="100%" backgroundColor={theme.background}>
      <Show when={!ready()}>
        <Welcome onDone={() => setReady(true)} />
      </Show>
      <Show when={ready()}>
      <Header />

      <box height={1} width="100%" backgroundColor={theme.border} flexShrink={0} />

      <box flexDirection="row" flexGrow={1} minHeight={0}>
        <Sidebar selected={selected()} onSelect={setSelected} />

        <box width={1} height="100%" backgroundColor={theme.border} flexShrink={0} />

        <Content project={current()} />
      </box>

      <box height={1} width="100%" backgroundColor={theme.border} flexShrink={0} />

      <Footer
        launchable={!!current().repo}
        onNext={() => setSelected(i => Math.min(i + 1, projects.length - 1))}
        onPrev={() => setSelected(i => Math.max(i - 1, 0))}
        onLaunch={() => current().repo && props.onLaunch(current())}
      />
      </Show>
    </box>
  )
}
