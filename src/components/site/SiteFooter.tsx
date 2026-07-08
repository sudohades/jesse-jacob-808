import { Container } from "./Container";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background py-10">
      <Container>
        <div className="text-xs text-muted-foreground">
© {year} Sudo Hades. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}

