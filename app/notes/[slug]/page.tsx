import type { Metadata } from "next";
import Link from "next/link";
import { ArticleShell } from "@/components/layout/ArticleShell";
import { serializeMdx } from "@/lib/mdx/serialize";
import { MdxRendererClient } from "@/components/content/MdxRendererClient";
import { siteConfig } from "@/lib/site-config";

// Skip static generation to avoid SSR issues with client components
export const dynamic = 'force-dynamic';

type Params = { slug: string };

async function getSerializedNote(slug: string) {
  const res = await fetch(`${siteConfig.baseUrl}/api/content/${slug}?type=notes`, { cache: "no-store" });
  const item = await res.json();
  if (!item) return null;

  const source = await serializeMdx(item.content);

  return { item, source };
}

export async function generateMetadata({ params }: { params: Promise<Params> }) : Promise<Metadata> {
  const { slug } = await params;

  const res = await fetch(`${siteConfig.baseUrl}/api/content/${slug}?type=notes`, { cache: "no-store" });
  const data = await res.json();

  if (!data) return { title: "Not found" };
  return {
    title: `${data.frontMatter.title} — sudo-hades`,
    description: data.frontMatter.description,
  };
}

export default async function NoteDetailPage({ params }: { params: Promise<Params> }) { 
  const { slug } = await params;

  const data = await getSerializedNote(slug);


  if (!data) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-24">
        <div className="card-base p-8 text-[var(--text-muted)] font-mono text-sm">
          Note not found.
          <div className="mt-4">
            <Link href="/notes" className="text-[var(--accent-primary)] hover:underline">
              Back to notes
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const { item, source } = data;

  return (
    <ArticleShell
      title={item.frontMatter.title}
      description={item.frontMatter.description}
      date={item.frontMatter.date}
      readTime={item.frontMatter.readTime}
      tags={item.frontMatter.tags}
      backHref="/notes"
    >
      <MdxRendererClient source={source} />
    </ArticleShell>
  );
}

