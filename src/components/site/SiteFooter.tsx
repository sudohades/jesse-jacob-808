import { Container } from "./Container";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border glass-matte py-6">
      <Container>
        <div className="text-xs text-muted-foreground">
© {year} Sudo Hades. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}

