/**
 * Next.js adapter for metadata
 * Converts platform metadata to Next.js Metadata format
 */
import type { Metadata, Viewport } from "next";
import { siteMetadata } from "../../core/metadata";

export function getNextMetadata(): Metadata {
  return {
    title: siteMetadata.title,
    description: siteMetadata.description,
    authors: siteMetadata.authors,
    openGraph: siteMetadata.openGraph,
    twitter: siteMetadata.twitter,
    icons: siteMetadata.icons,
  };
}

export function getNextViewport(): Viewport {
  return {
    themeColor: "#110C1D",
    width: "device-width",
    initialScale: 1,
  };
}
