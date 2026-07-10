import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 font-display", className)}>
      <img src="/logo-24.png" alt="Logo" className="h-8 w-8 rounded-full" />
      <div className={cn("flex flex-col items-start gap-0.5 text-xs font-medium tracking-[0.22em] uppercase", className)}>
        <span className="text-sm font-medium tracking-[0.22em] uppercase">S U D O . H A D E S</span>
      <span className="text-sm font-medium tracking-[0.63em] uppercase text-muted-foreground">Jesse Jacob</span>
      </div>
    </div>
  );
}
