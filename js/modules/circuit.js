export function initCircuitCanvas() {
  const body = document.body;
  if (!body.classList.contains('circuit-alt')) return;

  // Respect user's motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const canvas = document.createElement('canvas');
  canvas.className = 'circuit-canvas';
  body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const glowCanvas = document.createElement('canvas');
  const glowCtx = glowCanvas.getContext('2d');
  const particles = [];
  // Reduce particle count on mobile for better performance
  const particleCount = window.innerWidth <= 768 ? 320 : 640;
  let width = window.innerWidth;
  let height = window.innerHeight;
  let palette = [];
  const mouse = { x: width / 2, y: height / 2, active: false };
  let allowInteraction = true;
  const influenceRadius = 32;
  const alphaBase = 0.65;
  const alphaAmp = 0.28;
  const drag = 0.96;

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    glowCanvas.width = width * dpr;
    glowCanvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    glowCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    allowInteraction = width > 768;
    if (!allowInteraction) mouse.active = false;
  };

  const refreshPalette = () => {
    const styles = getComputedStyle(document.documentElement);
    palette = [
      styles.getPropertyValue('--overlay-1').trim(),
      styles.getPropertyValue('--overlay-2').trim(),
      styles.getPropertyValue('--overlay-3').trim(),
      styles.getPropertyValue('--overlay-4').trim(),
    ].filter(Boolean);
  };

  const makeParticle = () => {
    const depth = 0.4 + Math.random() * 0.8;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size: 2.6 + Math.random() * 3.6 * depth,
      vx: (Math.random() - 0.5) * 0.18 * depth,
      vy: (Math.random() - 0.2) * 0.20 * depth,
      drift: Math.random() * Math.PI * 2,
      pulse: Math.random() * Math.PI * 2,
      flickerPhase: Math.random() * Math.PI * 2,
      flickerSpeed: 0.0012 + Math.random() * 0.0012,
      depth,
      color: palette[Math.floor(Math.random() * palette.length)] || 'rgba(255,255,255,0.3)'
    };
  };

  const repaintColors = () => {
    refreshPalette();
    particles.forEach(p => {
      p.color = palette[Math.floor(Math.random() * palette.length)] || p.color;
    });
  };

  const wrap = (p) => {
    const margin = 12;
    if (p.x < -margin) p.x = width + margin;
    if (p.x > width + margin) p.x = -margin;
    if (p.y < -margin) p.y = height + margin;
    if (p.y > height + margin) p.y = -margin;
  };

  const tick = () => {
    const now = performance.now();
    glowCtx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy + Math.sin(p.drift) * 0.35 * p.depth;
      p.drift += 0.0065;
      p.pulse += 0.013;
      wrap(p);

      let hoverDist = Infinity;
      let dx = 0;
      let dy = 0;

      if (allowInteraction && mouse.active) {
        dx = mouse.x - p.x;
        dy = mouse.y - p.y;
        hoverDist = Math.hypot(dx, dy);
        if (hoverDist < influenceRadius && hoverDist > 0.0001) {
          const pull = (influenceRadius - hoverDist) / influenceRadius;
          const kick = pull * 1.55 * p.depth;
          p.vx += (dx / hoverDist) * kick;
          p.vy += (dy / hoverDist) * kick;
        }
      }

      p.vx *= drag;
      p.vy *= drag;

      let alpha = Math.min(1, alphaBase + alphaAmp * Math.sin(p.pulse));

      if (hoverDist < influenceRadius && hoverDist > 0.0001) {
        const proximity = 1 - hoverDist / influenceRadius;
        const flicker = 0.7 + 0.7 * Math.sin(now * p.flickerSpeed + p.flickerPhase);
        alpha = Math.min(1, (alphaBase + alphaAmp * Math.sin(p.pulse)) + flicker * proximity * 0.95);
      }

      glowCtx.globalAlpha = alpha;
      glowCtx.fillStyle = p.color;
      glowCtx.fillRect(p.x, p.y, p.size, p.size);
    });
    glowCtx.globalAlpha = 1;

    ctx.clearRect(0, 0, width, height);
    ctx.filter = 'blur(6px)';
    ctx.globalAlpha = 0.85;
    ctx.drawImage(glowCanvas, 0, 0);
    ctx.filter = 'none';
    ctx.globalAlpha = 1;
    ctx.drawImage(glowCanvas, 0, 0);
    requestAnimationFrame(tick);
  };

  resize();
  refreshPalette();
  for (let i = 0; i < particleCount; i++) particles.push(makeParticle());

  window.addEventListener('resize', () => {
    resize();
    particles.splice(0, particles.length);
    for (let i = 0; i < particleCount; i++) particles.push(makeParticle());
    repaintColors();
  });

  window.addEventListener('pointermove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    const topEl = document.elementFromPoint(e.clientX, e.clientY);
    const allowZones = '.hero, .intro, .banner, .page-title, footer, .projects-grid, .grid';
    const blockZones = 'header, nav, .about-content, .timeline, .skills-container, .skills-category, .certifications, .featured-item, .section-featured, .content-box, .card, .card-body, .card-header, .card-footer';
    const inAllowZone = topEl && (topEl === document.body || topEl === document.documentElement || topEl.closest(allowZones));
    const inBlockZone = topEl && topEl.closest(blockZones);
    mouse.active = allowInteraction && (inAllowZone || !inBlockZone);
  });

  const themeObserver = new MutationObserver(repaintColors);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  tick();
}
