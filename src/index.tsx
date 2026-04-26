import { createCliRenderer } from "@opentui/core"
import { render } from "@opentui/solid"
import { App } from "./app"
import type { Project } from "./data/projects"
import { join } from "node:path"
import { existsSync } from "node:fs"

async function main() {
  while (true) {
    const renderer = await createCliRenderer({ targetFps: 30, exitOnCtrlC: false, useMouse: true })
    let pendingLaunch: Project | null = null

    const onExit = () => renderer.destroy()
    process.on("exit", onExit)

    const rendererDone = new Promise<void>(resolve => {
      renderer.once("destroy", resolve)
    })

    render(() => <App onLaunch={(project) => {
      pendingLaunch = project
      renderer.destroy()
    }} />, renderer)

    await rendererDone
    process.removeListener("exit", onExit)

    if (!pendingLaunch) {
      // L'utilisateur a pressé q → process.exit() a déjà été appelé
      process.exit(0)
    }

    const project = pendingLaunch as Project
    const dir = join(process.env.HOME!, ".portfolio-cli", project.id)

    if (!existsSync(dir)) {
      process.stdout.write(`\nClonage de ${project.name}...\n`)
      const clone = Bun.spawn(["git", "clone", project.repo!, dir], {
        stdout: "inherit",
        stderr: "inherit",
      })
      await clone.exited
      if (clone.exitCode !== 0) {
        process.stderr.write("Erreur lors du clonage.\n")
        continue
      }
    }

    const proc = Bun.spawn(project.run!, {
      cwd: dir,
      stdin: "inherit",
      stdout: "inherit",
      stderr: "inherit",
    })
    await proc.exited

    // Boucle : le portfolio se relance automatiquement
  }
}

await main()
