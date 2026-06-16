#!/usr/bin/env bash
set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
RESET='\033[0m'

ok()   { echo -e "${GREEN}✔${RESET} $*"; }
warn() { echo -e "${YELLOW}!${RESET} $*"; }
err()  { echo -e "${RED}✘${RESET} $*"; }
info() { echo -e "${CYAN}→${RESET} $*"; }

echo -e "${BOLD}Portfolio CLI, checking dependencies${RESET}"
echo "─────────────────────────────────────────────"

# ── Bun ──────────────────────────────────────────
if command -v bun &>/dev/null; then
  BUN_VERSION=$(bun --version)
  ok "bun $BUN_VERSION"
else
  err "bun not found"
  warn "Bun is required to run the portfolio."
  echo -n "Install bun now? [Y/n] "
  read -r REPLY
  if [[ "${REPLY:-Y}" =~ ^[Yy]$ ]]; then
    info "Installing bun…"
    curl -fsSL https://bun.sh/install | bash
    export PATH="$HOME/.bun/bin:$PATH"
    if command -v bun &>/dev/null; then
      ok "bun installed, $(bun --version)"
    else
      err "Installation failed. Restart the terminal then try again."
      exit 1
    fi
  else
    err "bun is required. Aborting."
    exit 1
  fi
fi

# ── node_modules ─────────────────────────────────
if [[ -d node_modules ]]; then
  ok "node_modules present"
else
  warn "npm dependencies missing."
  echo -n "Run 'bun install'? [Y/n] "
  read -r REPLY
  if [[ "${REPLY:-Y}" =~ ^[Yy]$ ]]; then
    info "Installing packages…"
    bun install
    ok "Packages installed"
  else
    err "Packages are required. Aborting."
    exit 1
  fi
fi

# ── Lancement ─────────────────────────────────────
echo "─────────────────────────────────────────────"
info "Launching the portfolio…"
exec bun run bin/portfolio.ts
