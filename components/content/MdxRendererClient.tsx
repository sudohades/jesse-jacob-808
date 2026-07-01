import { cn } from "@/lib/utils/cn";

type MdxRendererClientProps = {
  source: string;
  className?: string;
};



export function MdxRendererClient({ source, className }: MdxRendererClientProps) {
  return (
    <article className={cn("prose prose-invert max-w-none", className)}>
      <pre className="whitespace-pre-wrap break-words font-sans text-[var(--text-secondary)]">
        {source}
      </pre>
    </article>
  );
}



