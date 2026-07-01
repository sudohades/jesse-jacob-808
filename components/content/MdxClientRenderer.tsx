"use client";

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { cn } from "@/lib/utils/cn";
import { mdxComponents } from "@/lib/mdx/components";

type MdxClientRendererProps = {
  source: MDXRemoteSerializeResult;
  className?: string;
};

export function MdxClientRenderer({ source, className }: MdxClientRendererProps) {
  return (
    <article className={cn("prose prose-invert max-w-none", className)}>
      <MDXRemote {...source} components={mdxComponents} />
    </article>
  );
}
