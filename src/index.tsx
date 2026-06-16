import { createCliRenderer } from "@opentui/core"
import { render } from "@opentui/solid"
import { App } from "./app"
import type { Project } from "./data/projects"
import { join } from "node:path"
import { existsSync } from "node:fs"

async function main() {
  let firstRun = true
  while (true) {
    const renderer = await createCliRenderer({ targetFps: 30, exitOnCtrlC: false, useMouse: true })
    let pendingLaunch: Project | null = null

    const onExit = () => renderer.destroy()
    process.on("exit", onExit)

    const rendererDone = new Promise<void>(resolve => {
      renderer.once("destroy", resolve)
    })

    render(() => <App skipWelcome={!firstRun} onLaunch={(project) => {
      pendingLaunch = project
      renderer.destroy()
    }} />, renderer)
    firstRun = false

    await rendererDone
    process.removeListener("exit", onExit)

    if (!pendingLaunch) {
      // User pressed q, process.exit() was already called
      process.exit(0)
    }

    const project = pendingLaunch as Project
    const dir = join(process.env.HOME!, ".portfolio-cli", project.id)

    if (!Bun.which("git")) {
      process.stderr.write("git not found. Install git then try again.\n")
      continue
    }

    if (!existsSync(dir)) {
      process.stdout.write(`\nCloning ${project.name}...\n`)
      const clone = Bun.spawn(["git", "clone", project.repo!, dir], {
        stdout: "inherit",
        stderr: "inherit",
      })
      await clone.exited
      if (clone.exitCode !== 0) {
        process.stderr.write("Error while cloning.\n")
        continue
      }
    } else {
      process.stdout.write(`\nUpdating ${project.name}...\n`)
      const pull = Bun.spawn(["git", "-C", dir, "pull", "--ff-only"], {
        stdout: "inherit",
        stderr: "inherit",
      })
      await pull.exited
      // Pull failure is non-fatal: run the existing checkout.
    }

    const proc = Bun.spawn(project.run!, {
      cwd: dir,
      stdin: "inherit",
      stdout: "inherit",
      stderr: "inherit",
    })
    await proc.exited

    // Loop: the portfolio relaunches automatically
  }
}

await main()
