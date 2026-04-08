export function initScrollIndicator() {
  const canvas = document.createElement('canvas');
  canvas.id = 'scroll-indicator-canvas';
  canvas.style.position = 'fixed';
  canvas.style.left = '20px';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  
  function getLineCount() {
    return window.innerWidth < 768 ? 32 : 64;
  }
  
  let lineCount = getLineCount();
  let lineHeights = Array.from({ length: lineCount }, () => 0.3 + Math.random() * 0.7);
  let isRenderScheduled = false;

  function setCanvasSize() {
    const newLineCount = getLineCount();
    if (newLineCount !== lineCount) {
      lineCount = newLineCount;
      lineHeights = Array.from({ length: lineCount }, () => 0.3 + Math.random() * 0.7);
    }
    const size = Math.min(120, Math.max(60, window.innerWidth * 0.12));
    canvas.width = size;
    canvas.height = size;
    canvas.style.bottom = '35px';
  }

  function drawScrollIndicator() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width * 0.35;

    const computedStyle = getComputedStyle(document.documentElement);
    const accentColor = computedStyle.getPropertyValue('--accent-blue').trim();
    const hexToRgb = (hex) => {
      const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return m ? `${parseInt(m[1], 16)}, ${parseInt(m[2], 16)}, ${parseInt(m[3], 16)}` : '138, 43, 226';
    };
    const rgbColor = hexToRgb(accentColor);

    const logProgress = Math.log(1 + scrollProgress * (Math.E - 1)) / Math.log(Math.E);
    const lineOpacity = 0.2 + logProgress * 0.65;

    ctx.strokeStyle = `rgba(${rgbColor}, ${lineOpacity})`;
    ctx.lineWidth = 1.5;

    const arcProgress = scrollProgress * Math.PI * 2;
    for (let i = 0; i < lineCount; i++) {
      const angle = (i / lineCount) * Math.PI * 2;
      const baseHeight = lineHeights[i];
      let angleOffset = angle - (Math.PI / 2);
      if (angleOffset < 0) angleOffset += Math.PI * 2;
      if (angleOffset <= arcProgress) {
        const innerRadius = canvas.width * 0.15;
        const lineExtension = innerRadius + (radius - innerRadius) * baseHeight;
        ctx.beginPath();
        ctx.moveTo(centerX + Math.cos(angle) * innerRadius, centerY + Math.sin(angle) * innerRadius);
        ctx.lineTo(centerX + Math.cos(angle) * lineExtension, centerY + Math.sin(angle) * lineExtension);
        ctx.stroke();
      }
    }
  }

  function requestRender() {
    if (isRenderScheduled) return;
    isRenderScheduled = true;
    requestAnimationFrame(() => {
      isRenderScheduled = false;
      drawScrollIndicator();
    });
  }

  setCanvasSize();
  requestRender();

  window.addEventListener('resize', () => {
    setCanvasSize();
    requestRender();
  }, { passive: true });

  window.addEventListener('scroll', requestRender, { passive: true });

  const themeObserver = new MutationObserver(requestRender);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
}
