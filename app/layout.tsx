import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';   
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sudo Hades — Engineering Solutions.",
  description:
    "Sudo Hades is a software engineering firm focused on building reliable, scalable solutions for complex problems.",
  authors: [{ name: "Jesse Jacob" }],
  openGraph: {
    title: "Sudo Hades — Engineering Solutions",
    images: [{ url: "/logo-256.png" }],
    description:
      "Software engineering firm specializing in complex problem-solving and scalable solutions.",
    type: "website",
    siteName: "Sudo Hades",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sudo_hades",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#090909",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}<Analytics /></body>
      
    </html>
  );
}

