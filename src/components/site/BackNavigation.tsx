"use client";

import * as React from 'react';
import { Button } from '@/components/halden-ui/ui/Button';

const collectionToFallbackPath: Record<string, string> = {
  projects: '/projects',
  blog: '/blog',
  resources: '/resources',
  services: '/services',
  pages: '/',
};

function fallbackPath(collection?: string) {
  if (!collection) return '/';
  return collectionToFallbackPath[collection] ?? '/';
}

export function BackNavigation({ collection }: { collection?: string }) {
  const onBack = React.useCallback(() => {
    // Use browser history when available (client-side).
    if (typeof window !== 'undefined' && typeof window.history !== 'undefined' && window.history.length > 1) {
      window.history.back();
      return;
    }

    // Fallback: route to the collection landing.
    window.location.href = fallbackPath(collection);
  }, [collection]);

  return (
    <div className="flex pt-20 sm:pt-24">
      <Button
        variant="secondary"
        onClick={onBack}
        className="h-11 gap-2 px-4 shadow-[var(--shadow-panel)]"
      >
        <span aria-hidden>←</span>
        <span>Back</span>
      </Button>
    </div>
  );
}
