import { ascii } from "./ascii"

export type Project = {
  id: string
  name: string
  tagline: string
  description: string
  features: string[]
  tech: string[]
  snippet: string[]
  ascii?: string
  repo?: string
  run?: string[]
}

export const projects: Project[] = [
  {
    id: "sandevistan",
    name: "sandevistan",
    tagline: "Toolkit cybersécurité : reconnaissance, exploitation, post-exploitation",
    description:
      "Plateforme cybersécurité tout-en-un où les outils de reconnaissance, d'exploitation " +
      "et de post-exploitation convergent dans une interface unifiée. 6 modules intégrés : " +
      "recon réseau, scan de vulnérabilités, frameworks d'exploitation, post-exploitation, " +
      "récupération de credentials et génération de payloads.",
    features: [
      "Reconnaissance réseau : Nmap, Masscan, Amass, Recon-ng, theHarvester",
      "Scan de vulnérabilités : Nikto, Nuclei, Wapiti, sqlmap, XSStrike",
      "Frameworks d'exploitation : Metasploit, RouterSploit, BeEF, AutoSploit",
      "Post-exploitation : PEASS-ng, LaZagne, Mimikatz, PowerSploit, Impacket",
      "Récupération de credentials : hashcat, John the Ripper, Hydra, CrackMapExec",
      "Génération de payloads : msfvenom, Veil, TheFatRat, Hoaxshell, Donut",
    ],
    tech: ["Bash", "Python3", "Outils de sécurité"],
    snippet: ["chmod +x sandevistan.sh", "sudo bash sandevistan.sh"],
    repo: "https://github.com/WhiteMuush/sandevistan.git",
    run: ["sudo", "bash", "sandevistan.sh"],
    ascii: ascii.sandevistan,
  },
  {
    id: "Medusa",
    name: "Medusa",
    tagline:
      "Toolkit bash d'orchestration : déploie et gère 35 outils de cybersécurité",
    description:
      "Toolkit bash d'orchestration qui déploie et gère 35 outils open source de cybersécurité " +
      "via un menu interactif ou en ligne de commande. 4 modules : SOC/Detection & Response, " +
      "GRC/Governance & Compliance, Integration (IAM, Cloud, CI/CD), et OT/Industrial Security.",
    features: [
      "14 outils SOC : SIEM, XDR, NDR, CTI, SOAR, forensique endpoint et réseau",
      "5 outils GRC : conformité multi-frameworks (ISO 27001, NIS2, DORA, RGPD)",
      "11 outils Integration : IAM, secrets, scan vulnérabilités, SAST, DAST",
      "5 outils OT : surveillance passive réseaux industriels, cartographie ICS/SCADA",
      "Environnements isolés : lab, audit client, formation",
      "Mots de passe générés aléatoirement, credentials.txt chmod 600",
    ],
    tech: [
      "Bash",
      "Docker",
      "Docker Compose",
      "Git",
      "Python3",
      "OpenSSL",
    ],
    snippet: [
      "medusa_deploy() {",
      "  docker compose -f \"$compose\" up -d",
      "  log_success \"$tool déployé\"",
      "}",
    ],
    ascii: ascii.Medusa,
    repo: "https://github.com/WhiteMuush/Medusa.git",
    run: ["bash", "medusa.sh"],
  },
  {
    id: "Kraken",
    name: "Kraken",
    tagline: "Orchestrateur modulaire de tests de pénétration en Bash",
    description:
      "Framework modulaire et léger en Bash pour orchestrer la reconnaissance, le scan, " +
      "l'énumération et le reporting. Chaque module (« tentacule ») est indépendant et " +
      "remplaçable, avec exécution parallèle et sorties structurées.",
    features: [
      "Reconnaissance : sous-domaines, hôtes, DNS (Amass, Subfinder, theHarvester)",
      "Scan de ports : rapide et détaillé (Nmap, Masscan)",
      "Énumération web : répertoires, découverte techno (ffuf, Gobuster, Wapiti, Nikto)",
      "Évaluation de vulnérabilités : Nuclei, SSLyze, WPScan",
      "Reporting : export structuré des résultats, logs et état",
      "Chaînage CLI : exécution d'un ou plusieurs modules via flags",
    ],
    tech: ["Bash", "Nmap", "Masscan", "Nuclei", "ffuf"],
    snippet: [
      "./kraken.sh --modules recon,ports \\",
      "  --target example.com",
    ],
    ascii: ascii.Kraken,
    repo: "https://github.com/WhiteMuush/Kraken.git",
    run: ["sudo", "bash", "kraken.sh"],
  },
  {
    id: "FeedYourSpider",
    name: "FeedYourSpider",
    tagline: "Lanceur interactif pour outils de recon réseau et capture",
    description:
      "Toolkit bash qui encapsule les outils courants de reconnaissance et capture réseau " +
      "avec des préréglages utiles. Sauvegarde les sorties dans des répertoires horodatés par " +
      "outil et tente d'installer automatiquement les outils manquants sur de nombreuses plateformes.",
    features: [
      "Accès rapide : Nmap, Netcat, tcpdump, TShark, hping3",
      "Intégrations arp-scan, Masscan, Nikto, dnsenum, WhatWeb",
      "Répertoires de sortie horodatés sous $HOME par outil",
      "Installation auto des outils manquants (apt, dnf, yum, pacman, zypper, apk, Homebrew)",
      "Bash léger et compatible POSIX avec quoting sécurisé",
    ],
    tech: ["Bash", "Nmap", "Netcat", "tcpdump", "Masscan"],
    snippet: [
      "run_nmap() {",
      "  nmap \"${NMAP_EXTRA_ARGS[@]}\" \"$TARGET\" \\",
      "    -oN \"$OUT_DIR/nmap_${TIMESTAMP}.nmap\"",
      "}",
    ],
    ascii: ascii.FeedYourSpider,
    repo: "https://github.com/WhiteMuush/FeedYourSpider.git",
    run: ["bash", "feedyourspider.sh"],
  },
  {
    id: "Ghostline",
    name: "Ghostline",
    tagline: "Toolkit d'énumération Active Directory : 10+ outils de sécurité unifiés",
    description:
      "Toolkit bash interactif qui automatise l'énumération Active Directory en intégrant " +
      "10+ outils de sécurité professionnels dans une interface unifiée. Supporte la reconnaissance " +
      "passive et active avec configuration persistante et sorties structurées.",
    features: [
      "Recon passive : Nmap, enum4linux-ng, rpcclient, ldapsearch, dnsrecon",
      "Recon active : collecte BloodHound, CrackMapExec, adidnsdump, GetNPUsers",
      "Configuration cible persistante (IP, domaine, identifiants)",
      "Workflow automatisé sur tous les modules",
      "Scan de vulnérabilités SMB et extraction de secrets domaine",
      "Répertoires de sortie horodatés avec export JSON et XML",
    ],
    tech: ["Bash", "BloodHound", "Impacket", "CrackMapExec", "Nmap"],
    snippet: [
    ],
    ascii: ascii.Ghostline,
    repo: "https://github.com/WhiteMuush/Ghostline.git",
    run: ["bash", "ghostline.sh"],
  },
  {
    id: "Bull",
    name: "Bull",
    tagline: "Provisioning automatisé de VM pentest : hardening et VPN kill-switch",
    description:
      "Toolkit automatisé pour lancer des VM Kali Linux ou Parrot Security entièrement configurées " +
      "avec hardening de sécurité intégré. Gère le provisioning via Vagrant, le /home chiffré avec " +
      "ecryptfs, les credentials sécurisés par GPG, le VPN kill-switch et les snapshots pour " +
      "retour arrière avant les opérations risquées.",
    features: [
      "Provisioning auto de VM Kali/Parrot via Vagrant",
      "VPN kill-switch : bloque le trafic si le VPN tombe",
      "/home chiffré avec ecryptfs",
      "Credentials GPG : AES256, SHA512, 65M itérations",
      "Snapshots : retour arrière avant les opérations risquées",
      "Gestionnaire de toolkit de sécurité intégré",
    ],
    tech: ["Bash", "Vagrant", "libvirt", "KVM/QEMU", "ecryptfs", "GPG"],
    snippet: [
      "vm_create() {",
      "  inventory_add \"$1\" \"$2\" \"$3\"",
      "  vagrant up --provider=\"${BULL_PROVIDER}\"",
      "}",
    ],
    ascii: ascii.Bull,
    repo: "https://github.com/WhiteMuush/Bull.git",
    run: ["sudo", "bash", "bull.sh"],
  },
]