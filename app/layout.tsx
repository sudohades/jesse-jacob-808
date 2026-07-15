import type { Metadata, Viewport } from "next";
import { Quantico, Share_Tech_Mono, Inter } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';   
import "@/styles/globals.css";


import { getNextMetadata, getNextViewport } from "@/platform/adapters/next";

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

export const metadata: Metadata = getNextMetadata();
export const viewport: Viewport = getNextViewport();

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

