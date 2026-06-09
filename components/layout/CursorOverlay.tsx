"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
}

export function CursorOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const blobPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | undefined>(undefined);
  const timeRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize positions
    blobPos.current = { x: canvas.width / 2, y: canvas.height / 2 };
    targetPos.current = { x: canvas.width / 2, y: canvas.height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Mobile random movement with smoother transitions
    let lastMobileUpdate = 0;
    let mobileTargetPhase = 0;
    const updateMobileTarget = (timestamp: number) => {
      if (isMobile && timestamp - lastMobileUpdate > 1500) {
        // Use sine waves for smoother, more organic movement
        mobileTargetPhase += 0.5;
        targetPos.current = {
          x: (canvas.width * 0.2) + (Math.sin(mobileTargetPhase) * 0.3 + 0.5) * (canvas.width * 0.6),
          y: (canvas.height * 0.2) + (Math.cos(mobileTargetPhase * 0.7) * 0.3 + 0.5) * (canvas.height * 0.6)
        };
        lastMobileUpdate = timestamp;
      }
    };

    const animate = (timestamp: number) => {
      timeRef.current = timestamp * 0.001;
      updateMobileTarget(timestamp);

      // Smooth interpolation (lerp)
      const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor;
      };

      const lerpFactor = isMobile ? 0.02 : 0.08;
      blobPos.current.x = lerp(blobPos.current.x, targetPos.current.x, lerpFactor);
      blobPos.current.y = lerp(blobPos.current.y, targetPos.current.y, lerpFactor);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Liquid-like pulsating effect
      const pulse = Math.sin(timeRef.current * 2) * 0.3 + 1;
      const pulse2 = Math.sin(timeRef.current * 1.5) * 0.2 + 1;
      const wobble = Math.sin(timeRef.current * 3) * 0.15;
      const wobble2 = Math.cos(timeRef.current * 2.5) * 0.1;

      // Main blob
      const baseSize = isMobile ? 90 : 65;
      const size = baseSize * pulse * pulse2;

      // Create gradient with enhanced theme colors
      const gradient = ctx.createRadialGradient(
        blobPos.current.x, blobPos.current.y, 0,
        blobPos.current.x, blobPos.current.y, size
      );

      // Enhanced theme colors (ghost effect - very subtle)
      gradient.addColorStop(0, 'rgba(210, 107, 255, 0.15)');
      gradient.addColorStop(0.3, 'rgba(155, 92, 255, 0.08)');
      gradient.addColorStop(0.6, 'rgba(180, 0, 255, 0.04)');
      gradient.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.arc(blobPos.current.x, blobPos.current.y, size, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Secondary blob for liquid effect
      const secondarySize = size * 0.6;
      const secondaryGradient = ctx.createRadialGradient(
        blobPos.current.x + wobble * 20, blobPos.current.y + wobble * 20, 0,
        blobPos.current.x + wobble * 20, blobPos.current.y + wobble * 20, secondarySize
      );

      secondaryGradient.addColorStop(0, 'rgba(155, 92, 255, 0.1)');
      secondaryGradient.addColorStop(0.5, 'rgba(210, 107, 255, 0.05)');
      secondaryGradient.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.arc(
        blobPos.current.x + wobble * 20,
        blobPos.current.y + wobble * 20,
        secondarySize,
        0, Math.PI * 2
      );
      ctx.fillStyle = secondaryGradient;
      ctx.fill();

      // Tertiary blob for extra glow
      const tertiarySize = size * 0.4;
      const tertiaryGradient = ctx.createRadialGradient(
        blobPos.current.x - wobble2 * 15, blobPos.current.y - wobble2 * 15, 0,
        blobPos.current.x - wobble2 * 15, blobPos.current.y - wobble2 * 15, tertiarySize
      );

      tertiaryGradient.addColorStop(0, 'rgba(180, 0, 255, 0.08)');
      tertiaryGradient.addColorStop(0.5, 'rgba(210, 107, 255, 0.04)');
      tertiaryGradient.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.arc(
        blobPos.current.x - wobble2 * 20,
        blobPos.current.y - wobble2 * 20,
        tertiarySize,
        0, Math.PI * 2
      );
      ctx.fillStyle = tertiaryGradient;
      ctx.fill();

      // Particle system with physics
      const particleCount = isMobile ? 15 : 25;
      
      // Emit new particles
      if (particlesRef.current.length < particleCount) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 1.5;
        particlesRef.current.push({
          x: blobPos.current.x,
          y: blobPos.current.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 1 + Math.random() * 2,
          life: 0,
          maxLife: 100 + Math.random() * 100
        });
      }

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(p => {
        // Physics: velocity with slight acceleration towards blob
        const dx = blobPos.current.x - p.x;
        const dy = blobPos.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Attraction force (gravity-like)
        if (dist > 50) {
          p.vx += (dx / dist) * 0.02;
          p.vy += (dy / dist) * 0.02;
        }
        
        // Drag/friction
        p.vx *= 0.98;
        p.vy *= 0.98;
        
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        
        // Update life
        p.life++;
        
        // Draw particle
        const lifeRatio = Math.max(0, 1 - (p.life / p.maxLife));
        const alpha = lifeRatio * 0.3;
        const radius = Math.max(0.1, p.size * lifeRatio);
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210, 107, 255, ${alpha})`;
        ctx.fill();
        
        // Draw particle trail
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * 3, p.y - p.vy * 3);
        ctx.strokeStyle = `rgba(155, 92, 255, ${alpha * 0.5})`;
        ctx.lineWidth = Math.max(0.1, p.size * 0.5 * lifeRatio);
        ctx.stroke();
        
        return p.life < p.maxLife;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
