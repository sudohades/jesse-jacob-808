import "server-only";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import { MdxClientRenderer } from "@/components/content/MdxClientRenderer";

export type MdxRendererProps = {
  source: string;
  className?: string;
};

export async function MdxRenderer({ source, className }: MdxRendererProps) {
  const serialized = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  });

  return (
    <MdxClientRenderer source={serialized} className={className} />
  );
}

