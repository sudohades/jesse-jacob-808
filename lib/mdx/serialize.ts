/**
 * Temporary safe mode: Return raw content until @next/mdx migration complete.
 * This prevents MDX runtime eval errors during the architectural refactoring.
 */
export async function serializeMdx(
  content: string
): Promise<{ content: string; frontmatter?: Record<string, unknown> }> {
  // Return raw content temporarily - MDX rendering will be updated after migration
  return { content };
}
