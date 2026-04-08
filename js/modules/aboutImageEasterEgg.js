export function initAboutImageEasterEgg() {
  const scratchWrap = document.querySelector('[data-scratch-image]');
  if (!scratchWrap) return;

  const coverSrc = scratchWrap.dataset.coverSrc;
  const canvas = scratchWrap.querySelector('.about-scratch-canvas');
  if (!coverSrc || !canvas) return;

  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) {
    scratchWrap.classList.add('scratch-disabled');
    return;
  }

  const context = canvas.getContext('2d');
  if (!context) return;

  const coverImage = new Image();
  const rootStyles = window.getComputedStyle(document.documentElement);
  const canvasFillColor = rootStyles.getPropertyValue('--secondary-bg').trim() || '#0b0a16';
  let interactionEnabled = false;
  let isPointerDown = false;
  let inactivityTimer = null;
  let restoreTimer = null;
  let restoreAnimationFrame = null;

  const drawCoverContained = (alpha = 1) => {
    const bounds = scratchWrap.getBoundingClientRect();
    const frameWidth = Math.max(1, bounds.width);
    const frameHeight = Math.max(1, bounds.height);
    const imageWidth = coverImage.naturalWidth || coverImage.width;
    const imageHeight = coverImage.naturalHeight || coverImage.height;

    if (!imageWidth || !imageHeight) return;

    const scale = Math.min(frameWidth / imageWidth, frameHeight / imageHeight);
    const drawWidth = imageWidth * scale;
    const drawHeight = imageHeight * scale;
    const offsetX = (frameWidth - drawWidth) / 2;
    const offsetY = (frameHeight - drawHeight) / 2;

    context.globalCompositeOperation = 'source-over';
    context.fillStyle = canvasFillColor;
    context.fillRect(0, 0, frameWidth, frameHeight);
    context.globalAlpha = alpha;
    context.drawImage(coverImage, offsetX, offsetY, drawWidth, drawHeight);
    context.globalAlpha = 1;
  };

  const resizeCanvas = () => {
    const bounds = scratchWrap.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(bounds.width * dpr));
    canvas.height = Math.max(1, Math.floor(bounds.height * dpr));
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (coverImage.complete) {
      context.globalCompositeOperation = 'source-over';
      context.clearRect(0, 0, bounds.width, bounds.height);
      drawCoverContained(1);
    }
  };

  const eraseAtPoint = (clientX, clientY) => {
    if (!interactionEnabled) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    context.globalCompositeOperation = 'destination-out';
    context.beginPath();
    context.arc(x, y, 26, 0, Math.PI * 2);
    context.fill();
  };

  const restoreCover = () => {
    const bounds = scratchWrap.getBoundingClientRect();
    context.globalCompositeOperation = 'source-over';
    context.clearRect(0, 0, bounds.width, bounds.height);
    drawCoverContained(1);
  };

  const fadeRestoreCover = () => {
    if (!interactionEnabled) return;

    if (inactivityTimer) {
      window.clearTimeout(inactivityTimer);
      inactivityTimer = null;
    }

    interactionEnabled = false;
    scratchWrap.classList.add('is-restoring');
    canvas.style.pointerEvents = 'none';

    if (restoreTimer) window.clearTimeout(restoreTimer);
    if (restoreAnimationFrame) window.cancelAnimationFrame(restoreAnimationFrame);
    restoreTimer = window.setTimeout(() => {
      const bounds = scratchWrap.getBoundingClientRect();
      const width = Math.max(1, Math.floor(bounds.width));
      const height = Math.max(1, Math.floor(bounds.height));
      const scratchedSnapshot = context.getImageData(0, 0, width, height);
      const startTime = performance.now();
      const duration = 1200;

      const animateRestore = (timestamp) => {
        const elapsed = timestamp - startTime;
        const progress = Math.min(1, elapsed / duration);

        context.putImageData(scratchedSnapshot, 0, 0);
        drawCoverContained(progress);

        if (progress < 1) {
          restoreAnimationFrame = window.requestAnimationFrame(animateRestore);
          return;
        }

        restoreCover();
        interactionEnabled = true;
        canvas.style.pointerEvents = 'auto';
        scratchWrap.classList.remove('is-restoring');
        scratchWrap.classList.add('is-awaiting');
      };

      restoreAnimationFrame = window.requestAnimationFrame(animateRestore);
    }, 90);
  };

  const scheduleInactivityReset = () => {
    if (!interactionEnabled) return;
    if (inactivityTimer) window.clearTimeout(inactivityTimer);
    inactivityTimer = window.setTimeout(() => {
      fadeRestoreCover();
    }, 3000);
  };

  coverImage.onload = () => {
    resizeCanvas();
    window.setTimeout(() => {
      interactionEnabled = true;
      scratchWrap.classList.add('is-scratch-ready');
      scratchWrap.classList.add('is-awaiting');
    }, 2800);
  };

  coverImage.src = coverSrc;

  canvas.addEventListener('pointerdown', (event) => {
    if (!interactionEnabled) return;
    isPointerDown = true;
    scratchWrap.classList.remove('is-awaiting');
    eraseAtPoint(event.clientX, event.clientY);
    scheduleInactivityReset();
  });

  canvas.addEventListener('pointermove', (event) => {
    if (!isPointerDown) return;
    eraseAtPoint(event.clientX, event.clientY);
    scheduleInactivityReset();
  });

  const endPointer = () => {
    isPointerDown = false;
  };

  canvas.addEventListener('pointerup', endPointer);
  canvas.addEventListener('pointerleave', endPointer);
  canvas.addEventListener('pointercancel', endPointer);

  window.addEventListener('resize', resizeCanvas);
}
