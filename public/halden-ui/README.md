# Halden UI

A portable, framework-native UI component library for engineering-focused
Next.js applications. Aesthetic: Apple × GitHub Dark × Linear × industrial
engineering documentation.

## Install into an existing Next.js (App Router) project

1. Copy folders into your repo:
   ```
   halden-ui/components  ->  src/components
   halden-ui/styles      ->  src/styles
   halden-ui/lib         ->  src/lib
   halden-ui/constants   ->  src/constants
   halden-ui/public      ->  public
   ```

2. Import the stylesheet once in `app/layout.tsx`:
   ```ts
   import "@/styles/globals.css";
   ```

3. Load fonts (Next.js):
   ```ts
   import { Quantico, Inter, Share_Tech_Mono } from "next/font/google";

   const quantico = Quantico({ weight: ["400","700"], subsets: ["latin"], variable: "--font-display" });
   const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
   const mono = Share_Tech_Mono({ weight: "400", subsets: ["latin"], variable: "--font-mono" });

   export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
       <html lang="en" className={`${quantico.variable} ${inter.variable} ${mono.variable}`}>
         <body>{children}</body>
       </html>
     );
   }
   ```

4. Ensure Tailwind CSS is installed (v3 or v4). The stylesheet also works
   as plain CSS if you prefer to opt out of Tailwind — tokens live in
   `styles/theme.css`.

5. Peer deps:
   ```bash
   npm i clsx tailwind-merge lucide-react
   ```

## Contents
- `components/` — reusable presentation components
- `styles/` — global CSS, tokens, glass, animations, typography
- `lib/` — `cn()` helper, design token exports
- `constants/` — color and typography constants
- `public/` — textures, gradients, overlays (SVG)

No pages, no routing, no data layer.
