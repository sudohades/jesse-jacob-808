"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { SiteNav } from "./SiteNav";

function Hamburger({
  open,
  ariaControls,
  onToggle,
}: {
  open: boolean;
  ariaControls: string;
  onToggle: () => void;
}) {
  const id = useId();

  return (
    <button
      type="button"
      className="group inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-secondary/50 text-muted-foreground transition-all hover:border-border hover:bg-secondary hover:text-foreground md:hidden"
      aria-label={open ? "Close navigation" : "Open navigation"}
      aria-expanded={open}
      aria-controls={ariaControls}
      onClick={onToggle}
    >
      {/*
        Keep markup simple so it’s easy to animate/customize later.
        Default styles create a “hamburger” icon; future edits can transform
        it into an X (mobile + desktop) by targeting these spans.
      */}
      <span className="sr-only">Toggle navigation</span>
      <span aria-hidden="true" className="relative h-5 w-5">
        <span
          className="absolute left-0 top-1 h-[2px] w-full origin-center bg-current transition-transform duration-200"
          data-line-1
          style={{ transform: open ? "translateY(5px) rotate(45deg)" : "none" }}
        />
        <span
          className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-current transition-opacity duration-200"
          data-line-2
          style={{ opacity: open ? 0 : 1 }}
        />
        <span
          className="absolute left-0 bottom-1 h-[2px] w-full origin-center bg-current transition-transform duration-200"
          data-line-3
          style={{ transform: open ? "translateY(-5px) rotate(-45deg)" : "none" }}
        />
      </span>
      <span id={id} className="sr-only">
        {open ? "Navigation open" : "Navigation closed"}
      </span>
    </button>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const navId = "site-nav-drawer";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <Container className="flex h-14 items-center justify-between gap-4 md:h-20">
        <Link href="/" className="shrink-0" aria-label="Home">
          <Logo />
        </Link>

        {/* Desktop */}
        <div className="hidden md:block">
          <SiteNav variant="horizontal" />
        </div>

        {/* Mobile: hamburger + navigation drawer */}
        <div className="md:hidden">
          <Hamburger
            open={open}
            ariaControls={navId}
            onToggle={() => setOpen((v) => !v)}
          />
        </div>
      </Container>

      {/* Mobile drawer (simple, customize later) */}
      <div
        id={navId}
        className={
          open
            ? "border-t border-border bg-background/95 backdrop-blur-xl"
            : "hidden"
        }
      >
        <div className="container-rl py-4">
          <SiteNav variant="vertical" />
        </div>
      </div>
    </header>
  );
}




