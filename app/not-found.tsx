import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <div className="mono-label mb-6 text-titanium">
          <span className="text-redline">■</span>&nbsp;&nbsp;Error 404 · Off Track
        </div>
        <h1 className="display-xl">404</h1>
        <p className="mt-4 text-muted-foreground">
          The page you were looking for isn&apos;t in the paddock.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 border border-foreground/80 px-6 py-3 text-xs uppercase tracking-[0.22em] transition-colors hover:bg-foreground hover:text-background"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}
