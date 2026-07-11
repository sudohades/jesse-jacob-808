"use client";

import type { Dispatch, SetStateAction } from "react";
import { useEffect, useRef } from "react";
import { useMobile } from "./useMobile";

export type DrawerLikeHandlers = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  close: () => void;
};

/**
 * Shared, SSR-safe behavior utilities for mobile-only drawer interactions.
 * Keeps styling concerns out of the hook.
 */
export function useDrawerBehavior({ open, setOpen, close }: DrawerLikeHandlers) {
  const isMobile = useMobile();
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);

  const closeDrawer = () => setOpen(false);

  useEffect(() => {
    if (!isMobile) {

      // If we cross breakpoints, ensure desktop doesn't keep drawer open.
      setOpen(false);
      return;
    }

    if (!open) return;

    lastActiveElementRef.current =
      (document.activeElement as HTMLElement | null) ?? null;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeDrawer();
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      const el = drawerRef.current;
      if (!el) return;
      const target = e.target as Node | null;
      if (!target) return;
      if (!el.contains(target)) close();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isMobile, open, setOpen]);

  useEffect(() => {
    if (open) return;
    const el = lastActiveElementRef.current;
    if (el && typeof el.focus === "function") {
      // Restore focus after closing for accessibility.
      // Use RAF to wait for DOM updates.
      requestAnimationFrame(() => el.focus());
    }
  }, [open]);

  return { drawerRef };
}

