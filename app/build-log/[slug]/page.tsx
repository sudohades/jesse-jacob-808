import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleShell } from "@/components/layout/ArticleShell";
import { MdxRenderer } from "@/lib/content/mdxRenderer";


import { getContentItem, getContentSlugs } from "@/lib/server/internal/mdx";

async function getSerializedItem(slug: string) {
  const item = getContentItem("build-log", slug);
  if (!item) return null;

  return { item };
}

export function generateStaticParams() {
  return getContentSlugs("build-log").map((slug) => ({ slug }));
}


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getContentItem("build-log", slug);

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
    notFound();
  }

  const { item } = data;


  return (
    <ArticleShell
      title={item.frontMatter.title}
      description={item.frontMatter.description}
      date={item.frontMatter.date}
      readTime={item.frontMatter.readTime}
      tags={item.frontMatter.tags}
      backHref="/build-log"
    >
      <MdxRenderer source={item.content} />


    </ArticleShell>
  );
}

