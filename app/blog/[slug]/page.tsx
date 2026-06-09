import type { Metadata } from "next";
import Link from "next/link";
import { MdxRenderer } from "@/lib/content/mdxRenderer";
import { getContentItem, getContentSlugs } from "@/lib/content/mdx";
import { ArticleShell } from "@/components/layout/ArticleShell";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serializeMdx } from "@/lib/mdx/serialize";

type Params = { slug: string };

export async function generateStaticParams() {
  const slugs = getContentSlugs("blog");
  return slugs.map((slug) => ({ slug }));
}

async function getSerializedPost(slug: string) {
  const item = getContentItem("blog", slug);
  if (!item) return null;

  const source = await serializeMdx(item.content);

  return {
    item,
    source: source as MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>,
  };
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const data = getContentItem("blog", slug);


  if (!data) return { title: "Not found" };
  return {
    title: `${data.frontMatter.title} — sudo-hades`,
    description: data.frontMatter.description,
  };
}

export default async function BlogPostDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const data = await getSerializedPost(slug);


  if (!data) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-24">
        <div className="card-base p-8 text-[var(--text-muted)] font-mono text-sm">
          Post not found.
          <div className="mt-4">
            <Link href="/blog" className="text-[var(--accent-primary)] hover:underline">
              Back to blog
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
      backHref="/blog"
    >
      <MdxRenderer source={source} />
    </ArticleShell>
  );
}

