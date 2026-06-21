"use client";

import { MdxRenderer } from "@/lib/content/mdxRenderer";

type MdxRendererClientProps = {
  source: { content: string; frontmatter?: Record<string, unknown> };
};

export function MdxRendererClient({ source }: MdxRendererClientProps) {
  return <MdxRenderer source={source} />;
}
