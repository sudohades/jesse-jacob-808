import type { Metadata } from "next";
import Link from "next/link";
import { getContentItem, getContentSlugs } from "@/lib/server/content/mdx";
import { ArticleShell } from "@/components/layout/ArticleShell";
import { serializeMdx } from "@/lib/mdx/serialize";
import { MdxRendererClient } from "@/components/content/MdxRendererClient";

// Skip static generation to avoid SSR issues with client components
export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const slugs = getContentSlugs("build-log");
  return slugs.map((slug) => ({ slug }));
}

async function getSerializedItem(slug: string) {
  const item = getContentItem("build-log", slug);
  if (!item) return null;

  const source = await serializeMdx(item.content);

  return {
    item,
    source,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const data = await getContentItem("build-log", slug);

  if (!data) return { title: "Not found" };

  return {
    title: `${data.frontMatter.title} — sudo-hades`,
    description: data.frontMatter.description,
  };
}

export default async function BuildLogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await getSerializedItem(slug);

  if (!data) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-24">
        <div className="card-base p-8 text-[var(--text-muted)] font-mono text-sm">
          Build log not found.
          <div className="mt-4">
            <Link href="/build-log" className="text-[var(--accent-primary)] hover:underline">
              Back to build log
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const { item, source } = data;

  if (!item) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-24">
        <div className="card-base p-8 text-[var(--text-muted)] font-mono text-sm">
          Build log not found.
          <div className="mt-4">
            <Link href="/build-log" className="text-[var(--accent-primary)] hover:underline">
              Back to build log
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <ArticleShell
      title={item.frontMatter.title}
      description={item.frontMatter.description}
      date={item.frontMatter.date}
      readTime={item.frontMatter.readTime}
      tags={item.frontMatter.tags}
      backHref="/build-log"
    >
      <MdxRendererClient source={source} />
    </ArticleShell>
  );
}

