import { cn } from "@/platform/lib/utils";
import { brand, author } from "@/config";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <img src={brand.logo.icon} alt="Logo" className="h-8 w-8 rounded-full" />
      <div className={cn("flex flex-col items-start gap-0.5", className)}>
        <span className="hd-brand-wordmark">{brand.wordmark}</span>
        <span className="hd-brand-wordmark--sub">{author.name}</span>
      </div>
    </div>
  );
}


