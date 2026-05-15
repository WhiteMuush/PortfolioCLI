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

echo -e "${BOLD}Portfolio CLI — vérification des dépendances${RESET}"
echo "─────────────────────────────────────────────"

# ── Bun ──────────────────────────────────────────
if command -v bun &>/dev/null; then
  BUN_VERSION=$(bun --version)
  ok "bun $BUN_VERSION"
else
  err "bun introuvable"
  warn "Bun est requis pour lancer le portfolio."
  echo -n "Installer bun maintenant ? [O/n] "
  read -r REPLY
  if [[ "${REPLY:-O}" =~ ^[Oo]$ ]]; then
    info "Installation de bun…"
    curl -fsSL https://bun.sh/install | bash
    export PATH="$HOME/.bun/bin:$PATH"
    if command -v bun &>/dev/null; then
      ok "bun installé — $(bun --version)"
    else
      err "Échec de l'installation. Relancez le terminal puis réessayez."
      exit 1
    fi
  else
    err "bun est requis. Abandon."
    exit 1
  fi
fi

# ── node_modules ─────────────────────────────────
if [[ -d node_modules ]]; then
  ok "node_modules présent"
else
  warn "Dépendances npm manquantes."
  echo -n "Lancer 'bun install' ? [O/n] "
  read -r REPLY
  if [[ "${REPLY:-O}" =~ ^[Oo]$ ]]; then
    info "Installation des packages…"
    bun install
    ok "Packages installés"
  else
    err "Les packages sont requis. Abandon."
    exit 1
  fi
fi

# ── Lancement ─────────────────────────────────────
echo "─────────────────────────────────────────────"
info "Lancement du portfolio…"
exec bun run bin/portfolio.ts
