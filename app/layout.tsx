import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { Navbar }        from "@/components/layout/Navbar";
import { Footer }        from "@/components/layout/Footer";
import { MeshBackground } from "@/components/layout/MeshBackground";
import dynamicImport from "next/dynamic";
import { SafeCartProvider } from "@/components/providers/SafeCartProvider";
import { buildMetadata } from "@/lib/seo/metadata";
import "@/styles/globals.css";
import { SkipLink } from "@/components/ui/SkipLink";
import { Analytics } from "@vercel/analytics/react";
import { LaunchCountdown } from "@/components/launch/LaunchCountdown";

const CursorOverlay = dynamicImport(() => import("@/components/layout/CursorOverlay").then(mod => ({ default: mod.CursorOverlay })), { ssr: true });

export const metadata: Metadata = buildMetadata();

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ 
  children,
}: { 
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <SafeCartProvider>
            <SkipLink />
            <MeshBackground />
            <CursorOverlay />
            <LaunchCountdown />
            <div className="relative z-20 flex min-h-dvh flex-col">
              <Navbar />
              <main id="main-content" className="flex-1">{children}</main>
              <Footer />
            </div>
          </SafeCartProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

