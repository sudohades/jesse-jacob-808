"use client";

import { MdxRenderer } from "@/lib/content/mdxRenderer";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

type MdxRendererClientProps = {
  source: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>;
};

export function MdxRendererClient({ source }: MdxRendererClientProps) {
  return <MdxRenderer source={source} />;
}
