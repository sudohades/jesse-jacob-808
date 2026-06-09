import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { Navbar }        from "@/components/layout/Navbar";
import { Footer }        from "@/components/layout/Footer";
import { MeshBackground } from "@/components/layout/MeshBackground";
import { LoadingWrapper } from "@/components/layout/LoadingWrapper";
import { CursorOverlay } from "@/components/layout/CursorOverlay";
import { CartProvider }  from "@/lib/shop/cart-context";
import { buildMetadata } from "@/lib/seo/metadata";
import "@/styles/globals.css";
import { SkipLink } from "@/components/ui/SkipLink";

export const metadata: Metadata = buildMetadata();

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <CartProvider>
            <LoadingWrapper>
              <SkipLink />
              <MeshBackground />
              <CursorOverlay />
              <div className="relative z-20 flex min-h-dvh flex-col">
                <Navbar />
                <main id="main-content" className="flex-1">{children}</main>
                <Footer />
              </div>
            </LoadingWrapper>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

