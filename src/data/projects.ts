import { ascii } from "./ascii"

export type Project = {
  id: string
  kind?: "about"
  name: string
  tagline?: string
  description?: string
  features?: string[]
  tech?: string[]
  snippet?: string[]
  ascii?: string
  headerAscii?: string
  contact?: { label: string; value: string; action?: "url" | "copy" }[]
  repo?: string
  run?: string[]
}

export const projects: Project[] = [
  {
    id : "whoami",
    kind: "about",
    name: "About",
    tagline: "WhiteMuush · Sysadmin & DevOps student",
    headerAscii: `        ███╗   ███╗███████╗██╗    ██╗   ██╗██╗███╗   ██╗    ██████╗ ███████╗████████╗██╗████████╗
        ████╗ ████║██╔════╝██║    ██║   ██║██║████╗  ██║    ██╔══██╗██╔════╝╚══██╔══╝██║╚══██╔══╝
        ██╔████╔██║█████╗  ██║    ██║   ██║██║██╔██╗ ██║    ██████╔╝█████╗     ██║   ██║   ██║   
        ██║╚██╔╝██║██╔══╝  ██║    ╚██╗ ██╔╝██║██║╚██╗██║    ██╔═══╝ ██╔══╝     ██║   ██║   ██║   
        ██║ ╚═╝ ██║███████╗███████╗╚████╔╝ ██║██║ ╚████║    ██║     ███████╗   ██║   ██║   ██║   
        ╚═╝     ╚═╝╚══════╝╚══════╝ ╚═══╝  ╚═╝╚═╝  ╚═══╝    ╚═╝     ╚══════╝   ╚═╝   ╚═╝   ╚═╝   
                                                                                Portfolio 2026
        `,
    description:
      "Nice to meet you! My name is Melvin and I'm a Cloud Admin student specialized in Azure " +
      "with a strong interest in DevOps and information security. I build custom toolkits, " +
      "with a focus on automation and ease of use.",
      
    contact: [
      { label: "GitHub",   value: "github.com/WhiteMuush",       action: "url" },
      { label: "Email",    value: "melvin.petit31@gmail.com",     action: "copy" },
      { label: "LinkedIn", value: "linkedin.com/in/melvin-petit", action: "url" },
    ],
    ascii: ascii.whoami,
  },
  {
    id: "sandevistan",
    name: "sandevistan",
    tagline: "Cybersecurity toolkit: reconnaissance, exploitation, post-exploitation",
    description:
      "All-in-one cybersecurity platform where reconnaissance, exploitation and " +
      "post-exploitation tools converge into a unified interface. 6 integrated modules: " +
      "network recon, vulnerability scanning, exploitation frameworks, post-exploitation, " +
      "credential recovery and payload generation.",
    features: [
      "Network reconnaissance: Nmap, Masscan, Amass, Recon-ng, theHarvester",
      "Vulnerability scanning: Nikto, Nuclei, Wapiti, sqlmap, XSStrike",
      "Exploitation frameworks: Metasploit, RouterSploit, BeEF, AutoSploit",
      "Post-exploitation: PEASS-ng, LaZagne, Mimikatz, PowerSploit, Impacket",
      "Credential recovery: hashcat, John the Ripper, Hydra, CrackMapExec",
      "Payload generation: msfvenom, Veil, TheFatRat, Hoaxshell, Donut",
    ],
    tech: ["Bash", "Python3", "Security tools"],
    snippet: ["chmod +x sandevistan.sh", "sudo bash sandevistan.sh"],
    repo: "https://github.com/WhiteMuush/sandevistan.git",
    run: ["sudo", "bash", "sandevistan.sh"],
    ascii: ascii.sandevistan,
  },
  {
    id: "Medusa",
    name: "Medusa",
    tagline:
      "Bash orchestration toolkit: deploys and manages 35 cybersecurity tools",
    description:
      "Bash orchestration toolkit that deploys and manages 35 open source cybersecurity tools " +
      "via an interactive menu or the command line. 4 modules: SOC/Detection & Response, " +
      "GRC/Governance & Compliance, Integration (IAM, Cloud, CI/CD), and OT/Industrial Security.",
    features: [
      "14 SOC tools: SIEM, XDR, NDR, CTI, SOAR, endpoint and network forensics",
      "5 GRC tools: multi-framework compliance (ISO 27001, NIS2, DORA, GDPR)",
      "11 Integration tools: IAM, secrets, vulnerability scanning, SAST, DAST",
      "5 OT tools: passive monitoring of industrial networks, ICS/SCADA mapping",
      "Isolated environments: lab, client audit, training",
      "Randomly generated passwords, credentials.txt chmod 600",
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
      "  log_success \"$tool deployed\"",
      "}",
    ],
    ascii: ascii.Medusa,
    repo: "https://github.com/WhiteMuush/Medusa.git",
    run: ["bash", "medusa.sh"],
  },
  {
    id: "Kraken",
    name: "Kraken",
    tagline: "Modular penetration testing orchestrator in Bash",
    description:
      "Modular, lightweight Bash framework to orchestrate reconnaissance, scanning, " +
      "enumeration and reporting. Each module (\"tentacle\") is independent and " +
      "replaceable, with parallel execution and structured output.",
    features: [
      "Reconnaissance: subdomains, hosts, DNS (Amass, Subfinder, theHarvester)",
      "Port scanning: fast and detailed (Nmap, Masscan)",
      "Web enumeration: directories, tech discovery (ffuf, Gobuster, Wapiti, Nikto)",
      "Vulnerability assessment: Nuclei, SSLyze, WPScan",
      "Reporting: structured export of results, logs and state",
      "CLI chaining: run one or more modules via flags",
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
    tagline: "Interactive launcher for network recon and capture tools",
    description:
      "Bash toolkit that wraps common network reconnaissance and capture tools " +
      "with useful presets. Saves output to timestamped directories per tool " +
      "and tries to auto-install missing tools on many platforms.",
    features: [
      "Quick access: Nmap, Netcat, tcpdump, TShark, hping3",
      "Integrations: arp-scan, Masscan, Nikto, dnsenum, WhatWeb",
      "Timestamped output directories under $HOME per tool",
      "Auto-install of missing tools (apt, dnf, yum, pacman, zypper, apk, Homebrew)",
      "Lightweight, POSIX-compatible Bash with safe quoting",
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
    tagline: "Active Directory enumeration toolkit: 10+ security tools unified",
    description:
      "Interactive bash toolkit that automates Active Directory enumeration by integrating " +
      "10+ professional security tools into a unified interface. Supports passive and active " +
      "reconnaissance with persistent configuration and structured output.",
    features: [
      "Passive recon: Nmap, enum4linux-ng, rpcclient, ldapsearch, dnsrecon",
      "Active recon: BloodHound collection, CrackMapExec, adidnsdump, GetNPUsers",
      "Persistent target configuration (IP, domain, credentials)",
      "Automated workflow across all modules",
      "SMB vulnerability scanning and domain secrets extraction",
      "Timestamped output directories with JSON and XML export",
    ],
    tech: ["Bash", "BloodHound", "Impacket", "CrackMapExec", "Nmap"],
    ascii: ascii.Ghostline,
    repo: "https://github.com/WhiteMuush/Ghostline.git",
    run: ["bash", "ghostline.sh"],
  },
  {
    id: "Bull",
    name: "Bull",
    tagline: "Automated pentest VM provisioning: hardening and VPN kill-switch",
    description:
      "Automated toolkit to spin up fully configured Kali Linux or Parrot Security VMs " +
      "with built-in security hardening. Handles provisioning via Vagrant, /home encrypted with " +
      "ecryptfs, GPG-secured credentials, VPN kill-switch and snapshots for " +
      "rollback before risky operations.",
    features: [
      "Auto-provisioning of Kali/Parrot VMs via Vagrant",
      "VPN kill-switch: blocks traffic if the VPN drops",
      "/home encrypted with ecryptfs",
      "GPG credentials: AES256, SHA512, 65M iterations",
      "Snapshots: rollback before risky operations",
      "Built-in security toolkit manager",
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