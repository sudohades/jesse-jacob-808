const SCROLL_BREAKPOINTS = { SHRINK: 100, EXPAND: 80 };
let isHeaderShrunken = false;
let isScrollCheckScheduled = false;

const setHeaderOffset = (header) => {
  if (!header) return;
  const h = header.getBoundingClientRect().height || 0;
  document.documentElement.style.setProperty('--header-offset', `${h}px`);
};

export function initHeaderShrink() {
  const header = document.querySelector('header');
  if (!header) return;

  // Initial offset
  setHeaderOffset(header);

  function checkHeaderShrinkState() {
    const scrollY = window.scrollY;
    if (!isHeaderShrunken && scrollY > SCROLL_BREAKPOINTS.SHRINK) {
      header.classList.add('shrink');
      isHeaderShrunken = true;
      setHeaderOffset(header);
    } else if (isHeaderShrunken && scrollY < SCROLL_BREAKPOINTS.EXPAND) {
      header.classList.remove('shrink');
      isHeaderShrunken = false;
      setHeaderOffset(header);
    }
    isScrollCheckScheduled = false;
  }

  window.addEventListener('scroll', () => {
    if (!isScrollCheckScheduled) {
      isScrollCheckScheduled = true;
      requestAnimationFrame(checkHeaderShrinkState);
    }
  }, { passive: true });

  window.addEventListener('resize', () => setHeaderOffset(header));
}
