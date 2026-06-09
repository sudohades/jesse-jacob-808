import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import remarkGfm from "remark-gfm";

/**
 * Centralized MDX serialization configuration.
 * Ensures consistent parsing across all content types (blog, build-log, notes, resources).
 *
 * Features enabled:
 * - GitHub Flavored Markdown (tables, task lists, strikethrough, etc.)
 * - Robust parsing for technical content (code blocks, numeric literals, etc.)
 */
export async function serializeMdx(
  content: string
): Promise<MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>> {
  return serialize(content, {
    parseFrontmatter: false,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      // Add rehype plugins here if needed in the future
      rehypePlugins: [],
    },
  });
}
