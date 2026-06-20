import type { Metadata } from "next";
import Link from "next/link";
import { getContentItem, getContentSlugs } from "@/lib/content/mdx";
import { ArticleShell } from "@/components/layout/ArticleShell";
import { serializeMdx } from "@/lib/mdx/serialize";
import { MdxRendererClient } from "@/components/content/MdxRendererClient";
import { getFeaturedServices } from "@/lib/services/get-services";
import { getFeaturedProducts } from "@/lib/products/get-products";
import { Badge } from "@/components/ui/Badge";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

// Skip static generation to avoid SSR issues with client components
export const dynamic = 'force-dynamic';

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

  const relatedServices = getFeaturedServices().slice(0, 3);
  const relatedProducts = getFeaturedProducts().slice(0, 3);


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
    <>
      <ArticleShell
        title={item.frontMatter.title}
        description={item.frontMatter.description}
        date={item.frontMatter.date}
        readTime={item.frontMatter.readTime}
        tags={item.frontMatter.tags}
        backHref="/blog"
      >
        <MdxRendererClient source={source} />
      </ArticleShell>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="relative px-6 py-16 border-t border-[rgba(255,255,255,0.08)]">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
              Related Services
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="card-base p-6 group hover:border-[rgba(210,107,255,0.3)] transition-all duration-300"
                >
                  <Badge variant="status" dot className="text-xs mb-3">
                    {service.category}
                  </Badge>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] line-clamp-2 mb-3">
                    {service.description}
                  </p>
                  <div className="text-xs text-[var(--text-muted)] font-mono">
                    {service.pricing}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="relative px-6 py-16 border-t border-[rgba(255,255,255,0.08)]">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/${product.slug}`}
                  className="card-base p-6 group hover:border-[rgba(210,107,255,0.3)] transition-all duration-300"
                >
                  <Badge variant="muted" className="text-xs mb-3">
                    {product.category}
                  </Badge>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-primary)] transition-colors line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] line-clamp-2 mb-3">
                    {product.shortDescription}
                  </p>
                  <div className="text-sm text-[var(--text-primary)] font-mono">
                    ${product.price}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

