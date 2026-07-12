import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <img src="/logo-24.png" alt="Logo" className="h-8 w-8 rounded-full" />
      <div className={cn("flex flex-col items-start gap-0.5", className)}>
        <span className="hd-brand-wordmark">S U D O . H A D E S</span>
        <span className="hd-brand-wordmark--sub">Jesse Jacob</span>
      </div>
    </div>
  );
}


