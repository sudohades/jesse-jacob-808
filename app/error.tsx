"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
          Something went wrong loading this page.
        </h1>
        <button
          onClick={reset}
          className="px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.08)] text-[var(--text-primary)] hover:border-[rgba(210,107,255,0.3)] hover:text-[var(--accent-secondary)] hover:bg-[rgba(17,17,17,0.5)] backdrop-blur-xl transition-all text-sm font-medium"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
