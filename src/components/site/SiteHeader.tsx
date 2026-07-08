"use client";

import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "./Logo";

export function SiteHeader() {
  return (
    <header className="border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="shrink-0" aria-label="Home">
          <Logo />
        </Link>
      </Container>
    </header>
  );
}

