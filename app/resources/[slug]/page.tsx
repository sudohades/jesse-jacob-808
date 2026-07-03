import type { Metadata } from "next";
import Link from "next/link";
import { ArticleShell } from "@/components/layout/ArticleShell";
import { MdxRenderer } from "@/lib/content/mdxRenderer";


import { getContentItem, getContentSlugs } from "@/lib/server/internal/mdx";

type Params = { slug: string };

export function generateStaticParams() {
  return getContentSlugs("resources").map((slug) => ({ slug }));
}

async function getSerializedItem(slug: string) {
  const item = getContentItem("resources", slug);
  if (!item) return null;

  return { item };
}


export async function generateMetadata({ params }: { params: Promise<Params> }) : Promise<Metadata> {
  const { slug } = await params;

  const data = getContentItem("resources", slug);

  if (!data) return { title: "Not found" };
  return {
    title: `${data.frontMatter.title} — sudo-hades`,
    description: data.frontMatter.description,
  };
}

export default async function ResourceDetailPage({ params }: { params: Promise<Params> }) { 
  const { slug } = await params;

  const data = await getSerializedItem(slug);


  if (!data) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-24">
        <div className="card-base p-8 text-[var(--text-muted)] font-mono text-sm">
          Resource not found.
          <div className="mt-4">
            <Link href="/resources" className="text-[var(--accent-primary)] hover:underline">
              Back to resources
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const { item } = data;


  return (
    <ArticleShell
      title={item.frontMatter.title}
      description={item.frontMatter.description}
      date={item.frontMatter.date}
      readTime={item.frontMatter.readTime}
      tags={item.frontMatter.tags}
      backHref="/resources"
    >
      <MdxRenderer source={item.content} />


    </ArticleShell>
  );
}

