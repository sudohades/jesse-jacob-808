import type { Metadata, Viewport } from "next";
import { Quantico, Share_Tech_Mono, Inter } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';   
import "./globals.css";

const quantico = Quantico({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-quantico",
  display: "swap",
});

const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-share-tech-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
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
  themeColor: "#110C1D",
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
      className={`dark ${quantico.variable} ${shareTechMono.variable} ${inter.variable}`}
    >
      <body>{children}<Analytics /></body>
      
    </html>
  );
}

