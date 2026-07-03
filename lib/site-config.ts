export const siteConfig = {
  // Identity
  name:      "Jesse Jacob",
  brand:     "sudo_hades",
  handle:    "@sudo_hades",
  domain:    "sudo-hades.dev",
  baseUrl:   "https://sudo-hades.dev",

  // SEO
  tagline:   "Linux Systems Engineer, Automation Developer & Full-Stack Builder",
  description:
    "Building infrastructure, automation systems, and practical software solutions. Based in Nairobi, Kenya.",
  keywords: [
    "Linux Systems Engineer",
    "Automation Developer",
    "Full-Stack Developer",
    "DevOps",
    "Infrastructure",
    "Nairobi",
    "Kenya",
    "sudo-hades",
  ],

  // Social
  socials: {
    github:   "https://github.com/sudohades",
    twitter:  "https://twitter.com/sudo_hades",
    linkedin: "https://linkedin.com/in/jesse-jacob-hvd35",
    email:    "hello@sudo-hades.dev",
  },

  // Contact configuration for custom orders
  contact: {
    email: "hello@sudo-hades.dev",
  },

  // Navigation
  nav: [
    { label: "Projects",  href: "/projects" },
    { label: "Services",  href: "/services" },
    { label: "Shop",      href: "/shop" },
    { label: "Blog",      href: "/blog" },
    { label: "Build Log", href: "/build-log" },
    { label: "Notes",     href: "/notes" },
    { label: "Resources", href: "/resources" },
    { label: "About",     href: "/about" },
  ],

  // Services
  services: [
    {
      slug: "linux-administration",
      category: "Linux Administration",
      title: "Linux Administration",
      overview:
        "Server audits, hardening, kernel/systemd tuning, and operational cleanups for stable uptime.",
      deliverables: [
        "Access + exposure review",
        "Hardening checklist + fixes",
        "systemd service hardening guidance",
        "Runbook draft for ops handoff",
      ],
      startingPrice: "$250",
    },
    {
      slug: "vps-setup",
      category: "VPS Setup",
      title: "VPS Setup & Migration",
      overview:
        "From provisioning to DNS/TLS/reverse proxy wiring — with minimal downtime and real rollback steps.",
      deliverables: [
        "Provisioning + baseline security",
        "Nginx reverse proxy + TLS plan",
        "Deployment checklist",
        "Rollback / recovery notes",
      ],
      startingPrice: "$300",
    },
    {
      slug: "nginx-hardening",
      category: "Nginx Configuration",
      title: "Nginx Configuration & Hardening",
      overview:
        "Server block patterns for websockets, TLS termination, caching, rate limiting, and observability.",
      deliverables: [
        "Server block architecture",
        "TLS + redirect rules",
        "Websocket proxy + headers",
        "Rate limiting + basic defenses",
      ],
      startingPrice: "$220",
    },
    {
      slug: "automation-scripting",
      category: "Custom Automation",
      title: "Bash Automation & Infrastructure Glue",
      overview:
        "Scripts and small tools that reduce toil — backups, health checks, deploy helpers, and infra tooling.",
      deliverables: [
        "Automation spec + safety checks",
        "Bash tooling with idempotency",
        "Dry-run + logging",
        "Usage docs + examples",
      ],
      startingPrice: "$200",
    },
  ],


  // Hero section
  hero: {
  greeting: "systemctl start ambition.service",

  headline: [
    "Building Linux Infrastructure,",
    "Automation Systems,",
    "and Production Software."
  ],

  subheadline:
    "I document real engineering work across Linux, VPS operations, infrastructure automation, embedded systems, and developer tooling. From hardened servers and self-hosted platforms to fintech and IoT projects, everything here is built to solve practical problems.",

  cta: [
    {
      label: "Explore Projects",
      href: "/projects",
      variant: "primary" as const,
    },
    {
      label: "Read Build Logs",
      href: "/build-log",
      variant: "ghost" as const,
    },
  ],
},

  // Expertise grid
  expertise: [
  {
    label: "Linux Systems",
    icon: "terminal",
    description:
      "System administration, service management, hardening, performance tuning, and operational reliability."
  },

  {
    label: "Infrastructure Automation",
    icon: "zap",
    description:
      "Bash, Python, CI/CD, provisioning scripts, monitoring automation, and operational tooling."
  },

  {
    label: "DevOps & Deployment",
    icon: "layers",
    description:
      "Docker, reverse proxies, deployment pipelines, observability, backups, and rollback strategies."
  },

  {
    label: "Production Web Platforms",
    icon: "globe",
    description:
      "Full-stack systems integrating APIs, authentication, payments, and operational infrastructure."
  },

  {
    label: "VPS & Self-Hosting",
    icon: "server",
    description:
      "Provisioning, migration, monitoring, DNS, TLS, reverse proxies, and server lifecycle management."
  },

  {
    label: "Technical Consulting",
    icon: "briefcase",
    description:
      "Architecture reviews, troubleshooting, implementation planning, and infrastructure guidance."
  },
],


  // Current build (dynamic / placeholder)
  currentBuild: {
  title: "Human Pose Analysis with MMPose & MMAction",

  description:
    "Implementing MMPose and MMAction for extracting human poses and mapping them onto spatial temporal graphs to analyze movements and train AI models for action recognition.",

  status: "Research & Development",

  stack: [
    "Python",
    "PyTorch",
    "MMPose",
    "MMAction",
    "Computer Vision",
    "Graph Neural Networks"
  ],

  startedAt: "2026-Q2",
},

  // Open Graph
  ogImage: "/images/og-default.png",
  ogImage2: "sudo_hades_logo_dark.svg",

  // Appearance
  theme: {
    defaultTheme: "dark" as const,
    forcedTheme:  "dark"  as const, // site is always dark
  },
} as const;

export type SiteConfig = typeof siteConfig;
