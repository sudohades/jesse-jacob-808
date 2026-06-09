import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const socialIcons = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  email: Mail,
} as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24">
      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-48 bg-gradient-to-r from-transparent via-[rgba(210,107,255,0.2)] to-transparent"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-[18px] border border-[rgba(255,255,255,0.10)] bg-[rgba(15,15,15,0.35)] backdrop-blur-xl p-6 md:p-8">
          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
            {/* Brand */}
            <div className="flex flex-col items-center gap-1 md:items-start">
              <span className="font-mono text-sm font-semibold text-[var(--text-primary)]">
                {siteConfig.brand}
              </span>
              <span className="font-mono text-xs text-[var(--text-muted)]">
                {siteConfig.tagline.split(",")[0].trim()}
              </span>
            </div>

            {/* Nav links */}
            <nav aria-label="Footer navigation">
              <ul
                className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-end"
                role="list"
              >
                {siteConfig.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mt-8 flex flex-col items-center gap-4 md:flex-row md:justify-between">
            {/* Copyright */}
            <p className="font-mono text-xs text-[var(--text-muted)]">
              © {year} {siteConfig.name}. All rights reserved.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {(Object.entries(siteConfig.socials) as [
                keyof typeof siteConfig.socials,
                string,
              ][]).map(([key, href]) => {
                const Icon = socialIcons[key];
                if (!Icon) return null;
                const isEmail = key === "email";

                return (
                  <a
                    key={key}
                    href={isEmail ? `mailto:${href}` : href}
                    target={isEmail ? undefined : "_blank"}
                    rel={isEmail ? undefined : "noopener noreferrer"}
                    aria-label={`${siteConfig.name} on ${key}`}
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-[rgba(255,255,255,0.08)] text-[var(--text-muted)] transition-all hover:border-[rgba(210,107,255,0.2)] hover:text-[var(--accent-primary)] hover:bg-[rgba(17,17,17,0.5)] backdrop-blur-xl hover:shadow-[0_0_10px_rgba(210,107,255,0.1)]"
                  >
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

