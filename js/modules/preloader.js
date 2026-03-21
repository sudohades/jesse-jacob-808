let preloader = null;
let preloaderBar = null;
let progressTimer = null;
let progress = 0;

function setProgress(value) {
  if (!preloaderBar) return;
  const clamped = Math.max(0, Math.min(100, value));
  preloaderBar.style.width = `${clamped}%`;
}

export function initPreloader() {
  if (preloader) return;

  preloader = document.createElement('div');
  preloader.className = 'preloader';
  preloader.innerHTML = `
    <div class="preloader-track" aria-hidden="true">
      <div class="preloader-bar"></div>
    </div>
  `;

  document.body.appendChild(preloader);
  preloaderBar = preloader.querySelector('.preloader-bar');

  requestAnimationFrame(() => {
    preloader.classList.add('active');
    setProgress(8);
  });

  progressTimer = window.setInterval(() => {
    if (progress >= 85) return;
    progress += Math.random() * 12;
    setProgress(progress);
  }, 80);
}

export function completePreloader() {
  if (progressTimer) {
    window.clearInterval(progressTimer);
    progressTimer = null;
  }

  setProgress(100);

  if (!preloader) {
    document.documentElement.classList.remove('is-preloading');
    return;
  }

  window.setTimeout(() => {
    preloader.classList.add('done');
    document.documentElement.classList.remove('is-preloading');

    window.setTimeout(() => {
      preloader?.remove();
      preloader = null;
      preloaderBar = null;
      progress = 0;
    }, 260);
  }, 120);
}
