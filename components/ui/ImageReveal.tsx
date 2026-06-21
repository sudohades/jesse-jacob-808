"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type ImageRevealMode = "reveal" | "static";

type ImageRevealProps = {
  src: string;
  alt: string;
  mode?: ImageRevealMode;
  aspectRatio?: string;
  // Reveal mode only props
  className?: string;
  sizes?: string;
  priority?: boolean;
  style?: React.CSSProperties;
  pixelSize?: number; // smaller = more pixels
  transitionMs?: number;
};


// A lightweight “decode” effect: we draw the final image as a grid of pixels and
// progressively reveal them.
export function ImageReveal({
  src,
  alt,
  mode = "reveal",
  aspectRatio = "1 / 1",
  className,
  sizes,
  priority,
  style,
  pixelSize = 8,
  transitionMs = 900,
}: ImageRevealProps) {
  // Hooks must be called unconditionally at the top level
  const [loaded, setLoaded] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const seed = useMemo(() => Math.floor(Math.random() * 1_000_000), []);

  // Canvas animation effect - only runs in reveal mode
  useEffect(() => {
    if (mode !== "reveal" || !loaded) return;
    setRevealed(false);

    const canvas = canvasRef.current;
    if (!canvas) {
      setRevealed(true);
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setRevealed(true);
      return;
    }

    let raf = 0;
    const start = performance.now();

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    // If the image is already in cache, `onload` may not fire.
    // Trigger drawing on next tick if we have dimensions.
    if (img.complete && img.naturalWidth > 0) {
      requestAnimationFrame(() => {
        if (img.naturalWidth > 0) raf = requestAnimationFrame(draw);
      });
    }


    const draw = () => {
      const elapsed = performance.now() - start;
      const t = Math.min(1, elapsed / transitionMs);

      // Make sure canvas matches its display size.
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Clear.
      ctx.clearRect(0, 0, width, height);

      // Draw pixels.
      const step = Math.max(3, pixelSize);
      const cols = Math.ceil(width / step);
      const rows = Math.ceil(height / step);

      // Pseudo-random reveal order.
      const order: number[] = [];
      order.length = cols * rows;
      for (let i = 0; i < order.length; i++) order[i] = i;
      // Fisher–Yates shuffle with deterministic seed.
      let s = seed;
      const rand = () => {
        // xorshift32
        s ^= s << 13;
        s ^= s >> 17;
        s ^= s << 5;
        return ((s >>> 0) % 1_000_000) / 1_000_000;
      };
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
      }

      const revealCount = Math.floor(order.length * t);

      for (let k = 0; k < revealCount; k++) {
        const idx = order[k];
        const c = idx % cols;
        const r = Math.floor(idx / cols);
        const x = c * step;
        const y = r * step;

        // Sample from the source image.
        // We scale the image to cover the canvas.
        const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight);
        const drawW = img.naturalWidth * scale;
        const drawH = img.naturalHeight * scale;
        const dx = (width - drawW) / 2;
        const dy = (height - drawH) / 2;

        const sx = (x - dx) / scale;
        const sy = (y - dy) / scale;
        const sw = step / scale;
        const sh = step / scale;

        ctx.drawImage(img, sx, sy, sw, sh, x, y, step, step);
      }

      if (t < 1) {
        raf = requestAnimationFrame(draw);
      } else {
        // Ensure we end on the final image.
        setRevealed(true);
      }
    };

    const onImgLoad = () => {
      raf = requestAnimationFrame(draw);
    };

    const onImgError = () => {
      setRevealed(true);
    };

    img.onload = onImgLoad;
    img.onerror = onImgError;

    return () => {
      cancelAnimationFrame(raf);
    };
  }, [mode, loaded, pixelSize, transitionMs, seed, src]);

  // Static mode: simple image renderer, no canvas, no animation
  if (mode === "static") {
    return (
      <div
        className={className}
        style={{
          position: "relative",
          width: "100%",
          height: "auto",
          aspectRatio: aspectRatio || undefined,
          ...style,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain w-full h-full"
          sizes={sizes}
          priority={priority}
        />
      </div>
    );
  }

  // Reveal mode: canvas-based pixel animation system

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        // Ensure the parent has a concrete height; otherwise next/image(fill) may render with near-zero height.
        minHeight: 1,
        height: "auto",
        aspectRatio: aspectRatio ?? "1 / 1",
        ...style,
      }}
    >
      {/* Actual image for layout + a11y. Hidden until revealed. */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="select-none object-cover"
        onLoad={() => {
          setLoaded(true);
          // Keep the image visible even if the pixel-canvas effect stalls.
          setRevealed(true);
        }}
        onError={() => {
          setLoaded(true);
          setRevealed(true);
        }}
        // Hero usage expects the image to remain visible.
        style={{ opacity: revealed ? 1 : 1, transition: "opacity 200ms ease" }}
      />

      {/* Overlay canvas decode effect */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 rounded-[24px]"
        style={{ width: "100%", height: "100%", imageRendering: "pixelated" }}
      />

      {/* If reduced motion, skip animation quickly. */}
      {!revealed && (
        <span aria-hidden className="absolute inset-0 bg-[rgba(10,10,10,0.35)]" />
      )}
    </div>
  );
}

