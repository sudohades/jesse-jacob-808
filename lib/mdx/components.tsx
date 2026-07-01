import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

function Anchor({ href, className, ...props }: ComponentPropsWithoutRef<"a">) {
  const isExternal = typeof href === "string" && /^(https?:)?\/\//.test(href);

  return (
    <a
      href={href}
      className={cn(
        "font-medium text-[var(--accent-primary)] underline decoration-[rgba(255,255,255,0.25)] underline-offset-4 transition-colors hover:text-[var(--accent-secondary)]",
        className
      )}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      {...props}
    />
  );
}

function InlineCode({ className, ...props }: ComponentPropsWithoutRef<"code">) {
  return (
    <code
      className={cn(
        "rounded border border-[rgba(255,255,255,0.06)] bg-[rgba(15,15,15,0.55)] px-1.5 py-0.5 font-mono text-[0.9em]",
        className
      )}
      {...props}
    />
  );
}

function Pre({ className, ...props }: ComponentPropsWithoutRef<"pre">) {
  return (
    <pre
      className={cn(
        "overflow-x-auto rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(10,10,10,0.7)] p-4 text-sm",
        className
      )}
      {...props}
    />
  );
}

function Blockquote({ className, ...props }: ComponentPropsWithoutRef<"blockquote">) {
  return (
    <blockquote
      className={cn(
        "my-6 border-l-2 border-[var(--accent-primary)] pl-4 text-[var(--text-secondary)] italic",
        className
      )}
      {...props}
    />
  );
}

const H1 = (props: any) => <h1 className="text-3xl font-extrabold mb-4" {...props} />;
const H2 = (props: any) => <h2 className="text-2xl font-bold mb-3" {...props} />;
const H3 = (props: any) => <h3 className="text-xl font-semibold mb-2" {...props} />;
const H4 = (props: any) => <h4 className="text-lg font-semibold mb-2" {...props} />;
const P = (props: any) => <p className="leading-relaxed mb-4" {...props} />;

const Ul = (props: any) => <ul className="list-disc list-inside mb-4 pl-3" {...props} />;
const Ol = (props: any) => <ol className="list-decimal list-inside mb-4 pl-3" {...props} />;
const Li = (props: any) => <li className="mb-2" {...props} />;

const Strong = (props: any) => <strong className="font-semibold" {...props} />;
const Em = (props: any) => <em className="italic" {...props} />;

const Table = (props: any) => (
  <div className="overflow-x-auto my-4">
    <table className="min-w-full table-auto border-collapse" {...props} />
  </div>
);
const Thead = (props: any) => <thead className="bg-[rgba(255,255,255,0.03)]" {...props} />;
const Tbody = (props: any) => <tbody {...props} />;
const Tr = (props: any) => <tr className="border-t border-[rgba(255,255,255,0.04)]" {...props} />;
const Th = (props: any) => <th className="text-left px-3 py-2 font-medium text-[var(--text-primary)]" {...props} />;
const Td = (props: any) => <td className="px-3 py-2 text-[var(--text-secondary)]" {...props} />;

export const mdxComponents = {
  a: Anchor,
  code: InlineCode,
  pre: Pre,
  blockquote: Blockquote,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
  ul: Ul,
  ol: Ol,
  li: Li,
  strong: Strong,
  em: Em,
  table: Table,
  thead: Thead,
  tbody: Tbody,
  tr: Tr,
  th: Th,
  td: Td,
};

// Add richer formatting components
export const mdxFormatComponents = {
  h1: (props: any) => <h1 className="text-3xl font-extrabold mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold mb-3" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-semibold mb-2" {...props} />,
  h4: (props: any) => <h4 className="text-lg font-semibold mb-2" {...props} />,
  h5: (props: any) => <h5 className="text-sm font-semibold mb-1" {...props} />,
  h6: (props: any) => <h6 className="text-xs font-semibold mb-1 uppercase" {...props} />,

  p: (props: any) => <p className="leading-relaxed mb-4" {...props} />,

  ul: (props: any) => <ul className="list-disc list-inside mb-4 pl-3" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside mb-4 pl-3" {...props} />,
  li: (props: any) => <li className="mb-2" {...props} />,

  strong: (props: any) => <strong className="font-semibold" {...props} />,
  em: (props: any) => <em className="italic" {...props} />,

  table: (props: any) => (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse mb-4" {...props} />
    </div>
  ),
  thead: (props: any) => <thead className="bg-[rgba(255,255,255,0.03)]" {...props} />,
  tbody: (props: any) => <tbody {...props} />,
  tr: (props: any) => <tr className="border-t border-[rgba(255,255,255,0.04)]" {...props} />,
  th: (props: any) => <th className="text-left px-3 py-2 font-medium text-[var(--text-primary)]" {...props} />,
  td: (props: any) => <td className="px-3 py-2 text-[var(--text-secondary)]" {...props} />,
};

// Merge primary map with format components for export compatibility
export const mdxComponentsMerged = { ...mdxComponents, ...mdxFormatComponents };
