import { cn } from "@/lib/utils/cn";

interface SectionHeaderProps {
  eyebrow?:   string;
  title:      string;
  subtitle?:  string;
  align?:     "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align     = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="mono-tag">{eyebrow}</span>
      )}
      <h2
        className={cn(
          "text-[var(--text-primary)] font-bold tracking-tight",
          "text-2xl sm:text-3xl lg:text-display-sm"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-[var(--text-secondary)] text-base leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
